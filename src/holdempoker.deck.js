
;(function (root) {
  'use strict'

  var HEP = root.HOLDEM_POKER || (root.HOLDEM_POKER = {}),
  
      cards = [
        '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC', 'AC',
        '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD', 'AD',
        '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH', 'AH',
        '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS', 'AS'
      ]
  
  
  HEP.Deck = function (options) {
    var i, len
    
    options = options || {}
    this._cards = []
    
    // add cards
    for (i = 0, len = cards.length; i < len; i++) {
      this._cards[i] = cards[i]
    }
    this._count = this._cards.length
    
    // add jokers
    this._jokers = options.jokers ? Math.max(0, Math.min(4, parseInt(options.jokers, 10))) : 0
    for (i = 0, len = this._jokers; i < len; i++) {
      this._cards[i + this._count] = 'J' + (i + 1)
    }
    this._count += this.jokers
  }

  
  HEP.Deck.prototype = {
    
    cards: function () {
      return this._cards
    },
    
    count: function () {
      return this._count
    },
    
    jokers: function () {
      return this._jokers
    }
  }
}(this));