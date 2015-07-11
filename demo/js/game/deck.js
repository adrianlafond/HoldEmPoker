/**
 * Poker.Deck
 */
function Deck(options) {
  if (!(this instanceof Deck)) {
    return new Deck(options);
  }
  this.cards = Poker.CARDS.map(function (card) {
    return new Card({ value: card });
  }, this);

  this.jokers = 0;
  if (options && typeof options === 'object') {
    if (options.hasOwnProperty('jokers')) {
      this.jokers = parseInt(options.jokers, 10);
      if (isNaN(this.jokers)) {
        this.jokers = 0;
      }
      this.jokers = Math.max(0, Math.min(Poker.MAX_JOKERS, this.jokers));
      for (var i = 0; i < this.jokers; i++) {
        this.cards[Poker.SIZE + i] = new Card({ value: 'W' + (i + 1) });
      }
    }
  }
}


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
    this.cards = shuffled;
    if (!this.isShuffled()) {
      this.shuffle();
    }
    return this;
  },

  /**
   * @returns TRUE is the deck has been shuffled.
   */
  isShuffled: function () {
    for (var i = 0; i < this.cards.length; i++) {
      var card = this.cards[i];
      if (i < Poker.SIZE) {
        if (card.value !== Poker.CARDS[i]) {
          return true;
        }
      } else {
        var n = i - Poker.SIZE + 1;
        if (card.value !== 'W' + n) {
          return true;
        }
      }
    }
    return false;
  },

  /**
   * @returns TRUE if deck is unshuffled and no cards have been dealth.
   */
  isImmaculate: function () {
    return !(this.cards.length < (Poker.SIZE + this.jokers) ||
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
