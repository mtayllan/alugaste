import express from 'express';
import { getRooms } from 'alugaste-core/rooms.js';

const app = express()
const port = 3000

app.use(express.static('./web/assets'))
app.set('view engine', 'ejs');
app.set('views', './web/views')

app.get('/', (req, res) => {
  const rooms = getRooms();
  res.render('index', { rooms })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

