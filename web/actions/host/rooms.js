import { createRoom } from 'alugaste-core/rooms/rooms.js'

export const getNewRoom = (req, res) => {
  if (req.hostSignedIn) {
    res.render('host/rooms/new');
  } else {
    res.redirect('/host/login');
  }
};

export const postRoom = async (req, res) => {
  if (req.hostSignedIn) {
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
      hostId: req.currentHost._id,
      photos: req.files,
    };

    await createRoom(formData);
    res.redirect('/');
  } else {
    res.redirect('/host/login');
  }
};
