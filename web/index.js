import express from 'express';
import { getRooms, getRoom } from 'alugaste-core/rooms.js';
import { getHost } from 'alugaste-core/hosts.js'

const app = express()
const port = 3000

app.use(express.static('./web/assets'))
app.set('view engine', 'ejs');
app.set('views', './web/views')

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

