/**
 * Poker.Deck
 */
function Deck(options) {
  if (!(this instanceof Deck)) {
    return new Deck(options);
  }
  this.cards = Deck.CARDS.map(function (card) {
    return new Card({ value: card });
  }, this);

  this.jokers = 0;
  if (options && typeof options === 'object') {
    if (options.hasOwnProperty('jokers')) {
      this.jokers = parseInt(options.jokers, 10);
      if (isNaN(this.jokers)) {
        this.jokers = 0;
      }
      this.jokers = Math.max(0, Math.min(Deck.MAX_JOKERS, this.jokers));
      for (var i = 0; i < this.jokers; i++) {
        this.cards[Deck.SIZE + i] = new Card({ value: 'W' + (i + 1) });
      }
    }
  }
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

  /*
   * Shuffle/randomize the deck.
   */
  shuffle: function () {
    var shuffled = [];
    while (this.cards.length) {
      var n = Math.floor(Math.random() * this.cards.length);
      shuffled.push(this.cards[n]);
      this.cards.splice(n, 1);
    }
    if (!this.isShuffled()) {
      this.shuffle();
    }
    return this;
  },

  /**
   * @returns TRUE is the deck has been shuffled.
   */
  isShuffled: function () {
    var shuffled = false;
    this.cards.forEach(function (card, index) {
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
    return !(this.cards.length < (Deck.SIZE + this.jokers) ||
      this.isShuffled());
  },

  /**
   * Deal next card in the deck.
   * @returns the card dealt.
   */
  deal: function () {
    return this.cards.length ? this.cards.pop() : null;
  }
};

