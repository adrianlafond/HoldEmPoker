describe('Poker.Hand (high ranks)', function () {
  'use strict';

  it('should find a flush', function () {
    var hand = new Hand('AC', '2S', 'QS', 'QC', 'KS', 'AS', 'JS');
    expect(hand.rank).toBe(Poker.FLUSH);
    expect(hand.cardsHigh[0].value).toBe('AS');
    expect(hand.cardsHigh[1].value).toBe('KS');
    expect(hand.cardsHigh[2].value).toBe('QS');
    expect(hand.cardsHigh[3].value).toBe('JS');
    expect(hand.cardsHigh[4].value).toBe('2S');
    expect(hand.cardsHigh[5]).toBe(undefined);
  });

  it('should find a straight flush', function () {
    var hand = new Hand('9S', 'TS', 'QS', 'QC', 'KS', 'AH', 'JS');
    expect(hand.rank).toBe(Poker.STRAIGHT_FLUSH);
    expect(hand.cardsHigh[0].value).toBe('KS');
    expect(hand.cardsHigh[1].value).toBe('QS');
    expect(hand.cardsHigh[2].value).toBe('JS');
    expect(hand.cardsHigh[3].value).toBe('TS');
    expect(hand.cardsHigh[4].value).toBe('9S');
    expect(hand.cardsHigh[5]).toBe(undefined);
  });

  it('should find a royal flush', function () {
    var hand = new Hand('AC', 'TS', 'QS', 'QC', 'KS', 'AS', 'JS');
    expect(hand.rank).toBe(Poker.ROYAL_FLUSH);
    expect(hand.cardsHigh[0].value).toBe('AS');
    expect(hand.cardsHigh[1].value).toBe('KS');
    expect(hand.cardsHigh[2].value).toBe('QS');
    expect(hand.cardsHigh[3].value).toBe('JS');
    expect(hand.cardsHigh[4].value).toBe('TS');
    expect(hand.cardsHigh[5]).toBe(undefined);
  });

  it('should find four of a kind', function () {
    var hand = new Hand('9S', '3H', '8C', '9D', '9C', '9H');
    var values = pluck(hand.cardsHigh, 'value');
    expect(hand.rank).toBe(Poker.FOUR_OF_A_KIND);
    expect(values.indexOf('9S')).not.toBe(-1);
    expect(values.indexOf('9D')).not.toBe(-1);
    expect(values.indexOf('9C')).not.toBe(-1);
    expect(values.indexOf('9H')).not.toBe(-1);
    expect(hand.cardsHigh[4].value).toBe('8C');
  });

  it('should find a full house', function () {
    var hand = new Hand('9S', '3H', '8C', '9D', '9C', '3D');
    var values = pluck(hand.cardsHigh, 'value');
    var ranks = pluck(hand.cardsHigh, 'rank');
    expect(hand.rank).toBe(Poker.FULL_HOUSE);
    expect(values.indexOf('9S')).not.toBe(-1);
    expect(values.indexOf('9D')).not.toBe(-1);
    expect(values.indexOf('9C')).not.toBe(-1);
    expect(values.indexOf('3H')).not.toBe(-1);
    expect(values.indexOf('3D')).not.toBe(-1);
    expect(ranks.indexOf('9')).toBe(0);
    expect(ranks[1]).toBe('9');
    expect(ranks.lastIndexOf('9')).toBe(2);
    expect(ranks.indexOf('3')).toBe(3);
    expect(ranks.lastIndexOf('3')).toBe(4);
  });

  it('should find three of a kind', function () {
    var hand = new Hand('9S', '3H', '8C', '9D', '9C', '4D');
    var values = pluck(hand.cardsHigh, 'value');
    var ranks = pluck(hand.cardsHigh, 'rank');
    expect(hand.rank).toBe(Poker.THREE_OF_A_KIND);
    expect(values.indexOf('9S')).not.toBe(-1);
    expect(values.indexOf('9D')).not.toBe(-1);
    expect(values.indexOf('9C')).not.toBe(-1);
    expect(values.indexOf('8C')).toBe(3);
    expect(values.indexOf('4D')).toBe(4);
    expect(ranks.indexOf('9')).toBe(0);
    expect(ranks[1]).toBe('9');
    expect(ranks.lastIndexOf('9')).toBe(2);
  });

  it('should find two pair', function () {
    var hand = new Hand('9S', '3H', '8C', '9D', 'KH', '3D');
    var values = pluck(hand.cardsHigh, 'value');
    var ranks = pluck(hand.cardsHigh, 'rank');
    expect(hand.rank).toBe(Poker.TWO_PAIR);
    expect(values.indexOf('9S')).not.toBe(-1);
    expect(values.indexOf('9D')).not.toBe(-1);
    expect(values.indexOf('3H')).not.toBe(-1);
    expect(values.indexOf('3D')).not.toBe(-1);
    expect(values.indexOf('KH')).toBe(4);
    expect(ranks).toEqual(['9', '9', '3', '3', 'K']);
  });

  it('should find one pair', function () {
    var hand = new Hand('9S', '3H', '8C', '9D', 'KH', '4D');
    var values = pluck(hand.cardsHigh, 'value');
    var ranks = pluck(hand.cardsHigh, 'rank');
    expect(hand.rank).toBe(Poker.ONE_PAIR);
    expect(values.indexOf('9S')).not.toBe(-1);
    expect(values.indexOf('9D')).not.toBe(-1);
    expect(ranks).toEqual(['9', '9', 'K', '8', '4']);
  });

  it('should find a high card', function () {
    var hand = new Hand('9S', '3H', '8C', 'QD', 'KH', '4D');
    var values = pluck(hand.cardsHigh, 'value');
    expect(hand.rank).toBe(Poker.HIGH_CARD);
    expect(values).toEqual(['KH', 'QD', '9S', '8C', '4D']);
  });

  it('should find a straight', function () {
    var hand = new Hand('4H', '7H', '6S', '5D', 'AC', '8C', '2D');
    var values = pluck(hand.cardsHigh, 'value');
    expect(hand.rank).toBe(Poker.STRAIGHT);
    expect(values).toEqual(['8C', '7H', '6S', '5D', '4H']);
  });
});
