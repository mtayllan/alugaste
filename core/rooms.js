import { createMongoClient } from "./mongo.js"
import { ObjectId } from "mongodb";
import { readFileSync } from 'fs';
import { Buffer } from 'buffer';

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
  if (!ObjectId.isValid(id)) {
    return null;
  }

  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('rooms');
    const room = await collection.aggregate(findRoomPipeline(id)).toArray();
    return room[0];
  } finally {
    mongoClient.close();
  }
}


export const listRooms = async (hostId, search = null, page = 0) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();

    const collection = mongoClient.db('alugaste').collection('rooms');
    const query = {}

    const perPage = 4

    if (search) query.name = new RegExp(`${search}`);
    if (hostId) query.host_id = ObjectId(hostId);
    return await collection.find(query).skip(perPage * page).limit(perPage).toArray();
  } finally {
    mongoClient.close();
  }
}

// POST rooms
export const createRoom = async ({ name, description, maxGuests, totalBathrooms, totalRooms, totalBeds, others, pricePerNight, minNights, maxNights, hostId, photos }) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('rooms');

    const photoBinaries = photos.map(photo => Buffer.from(readFileSync(photo.path)));
    const record = { name, description, maxGuests, totalBathrooms, totalRooms, totalBeds, others, pricePerNight, minNights, maxNights, host_id: hostId, photos: photoBinaries };
    await collection.insertOne(record);
  } finally {
    mongoClient.close();
  }
}
