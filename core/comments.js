import { createMongoClient } from "./mongo.js";
import { ObjectId } from "mongodb";

// POST /comments
export const createComment = async ({ rating, content, stay_id, room_id, guest_id }) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();

    const collection = mongoClient.db('alugaste').collection('comments');
    const record = { rating, content, stay_id: ObjectId(stay_id), room_id: ObjectId(room_id), guest_id: ObjectId(guest_id) };
    await collection.insertOne(record);
  } finally {
    mongoClient.close();
  }
};

// DELETE /comments/:id
export const deleteComment = async (id) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();

    const collection = mongoClient.db('alugaste').collection('comments');
    await collection.deleteOne({ _id: ObjectId(id) });
  } finally {
    mongoClient.close();
  }
};

// PATCH /comments/:id
export const updateComment = async ({ id, rating, content, stay_id, room_id, guest_id }) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();

    const collection = mongoClient.db('alugaste').collection('comments');

    stay_id = ObjectId(stay_id)
    room_id = ObjectId(room_id)
    guest_id = ObjectId(guest_id)
    const commentData = { rating, content, stay_id, room_id, guest_id };
    const query = { _id: ObjectId(id) };
    const comment = await collection.findOne(query);

    if (comment) {
      await collection.updateOne({ _id: ObjectId(id) }, { $set: commentData });
      return 'success'
    } else {
      return 'comment_not_found'
    }

  } finally {
    mongoClient.close();
  }
};

