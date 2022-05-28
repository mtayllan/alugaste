import { logout } from 'alugaste-core/guest/authentication.js'

export const getLogout = async (req, res) => {
  if (req.guestSignedIn) {
    await logout(req.currentGuest);
  }
  res.redirect('/');
}
