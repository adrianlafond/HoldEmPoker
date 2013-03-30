
;(function (root) {
  'use strict'

  var NS,
      
      cards = [
        '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC', 'AC',
        '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD', 'AD',
        '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH', 'AH',
        '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS', 'AS'
      ],
      
      SIZE = cards.length,

      MAX_JOKERS = 4
      

  // @namespace
  root.DISBRANDED = (typeof root.DISBRANDED === 'undefined') ? {} : root.DISBRANDED
  root.DISBRANDED.poker = root.DISBRANDED.poker || {}
  NS = root.DISBRANDED.poker
  
  
  NS.Deck = function (options) {
    var i, len
    
    options = options || {}
    this._cards = []
    this._in = []
    this._out = []
    
    // add cards
    for (i = 0, len = cards.length; i < len; i++) {
      this._cards[i] = cards[i]
    }
    
    // add jokers
    this._jokers = options.jokers ? Math.max(0, Math.min(MAX_JOKERS, parseInt(options.jokers, 10))) : 0
    for (i = 0, len = this._jokers; i < len; i++) {
      this._cards[i + SIZE] = 'W' + (i + 1)
    }
    
    this.reset(true)
  }

  
  NS.Deck.prototype = {
    
    /**
     * @returns undealt cards remaining in deck.
     */
    cards: function () {
      return this._in
    },
    
    /**
     * @returns number of cards in the deck.
     */
    count: function () {
      return SIZE + this.jokers()
    },
    
    /**
     * @returns number of jokers in the deck.
     */
    jokers: function () {
      return this._jokers
    },
    
    /**
     * Remove all jokers from the deck.
     */
    removeJokers: function () {
      this.reset()
      this._cards.splice(SIZE, this._jokers)
      this._jokers = 0
      this.reset(true)
      return this
    },
    
    /**
     * Add up to 4 jokers to the deck.
     * @param {number} num Number of jokers to add.
     */
    addJokers: function (num) {
      var jokers = this.jokers(),
          num = Math.max(0, Math.min(MAX_JOKERS, parseInt(num, 10))),
          index = jokers + 1
      while (jokers < MAX_JOKERS && num > 0) {
        this._cards.push('W' + index++)
        num--
        jokers ++
      }
      this._jokers = jokers
      this.reset(true)
      return this
    },
    
    
    /**
     * Reset the deck to its original unshuffled order.
     */
    reset: function (override) {
      var i, len
      if (!!override || !this._reset) {
        this._in = []
        this._out = []
        for (i = 0, len = this._cards.length; i < len; i++) {
          this._in[i] = this._cards[i]
        }
        this._reset = true
      }
      return this
    },
    
    
    /**
     * Shuffle/randomize the deck.
     */
    shuffle: function () {
      var len,
          temp = []
      this.reset()
      while ((len = this._in.length) > 0) {
        temp.push(this._in.splice(Math.floor(Math.random() * len), 1)[0])
      }
      this._in = temp
      this._reset = false
      return this
    },
    
    
    /**
     * Deal next card in the deck.
     * @returns the card dealt.
     */
    deal: function () {
      var card = null
      if (this._in.length === 0) {
        return card
      }
      card = this._in.shift()
      this._out.unshift(card)
      this._reset = false
      return card
    }
  }
}(this));