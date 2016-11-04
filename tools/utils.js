const CPU_COUNT = require('os').cpus().length;
const HappyPack = require('happypack');
const notifier = require('node-notifier');
const colors = require('colors');
const execSync = require('child_process').execSync;
const appRootPath = require('app-root-path').toString();
const express = require('express');
const createWebpackMiddleware = require('webpack-dev-middleware');
const createWebpackHotMiddleware = require('webpack-hot-middleware');

// This determines how many threads a HappyPack instance can spin up.
// See the plugins section of the webpack configuration for more.
const happyPackThreadPool = HappyPack.ThreadPool({ // eslint-disable-line new-cap
  size: CPU_COUNT >= 4
    ? Math.round(CPU_COUNT / 2)
    : 2,
});

// Generates a HappyPack plugin.
// @see https://github.com/amireh/happypack/
function happyPackPlugin({ name, loaders }) {
  return new HappyPack({
    id: name,
    verbose: false,
    threadPool: happyPackThreadPool,
    loaders,
  });
}

// :: [Any] -> [Any]
function removeEmpty(x) {
  return x.filter(y => !!y);
}

// :: bool -> (Any, Any) -> Any
function ifElse(condition) {
  return (then, or) => (condition ? then : or);
}

// :: ...Object -> Object
function merge() {
  const funcArgs = Array.prototype.slice.call(arguments); // eslint-disable-line prefer-rest-params

  return Object.assign.apply(
    null,
    removeEmpty([{}].concat(funcArgs))
  );
}

function createNotification(options = {}) {
  const title = options.title
    ? `${options.title.toUpperCase()}`
    : undefined;

  notifier.notify({
    title,
    message: options.message,
    open: options.open,
  });

  const level = options.level || 'info';
  const msg = `==> ${title} -> ${options.message}`;

  switch (level) {
    case 'warn': console.log(colors.red(msg)); break;
    case 'error': console.log(colors.bgRed.white(msg)); break;
    case 'info':
    default: console.log(colors.green(msg));
  }
}

function compilerIsDone (compiler) {
  compiler.plugin('compile', () => {
    createNotification({
      title: compiler.name,
      level: 'info',
      message: 'Building new bundle...',
    });
  });
  return new Promise(function(resolve) {
    compiler.run(function(err, stats) {
      if (err) {
        return reject(err);
      }

      const jsonStats = stats.toJson();
      if (jsonStats.errors.length > 0) {
        const error = new Error(jsonStats.errors[0]);
        error.errors = jsonStats.errors;
        error.warnings = jsonStats.warnings;
        return reject(error);
      }

      createNotification({
        title: compiler.name,
        level: 'info',
        message: 'Available with latest changes.',
      });
      resolve(compiler.name);
    });
  });
}

const expressCreateServer = (compiler, port) => new Promise((resolve) => {
  // starts the DEV server
  const app = express();
  const webpackDevMiddleware = createWebpackMiddleware(compiler, {
    quiet: true,
    noInfo: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // The path at which the client bundles are served from.  Note: in this
    // case as we are running a seperate dev server the public path should
    // be absolute, i.e. including the "http://..."
    publicPath: compiler.options.output.publicPath,
  });

  app.use(webpackDevMiddleware);
  app.use(createWebpackHotMiddleware(compiler));
  app.listen(port, () => {
    resolve(app);
  });
});

function exec(command) {
  execSync(command, { stdio: 'inherit', cwd: appRootPath });
}

module.exports = {
  removeEmpty,
  ifElse,
  merge,
  happyPackPlugin,
  createNotification,
  exec,
  compilerIsDone,
  expressCreateServer,
};
