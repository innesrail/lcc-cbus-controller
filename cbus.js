// import buffer from 'buffer';

const opCodes = {
  0: 'ACK',
  1: 'NAK',
  2: 'HLT',
  3: 'BON',
  4: 'TOF',
  5: 'TON',
  6: 'ESTOP',
  7: 'ARST',
  8: 'RTOF',
  9: 'RTON',
  10: 'RESTP',
  12: 'RSTAT',
  13: 'QNN',
  16: 'RQNP',
  17: 'RQMN',
  33: 'KLOC',
  34: 'QLOC',
  35: 'DKEEP',
  48: 'DBG1',
  63: 'EXTC',
  64: 'RLOC',
  66: 'SNN',
  68: 'STMOD',
  69: 'PCON',
  70: 'KCON',
  71: 'DSPD',
  72: 'DFLG',
  73: 'DFNON',
  74: 'DFNOF',
  76: 'SSTAT',
  80: 'RQNN',
  81: 'NNREL',
  82: 'NNACK',
  83: 'NNLRN',
  84: 'NNULN',
  85: 'NNCLR',
  86: 'NNEVN',
  87: 'NERD',
  88: 'RQEVN',
  89: 'WRACK',
  90: 'RQDAT',
  91: 'RQDDS',
  92: 'BOOTM',
  93: 'ENUM',
  95: 'EXTC1',
  96: 'DFUN',
  97: 'GLOC',
  99: 'ERR',
  111: 'CMDERR',
  112: 'EVNLF',
  113: 'NVRD',
  114: 'NENRD',
  115: 'RQNPN',
  116: 'NUMEV',
  117: 'CANID',
  127: 'EXTC2',
  128: 'RDCC3',
  130: 'WCVO',
  131: 'WCVB',
  132: 'QCVS',
  133: 'PCVS',
  144: 'ACON',
  145: 'ACOF',
  146: 'AREQ',
  147: 'ARON',
  148: 'AROF',
  149: 'EVULN',
  150: 'NVSET',
  151: 'NVANS',
  152: 'ASON',
  153: 'ASOF',
  154: 'ASRQ',
  155: 'PARAN',
  156: 'REVAL',
  157: 'ARSON',
  158: 'ARSOF',
  159: 'EXTC3',
  160: 'RDCC4',
  162: 'WCVS',
  176: 'ACON1',
  177: 'ACOF1',
  178: 'REQEV',
  179: 'ARON1',
  180: 'AROF1',
  181: 'NEVAL',
  182: 'PNN',
  184: 'ASON1',
  185: 'ASOF1',
  189: 'ARSON1',
  190: 'ARSOF1',
  191: 'EXTC4',
  192: 'RDCC5',
  193: 'WCVOA',
  207: 'FCLK',
  208: 'ACON2',
  209: 'ACOF2',
  210: 'EVLRN',
  211: 'EVANS',
  212: 'ARON2',
  213: 'AROF2',
  216: 'ASON2',
  217: 'ASOF2',
  221: 'ARSON2',
  222: 'ARSOF2',
  223: 'EXTC5',
  224: 'RDCC6',
  225: 'PLOC',
  226: 'NAME',
  227: 'STAT',
  239: 'PARAMS',
  240: 'ACON3',
  241: 'ACOF3',
  242: 'ENRSP',
  243: 'ARON3',
  244: 'AROF3',
  245: 'EVLRNI',
  246: 'ACDAT',
  247: 'ARDAT',
  248: 'ASON3',
  249: 'ASOF3',
  250: 'DDES',
  251: 'DDRS',
  253: 'ARSON3',
  254: 'ARSOF3',
  255: 'EXTC6'
}

class CbusMessage {
  constructor (id, data) {
    this.data = data
    this.mjPri = (id & 0b11000000000) >> 9
    this.minPri = (id & 0b00110000000) >> 7
    this.canId = id & 0b00011111
    this.dataLen = (data.readUInt8(0) & 0b11100000) >> 5
	this.opCode = data.readUInt8(0)
    this.opCodeName = (this.opCode in opCodes)
      ? opCodes[this.opCode]
      : 'UNDEFINED'
    this.data_1_2 = (this.dataLen > 2) 
		? this.data[1] << 8 + this.data[2] : 0
	this.data_3_4 = (this.dataLen > 4)
		? this.data[3] << 8 + this.data[4] : 0
  }

  toString () {
    return 'CBUS: [' + this.mjPri +
		'|' + this.minPri + '] ' + this.canId + ' : ' + this.opCode + 
		'-' + this.opCodeName + ' (' + this.dataLen + ') [' + 
		((this.dataLen >= 1) ? 
			this.data[1].toString(16).toUpperCase() + ' ' : '') + 
		((this.dataLen >= 2) ? 
			this.data[2].toString(16).toUpperCase() + ' ' : '') +
		((this.dataLen >= 3) ? 
			this.data[3].toString(16).toUpperCase() + ' ' : '') + 
		((this.dataLen >= 4) ? 
			this.data[4].toString(16).toUpperCase() + ' ' : '') + 
		((this.dataLen >= 5) ? 
			this.data[5].toString(16).toUpperCase() + ' ' : '') + 
		((this.dataLen >= 6) ? 
			this.data[6].toString(16).toUpperCase() + ' ' : '') +
		((this.dataLen >= 7) ?
			this.data[7].toString(16).toUpperCase() + ' ' : '') + ']'
  }
};

exports.CbusMessage = CbusMessage
