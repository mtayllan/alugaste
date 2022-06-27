import express from 'express'
import { getHost, createAccount } from 'core/hosts.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/', limits: { fileSize: 1024 * 1024 } })

router.get('/:id', async (req, res) => {
  const host = await getHost(req.params.id);

  if (host) {
    res.json(host).status(200);
  } else {
    res.json({}).status(404);
  }
});

router.post('/', async (req, res) => {
  const formData = { name: req.body.name, birthdate: req.body.birthdate, address: req.body.address, email: req.body.email, password: req.body.password };
  const response = await createAccount(formData);

  if (response == 'already_exists') {
    res.status(400).json({ message: 'already_exists' });
  } else {
    res.status(201).json({ session: response });
  }
});

export default router;
