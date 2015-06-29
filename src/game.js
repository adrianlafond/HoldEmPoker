/**
 * The abstract parent class for poker games.
 * @param {object} options
 * @param {string} options.id The unique ID of the game.
 * @param {string} options.type The specific game to play; e.g., Poker.HOLDEM.
 * @param {array<object>} options.players The players, in order of their table
 *   seats. Player at index 0 holds the button. Minimum and maximum values are
 *   set according to the game type.
 * @param {string|*} options.players[].id Unique ID of the player.
 * @param {number} options.players[i].chips Chips the player holds; must be
 *   greater than 0.
 * @param {function} options.action Callback when the game dealer announces
 *   an event occurred and (most often) requires an action to be performed.
 */
function Game(options) {
  var options = Object(options);
  var id = options.id;
  var type = options.type;
  var action = options.action;

  if (!id) {
    throw 'Game "id" is not defined.';
  }
  if (typeof action !== 'function') {
    throw 'Game "action" callback is not defined.';
  }
  if (Array.isArray(options.players)) {
    for (var i = 0; i < options.players.length; i++) {
      if (!options.players[i].id) {
        throw 'Player "id" value is not valid.';
      }
      options.players[i].chips = +options.players[i].chips;
      if (isNaN(options.players[i].chips) || options.players[i].chips <= 0) {
        throw 'Player "chips" value must be a number greater than 0.';
      }
      for (var j = 0; j < options.players.length; j++) {
        if (i !== j) {
          if (options.players[i].id === options.players[j].id) {
            throw 'Two or more players share the same "id" value.';
          }
        }
      }
    }
  } else {
    throw 'Game "players" is not an array.';
  }

  Object.defineProperties(this, {
    id: { get: function () { return id; }, enumerable: true },
    type: { get: function () { return type; }, enumerable: true },
    action: { get: function () { return action; }, enumerable: true }
  };
}

Game.prototype = {
  /**
   * Updates the game with information about a player's action.
   * @param {object} info
   * @param {*} info.id The ID of the player who must take action.
   * @param {string} info.action The player's action; e.g., Poker.FOLD.
   * @param {number=} info.value If action is Poker.BET, the amount.
   */
  go: function (info) {
    //
  }
};
