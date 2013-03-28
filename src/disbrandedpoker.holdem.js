
;(function (root) {
  'use strict'

  var NS
  
  root.DISBRANDED_POKER = (typeof root.DISBRANDED_POKER === 'undefined') ? {} : root.DISBRANDED_POKER
  NS = root.DISBRANDED_POKER

  /**
   * 
   */
  NS.HoldEm = function (options) { 
    var key, val, i, len
       
    if (!(this instanceof NS.HoldEm)) {
      return new NS.HoldEm(options)
    }
    
    this.options = NS.defaults()
    for (key in options) {
      if (options.hasOwnProperty(key)) {
        this.options[key] = options[key]
      }
    }
    
    this.deck = new NS.Deck({ jokers: 2 })
    // this.deck.removeJokers().shuffle().addJokers(2)
    this.deck.addJokers(6).removeJokers().addJokers(2).shuffle()
    var str = []
    for (i = 0, len = this.deck.count() / 2; i < len; i++) {
      str[i] = this.deck.deal()
    }
    console.log(str)
    console.log(this.deck.cards())
  }
  
  
  /**
   * @public API
   */
  NS.HoldEm.prototype = {
    
    deal: function () {
      //...
    }
  }
  
}(this));