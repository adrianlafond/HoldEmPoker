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
      var argLen = arguments.length
      if (argLen === 0) {
        return this.pots[current]
      } else if (util.isInteger(arguments[0])) {
        if (this.pots.length <= arguments[0]) {
          return this.pots[arguments[0]]
        }
      }
      return null
    },


    /**
     * Reset all. Empties main pot and side pots.
     */
    reset: function () {
      this.pots = []
      this.current = 0
    }
  }


  // Constants correspond to lingo[lang].pot.
  Pot.FIXED_LIMIT     = 0
  Pot.SPREAD_LIMIT    = 1
  Pot.POT_LIMIT       = 2
  Pot.NO_LIMIT        = 3
  Pot.CAP_LIMIT       = 4

}());




