import { createMongoClient } from "../mongo.js"
import { ObjectId } from "mongodb";

const findHostPipeline = (id) => (
  [
    { $match: { _id: ObjectId(id) } },
    {
      $lookup: {
        from: 'rooms',
        localField: '_id',
        foreignField: 'host_id',
        as: 'rooms'
      }
    }
  ]
)

export const getHost = async (id) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const query = { _id: ObjectId(id) };
    const collection = mongoClient.db('alugaste').collection('hosts');

    const host = await collection.aggregate(findHostPipeline(id)).toArray();
    // const host = await collection.findOne(query);
    return host[0];
  } finally {
    mongoClient.close();
  }
}
