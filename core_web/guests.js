import express from 'express'
import { authenticateByToken, login, logout } from 'core/guestAuth.js';
const router = express.Router();

router.get('/validate_auth', async (req, res) => {
  const token = req.headers.token;
  const guest = await authenticateByToken(token);
  res.json(guest);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await login({ email, password });
  if (result === 'not_found') {
    res.status(422).json();
  } else {
    res.json({ accessToken: result })
  }
});

router.delete('/logout', async (req, res) => {
  const token = req.headers.token;
  await logout(token);
  res.status(204).json();
});

export default router;
