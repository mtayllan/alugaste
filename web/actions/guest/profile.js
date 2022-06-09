import { listStays } from 'alugaste-core/stays.js';

export const getProfile = async (req,res) => {
  const stays = await listStays(req.currentGuest._id)
  res.render('guest/profile/view', { stays, guest: req.currentGuest })
};
