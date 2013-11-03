/**
 * Poker.Pot
 */
;(function () {
  'use strict'


  // var defaults = {}


  /**
   * @constructor
   */
  Pot = function (options) {
    // this.options = util.extend({}, defaults, options || {})
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
     * example: while (sidepot = pot.pop()) { ... }
     * Shorthand for dividing winning at the end of a hand;
     * obviously, don't call this method during a hand!
     */
    pop: function () {
      return (this.pots.length > 0) ? this.pots.pop() : null
    },


    /**
     * Add a round's worth of Bet objects.
     * @param {Round} round
     */
    add: function (round) {
      var bets = [],
          n = 0,
          sidepots = [{ pot: this.pot(), call: 0 }]

      // Form an array, sorted ascending by chips.
      util.each(round.bets, function (bet, id) {
        bets[n++] = bet
      })
      bets.sort(function (a, b) {
        return a.chips - b.chips
      })

      // Loop through the array, putting chips into current pot.
      // If a player is all-in, note it, so that if a player
      // bets more than the all-in, a new SidePot is created.
      n = 0
      util.each(bets, function (bet, b) {

        // Include player in pot only if he has contributed to it.
        if (bet.chips > 0) {

          // Add chips to side pots, subtracting chips from the bet
          // as it cascades up the side pots.
          util.each(sidepots, function (side, s) {
            if (side.call === 0) {
              side.call = bet.chips
            }
            side.pot.add(bet.player, side.call)
            bet.chips -= side.call
          })

          // If any chips are left in the bet, then add them to a new
          // side pot.
          if (bet.chips > 0) {
            n++
            sidepots[n] = {
              pot: new SidePot,
              call: bet.chips
            }
            sidepots[n].pot.add(bet.player, bet.chips)
            this.pots.push(sidepots[n].pot)
          }
        }
      }, this)
    },


    /**
     * Reset all. Empties side pots and creates a new empty main pot.
     * Each pot inside a Pot instance is an instance of a SidePot.
     */
    reset: function () {
      this.pots = [new SidePot]
    }
  }
}());




