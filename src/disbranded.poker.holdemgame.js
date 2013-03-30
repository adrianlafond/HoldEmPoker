
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
    
    // var hand = new NS.Hand('e').add(['TC', '6D', '5H', 'KC', '2C', '3D', '9S'])
    // var hand = new NS.Hand('e').add(['TC', '6D', '5H', 'KC', '2C', '9D', '9S'])
    // var hand = new NS.Hand('e').add(['TC', '6D', '6H', 'KC', '2C', '9D', '9S'])
    // var hand = new NS.Hand('e').add(['TC', '6D', '6H', 'KC', '6C', 'AD', '9S'])
    // var hand = new NS.Hand('e').add(['TC', '7D', '6H', '5C', '6C', '9D', '8S'])
    // var hand = new NS.Hand('e').add(['TC', '7C', '6H', '5C', '6C', '9D', '8C'])
    // var hand = new NS.Hand('e').add(['TC', '6D', '6H', 'KC', '6C', '9D', '9S'])
    // var hand = new NS.Hand('e').add(['TC', '7C', '6H', '7D', '7H', '9D', '7S'])
    // var hand = new NS.Hand('e').add(['TS', '7C', '6H', '5C', '6C', '9C', '8C'])
    var hand = new NS.Hand('e').add(['TH', 'JH', '6H', 'QH', 'AH', '9D', 'KH'])
    console.log(hand.rank(), hand.high())
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