let [INTEGER, PLUS, MINUS, MUL, DIV, POW, EOF] = ['INTEGER', 'PLUS', 'MINUS', 'MUL', 'DIV', 'POW', 'EOF'];

class Token {
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
}

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
			// if (this.currentChar === '+') {
			// this.advance();
			// return new Token(PLUS, '+');
			// }
			// if (this.currentChar === '-') {
			// this.advance();
			// return new Token(MINUS, '-');
			// }
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

let text = '2 * 5 / 2';
let lexer = new Lexer(text);
let interpreter = new Interpreter(lexer);
let result = interpreter.expr();

console.log(result);
