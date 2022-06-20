import { createMongoClient } from "./mongo.js";
import { ObjectId } from "mongodb";

// POST /comments
export const createComment = async ({ rating, content, stay_id }) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();

    const collection = mongoClient.db('alugaste').collection('comments');
    const record = { rating, content, stay_id: ObjectId(stay_id) };
    await collection.insertOne(record);
  } finally {
    mongoClient.close();
  }
};
