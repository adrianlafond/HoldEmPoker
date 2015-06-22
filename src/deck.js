/**
 * Poker.Deck
 */
function Deck(options) {
  if (!(this instanceof Deck)) {
    return new Deck(options);
  }
  this.isShuffled = false;
  this.isNew = true;
  this.jokers = 0;

  if (options && typeof options === 'object') {
    if (options.hasOwnProperty('jokers')) {
      this.addJokers(parseInt(options.jokers, 10));
    }
  }
  this.reset();
}


Object.defineProperty(Deck, 'CARDS', {
  value: [
    '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC', 'AC',
    '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD', 'AD',
    '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH', 'AH',
    '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS', 'AS'
  ],
  enumerable: true
});
Object.defineProperty(Deck, 'SIZE', {
  value: Deck.CARDS.length,
  enumerable: true
});
Object.defineProperty(Deck, 'MAX_JOKERS', {
  value: 4,
  enumerable: true
});


Deck.prototype = {

  /**
   * @returns undealt cards remaining in deck.
   */
  cards: function () {
    return this.cardsIn.slice();
  },

  /**
   * @returns number of cards in the deck.
   */
  count: function () {
    return Deck.SIZE + this.jokers;
  },

  /**
   * Remove all jokers from the deck.
   */
  removeJokers: function () {
    this.jokers = 0;
    this.reset();
    return this;
  },

  /**
   * Add up to 4 jokers to the deck.
   * @param {number} num Number of jokers to add.
   */
  addJokers: function (num) {
    num = parseInt(num, 10);
    if (!isNaN(num)) {
      num = Math.max(0, Math.min(num, Deck.MAX_JOKERS - this.jokers));
      this.jokers += num;
      this.reset();
    }
    return this;
  },


  /**
   * Reset the deck to its original unshuffled order.
   */
  reset: function () {
    this.cardsIn = [];
    this.cardsOut = [];
    _.forEach(Deck.CARDS, function (card, i) {
      this.cardsIn[i] = Card({ value: card });
    }, this);
    for (var n = 0; n < this.jokers; n++) {
      this.cardsIn[Deck.SIZE + n] = new Card({ value: 'W' + (n + 1) });
    }
    this.isShuffled = false;
    this.isNew = true;
    return this;
  },


  /**
   * Shuffle/randomize the deck.
   */
  shuffle: function () {
    this.reset();
    this.cardsIn = _.shuffle(this.cardsIn);
    this.isShuffled = true;
    this.isNew = false;
    return this;
  },


  /**
   * Deal next card in the deck.
   * @returns the card dealt.
   */
  deal: function () {
    var card = null;
    if (this.cardsIn.length) {
      card = this.cardsIn.pop();
      this.cardsOut.push(card);
      this.isNew = false;
    }
    return card;
  }
};

