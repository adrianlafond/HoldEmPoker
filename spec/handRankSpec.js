'use strict'

describe('hand instance ranks', function () {
  var Poker = DISBRANDED.Poker,
      Hand = Poker.Hand

  it('should return highest hand', function () {
    var hand = new Hand({ cards: ['5C', '8D', 'TS', '2H', 'AS', '3S', 'KD'] })
    expect(hand.cards.length).toBe(7)
    expect(hand.rank).toBe(Poker.HIGH_CARD)
    expect(hand.cardsHigh).toEqual(['AS', 'KD', 'TS', '8D', '5C'])

    hand = new Hand({ cards: ['KS', '2S']})
    expect(hand.rank).toBe(0)
    expect(hand.cardsHigh).toEqual([])

    hand = new Hand({ cards: ['KS', '2S', '8D', '7S', 'TS', '3S', 'AD']})
    expect(hand.rank).toBe(Poker.FLUSH)
    expect(hand.cardsHigh).toEqual(['KS', 'TS', '7S', '3S', '2S'])

    hand = new Hand({ cards: ['KS', 'JS', '8D', 'QS', 'TS', '3C', '9S']})
    expect(hand.rank).toBe(Poker.STRAIGHT_FLUSH)
    expect(hand.cardsHigh).toEqual(['KS', 'QS', 'JS', 'TS', '9S'])

    hand = new Hand({ cards: ['KS', 'JS', '8D', 'QS', 'TS', '3C', 'AS']})
    expect(hand.rank).toBe(Poker.ROYAL_FLUSH)
    expect(hand.cardsHigh).toEqual(['AS', 'KS', 'QS', 'JS', 'TS'])

    hand = new Hand({ cards: ['8S', '7C', '8D', '8C', '8H']})
    expect(hand.rank).toBe(Poker.FOUR_OF_A_KIND)
    expect(hand.cardsHigh).toEqual(['8S', '8D', '8C', '8H', '7C'])

    hand = new Hand({ cards: ['8S', '7C', '8D', '7D', '8H']})
    expect(hand.rank).toBe(Poker.FULL_HOUSE)
    expect(hand.cardsHigh).toEqual(['8S', '8D', '8H', '7C', '7D'])

    hand = new Hand({ cards: ['8S', '7C', '8D', '2D', '8H']})
    expect(hand.rank).toBe(Poker.THREE_OF_A_KIND)
    expect(hand.cardsHigh).toEqual(['8S', '8D', '8H', '7C', '2D'])

    hand = new Hand({ cards: ['8S', '7C', '8D', '7D', 'KH']})
    expect(hand.rank).toBe(Poker.TWO_PAIR)
    expect(hand.cardsHigh).toEqual(['8S', '8D', '7C', '7D', 'KH'])

    hand = new Hand({ cards: ['8S', '7C', '8D', '2D', 'KH']})
    expect(hand.rank).toBe(Poker.ONE_PAIR)
    expect(hand.cardsHigh).toEqual(['8S', '8D', 'KH', '7C', '2D'])
  })


  it('should return a flush not a straight', function () {
    var hand = new Hand({ cards: ['AD', '4S', '5D', '7S', '6S', '8S', 'KS'] })
    expect(hand.rank).toBe(Poker.FLUSH)
    expect(hand.cardsHigh).toEqual(['KS', '8S', '7S', '6S', '4S'])
  })

  it('should return a full house not a flush', function () {
    var hand = new Hand({ cards: ['AD', '4S', 'AC', '7S', '6S', '8S', 'AS', '4D'] })
    expect(hand.rank).toBe(Poker.FULL_HOUSE)
    expect(hand.cardsHigh).toEqual(['AD', 'AC', 'AS', '4S', '4D'])
  })
})