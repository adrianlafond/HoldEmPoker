;(function () {
  'use strict'


  /**
   * A round of betting, before bets are added to the pot.
   */
  Round = function () {
    this.reset()
  }


  Round.prototype = {

    /**
     * Bet/call/add chips to the current betting round.
     * Possible arguments formats:
     * @param {Bet}
     *   or
     * @param {string} player The ID of the player making bet/call.
     * @param {number} chips The amount of the bet/call.
     * @param {boolean} allin Optional; necessary for determining when
     *   to create new side pots; default false.
     */
    bet: function () {
      var existBet,
          bet = (arguments[0] instanceof Bet)
            ? arguments[0]
            : new Bet(arguments[0], arguments[1], arguments[2])
      if (existBet = this.bets[bet.player]) {
        existBet.chips += bet.chips
        existBet.allin = !!!existBet.allin && bet.allin === true
        existBet.folded = !!!existBet.folded && bet.folded === true
      } else {
        this.bets[bet.player] = bet
      }
    },


    /**
     * Fold a player who has already bet, so that allin vs fold
     * can be more easily differentiated.
     */
    fold: function (player) {
      var bet = this.chipsFor(player)
        || (this.bets[player] = new Bet(player, 0, false))
      bet.folded = true
      bet.allin = false
    },



    /**
     * If for some reason an all-in bet was made but the Bet
     * was not marked as all-in, do it here.
     */
    allin: function (player) {
      var bet = this.betFor(player)
        || (this.bets[player] = new Bet(player, 0, false))
      bet.folded = false
      bet.allin = true
    },


    /**
     * Return the accumulated chips bet by player with id @param player.
     */
    chipsFor: function (player) {
      return (player in this.bets) ? this.bets[player].chips : null
    },


    /**
     * Return the total chips bet in this round.
     */
    chipsTotal: function () {
      var n = 0
      util.each(this.bets, function (bet, player) {
        n += bet.chips
      }, this)
      return n
    },


    /**
     * Reset all values.
     */
    reset: function () {
      this.bets = {}
    }
  }
}());



