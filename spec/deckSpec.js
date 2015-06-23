describe('Poker.Deck', function () {
  'use strict';

  // no jokers
  it('should be a proper deck', function () {
    var deck = new Deck();
    expect(deck.cards.length).toBe(Deck.SIZE);
    expect(deck.isImmaculate()).toBe(true);
    deck.shuffle();
    expect(deck.isShuffled()).toBe(true);
    expect(deck.isImmaculate()).toBe(false);

    deck.deal();
    deck.deal();
    deck.deal();
    deck.deal();
    deck.deal();
    expect(deck.cards.length).toBe(47);

    deck.deal();
    deck.deal();
    deck.deal();
    deck.deal();
    deck.deal();
    expect(deck.cards.length).toBe(42);
    expect(deck.isImmaculate()).toBe(false);

    expect(deck.jokers).toBe(0);
  });

  it('should attempt to add 2 jokers at instantiation', function () {
    var deck = new Deck({ jokers: 2 });
    expect(deck.jokers).toBe(2);
    expect(deck.cards.length).toBe(54);
  });

  it('should attempt to add 4 jokers at instantiation', function () {
    var deck = new Deck({ jokers: 4 });
    expect(deck.jokers).toBe(4);
    expect(deck.cards.length).toBe(56);
  });

  it('should attempt to add 9 jokers at instantiation', function () {
    var deck = new Deck({ jokers: 9 });
    expect(deck.jokers).toBe(Deck.MAX_JOKERS);
    expect(deck.cards.length).toBe(56);
  });

  it('should attempt to add -3 jokers at instantiation', function () {
    var deck = new Deck({ jokers: -3 });
    expect(deck.jokers).toBe(0);
    expect(deck.cards.length).toBe(52);
  });

  it('should attempt to add "some" jokers at instantiation', function () {
    var deck = new Deck({ jokers: 'some' });
    expect(deck.jokers).toBe(0);
    expect(deck.cards.length).toBe(52);
  });

  it('should attempt to add 2.647993432 jokers at instantiation', function () {
    var deck = new Deck({ jokers: 2.647993432 });
    expect(deck.jokers).toBe(2);
    expect(deck.cards.length).toBe(54);
  });

  it('should shuffle a deck', function () {
    var deck = new Deck();
    expect(deck.isShuffled()).toBe(false);
    expect(pluck(deck.cards, 'value')).toEqual(Deck.CARDS);
    deck.shuffle();
    expect(deck.isShuffled()).toBe(true);
    expect(pluck(deck.cards, 'value')).not.toEqual(Deck.CARDS);
  });

  function pluck(array, key) {
    var arr = array.map(function (obj) {
      return obj[key];
    });
    return arr;
  }
});
