import { getStay } from 'alugaste-core/stays.js'
import fetchApi from '../../fetchApi.js'

export const getViewStay = async (req, res) => {
  const stay = await getStay(req.params.id, req.currentGuest._id);
  res.render('guest/stays/view', { stay })
};

export const postRateStay = async (req, res) => {
  const params = { rating: req.body.rating, content: req.body.content, stay_id: req.body.stay_id }
  await fetchApi('/comments/', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' }
  })

  res.redirect(`/guest/stays/${req.body.stay_id}`);
}
