import fetchApi from '../fetchApi.js';

const clearAuthentication = (req, res) => {
  req.hostSignedIn = false;
  req.currentHost = false;
  res.clearCookie('_alugaste_host_session');
}

const authenticateByToken = async (token) => {
  const host = await fetchApi('/hosts/validate_auth', { headers: {'token': token} });
  return host;
}

export const hostAuthentication = async (req, res, next) => {
  const token = req.cookies._alugaste_host_session;
  if (token) {
    const result = await authenticateByToken(token);
    if (result !== 'invalid_token') {
      req.hostSignedIn = true;
      req.currentHost = result;
      res.locals.hostSignedIn = true;
      res.locals.currentHost = result;
    } else {
      clearAuthentication(req, res);
    }
  } else {
    clearAuthentication(req, res);
  }
  next();
};
