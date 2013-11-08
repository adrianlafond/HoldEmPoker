'use strict'


describe('Poker.Hand', function () {
  var hand

  beforeEach(function () {
    hand = new POKER.Hand
  })

  it('should add a card to the hand', function () {
    hand.add('AS')
    expect(hand.has('AS')).toBe(true)
    expect(hand.has('2S')).toBe(false)
    expect(hand.get(0)).toBe('AS')
    expect(hand.get(1)).toBe(null)
  })

  it('should not add a card that the hand already has', function () {
    hand.add('AS')
    hand.add('AS')
    expect(hand.cards.length).toBe(1)
  })

  it('should set a card at an index', function () {
    hand.set(5, 'AS')
    expect(hand.get(5)).toBe(null)
    expect(hand.get(0)).toBe('AS')
    expect(hand.cards).toEqual(['AS'])

    hand.set(-1, '2D')
    expect(hand.get(0)).toBe('2D')
    expect(hand.cards).toEqual(['2D'])

    hand.set(0, '2S')
    hand.set(1, '3S')
    hand.set(4, '6S')
    hand.set(3, '5S')
    hand.set(2, '4S')
    hand.set(3, '7S')
    hand.set(4, '8S')
    expect(hand.get(0)).toBe('2S')
    expect(hand.get(2)).toBe('4S')
    expect(hand.get(4)).toBe('8S')
  })

  it('should set multiple cards at once', function () {
    hand.add('2S', '3S', '4S', '5S', '6S')
    expect(hand.get(0)).toBe('2S')
    expect(hand.get(1)).toBe('3S')
    expect(hand.get(2)).toBe('4S')
    expect(hand.get(3)).toBe('5S')
    expect(hand.get(4)).toBe('6S')
  })

  it('should reset the hand', function () {
    hand.add('2S', '3S', '4S', '5S', '6S')
    hand.reset()
    expect(hand.cards.length).toBe(0)
    expect(hand.get(0)).toBe(null)
  })
})