/**
 * Poker.Table
 */
;(function () {
  'use strict'


  var defaults = {
    //
  }


  /**
   * @constructor
   */
  Table = function (options) {
    if (!(this instanceof Table)) {
      return new Table(options)
    }
    this.options = util.extend({}, defaults, options || {})
  }

  Table.prototype = {
    //
  }
}());




