import express from 'express'
import { createComment } from 'core/comments.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const params = { rating: req.body.rating, content: req.body.content, stay_id: req.body.stay_id }

  await createComment(params);

  res.json({}).status(201);
});

export default router;
