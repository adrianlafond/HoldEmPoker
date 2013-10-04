'use strict'


describe('Poker.Deck', function () {  
  var Deck = DISBRANDED.Poker.Deck
  
  it('should be a proper deck', function () {
    var deck = new Deck
    expect(deck.count()).toBe(52)
    deck.shuffle()
    
    deck.deal()
    deck.deal()
    deck.deal()
    deck.deal()
    deck.deal()
    expect(deck.cards().length).toBe(47)
    
    deck.deal()
    deck.deal()
    deck.deal()
    deck.deal()
    deck.deal()
    expect(deck.cards().length).toBe(42)
    expect(deck.jokers()).toBe(0)
    
    deck.reset()
    expect(deck.deal()).toBe('AS')

    deck.shuffle()
    expect(deck.addJokers(2).count()).toBe(54)
    expect(deck.removeJokers().count()).toBe(52)
    
    expect(deck.addJokers(5).count()).toBe(56)
    expect(deck.addJokers(5).count()).toBe(56)
    expect(deck.removeJokers().count()).toBe(52)
    expect(deck.addJokers(-5).count()).toBe(52)
    expect(deck.addJokers(2).count()).toBe(54)
    expect(deck.addJokers(-2).count()).toBe(54)
    expect(deck.addJokers(1.88445632).count()).toBe(55)
  })
  
  it('should add jokers at instantiation', function () {
    var deck = new Deck({ jokers: 2 })
    expect(deck.jokers()).toBe(2)
    expect(deck.count()).toBe(54)
  })
})