const tokenTypes = require('./tokenTypes');
const Token = require('./Token');

let {INTEGER, PLUS, MINUS, MUL, DIV, POW, EOF} = tokenTypes;

class Lexer {
	constructor(text) {
		this.text = text;
		this.pos = 0;
		this.currentChar = this.text[this.pos];
	}
	
	error() {
		throw new Error('Error parsing input');
	}
	
	advance() {
		this.pos += 1;
		if (this.pos > this.text.length - 1) {
			this.currentChar = null;
		} else {
			this.currentChar = this.text[this.pos];
		}
	}
	
	skipWhiteSpace () {
		while (this.currentChar !== null && /\s/g.test(this.currentChar)) {
			this.advance();
		}
	}
	
	integer() {
		let result = '';
		while (this.currentChar !== null && /[0-9]/g.test(this.currentChar)) {
			result += this.currentChar;
			this.advance();
		}
		return parseInt(result);
	}
	
	getNextToken() {
		while (this.currentChar !== null) {
			if (this.currentChar === ' ') {
				this.skipWhiteSpace();
				continue;
			}
			
			if (/[0-9]/.test(this.currentChar)) {
				return new Token(INTEGER, this.integer());
			}

			if (this.currentChar === '+') {
				this.advance();
				return new Token(PLUS, '+');
			}

			if (this.currentChar === '-') {
				this.advance();
				return new Token(MINUS, '-');
			}

			if (this.currentChar === '*') {
				this.advance();
				return new Token(MUL, '*');
			}
			
			if (this.currentChar === '/') {
				this.advance();
				return new Token(DIV, '/');
			}
			// if (this.currentChar === '^') {
			// this.advance(); // return new Token(POW, '^'); // }
			
			this.error();
		}
		
		return new Token(EOF, null);
	}
}

module.exports = Lexer;