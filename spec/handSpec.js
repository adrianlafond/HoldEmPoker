describe('Poker.Hand', function () {
  'use strict';
  var hand;

  beforeEach(function () {
    hand = new Hand();
  });

  it('should add a card to the hand', function () {
    hand.add('AS');
    expect(hand.has('AS')).toBe(true);
    expect(hand.has('2S')).toBe(false);
    expect(hand.cards.length).toBe(1);
  });

  it('should not add a card that the hand already has', function () {
    hand.add('AS');
    hand.add('AS');
    expect(hand.cards.length).toBe(1);
  });

  it('should set multiple cards at once', function () {
    hand.add('2S', '3S', '4S', '5S', '6S');
    expect(hand.has('2S')).toBe(true);
    expect(hand.has('3S')).toBe(true);
    expect(hand.cards[2].value).toBe('4S');
    expect(hand.cards[3].value).toBe('5S');
    expect(hand.has('6S')).toBe(true);
  });

  it('should set cards via multiple arguments', function () {
    hand = new Hand('2S', '3S', '4S', '5S', '6S');
    expect(hand.has('2S')).toBe(true);
    expect(hand.has('3S')).toBe(true);
    expect(hand.cards[2].value).toBe('4S');
    expect(hand.cards[3].value).toBe('5S');
    expect(hand.has('6S')).toBe(true);
  });
});
