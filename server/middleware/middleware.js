import morgan from 'morgan';
import bodyParser from 'body-parser';
import corsMiddleware from './CORSmiddleware';
import validateToken from '../auth/ValidateToken';


export default function (app) {
  app.use(validateToken());
  app.use(corsMiddleware());
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
}

