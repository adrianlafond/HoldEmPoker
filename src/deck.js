/**
 * The deck of poker cards.
 */
;(function () {
  'use strict'



  /**
   * Private constants.
   */
  var CARDS = [
        '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC', 'AC',
        '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD', 'AD',
        '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH', 'AH',
        '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS', 'AS'
      ],

      SIZE = CARDS.length,

      MAX_JOKERS = 4



  Deck = function (options) {
    this.isShuffled = false
    this.isNew = true
    this.jokers = 0

    if (typeof options === 'object') {
      this.addJokers(parseInt(options.hasOwnProperty('jokers') ? options.jokers : 0, 10))
    }
    this.reset()
  }




  Deck.prototype = {

    /**
     * @returns undealt cards remaining in deck.
     */
    cards: function () {
      return this.cardsIn.slice()
    },

    /**
     * @returns number of cards in the deck.
     */
    count: function () {
      return SIZE + this.jokers
    },

    /**
     * Remove all jokers from the deck.
     */
    removeJokers: function () {
      this.jokers = 0
      this.reset()
      return this
    },

    /**
     * Add up to 4 jokers to the deck.
     * @param {number} num Number of jokers to add.
     */
    addJokers: function (num) {
      num = parseInt(num, 10)
      if (!isNaN(num)) {
        num = Math.max(0, Math.min(num, MAX_JOKERS - this.jokers))
        this.jokers += num
        this.reset()
      }
      return this
    },


    /**
     * Reset the deck to its original unshuffled order.
     */
    reset: function () {
      var n = 0
      this.cardsIn = []
      this.cardsOut = []
      util.each(CARDS, function (card, i) {
        this.cardsIn[i] = new Card({ value: card })
      }, this)
      for (; n < this.jokers; n++) {
        this.cardsIn[SIZE + n] = new Card({ value: 'W' + (n + 1) })
      }
      util.each(this.cardsIn, function (card) {
        card.face = Card.FACE_DOWN
        card.community = false
      })
      this.isShuffled = false
      this.isNew = true
      return this
    },


    /**
     * Shuffle/randomize the deck.
     */
    shuffle: function () {
      var cards, cardsLen, r
      this.reset()
      cards = this.cardsIn.slice()
      this.cardsIn = []
      while ((cardsLen = cards.length) > 0) {
        r = Math.floor(Math.random() * cardsLen)
        this.cardsIn.push(cards.splice(r, 1))
      }
      this.isShuffled = true
      this.isNew = false
      return this
    },


    /**
     * Deal next card in the deck.
     * @returns the card dealt.
     */
    deal: function () {
      var card = null
      if (this.cardsIn.length > 0) {
        card = this.cardsIn.pop()
        this.cardsOut.push(card)
        this.isNew = false
      }
      return card
    }
  }
}());




