import { getHost } from 'alugaste-core/hosts.js'
import fetchApi from '../../fetchApi.js';

export const fetchHost = async (req, res) => {
  const host = await fetchApi(`/hosts/${req.params.id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })

  res.render('host_profile', { host, rooms: host.rooms })
}

export const fetchCurrentHost = async (req, res) => {
  const host = await fetchApi(`/hosts/${req.currentHost._id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  res.render('host_profile', { host, rooms: host.rooms })
}
