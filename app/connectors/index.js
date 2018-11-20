import { MONGO_URI } from '../config';
import mongooseConnector from './mongoose.connector';

async function connectorsInit() {
  console.log(MONGO_URI);

  try {
    await mongooseConnector(MONGO_URI);
  } catch (e) {
    console.error(e);
  }
}

export { mongooseConnector };

export default connectorsInit;
