/**
 * @param {number} chips
 * @param {array<Player>} players
 */
function SidePot(chips, players) {
  this.chips = chips;
  this.players = players;
}

SidePot.prototype = {
  // Traverses the player to find the player(s) with the highest hand who has
  // not folded.
  winner: function () {
    var win = [];
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].folded) {
        continue;
      } else if (win.length === 0) {
        win.push(this.players[i]);
      } else {
        var highest = Hand.highest(win[0].hand, this.players[i].hand);
        if (highest === this.players[i].hand.id) {
          win = [this.players[i]];
        } else if (highest === null) {
          win.push(this.players[i]);
        }
      }
    }
    return win;
  },

  /**
   * Merge another SidePot instance into this SidePot instance. Players must
   * be identical.
   */
  merge: function (pot) {
    if (this.hasSamePlayers(pot)) {
      this.chips += pot.chips;
      return true;
    }
    return false;
  },

  /**
   * @param {*} id The ID of the player to return.
   * @returns {Player}
   */
  player: function (id) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].id === id) {
        return this.players[i];
      }
    }
    return null;
  },

  /**
   * @param {SidePot} pot
   * @returns true if this SidePot instance has the same players has @param pot.
   */
  hasSamePlayers: function (pot) {
    if (this.players.length === pot.players.length) {
      for (var i = 0; i < this.players.length; i++) {
        if (!pot.player(this.players[i].id)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
};
