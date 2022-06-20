import { authenticateByToken } from 'alugaste-core/guestAuth.js'

const clearAuthentication = (req, res) => {
  req.guestSignedIn = false;
  req.currentGuest = false;
  res.clearCookie('_alugaste_guest_session');
}

export const guestAuthentication = async (req, res, next) => {
  const token = req.cookies._alugaste_guest_session;
  if (token) {
    const result = await authenticateByToken(token);
    if (result !== 'invalid_token') {
      req.guestSignedIn = true;
      req.currentGuest = result;
      res.locals.guestSignedIn = true;
      res.locals.currentGuest = result;
    } else {
      clearAuthentication(req, res);
    }
  } else {
    clearAuthentication(req, res);
  }
  next();
};
