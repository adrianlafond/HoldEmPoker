'use strict'


describe('Poker.Hand', function () {
  var hand

  beforeEach(function () {
    hand = new DISBRANDED.Poker.Hand
  })

  it('should add a card to the hand', function () {
    hand.add('AS')
    expect(hand.has('AS')).toBe(true)
    expect(hand.get(0)).toBe('AS')
    expect(hand.get(1)).toBe(null)
  })

  it('should not add a card that the hand already has', function () {
    hand.add('AS')
    hand.add('AS')
    expect(hand.cards.length).toBe(1)
  })
})