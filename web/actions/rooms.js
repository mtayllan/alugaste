import { listRooms, findRoom } from 'alugaste-core/rooms/rooms.js'

export const getRooms = async (req, res) => {
  const rooms = await listRooms(null, req.query.search);
  res.clearCookie('_rooms_page');
  res.render('index', { rooms })
}

export const getRoomsJson = async (req, res) => {
  const current_page = parseInt(req.cookies._rooms_page) || 0;
  res.cookie('_rooms_page', current_page);
  const nextPage = current_page + 1;
  const rooms = await listRooms(null, req.query.search, nextPage);
  res.cookie('_rooms_page', nextPage);
  res.setHeader('Content-Type', 'application/json');
  res.json(rooms);
}

export const getRoom = async (req, res) => {
  const room = await findRoom(req.params.id);
  res.render('rooms/view', { room })
}
