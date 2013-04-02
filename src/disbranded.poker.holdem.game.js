
;(function (root) {
  'use strict'

  var NS
  
  // @namespace
  root.DISBRANDED = (typeof root.DISBRANDED === 'undefined') ? {} : root.DISBRANDED
  root.DISBRANDED.poker = root.DISBRANDED.poker || {}
  NS = root.DISBRANDED.poker
  NS.holdem = NS.holdem || {}

  /**
   * 
   */
  NS.holdem.Game = function (options) { 
    var key, val, i, len
       
    if (!(this instanceof NS.holdem.Game)) {
      return new NS.holdem.Game(options)
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
    
    // var hands = [
    //   { id:'a', hand: ['2C', '3C', '5C', '2D', '6C', 'AD', 'KC'] },// king-high flush
    //   { id:'b', hand: ['2C', '3C', '5C', '2D', '6C', 'AD', 'KC'] },// 3 of a kind
    //   { id:'c', hand: ['2C', '3C', '5C', '2D', '6C', 'AD', 'KC'] }// 2 pair
    // ]
    // console.log('highest:', NS.hands.highest(hands))
    
    // var hand = new NS.Hand('a').add(['5C', '3C', '6C', '4H', '7C', '2C', 'KC']).updateStatus()
    // var hand = new NS.Hand('a').add(['8C', '7C', '8H', '9C', 'TD', 'TC', 'JC', 'QC']).updateStatus()
    // var hand2 = new NS.Hand('b').add(['AC', 'KC', '8H', '9C', 'TD', 'TC', 'JC', 'QC']).updateStatus()
    // var hand3 = new NS.Hand('c').add(['AS', 'AC', '7C', '6D', 'TD', 'TC', 'JS']).updateStatus()
    // var hand4 = new NS.Hand('d').add(['AS', 'KC', '7C', '7D', 'KD', 'TC', 'KS', 'QC']).updateStatus()
    
    // var hand1 = new NS.Hand('e').add(['TC', '6D', '5H', 'KC', '2C', '3D', '9S'])
    // var hand2 = new NS.Hand('e').add(['TC', '6D', '5H', 'KC', '2C', '9D', '9S'])
    // var hand1 = new NS.Hand('e').add(['2D', '6D', '6H', 'KC', '2C', '9D', '9S'])
    // var hand2 = new NS.Hand('e').add(['TC', '6D', '6H', 'KC', '6C', 'AD', '9S'])
    // var hand = new NS.Hand('e').add(['TC', '7D', '6H', '5C', '6C', '9D', '8S'])
    // var hand = new NS.Hand('e').add(['AC', '7C', '6H', '5C', '6C', '9D', '8C'])
    // var hand = new NS.Hand('e').add(['KD', '6D', '6H', 'KC', '6C', '9D', '9S'])
    // var hand = new NS.Hand('e').add(['2C', '7C', '9H', '7D', '7H', '9D', '7S'])
    // var hand1 = new NS.Hand('e').add(['AC', '7C', '6H', '5C', '6C', '9C', '8C'])
    // var hand2 = new NS.Hand('e').add(['TH', 'JH', '6H', 'QH', 'AH', '9D', 'KH'])
    
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