import express from 'express'
import { findRoom, listRooms } from 'core/rooms.js';
const router = express.Router();


router.get('/', async (req, res) => {
  const rooms = await listRooms(null, req.query.search); 
  res.json(rooms);
});


router.get('/:id', async (req, res) => {  
  const id = req.params.id;
  const room = await findRoom(id);
  res.json(room);
});

export default router;