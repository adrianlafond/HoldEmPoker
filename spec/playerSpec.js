describe('Poker.Player', function () {
  'use strict';

  it('should create a unique ID for each player', function () {
    var p1 = new Player();
    var p2 = new Player();
    expect(!!p1.id).toBe(true);
    expect(!!p2.id).toBe(true);
    expect(p1.id).not.toEqual(p2.id);
  });

  it('should start with 0 chips by default', function () {
    var p1 = new Player();
    expect(p1.chips).toBe(0);
  });

  it('should start with correct chips in options', function () {
    var p1 = new Player({ chips: '500' });
    var p2 = new Player({ chips: -400 });
    expect(p1.chips).toBe(500);
    expect(p2.chips).toBe(0);
  });
});
