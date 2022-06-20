import { createMongoClient } from "./mongo.js"
import jwt from 'jsonwebtoken';
import { hashMessage } from "./utils.js";
import { ObjectId } from "mongodb";

const buildAccessToken = (guest) => {
  const token = { id: guest._id, now: new Date().toISOString() };
  return jwt.sign(token, process.env.SECRET)
};

const getUnsignedToken = async (token) => {
  try {
    const unsignedToken = jwt.verify(token, process.env.SECRET);
    return unsignedToken;
  } catch {
    return 'invalid_token';
  }
}

export const authenticateByToken = async (token) => {
  const unsignedToken = await getUnsignedToken(token);
  if (unsignedToken === 'invalid_token') return 'invalid_token';

  const mongoClient = createMongoClient();
  try {
    await mongoClient.connect()
    const collection = mongoClient.db('alugaste').collection('guests');
    const query = { _id: ObjectId(unsignedToken.id) };
    const guest = await collection.findOne(query);

    if (guest === null || guest.access_token !== token) return 'invalid_token';
    return guest;
  } finally {
    mongoClient.close();
  }
}

export const login = async ({ email, password }) => {
  const encryptedPassword = hashMessage(password);
  const mongoClient = createMongoClient();
  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('guests');
    const query = { email: email, encrypted_password: encryptedPassword };
    const guest = await collection.findOne(query);
    if (guest === null) return 'not_found';
    const accessToken = buildAccessToken(guest);
    await collection.updateOne({ _id: guest._id }, { $set: { access_token: accessToken } });
    return accessToken;
  } finally {
    await mongoClient.close();
  }
}

export const logout = async (guest) => {
  const mongoClient = createMongoClient();
  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('guests');
    const query = { access_token: guest.access_token };
    await collection.updateOne(query, { $unset: { access_token: '' } });
    return true;
  } finally {
    await mongoClient.close();
  }
}
