'use strict'

describe('hand comparisons', function () {
  var Hand = DISBRANDED.Poker.Hand

  it('should call the highest hand', function () {
    var h_fullhouse = new Hand({ cards: ['AD', '4S', 'AC', '7S', '4D', '8S', 'AS'] }),
        h_flush     = new Hand({ cards: ['AD', '4S', '5C', '7S', '6S', '8S', 'AS'] }),
        h_straight  = new Hand({ cards: ['AD', '4S', '5C', '7S', '6S', '8S', 'AC'] }),
        h_4kind     = new Hand({ cards: ['AD', '4S', 'AC', '7S', '4D', 'AH', 'AS'] }),
        h_3kind     = new Hand({ cards: ['AD', '4S', 'AC', '7S', '3D', 'KH', 'AS'] }),
        h_2pair     = new Hand({ cards: ['AD', '4S', '7C', '7S', '4D', '8S', 'AS'] }),
        h_1pair     = new Hand({ cards: ['JD', '4S', '7C', '7S', '9D', '8S', 'AS'] }),
        h_1pairB    = new Hand({ cards: ['JH', '4D', '7D', '7H', '9H', '8H', 'AC'] }),
        h_high      = new Hand({ cards: ['JD', '4S', '7C', 'QS', '9D', '8S', 'AS'] }),
        h_strFlush  = new Hand({ cards: ['AD', '4S', '5S', '7S', '6S', '8S', 'AC'] }),
        h_royalFlush= new Hand({ cards: ['AD', 'TC', 'KC', 'JC', '6S', 'QC', 'AC'] })

    expect(h_fullhouse.rank).toBe(Hand.FULL_HOUSE)
    expect(h_flush.rank).toBe(Hand.FLUSH)
    expect(h_straight.rank).toBe(Hand.STRAIGHT)
    expect(h_4kind.rank).toBe(Hand.FOUR_OF_A_KIND)
    expect(h_3kind.rank).toBe(Hand.THREE_OF_A_KIND)
    expect(h_2pair.rank).toBe(Hand.TWO_PAIR)
    expect(h_1pair.rank).toBe(Hand.ONE_PAIR)
    expect(h_1pairB.rank).toBe(Hand.ONE_PAIR)
    expect(h_high.rank).toBe(Hand.HIGH_CARD)
    expect(h_strFlush.rank).toBe(Hand.STRAIGHT_FLUSH)
    expect(h_royalFlush.rank).toBe(Hand.ROYAL_FLUSH)

    expect(h_royalFlush.compareHighest(h_strFlush)).toBe(Hand.BETTER)
    expect(h_1pair.compareHighest(h_1pairB)).toBe(Hand.EVEN)
    expect(h_1pair.compareHighest(h_2pair)).toBe(Hand.WORSE)

    expect(h_high.compareHighest(h_1pair)).toBe(Hand.WORSE)
    expect(h_fullhouse.compareHighest(h_straight)).toBe(Hand.BETTER)
    expect(h_fullhouse.compareHighest(h_flush)).toBe(Hand.BETTER)
    expect(h_fullhouse.compareHighest(h_4kind)).toBe(Hand.WORSE)

    expect(h_4kind.compareHighest(h_3kind)).toBe(Hand.BETTER)
    expect(h_2pair.compareHighest(h_3kind)).toBe(Hand.WORSE)
    expect(h_straight.compareHighest(h_3kind)).toBe(Hand.BETTER)
  })
})