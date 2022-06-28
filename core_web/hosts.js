import express from 'express'
import { getHost, createAccount } from 'core/hosts.js';
import { authenticateByToken, login, logout } from 'core/hostAuth.js';

const router = express.Router();



router.post('/', async (req, res) => {
  const formData = { name: req.body.name, birthdate: req.body.birthdate, address: req.body.address, email: req.body.email, password: req.body.password };
  const response = await createAccount(formData);

  if (response == 'already_exists') {
    res.status(400).json({ message: 'already_exists' });
  } else {
    res.status(201).json({ session: response });
  }
});

router.get('/validate_auth', async (req, res) => {
  const token = req.headers.token;
  const host = await authenticateByToken(token);
  res.json(host);
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

router.get('/:id', async (req, res) => {
  const host = await getHost(req.params.id);

  if (host) {
    res.json(host).status(200);
  } else {
    res.json({}).status(404);
  }
});

export default router;
