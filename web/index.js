import 'dotenv/config'
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { getRooms } from 'alugaste-core/rooms.js';
import { login as guestLogin } from 'alugaste-core/guest/authentication.js'
import cookieParser from 'cookie-parser';
import { hostAuthentication } from './middlewares/hostAuthentication.js';
import { guestAuthentication } from './middlewares/guestAuthentication.js';
import * as hostLogin from './actions/host/login.js';

const app = express();
const port = 3000;

app.use(express.static('./web/assets'));
app.set('view engine', 'ejs');
app.set('views', './web/views');
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(hostAuthentication);
app.use(guestAuthentication);

app.get('/', (req, res) => {
  const rooms = getRooms();
  res.render('index', { rooms })
})

app.get('/host/login', hostLogin.getLogin);
app.post('/host/login', hostLogin.postLogin);

app.get('/guest/login', (req, res) => {
  if (req.guestSignedIn) {
    res.redirect('/');
  } else {
    res.render('guest/login');
  }
})

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
