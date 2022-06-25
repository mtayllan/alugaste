import fetchApi from '../../fetchApi.js';

export const getLogin = (req, res) => {
  if (req.hostSignedIn) {
    res.redirect('/');
  } else {
    res.render('host/login');
  }
}

export const postLogin = async (req, res) => {
  const formData = { email: req.body.email, password: req.body.password };
  const response = await fetchApi('/hosts/login', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.accessToken) {
    res.cookie('_alugaste_host_session', response.accessToken);
    res.redirect('/');
  } else {
    res.render('host/login', { error: true, formData })
  }
}

