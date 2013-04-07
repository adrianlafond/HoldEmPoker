
;(function (root, _) {
  'use strict'

  var NS = root.DISBRANDED.poker


  /**
   * 
   */
  NS.holdem.Game = function (options) {        
    if (!(this instanceof NS.holdem.Game)) {
      return new NS.holdem.Game(options)
    }
    this._init(options)
  }
  
  
  
  /**
   * @public API
   */
  NS.holdem.Game.prototype = {
    
    _init: function (options) {
      NS.Game.prototype._init.call(this, options)
      _.extend(NS.holdem.defaults(), this.options)
      this._players = new NS.Players
      this._deck = new NS.Deck
    }
    
  }
  
  
  
  NS.Game.extend(NS.holdem.Game)
  console.log(NS.holdem.Game.prototype)
  
}(this, _));