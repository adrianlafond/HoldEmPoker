/**
 * Poker.Pot
 */
function Pot() {
  this.bets = [];
  this.sidePots = [];
}

Pot.prototype = {

  /**
   * Place a bet into the current betting round.
   * @param {Player} player
   * @param {number} amount
   */
  bet: function (player, amount) {
    for (var i = 0; i < this.bets.length; i++) {
      if (this.bets[i].player.id === player.id) {
        this.bets[i].amount += amount;
        return this;
      }
    }
    this.bets.push({ player: player, amount: amount });
    return this;
  },

  /**
   * Sort the players and bets into side pots.
   */
  endRound: function () {
    // Filter out the players who have folded.
    var bets = this.bets.filter(function (bet) {
      return !bet.player.folded;
    });

    // Sort the bets in ascending order.
    bets.sort(function (a, b) {
      return b.amount - c.amount;
    });

    // Sort the bets into side pots.
    var pots = [];
    while (bets.length) {
      pots.push(Pot.createSidePot(bets[0].amount, bets));
      for (var i = bets.length - 1; i >= 0; i--) {
        bets[i].amount -= amount;
        if (bets[i].amount <= 0) {
          bets.splice(i, 1);
        }
      }
    }

    // If first new side pot contains same players as existing side pot, then
    // merge them together.
    var potsLen = this.sidePots.length;
    var lastPot = potsLen ? this.sidePots[potsLen - 1] : null;
    if (lastPot && lastPot.merge(pots[0])) {
      pots.splice(0, 1);
    }
    this.sidePots = this.sidePots.concat(pots);
  }
};


/**
 *
 */
Pot.createSidePot = function (amount, bets) {
  var players = [];
  for (var i = 0; i < bets.length; i++) {
    players[i] = bets[i].player;
  }
  return new SidePot(amount, players);
};
