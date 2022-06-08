import 'dotenv/config'
import express from 'express';
import { getHost } from 'alugaste-core/hosts.js'
import expressLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { hostAuthentication } from './middlewares/hostAuthentication.js';
import { guestAuthentication } from './middlewares/guestAuthentication.js';
import * as hostLogin from './actions/host/login.js';
import * as hostLogout from './actions/host/logout.js';
import * as hostRegister from './actions/host/register.js';
import * as guestLogin from './actions/guest/login.js';
import * as guestRegister from './actions/guest/register.js';
import * as guestLogout from './actions/guest/logout.js';
import * as guestStays from './actions/guest/stays.js';
import * as bookStays from './actions/book_stay/book_stay.js';
import * as myStays from './actions/my_stays/my_stays.js'
import * as rooms from './actions/rooms.js';
import * as hostActions from './actions/host/actions.js'
import * as hostRooms from './actions/host/rooms.js';

const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/', limits: { fileSize: 1024 * 1024 } })

app.use(express.static('./web/assets'));
app.set('view engine', 'ejs');
app.set('views', './web/views');
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(hostAuthentication);
app.use(guestAuthentication);

// OPEN ROUTES
app.get('/', rooms.getRooms)
app.get('/rooms/:id', rooms.getRoom);
app.get('/hosts/:id', hostActions.fetchHost)

// HOST ROUTES
app.get('/host/profile', hostActions.fetchCurrentHost)

app.get('/host/login', hostLogin.getLogin);
app.post('/host/login', hostLogin.postLogin);
app.get('/host/logout', hostLogout.getLogout);

app.get('/host/register', hostRegister.getRegister);
app.post('/host/register', hostRegister.postRegister);

app.get('/host/rooms/new', hostRooms.getNewRoom);
app.post('/host/rooms', upload.array('photos', 4), hostRooms.postRoom);

// GUEST ROUTES
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
