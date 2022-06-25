import fetchApi from '../../fetchApi.js';

export const getLogout = async (req, res) => {
  if (req.guestSignedIn) {
    await fetchApi('/guests/logout', {
      method: 'DELETE',
      headers: { token: req.currentGuest.access_token },
    })
  }
  res.redirect('/');
}
