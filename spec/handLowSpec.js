'use strict'

describe('test low hands', function () {
  var Poker = DISBRANDED.Poker,
      Hand = Poker.Hand

  it('should find a straight when aces are low', function () {
    var result = Hand.findStraight({
      cards: ['AS', '4C', 'QH', '4D', '3D', '5H', '2C'],
      low: Poker.ACE_TO_FIVE_LOW
    })
    expect(result.cards).toEqual(['5H', '4C', '3D', '2C', 'AS'])
  })

  it('should find a straight when aces are NOT low', function () {
    var result = Hand.findStraight({
      cards: ['AS', '4C', 'QH', '4D', '3D', '5H', '2C'],
      low: true,
      acesAreLow: false
    })
    expect(result).toBe(null)
  })

  it('should find the best "normal" low hand', function () {
    var hand = new Hand({ cards: ['AS', '4C', 'QH', '4D', '3D', '5H', '2C'], low: Poker.ACE_TO_FIVE_LOW })
    expect(hand.cardsLow).toEqual(['AS', '2C', '3D', '4D', '5H'])

    hand = new Hand({ cards: ['6S', '4C', 'QH', '4D', '3D', '5H', '2C'], low: Poker.ACE_TO_FIVE_LOW })
    expect(hand.cardsLow).toEqual(['2C', '3D', '4D', '5H', '6S'])

    hand = new Hand({ cards: ['7S', '4C', 'QH', '4D', '3D', '5H', '2C'], low: Poker.ACE_TO_FIVE_LOW })
    expect(hand.cardsLow).toEqual(['2C', '3D', '4D', '5H', '7S'])

    hand = new Hand({ cards: ['AS', '4C', 'AH', '4D', '3D', 'AD', '2C'], low: Poker.ACE_TO_FIVE_LOW })
    expect(hand.cardsLow).toEqual(['AS', '2C', '3D', '4D', 'AD'])
  })

  it('should find the best low hand when ignoreFlushes is false', function () {
    var cards = ['AS', '4C', '4D', '4S', '3S', '5S', '2S'],
        hand = new Hand({ cards: cards, low: Poker.ACE_TO_FIVE_LOW })
    expect(hand.cardsLow).toEqual(['AS', '2S', '3S', '4S', '5S'])

    hand = new Hand({ cards: cards, low: Poker.ACE_TO_SIX_LOW })
    expect(hand.cardsLow).toEqual([])
  })

  it('should find the best low hand when ignoreStraights is flase', function () {
    var cards = ['3S', '4C', '7D', '6S', '4D', '5S', '4S'],
        hand = new Hand({ cards: cards, low: Poker.ACE_TO_FIVE_LOW })
    expect(hand.cardsLow).toEqual(['3S', '4S', '5S', '6S', '7D'])

    hand = new Hand({ cards: cards, low: Poker.ACE_TO_SIX_LOW })
    expect(hand.cardsLow).toEqual([])
  })
})