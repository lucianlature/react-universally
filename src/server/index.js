/* @flow */
/* eslint-disable no-console */

// This grants us source map support, which combined with our webpack source
// maps will give us nice stack traces.
import 'source-map-support/register';

import Koa from 'koa';
import mount from 'koa-mount';
import compression from 'koa-compress';
import serve from 'koa-static';
import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';
import reactApplication from './middleware/reactApplication';
import security from './middleware/security';
import clientBundle from './middleware/clientBundle';
import serviceWorker from './middleware/serviceWorker';
import errorHandlers from './middleware/errorHandlers';
import projConfig from '../../config/project';
import envConfig from '../../config/environment';

// Create our express based server.
const app = new Koa();

// Security middlewares.
app.use(security);

// Gzip compress the responses.
app.use(compression());

/*
// When in production mode, we will serve our service worker which was generated
// by the offline-plugin webpack plugin. See the webpack plugins section for
// more information.
// Note: the service worker needs to be served from the http root of your
// application for it to work correctly.
if (process.env.NODE_ENV === 'production') {
  app.use(mount(`/${projConfig.serviceWorker.fileName}`, serviceWorker));
  // app.get(
  //   '/manifest.appcache',
  //   (req, res, next) => {
  //     res.sendFile(
  //       pathResolve(
  //         appRootDir.get(),
  //         projConfig.bundles.client.outputPath,
  //         'appcache/manifest.appcache',
  //       ),
  //     );
  //   },
  // );
}
*/

// Configure serving of our client bundle.
app.use(mount(projConfig.bundles.client.webPath, clientBundle));

// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use(mount('/', serve(pathResolve(appRootDir.get(), projConfig.publicAssetsPath))));
// The React application middleware.
app.use(mount('/', reactApplication));

// Error Handler middlewares.
// app.use(...errorHandlers);

// Create an http listener for our express app.
const listener = app.listen(envConfig.port, () =>
  console.log(`Server listening on port ${envConfig.port}`),
);

// We export the listener as it will be handy for our development hot reloader,
// or for exposing a general extension layer for application customisations.
export default listener;
