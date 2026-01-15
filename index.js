const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function createDeck() {
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({suit: suit, value: value});
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function dealCard(deck) {
    const playerCard = [deck.shift(), deck.shift()];
    const dealerCard = [deck.pop(), deck.pop()];
    return { playerCard, dealerCard };
}

function calculateHandValue(hand) {
    let total = 0;
    for (let card of hand) {
        if (card.value === 'A') {
            total += 1;
        } else if (['10', 'J', 'Q', 'K'].includes(card.value)) {
            total += 0;
        } else {
            total += parseInt(card.value);
        }
    }
    return total % 10;
}

function compareHands(playerValue, dealerValue) {
    if (playerValue > dealerValue) return 'win';
    if (playerValue < dealerValue) return 'lose';
    return 'tie';
}

function formatCard(card) {
    let name = card.value;
    if (card.value === 'A') name = 'Ace';
    if (card.value === 'J') name = 'Jack';
    if (card.value === 'Q') name = 'Queen';
    if (card.value === 'K') name = 'King';
    return `${card.suit}-${name}`;
}

function formatHand(hand) {
    return hand.map(formatCard).join(', ');
}

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function playOneRound() {
    let betAmount;

    while (true) {
        const input = await askQuestion('> Please put your bet\n> ');
        betAmount = Number(input);
        if (Number.isFinite(betAmount) && betAmount > 0) break;
        console.log('> Invalid bet. Please enter a positive number.');
    }

    const deck = shuffleDeck(createDeck());
    const { playerCard, dealerCard } = dealCard(deck);

    console.log(`> You got ${formatHand(playerCard)}`);
    console.log(`> The dealer got ${formatHand(dealerCard)}`);

    const playerValue = calculateHandValue(playerCard);
    const dealerValue = calculateHandValue(dealerCard);

    const result = compareHands(playerValue, dealerValue);
    return { result, betAmount };
}

let totalChips = 0;

async function main() {
    while (true) {
        const {result, betAmount} = await playOneRound();
        if (result === 'win') {
            totalChips += betAmount;
            console.log(`> You won!!!, received ${betAmount} chips`);
        } else if (result === 'lose') {
            totalChips -= betAmount;
            console.log(`> You lost!!!, forfeited ${betAmount} chips`);
        } else {
            console.log(`> Tie!!! You still have ${totalChips} chips`);
        }

        const playAgain = await askQuestion('> Wanna play more (Yes/No)?\n> ');
        if (playAgain.toLowerCase() !== 'yes') break;
    }
    console.log(`> You got total ${totalChips} chips`);
}

main().then(() => rl.close());