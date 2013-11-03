/**
 * The main Poker class and the returned API.
 */
;(function () {
  'use strict'


  var defaults = {

    // Number of raises allowed per round:
    maxRaises: 3,

    // Type of betting limit:
    limit: FIXED_LIMIT
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










