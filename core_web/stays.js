import express from 'express'
import { listStays, getStay, createStay } from 'core/stays.js';
import { parseISO } from "date-fns";

const router = express.Router();

router.post('/', async (req, res) => {
  const formData = {
    start_date: parseISO(req.body.start_date, "yyyy/MM/dd", new Date()),
    end_date: parseISO(req.body.end_date, "yyyy/MM/dd", new Date()),
    total_value: req.body.total_value,
    room_id: req.body.room_id,
    guest_id: req.body.guest_id,
  };

  await createStay(formData);
  res.json({}).status(201);
});

router.get('/:id/guests/:guest_id/', async (req, res) => {
  const id = req.params.id;
  const guestId = req.params.guest_id;
  const stay = await getStay(id, guestId);

  if (stay) {
    res.json(stay).status(200);
  } else {
    res.sendStatus(404);
  }
});

router.get('/', async (req, res) => {
  const stays = await listStays(req.query.guestId);

  if (stays) {
    res.json(stays).status(200);
  } else {
    res.sendStatus(404);
  }
});

export default router;
