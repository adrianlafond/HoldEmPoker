
;(function (root, factory) {
  /**
   * Module pattern from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.DISBRANDED = root.DISBRANDED || {}
    root.DISBRANDED.Poker = factory();
  }
}(this, function () {
  'use strict'




/**
 * Variables scoped to entire Poker module.
 */
var Poker,

    util,

    Card,
    Deck,
    Hand,
    Player,
    Bet,
    Round,
    SidePot,
    Pot,
    Table,
    Dealer,


    /**
     * Constants matched to lingo[lang].cards.
     */
    ROYAL_FLUSH     = 10,
    STRAIGHT_FLUSH  = 9,
    FOUR_OF_A_KIND  = 8,
    FULL_HOUSE      = 7,
    FLUSH           = 6,
    STRAIGHT        = 5,
    THREE_OF_A_KIND = 4,
    TWO_PAIR        = 3,
    ONE_PAIR        = 2,
    HIGH_CARD       = 1,


    /**
     * Constants matched to lingo[lang].low.
     */
    ACE_TO_FIVE_LOW    = 1,
    ACE_TO_SIX_LOW     = 2,
    DEUCE_TO_SEVEN_LOW = 3,
    DEUCE_TO_SIX_LOW   = 4,



    /**
     * Cosntants matched lingo[lang].card.
     */
    FACE_DOWN  = 0,
    FACE_UP    = 1,
    COMMUNITY  = 2,


    /**
     * Constants that correspond with lingo[lang].action.
     */
    FOLD   = 1,
    BET    = 2,
    CALL   = 3,
    RAISE  = 4,


    /**
     * Constants matched to lingo[lang].limit.
     */
    FIXED_LIMIT     = 0,
    SPREAD_LIMIT    = 1,
    POT_LIMIT       = 2,
    NO_LIMIT        = 3,
    CAP_LIMIT       = 4,


    /**
     * Constants matched to lingo[lang].game.
     */
    SHUFFLE           = 0,
    BURN              = 1,
    DEAL              = 2,
    BETTING_ROUND     = 3,
    ANTE              = 4,
    BLIND             = 5,
    SMALL_BLIND       = 6,
    BIG_BLIND         = 7,
    BIG_BET           = 8,

    BETTER  = -1,
    WORSE   = 1,
    EVEN    = 0





/**
 *
 */
;(function () {
  'use strict'

  function isNull(obj) {
    return obj === null
  }

  function isUndefined(obj) {
    return obj === undefined
  }

  function isNada(obj) {
    return isUndefined(obj) || isNull(obj)
  }

  function isBoolean(obj) {
    return obj === true || obj === false
  }

  function isString(obj) {
    return Object.prototype.toString.call(obj) === '[object String]'
  }

  function isNumber(obj) {
    return !isNaN(obj) && Object.prototype.toString.call(obj) === '[object Number]'
  }

  function isInteger(obj) {
    return isNumber(obj) && parseFloat(obj) === parseInt(obj, 10)
  }

  function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]'
  }

  function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }

  function isObject(obj) {
    return obj === Object(obj) && Object.prototype.toString.call(obj) === '[object Object]'
  }


  /**
   * Extends all arguments (which must be objects) into one object.
   * Last arguments overwrite first arguments.
   */
  function extend() {
    var a = 1,
        alen = arguments.length,
        obj,
        key,
        rtnObj = arguments[0]
    for (; a < alen; a++) {
      obj = arguments[a]
      for (key in obj) {
        rtnObj[key] = obj[key]
      }
    }
    return rtnObj
  }


  function clone(obj) {
    return isArray(obj) ? obj.slice() : extend({}, obj)
  }


  function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
  }


  function each(obj, iterator, context) {
    var i, len
    if (obj) {
      if (obj.forEach) {
        obj.forEach(iterator, context)
      } else if (obj.length === parseFloat(obj.length)) {
        for (i = 0, len = obj.length; i < len; i++) {
          if (iterator.call(context, obj[i], i) === false) {
            return
          }
        }
      } else {
        for (i in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, i)) {
            if (iterator.call(context, obj[i], i) === false) {
              return
            }
          }
        }
      }
    }
  }


  function times(repeat, iterator, context) {
    for (var i = 0; i < repeat; i++) {
      if (iterator.call(context, i) === false) {
        return
      }
    }
  }


  util = (function () {
    return {
      isNull: isNull,
      isUndefined: isUndefined,
      isNada: isNada,
      isBoolean: isBoolean,
      isNumber: isNumber,
      isInteger: isInteger,
      isString: isString,
      isFunction: isFunction,
      isArray: isArray,
      isObject: isObject,
      extend: extend,
      clone: clone,
      has: has,
      each: each,
      times: times
    }
  }());
}());
/**
 * Poker.Card
 */
;(function () {
  'use strict'


  /**
   * @constructor
   */
  Card = function (options) {
    this.value = options.value
    this.rank = this.value.charAt(0)
    this.suit = this.value.charAt(1)
    this.face = (options.face === FACE_UP) ? FACE_UP : FACE_DOWN
    this.community = false
  }

}());




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
      return 'hand-' + u++
    }
  }()),


  defaults = {
    high: true,
    low: false
  }



  /**
   * @constructor
   * options:
   *   id = defaults to uid()
   *   high = whether the hand checks "high" values; default true
   *   low = whether the hand checks "low" values; default false
   *
   * Other options for low: Hand.ACE_TO_FIVE_LOW, Hand.ACE_TO_SIX_LOW,
   * Hand.DEUCE_TO_SEVEN_LOW, Hand.DEUCE_TO_SIX_LOW.
   * See https://en.wikipedia.org/wiki/Lowball_(poker)
   *
   * If any options are updated after instantiation, reset() should be called.
   */
  Hand = function (options) {
    this.options = util.extend({ id: uid() }, defaults, options || {})
    this.reset()
    if (this.options.cards) {
      this.add(this.options.cards)
      delete this.options.cards
    }
  }
}());



// @constants used for sorting
// Ranks are "backwards" because higher ranks have
// lower indices in sorted arrays.
Hand.RANKS = 'WAKQJT98765432'
Hand.SUITS = 'SHDC'




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
        this.rank = FLUSH
        this.cardsHigh = result.cards

        result = Hand.findStraightFlush({
          cards: this.cardsHigh,
          sorted: true,
          flush: true,
          acesAreLow: this.acesAreLow
        })
        if (result) {
          // Hand is straight or royal flush. Exit since hand cannot be higher.
          this.rank = result.royalFlush ? ROYAL_FLUSH : STRAIGHT_FLUSH
          this.cardsHigh = result.cards
          return
        }
      }

      // Find straights.
      if (this.rank < STRAIGHT) {
        result = Hand.findStraight({
          cards: cards,
          sorted: true,
          acesAreLow: this.acesAreLow
        })
        if (result) {
          this.rank = STRAIGHT
          this.cardsHigh = result.cards
        }
      }

      // Next find sets of cards of the same rank, since 4 of a kind
      // is the next hand not yet found.
      if (result = Hand.findSets({ cards: cards, sorted: true })) {
        if (result.type > this.rank) {
          this.rank = result.type
          switch (this.rank) {
            case FOUR_OF_A_KIND:
              this.cardsHigh = result.sets[0].concat(result.kickers)
              break
            case FULL_HOUSE:
              this.cardsHigh = result.sets[0].concat(result.sets[1])
              break
            case THREE_OF_A_KIND:
              this.cardsHigh = result.sets[0].concat(result.kickers)
              break
            case TWO_PAIR:
              this.cardsHigh = result.sets[0].concat(result.sets[1], result.kickers)
              break
            case ONE_PAIR:
              this.cardsHigh = result.sets[0].concat(result.kickers)
              break
            default:
              this.cardsHigh = [].concat(result.kickers)
              break
          }
        }

      } else {
        if (this.rank < HIGH_CARD) {
          // Best 5-card hand is a mere high card.
          this.rank = HIGH_CARD
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
      this.options.low = ACE_TO_FIVE_LOW
    }
    switch (this.options.low) {
      case ACE_TO_FIVE_LOW:
        this.acesAreLow = true
        this.ignoreStraights = true
        this.ignoreFlushes = true
        break
      case ACE_TO_SIX_LOW:
        this.acesAreLow = true
        this.ignoreStraights = false
        this.ignoreFlushes = false
        break
      case DEUCE_TO_SEVEN_LOW:
        this.acesAreLow = false
        this.ignoreStraights = false
        this.ignoreFlushes = false
        break
      case DEUCE_TO_SIX_LOW:
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





/**
 * Static methods attached to Poker.Hand.
 */

/**
 * Find a flush in an array of cards.
 * Options for arguments:
 *   @param {array} of at least 5 cards.
 *   @returns highest flush found.
 * or:
 *   @params {object} with properties:
 *     {array} cards Mandatory; at least 5 cards.
 *     {boolean} sorted Optional; whether cards are already sorted highest
 *       to lowest; default false.
 *     {boolean} low Optional; finds lowest flush; default false.
 *     {boolean} all Optional; returns all flush hands (more than 5), for
 *       use in teting for a straight flush; default false
 *   @returns highest flush found unless options.low is true.
 */
Hand.findFlush = function () {
  var param = (arguments.length > 0) ? arguments[0] : null,
      cards = null,
      sorted = false,
      low = false,
      all = false,
      flush = null,
      s, suit,
      n,
      tmpCards,
      tmpCardsLen

  // Interpret arguments.
  if (util.isArray(param)) {
    cards = param
  } else if (util.isObject(param)) {
    cards = param.cards
    sorted = param.sorted === true
    low = param.low === true
    all = param.all === true
  }

  // Make sure cards array is valid.
  if (!util.isArray(cards) || cards.length < 5) {
    return null
  }

  cards = cards.slice(0)
  if (!sorted) {
    Hand.sortByRank(cards)
  }

  // Loop through the suits to match them to flushes.
  for (s = 0; s < 4; s++) {
    suit = Hand.SUITS.charAt(s)
    tmpCards = []
    n = 0

    // Find the subset of cards with the current suit.
    util.each(cards, function (card, c) {
      if (Hand.suit(card) === suit) {
        tmpCards[n++] = card
      }
    })

    // If the subset has at least 5 cards, it is a flush.
    tmpCardsLen = tmpCards.length
    if (tmpCardsLen >= 5) {

      // If no other flush has yet been found, this one will do.
      // This will also get the job done 99.999% of the time.
      if (flush === null) {
        flush = low
          ? tmpCards.slice(tmpCardsLen - 5)
          : tmpCards.slice(0, all ? tmpCardsLen : 5)

      // Compare this flush to a flush that was already found,
      // in the unlikely event that a hand contains >= 10 cards
      // and multiple flushes.
      } else {
        tmpCards = low
          ? tmpCards.slice(tmpCards.length - 5)
          : tmpCards.slice(0, all ? tmpCardsLen : 5)
        if (low) {
          flush = Hand.getBestCardsByRank({ low: true, cards: [tmpCards, flush] })
        } else {
          flush = Hand.getBestCardsByRank(tmpCards, flush)
        }
      }
    }
  }

  return flush ? { cards: flush } : null
}



/**
 * Find a straight flush in an array of cards.
 * Options for arguments:
 *   @param {array} of at least 5 cards.
 * or:
 *   @params {object} with properties:
 *     {array} cards Mandatory; at least 5 cards.
 *     {boolean} flush Optional; if true will skip call to findFlush().
 *     {boolean} sorted Optional; whether cards are already sorted highest
 *       to lowest; default false.
 *     {boolean} low Optional; finds lowest straight flush; default false.
 *     {boolean} acesAreLow Optional; default true.
 * @returns { cards: [best flush found] }
 */
Hand.findStraightFlush = function () {
  var param = (arguments.length > 0) ? arguments[0] : null,
      cards,
      flush = false,
      sorted = false,
      low = false,
      acesAreLow = true,
      result

  // Interpret arguments.
  if (util.isArray(param)) {
    cards = param
  } else if (util.isObject(param)) {
    cards = param.cards
    flush = param.flush === true
    sorted = param.sorted === true
    low = param.low === true
    acesAreLow = !(param.acesAreLow === false)
  }

  // Make sure cards array is valid.
  if (!util.isArray(cards) || cards.length < 5) {
    return null
  }

  cards = cards.slice(0)
  if (!sorted) {
    Hand.sortByRank(cards)
  }

  // Make sure cards are a flush.
  if (!flush) {
    result = Hand.findFlush({
      cards: cards,
      sorted: sorted,
      low: low,
      acesAreLow: acesAreLow
    })
    if (result) {
      cards = result.cards
    } else {
      return null
    }
  }

  result = Hand.findStraight({
    cards: cards,
    sorted: sorted,
    low: low,
    acesAreLow: acesAreLow
  })
  if (result) {
    result.royalFlush = Hand.rank(result.cards[0]) === 'A'
    return result
  }
  return null
}


/**
 * Find a straight in an array of cards.
 * Options for arguments:
 *   @param {array} of at least 5 cards.
 * or:
 *   @params {object} with properties:
 *     {array} cards Mandatory; at least 5 cards.
 *     {boolean} sorted Optional; whether cards are already sorted highest
 *       to lowest; default false.
 *     {boolean} low Optional; finds lowest straight; default false.
 *     {boolean} acesAreLow Optional; default true.
 * @returns { cards: [best straight found] }
 */
Hand.findStraight = function () {
  var param = (arguments.length > 0) ? arguments[0] : null,
      cards,
      sorted = false,
      low = false,
      acesAreLow = true,
      ace = null,
      tmpStr8 = null,
      str8 = null,
      r = -1,
      tmpIndex,
      ranks

  // Interpret arguments.
  if (util.isArray(param)) {
    cards = param
  } else if (util.isObject(param)) {
    cards = param.cards
    sorted = param.sorted === true
    low = param.low === true
    acesAreLow = !(param.acesAreLow === false)
  }

  // Make sure cards array is valid.
  if (!util.isArray(cards) || cards.length < 5) {
    return null
  }

  cards = cards.slice()
  if (!sorted) {
    Hand.sortByRank(cards)
  }

  util.each(cards, function (card, c) {
    if (r === -1 || tmpStr8 === null) {
      // No straight cards yet, so start a straight with current card.
      r = Hand.RANKS.indexOf(Hand.rank(card))
      tmpStr8 = [card]

    } else {
      // A straight is in the works and it must be determined
      // if the current loop card can be added to it.
      tmpIndex = Hand.RANKS.indexOf(Hand.rank(card))

      if (tmpIndex === r) {
        // If rank is same as last card in the straight, skip.

      } else if (tmpIndex === r + 1) {
        // If rank is next after the last card in the straight, add it.
        r = tmpIndex
        tmpStr8.push(card)

        // Test fot 5-4-3-2-A straight.
        if (acesAreLow && tmpStr8.length === 4 && Hand.rank(tmpStr8[0]) === '5') {
          ;(function () {
            var aceIndex = Hand.RANKS.indexOf('A'),
                cardIndex
            util.each(cards, function (cardA, i) {
              cardIndex = Hand.RANKS.indexOf(Hand.rank(cardA))
              if (cardIndex === aceIndex) {
                tmpStr8[4] = cardA
                return false
              } else if (cardIndex > aceIndex) {
                return false
              }
            }, this)
          }());
        }

      } else {
        // Current loop card does not fit onto the straight.
        // Test if straight is complete.
        if (tmpStr8.length >= 5) {
          str8 = tmpStr8.slice(0, 5)
          tmpStr8 = null
          if (!low) {
            return false
          }
        }

        if (cards.length - c < 4) {
          return false
        }
        r = tmpIndex
        tmpStr8 = [card]
      }
    }
  }, this)

  if (tmpStr8 && tmpStr8.length >= 5) {
    if (str8) {
      str8 = Hand.getBestCardsByRank({
        low: low,
        cards: [str8, tmpStr8]
      })
    } else {
      str8 = tmpStr8
    }
  }
  if (str8) {
    if (low) {
      return { cards: str8.slice(str8.length - 5) }
    }
    return { cards: str8.slice(0, 5) }
  }
  return null
}



/**
 * Find sets of cards of the same rank in an array of cards.
 * Options for arguments:
 *   @param {array} of at least 5 cards.
 * or:
 *   @params {object} with properties:
 *     {array} cards Mandatory; at least 5 cards.
 *     {boolean} sorted Optional; whether cards are already sorted highest
 *       to lowest; default false.
 * @returns { sets: [], kickers: [], type: [index of Hand.RANKS] }
 */
Hand.findSets = function () {
  var param = (arguments.length > 0) ? arguments[0] : null,
      cards,
      sorted = false,
      sets,
      setsLen,
      finalSets,
      setsCardsLen = 0,
      kickers,
      type

  // Interpret arguments.
  if (util.isArray(param)) {
    cards = param
  } else if (util.isObject(param)) {
    cards = param.cards
    sorted = param.sorted === true
  }

  // Make sure cards array is valid.
  if (!util.isArray(cards) || cards.length < 5) {
    return null
  }

  cards = cards.slice()
  if (!sorted) {
    Hand.sortByRank(cards)
  }

  sets = (function (cards) {
    var sets = [],
        r = 1,
        set,
        c,
        clen = cards.length
    for (; r < 14; r++) {
      set = []
      for (c = 0; c < clen; c++) {
        if (Hand.RANKS.indexOf(Hand.rank(cards[c])) === r) {
          set.push(cards[c])
          if (c === clen - 1) {
            sets.push(set)
          }
        } else if (set.length >= 1) {
          sets.push(set)
          break
        }
      }
    }
    return sets
  }(cards))
  finalSets = []
  kickers = []

  // Sort sets by set size.
  sets.sort(function (a, b) {
    return Math.max(-1, Math.min(1, b.length - a.length))
  })

  // Separate the sets that matter from those that don't.
  ;(function () {
    var c = 0,
        setsLen = sets.length,
        handLen = 0,
        sliceLen,
        slen
    util.each(sets, function (set, c) {
      if (handLen < 4 && (slen = set.length) >= 2) {
        sliceLen = Math.min(slen, 5 - handLen)
        finalSets.push(set.slice(0, sliceLen))
        setsCardsLen += sliceLen
        if (sliceLen < slen - 1) {
          kickers.push(set.slice(sliceLen))
        }
        handLen += slen
      } else {
        kickers = kickers.length ? kickers.concat(set) : set
        handLen += set.length
      }
      handLen = Math.min(5, handLen)
    }, this)
  }());


  // Sort the kickers.
  kickers.sort(Hand.compareCardsByRank)

  // Determine type
  switch (sets[0].length) {
    case 4:
      type = FOUR_OF_A_KIND
      break
    case 3:
      type = (finalSets.length === 2) ? FULL_HOUSE : THREE_OF_A_KIND
      break
    case 2:
      type = (finalSets.length === 2) ? TWO_PAIR : ONE_PAIR
      break
    default:
      type = HIGH_CARD
  }

  if (finalSets.length) {
    return {
      sets: finalSets,
      kickers: kickers.slice(0, 5 - setsCardsLen),
      type: type
    }
  }
  return null
}




/**
 * Compares array of arrays of cards and returns the array of cards
 * with the best hand by card rank. The arrays must already be sorted.
 * Can be called either by passing the arrays as separate arguments,
 * or by passing an object with properties:
 *   low: {boolean} default false
 *   cards: {array} array of arrays of cards
 */
Hand.getBestCardsByRank = function () {
  var array = arguments[0].hasOwnProperty('cards')
        ? arguments[0].cards
        : Array.prototype.slice.call(arguments),
      low = arguments[0].hasOwnProperty('low')
        ? (arguments[0].low === true)
        : false,
      cmprFn = low ? Hand.isLower : Hand.isHigher,
      bestArray

  util.each(array, function (cards, a) {
    var tmpArray
    if (a === 0) {
      bestArray = cards.slice()
    } else {
      if (low) {
        tmpArray = cards.slice(Math.max(0, cards.length - 5))
      } else {
        tmpArray = cards.slice()
      }
      util.each(tmpArray, function (card, c) {
        if (cmprFn(card, bestArray[c])) {
          bestArray = tmpArray
          return false
        }
      })
    }
  })
  return bestArray
}



/**
 * Sorts an array of cards by rank.
 */
Hand.sortByRank = function (cards) {
  cards.sort(Hand.compareCardsByRank)
}

/**
 * Returns true if the rank of card a is higher than that of b.
 */
Hand.isHigher = function (a, b) {
  return Hand.compareCardsByRank(a, b) < 0
}

/**
 * Returns true if the rank of card a is lower than that of b.
 */
Hand.isLower = function (a, b) {
  return Hand.compareCardsByRank(a, b) > 0
}


/**
 * For use with Array.sort().
 */
Hand.compareCardsByRank = function (a, b) {
  var valA = Hand.RANKS.indexOf(Hand.rank(a)),
      valB = Hand.RANKS.indexOf(Hand.rank(b))
  return valA - valB
}

/**
 * For use with Array.sort().
 */
Hand.compareCardsBySuit = function (a, b) {
  var valA = Hand.SUITS.indexOf(Hand.suit(a)),
      valB = Hand.SUITS.indexOf(Hand.suit(b))
  return valA - valB
}

/**
 * For use with Array.sort().
 * Sorts by the length of sets of cards.
 */
Hand.compareSetSize = function (a, b) {
  var valA = a.length,
      valB = b.length
  return valB - valA
}

/**
 * Returns the rank of @param card.
 */
Hand.rank = function (card) {
  return card.charAt(0)
}

/**
 * Returns the suit of @param card.
 */
Hand.suit = function (card) {
  return card.charAt(1)
}






/**
 * Poker.Player
 */
;(function () {
  'use strict'

  // If a PLayer is not instantiated with an id,
  // one will be created for it.
  var uid = (function () {
    var u = 0
    return function () {
      return 'player-' + u++
    }
  }()),

  defaults = {
    id: null,
    chips: 0
  }


  /**
   * @constructor
   */
  Player = function (options) {
    this.options = util.extend({}, defaults, options || {})
    this.id = this.options.id || uid()
    this.chips = this.options.chips
    this.folded = false
    this.hand = new Hand
    this.cards = []
  }

  Player.prototype = {

    /**
     * @param {Card}
     */
    addCard: function (card) {
      this.hand.add(card.value)
      this.cards.push(card)
    },

    /**
     *
     */
    removeCards: function () {
      this.hand.reset()
      this.cards = []
    }
  }

}());




;(function () {
  'use strict'

  /**
   * Validates calls/bets made into the pot.
   */
  Bet = function (player, chips, allin) {
    if (!(this instanceof Bet)) {
      return new Bet(player, chips, allin)
    }
    if (!util.isString(player)) {
      throw 'Bet @param player not valid.'
    }
    if (!util.isNumber(chips)) {
      throw 'Bet @param chips not valid.'
    }
    this.player = player
    this.chips = chips
    this.allin = allin === true
    this.folded = false
  }
}());





;(function () {
  'use strict'


  /**
   * A round of betting, before bets are added to the pot.
   */
  Round = function () {
    this.reset()
  }


  Round.prototype = {

    /**
     * Bet/call/add chips to the current betting round.
     * Possible arguments formats:
     * @param {Bet}
     *   or
     * @param {string} player The ID of the player making bet/call.
     * @param {number} chips The amount of the bet/call.
     * @param {boolean} allin Optional; necessary for determining when
     *   to create new side pots; default false.
     */
    bet: function () {
      var existBet,
          bet = (arguments[0] instanceof Bet)
            ? arguments[0]
            : new Bet(arguments[0], arguments[1], arguments[2])
      if (existBet = this.bets[bet.player]) {
        existBet.chips += bet.chips
        existBet.allin = !!!existBet.allin && bet.allin === true
        existBet.folded = !!!existBet.folded && bet.folded === true
      } else {
        this.bets[bet.player] = bet
      }
    },


    /**
     * Fold a player who has already bet, so that allin vs fold
     * can be more easily differentiated.
     */
    fold: function (player) {
      var bet = this.chipsFor(player)
        || (this.bets[player] = new Bet(player, 0, false))
      bet.folded = true
      bet.allin = false
    },



    /**
     * If for some reason an all-in bet was made but the Bet
     * was not marked as all-in, do it here.
     */
    allin: function (player) {
      var bet = this.betFor(player)
        || (this.bets[player] = new Bet(player, 0, false))
      bet.folded = false
      bet.allin = true
    },


    /**
     * Return the accumulated chips bet by player with id @param player.
     */
    chipsFor: function (player) {
      return (player in this.bets) ? this.bets[player].chips : null
    },


    /**
     * Return the total chips bet in this round.
     */
    chipsTotal: function () {
      var n = 0
      util.each(this.bets, function (bet, player) {
        n += bet.chips
      }, this)
      return n
    },


    /**
     * Reset all values.
     */
    reset: function () {
      this.bets = {}
    }
  }
}());




;(function () {
  'use strict'

  /**
   * A pot is actually a collection of side pots.
   */
  SidePot = function () {
    this.bets = {}
  }

  SidePot.prototype = {

    /**
     * @param {string} player The id of a Player.
     * @param {chips}
     */
    add: function (player, chips) {
      this.bets[player] = chips
    },

    total: function () {
      var n = 0
      util.each(this.bets, function (chips) {
        n += chips
      })
      return n
    }
  }
}());





/**
 * Poker.Pot
 */
;(function () {
  'use strict'


  // var defaults = {}


  /**
   * @constructor
   */
  Pot = function (options) {
    // this.options = util.extend({}, defaults, options || {})
    this.reset()
  }

  Pot.prototype = {

    /**
     * Return a pot. If no arguments, returns current pot.
     * If first argument is the index number of a specific pot,
     * returns that pot.
     */
    pot: function () {
      var argLen = arguments.length,
          potsLen = this.pots.length
      if (potsLen > 0) {
        if (argLen === 0) {
          return this.pots[potsLen - 1]
        } else if (util.isInteger(arguments[0])) {
          if (potsLen <= arguments[0]) {
            return this.pots[arguments[0]]
          }
        }
      }
      return null
    },


    /**
     * Return current/last pot and remove it from the pots array.
     * example: while (sidepot = pot.pop()) { ... }
     * Shorthand for dividing winning at the end of a hand;
     * obviously, don't call this method during a hand!
     */
    pop: function () {
      return (this.pots.length > 0) ? this.pots.pop() : null
    },


    /**
     * Add a round's worth of Bet objects.
     * @param {Round} round
     */
    add: function (round) {
      var bets = [],
          n = 0,
          sidepots = [{ pot: this.pot(), call: 0 }]

      // Form an array, sorted ascending by chips.
      util.each(round.bets, function (bet, id) {
        bets[n++] = bet
      })
      bets.sort(function (a, b) {
        return a.chips - b.chips
      })

      // Loop through the array, putting chips into current pot.
      // If a player is all-in, note it, so that if a player
      // bets more than the all-in, a new SidePot is created.
      n = 0
      util.each(bets, function (bet, b) {

        // Include player in pot only if he has contributed to it.
        if (bet.chips > 0) {

          // Add chips to side pots, subtracting chips from the bet
          // as it cascades up the side pots.
          util.each(sidepots, function (side, s) {
            if (side.call === 0) {
              side.call = bet.chips
            }
            side.pot.add(bet.player, side.call)
            bet.chips -= side.call
          })

          // If any chips are left in the bet, then add them to a new
          // side pot.
          if (bet.chips > 0) {
            n++
            sidepots[n] = {
              pot: new SidePot,
              call: bet.chips
            }
            sidepots[n].pot.add(bet.player, bet.chips)
            this.pots.push(sidepots[n].pot)
          }
        }
      }, this)
    },


    /**
     * Reset all. Empties side pots and creates a new empty main pot.
     * Each pot inside a Pot instance is an instance of a SidePot.
     */
    reset: function () {
      this.pots = [new SidePot]
    }
  }
}());





/**
 * Poker.Table
 */
;(function () {
  'use strict'


  var defaults = {
    seats: 5
  }


  /**
   * @constructor
   */
  Table = function (options) {
    this.options = util.extend({}, defaults, options || {})
    this.reset()
  }

  Table.prototype = {

    /**
     * Add a player to the table. Options:
     *   seat {number} Optional; will overwrite any player already at the
     *     index; if absent, player will be seated first available seat;
     *     if seat index does not exist, player will not be added.
     *   player {Player}
     */
    add: function (options) {
      var index,
          tmpIndex,
          player

      // Either add player or read options.
      if (options instanceof Player) {
        player = options
      } else {
        player = options.player
        if (options.hasOwnProperty('seat')) {
          tmpIndex = +options.seat
          if (util.isInteger(tmpIndex) && tmpIndex >= 0 && tmpIndex < this.options.seats) {
            index = tmpIndex
          } else {
            return this
          }
        }
      }

      // If player is already seated, unseat him.
     this.remove(player)

      // Find seat index if it has not already been set.
      if (index === undefined) {
        util.times(this.options.seats, function (i) {
          if (util.isNada(this.seats[i])) {
            index = i
            return false
          }
        }, this)
      }

      // Seat the player.
      if (index !== undefined) {
        this.remove(index)
        this.seats[index] = player
      }
      return this
    },


    /**
     * Remove a player from the table.
     * @param {string} id Remove the player with that id.
     * @param {number} id Remove the player at that seat index.
     * @param {Player} id Remove the player.
     */
    remove: function (id) {
      var index
      if (id instanceof Player) {
        id = id.id
      }
      if (util.isString(id)) {
        util.each(this.seats, function (player, i) {
          if (player && player.id === id) {
            index = i
            return false
          }
        })
      } else if (util.isInteger(id)) {
        if (this.seats[id]) {
          index = id
        }
      }
      if (index !== undefined) {
        this.seats[index] = null
        // fire player removed event
      }
      return this
    },


    /**
     * Return the player seated at @param index.
     */
    at: function (index) {
      return this.seats[index] || null
    },


    /**
     * Return the seat index for player with @param id.
     * Or return the seart index for @param {Player} id.
     * Returns -1 if not found.
     */
    indexOf: function (id) {
      var index = -1,
          id = (id instanceof Player) ? id.id : id
      util.each(this.seats, function (player, i) {
        if (player && player.id === id) {
          index = i
          return false
        }
      }, this)
      return index
    },

    /**
     * Returns the player with the dealer button.
     */
    button: function () {
      var n = this.options.seats
      while (n-- > 0) {
        if (this.seats[n]) {
          return this.seats[n]
        }
      }
      return null
    },

    /**
     * Push the button to next player, before the start of a new hand.
     */
    advance: function () {
      this.seats.unshift(this.seats.pop())
      return this
    },


    /**
     * Remove all players from the table.
     */
    reset: function () {
      this.seats = []
      util.times(this.options.seats, function (index) {
        this.seats[index] = null
      }, this)
      return this
    },
  }
}());





/**
 * Poker.Dealer controls gameplay.
 */
;(function () {
  'use strict'


  var defaults = {
    //
  }


  /**
   * @constructor
   */
  Dealer = function (options) {
    this.options = util.extend({}, defaults, options || {})
  }

  Dealer.prototype = {
    //
  }
}());





/**
 * The main Poker class and the returned API.
 */
;(function () {
  'use strict'


  var defaults = {

    // Number of raises allowed per round:
    maxRaises: 3,

    // Type of betting limit:
    limit: FIXED_LIMIT,

    // If high hand, low hand, or both wins the pot.
    high: true,
    low: false
  }


  /**
   * @constructor
   */
  Poker = function (options) {
    if (!(this instanceof Poker)) {
      return new Poker(options)
    }
    this.options = util.extend({}, defaults, options || {})
  }

  Poker.prototype = {
    //
  }
}());











/**
 * Constants matched to lingo[lang].cards.
 */
Poker.ROYAL_FLUSH     = ROYAL_FLUSH
Poker.STRAIGHT_FLUSH  = STRAIGHT_FLUSH
Poker.FOUR_OF_A_KIND  = FOUR_OF_A_KIND
Poker.FULL_HOUSE      = FULL_HOUSE
Poker.FLUSH           = FLUSH
Poker.STRAIGHT        = STRAIGHT
Poker.THREE_OF_A_KIND = THREE_OF_A_KIND
Poker.TWO_PAIR        = TWO_PAIR
Poker.ONE_PAIR        = ONE_PAIR
Poker.HIGH_CARD       = HIGH_CARD


/**
 * Constants matched to lingo[lang].low.
 */
Poker.ACE_TO_FIVE_LOW    = ACE_TO_FIVE_LOW
Poker.ACE_TO_SIX_LOW     = ACE_TO_SIX_LOW
Poker.DEUCE_TO_SEVEN_LOW = DEUCE_TO_SEVEN_LOW
Poker.DEUCE_TO_SIX_LOW   = DEUCE_TO_SIX_LOW


/**
 * Cosntants matched lingo[lang].card.
 */
Poker.FACE_DOWN  = FACE_DOWN
Poker.FACE_UP    = FACE_UP
Poker.COMMUNITY  = COMMUNITY


/**
 * Constants that correspond with lingo[lang].action.
 */
Poker.FOLD   = FOLD
Poker.BET    = BET
Poker.CALL   = CALL
Poker.RAISE  = RAISE


/**
 * Constants matched to lingo[lang].limit.
 */
Poker.FIXED_LIMIT     = FIXED_LIMIT
Poker.SPREAD_LIMIT    = SPREAD_LIMIT
Poker.POT_LIMIT       = POT_LIMIT
Poker.NO_LIMIT        = NO_LIMIT
Poker.CAP_LIMIT       = CAP_LIMIT


/**
 * Constants matched to lingo[lang].dealer.
 */
Poker.SHUFFLE         = SHUFFLE
Poker.BURN            = BURN
Poker.DEAL            = DEAL
Poker.BETTING_ROUND   = BETTING_ROUND
Poker.ANTE            = ANTE
Poker.BLIND           = BLIND
Poker.SMALL_BLIND     = SMALL_BLIND
Poker.BIG_BLIND       = BIG_BLIND
Poker.BIG_BET         = BIG_BET


/**
 * Constants for comparisons between hands.
 * They are "backwards" for purposes of array sorting
 * (better is closer to start of array).
 */
Poker.BETTER  = BETTER
Poker.WORSE   = WORSE
Poker.EVEN    = EVEN




/**
 * Static classes and properties made accessible
 * via the public Poker API.
 * USED ONLY FOR TESTING!!!
 */
Poker.Card      = Card
Poker.Deck      = Deck
Poker.Hand      = Hand
Poker.Player    = Player
Poker.Bet       = Bet
Poker.Round     = Round
Poker.SidePot   = SidePot
Poker.Pot       = Pot
Poker.Table     = Table
Poker.Dealer    = Dealer
Poker.util      = util












  return Poker
}));

