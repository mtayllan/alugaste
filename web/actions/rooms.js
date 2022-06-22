import fetch from 'node-fetch'

export const getRooms = async (req, res) => {
  const rooms = await (await fetch(`${process.env.PRIVATE_SERVER_URL}/rooms?search${req.query.search}`)).json();
  res.render('index', { rooms })
}

export const getRoomsJson = async (req, res) => {
  const url = `${process.env.PRIVATE_SERVER_URL}/rooms?search${req.query.search ?? ''}&page=${req.query.page ?? ''}`; 
  const rooms = await (await fetch(url)).json();
  res.json(rooms);
}

export const getRoom = async (req, res) => {
  const room = await (await fetch(`${process.env.PRIVATE_SERVER_URL}/rooms/${req.params.id}`)).json();
  res.render('rooms/view', { room })
}
