;(function () {
  'use strict'

  /**
   * Validates calls/bets made into the pot.
   */
  Bet = function (player, chips, allin) {
    if (!(this instanceof Bet)) {
      return new Bet(player, chips, allin)
    }
    if (!util.isString(player)) {
      throw 'Bet @param player not valid.'
    }
    if (!util.isNumber(chips)) {
      throw 'Bet @param chips not valid.'
    }
    this.player = player
    this.chips = chips
    this.allin = allin === true
    this.folded = false
  }
}());




