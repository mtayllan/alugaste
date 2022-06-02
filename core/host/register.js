import { createMongoClient } from "../mongo.js"
import { hashMessage } from '../utils.js';
import { login } from './authentication.js'

export const createAccount = async ({ name, birthdate, email, password }) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('hosts');
    const query = { email: email };
    const guest = await collection.findOne(query);
    if (guest) return 'already_exists';

    const encryptedPassword = hashMessage(password);
    const record = { name, birthdate, email, encrypted_password: encryptedPassword };
    await collection.insertOne(record);
  } finally {
    mongoClient.close();
  }

  return login({ email, password });
};
