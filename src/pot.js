/**
 * Poker.Pot
 */
;(function () {
  'use strict'


  var defaults = {
    //
  }


  /**
   * @constructor
   */
  Pot = function (options) {
    if (!(this instanceof Pot)) {
      return new Pot(options)
    }
    this.options = util.extend({}, defaults, options || {})
  }

  Pot.prototype = {
    //
  }
}());




