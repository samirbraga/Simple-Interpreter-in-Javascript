const Lexer = require('./src/Lexer');
const Interpreter = require('./src/Interpreter');

let text = '2 + 5 * 4 + 2 / 1';

let lexer = new Lexer(text);
let interpreter = new Interpreter(lexer);
let result = interpreter.expr();

console.log(result);
