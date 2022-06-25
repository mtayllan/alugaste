import fetchApi from '../fetchApi.js';

const clearAuthentication = (req, res) => {
  req.guestSignedIn = false;
  req.currentGuest = false;
  res.clearCookie('_alugaste_guest_session');
}

const authenticateByToken = async (token) => {
  const guest = await fetchApi('/guests/validate_auth', { headers: {'token': token} });
  return guest;
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
