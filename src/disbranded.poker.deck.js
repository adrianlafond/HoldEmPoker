
;(function (root, _) {
  'use strict'

  var NS = root.DISBRANDED.poker,
      
      cards = [
        '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC', 'AC',
        '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD', 'AD',
        '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH', 'AH',
        '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS', 'AS'
      ],
      
      SIZE = cards.length,

      MAX_JOKERS = 4
  
  
  NS.Deck = function (options) {
    options = options || {}
    this._cards = []
    this._in = []
    this._out = []
    
    // add cards
    this._cards = cards.slice(0)
    
    // add jokers
    this._jokers = Math.max(0, Math.min(MAX_JOKERS, parseInt(options.hasOwnProperty('jokers') ? options.jokers : 0, 10)))
    _.times(this._jokers, function (n) {
      this._cards[n + SIZE] = 'W' + (n + 1)
    }, this)
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
      num = Math.min(num, MAX_JOKERS - this._jokers)
      _.times(num, function (n) {
        this._cards.push('W' + (n + 1))
      }, this)
      this._jokers += num
      this.reset(true)
      return this
    },
    
    
    /**
     * Reset the deck to its original unshuffled order.
     */
    reset: function (override) {
      var i, len
      if (!!override || !this._reset) {
        this._in = this._cards.slice(0)
        this._out = []
        this._reset = true
      }
      return this
    },
    
    
    /**
     * Shuffle/randomize the deck.
     */
    shuffle: function () {
      this._in = _.shuffle(this._in)
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
}(this, _));