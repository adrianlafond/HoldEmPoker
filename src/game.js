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
  });
}


/**
 * Instantiates Player instances and write getter methods.
 * @param {Game} instance
 * @param {array<Player>} players
 * @param {array<object>} optionsPlayers
 */
Game.addPlayers = function (instance, players, optionsPlayers) {
  for (var i = 0; i < optionsPlayers.length; i++) {
    players[i] = new Player(optionsPlayers[i].id, optionsPlayers[i].chips);
  }
  Object.defineProperties(instance, {
    /**
     * @returns a (new) array with information about all players.
     */
    players: {
      get: function () {
        var p = [];
        for (var i = 0; i < players.length; i++) {
          p[i] = players[i].data();
        }
        return p;
      },
      enumerable: true
    },

    /**
     * @param {*} id
     * @returns info concerning a specific player.
     */
    player: {
      value: function (id) {
        for (var i = 0; i < players.length; i++) {
          if (players[i].id === id) {
            return players[i].data();
          }
        }
        return null;
      },
      enumerable: true
    }
  });
};


/**
 * Writes methods for action history and progress.
 * @param {Game} instance
 * @param {array>} history
 */
Game.addActions = function (instance, actions) {
  Object.defineProperties(instance, {
    /**
     * Updates the game with information about a player's action. Designer to be
     * overridden by a method in a specific game class.
     * @param {object} info
     * @param {*} info.id The ID of the player who must take action.
     * @param {string} info.action The player's action; e.g., Poker.FOLD.
     * @param {number=} info.value If action is Poker.BET, the amount.
     */
    go: function (info) {
      //
    },

    /**
     * @returns <array> copy of history of each action in the game.
     */
    history: function () {
      var h = [];
      actions.history.forEach(function (item, i) {
        h[i] = {};
        for (var key in item) {
          if (item.hasOwnProperty(key)) {
            h[i][key] = item[key];
          }
        }
      });
      return h;
    },

    /**
     * @returns <Game.Action> clone of any open Game.Action.
     */
    action: function () {
      return actions.action ? actions.action.clone() : null;
    }
  });
};


/**
 * @constructor for an Action passed to the action callback.
 */
Game.Action = function (player, action, data) {
  Object.defineProperties(this, {
    player: { get: function () { return player; }, enumerable: true },
    action: { get: function () { return action; }, enumerable: true },
    data: { get: function () { return data; }, enumerable: true },
    clone: {
      value: function () {
        var obj = data ? {} : null;
        if (obj) {
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              obj[key] = data[key];
            }
          }
        }
        return new Game.Action(player, action, obj);
      },
      enumerable: true
    }
  });
};


/**
 * Returns a valid numeric value for a betting option or else throws an error.
 * @param {object} options
 * @param {string} prop The property of options to be validated.
 * @param {number} defaultValue
 * @param {number} minValue
 * @param {number=} maxValue Defaults to Number.MAX_VALUE.
 */
Game.validateBetOption = function (options, prop, defaultValue, minValue, maxValue) {
  var value = options[prop];
  maxValue = maxValue || Number.MAX_VALUE;
  if (typeof value === 'undefined') {
    return defaultValue;
  } else if (typeof value === 'number' && !isNaN(value) && value >= minValue &&
      value <= maxValue) {
    return value;
  } else {
    throw ['The value for "', prop, '" is invalid.'].join('');
  }
};
