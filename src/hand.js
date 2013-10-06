/**
 * Poker.Hand is a player's hand of poker cards,
 * including the hand's value and hand comparisons.
 */
;(function () {
  'use strict'


  // If a Hand is not instantiated with an id,
  // one will be created for it.
  var uid = (function () {
    var u = 0
    return function () {
      return u++
    }
  }()),


  defaults = {
    isHigh: true,
    isLow: false
  }



  /**
   * @constructor
   * options:
   *   id = defaults to uid()
   *   isHigh = whether the hand checks "high" values; default true
   *   isLow = whether the hand checks "low" values; default false
   */
  Hand = function (options) {
    if (!(this instanceof Hand)) {
      return new Hand(id)
    }
    this.options = _.extend({ id: uid() }, defaults, options)
    this.reset()
  }



  // @constants correspond with indices in lingo[lang].cards array
  // or Poker.lingo([lang]).cards array
  Hand.ROYAL_FLUSH     = 10
  Hand.STRAIGHT_FLUSH  = 9
  Hand.FOUR_OF_A_KIND  = 8
  Hand.FULL_HOUSE      = 7
  Hand.FLUSH           = 6
  Hand.STRAIGHT        = 5
  Hand.THREE_OF_A_KIND = 4
  Hand.TWO_PAIR        = 3
  Hand.ONE_PAIR        = 2
  Hand.HIGH_CARD       = 1

  // @constants for comparisons between hands
  // They are "backwards" for purposes of array sorting
  // (better is closer to start of array).
  Hand.BETTER = -1
  Hand.WORSE = 1
  Hand.EVEN = 0

  // @constants used for sorting
  Hand.RANKS = '23456789TJQKAW'
  Hand.SUITS = 'CDHS'


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
            this.updateValue()
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
        this.updateValue()
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
     *
     */
    updateValue: function () {
      // pass
    }
  }
}());



