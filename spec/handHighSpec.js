describe('Poker.Hand (high ranks)', function () {
  'use strict';

  it('should find a flush', function () {
    var hand = new Hand('AC', '2S', 'QS', 'QC', 'KS', 'AS', 'JS');
    var result = Hand.findFlush(hand.cards);
    expect(result[0].value).toBe('AS');
    expect(result[1].value).toBe('KS');
    expect(result[2].value).toBe('QS');
    expect(result[3].value).toBe('JS');
    expect(result[4].value).toBe('2S');
    expect(result[5]).toBe(undefined);
  });

  it('should find a straight flush', function () {
    var hand = new Hand('AC', 'TS', 'QS', 'QC', 'KS', 'AS', 'JS');
    var result = Hand.findFlush(hand.cards);
    expect(result[0].value).toBe('AS');
    expect(result[1].value).toBe('KS');
    expect(result[2].value).toBe('QS');
    expect(result[3].value).toBe('JS');
    expect(result[4].value).toBe('TS');
    expect(result[5]).toBe(undefined);
  });

  it('should find a royal flush', function () {
    var hand = new Hand('AC', 'TS', 'QS', 'QC', 'KS', 'AS', 'JS');
    var result = Hand.findRoyalFlush(hand.cards);
    expect(result[0].value).toBe('AS');
    expect(result[1].value).toBe('KS');
    expect(result[2].value).toBe('QS');
    expect(result[3].value).toBe('JS');
    expect(result[4].value).toBe('TS');
    expect(result[5]).toBe(undefined);
  });

  it('should find four of a kind', function () {
    var hand = new Hand('9S', '3H', '8C', '9D', '9C', '9H');
    var values = pluck(hand.cardsHigh, 'value');
    expect(hand.rank).toBe(Hand.FOUR_OF_A_KIND);
    expect(values.indexOf('9S')).not.toBe(-1);
    expect(values.indexOf('9D')).not.toBe(-1);
    expect(values.indexOf('9C')).not.toBe(-1);
    expect(values.indexOf('9H')).not.toBe(-1);
    expect(hand.cardsHigh[4].value).toBe('8C');
  });
  //
  // it('should find a full house', function () {
  //   var hand = new Hand('9S', '3H', '8C', '9D', '9C', '3D');
  //   var result = Hand.findFullHouse(hand.cards);
  //   var values = pluck(result, 'value');
  //   var ranks = pluck(result, 'rank');
  //   expect(values.indexOf('9S')).not.toBe(-1);
  //   expect(values.indexOf('9D')).not.toBe(-1);
  //   expect(values.indexOf('9C')).not.toBe(-1);
  //   expect(values.indexOf('3H')).not.toBe(-1);
  //   expect(values.indexOf('3D')).not.toBe(-1);
  //   expect(ranks.indexOf('9')).toBe(0);
  //   expect(ranks[1]).toBe('9');
  //   expect(ranks.lastIndexOf('9')).toBe(2);
  //   expect(ranks.indexOf('3')).toBe(3);
  //   expect(ranks.lastIndexOf('3')).toBe(4);
  // });
  //
  // it('should find three of a kind', function () {
  //   var hand = new Hand('9S', '3H', '8C', '9D', '9C', '3D');
  //   var result = Hand.findFullHouse(hand.cards);
  //   var values = pluck(result, 'value');
  //   var ranks = pluck(result, 'rank');
  //   console.log(values);
  //   expect(values.indexOf('9S')).not.toBe(-1);
  //   expect(values.indexOf('9D')).not.toBe(-1);
  //   expect(values.indexOf('9C')).not.toBe(-1);
  //   expect(values.indexOf('8C')).toBe(3);
  //   expect(ranks.indexOf('3')).toBe(4);
  //   expect(ranks.indexOf('9')).toBe(0);
  //   expect(ranks[1]).toBe('9');
  //   expect(ranks.lastIndexOf('9')).toBe(2);
  //   expect(ranks.indexOf('3')).toBe(4);
  // });
});
