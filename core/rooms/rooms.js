import { readFileSync } from 'fs';
import { createMongoClient } from "../mongo.js"

export const getRooms = () => {
  const rawdata = readFileSync(new URL('./data.json', import.meta.url));
  const rooms = JSON.parse(rawdata);
  return rooms;
}

export const getRoom = (id) => {
  const rawdata = readFileSync(new URL('./room.json', import.meta.url));
  const rooms = JSON.parse(rawdata);
  return rooms.find(data => data.id == id);;
}

export const createRoom = async ({ maxGuests, totalBathrooms, totalRooms, totalBeds, others, pricePerNight, minNights, maxNights, host }) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('rooms');

    const record = { maxGuests, totalBathrooms, totalRooms, totalBeds, others, pricePerNight, minNights, maxNights, host };
    await collection.insertOne(record);
  } finally {
    mongoClient.close();
  }
}