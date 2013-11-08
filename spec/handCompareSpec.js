'use strict'

describe('hand comparisons', function () {
  var Poker = POKER,
      Hand = Poker.Hand

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

    expect(h_fullhouse.rank).toBe(Poker.FULL_HOUSE)
    expect(h_flush.rank).toBe(Poker.FLUSH)
    expect(h_straight.rank).toBe(Poker.STRAIGHT)
    expect(h_4kind.rank).toBe(Poker.FOUR_OF_A_KIND)
    expect(h_3kind.rank).toBe(Poker.THREE_OF_A_KIND)
    expect(h_2pair.rank).toBe(Poker.TWO_PAIR)
    expect(h_1pair.rank).toBe(Poker.ONE_PAIR)
    expect(h_1pairB.rank).toBe(Poker.ONE_PAIR)
    expect(h_high.rank).toBe(Poker.HIGH_CARD)
    expect(h_strFlush.rank).toBe(Poker.STRAIGHT_FLUSH)
    expect(h_royalFlush.rank).toBe(Poker.ROYAL_FLUSH)

    expect(h_royalFlush.compareHighest(h_strFlush)).toBe(Poker.BETTER)
    expect(h_1pair.compareHighest(h_1pairB)).toBe(Poker.EVEN)
    expect(h_1pair.compareHighest(h_2pair)).toBe(Poker.WORSE)

    expect(h_high.compareHighest(h_1pair)).toBe(Poker.WORSE)
    expect(h_fullhouse.compareHighest(h_straight)).toBe(Poker.BETTER)
    expect(h_fullhouse.compareHighest(h_flush)).toBe(Poker.BETTER)
    expect(h_fullhouse.compareHighest(h_4kind)).toBe(Poker.WORSE)

    expect(h_4kind.compareHighest(h_3kind)).toBe(Poker.BETTER)
    expect(h_2pair.compareHighest(h_3kind)).toBe(Poker.WORSE)
    expect(h_straight.compareHighest(h_3kind)).toBe(Poker.BETTER)
  })

  it('should call the lowest hand', function () {
    var opts = { low: Poker.ACE_TO_FIVE_LOW },
        h_null = new Hand(opts),
        h_8 = new Hand(opts),
        h_6 = new Hand(opts),
        h_5 = new Hand(opts)

    h_null.add('KS', 'KC', 'QH', '4D', '7D', 'KD', 'KH')
    expect(h_null.cardsLow).toEqual([])

    h_8.add('5C', '8D', 'KS', 'AD', '4H', 'QH', '7D')
    expect(h_8.cardsLow).toEqual(['AD', '4H', '5C', '7D', '8D'])

    h_6.add('5C', '6D', 'KS', 'AD', '4H', 'QH', '2D')
    expect(h_6.cardsLow).toEqual(['AD', '2D', '4H', '5C', '6D'])

    h_5.add('5C', '3H', 'KS', 'AD', '4H', 'QH', '2D')
    expect(h_5.cardsLow).toEqual(['AD', '2D', '3H', '4H', '5C'])

    expect(h_null.compareLowest(h_8)).toBe(Poker.WORSE)
    expect(h_null.compareLowest(h_6)).toBe(Poker.WORSE)
    expect(h_null.compareLowest(h_5)).toBe(Poker.WORSE)

    expect(h_8.compareLowest(h_null)).toBe(Poker.BETTER)
    expect(h_8.compareLowest(h_6)).toBe(Poker.WORSE)
    expect(h_8.compareLowest(h_5)).toBe(Poker.WORSE)

    expect(h_6.compareLowest(h_null)).toBe(Poker.BETTER)
    expect(h_6.compareLowest(h_8)).toBe(Poker.BETTER)
    expect(h_6.compareLowest(h_5)).toBe(Poker.WORSE)

    expect(h_5.compareLowest(h_null)).toBe(Poker.BETTER)
    expect(h_5.compareLowest(h_8)).toBe(Poker.BETTER)
    expect(h_5.compareLowest(h_6)).toBe(Poker.BETTER)
  })
})