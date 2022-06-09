import { findRoom } from "alugaste-core/rooms/rooms.js";

export const getCreate = async (req, res) => {
    const room = await findRoom(req.params.id);
    res.render('stay/create', { room, start_date: req.query.start_date, end_date: req.query.end_date, total_value: 500 , total_guests: req.query.total_guests})
    
  }