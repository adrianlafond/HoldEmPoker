/**
 * Returns the rank of an array of cards.
 * @param {array<Card>} cards
 * @returns {number} Number between 0 (no rank) and 10 (royal flush).
 */
Hand.rank = function (cards) {
  cards = Hand.sortHigh2Low(cards.slice());
  if (cards.length >= 5) {
    if (Hand.findRoyalFlush(cards)) {
      return Hand.ROYAL_FLUSH
    }
  }
  return { rank: Hand.NOTHING, cards: [] };
};

/**
 * Returns the low rank of an array of cards. Lower is better. The minimum
 * (winningest) value is 0. The maximum value depends on the type of low game.
 * @param {array<Card>} cards
 * @param {string=} type The type of low hand; default is Hand.ACE_TO_FIVE_LOW.
 * @returns {number}
 */
Hand.rankLow = function (cards, type) {
  cards = Hand.sortLow2High(cards.slice());
  return { rank: Hand.NOTHING, cards: [] };
};


/**
 * @param {array<Card>} cards
 * @returns {array<Card>|null}
 */
Hand.findRoyalFlush = function (cards) {
  var aces = cards.filter(function (card) {
    return card.rank === 'A';
  });
  while (aces.length) {
    var ace = aces.shift();
    var suit = cards.filter(function (card) {
      return card.suit === ace.suit;
    });
    Hand.sortHigh2Low(suit);
    if (suit.length >= 5) {
      var result = [];
      for (var i = 0; i < 5; i++) {
        if (suit[i].rank === Hand.RANKS[i + 1]) {
          result.push(suit[i]);
        } else {
          break;
        }
      }
      if (result.length === 5) {
        return result;
      }
    }
  }
  return null;
};


/**
 * @param {array<Card>} cards
 * @returns {array<Card>} Sorted high to low.
 */
Hand.sortHigh2Low = function (cards) {
  cards.sort(function (a, b) {
    var valA = Hand.RANKS.indexOf(a.rank);
    var valB = Hand.RANKS.indexOf(b.rank);
    return valA - valB;
  });
  return cards;
};

/**
 * @param {array<Card>} cards
 * @returns {array<Card>} Sorted low to high.
 */
Hand.sortLow2High = function (cards) {
  cards.sort(function (a, b) {
    var valA = Hand.RANKS.indexOf(a.rank);
    var valB = Hand.RANKS.indexOf(b.rank);
    return valB - valA;
  });
  return cards;
};