'use strict'


describe('Poker.Pot', function () {
  var Poker = POKER,
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

  it('should add a betting round to a pot', function () {
    var r = new Round,
        p = new Pot,
        s,
        n,
        str

    // bet:
    r.bet(A, 10)
    // raise:
    r.bet(B, 20)
    // raise:
    r.bet(C, 30)
    // allin:
    r.bet(D, 15, true)
    // allin:
    r.bet(E, 20, true)
    // call:
    r.bet(A, 20)
    // raise:
    r.bet(B, 20)
    // call:
    r.bet(C, 10)
    // allin:
    r.bet(A, 5, true)

    expect(r.chipsFor(A)).toBe(35)
    expect(r.chipsFor(B)).toBe(40)
    expect(r.chipsFor(C)).toBe(40)
    expect(r.chipsFor(D)).toBe(15)
    expect(r.chipsFor(E)).toBe(20)
    expect(r.chipsTotal()).toBe(150)

    p.add(r)
    expect(p.pots.length).toBe(4)
    expect(p.pots[0].total()).toBe(15 * 5)
    expect(p.pots[1].total()).toBe(5 * 4)
    expect(p.pots[2].total()).toBe(15 * 3)
    expect(p.pots[3].total()).toBe(5 * 2)

    str = ''
    n = 0
    while (s = p.pop()) {
      str += s.total() +', '
      n += s.total()
    }
    str = str.substr(0, str.length - 2)
    expect(str).toBe('10, 45, 20, 75')
    expect(n).toBe(150)
    expect(p.pots.length).toBe(0)
  })
})

