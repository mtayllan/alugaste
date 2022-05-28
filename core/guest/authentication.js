import { createMongoClient } from "../mongo.js"
import { createHmac } from 'crypto';
import jwt from 'jsonwebtoken';

const hashMessage = (message) => {
  return createHmac("sha512", process.env.SECRET).update(message).digest('hex');
}

const buildAccessToken = (guest) => {
  const token = { id: guest._id, now: new Date().toISOString() };
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
    const collection = mongoClient.db('alugaste').collection('guests');
    const query = { _id: unsignedToken._id };
    const guest = await collection.findOne(query);

    if (guest === null) return 'invalid_token';
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
