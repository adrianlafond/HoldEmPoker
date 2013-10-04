/**
 * The deck of poker cards.
 */
;(function () {
  'use strict'
  

    /**
     * Store instances with unique IDs.
     */
    var decks = {},
        uid = 0,


        /**
         * Private constants.
         */
        CARDS = [
          '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC', 'AC',
          '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD', 'AD',
          '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH', 'AH',
          '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS', 'AS'
        ],
  
        SIZE = CARDS.length,

        MIN_JOKERS = 0,
        MAX_JOKERS = 4
      
      
  
  function getUid() {
    return 'deck-' + uid++
  }
  
  

  Deck = function (options) {
    var deck
    
    this.key = getUid()
    deck = decks[this.key] = {
      instance: this,
      cards: CARDS.slice(0),
      cardsIn: [],
      cardsOut: [],
      jokers: 0,
      shuffled: false
    }
    
    if (typeof options === 'object') {
      deck.jokers = parseInt(options.hasOwnProperty('jokers') ? options.jokers : 0, 10)
      deck.jokers = Math.max(MIN_JOKERS, Math.min(MAX_JOKERS, jokers))
      _.times(deck.jokers, function (n) {
        deck.cards[n + SIZE] = 'W' + (n + 1)
      })
    }
    this.reset()
  }
  
  
  
  
  Deck.prototype = {
    
    /**
     * @returns undealt cards remaining in deck.
     */
    cards: function () {
      return decks[this.key].cardsIn.slice(0)
    },
    
    /**
     * @returns number of jokers in the deck.
     */
    jokers: function () {
      return decks[this.key].jokers
    },
    
    /**
     * @returns number of cards in the deck.
     */
    count: function () {
      return SIZE + this.jokers()
    },
    
    /**
     * @returns {boolean}
     */
    shuffled: function () {
      return decks[this.key].shuffled
    },
    
    /**
     * Remove all jokers from the deck.
     */
    removeJokers: function () {
      decks[this.key].cards.slice(0, SIZE)
      decks[this.key].jokers = 0
      this.reset()
      return this
    },
    
    /**
     * Add up to 4 jokers to the deck.
     * @param {number} num Number of jokers to add.
     */
    addJokers: function (num) {
      num = Math.min(num, MAX_JOKERS - decks[this.key].jokers)
      _.times(num, function (n) {
        decks[this.key].cards.push('W' + (n + 1))
      }, this)
      decks[this.key].jokers += num
      this.reset()
      return this
    },
    
    
    /**
     * Reset the deck to its original unshuffled order.
     */
    reset: function () {
      var deck = decks[this.key]
      deck.cardsIn = deck.cards.slice(0)
      deck.cardsOut = []
      deck.shuffled = false
      return this
    },
    
    
    /**
     * Shuffle/randomize the deck.
     */
    shuffle: function () {
      this.reset()
      decks[this.key].cardsIn = _.shuffle(decks[this.key].cardsIn)
      decks[this.key].shuffled = true
      return this
    },
    
    
    /**
     * Deal next card in the deck.
     * @returns the card dealt.
     */
    deal: function () {
      var card = null,
          deck = decks[this.key]
      if (deck.cardsIn.length > 0) {
        card = deck.cardsIn.pop()
        deck.cardsOut.push(card)
      }
      return card
    }
  }
}());




