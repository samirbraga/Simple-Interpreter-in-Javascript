module.exports = class {
	constructor(type, value) {
		this.type = type;
		this.value = value;
	}
	
	str() {
		return `Token(${this.type}, ${this.value.toString()})`;
	}
	
	repr() {
		return this.str();
	}
};