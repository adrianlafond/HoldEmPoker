'use strict'


describe('Poker.Pot', function () {
  var Poker = DISBRANDED.Poker,
      Pot = Poker.Pot,
      SidePot = Poker.SidePot,
      Round = Poker.Round,
      Bet = Poker.Bet,

      A = 'playerA',
      B = 'playerB',
      C = 'playerC',
      D = 'playerD',
      E = 'playerE'

  it('should create a bet instance', function () {
    expect(new Bet(A, 100).allin).toBe(false)
    expect(new Bet(B, 100, true).allin).toBe(true)
    expect(Bet(C, 100).folded).toBe(false)
  })

  it('should store a round correctly', function () {
    var r = new Round

    // bet
    r.bet(Bet(A, 10))
    expect(r.chipsFor(A)).toBe(10)

    // call
    r.bet(B, 10)

    // all in
    r.bet(C, 8, true)
    expect(r.chipsTotal()).toBe(28)

    // all in
    r.bet(D, 20, true)

    // call
    r.bet(E, 20)

    // raise
    r.bet(Bet(A, 20))
    expect(r.chipsFor(A)).toBe(30)

    // fold
    r.fold(B)

    // call
    r.bet(E, 10)

    expect(r.chipsFor(E)).toBe(r.chipsFor(A))
    expect(r.chipsTotal()).toBe(98)
    expect(r.chipsFor(A)).toBe(30)
    expect(r.chipsFor(B)).toBe(10)
    expect(r.chipsFor(C)).toBe(8)
    expect(r.chipsFor(D)).toBe(20)
    expect(r.chipsFor(E)).toBe(30)
  })

  it('should should have the correct chips in a side pot', function () {
    var s = new SidePot
    s.add(A, 10)
    s.add(B, 10)
    s.add(C, 8)
    s.add(D, 12)
    s.add(E, 20)
    expect(s.total()).toBe(60)
    expect(s.bets[A]).toBe(10)
  })
})

