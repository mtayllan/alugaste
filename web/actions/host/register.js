import fetch from 'node-fetch'

export const getRegister = (req, res) => {
  if (req.hostSignedIn) {
    res.redirect('/');
  } else {
    res.render('host/register');
  }
}

export const postRegister = async (req, res) => {
  const formData = { name: req.body.name, birthdate: req.body.birthdate, address: req.body.address, email: req.body.email, photo:req.body.photo, phone:req.body.phone, password: req.body.password };

  await fetch(`${process.env.PRIVATE_SERVER_URL}/hosts/`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(data => {
    if (data.session) {
      res.cookie('_alugaste_host_session', data.session);
      res.redirect('/');
    } else {
      res.render('host/register', { error: true, formData })
    }
  });
}
