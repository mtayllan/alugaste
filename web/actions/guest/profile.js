import fetchApi from "../../fetchApi.js";

export const getProfile = async (req,res) => {
  const stays = await fetchApi(`/stays?guestId=${req.currentGuest._id ?? ''}`);
  res.render('guest/profile/view', { stays, guest: req.currentGuest })
};
