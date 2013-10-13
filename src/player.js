/**
 * Poker.Player
 */
;(function () {
  'use strict'

  // If a PLayer is not instantiated with an id,
  // one will be created for it.
  var uid = (function () {
    var u = 0
    return function () {
      return u++
    }
  }()),

  defaults = {
    //
  }


  /**
   * @constructor
   */
  Player = function (options) {
    if (!(this instanceof Player)) {
      return new Player(options)
    }
    this.options = util.extend({ id: uid() }, defaults, options || {})
  }

  Player.prototype = {
    //
  }
}());



