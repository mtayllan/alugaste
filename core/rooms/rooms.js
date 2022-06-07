import { createMongoClient } from "../mongo.js"
import { ObjectId } from "mongodb";

const findRoomPipeline = (id) => (
  [
    { $match: { _id: ObjectId(id) } },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'room_id',
        as: 'comments',
        pipeline: [
          { $lookup: { from:'guests', localField: 'guest_id',  foreignField: '_id', as: 'guest' } },
          { $unwind: '$guest' }
        ]
      }
    }
  ]
)
export const findRoom = async (id) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('rooms');
    const room = await collection.aggregate(findRoomPipeline(id)).toArray();
    return room[0];
  } finally {
    mongoClient.close();
  }
}


export const listRooms = async (hostId, search) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();

    const collection = mongoClient.db('alugaste').collection('rooms');
    const query = {}

    if (search) query.name = new RegExp(`${search}`);
    if (hostId) query.host_id = ObjectId(hostId);
    return await collection.find(query).toArray();
  } finally {
    mongoClient.close();
  }
}

export const createRoom = async ({ name, description, maxGuests, totalBathrooms, totalRooms, totalBeds, others, pricePerNight, minNights, maxNights, host }) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('rooms');

    const record = { name, description, maxGuests, totalBathrooms, totalRooms, totalBeds, others, pricePerNight, minNights, maxNights, host };
    await collection.insertOne(record);
  } finally {
    mongoClient.close();
  }
}
