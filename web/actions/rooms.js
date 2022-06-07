import { createRoom, listRooms, findRoom } from 'alugaste-core/rooms/rooms.js'

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

export const getRooms = async (req, res) => {
  const rooms = await listRooms(null, req.query.search);
  res.render('index', { rooms })
}

export const getRoom = async (req, res) => {
  const room = await findRoom(req.params.id);
  res.render('rooms/view', { room })
}
