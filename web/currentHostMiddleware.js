import { authenticateByToken } from 'alugaste-core/host/authentication.js'

export const currentHostMiddleware = async (req, res, next) => {
  const token = req.cookies._alugaste_session;
  if (token) {
    const result = authenticateByToken();
    if (result !== 'invalid_token') {
      req.hostSignedIn = true;
      req.currentHost = result;
    }
  } else {
    req.hostSignedIn = false;
    req.currentHost = false;
  }
  next();
};
