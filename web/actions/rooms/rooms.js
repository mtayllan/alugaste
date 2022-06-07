import { createRoom, getRooms, getRoom } from 'alugaste-core/rooms/rooms.js'

export const postRoom = async (req, res) => {
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
    host: req.currentHost._id
  };

  await createRoom(formData);
  res.redirect('/');
}

export const fetchRooms = async (req, res) => {
  const rooms = await getRooms(null, req.query.search);
  res.render('index', { rooms })
}

export const fetchRoom = async (req, res) => {
  const room = await getRoom(req.params.id);
  res.render('rooms/room', { room })
}
