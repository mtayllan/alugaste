import express from 'express'
import { findRoom, listRooms, createRoom } from 'core/rooms.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/', limits: { fileSize: 1024 * 1024 } })

router.get('/', async (req, res) => {
  const hostId = req.params.host_id;
  const rooms = await listRooms(hostId, req.query.search);
  res.json(rooms);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const room = await findRoom(id);
  res.json(room);
});

router.post('/', upload.array('photos', 4), async (req, res) => {
  const formData = {
    name: req.body.name,
    description: req.body.description,
    maxGuests: parseInt(req.body.maxGuests),
    totalBathrooms: parseInt(req.body.totalBathrooms),
    totalRooms: parseInt(req.body.totalRooms),
    totalBeds: parseInt(req.body.totalBeds),
    others: req.body.others,
    pricePerNight: parseInt(req.body.pricePerNight),
    minNights: parseInt(req.body.minNights),
    maxNights: parseInt(req.body.maxNights),
    hostId: req.body.hostId,
    photos: req.files
  };

  const room = await createRoom(formData);

  res.json({}).status(201);
});

export default router;
