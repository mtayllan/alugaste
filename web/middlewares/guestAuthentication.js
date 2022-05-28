import { authenticateByToken } from 'alugaste-core/guest/authentication.js'

export const guestAuthentication = async (req, res, next) => {
  const token = req.cookies._alugaste_guest_session;
  if (token) {
    const result = authenticateByToken();
    if (result !== 'invalid_token') {
      req.guestSignedIn = true;
      req.currentGuest = result;
    }
  } else {
    req.guestSignedIn = false;
    req.currentGuest = false;
  }
  next();
};
