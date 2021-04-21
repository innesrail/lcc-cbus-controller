import buffer from 'buffer';

export default class LccMessage {
	constructor(id, data) {
		this.data = data;
		}
		
	toString() {
		return 'LCC: ' + this.data.toString('hex').toUpperCase();
	}

};
