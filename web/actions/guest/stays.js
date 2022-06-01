import { viewStay } from 'alugaste-core/guest/stays.js'

export const getStay = (req, res) => {
  const stay = viewStay();
  res.render('guest/stays/view', { stay })
};
