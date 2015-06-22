/**
 * Poker.Deck
 */
function Deck(options) {
  if (!(this instanceof Deck)) {
    return new Deck(options);
  }
  var cardsIn = [];
  var cardsOut = [];
  var jokers = 0;

  _.forEach(Deck.CARDS, function (card, i) {
    cardsIn[i] = new Card({ value: card });
  }, this);

  if (options && _.isPlainObject(options)) {
    if (_.has(options, 'jokers')) {
      jokers = parseInt(options.jokers, 10);
      if (isNaN(jokers)) {
        jokers = 0;
      }
      jokers = Math.max(0, Math.min(Deck.MAX_JOKERS));
      _.times(jokers, function (n) {
        cardsIn[Deck.SIZE + n] = new Card({ value: 'W' + (n + 1) });
      }, this);
    }
  }

  Object.defineProperties(this, {
    cardsIn: {
      get: function () {
        return cardsIn;
      }
    },
    cardsOut: {
      get: function () {
        return cardsOut;
      }
    },
    jokers: {
      get: function () {
        return jokers;
      }
    }
  });
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
  size: function () {
    return Deck.SIZE + this.jokers;
  },

  /*
   * Shuffle/randomize the deck.
   */
  shuffle: function () {
    while (!this.isShuffled()) {
      var shuffled = _.shuffle(this.cardsIn);
      for (var i = 0; i < this.cardsIn.length; i++) {
        this.cardsIn[i] = shuffled[i];
      }
    }
    return this;
  },

  /**
   * @returns TRUE is the deck has been shuffled.
   */
  isShuffled: function () {
    var shuffled = false;
    _.forEach(this.cardsIn, function (card, index) {
      if (index < Deck.SIZE) {
        if (card.value !== Deck.CARDS[index]) {
          shuffled = true;
          return false;
        }
      } else {
        var n = index - Deck.SIZE + 1;
        if (card.value !== 'W' + n) {
          shuffled = true;
          return false;
        }
      }
    }, this);
    return shuffled;
  },

  /**
   * @returns TRUE if deck is unshuffled and no cards have been dealth.
   */
  isImmaculate: function () {
    return !(this.cardsIn.length < this.size() || this.isShuffled());
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
    }
    return card;
  }
};

