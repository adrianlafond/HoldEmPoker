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

  it ('should rank cards correctly', function () {
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
})