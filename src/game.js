const { createDeck, shuffleDeck, dealCard } = require('./deck');
const { handScore, compareHands } = require('./rules');
const { formatHand } = require('./format');
const { askQuestion, closeCLI } = require('./cli');

let totalChips = 0;

async function playOneRound() {
    let bet;

    while (true) {
        const input = await askQuestion('> Please put your bet\n> ');
        bet = Number(input);

        if (Number.isInteger(bet) && bet > 0) break;
        console.log('> Invalid bet. Please enter a positive integer\n>');
    }

    const deck = shuffleDeck(createDeck());
    const { playerHand, dealerHand } = dealCard(deck);

    console.log(`> You got ${formatHand(playerHand)}`);
    console.log(`> The dealer got ${formatHand(dealerHand)}`);

    const playerScore = handScore(playerHand);
    const dealerScore = handScore(dealerHand);

    const result = compareHands(playerScore, dealerScore);
    return { result, bet };
}

async function startGame() {
    while (true) {
        const { result, bet } = await playOneRound();

        if (result === 'win') {
        totalChips += bet;
        console.log(`> You won!!!, received ${bet} chips`);
        } else if (result === 'lose') {
        totalChips -= bet;
        console.log(`> You lost!!!, forfeited ${bet} chips`);
        } else {
        console.log(`> Tie!!! You still have ${totalChips} chips`);
        }

        const again = await askQuestion('> Wanna play more (Yes/No)?\n> ');
        if (again.toLowerCase() !== 'yes') break;
    }

    console.log(`> You got total ${totalChips} chips`);
    closeCLI();
}

module.exports = {
    startGame
};