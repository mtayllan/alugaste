import express from 'express'
import { ObjectId } from 'mongodb'
import { createMongoClient } from './mongo.js';
const router = express.Router();

const findRoomPipeline = (id) => (
  [
    { $match: { _id: ObjectId(id) } },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'room_id',
        as: 'comments',
        pipeline: [
          { $lookup: { from:'guests', localField: 'guest_id',  foreignField: '_id', as: 'guest' } },
          { $unwind: '$guest' }
        ]
      }
    }
  ]
);


router.get('/:id', async (req, res) => {  
  const id = req.params.id;
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();
    const collection = mongoClient.db('alugaste').collection('rooms');
    const room = await collection.aggregate(findRoomPipeline(id)).toArray();
    res.json(room[0]);
  } finally {
    mongoClient.close();
  }
});

export default router;