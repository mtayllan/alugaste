import { createAccount } from 'alugaste-core/host/register.js'

export const getRegister = (req, res) => {
  if (req.hostSignedIn) {
    res.redirect('/');
  } else {
    res.render('host/register');
  }
}

export const postRegister = async (req, res) => {
  const formData = { name: req.body.name, birthdate: req.body.birthdate, email: req.body.email, password: req.body.password };
  const response = await createAccount(formData);
  if (response === 'already_exists') {
    res.render('host/register', { error: true, formData })
  } else {
    res.cookie('_alugaste_host_session', response);
    res.redirect('/');
  }
}
