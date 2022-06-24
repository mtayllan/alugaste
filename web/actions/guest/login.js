import fetchApi from '../fetchApi.js';

export const getLogin = (req, res) => {
  if (req.guestSignedIn) {
    res.redirect('/');
  } else {
    res.render('guest/login');
  }
}

export const postLogin = async (req, res) => {
  const formData = { email: req.body.email, password: req.body.password };
  const response = await fetchApi('/guests/login', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.accessToken) {
    res.cookie('_alugaste_guest_session', response.accessToken);
    res.redirect('/');
  } else {
    res.render('guest/login', { error: true, formData })
  }
}
