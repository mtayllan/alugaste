import fetchApi from '../../fetchApi.js';

export const getLogout = async (req, res) => {
  if (req.hostSignedIn) {
    await fetchApi('/hosts/logout',{
      method: 'DELETE',
      headers: { token: req.currentHost.access_token},
    })
  }
  res.redirect('/');
}
