import express from 'express'
import { findRoom } from 'core/rooms.js';
const router = express.Router();


router.get('/:id', async (req, res) => {  
  const id = req.params.id;
  const room = await findRoom(id);
  res.json(room);
});

export default router;