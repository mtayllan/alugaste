import { createMongoClient } from "./mongo.js"
import jwt from 'jsonwebtoken';
import { hashMessage } from "./utils.js";
import { ObjectId } from "mongodb";

const buildAccessToken = (host) => {
  const token = { id: host._id, now: new Date().toISOString() };
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

// GET hosts/validate_auth
export const authenticateByToken = async (token) => {
  const unsignedToken = await getUnsignedToken(token);
  if (unsignedToken === 'invalid_token') return 'invalid_token';

  const mongoClient = createMongoClient();
  try {
    await mongoClient.connect()
    const collection = mongoClient.db('alugaste').collection('hosts');
    const query = { _id: ObjectId(unsignedToken.id) };
    const host = await collection.findOne(query);

    if (host === null || host.access_token !== token) return 'invalid_token';
    return host;
  } finally {
    mongoClient.close();
  }
}

// POST hosts/login
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

// DELETE hosts/logout
export const logout = async (accessToken) => {
  const mongoClient = createMongoClient();
  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('hosts');
    const query = { access_token: accessToken };
    await collection.updateOne(query, { $unset: { access_token: '' } });
    return true;
  } finally {
    await mongoClient.close();
  }
}
