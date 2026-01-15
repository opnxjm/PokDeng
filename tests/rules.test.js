const { cardValue, handScore, compareHands } = require('../src/rules');

describe('rules', () => {
    test('cardValue: Ace = 1', () => {
        expect(cardValue({ value: 'A' })).toBe(1);
    });

    test('cardValue: 2-9 = face value', () => {
        expect(cardValue({ value: '2' })).toBe(2);
        expect(cardValue({ value: '9' })).toBe(9);
    });

    test('cardValue: 10/J/Q/K = 0', () => {
        expect(cardValue({ value: '10' })).toBe(0);
        expect(cardValue({ value: 'J' })).toBe(0);
        expect(cardValue({ value: 'Q' })).toBe(0);
        expect(cardValue({ value: 'K' })).toBe(0);
    });

    test('handScore: uses mod 10', () => {
        expect(handScore([{ value: '9' }, { value: 'A' }])).toBe(0);
        expect(handScore([{ value: '7' }, { value: '8' }])).toBe(5);
        expect(handScore([{ value: 'K' }, { value: '9' }])).toBe(9);
        expect(handScore([{ value: 'A' }, { value: 'A' }])).toBe(2);
        expect(handScore([{ value: 'J' }, { value: 'Q' }])).toBe(0);
    });

    test('compareHands', () => {
        expect(compareHands(8, 7)).toBe('win');
        expect(compareHands(3, 9)).toBe('lose');
        expect(compareHands(5, 5)).toBe('tie');
    });

});