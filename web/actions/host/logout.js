import { logout } from 'alugaste-core/host/authentication.js'

export const getLogout = async (req, res) => {
  if (req.hostSignedIn) {
    await logout(req.currentHost);
  }
  res.redirect('/');
}
