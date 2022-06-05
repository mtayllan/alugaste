import { createRoom } from 'alugaste-core/rooms/rooms.js'

export const postRoom = async (req, res) => {
  console.log('estou em postroom')
  console.log(req.body)
  const formData = {
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
