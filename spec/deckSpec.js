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
  })
})