import tokenTypes from './tokenTypes';
import Token from './Token';

let {INTEGER, PLUS, MINUS, MUL, DIV, POW, EOF} = tokenTypes;

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

	expr() {
		let opers = {};

		// opers[PLUS] = (a, b) => a + b;
		// opers[MINUS] = (a, b) => a - b;
		opers[MUL] = (a, b) => a * b;
		opers[DIV] = (a, b) => a / b;
		// opers[POW] = (a, b) => Math.pow(a, b);

		let result = this.factor();

		while ([MUL, DIV].includes(this.currentToken.type)) {
			let token = this.currentToken;
			
			this.eat(token.type);
			result = opers[token.type](result, this.factor());
		}

		return result;
	}
}

export default Interpreter;