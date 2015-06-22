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

  it('should have a constant value', function () {
    var card = new Card({ value: '9S' });
    expect(function () {
      card.value = 'AC';
    }).toThrow();
  });

  it('should have correct enumerable values', function () {
    var card = new Card({ value: '9S' });
    var keys = _.keys(card);
    expect(keys.indexOf('value')).not.toBe(-1);
    expect(keys.indexOf('rank')).not.toBe(-1);
    expect(keys.indexOf('suit')).not.toBe(-1);
    expect(keys.indexOf('face')).not.toBe(-1);
    expect(keys.indexOf('community')).not.toBe(-1);
    expect(keys.indexOf('clone')).not.toBe(-1);
  });

  it('should clone a new card', function () {
    var card = new Card({ value: '9S' });
    var copy = card.clone();
    expect(card.value).toBe(copy.value);
    copy.face = Card.FACE_UP;
    expect(card.face).not.toBe(copy.face);
  });
});