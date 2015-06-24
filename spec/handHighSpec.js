describe('Poker.Hand', function () {
  'use strict';

  it('should find a royal flush', function () {
    var hand = new Hand('AS', 'AC', 'TS', 'QS', 'QC', 'KS', 'JS');
    var result = Hand.findRoyalFlush(hand.cards);
    expect(result[0].value).toBe('AS');
    expect(result[1].value).toBe('KS');
    expect(result[2].value).toBe('QS');
    expect(result[3].value).toBe('JS');
    expect(result[4].value).toBe('TS');
    expect(result[5]).toBe(undefined);
  });
});
