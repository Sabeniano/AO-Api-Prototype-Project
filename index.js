import config from './server/config/config';
import app from './server/server';

app.listen(config.port);
