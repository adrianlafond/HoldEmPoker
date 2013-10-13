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
    this.options = util.extend({ id: uid() }, defaults, options || {})
  }

  Pot.prototype = {
    //
  }
}());




