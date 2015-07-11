/**
 * API for poker actions and events and also a factory for poker games.
 */
var Poker = (function () {
  var uid = 0;
  var games = {};

  function uniqueId() {
    return 'poker-' + uid++;
  }

  function game(options) {
    var GameClass;
    options = Object(options);
    switch (options.type) {
      case Poker.HOLDEM:
        options.id = uniqueId();
        GameClass = GameHoldem;
        break;
      default:
        throw 'Poker game type is not identified.';
    }
    return (games[options.id] = new GameClass(options));
  }


  return Object.defineProperties({}, {
    /**
     * @returns a new poker game that will play a single hand.
     */
    game: { value: game, enumerable: true }
  });
}());
