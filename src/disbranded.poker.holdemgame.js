
;(function (root) {
  'use strict'

  var NS
  
  // @namespace
  root.DISBRANDED = (typeof root.DISBRANDED === 'undefined') ? {} : root.DISBRANDED
  root.DISBRANDED.poker = root.DISBRANDED.poker || {}
  NS = root.DISBRANDED.poker

  /**
   * 
   */
  NS.HoldEmGame = function (options) { 
    var key, val, i, len
       
    if (!(this instanceof NS.HoldEmGame)) {
      return new NS.HoldEmGame(options)
    }
    
    this.options = NS.holdem.defaults()
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
  NS.HoldEmGame.prototype = {
    
    deal: function () {
      //...
    }
  }
  
}(this));