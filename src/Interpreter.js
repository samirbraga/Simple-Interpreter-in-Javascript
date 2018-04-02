const tokenTypes = require('./tokenTypes');
const Token = require('./Token');

let {INTEGER, PLUS, MINUS, MUL, DIV, POW, EOF} = tokenTypes;

let opers = {};

opers[PLUS] = (a, b) => a + b;
opers[MINUS] = (a, b) => a - b;
opers[MUL] = (a, b) => a * b;
opers[DIV] = (a, b) => a / b;
// opers[POW] = (a, b) => Math.pow(a, b);


class Interpreter {
	constructor(lexer) {
		this.lexer = lexer;
		this.currentToken = this.lexer.getNextToken();
	}

	error() {
		throw new Error('Error parsing input');
	}

	eat(tokenType) {
		if (this.currentToken.type == tokenType) {
			this.currentToken = this.lexer.getNextToken();
		} else {
			this.error();
		}
	}

	factor() {
		let token = this.currentToken;
		this.eat(INTEGER);
		return token.value;
	}

	term() {
		let result = this.factor();

		while ([MUL, DIV].includes(this.currentToken.type)) {
			let token = this.currentToken;
			
			this.eat(token.type);
			result = opers[token.type](result, this.factor());
		}

		return result;
	}

	expr() {
		let result = this.term();

		while ([PLUS, MINUS].includes(this.currentToken.type)) {
			let token = this.currentToken;
			
			this.eat(token.type);
			result = opers[token.type](result, this.term());
		}

		return result;
	}
}

module.exports = Interpreter;