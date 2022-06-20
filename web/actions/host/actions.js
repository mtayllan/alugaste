import { getHost } from 'alugaste-core/hosts.js'
import { listRooms } from 'alugaste-core/rooms.js';

export const fetchHost = async (req, res) => {
  const host = await getHost(req.params.id);
  const rooms = await listRooms(host._id, null)
  res.render('host_profile', { host, rooms })
}

export const fetchCurrentHost = async (req, res) => {
  const host = req.currentHost;
  const rooms = await listRooms(host._id, null)
  res.render('host_profile', { host, rooms })
}
