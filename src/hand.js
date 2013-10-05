/**
 * Poker.Hand is a player's hand of poker cards,
 * including the hand's value and hand comparisons.
 */
;(function () {
  'use strict'


  Hand = function (id) {
    if (!(this instanceof Hand)) {
      return new Hand(id)
    }
    this.id = id
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
      this.rank = 0
      this.high = null
      this.low = null
      return this
    },

    /**
     * @param {string} card
     * @returns {boolean}
     */
    has: function (card) {
      return _.contains(this.cards, card)
    }
  }
}());



