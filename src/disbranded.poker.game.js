
/**
 * poker.Game is an abstract base class that specific types
 * of poker game will extend.
 */
;(function (root, _) {
  'use strict'

  var NS = root.DISBRANDED.poker
  
  /**
   * TO DO: implement publish/subscribe functionality.
   */
  NS.Game = function () {}
  
  
  NS.Game.prototype = {
    
    _init: function (options) {
      this.options = options ? _.extend({}, options) : {}
    },
    
    get: function (key) {
      return _.has(this.options, key) ? this.options[key] : null
    },
    
    set: function (key, value) {
      this.options[key] = value
      return this
    },
    
    deal: function (options) {
      _.extend(this.options, options)
    }
  }
  
  
  /**
   * Util to extend a specific game from this abstract game.
   */
  NS.Game.extend = function (ChildGame) {
    ChildGame.prototype = _.extend(new NS.Game, ChildGame.prototype)
    ChildGame.prototype.constructor = ChildGame
  }
  
}(this, _));