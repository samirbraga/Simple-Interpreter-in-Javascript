const readline = require('readline');
const Lexer = require('./src/Lexer');
const Interpreter = require('./src/Interpreter');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask () {
    
    rl.question('calc> ', (answer) => {
        let text = answer;
        
        let lexer = new Lexer(text);
        let interpreter = new Interpreter(lexer);
        let result = interpreter.expr();
        
        console.log(result);
        
        ask();
    });
}

ask();