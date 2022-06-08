import { listRooms, findRoom } from 'alugaste-core/rooms/rooms.js'

export const getRooms = async (req, res) => {
  const rooms = await listRooms(null, req.query.search);
  res.render('index', { rooms })
}

export const getRoomsJson = async (req, res) => {
  const rooms = await listRooms(null, req.query.search, req.query.page);
  res.setHeader('Content-Type', 'application/json');
  res.json(rooms);
}

export const getRoom = async (req, res) => {
  const room = await findRoom(req.params.id);
  res.render('rooms/view', { room })
}
