import { createAccount } from 'alugaste-core/guest/register.js'

export const getRegister = (req, res) => {
  if (req.guestSignedIn) {
    res.redirect('/');
  } else {
    res.render('guest/register');
  }
}

export const postRegister = async (req, res) => {
  const formData = { name: req.body.name, email: req.body.email, password: req.body.password };
  const response = await createAccount(formData);
  if (response === 'already_exists') {
    res.render('guest/register', { error: true, formData })
  } else {
    res.cookie('_alugaste_guest_session', response);
    res.redirect('/');
  }
}
