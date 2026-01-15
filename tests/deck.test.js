const { createDeck, dealCard } = require('../src/deck');

describe('deck', () => {
    test('createDeck: has 52 unique cards', () => {
        const deck = createDeck();
        expect(deck).toHaveLength(52);
        const uniqueCards = new Set(deck.map(card => `${card.value} of ${card.suit}`));
        expect(uniqueCards.size).toBe(52);
    });
    test('dealCard: deals two cards each to player and dealer', () => {
        const deck = createDeck();
        const { playerHand, dealerHand } = dealCard(deck);
        expect(playerHand).toHaveLength(2);
        expect(dealerHand).toHaveLength(2);
        expect(deck).toHaveLength(48); 
    });
});