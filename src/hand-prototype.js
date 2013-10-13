/**
 * Hand prototype methods.
 */
Hand.prototype = {

  /**
   * Remove all cards from the hand.
   */
  reset: function () {
    this.configLow()
    this.cards = []
    this.rank = 0
    this.cardsHigh = []
    this.cardsLow = []
    return this
  },

  /**
   * @param {string} card
   * @returns {boolean}
   */
  has: function (card) {
    var match = false
    util.each(this.cards, function (testCard, c) {
      if (testCard === card) {
        match = true
        return false
      }
    })
    return match
  },

  /**
   * Add a single card or an array of cards to the hand.
   * @param {string|array} arguments
   */
  add: function () {
    var args = Array.prototype.slice.call(arguments)
    util.each(args, function (card, i) {
      if (util.isString(card)) {
        if (!this.has(card)) {
          this.cards[this.cards.length] = card
          this.updateRank()
        }
      } else if (util.isArray(card)) {
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
    return util.has(this.cards, index) ? this.cards[index] : null
  },

  /**
   * Set the card at a specific index.
   */
  set: function (index, card) {
    index = parseInt(index, 10)
    if (util.isNumber(index)) {
      index = Math.max(0, Math.min(this.cards.length, index))
      this.cards[index] = card
      this.updateRank()
    }
    return this
  },


  /**
   * Find the best hand and update the cached rank values.
   */
  updateRank: function () {
    var cards
    if (this.cards.length >= 5) {
      cards = this.sortedCardsCopy()
      if (this.options.high) {
        this.updateHigh(cards)
      }
      if (this.options.low) {
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
   * Find the best high hand and update rank.
   */
  updateHigh: function (cards) {
    var result = null
    this.rank = 0
    cards = cards || this.sortedCardsCopy()

    if (cards.length >= 5) {

      // Test first for a flush, since that continues directly with
      // a test for a straight and royal flush.
      if (result = Hand.findFlush({ cards: cards, sorted: true, all: true })) {
        // Hand is at least a flush.
        this.rank = Hand.FLUSH
        this.cardsHigh = result.cards

        result = Hand.findStraightFlush({
          cards: this.cardsHigh,
          sorted: true,
          flush: true,
          acesAreLow: this.acesAreLow
        })
        if (result) {
          // Hand is straight or royal flush. Exit since hand cannot be higher.
          this.rank = result.royalFlush ? Hand.ROYAL_FLUSH : Hand.STRAIGHT_FLUSH
          this.cardsHigh = result.cards
          return
        }
      }

      // Find straights.
      if (this.rank < Hand.STRAIGHT) {
        result = Hand.findStraight({
          cards: cards,
          sorted: true,
          acesAreLow: this.acesAreLow
        })
        if (result) {
          this.rank = Hand.STRAIGHT
          this.cardsHigh = result.cards
        }
      }

      // Next find sets of cards of the same rank, since 4 of a kind
      // is the next hand not yet found.
      if (result = Hand.findSets({ cards: cards, sorted: true })) {
        if (result.type > this.rank) {
          this.rank = result.type
          switch (this.rank) {
            case Hand.FOUR_OF_A_KIND:
              this.cardsHigh = result.sets[0].concat(result.kickers)
              break
            case Hand.FULL_HOUSE:
              this.cardsHigh = result.sets[0].concat(result.sets[1])
              break
            case Hand.THREE_OF_A_KIND:
              this.cardsHigh = result.sets[0].concat(result.kickers)
              break
            case Hand.TWO_PAIR:
              this.cardsHigh = result.sets[0].concat(result.sets[1], result.kickers)
              break
            case Hand.ONE_PAIR:
              this.cardsHigh = result.sets[0].concat(result.kickers)
              break
            default:
              this.cardsHigh = [].concat(result.kickers)
              break
          }
        }

      } else {
        if (this.rank < Hand.HIGH_CARD) {
          // Best 5-card hand is a mere high card.
          this.rank = Hand.HIGH_CARD
          this.cardsHigh = cards.slice(0, 5)
        }
      }

    } else {
      this.cardsHigh = []
    }
  },


  /**
   * Find the best low hand and update rankLow.
   */
  updateLow: function (cards) {
    var result = null,
        c,
        n,
        tmpLow

    this.rankLow = 0
    cards = cards ? cards.slice() : this.sortedCardsCopy()

    if (this.cards.length >= 5) {
      // acesAreLow: true,
      // ignoreStraights: true,
      // ignoreFlushes: true

      // Shift aces to end (ie, count as < 2).
      if (this.acesAreLow) {
        if (Hand.rank(cards[0]) === 'A') {
          cards.push(cards.shift())
        }
      }

      tmpLow = []
      n = 0
      for (c = cards.length - 1; c >= 0; c--) {
        if (n === 0 || (Hand.rank(tmpLow[n - 1]) !== Hand.rank(cards[c]))) {
          tmpLow[n++] = cards[c]

          if (tmpLow.length === 5) {
            if (!this.ignoreFlushes && Hand.findFlush(tmpLow)) {
              tmpLow = tmpLow.slice(0, 4)
              n = 4
            } else if (!this.ignoreStraights && Hand.findStraight(tmpLow)) {
              tmpLow = tmpLow.slice(0, 4)
              n = 4
            } else {
              this.cardsLow = tmpLow
              break
            }
          }
        }
      }

    } else {
      this.cardsLow = []
    }
  },


  /**
   * Compares this hand's highest hand to another hand's highest hand.
   * @param {Hand} hand
   * @returns -1, 0, or 1 (for sorting)
   */
  compareHighest: function (hand) {
    var c, cmpr
    if (this.rank > hand.rank) {
      return -1
    } else if (this.rank < hand.rank) {
      return 1
    } else {
      if (this.cardsHigh.length && hand.cardsHigh.length) {
        for (c = 0; c < 5; c++) {
          cmpr = Hand.compareCardsByRank(this.cardsHigh[c], hand.cardsHigh[c])
          if (cmpr !== 0) {
            return cmpr
          }
        }
      }
    }
    return 0
  },


  /**
   * Compare this hand's lowest hand to another hand's lowest hand.
   * @param {Hand} hand
   * @returns -1, 0, or 1 (for sorting)
   */
  compareLowest: function (hand) {
    var cardsLowLen = this.cardsLow.length,
        handLowLen = hand.cardsLow.length,
        c,
        crank,
        hrank
    if (cardsLowLen < 5 && handLowLen < 5) {
      return 0
    } else if (cardsLowLen < 5 && handLowLen >= 5) {
      return 1
    } else if (cardsLowLen >= 5 && handLowLen < 5) {
      return -1
    } else {
      for (c = 4; c >= 0; c--) {
        crank = Hand.RANKS.indexOf(Hand.rank(this.cardsLow[c]))
        hrank = Hand.RANKS.indexOf(Hand.rank(hand.cardsLow[c]))
        if (crank < hrank) {
          return 1
        } else if (crank > hrank) {
          return -1
        }
      }
    }
    return 0
  },



  /**
   * Configures settings for various lowball options.
   * Called by reset().
   */
  configLow: function () {
    if (this.options.low === true) {
      this.options.low = Hand.ACE_TO_FIVE_LOW
    }
    switch (this.options.low) {
      case Hand.ACE_TO_FIVE_LOW:
        this.acesAreLow = true
        this.ignoreStraights = true
        this.ignoreFlushes = true
        break
      case Hand.ACE_TO_SIX_LOW:
        this.acesAreLow = true
        this.ignoreStraights = false
        this.ignoreFlushes = false
        break
      case Hand.DEUCE_TO_SEVEN_LOW:
        this.acesAreLow = false
        this.ignoreStraights = false
        this.ignoreFlushes = false
        break
      case Hand.DEUCE_TO_SIX_LOW:
        this.acesAreLow = false
        this.ignoreStraights = true
        this.ignoreFlushes = true
        break
      default:
        this.acesAreLow = true
        this.ignoreStraights = true
        this.ignoreFlushes = true
        this.options.low = 0
        break
    }
  }
}




