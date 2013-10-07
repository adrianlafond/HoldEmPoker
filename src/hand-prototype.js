/**
 * Hand prototype methods.
 */
Hand.prototype = {

  /**
   * Remove all cards from the hand.
   */
  reset: function () {
    this.cards = []
    this.rankHigh = 0
    this.rankLow = 0
    this.cardsHigh = []
    this.cardsLow = []
    return this
  },

  /**
   * @param {string} card
   * @returns {boolean}
   */
  has: function (card) {
    return _.contains(this.cards, card)
  },

  /**
   * Add a single card or an array of cards to the hand.
   * @param {string|array} arguments
   */
  add: function () {
    _.each(arguments, function (card, i) {
      if (_.isString(card)) {
        if (!this.has(card)) {
          this.cards[this.cards.length] = card
          this.updateRank()
        }
      } else if (_.isArray(card)) {
        this.add.apply(this, card)
      }
    }, this)
    return this
  },

  /**
   * @param {index}
   * @returns {string} card at index; null if index is out of range.
   */
  get: function (index) {
    return _.has(this.cards, index) ? this.cards[index] : null
  },

  /**
   * Set the card at a specific index.
   */
  set: function (index, card) {
    index = parseInt(index, 10)
    if (_.isNumber(index) && !_.isNaN(index)) {
      index = Math.max(0, Math.min(this.cards.length, index))
      this.cards[index] = card
      this.updateRank()
    }
    return this
  },


  /**
   * @param {string} type H,hi,high or L,low, etc. Case insensitive;
   *   just checks first character. Defaults to high.
   * @returns the (cached) index of the rank of the hand (range 0 - 10).
   * @see Hand constants above.
   * Equivalent to querying value of this.rankHigh or this.rankLow.
   */
  rank: function (type) {
    var low = typeof type === 'string'
      && type.length > 0
      && type.charAt(0).toUpperCase() === 'L'
    return low ? this.rankLow : this.rankHigh
  },


  /**
   * Find the best hand and update the cached rank values.
   */
  updateRank: function () {
    var cards
    if (this.cards.length >= 5) {
      cards = this.sortedCardsCopy()
      if (this.options.isHigh) {
        this.updateHigh(cards)
      }
      if (this.options.isLow) {
        this.updateLow(cards)
      }
    }
  },


  sortedCardsCopy: function () {
    var cards = this.cards.slice(0)
    Hand.sortByRank(cards)
    return cards
  },


  /**
   * Find the best high hand and update rankHigh.
   */
  updateHigh: function (cards) {
    var result = null
    this.rankHigh = 0
    cards = cards || this.sortedCardsCopy()

    if (cards.length >= 5) {
      if (result = Hand.findFlush({ cards: cards, sorted: true })) {
        this.rankHigh = Hand.FLUSH
        this.cardsHigh = result.cards

        result = Hand.findStraightFlush({
          cards: this.cardsHigh,
          sorted: true,
          flush: true
        })
        if (result) {
          this.rankHigh = result.royalFlush ? Hand.ROYAL_FLUSH : Hand.STRAIGHT_FLUSH
          this.cardsHigh = results.cards
        }
      }
    } else {
      this.cardsHigh = []
    }
  },


  /**
   * Find the best low hand and update rankLow.
   */
  updateLow: function () {
    var result = null
    this.rankLow = 0

    if (this.cards.length >= 5) {
      //
    } else {
      this.cardsLow = []
    }
  }
}




