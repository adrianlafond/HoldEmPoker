'use strict'


describe('Poker.Pot', function () {
  var Poker = DISBRANDED.Poker,
      Pot = Poker.Pot,
      SidePot = Poker.SidePot,
      Round = Poker.Round,
      Bet = Poker.Bet

  it('should create a bet instance', function () {
    expect(new Bet('id', 100).allin).toBe(false)
    expect(new Bet('id', 100, true).allin).toBe(true)
    expect(new Bet('id', 100).folded).toBe(false)
  })
})

