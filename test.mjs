import Lexer from './Lexer';
import Interpreter from './Interpreter';

let text = '2 * 5 / 4';
let lexer = new Lexer(text);
let interpreter = new Interpreter(lexer);
let result = interpreter.expr();

console.log(result);
