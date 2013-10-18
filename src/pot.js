/**
 * Poker.Pot
 */
;(function () {
  'use strict'


  var defaults = {
    maxRaises: 3,
    bettingLimit: 0
  }


  /**
   * @constructor
   */
  Pot = function (options) {
    this.options = util.extend({}, defaults, options || {})
    this.reset()
  }

  Pot.prototype = {

    /**
     * Return a pot. If no arguments, returns current pot.
     * If first argument is the index number of a specific pot,
     * returns that pot.
     */
    pot: function () {
      var argLen = arguments.length,
          potsLen = this.pots.length
      if (potsLen > 0) {
        if (argLen === 0) {
          return this.pots[potsLen - 1]
        } else if (util.isInteger(arguments[0])) {
          if (potsLen <= arguments[0]) {
            return this.pots[arguments[0]]
          }
        }
      }
      return null
    },


    /**
     * Return current/last pot and remove it from the pots array.
     * example: while (sidepot = pot.next()) { ... }
     * Shorthand for dividing winning at the end of a hand;
     * obviously, don't call this method during a hand!
     */
    pop: function () {
      return (this.pots.length > 0) ? this.pots.pop() : null
    },


    /**
     * Add chips to the current pot.
     * @param {string} player The ID of the player making bet/call.
     * @param {number} chips The amount of the bet/call.
     * @param {boolean} allin Optional; necessary for determining when
     *   to create new side pots; default false.
     */
    add: function (player, chips, allin) {
      var pot,
          bet,
          newPot
      if ((pot = this.pot()) && (bet = Pot.Bet(player, chips, allin))) {
        if (newPot = pot.add(bet)) {
          this.pots.push(newPot)
        }
      }
    },


    /**
     * Reset all. Empties side pots and creates a new empty main pot.
     */
    reset: function () {
      this.pots = [new Pot.SidePot]
    }
  }



  /**
   * A pot is actually a collection of side pots.
   */
  Pot.SidePot = function () {
    this.total = 0
    this.bets = []
    this.call = 0
  }

  Pot.SidePot.prototype = {
    /**
     * @param {Pot.Bet} bet
     */
    add: function (bet) {
      this.bets.push(bet)
      return null// or new Pot.SidePot
    }
  }


  /**
   * Validates additions to the pot.
   */
  Pot.Bet = function (player, chips, allin) {
    if (!(this instance of Pot.Bet)) {
      return new Pot.Bet(player, chips, allin)
    }
    if (!util.isString(player)) { return null }
    if (!util.isNumber(chips)) { return null }
    this.player = player
    this.chips = chips
    this.allin = allin === true
  }


  // Constants correspond to lingo[lang].pot.
  Pot.FIXED_LIMIT     = 0
  Pot.SPREAD_LIMIT    = 1
  Pot.POT_LIMIT       = 2
  Pot.NO_LIMIT        = 3
  Pot.CAP_LIMIT       = 4

}());




