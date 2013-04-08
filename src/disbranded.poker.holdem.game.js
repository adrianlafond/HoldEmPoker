
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
      _.extend(NS.holdem.defaults(), this._options)
    }
    
  }
  
  
  
  NS.Game.extend(NS.holdem.Game)
  
}(this, _));