import config from 'config';
import dotenv from 'dotenv';
import envs from './constants/envs';
import env from './utils/env';

dotenv.config();

if (!envs[env]) {
  throw Error(`Unknown env ${envs[env]}`);
}

const MONGO_URI = process.env.MONGO_URI || config.get('mongo.uri');

export { MONGO_URI };
