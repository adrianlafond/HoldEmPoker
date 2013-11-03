/**
 * The main Poker class and the returned API.
 */
;(function () {
  'use strict'


  var defaults = {

    // Number of raises allowed per round:
    maxRaises: 3,

    // Type of betting limit:
    limit: FIXED_LIMIT,

    // If high hand, low hand, or both wins the pot.
    high: true,
    low: false
  }


  /**
   * @constructor
   */
  Poker = function (options) {
    if (!(this instanceof Poker)) {
      return new Poker(options)
    }
    this.options = util.extend({}, defaults, options || {})
  }

  Poker.prototype = {
    //
  }
}());










