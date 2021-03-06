import fetchApi from '../fetchApi.js';

export const getRooms = async (req, res) => {
  const rooms = await fetchApi(`/rooms?search=${req.query.search ?? ''}`);
  res.render('index', { rooms })
}

export const getRoomsJson = async (req, res) => {
  const rooms = await fetchApi(`/rooms?search=${req.query.search ?? ''}&page=${req.query.page ?? ''}`);
  res.json(rooms);
}

export const getRoom = async (req, res) => {
  const room = await fetchApi(`/rooms/${req.params.id}`);
  if (room.status == 404) {
    res.render('rooms/not_found')
  } else {
    res.render('rooms/view', { room })
  }
}
