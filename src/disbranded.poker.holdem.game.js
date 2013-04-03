
;(function (root) {
  'use strict'

  var NS = root.DISBRANDED.poker

  /**
   * 
   */
  NS.holdem.Game = function (options) {        
    if (!(this instanceof NS.holdem.Game)) {
      return new NS.holdem.Game(options)
    }
    
    this.options = NS.holdem.defaults()
    for (key in options) {
      if (options.hasOwnProperty(key)) {
        this.options[key] = options[key]
      }
    }
    
    this.dealer = new NS.Dealer
    
    var key, val, i, len    
    var hand1 = NS.Hand('a').add(['8C', '2C', 'AC', '2H', '3D', 'JC', 'QC'])
    var hand2 = NS.Hand('b').add(['8H', '5D', '6D', '2D', '3H', '7S', '9H'])
    var hand3 = NS.Hand('c').add(['8H', '5H', '6H', '2D', '3H', '7H', '9H'])
    var hand4 = NS.Hand('d').add(['5C', '3C', '6D', '9H', 'QD', 'AD', 'TS'])
    console.log(NS.string.en.cards[hand1.rank()], hand1.high())
    console.log(NS.string.en.cards[hand2.rank()], hand2.high())
    console.log(NS.string.en.cards[hand3.rank()], hand3.high())
    console.log(NS.string.en.cards[hand4.rank()], hand4.high())
    // console.log(hand1.compareTo(hand2))
    var sorted = NS.Hand.sort([hand1, hand2, hand3, hand4])
    for (var i = 0, len = sorted.length; i < len; i++) {
      console.log(sorted[i].id, sorted[i].high(), NS.string.en.cards[sorted[i].rank()])
    }
  }
  
  
  
  /**
   * @public API
   */
  NS.holdem.Game.prototype = {
    
    deal: function () {
      //...
    }
  }
  
}(this));