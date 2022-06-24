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
export const createAccount = async ({ name, birthdate, address, email, password }) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('hosts');
    const query = { email: email };
    const guest = await collection.findOne(query);
    if (guest) return 'already_exists';

    const encryptedPassword = hashMessage(password);
    const record = { name, birthdate, address, email, encrypted_password: encryptedPassword };
    await collection.insertOne(record);
  } finally {
    mongoClient.close();
  }

  return login({ email, password });
};
