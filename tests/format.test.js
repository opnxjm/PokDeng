const { formatCard, formatHand } = require('../src/format');

describe('formatCard', () => {
    test('formats Ace correctly', () => {
        const card = { suit: 'Hearts', value: 'A' };
        expect(formatCard(card)).toBe('Hearts-Ace');
    });

    test('formats face cards correctly', () => {
        expect(formatCard({ suit: 'Spades', value: 'J' })).toBe('Spades-Jack');
        expect(formatCard({ suit: 'Clubs', value: 'Q' })).toBe('Clubs-Queen');
        expect(formatCard({ suit: 'Diamonds', value: 'K' })).toBe('Diamonds-King');
    });

    test('formats number cards correctly', () => {
        expect(formatCard({ suit: 'Hearts', value: '9' })).toBe('Hearts-9');
        expect(formatCard({ suit: 'Clubs', value: '10' })).toBe('Clubs-10');
    });
});

describe('formatHand', () => {
    test('formats multiple cards in order', () => {
        const hand = [
            { suit: 'Clubs', value: 'K' },
            { suit: 'Hearts', value: '9' },
        ];
        expect(formatHand(hand)).toBe('Clubs-King, Hearts-9');
    });

    test('formats single card hand', () => {
        const hand = [{ suit: 'Spades', value: 'A' }];
        expect(formatHand(hand)).toBe('Spades-Ace');
    });
});