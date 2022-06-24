import express from 'express'
import { authenticateByToken } from 'core/guestAuth.js';
const router = express.Router();

router.get('/validate_auth', async (req, res) => {
  const token = req.headers.token;
  const guest = await authenticateByToken(token);
  res.json(guest);
});

export default router;
