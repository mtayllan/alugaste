import { ObjectId } from "mongodb";
import { createMongoClient } from "./mongo.js"
import { hashMessage } from './utils.js';
import { login } from './hostAuth.js'

const findHostPipeline = (id) => (
  [
    { $match: { _id: ObjectId(id) } },
    {
      $lookup: {
        from: 'rooms',
        localField: '_id',
        foreignField: 'host_id',
        as: 'rooms'
      }
    }
  ]
)

// GET hosts/:id
export const getHost = async (id) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('hosts');

    const hosts = await collection.aggregate(findHostPipeline(id)).toArray();
    return hosts[0];
  } finally {
    mongoClient.close();
  }
}

// POST hosts
export const createAccount = async ({ name, birthdate, address, email, password, phone, photo }) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('hosts');
    const query = { email: email };
    const host = await collection.findOne(query);
    if (host) return 'already_exists';

    const encryptedPassword = hashMessage(password);
    const record = { name, birthdate, address, phone, photo, email, encrypted_password: encryptedPassword };
    await collection.insertOne(record);
  } finally {
    mongoClient.close();
  }

  return login({ email, password });
};

export const updateAccount = async ({ id, name, birthdate, address, email, password, photo, phone }) => {
  const mongoClient = createMongoClient();

  try {
    const hostData = { name, birthdate, address, email, photo,phone };
    if (password) hostData['encrypted_password'] = hashMessage(password);

    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('hosts');
    const query = { email };
    const host = await collection.findOne(query);
    if (host && !host._id.equals(ObjectId(id))) return 'email_taken';

    await collection.updateOne({ _id: ObjectId(id) }, { $set: hostData });

    return 'success';
  } finally {
    mongoClient.close();
  }
}