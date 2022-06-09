import { findRoom } from "alugaste-core/rooms/rooms.js";
import { parse,differenceInDays } from "date-fns";
import { createStay } from "alugaste-core/stays.js";
export const getCreate = async (req, res) => {
    const room = await findRoom(req.params.id);
    const start_date = parse(req.query.start_date, "dd/MM/y",new Date())
    const end_date = parse(req.query.end_date, "dd/MM/y",new Date())
    const numNights = differenceInDays(end_date,start_date)
    const total_value= (numNights * room.pricePerNight)
    res.render('stay/create', { room, start_date: req.query.start_date, end_date: req.query.end_date, total_value, total_guests: req.query.total_guests, numNights})
  }
export const postCreate = async(req,res) =>{
    const formData = {
        start_date: parse(req.body.start_date, "dd/MM/y",new Date()),
        end_date: parse(req.body.end_date, "dd/MM/y",new Date()),
        total_value: req.body.total_value,
        room_id: req.body.room_id,
        guest_id:req.currentGuest._id
      };
      await createStay(formData)
      res.redirect('/guest/profile')
}
