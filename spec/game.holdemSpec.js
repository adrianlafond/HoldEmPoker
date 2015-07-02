describe('Holdem Poker Game', function () {
  var players = [
    { id: 'fred', chips: 1000 },
    { id: 'jack', chips: 500 },
    { id: 'wendy', chips: 250 }
  ];
  var game = new GameHoldem({
    id: 'holdem',
    type: Poker.HOLDEM,
    action: onAction,
    players: players
  });

  function onAction(info) {
    //
  }

  it('should have a default minimum bet of 10', function () {
    expect(game.minimumBet).toBe(10);
  });

  it('should have a default small blind of 5', function () {
    expect(game.smallBlind).toBe(5);
  });

  it('should have a default big blind of 10', function () {
    expect(game.bigBlind).toBe(10);
  });

  it('should have a default ante of 0', function () {
    expect(game.ante).toBe(0);
  });
});
