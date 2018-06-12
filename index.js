import config from './server/config/config';
import app from './server/server';
import indexdebug from 'debug';

const debug = indexdebug('app');

app.listen(config.app.port);

debug(config.app.port);
