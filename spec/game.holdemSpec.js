describe('Holdem Poker Game', function () {
  var players = [
    { id: 'fred', chips: 1000 },
    { id: 'jack', chips: 500 },
    { id: 'wendy', chips: 250 }
  ];
  var opts = {
    id: 'holdem',
    type: Poker.HOLDEM,
    action: onAction,
    players: players
  };
  var game = new GameHoldem(opts);

  function onAction(info) {
    //
  }

  it('should have a default minimum bet of 10', function () {
    expect(game.minBet).toBe(10);
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
  it('should have a default maximum raises of 3', function () {
    expect(game.maxRaises).toBe(3);
  });
  it('will not allow a small blind larger than the minimum bet', function () {
    opts.minBet = 20;
    opts.smallBlind = 50;
    expect(function () {
      new GameHoldem(opts);
    }).toThrow();
  });
  it('returns players correctly', function () {
    expect(game.players.length).toBe(3);
    expect(game.player('fred').chips).toBe(1000);
    expect(game.player('fred').folded).toBe(false);
    expect(game.player('invalid')).toBe(null);
  });
  it('will have a default variation of limit', function () {
    expect(game.variation).toBe(Poker.LIMIT);
  })
});
