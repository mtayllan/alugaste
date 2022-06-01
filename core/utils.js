import { createHmac } from 'crypto';

export const hashMessage = (message) => {
  return createHmac("sha512", process.env.SECRET).update(message).digest('hex');
}
