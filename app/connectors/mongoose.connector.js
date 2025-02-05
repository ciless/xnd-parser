import mongoose from 'mongoose';
mongoose.Promise = Promise;
mongoose.set('useCreateIndex', true);

export default (mongoUri) => {
  if (!mongoUri) {
    throw Error('Mongo uri is undefined');
  }

  return mongoose.connect(mongoUri).then((mongodb) => {
    console.log('Mongo connected');
    return mongodb;
  });
};
