import { login } from 'alugaste-core/guestAuth.js'

export const getLogin = (req, res) => {
  if (req.guestSignedIn) {
    res.redirect('/');
  } else {
    res.render('guest/login');
  }
}

export const postLogin = async (req, res) => {
  const formData = { email: req.body.email, password: req.body.password };
  const response = await login(formData);
  if (response === 'not_found') {
    res.render('guest/login', { error: true, formData })
  } else {
    res.cookie('_alugaste_guest_session', response);
    res.redirect('/');
  }
}
