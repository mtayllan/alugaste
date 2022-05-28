import 'dotenv/config'
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { getRooms } from 'alugaste-core/rooms.js';
import { login as hostLogin } from 'alugaste-core/host/authentication.js'
import { login as guestLogin } from 'alugaste-core/guest/authentication.js'
import cookieParser from 'cookie-parser';
import { currentHostMiddleware } from './currentHostMiddleware.js';
import { currentGuestMiddleware } from './currentGuestMiddleware.js';

const app = express();
const port = 3000;

app.use(express.static('./web/assets'));
app.set('view engine', 'ejs');
app.set('views', './web/views');
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(currentHostMiddleware);
app.use(currentGuestMiddleware);

app.get('/', (req, res) => {
  const rooms = getRooms();
  res.render('index', { rooms })
})

app.get('/host/login', (req, res) => {
  if (req.hostSignedIn) {
    res.redirect('/');
  } else {
    res.render('host/login');
  }
})

app.get('/guest/login', (req, res) => {
  if (req.guestSignedIn) {
    res.redirect('/');
  } else {
    res.render('guest/login');
  }
})

app.post('/host/login', async (req, res) => {
  const formData = { email: req.body.email, password: req.body.password };
  const response = await hostLogin(formData);
  if (response === 'not_found') {
    res.render('host/login', { error: true, formData })
  } else {
    res.cookie('_alugaste_host_session', response);
    res.redirect('/');
  }
});

app.post('/guest/login', async (req, res) => {
  const formData = { email: req.body.email, password: req.body.password }
  const response = await guestLogin(formData)
  if (response === 'not_found') {
    res.render('guest/login', { error: true, formData })
  } else {
    res.cookie('_alugaste_guest_session', response);
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
