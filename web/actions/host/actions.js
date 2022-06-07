import { getHost } from 'alugaste-core/host/hosts.js'
import { getRooms } from 'alugaste-core/rooms/rooms.js';


export const fetchHost = async (req, res) => {
  const host = await getHost(req.params.id);
  const rooms = await getRooms(host._id, null)
  res.render('host_profile', { host, rooms })
}
