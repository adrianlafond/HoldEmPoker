
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
    // this.deck.removeJokers().shuffle().addJokers(2)
    this.deck.addJokers(6).removeJokers().addJokers(2).shuffle()
    var str = []
    for (i = 0, len = this.deck.cards().length; i < len; i++) {
      str[i] = this.deck.deal()
    }
    console.log(str)
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