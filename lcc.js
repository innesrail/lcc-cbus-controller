//import buffer from 'buffer'


class LccMessage {
  constructor (id, data) {
    this.id = id
    this.data = data
    this.header = {
      'openLCBFrame' : (this.id & 0x08000000) >> 27,
      'frameType' : (this.id & 0x07000000) >> 24,
      'variableField' : (this.id & 0x00FFF000) >> 12,
      'sourceNIDAlias' : (this.id & 0x00000FFF),
      'MTI' : {
        'staticPriority' : (this.id & 0x00C00000) >> 22,
        'typeInPriority' : (this.id & 0x003E0000) >> 17,
        'simpleNodeFlag' : (this.id & 0x00010000) >> 16,
        'addressPresent' : (this.id & 0x00008000) >> 15,
        'eventIDPresent' : (this.id & 0x00004000) >> 14,
        'modifierBits' : (this.id & 0x00003000) >> 12
      }  
    }
  }

  toString () {
    return 'LCC: header=(' + this.header.variableField.toString(16) + ') ' + JSON.stringify(this.header) + ' data=' + this.data.toString('hex').toUpperCase()
  }
};

class LccNode {

}

class LCC {
  constructor () {
    this.nodes = []
  }

}

exports = {
  LccMessage : LccMessage,
  LccNode : LccNode,
  LCC : LCC
}
