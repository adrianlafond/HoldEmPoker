
;(function (root) {
  'use strict'

  var NS = root.DISBRANDED.poker
  
  
  /**
   * Works like jQuery.extend()
   */
  function extend() {
    var obj = arguments[0],
        i = 1,
        len = arguments.length,
        key
    for (; i < len; i++) {
      for (key in arguments[i]) {
        obj[key] = arguments[i][key]
      }
    }
  }

  /**
   * 
   */
  NS.holdem.Game = function (options) {        
    if (!(this instanceof NS.holdem.Game)) {
      return new NS.holdem.Game(options)
    }
    
    this.options = NS.holdem.defaults()
    if (options) {
      extend(this.options, options)
    }
    
    this._players = new NS.Players
    this._deck = new NS.Deck
    
    // console.log(this._deck.addJokers(2).shuffle().cards())
    
    var h = NS.Hand('a').add('4C', '8C', '3D', 'AS', '6S', '7S', 'KD', 'QD', '5H', 'TH', 'JH')
    console.log(NS.string.en.cards[h.rank()], h.high().join(' '))
    
    // var key, val, i, len    
    // var hand1 = NS.Hand('a').add(['8C', '2C', 'AC', '2H', '3D', 'JC', 'QC'])
    // var hand2 = NS.Hand('b').add(['8H', '5D', '6D', '2D', '3H', '7S', '9H'])
    // var hand3 = NS.Hand('c').add(['8H', '5H', '6H', '2D', '3H', '7H', '9H'])
    // var hand4 = NS.Hand('d').add(['5C', '3C', '6D', '9H', 'QD', 'AD', 'TS'])
    // console.log(NS.string.en.cards[hand1.rank()], hand1.high())
    // console.log(NS.string.en.cards[hand2.rank()], hand2.high())
    // console.log(NS.string.en.cards[hand3.rank()], hand3.high())
    // console.log(NS.string.en.cards[hand4.rank()], hand4.high())
    // // console.log(hand1.compareTo(hand2))
    // var sorted = NS.Hand.sort([hand1, hand2, hand3, hand4])
    // for (var i = 0, len = sorted.length; i < len; i++) {
    //   console.log(sorted[i].id, sorted[i].high(), NS.string.en.cards[sorted[i].rank()])
    // }
    // 
    // console.log(hand1.size())
    // console.log(hand1.has('8C'), hand1.has('KC'))
    // console.log(hand1.get(0), hand1.get(1), hand1.get(-1), hand1.get(10))
    // console.log(hand1.set(1, 'KC').has('KC'), hand1.get(1))
    // console.log(hand1.set('LAST', 'AS').has('AS'))
  }
  
  
  
  /**
   * @public API
   */
  NS.holdem.Game.prototype = {
    
    get: function (key) {
      return (this.options.hasOwnProperty(key)) ? this.options[key] : null
    },
    
    set: function (key, value) {
      if (this.options.hasOwnProperty(key)) {
        this.options[key] = value
      }
      return this
    },
    
    
    deal: function (options) {
      extend(this.options, options)
    }
  }
  
}(this));