import { ObjectId } from "mongodb";
import { createMongoClient } from "./mongo.js"

const lookupRoom = [
  {
    $lookup: {
      from: 'rooms',
      localField: 'room_id',
      foreignField: '_id',
      as: 'room',
      pipeline: [
        { $lookup: { from: 'hosts', localField: 'host_id', foreignField: '_id', as: 'host' } },
        { $unwind: "$host" }
      ]
    }
  },
  { $unwind: "$room" }
];

const listStaysPipeline = (guestId) => ([
  { $match: { guest_id: ObjectId(guestId) } },
  ...lookupRoom
]);

const getStayPipeline = (stayId, guestId) => ([
  { $match: { guest_id: ObjectId(guestId), _id: ObjectId(stayId) } },
  ...lookupRoom,
  { $lookup: { from: 'comments', localField: '_id', foreignField: 'stay_id', as: 'comment' } },
  { $unwind: { path: "$comment", preserveNullAndEmptyArrays: true } }
]);

// GET stays
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

// GET stays/:id/?guestId=:guestId
export const getStay = async (stayId, guestId) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();

    const collection = mongoClient.db('alugaste').collection('stays');
    const results = await collection.aggregate(getStayPipeline(stayId, guestId)).toArray();
    return results[0];
  } finally {
    mongoClient.close();
  }
}

// POST stays
export const createStay = async({ start_date, end_date, total_value, room_id, guest_id }) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();

    const collection = mongoClient.db('alugaste').collection('stays');
    const record = { start_date, end_date, total_value, room_id: ObjectId(room_id), guest_id: ObjectId(guest_id) };
    await collection.insertOne(record);
  } finally {
    mongoClient.close();
  }
};
