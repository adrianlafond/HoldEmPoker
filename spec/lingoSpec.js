'use strict'


describe('Poker.lingo.en', function () {
  var lang = DISBRANDED.Poker.lingo.en

  expect(lang.cards[0]).toBe(null)
  expect(lang.cards.length).toBe(11)
  expect(lang.cards[10]).toBe('Royal Flush')
})