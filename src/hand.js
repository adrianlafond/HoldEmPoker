/**
 * Poker.Hand is a player's hand of poker cards,
 * including the hand's value and hand comparisons.
 */
;(function () {
  'use strict'


  // If a Hand is not instantiated with an id,
  // one will be created for it.
  var uid = (function () {
    var u = 0
    return function () {
      return 'hand-' + u++
    }
  }()),


  defaults = {
    high: true,
    low: false
  }



  /**
   * @constructor
   * options:
   *   id = defaults to uid()
   *   high = whether the hand checks "high" values; default true
   *   low = whether the hand checks "low" values; default false
   *
   * Other options for low: Hand.ACE_TO_FIVE_LOW, Hand.ACE_TO_SIX_LOW,
   * Hand.DEUCE_TO_SEVEN_LOW, Hand.DEUCE_TO_SIX_LOW.
   * See https://en.wikipedia.org/wiki/Lowball_(poker)
   *
   * If any options are updated after instantiation, reset() should be called.
   */
  Hand = function (options) {
    this.options = util.extend({ id: uid() }, defaults, options || {})
    this.reset()
    if (this.options.cards) {
      this.add(this.options.cards)
      delete this.options.cards
    }
  }
}());


