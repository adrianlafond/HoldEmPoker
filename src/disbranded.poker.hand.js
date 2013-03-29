
;(function (root) {
  'use strict'

  var NS
      
  
  // @namespace
  root.DISBRANDED = (typeof root.DISBRANDED === 'undefined') ? {} : root.DISBRANDED
  root.DISBRANDED.poker = root.DISBRANDED.poker || {}
  NS = root.DISBRANDED.poker
  
  
  NS.Hand = function (id) {
    this.id = id
    this.reset()
  }
  
  NS.Hand.prototype = {
    
    hasCard: function (card) {
      var i = 0, len = this._cards.length
      for (; i < len; i++) {
        if (this._cards[i] === card) {
          return true
        }
      }
      return false
    },
    
    add: function (card) {
      var i, len
      if (typeof card === 'string') {
        if (!this.hasCard(card)) {
          this._cards[this._size] = card
        }        
      } else if (Object.prototype.toString.call(card) === '[Object Array]') {
        for (i = 0, len = card.length; i < len; i++) {
          this.add(card[i])
        }
        // this._cards = this._cards.concat(card)
      } else {
        throw 'Error: @param "card" must be a string or an array.'
      }
      this._size = this._cards.length
    },
    
    get: function (index) {
      return (index in this._cards) ? this._cards[index] : null
    },
    
    set: function (index, card) {
      this._cards[Math.max(0, Math.min(this._size, parseInt(index, 10)))] = card
      this._size = this._cards.length
    },
    
    reset: function () {
      this._cards = []
      this._size = 0
      this.title = this.titleHigh = this.titleLow = null
    },
    
    size: function () {
      return this._size
    }
  }
  
  
  NS.Hand.ROYAL_FLUSH     = 'Royal Flush',
  NS.Hand.STRAIGHT_FLUSH  = 'Straight Flush',
  NS.Hand.FOUR_OF_A_KIND  = 'Four of a Kind',
  NS.Hand.FULL_HOUSE      = 'Full House',
  NS.Hand.FLUSH           = 'Flush',
  NS.Hand.STRAIGHT        = 'Straight',
  NS.Hand.THREE_OF_A_KIND = 'Three of a Kind',
  NS.Hand.TWO_PAIR        = 'Two Pair',
  NS.Hand.ONE_PAIR        = 'One Pair',
  NS.Hand.HIGH_CARD       = 'High Card'

}(this));