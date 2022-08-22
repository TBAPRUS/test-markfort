import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { router } from './routes';

async function init () {
  const app = express();

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(router);

  app.listen(80, () => {
    console.log('Server started');
  });
}

init();