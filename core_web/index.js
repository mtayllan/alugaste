import 'dotenv/config'
import express from 'express';
import rooms from './rooms.js'
import guests from './guests.js'
import comments from './comments.js'

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/rooms', rooms);
app.use('/guests', guests);
app.use('/comments', comments);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
