import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';

let config = { db_uri: "" };
if (process.env.NODE_ENV !== "production") {
  import('./config.json').then(data => {
    config = data;
    console.log(config)
  });
} else {
  import('./config.json').then(data => {
    config = data;
    console.log(config)
  });
}

// routes
import * as apiRoutes from './routes/api';

// mongoose
import * as mongoose from 'mongoose';

let mongoDB = process.env.MONGODB_URI || config.db_uri;
console.log("mongodb:")
console.log(mongoDB)
console.log('^^')
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    console.log(err);
  }
);

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV !== "development"
  ) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(server, distFolder) {
  //server.use(requireHTTPS); // TODO: uncomment
  /*server.use(express.json());
  server.use(cors());

  server.use(bodyParser.json({ limit: "200mb" }));
  server.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
  server.use(bodyParser.text({ limit: "200mb" }));

  server.use("/api", apiRoutes);
  */


  const indexHtml = existsSync(path.join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;
  const distFolder = path.join(process.cwd(), 'dist/anne/browser');

  // Start up the Node server
  const baseServer = express();
  const server = app(baseServer, distFolder);
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
