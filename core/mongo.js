import { MongoClient, ServerApiVersion } from 'mongodb';

export const createMongoClient = () => {
  const uri = process.env.MONGO_URL;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  return client;
}
