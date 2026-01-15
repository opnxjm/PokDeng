const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer));
    });
}

function closeCLI() {
    rl.close();
}

module.exports = {
    askQuestion,
    closeCLI
};
