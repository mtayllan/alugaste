import express from 'express'
import { createComment, updateComment, deleteComment } from 'core/comments.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const params = {
    rating: req.body.rating,
    content: req.body.content,
    stay_id: req.body.stay_id,
    room_id: req.body.room_id,
    guest_id: req.body.guest_id
  }

  await createComment(params);

  res.json({}).status(201);
});

router.delete('/:id', async (req, res) => {
  await deleteComment(req.params.id);

  res.status(204).json({});
});

router.put('/:id', async (req, res) => {
  const params = {
    id: req.body.id,
    rating: req.body.rating,
    content: req.body.content,
    stay_id: req.body.stay_id,
    room_id: req.body.room_id,
    guest_id: req.body.guest_id
  }


  const result = await updateComment(params);
  if (result != 'success') return res.sendStatus(400);

  res.status(200).json({});
});

export default router;
