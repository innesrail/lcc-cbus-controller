import CbusMessage from './cbus.js'
import LccMessage from './lcc.js'
import can from 'socketcan'
import buffer from 'buffer'

// var can = require('socketcan');
//var buffer = require('buffer');

var channel = can.createRawChannel("can0", true /* ask for timestamps */);
channel.start();

function toHex(number) {
  return ("00000000" + number.toString(16)).slice(-8);
}

function handleStdMsg(id, data) {
  let msg = new CbusMessage(id, data);
  console.log(msg.toString());
}

function handleExtMsg(id, data) {
  let msg = new LccMessage(id, data);
  console.log(msg.toString());
}

function dumpPacket(msg) {
  if (msg.ext) {
    handleExtMsg(msg.id, msg.data);
  } else {
    handleStdMsg(msg.id, msg.data);
  }
  console.log('(' + (msg.ts_sec + msg.ts_usec / 1000000).toFixed(6) + ') ' +
    (msg.ext ? 'EXT:' : 'STD:') + toHex(msg.id).toUpperCase() + '#' + msg.data.toString('hex').toUpperCase() + '-' + JSON.stringify(msg));
}

channel.addListener("onMessage", dumpPacket);
