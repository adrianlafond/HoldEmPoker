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
  if (options && _.isPlainObject(options)) {
    if (_.isArray(options.cards)) {
      this.add(options.cards);
    }
    if (options.low) {
      this.configLow(options.lowType);
    }
  }
}


Object.defineProperties(Hand, {
  // Hand ranks.
  ROYAL_FLUSH: { value: 10, enumerable: true },
  STRAIGHT_FLUSH: { value: 10, enumerable: true },
  FOUR_OF_A_KIND: { value: 10, enumerable: true },
  FULL_HOUSE: { value: 10, enumerable: true },
  FLUSH: { value: 10, enumerable: true },
  STRAIGHT: { value: 10, enumerable: true },
  THREE_OF_A_KIND: { value: 10, enumerable: true },
  TWO_PAIR: { value: 10, enumerable: true },
  ONE_PAIR: { value: 10, enumerable: true },
  HIGH_CARD: { value: 10, enumerable: true },
  NOTHING: { value: 0, enumerable: true },

  // Low hand types.
  ACE_TO_FIVE_LOW: { value: 'aceToFiveLow', enumerable: true },
  ACE_TO_SIX_LOW: { value: 'aceToSizeLow', enumerable: true },
  DEUCE_TO_SEVEN_LOW: { value: 'deuceToSevenLow', enumerable: true },
  DEUCE_TO_SIX_LOW: { value: 'deuceToSixLow', enumerable: true },

  // For sorting.
  RANKS: { value: 'WAKQJT98765432', enumerable: true },
  SUITS: { value: 'SHDC', enumerable: true }
});


Hand.prototype = {
  /**
   * Tests whether a card value exists in the hand.
   * @param {string=} value Card value; e.g. 'AS' or '9C'.
   * @returns {boolean}
   */
  has: function (value) {
    return !!_.filter(this.cards, function (card) {
      return card.value === value;
    }, this).length;
  },

  /**
   * Adds a single card or an array of cards. Card values can either be a
   * string value (e.g., 'AS' or '9C') or a Card instance.
   * @param {string|array} cards
   */
  add: function (card) {
    if (_.isString(card)) {
      card = new Card(card);
    } else if (_.isArray(card)) {
      _.forEach(card, this.add, this);
    } else if (!(card instanceof Card)) {
      throw 'Attempt to add card of an invalid type.';
    }
    if (!this.has(card.value)) {
      this.cards.push(card);
      this.updateRank();
    }
    return this;
  },

  /**
   *
   */
  updateRank: function () {
    //
  }
};


