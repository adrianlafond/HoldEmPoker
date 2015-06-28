describe('Poker.SidePot', function () {
  'use strict';
  var p1, p2, p3, sp1, sp2, sp3;

  beforeEach(function (){
    p1 = new Player('fred');
    p2 = new Player('jack');
    p3 = new Player('jane');
    sp1 = new SidePot(1000, [p1, p2, p3]);
    sp2 = new SidePot(500, [p1, p2, p3]);
    sp3 = new SidePot(300, [p2, p3]);
  });

  it('should compare two pots in terms of players', function () {
    expect(sp1.hasSamePlayers(sp2)).toBe(true);
    expect(sp1.hasSamePlayers(sp3)).toBe(false);
  });

  it('should merge pots with same players', function () {
    expect(sp1.merge(sp2)).toBe(true);
    expect(sp1.merge(sp3)).toBe(false);
    expect(sp1.chips).toBe(1500);
  });

  it('should find the winner of a pot', function () {
    p1.hand.add('AS', 'AD', 'AH', 'TC', 'TS');
    p2.hand.add('KS', 'KD', 'KH', '9C', '9S');
    p3.hand.add('JS', 'JD', 'JH', '8C', '8S');
    expect(sp1.winner()[0].id).toBe(p1.id);
  });

  it('should find the winners of a pot when there is a draw', function () {
    p1.hand.add('3D', '4H', '5S', '6C', '7D');
    p2.hand.add('3H', '4S', '5C', '6D', '7H');
    p3.hand.add('JS', 'JD', 'AC', '8C', '8S');
    var winner = sp1.winner();
    expect(winner.length).toBe(2);
    var ids = pluck(winner, 'id');
    expect(ids.indexOf(p1.id)).not.toBe(-1);
    expect(ids.indexOf(p2.id)).not.toBe(-1);
    expect(ids.indexOf(p3.id)).toBe(-1);
  });
});
