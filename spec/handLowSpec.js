'use strict'

describe('test low hands', function () {
  var Hand = DISBRANDED.Poker.Hand

  it('should find a straight when aces are low', function () {
    var result = Hand.findStraight({
      cards: ['AS', '4C', 'QH', '4D', '3D', '5H', '2C'],
      acesAreLow: true
    })
    expect(result.cards).toEqual(['5H', '4C', '3D', '2C', 'AS'])
  })

  it('should find a straight when aces are NOT low', function () {
    var result = Hand.findStraight({
      cards: ['AS', '4C', 'QH', '4D', '3D', '5H', '2C'],
      acesAreLow: false
    })
    expect(result).toBe(null)
  })
})