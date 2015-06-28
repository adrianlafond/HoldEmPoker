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
    return null;
  }


  return Object.defineProperties({}, {
    /**
     * @returns a new poker game that will play a single hand.
     */
    game: { value: game, enumerable: true }
  });
}());
