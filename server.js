const { CbusMessage } = require('./cbus.js')
const { LccMessage } = require('./lcc.js')
const can = require('socketcan')
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const socketIO = require('socket.io')
const server = http.createServer(app)

const io = socketIO(server, {
  cors: true,
  origins: ['http://localhost:3000']
})

const port = 3000
const room = 'general'

const channel = can.createRawChannel('can0', true /* ask for timestamps */)
channel.start()

app.use(cors())

/* route requests for static files to appropriate directory */
app.use(express.static('public'))

// final catch-all route to index.html defined last */
 app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
 })

io.on('connection', (socket) => {
  console.log('Client connected ....')
  socket.join(room)

  socket.on('disconnect', () => {
    console.log('Client disconnected ....')
    socket.leave(room)
  })
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function toHex (number) {
  return ('00000000' + number.toString(16)).slice(-8)
}

function handleStdMsg (id, data) {
  const msg = new CbusMessage(id, data)
  io.emit(room, msg.toString())
  console.log(msg.toString())
}

function handleExtMsg (id, data) {
  const msg = new LccMessage(id, data)
  io.emit(room, msg.toString())
  console.log(msg.toString())
}

function dumpPacket (msg) {
  if (msg.ext) {
    handleExtMsg(msg.id, msg.data)
  } else {
    handleStdMsg(msg.id, msg.data)
  }
  console.log('(' + (msg.ts_sec + msg.ts_usec / 1000000).toFixed(6) + ') ' +
    (msg.ext ? 'EXT:' : 'STD:') + toHex(msg.id).toUpperCase() + '#' + msg.data.toString('hex').toUpperCase() + '-' + JSON.stringify(msg))
}

channel.addListener('onMessage', dumpPacket)
