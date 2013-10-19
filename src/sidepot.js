;(function () {
  'use strict'

  /**
   * A pot is actually a collection of side pots.
   */
  SidePot = function () {
    this.total = 0
    this.bets = []
    this.call = 0
  }

  SidePot.prototype = {
    /**
     * @param {Bet} bet
     * TODO: figure out if/when new side pots should be created.
     */
    add: function (bet) {
      bet.allin = bet.allin || (bet.chips < this.call)
      this.bets.push(bet)
      return null// or new Pot.SidePot
    }
  }
}());




