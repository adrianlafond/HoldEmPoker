/**
 * Poker.Hand is a player's hand of poker cards,
 * including the hand's value and hand comparisons.
 *
 * @constructor
 * options:
 *   {boolean=} high Whether the hand checks "high" values; default true.
 *   {boolean=} low Whether the hand checks "low" values; default true.
 *   {string=} lowType Type of low; options include Poker.ACE_TO_FIVE_LOW,
 *     Poker.ACE_TO_SIX_LOW, Poker.DEUCE_TO_SEVEN_LOW, Poker.DEUCE_TO_SIX_LOW.
 *     See https://en.wikipedia.org/wiki/Lowball_(poker)
 *   {array=} cards Array of Card instances to start the hand with.
 */
function Hand(options) {
  this.high = true;
  this.low = false;
  this.lowType = null;
  this.cards = [];
  this.rank = Hand.NOTHING;
  this.rankLow = Hand.NOTHING;
  this.cardsHigh = [];
  this.cardsLow = [];
  if (options && typeof options === 'object') {
    if (Array.isArray(options.cards)) {
      this.add(options.cards);
    }
    if (options.low) {
      this.configLow(options.lowType);
    }
  } else if (arguments.length) {
    var args = Array.prototype.slice.call(arguments);
    var isCard = function (card) {
      return typeof card === 'string' || card instanceof Card;
    };
    if (args.every(isCard)) {
      this.add.apply(this, args);
    }
  }
}


Hand.prototype = {
  /**
   * Tests whether a card value exists in the hand.
   * @param {string=} value Card value; e.g. 'AS' or '9C'.
   * @returns {boolean}
   */
  has: function (value) {
    return this.cards.some(function (card) {
      return card.value === value;
    });
  },

  /**
   * Adds a single card or an array of cards. Card values can either be a
   * string value (e.g., 'AS' or '9C') or a Card instance.
   * NEVER update this.cards directly; always use this method!
   * @param {string|array} cards
   */
  add: function () {
    var args = Array.prototype.slice.call(arguments);
    if (args.length === 1 && args[0] instanceof Card) {
      if (!this.has(args[0].value)) {
        this.cards.push(args[0]);
        this.updateRank();
      }
    } else {
      args.forEach(function (card) {
        if (card instanceof Card) {
          this.add(card);
        } else if (typeof card === 'string') {
          this.add(new Card(card));
        } else if (Array.isArray(card)) {
          card.forEach(this.add, this);
        } else if (!(card instanceof Card)) {
          throw new Error('Card value is an invalid type.');
        }
      }, this);
    }
    return this;
  },

  updateRank: function () {
    this.updateHigh();
    this.updateLow();
  },

  updateHigh: function () {
    if (this.high) {
      var result = Hand.rank(this.cards);
      this.rank = result.rank;
      this.cardsHigh = result.cards;
    } else {
      this.rank = Hand.NOTHING;
      this.cardsHigh = [];
    }
  },

  updateLow: function () {
    if (this.low) {
      var result = Hand.rankLow(this.cards);
      this.rankLow = result.rank;
      this.cardsLow = result.cards;
    } else {
      this.rankLow = Hand.NOTHING;
      this.cardsLow = [];
    }
  }
};
