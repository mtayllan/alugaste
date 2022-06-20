import { logout } from 'alugaste-core/guestAuth.js'

export const getLogout = async (req, res) => {
  if (req.guestSignedIn) {
    await logout(req.currentGuest);
  }
  res.redirect('/');
}
