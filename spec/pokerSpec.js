'use strict'


describe('Poker', function () {
  var poker
  
  beforeEach(function () {
    poker = new DISBRANDED.Poker
  })
  
  it('should pass a test', function () {
    expect(poker.name).toBe('Poker')
  })
})