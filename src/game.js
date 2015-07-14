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
 * @param {object} data The data model of the child game instance.
 */
function Game(options, data) {
  Game.validateId(options.id, data);
  Game.validateActionCallback(options.action, data);
  Game.validateType(options.type, data);
  Game.validatePlayers(options.players, data);
  Game.getter(this, data, 'id');
  Game.getter(this, data, 'type');
  Game.getter(this, data, 'action');
  Game.addPlayerMethods(this, data);
  Game.addHistory(this, data);
}

/**
 * Validate and store options common to all poker game types.
 */
Game.validateId = function (id, data) {
  if (id) {
    data.id = id;
  } else {
    throw 'Game "id" is not defined.';
  }
};
Game.validateActionCallback = function (action, data) {
  if (typeof action === 'function') {
    data.action = action;
  } else {
    throw 'Game "action" callback is not defined.';
  }
};
Game.validateType = function (type, data) {
  // Just for reference so not testing necessary.
  data.type = type || null;
};
Game.validatePlayers = function (players, data) {
  if (Array.isArray(players)) {
    data.players = [];
    for (var i = 0; i < players.length; i++) {
      if (!players[i].id) {
        throw 'Player "id" value is not valid.';
      }
      players[i].chips = +players[i].chips;
      if (isNaN(players[i].chips) || players[i].chips <= 0) {
        throw 'Player "chips" value must be a number greater than 0.';
      }
      for (var j = 0; j < players.length; j++) {
        if (i !== j) {
          if (players[i].id === players[j].id) {
            throw 'Two or more players share the same "id" value.';
          }
        }
      }
      data.players[i] = new Player(players[i].id, players[i].chips);
    }
  } else {
    throw 'Game "players" is not an array.';
  }
};

/**
 * Convenience method to write a getter for a private variable.
 */
Game.getter = function (instance, data, propName, propVal) {
  propVal = propVal || propName;
  Object.defineProperty(instance, propName, {
    get: function () {
      return data[propVal];
    },
    enumerable: true
  });
};

/**
 * Add methods to get public data about players.
 */
Game.addPlayerMethods = function (instance, data) {
  Object.defineProperties(instance, {
    /**
     * @returns a (new) array with information about all players.
     */
    players: {
      get: function () {
        var p = [];
        for (var i = 0; i < data.players.length; i++) {
          p[i] = data.players[i].data();
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
        for (var i = 0; i < data.players.length; i++) {
          if (data.players[i].id === id) {
            return data.players[i].data();
          }
        }
        return null;
      },
      enumerable: true
    }
  });
};

/**
 * Set up array of actions history and write getters for the history as well
 * any currently live actions that need to be taken.
 */
Game.addHistory = function (instance, data) {
  data.history = [];
  data.action = null;
  Object.defineProperties(instance, {
    /**
     * @returns <array> copy of history of each action in the game.
     */
    history: function () {
      var h = [];
      data.history.forEach(function (item, i) {
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
      return data.action ? data.action.clone() : null;
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
 * @param {string} prop The property of options to be validated.
 * @param {number} val
 * @param {number} defVal Default value.
 * @param {number} minVal
 * @param {number=} maxVal Defaults to Number.MAX_VALUE.
 */
Game.validateBetOption = function (prop, val, defVal, minVal, maxVal) {
  maxVal = maxVal || Number.MAX_VALUE;
  if (typeof val === 'undefined') {
    return defVal;
  } else if (typeof val === 'number' && !isNaN(val) && val >= minVal &&
      val <= maxVal) {
    return val;
  } else {
    throw ['The value for "', prop, '" is invalid.'].join('');
  }
};
