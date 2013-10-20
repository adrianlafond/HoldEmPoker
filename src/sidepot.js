;(function () {
  'use strict'

  /**
   * A pot is actually a collection of side pots.
   */
  SidePot = function () {
    this.bets = {}
  }

  SidePot.prototype = {

    /**
     * @param {string} player The id of a Player.
     * @param {chips}
     */
    add: function (player, chips) {
      this.bets[player] = chips
    },

    total: function () {
      var n = 0
      util.each(this.bets, function (chips) {
        n += chips
      })
      return n
    }
  }
}());




