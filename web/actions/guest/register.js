import fetch from 'node-fetch'

export const getRegister = (req, res) => {
  if (req.guestSignedIn) {
    res.redirect('/');
  } else {
    res.render('guest/register');
  }
}

export const postRegister = async (req, res) => {
  const formData = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  };

  await fetch(`${process.env.PRIVATE_SERVER_URL}/guests/`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(data => {
    if (data.session) {
      res.cookie('_alugaste_guest_session', data.session);
      res.redirect('/');
    } else {
      res.render('guest/register', { error: true, formData })
    }
  });
}
