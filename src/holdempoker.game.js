
;(function (root) {
  'use strict'

  var HEP = root.HOLDEM_POKER || (root.HOLDEM_POKER = {})


  /**
   * 
   */
  HEP.Game = function (options) { 
    var key, val, i, len
       
    if (!(this instanceof HEP.Game)) {
      return new HEP.Game(options)
    }
    
    this.options = HEP.defaults()
    for (key in options) {
      if (options.hasOwnProperty(key)) {
        this.options[key] = options[key]
      }
    }
    
    this.deck = new HEP.Deck({ jokers: 2 })
    console.log(this.deck.cards())
  }
  
  
  /**
   * @public API
   */
  HEP.Game.prototype = {
    
    deal: function () {
      //...
    }
  }
  
}(this));