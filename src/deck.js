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
    const playerHand = [deck.shift(), deck.shift()];
    const dealerHand = [deck.pop(), deck.pop()];
    return { playerHand, dealerHand };
}


module.exports = {
    createDeck,
    shuffleDeck,
    dealCard
};