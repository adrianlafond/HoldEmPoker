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
  bet: function (player, chips) {
    for (var i = 0; i < this.bets.length; i++) {
      if (this.bets[i].player.id === player.id) {
        this.bets[i].chips += chips;
        return this;
      }
    }
    this.bets.push({ player: player, chips: chips });
    return this;
  },

  /**
   * Sort the players and bets into side pots.
   */
  endRound: function () {
    // Sort the bets in ascending order.
    this.bets.sort(function (a, b) {
      return a.chips - b.chips;
    });

    // Sort the bets into side pots.
    var pots = [];
    while (this.bets.length) {
      var chips = this.bets[0].chips;
      pots.push(Pot.createSidePot(chips, this.bets));
      for (var i = this.bets.length - 1; i >= 0; i--) {
        this.bets[i].chips -= chips;
        if (this.bets[i].chips <= 0) {
          this.bets.splice(i, 1);
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
Pot.createSidePot = function (chips, bets) {
  var players = [];
  var total = 0;
  for (var i = 0; i < bets.length; i++) {
    total += chips;
    if (!bets[i].player.folded) {
      players.push(bets[i].player);
    }
  }
  return new SidePot(total, players);
};
