//import buffer from 'buffer'

class LccMessage {
  constructor (id, data) {
    this.data = data
  }

  toString () {
    return 'LCC: ' + this.data.toString('hex').toUpperCase()
  }
};

exports.LccMessage = LccMessage
