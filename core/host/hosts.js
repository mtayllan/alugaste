import { createMongoClient } from "../mongo.js"
import { ObjectId } from "mongodb";

export const getHost = async (id) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const query = { _id: ObjectId(id) };
    const collection = mongoClient.db('alugaste').collection('hosts');
    const host = await collection.findOne(query);
    return host;
  } finally {
    mongoClient.close();
  }
}
