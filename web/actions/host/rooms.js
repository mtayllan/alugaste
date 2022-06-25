import { FormData, fileFromSync } from 'node-fetch';
import fetchApi from '../../fetchApi.js';

export const getNewRoom = (req, res) => {
  if (req.hostSignedIn) {
    res.render('host/rooms/new');
  } else {
    res.redirect('/host/login');
  }
};

export const postRoom = async (req, res) => {
  if (req.hostSignedIn) {
    const formData = new FormData();
    req.files.forEach((file) => {
      const fileObj = fileFromSync(file.path, file.mimetype);
      formData.append('photos', fileObj)
    });
    formData.set('name', req.body.name);
    formData.set('description', req.body.description);
    formData.set('maxGuests',  parseInt(req.body.maxGuests));
    formData.set('totalBathrooms', parseInt(req.body.totalBathrooms));
    formData.set('totalRooms',  parseInt(req.body.totalRooms));
    formData.set('totalBeds',  parseInt(req.body.totalBeds));
    formData.set('others',  req.body.others ?? '');
    formData.set('pricePerNight', parseInt(req.body.pricePerNight));
    formData.set('minNights', parseInt(req.body.minNights));
    formData.set('maxNights', parseInt(req.body.maxNights));
    formData.set('hostId', req.currentHost._id);

    await fetchApi('/rooms', {
      method: 'POST',
      body: formData
    })

    res.redirect('/');
  } else {
    res.redirect('/host/login');
  }
};
