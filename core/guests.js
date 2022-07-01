import { createMongoClient } from "./mongo.js"
import { hashMessage } from './utils.js';
import { login } from './guestAuth.js'
import { ObjectId } from "mongodb";

// POST guests
export const createAccount = async ({ name, phone, email, password }) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('guests');
    const query = { email: email };
    const guest = await collection.findOne(query);
    if (guest) return 'already_exists';

    const encryptedPassword = hashMessage(password);
    const record = { name, phone, email, encrypted_password: encryptedPassword };
    await collection.insertOne(record);
  } finally {
    mongoClient.close();
  }

  return login({ email, password });
};

export const updateAccount = async ({ id, name, phone, email, password, photo }) => {
  const mongoClient = createMongoClient();

  try {
    const guestData = { name, phone, email, phone, photo };
    if (password) guestData['encrypted_password'] = hashMessage(password);

    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('guests');
    const query = { email };
    const guest = await collection.findOne(query);
    if (guest && !guest._id.equals(ObjectId(id))) return 'email_taken';

    await collection.updateOne({ _id: ObjectId(id) }, { $set: guestData });

    return 'success';
  } finally {
    mongoClient.close();
  }
}
