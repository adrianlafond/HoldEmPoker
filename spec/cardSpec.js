describe('Poker.Card', function () {
  'use strict';

  it('should have the correct rank and suit', function () {
    var card = new Card({ value: '9S' });
    expect(card.value).toBe('9S');
    expect(card.rank).toBe('9');
    expect(card.suit).toBe('S');
  });

  it('should face up or down correctly', function () {
    var card = new Card({ value: '9S' });
    expect(card.face).toBe(Card.FACE_DOWN);
    card.face = Card.FACE_UP;
    expect(card.face).toBe(Card.FACE_UP);
  });

  it('should not be a community card by default', function () {
    var card = new Card({ value: '9S' });
    expect(card.community).toBe(false);
  });

  it('should clone a new card', function () {
    var card = new Card({ value: '9S' });
    var copy = card.clone();
    expect(card.value).toBe(copy.value);
    copy.face = Card.FACE_UP;
    expect(card.face).not.toBe(copy.face);
  });
});