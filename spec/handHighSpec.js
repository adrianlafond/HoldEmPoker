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
    var result = Hand.findFourOfAKind(hand.cards);
    var values = pluck(result, 'value');
    expect(values.indexOf('9S')).not.toBe(-1);
    expect(values.indexOf('9D')).not.toBe(-1);
    expect(values.indexOf('9C')).not.toBe(-1);
    expect(values.indexOf('9H')).not.toBe(-1);
    expect(result[4].value).toBe('8C');
  });
});
