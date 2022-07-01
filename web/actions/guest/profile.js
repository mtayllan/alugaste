import fetchApi from "../../fetchApi.js";

export const getProfile = async (req,res) => {
  const stays = await fetchApi(`/stays?guestId=${req.currentGuest._id ?? ''}`);
  res.render('guest/profile/view', { stays, guest: req.currentGuest })
};

export const editProfile = async (req, res) => {
  const formData = {
    name: req.currentGuest.name,
    phone: req.currentGuest.phone,
    photo: req.currentGuest.photo,
    email: req.currentGuest.email
  }

  res.render('guest/profile/edit', { formData });
}

export const updateProfile = async (req, res) => {
  const formData = {
    name: req.body.name,
    phone: req.body.phone,
    photo: req.body.photo,
    email: req.body.email,
    password: req.body.password != '' ? req.body.password : undefined
  }

  const response = await fetchApi(`/guests/${req.currentGuest._id}`, {
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  })

  if (response.status === 422) {
    res.render('guest/profile/edit', { formData, errors: true });
  } else {
    res.redirect('/guest/profile');
  }
}
