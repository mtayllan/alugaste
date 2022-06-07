import { createMongoClient } from "../mongo.js"
import { ObjectId } from "mongodb";

export const getRoom = async (id) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const query = { _id: ObjectId(id) };
    const collection = mongoClient.db('alugaste').collection('rooms');
    const room = await collection.findOne(query);
    return room;
  } finally {
    mongoClient.close();
  }
}

export const getRooms = async (host_id, search) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();

    const collection = mongoClient.db('alugaste').collection('rooms');
    let query = {}

    if (search) {
      query = { name: new RegExp(`${search}`) }
    }

    if (host_id) {
      query['host'] = ObjectId(host_id);

      const rooms = await collection.find(query).toArray();
      return rooms;
    } else {
      const rooms = await collection.find(query).toArray();
      return rooms;
    }
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