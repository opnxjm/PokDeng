function cardValue(card) {
    if (card.value === 'A') return 1;
    if (['10', 'J', 'Q', 'K'].includes(card.value)) return 0;
    return Number(card.value); 
}

function handScore(hand) {
    const total = hand.reduce((sum, card) => sum + cardValue(card), 0);
    return total % 10;
}

function compareHands(playerScore, dealerScore) {
    if (playerScore > dealerScore) return 'win';
    if (playerScore < dealerScore) return 'lose';
    return 'tie';
}

module.exports = {
    cardValue,
    handScore,
    compareHands
};