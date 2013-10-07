'use strict'


describe('Poker hand ranks', function () {
  var Hand = DISBRANDED.Poker.Hand

  it('should return null if arguments for findFlush are invalid', function () {
    expect(Hand.findFlush()).toBe(null)
    expect(Hand.findFlush([])).toBe(null)
    expect(Hand.findFlush(['2S', '3S', '4S', '5S'])).toBe(null)
    expect(Hand.findFlush({})).toBe(null)
    expect(Hand.findFlush({ cards: [] })).toBe(null)
    expect(Hand.findFlush({ cards: ['2S', '3S', '4S', '5S'] })).toBe(null)
  })
})