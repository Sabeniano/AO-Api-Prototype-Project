import indexdebug from 'debug';
import config from './server/config/config';
import app from './server/server';
import dbConnect from './server/db';
import seedDB from './server/utils/seedDB';

const debug = indexdebug('app');

debug(`You are running in ${process.env.NODE_ENV.toUpperCase()} enviroment`);

dbConnect();

seedDB();

app.listen(config.app.port);

debug(config.app.port);
