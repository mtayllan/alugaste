import { parseISO,differenceInDays } from "date-fns";
import fetchApi from '../../fetchApi.js'

export const getCreate = async (req, res) => {
  const room = await fetchApi(`/rooms/${req.params.id}`);
  const start_date = parseISO(req.query.start_date, "yyyy/MM/dd",new Date());
  const end_date = parseISO(req.query.end_date, "yyyy/MM/dd",new Date());
  const numNights = differenceInDays(end_date,start_date);
  const total_value= (numNights * room.pricePerNight);

  res.render('stay/create', {
    room,
    start_date: req.query.start_date,
    end_date: req.query.end_date,
    total_value,
    total_guests: req.query.total_guests,
    numNights
  })
}

export const postCreate = async(req,res) =>{
  const formData = {
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    total_value: req.body.total_value,
    room_id: req.body.room_id,
    guest_id: req.currentGuest._id
  };

  await fetchApi('/stays/', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  });

  res.redirect('/guest/profile')
}
