import fetchApi from '../../fetchApi.js'

export const getViewStay = async (req, res) => {
  const stay = await fetchApi(`/stays/${req.params.id}/guests/${req.currentGuest._id}/`);
  stay.start_date = new Date (Date.parse(stay.start_date))
  stay.end_date = new Date (Date.parse(stay.end_date))
  res.render('guest/stays/view', { stay })
};

export const postRateStay = async (req, res) => {
  const params = {
    rating: req.body.rating,
    content: req.body.content,
    stay_id: req.body.stay_id,
    room_id: req.body.room_id,
    guest_id: req.currentGuest._id
  }
  await fetchApi('/comments/', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' }
  });

  res.redirect(`/guest/stays/${req.body.stay_id}`);
}
