import morgan from 'morgan';
import bodyParser from 'body-parser';

export default function (app) {
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
}

