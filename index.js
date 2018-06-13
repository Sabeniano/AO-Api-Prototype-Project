import indexdebug from 'debug';
import config from './server/config/config';
import app from './server/server';
import dbConnect from './server/db';

const debug = indexdebug('app');

dbConnect();

app.listen(config.app.port);

debug(config.app.port);
