import { getHost } from 'alugaste-core/hosts.js'
import fetchApi from '../fetchApi.js';

export const fetchHost = async (req, res) => {
  const host = await getHost(req.params.id);
  res.render('host_profile', { host, rooms: host.rooms })
}

export const fetchCurrentHost = async (req, res) => {
  const host = req.currentHost;
  const rooms = await fetchApi(`/rooms?host_id=${host._id}`);
  res.render('host_profile', { host, rooms })
}
