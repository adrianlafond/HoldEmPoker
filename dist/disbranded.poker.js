/*
 * poker-game-engine v0.0.1
 * by Adrian Lafond / adrian [at] disbranded.com
 * last updated 2013-10-06
**/

;(function (root, factory) {
  /**
   * Module pattern from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['underscore'], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require('underscore'));
  } else {
    // Browser globals (root is window)
    root.DISBRANDED = root.DISBRANDED || {}
    root.DISBRANDED.Poker = factory(root._);
  }
}(this, function (_) {
  'use strict'




/**
 * Variables scoped to entire Poker module.
 */
var Poker,
    Deck,
    Hand,

    lingo




lingo = {

  en: {
    cards: [
      null,
      'High Card',
      'One Pair',
      'Two Pair',
      'Three of a Kind',
      'Straight',
      'Flush',
      'Full House',
      'Four of a Kind',
      'Straight Flush',
      'Royal Flush'
    ]
  }
}




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
      return this.cardsIn.slice(0)
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
      this.cardsIn = CARDS.slice(0)
      _.times(this.jokers, function (n) {
        this.cardsIn[SIZE + n] = 'W' + (n + 1)
      }, this)
      this.cardsOut = []
      this.isShuffled = false
      this.isNew = true
      return this
    },


    /**
     * Shuffle/randomize the deck.
     */
    shuffle: function () {
      this.reset()
      this.cardsIn = _.shuffle(this.cardsIn)
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




/**
 * The main Poker class and the returned API.
 */
Poker = function () {
  this.name = 'Poker'
}


Poker.prototype = {
  
}




/**
 * Static classes and properties made accessible
 * via the public Poker API.
 */
Poker.Deck = Deck
Poker.Hand = Hand


/**
 * @param {string} lang
 * @returns poker lingo for a particular language. Defaults to English.
 */
Poker.lingo = function (lang) {
  lang = lang || 'en'
  if (lingo.hasOwnProperty(lang)) {
    return {
      cards: _.clone(lingo[lang].cards)
    }
  }
  return null
}







  return Poker
}));

