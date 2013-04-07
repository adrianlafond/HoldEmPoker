
/**
 * poker.Game is an abstract base class that specific types
 * of poker game will extend.
 */
;(function (root, _) {
  'use strict'

  var NS = root.DISBRANDED.poker
  
  /**
   * TODO: implement publish/subscribe functionality.
   * TODO: create new Pot
   * TODO: create new Players
   * TODO: create new Deck
   */
  NS.Game = function () {}
  
  NS.Game.prototype = {
    
    _init: function (options) {
      this.options = options ? _.extend({}, options) : {}
      this._players = new NS.Players
      this._deck = new NS.Deck
      this._pot = new NS.Pot
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
  
  
  NS.util.events.call(NS.Game.prototype)
  
  /**
   * Util to extend a specific game from this abstract game.
   */
  NS.Game.extend = function (ChildGame) {
    ChildGame.prototype = _.extend(new NS.Game, ChildGame.prototype)
    ChildGame.prototype.constructor = ChildGame
  }
  
}(this, _));