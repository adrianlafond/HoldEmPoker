'use strict'


describe('Poker hand ranks', function () {
  var Hand = DISBRANDED.Poker.Hand

  it('should find the correct rank of a card', function () {
    expect(Hand.rank('AS')).toBe('A')
    expect(Hand.rank('JH')).toBe('J')
    expect(Hand.rank('8D')).toBe('8')
    expect(Hand.rank('2C')).toBe('2')
  })

  it('should find the correct suit of a card', function () {
    expect(Hand.suit('AS')).toBe('S')
    expect(Hand.suit('JH')).toBe('H')
    expect(Hand.suit('8D')).toBe('D')
    expect(Hand.suit('2C')).toBe('C')
  })

  it('should rank cards correctly', function () {
    expect(Hand.isHigher('TS', '8D')).toBe(true)
    expect(Hand.isHigher('8D', 'TS')).toBe(false)
    expect(Hand.isLower('TS', '8D')).toBe(false)
    expect(Hand.isLower('8D', 'TS')).toBe(true)
  })

  it('should return null if arguments for findFlush are invalid', function () {
    expect(Hand.findFlush()).toBe(null)
    expect(Hand.findFlush([])).toBe(null)
    expect(Hand.findFlush(['2S', '3S', '4S', '5S'])).toBe(null)
    expect(Hand.findFlush({})).toBe(null)
    expect(Hand.findFlush({ cards: [] })).toBe(null)
    expect(Hand.findFlush({ cards: ['2S', '3S', '4S', '5S'] })).toBe(null)
  })

  it('should return a flush or null', function () {
    var cards = ['2S', '3S', '4S', '5S', '6S', '7D', '8C']
    expect(Hand.findFlush(cards).cards).toEqual(['6S', '5S', '4S', '3S', '2S'])

    cards = ['2S', '3S', '4S', '5S', '6H', '7D', 'AS']
    expect(Hand.findFlush(cards).cards).toEqual(['AS', '5S', '4S', '3S', '2S'])

    cards = ['5S', '2S', '7D', '8S', '6H', 'TS', 'AS']
    expect(Hand.findFlush(cards).cards).toEqual(['AS', 'TS', '8S', '5S', '2S'])

    cards = ['5S', '2S', '7D', '8S', 'AS', 'TS', 'KS']
    expect(Hand.findFlush(cards).cards).toEqual(['AS', 'KS', 'TS', '8S', '5S'])

    cards = ['5S', '2S', '7D', '8S', 'AS', 'TS', 'KD', 'AD', '9D', '8D']
    expect(Hand.findFlush(cards).cards).toEqual(['AD', 'KD', '9D', '8D', '7D'])

    cards = ['5H', '2S', '7D', '8S', '6H', 'TS', 'AS']
    expect(Hand.findFlush(cards)).toBe(null)
  })

  if ('should return a low flow or null', function () {
    var optns = { low: Hand.ACE_TO_FIVE_LOW }

    optns.cards = ['5S', '7S', '2S', '2H', '8S', 'KS', 'JS']
    expect(Hand.findStraight(optns).cards).toEqual(['JS', '8S', '7S', '5S', '2S'])

    optns.cards = ['5S', '7S', '2S', '2H', '8S', 'KD', 'JD']
    expect(Hand.findStraight(optns)).toBe(null)
  })

  it('should return a straight or null', function () {
    var cards = ['2S', '3S', '4D', '5C', '6H']
    expect(Hand.findStraight(cards).cards).toEqual(['6H', '5C', '4D', '3S', '2S'])

    cards = ['2S', '3S', '4D', '5C', '7H', 'AC', 'JS']
    expect(Hand.findStraight(cards).cards).toEqual(['5C', '4D', '3S', '2S', 'AC'])

    cards = ['2S', '2H', '3S', '3H', '4D', '5C', '6H']
    expect(Hand.findStraight(cards).cards).toEqual(['6H', '5C', '4D', '3S', '2S'])

    cards = ['8S', '4C', 'TH', 'JC', 'QD', 'AS', '3C']
    expect(Hand.findStraight(cards)).toBe(null)

    cards = ['2S', '6H', '4D', '3S', '3H', '2H', '5C']
    expect(Hand.findStraight(cards).cards).toEqual(['6H', '5C', '4D', '3S', '2S'])

    cards = ['2C', 'AD', '3H', 'KS', '4C', 'QD', '5H', 'JS', '6C', 'TD', '7H', '9S']
    expect(Hand.findStraight(cards).cards).toEqual(['AD', 'KS', 'QD', 'JS', 'TD'])
  })

  it('should return a low straight or null', function () {
    var optns = { low: Hand.ACE_TO_FIVE_LOW }

    optns.cards = ['2S', '2H', '3S', '3H', '4D', '5C', '6H']
    expect(Hand.findStraight(optns).cards).toEqual(['6H', '5C', '4D', '3S', '2S'])

    optns.cards = ['3S', '4H', '5S', '9H', '6D', '7C', '8H']
    expect(Hand.findStraight(optns).cards).toEqual(['7C', '6D', '5S', '4H', '3S'])

    optns.cards = ['3S', '4H', '5S', '9H', 'AD', '7C', '8H']
    expect(Hand.findStraight(optns)).toBe(null)

    optns.cards = ['3S', '4H', '5S', '9H', '6D', '7C', '8H', 'TS', 'JH', 'QD', 'KC', 'AS']
    expect(Hand.findStraight(optns).cards).toEqual(['7C', '6D', '5S', '4H', '3S'])
    // optns.low = false
    // expect(Hand.findStraight(optns).cards).toEqual(['7C', '6D', '5S', '4H', '3S'])
  })


  it('should find sets correctly', function () {
    var sets = Hand.findSets(['TS', '8C', 'TC', '2D', '3H', 'QC', 'KD'])
    expect(sets.type).toBe(Hand.ONE_PAIR)
    expect(sets.sets).toEqual([['TS', 'TC']])
    expect(sets.kickers).toEqual(['KD', 'QC', '8C'])

    sets = Hand.findSets(['TS', '8C', 'TC', '2D', '2H', 'QC', 'KD'])
    expect(sets.type).toBe(Hand.TWO_PAIR)
    expect(sets.sets).toEqual([['TS', 'TC'], ['2D', '2H']])
    expect(sets.kickers).toEqual(['KD'])

    sets = Hand.findSets(['TS', '8C', 'TC', 'TD', '2H', 'QC', 'KD'])
    expect(sets.type).toBe(Hand.THREE_OF_A_KIND)
    expect(sets.sets).toEqual([['TS', 'TC', 'TD']])
    expect(sets.kickers).toEqual(['KD', 'QC'])

    sets = Hand.findSets(['TS', '8C', 'TC', 'TD', '2H', '2C', 'KD'])
    expect(sets.type).toBe(Hand.FULL_HOUSE)
    expect(sets.sets).toEqual([['TS', 'TC', 'TD'], ['2H', '2C']])
    expect(sets.kickers).toEqual([])

    sets = Hand.findSets(['TS', '8C', 'TC', 'TD', '2H', 'TH', 'KD'])
    expect(sets.type).toBe(Hand.FOUR_OF_A_KIND)
    expect(sets.sets).toEqual([['TS', 'TC', 'TD', 'TH']])
    expect(sets.kickers).toEqual(['KD'])

    sets = Hand.findSets(['TS', '8C', '5C', '2D', '3H', 'QC', 'KD'])
    expect(sets).toBe(null)

    sets = Hand.findSets(['TS', 'TC', '5C', '5D'])
    expect(sets).toBe(null)
  })
})