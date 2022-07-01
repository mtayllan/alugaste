import fetchApi from "../../fetchApi.js";

export const getProfile = async (req,res) => {
  const stays = await fetchApi(`/stays?hostId=${req.currentHost._id ?? ''}`);
  res.render('host/profile/view', { stays, host: req.currentHost })
};

export const editProfile = async (req, res) => {
  const formData = {
    name: req.currentHost.name,
    phone: req.currentHost.phone,
    email: req.currentHost.email,
    photo: req.currentHost.photo,
    birthdate:req.currentHost.birthdate,
    address:req.currentHost.address
  }

  res.render('host/profile/edit', { formData });
}

export const updateProfile = async (req, res) => {
  const formData = {
    name: req.body.name,
    phone: req.body.phone,
    photo: req.body.photo,
    email: req.body.email,
    birthdate:req.body.birthdate,
    address:req.body.address,
    password: req.body.password != '' ? req.body.password : undefined
  }

  const response = await fetchApi(`/hosts/${req.currentHost._id}`, {
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  })

  if (response.status === 422) {
    res.render('host/profile/edit', { formData, errors: true });
  } else {
    res.redirect('/host/profile');
  }
}
