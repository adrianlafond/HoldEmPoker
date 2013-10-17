/**
 * Poker.Pot
 */
;(function () {
  'use strict'


  var defaults = {
    maxRaises: 3
  }


  /**
   * @constructor
   */
  Pot = function (options) {
    this.options = util.extend({}, defaults, options || {})
  }

  Pot.prototype = {
    //
  }


  // Constants correspond to lingo[lang].pot.
  Pot.FIXED_LIMIT     = 0
  Pot.SPREAD_LIMIT    = 1
  Pot.POT_LIMIT       = 2
  Pot.NO_LIMIT        = 3
  Pot.CAP_LIMIT       = 4
}());




