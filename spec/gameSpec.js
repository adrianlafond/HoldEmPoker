describe('Poker Game', function () {
  var players = [
    { id: 'fred', chips: 1000 },
    { id: 'jack', chips: 500 },
    { id: 'wendy', chips: 250 }
  ];
  var game = new Game({
    id: 'holdem',
    type: Poker.HOLDEM,
    action: onAction,
    players: players
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

  it('should throw if two players have the same ID', function () {
    var p = players.concat([{ id: 'fred', chips: 100 }]);
    expect(function () {
      new GameHoldem({
        id: 'holdem',
        type: Poker.HOLDEM,
        action: onAction,
        players: p
      });
    }).toThrow();
  });

  it('should throw if a player has an invalid ID', function () {
    var p = players.concat([{ id: null, chips: 100 }]);
    expect(function () {
      new GameHoldem({
        id: 'holdem',
        type: Poker.HOLDEM,
        action: onAction,
        players: p
      });
    }).toThrow();
  });

  it('should throw if a player has <= 0 chips', function () {
    var p = players.concat([{ id: 'test', chips: 0 }]);
    expect(function () {
      new GameHoldem({
        id: 'holdem',
        type: Poker.HOLDEM,
        action: onAction,
        players: p
      });
    }).toThrow();
  });
});
