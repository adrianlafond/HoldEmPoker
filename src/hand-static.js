/**
 * Returns the rank of an array of cards.
 * @param {array<Card>} cards
 * @returns {number} Number between 0 (no rank) and 10 (royal flush).
 */
Hand.rank = function (cards) {
  if (cards.length >= 5) {
    // if (Hand.findRoyalFlush(cards)) {
    //   return Hand.ROYAL_FLUSH
    // }
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
 * @param {boolean=} alreadyStraightFlush True if @param cards can be assumed
 *   to be a straight flush.
 * @returns {array<Card>|null}
 */
Hand.findRoyalFlush = function (cards, alreadyStraightFlush) {
  var flush = Hand.findStraightFlush(cards);
  return (flush && flush[0].rank === 'A') ? flush : null;
};

/**
 * @param {array<Card>} cards
 * @param {boolean=} alreadyFlush True if @param cards can be assumed to be a
 *   flush.
 * @returns {array<Card>|null}
 */
Hand.findStraightFlush = function (cards, alreadyFlush) {
  var flush = alreadyFlush ? cards : Hand.findFlush(cards);
  if (flush) {
    var result = [flush[0]];
    var index = Hand.RANKS.indexOf(flush[0].rank);
    for (var i = 1; i < 5; i++) {
      if (flush[i].rank === Hand.RANKS[++index]) {
        result.push(flush[i]);
      } else {
        break;
      }
    }
    if (result.length === 5) {
      return result;
    }
  }
  return null;
};

/**
 * @param {array<Card>} cards
 * @returns {array<Card>|null}
 */
Hand.findFlush = function (cards) {
  var result = null;
  Hand.SUITS.split('').forEach(function (suit) {
    var suits = cards.filter(function (card) {
      return card.suit === suit;
    });
    if (suits.length >= 5) {
      result = Hand.sortHigh2Low(suits);
    }
  });
  return result || null;
};

/**
 * @param {array<Card} cards
 * @returns {array<Card>|null}
 */
Hand.findFourOfAKind = function (cards) {
  var sets = Hand.findSets(cards);
  var result = null;
  for (var i = 0; i < sets.length; i++) {
    if (sets[i].length === 4) {
      result = sets[i];
    } else if (result) {
      result.push(sets[i][0]);
      return result;
    }
  }
  return null;
};


Hand.findSets = function (cards) {
  var sets = [];
  var ranks = [];
  var cardsLen = cards.length;
  Hand.sortHigh2Low(cards);
  for (var i = 0; i < cardsLen; i++) {
    if (ranks.indexOf(cards[i].rank) === -1) {
      var set = [cards[i]];
      ranks.push(cards[i].rank);
      for (var j = 0; j < cardsLen; j++) {
        if (i !== j && cards[j].rank === cards[i].rank) {
          set.push(cards[j]);
        }
      }
      sets.push(set);
    }
  }
  return sets;
};


/**
 * @param {array<Card} cards
 * @returns {array<Card>|null}
 */
Hand.findHighCard = function (cards) {
  return Hand.sortHigh2Low(cards);
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