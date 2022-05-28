import { createMongoClient } from "../mongo.js"
import { createHmac } from 'crypto';
import jwt from 'jsonwebtoken';
import { hashMessage } from "../utils.js";

const buildAccessToken = (host) => {
  const token = { id: host._id, now: new Date().toISOString() };
  return jwt.sign(token, process.env.SECRET)
};

const getUnsignedToken = async (token) => {
  try {
    const token = await jwt.verify(token, process.env.SECRET);
    return token;
  } catch {
    return 'invalid_token';
  }
}

export const authenticateByToken = async (token) => {
  const unsignedToken = getUnsignedToken(token);
  if (unsignedToken === 'invalid_token') return 'invalid_token';

  const mongoClient = createMongoClient();
  try {
    await mongoClient.connect()
    const collection = mongoClient.db('alugaste').collection('hosts');
    const query = { _id: unsignedToken._id };
    const host = await collection.findOne(query);

    if (host === null) return 'invalid_token';
    return host;
  } finally {
    mongoClient.close();
  }
}

export const login = async ({ email, password }) => {
  const encryptedPassword = hashMessage(password);
  const mongoClient = createMongoClient();
  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('hosts');
    const query = { email: email, encrypted_password: encryptedPassword };
    const host = await collection.findOne(query);
    if (host === null) return 'not_found';
    const accessToken = buildAccessToken(host);
    await collection.updateOne({ _id: host._id }, { $set: { access_token: accessToken } });
    return accessToken;
  } finally {
    await mongoClient.close();
  }
}
