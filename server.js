const {CbusMessage} = require('./cbus.js')
const {LccMessage} = require('./lcc.js')
const can = require('socketcan')
const express = require('express')
const app = express()
const port = 3000
const server = require('http').createServer(app);  
const io = require('socket.io')(server);

const channel = can.createRawChannel('can0', true /* ask for timestamps */)
channel.start()

/* route requests for static files to appropriate directory */
server.use('/public', express.static(__dirname + '/public'))

/* final catch-all route to index.html defined last */
server.get('/*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(client) {
  console.log('Client connected...');
  client.on('join', function(data) {
     console.log(data);
     client.emit('messages', 'Hello from server');
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



function toHex (number) {
  return ('00000000' + number.toString(16)).slice(-8)
}

function handleStdMsg (id, data) {
  const msg = new CbusMessage(id, data)
  io.emit('CBUS', msg.toString())
  console.log(msg.toString())
}

function handleExtMsg (id, data) {
  const msg = new LccMessage(id, data)
  io.emit('LCC', msg.toString())
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
