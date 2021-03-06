import express from 'express'
import { authenticateByToken, login, logout } from 'core/guestAuth.js';
import { createAccount, updateAccount } from 'core/guests.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const formData = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  };

  const response = await createAccount(formData);

  if (response == 'already_exists') {
    res.status(400).json({ message: 'already_exists' });
  } else {
    res.status(201).json({ session: response });
  }
});

router.get('/validate_auth', async (req, res) => {
  const token = req.headers.token;
  const guest = await authenticateByToken(token);
  res.json(guest);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await login({ email, password });
  if (result === 'not_found') {
    res.sendStatus(422);
  } else {
    res.json({ accessToken: result })
  }
});

router.delete('/logout', async (req, res) => {
  const token = req.headers.token;
  await logout(token);
  res.sendStatus(204);
});

router.put('/:id', async (req, res) => {
  const data = {
    id: req.params.id,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    photo: req.body.photo
  };


  const result = await updateAccount(data);
  if (result != 'success') return res.sendStatus(422);

  res.sendStatus(202);
});

export default router;
