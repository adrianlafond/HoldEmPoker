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
      return u++
    }
  }()),


  defaults = {
    isHigh: true,
    isLow: false,
    acesAreLow: true,
    ignoreStraights: true,
    ignoreFlushes: true
  }



  /**
   * @constructor
   * options:
   *   id = defaults to uid()
   *   isHigh = whether the hand checks "high" values; default true
   *   isLow = whether the hand checks "low" values; default false
   *   acesAreLow = in low, if aces count as 1/low; default true
   *   ignoreStraights = in low, if straights can be low; default true
   *   ignoreFlushes = in low, if flushes can be low; default true
   *
   * Options to set for low hands:
   *   Ace-to-five low = acesAreLow, ignoreStraights, ignoreFlushes
   *   Ace-to-six low = acesAreLow, !ignoreStraights, !ignoreFlushes
   *   Deuce-to-seven low = !acesAreLow, !ignoreStraights, !ignoreFlushes
   *   Deuce-to-six low = !acesAreLow, ignoreStraights, ignoreFlushes
   * If !acesAreLow, A-2-3-4-5 is not a straight, since A != 1.
   *
   * If any options are updated after instantiation, reset() should be called.
   */
  Hand = function (options) {
    if (!(this instanceof Hand)) {
      return new Hand(options)
    }
    this.options = _.extend({ id: uid() }, defaults, options || {})
    this.reset()
    if (this.options.cards) {
      this.add(this.options.cards)
      delete this.options.cards
    }
  }
}());


