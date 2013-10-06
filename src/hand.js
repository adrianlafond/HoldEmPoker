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
    isLow: false
  }



  /**
   * @constructor
   * options:
   *   id = defaults to uid()
   *   isHigh = whether the hand checks "high" values; default true
   *   isLow = whether the hand checks "low" values; default false
   *
   * If any options are updated after instantiation, reset() should be called.
   */
  Hand = function (options) {
    if (!(this instanceof Hand)) {
      return new Hand(id)
    }
    this.options = _.extend({ id: uid() }, defaults, options)
    this.reset()
  }
}());


