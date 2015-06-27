describe('Poker.Hand (comparisons)', function () {
  'use strict';

  var royalFlush = new Hand('AC', 'KC', 'QC', 'TC', '7D', '3S', 'JC');
  var straightFlush = new Hand('9C', '8C', 'QC', 'TC', '7D', '3S', 'JC');
  var fourOfAKind = new Hand('7S', '4H', 'KD', '4C', '4S', '9H', '4D');
  var fullHouse = new Hand('8H', 'KH', '7H', '8C', '7D', 'QS', '8D');
  var flush = new Hand('4S', '6S', '2D', '4D', '7S', 'AS', 'QS');
  var straight = new Hand('5D', 'QH', '6H', '3S', '4D', 'TH', '7C');
  var threeOfAKind = new Hand('QD', 'QS', '7H', 'QH');//, '8S', '2C', '3C');
  var twoPair = new Hand('8H', '7H', '5D', '8D', '7C', '2H', '2D');
  var onePair = new Hand('JH', '8D', 'JD', '2S', '3C', 'TC', '9H');
  var highCard = new Hand('KD', 'JH', '9S', '7C', '5D', '3H', '2S');

  it('should rank a royal flush correctly', function () {
    expect(Hand.highest(royalFlush, straightFlush)).toBe(royalFlush.id);
    expect(Hand.highest(royalFlush, fourOfAKind)).toBe(royalFlush.id);
    expect(Hand.highest(royalFlush, fullHouse)).toBe(royalFlush.id);
    expect(Hand.highest(royalFlush, flush)).toBe(royalFlush.id);
    expect(Hand.highest(royalFlush, straight)).toBe(royalFlush.id);
    expect(Hand.highest(royalFlush, threeOfAKind)).toBe(royalFlush.id);
    expect(Hand.highest(royalFlush, twoPair)).toBe(royalFlush.id);
    expect(Hand.highest(royalFlush, onePair)).toBe(royalFlush.id);
    expect(Hand.highest(royalFlush, highCard)).toBe(royalFlush.id);
  });

  it('should rank a straight flush correctly', function () {
    expect(Hand.highest(straightFlush, royalFlush)).toBe(royalFlush.id);
    expect(Hand.highest(straightFlush, fourOfAKind)).toBe(straightFlush.id);
    expect(Hand.highest(straightFlush, fullHouse)).toBe(straightFlush.id);
    expect(Hand.highest(straightFlush, flush)).toBe(straightFlush.id);
    expect(Hand.highest(straightFlush, straight)).toBe(straightFlush.id);
    expect(Hand.highest(straightFlush, threeOfAKind)).toBe(straightFlush.id);
    expect(Hand.highest(straightFlush, twoPair)).toBe(straightFlush.id);
    expect(Hand.highest(straightFlush, onePair)).toBe(straightFlush.id);
    expect(Hand.highest(straightFlush, highCard)).toBe(straightFlush.id);
  });

  it('should rank four of a kind correctly', function () {
    expect(Hand.highest(fourOfAKind, royalFlush)).toBe(royalFlush.id);
    expect(Hand.highest(fourOfAKind, straightFlush)).toBe(straightFlush.id);
    expect(Hand.highest(fourOfAKind, fullHouse)).toBe(fourOfAKind.id);
    expect(Hand.highest(fourOfAKind, flush)).toBe(fourOfAKind.id);
    expect(Hand.highest(fourOfAKind, straight)).toBe(fourOfAKind.id);
    expect(Hand.highest(fourOfAKind, threeOfAKind)).toBe(fourOfAKind.id);
    expect(Hand.highest(fourOfAKind, twoPair)).toBe(fourOfAKind.id);
    expect(Hand.highest(fourOfAKind, onePair)).toBe(fourOfAKind.id);
    expect(Hand.highest(fourOfAKind, highCard)).toBe(fourOfAKind.id);
  });

  it('should rank a full house correctly', function () {
    expect(Hand.highest(fullHouse, royalFlush)).toBe(royalFlush.id);
    expect(Hand.highest(fullHouse, straightFlush)).toBe(straightFlush.id);
    expect(Hand.highest(fullHouse, fourOfAKind)).toBe(fourOfAKind.id);
    expect(Hand.highest(fullHouse, flush)).toBe(fullHouse.id);
    expect(Hand.highest(fullHouse, straight)).toBe(fullHouse.id);
    expect(Hand.highest(fullHouse, threeOfAKind)).toBe(fullHouse.id);
    expect(Hand.highest(fullHouse, twoPair)).toBe(fullHouse.id);
    expect(Hand.highest(fullHouse, onePair)).toBe(fullHouse.id);
    expect(Hand.highest(fullHouse, highCard)).toBe(fullHouse.id);
  });

  it('should rank a flush correctly', function () {
    expect(Hand.highest(flush, royalFlush)).toBe(royalFlush.id);
    expect(Hand.highest(flush, straightFlush)).toBe(straightFlush.id);
    expect(Hand.highest(flush, fourOfAKind)).toBe(fourOfAKind.id);
    expect(Hand.highest(flush, fullHouse)).toBe(fullHouse.id);
    expect(Hand.highest(flush, straight)).toBe(flush.id);
    expect(Hand.highest(flush, threeOfAKind)).toBe(flush.id);
    expect(Hand.highest(flush, twoPair)).toBe(flush.id);
    expect(Hand.highest(flush, onePair)).toBe(flush.id);
    expect(Hand.highest(flush, highCard)).toBe(flush.id);
  });

  it('should rank a straight correctly', function () {
    expect(Hand.highest(straight, royalFlush)).toBe(royalFlush.id);
    expect(Hand.highest(straight, straightFlush)).toBe(straightFlush.id);
    expect(Hand.highest(straight, fourOfAKind)).toBe(fourOfAKind.id);
    expect(Hand.highest(straight, fullHouse)).toBe(fullHouse.id);
    expect(Hand.highest(straight, flush)).toBe(flush.id);
    expect(Hand.highest(straight, threeOfAKind)).toBe(straight.id);
    expect(Hand.highest(straight, twoPair)).toBe(straight.id);
    expect(Hand.highest(straight, onePair)).toBe(straight.id);
    expect(Hand.highest(straight, highCard)).toBe(straight.id);
  });

  it('should rank three of a kind correctly', function () {
    expect(Hand.highest(threeOfAKind, royalFlush)).toBe(royalFlush.id);
    expect(Hand.highest(threeOfAKind, straightFlush)).toBe(straightFlush.id);
    expect(Hand.highest(threeOfAKind, fourOfAKind)).toBe(fourOfAKind.id);
    expect(Hand.highest(threeOfAKind, fullHouse)).toBe(fullHouse.id);
    expect(Hand.highest(threeOfAKind, flush)).toBe(flush.id);
    expect(Hand.highest(threeOfAKind, straight)).toBe(straight.id);
    expect(Hand.highest(threeOfAKind, twoPair)).toBe(threeOfAKind.id);
    expect(Hand.highest(threeOfAKind, onePair)).toBe(threeOfAKind.id);
    expect(Hand.highest(threeOfAKind, highCard)).toBe(threeOfAKind.id);
  });

  it('should rank two pair correctly', function () {
    expect(Hand.highest(twoPair, royalFlush)).toBe(royalFlush.id);
    expect(Hand.highest(twoPair, straightFlush)).toBe(straightFlush.id);
    expect(Hand.highest(twoPair, fourOfAKind)).toBe(fourOfAKind.id);
    expect(Hand.highest(twoPair, fullHouse)).toBe(fullHouse.id);
    expect(Hand.highest(twoPair, flush)).toBe(flush.id);
    expect(Hand.highest(twoPair, straight)).toBe(straight.id);
    expect(Hand.highest(twoPair, threeOfAKind)).toBe(threeOfAKind.id);
    expect(Hand.highest(twoPair, onePair)).toBe(twoPair.id);
    expect(Hand.highest(twoPair, highCard)).toBe(twoPair.id);
  });

  it('should rank one pair correctly', function () {
    expect(Hand.highest(onePair, royalFlush)).toBe(royalFlush.id);
    expect(Hand.highest(onePair, straightFlush)).toBe(straightFlush.id);
    expect(Hand.highest(onePair, fourOfAKind)).toBe(fourOfAKind.id);
    expect(Hand.highest(onePair, fullHouse)).toBe(fullHouse.id);
    expect(Hand.highest(onePair, flush)).toBe(flush.id);
    expect(Hand.highest(onePair, straight)).toBe(straight.id);
    expect(Hand.highest(onePair, threeOfAKind)).toBe(threeOfAKind.id);
    expect(Hand.highest(onePair, twoPair)).toBe(twoPair.id);
    expect(Hand.highest(onePair, highCard)).toBe(onePair.id);
  });

  it('should rank a high card correctly', function () {
    expect(Hand.highest(highCard, royalFlush)).toBe(royalFlush.id);
    expect(Hand.highest(highCard, straightFlush)).toBe(straightFlush.id);
    expect(Hand.highest(highCard, fourOfAKind)).toBe(fourOfAKind.id);
    expect(Hand.highest(highCard, fullHouse)).toBe(fullHouse.id);
    expect(Hand.highest(highCard, flush)).toBe(flush.id);
    expect(Hand.highest(highCard, straight)).toBe(straight.id);
    expect(Hand.highest(highCard, threeOfAKind)).toBe(threeOfAKind.id);
    expect(Hand.highest(highCard, twoPair)).toBe(twoPair.id);
    expect(Hand.highest(highCard, onePair)).toBe(onePair.id);
  });

  it('shoudld rank multiple royal flushes correctly', function () {
    var h2 = new Hand('AH', 'KH', 'QH', 'TH', '7C', '3D', 'JH');
    expect(Hand.highest(royalFlush, h2)).toBe(null);
  });

  it('should rank multiple straight flushes correctly', function () {
    var h2 = new Hand('9H', 'KH', 'JH', 'QH', '9D', 'TH', '2S');
    expect(Hand.highest(straightFlush, h2)).toBe(h2.id);
  });

  it('should rank multiple four of a kinds correctly', function () {
    var h2 = new Hand('7C', '5H', 'KH', '5C', '5S', '9S', '5D');
    expect(Hand.highest(fourOfAKind, h2)).toBe(h2.id);
  });

  it('should rank multiple full houses correctly', function () {
    var h2 = new Hand('3H', 'KS', 'AH', '3C', 'AD', 'QS', '3D');
    expect(Hand.highest(fullHouse, h2)).toBe(fullHouse.id);
  });

  it('should rank multiple flushes correctly', function () {
    var h2 = new Hand('4H', '6H', '2C', '4C', '7H', 'KH', 'QH');
    expect(Hand.highest(flush, h2)).toBe(flush.id);
  });

  it('should rank multiple straights correctly', function () {
    var h2 = new Hand('5C', 'QD', '6S', '8D', '4C', 'TS', '7H');
    expect(Hand.highest(straight, h2)).toBe(h2.id);
  });

  it('should rank multiple three of a kinds correctly', function () {
    var h2 = new Hand('8D', '8S', '7D', '8H', 'AC');
    expect(Hand.highest(threeOfAKind, h2)).toBe(threeOfAKind.id);
  });

  it('should rank multiple two pairs correctly', function () {
    var h2 = new Hand('4D', '4H', '5D', '5H', 'AS');
    expect(Hand.highest(twoPair, h2)).toBe(twoPair.id);
  });

  it('should rank multiple one pairs correctly', function () {
    var h2 = new Hand('TH', '7D', 'TD', 'AS', '4C', '9C', '8H');
    expect(Hand.highest(onePair, h2)).toBe(onePair.id);
  });

  it('should rank multiple high cards correctly', function () {
    var h2 = new Hand('QD', 'TH', '8S', '6C', '9D', '2H', '3S');
    expect(Hand.highest(highCard, h2)).toBe(highCard.id);
  });
});
