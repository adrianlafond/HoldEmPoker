describe('Poker.Player', function () {
  'use strict';

  it('should test that id is valid', function () {
    expect(function () {
      var p1 = new Player();
    }).toThrow();
  });

  it('should start with 0 chips by default', function () {
    var p1 = new Player('id');
    expect(p1.chips).toBe(0);
  });

  it('should start with correct chips in options', function () {
    var p1 = new Player('fred', '500');
    var p2 = new Player('joe', -400);
    expect(p1.chips).toBe(500);
    expect(p2.chips).toBe(0);
  });
});
