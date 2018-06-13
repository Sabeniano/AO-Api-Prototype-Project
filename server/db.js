import mongoose from 'mongoose';
import debug from 'debug';
import config from './config/config';

const msg = debug('app:db');

const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;


export default function dbConnect() {
  try {
    mongoose.connect(connectionString);
    msg(`Connected to db with ${connectionString}`);
  } catch (error) {
    msg(error);
  }
}
