import { findRoom } from "alugaste-core/rooms.js";
import { parseISO,differenceInDays } from "date-fns";
import { createStay } from "alugaste-core/stays.js";

export const getCreate = async (req, res) => {
  const room = await findRoom(req.params.id);
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
    start_date: parseISO(req.body.start_date, "yyyy/MM/dd", new Date()),
    end_date: parseISO(req.body.end_date, "yyyy/MM/dd", new Date()),
    total_value: req.body.total_value,
    room_id: req.body.room_id,
    guest_id:req.currentGuest._id
  };
  await createStay(formData)
  res.redirect('/guest/profile')
}
