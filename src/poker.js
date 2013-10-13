/**
 * The main Poker class and the returned API.
 */
;(function () {
  'use strict'


  var defaults = {
    //
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










