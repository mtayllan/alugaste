import { login } from 'alugaste-core/host/authentication.js'

export const getLogin = (req, res) => {
  if (req.hostSignedIn) {
    res.redirect('/');
  } else {
    res.render('host/login');
  }
}

export const postLogin = async (req, res) => {
  const formData = { email: req.body.email, password: req.body.password };
  const response = await login(formData);
  if (response === 'not_found') {
    res.render('host/login', { error: true, formData })
  } else {
    res.cookie('_alugaste_host_session', response);
    res.redirect('/');
  }
}
