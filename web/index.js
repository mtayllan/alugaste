import 'dotenv/config'
import express from 'express';
import { getRooms, getRoom } from 'alugaste-core/rooms.js';
import { getHost } from 'alugaste-core/hosts.js'
import expressLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import { hostAuthentication } from './middlewares/hostAuthentication.js';
import { guestAuthentication } from './middlewares/guestAuthentication.js';
import * as hostLogin from './actions/host/login.js';
import * as hostRegister from './actions/host/register.js';
import * as guestLogin from './actions/guest/login.js';
import * as guestRegister from './actions/guest/register.js';
import * as guestLogout from './actions/guest/logout.js';
import * as guestStays from './actions/guest/stays.js';
import * as bookStays from './actions/book_stay/book_stay.js';
import * as myStays from './actions/my_stays/my_stays.js'
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

app.get('/hosts/:id', (req, res) => {
  const host = getHost(req.params.id);
  res.render('host_profile', { host })
})

app.get('/rooms/:id', (req, res) => {
  const room = getRoom(req.params.id);
  res.render('room', { room })
})

app.get('/host/login', hostLogin.getLogin);
app.post('/host/login', hostLogin.postLogin);
app.get('/host/register', hostRegister.getRegister);
app.post('/host/register', hostRegister.postRegister);

app.get('/guest/login', guestLogin.getLogin);
app.post('/guest/login', guestLogin.postLogin);
app.get('/guest/logout', guestLogout.getLogout);
app.get('/guest/register', guestRegister.getRegister)
app.post('/guest/register', guestRegister.postRegister)

app.get('/guest/stays/view', guestStays.getStay);
app.get('/book_stay/view',bookStays.getBookStay);
app.get('/my_stays/view',myStays.getMyStays);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
