describe('Poker.Pot', function () {
  'use strict';
  var p1, p2, p3, pot;

  beforeEach(function (){
    p1 = new Player('fred', 100);
    p2 = new Player('jack', 100);
    p3 = new Player('jane', 100);
    pot = new Pot();
  });

  it('should accept bets', function () {
    pot.bet(p1, 10);
    pot.bet(p2, 15);
    pot.bet(p3, 30);
    pot.bet(p2, 20);
    pot.bet(p2, 15);
    expect(pot.bets.length).toBe(3);
  });

  it('should create side pots', function () {
    pot.bet(p1, 10);
    pot.bet(p2, 15);
    pot.bet(p3, 20);
    p1.folded = true;
    pot.endRound();
    expect(pot.sidePots.length).toBe(3);
    expect(pot.sidePots[0].players.length).toBe(2);
    expect(pot.sidePots[0].chips).toBe(30);
    expect(pot.sidePots[1].players.length).toBe(2);
    expect(pot.sidePots[1].chips).toBe(10);
    expect(pot.sidePots[2].players.length).toBe(1);
    expect(pot.sidePots[2].chips).toBe(5);
  });
});
