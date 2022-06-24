import 'dotenv/config'
import express from 'express';
import rooms from './rooms.js'
import guests from './guests.js'

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/rooms', rooms);
app.use('/guests', guests);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
