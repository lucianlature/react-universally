import path, { resolve as pathResolve } from 'path';
// import chokidar from 'chokidar';
// import Promise from 'bluebird';
import webpack from 'webpack';
import { createNotification, compilerIsDone, expressCreateServer } from '../utils';
// import HotServer from './hotServer';
// import HotClient from './hotClient';
// import ensureVendorDLLExists from './ensureVendorDLLExists';
import vendorDLLPaths from '../config/vendorDLLPaths';
import envVars from '../config/envVars';

// Create CLIENT compiler configuration
const clientConfigFactory = require('../webpack/client.config');
const clientConfig = clientConfigFactory({ mode: 'development' });
// Install the vendor DLL plugin.
/*
clientConfig.plugins.push(
  new webpack.DllReferencePlugin({
    manifest: require(vendorDLLPaths.dllJsonPath),
  })
);
*/

// Create MIDDLEWARE compiler configuration
const middlewareConfigFactory = require('../webpack/universalMiddleware.config');
const middlewareConfig = middlewareConfigFactory({ mode: 'development' });

// Create SERVER compiler configuration
const serverConfigFactory = require('../webpack/server.config');
const serverConfig = serverConfigFactory({ mode: 'development' });

// Main functionality
// await Promise.all should allow us to run the functions in parallel
(async () => {
  const {
    compilers: [
      clientCompiler,
      middlewareCompiler,
      serverCompiler
    ]
  } = await webpack([clientConfig, middlewareConfig, serverConfig]);

  /* WHY IS THIS NOT WORKING ?!
   await Promise.all([
   compilerIsDone(clientCompiler).then(expressCreateServer(clientCompiler, envVars.CLIENT_DEVSERVER_PORT)),
   compilerIsDone(middlewareCompiler),
   compilerIsDone(serverCompiler)
   ]);
   */
  await compilerIsDone(clientCompiler).then(expressCreateServer(clientCompiler, envVars.CLIENT_DEVSERVER_PORT));
  await compilerIsDone(middlewareCompiler);
  await compilerIsDone(serverCompiler);

  // starts the server
  try {
    const compiledOutputPath = path.resolve(
      serverCompiler.options.output.path, `${Object.keys(serverCompiler.options.entry)[0]}.js`
    );
    // The server bundle  will automatically start the web server just by
    // requiring it. It returns the http listener too.
    const listener = require(compiledOutputPath).default;
    const url = `http://localhost:${envVars.SERVER_PORT}`;

    createNotification({
      title: 'server',
      level: 'info',
      message: `Running on ${url} with latest changes.`,
      open: url
    });
  } catch (err) {
    createNotification({
      title: 'server',
      level: 'error',
      message: 'Failed to start, please check the console for more information.',
    });
    console.log(err);
  }
})();
