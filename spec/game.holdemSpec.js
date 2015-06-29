describe('Holdem Poker Game', function () {
  var game = new GameHoldem({
    id: 'holdem',
    type: Poker.HOLDEM,
    action: onAction
  });

  function onAction(info) {
    //
  }

  it('should have a constant ID', function () {
    expect(function () {
      game.id = 'changed';
    }).toThrow();
  });

  it('should have a constant type', function () {
    expect(function () {
      game.type = 'changed';
    }).toThrow();
  });

  it('should have a constant action callback', function () {
    expect(function () {
      game.action = function () {};
    }).toThrow();
  });
});
