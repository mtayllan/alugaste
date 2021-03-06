import 'dotenv/config'
import express from 'express';
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
import * as rooms from './actions/rooms.js';
import * as hostActions from './actions/host/actions.js'
import * as hostRooms from './actions/host/rooms.js';
import * as hostProfile from './actions/host/profile.js';
import * as guestProfile from './actions/guest/profile.js';
import * as stayCreate from './actions/stay/create.js'
const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/', limits: { fileSize: 1024 * 1024 } })

app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(hostAuthentication);
app.use(guestAuthentication);

// OPEN ROUTES
app.get('/', rooms.getRooms)
app.get('/rooms/json', rooms.getRoomsJson)
app.get('/rooms/:id', rooms.getRoom);
app.get('/hosts/:id', hostActions.fetchHost)
app.get('/rooms/:id/stay',stayCreate.getCreate)

// HOST ROUTES
app.get('/host/profile', hostActions.fetchCurrentHost)
app.get('/host/profile/edit', hostProfile.editProfile)
app.post('/host/profile/update', hostProfile.updateProfile)

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

app.get('/guest/profile', guestProfile.getProfile)
app.get('/guest/profile/edit', guestProfile.editProfile)
app.post('/guest/profile/update', guestProfile.updateProfile)
app.post('/stay/create', stayCreate.postCreate)

app.get('/guest/stays/:id', guestStays.getViewStay);
app.post('/guest/stays/rate', guestStays.postRateStay);
app.get('/guest/stays/:stay_id/comments/delete/:id', guestStays.deleteRateStay);
app.post('/guest/stays/:stay_id/comments/update/:id', guestStays.updateRateStay);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
