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

module.exports = {
    formatCard,
    formatHand
};