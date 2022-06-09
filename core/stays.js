import { ObjectId } from "mongodb";
import { createMongoClient } from "./mongo.js"

const listStaysPipeline = (guestId) => ([{
  $match: {
      guest_id: guestId
  }
}, {
  $lookup: {
      from: 'rooms',
      localField: 'room_id',
      foreignField: '_id',
      as: 'room',
      pipeline: [{
              $lookup: {
                  from: 'hosts',
                  localField: 'host_id',
                  foreignField: '_id',
                  as: 'host'
              }
          },
          {
              $unwind: "$host"
          }
      ]
  }
}, {
  $unwind: "$room"
}])

export const listStays = async (guestId) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();

    const collection = mongoClient.db('alugaste').collection('stays');
    return await collection.aggregate(listStaysPipeline(guestId)).toArray();
  } finally {
    mongoClient.close();
  }
};
export const createStay = async({ start_date, end_date, total_value, room_id, guest_id }) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();

    const collection = mongoClient.db('alugaste').collection('stays');
    const record = { start_date, end_date, total_value, room_id: ObjectId(room_id), guest_id };
    await collection.insertOne(record);
  } finally {
    mongoClient.close();
  }
};
