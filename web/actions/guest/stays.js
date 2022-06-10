import { getStay } from 'alugaste-core/stays.js'

export const getViewStay = async (req, res) => {
  const stay = await getStay(req.params.id, req.currentGuest._id);
  res.render('guest/stays/view', { stay })
};
