;(function () {
  'use strict'

  /**
   * Validates calls/bets made into the pot.
   */
  Bet = function (player, chips, allin) {
    if (!(this instanceof Pot.Bet)) {
      return new Pot.Bet(player, chips, allin)
    }
    if (!util.isString(player)) { return null }
    if (!util.isNumber(chips)) { return null }
    this.player = player
    this.chips = chips
    this.allin = allin === true
    this.folded = false
  }
}());




