import { createMongoClient } from "./mongo.js"

const listStaysPipeline = (guestId) => ([{
  $match: {
      guest_id: guestId
  }
}, {
  $lookup: {
      from: 'rooms',
      localField: 'room_id',
      foreignField: '_id',
      as: 'room',
      pipeline: [{
              $lookup: {
                  from: 'hosts',
                  localField: 'host_id',
                  foreignField: '_id',
                  as: 'host'
              }
          },
          {
              $unwind: "$host"
          }
      ]
  }
}, {
  $unwind: "$room"
}])

export const listStays = async (guestId) => {
  const mongoClient = createMongoClient();

  try {
    await mongoClient.connect();

    const collection = mongoClient.db('alugaste').collection('stays');
    return await collection.aggregate(listStaysPipeline(guestId)).toArray();
  } finally {
    mongoClient.close();
  }
};