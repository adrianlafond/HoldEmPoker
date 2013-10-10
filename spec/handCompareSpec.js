'use strict'

describe('hand comparisons', function () {
  var Hand = DISBRANDED.Poker.Hand

  it('should call the highest hand', function () {
    var h_fullhouse = new Hand({ cards: ['AD', '4S', 'AC', '7S', '4D', '8S', 'AS'] }),
        h_flush     = new Hand({ cards: ['AD', '4S', '5C', '7S', '6S', '8S', 'AS'] }),
        h_straight  = new Hand({ cards: ['AD', '4S', '5C', '7S', '6S', '8S', 'AC'] }),
        h_4kind     = new Hand({ cards: ['AD', '4S', 'AC', '7S', '4D', 'AH', 'AS'] }),
        h_3kind     = new Hand({ cards: ['AD', '4S', 'AC', '7S', '3D', 'KH', 'AS'] }),
        h_2pair     = new Hand({ cards: ['AD', '4S', '7C', '7S', '4D', '8S', 'AS'] })

    expect(h_fullhouse.rank()).toBe(Hand.FULL_HOUSE)
    expect(h_flush.rank()).toBe(Hand.FLUSH)
    expect(h_straight.rank()).toBe(Hand.STRAIGHT)
    expect(h_4kind.rank()).toBe(Hand.FOUR_OF_A_KIND)
    expect(h_3kind.rank()).toBe(Hand.THREE_OF_A_KIND)
    expect(h_2pair.rank()).toBe(Hand.TWO_PAIR)
    // expect(hand.cardsHigh).toEqual(['AD', 'AC', 'AS', '4S', '4D'])
  })
})