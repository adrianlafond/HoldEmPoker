/**
 * Returns the rank of an array of cards.
 * @param {array<Card>} cards
 * @returns {number} Number between 0 (no rank) and 10 (royal flush).
 */
Hand.rank = function (cards) {
  var rank = Hand.NOTHING;
  var result;
  var resultTmp;
  var i;

  if (cards.length >= 5) {
    result = Hand.findFlush(cards);
    if (result) {
      rank = Hand.FLUSH;
      resultTmp = Hand.findStraightFlush(result, true);
      if (resultTmp) {
        rank = Hand.STRAIGHT_FLUSH;
        result = resultTmp;
        resultTmp = Hand.findRoyalFlush(result, true);
        if (resultTmp) {
          rank = Hand.ROYAL_FLUSH;
          result = resultTmp;
        }
      }
    }
  }
  if (rank < Hand.FOUR_OF_A_KIND) {
    var sets = Hand.findSets(cards);
    var setsLen = sets.length;
    if (setsLen) {
      switch (sets[0].length) {

        case 4:
          rank = Hand.FOUR_OF_A_KIND;
          result = sets[0];
          for (i = 1; i < setsLen; i++) {
            if (result.length === 4) {
              result.push(sets[i][0]);
            } else if (Hand.RANKS.indexOf(sets[i][0].rank) < Hand.RANKS.indexOf(result[4].rank))  {
              result[4] = sets[i][0];
            }
          }
          break;

        case 3:
          if (rank < Hand.FULL_HOUSE) {
            result = sets[0];
            if (setsLen >= 2) {
              if (sets[1].length >= 2) {
                rank = Hand.FULL_HOUSE;
                result = result.concat(sets[1].slice(0, 2));
              } else if (rank < Hand.THREE_OF_A_KIND) {
                rank = Hand.THREE_OF_A_KIND;
                result.push(sets[1][0]);
                if (setsLen >= 3) {
                  result.push(sets[2][0]);
                }
              }
            } else if (rank < Hand.THREE_OF_A_KIND) {
              rank = Hand.THREE_OF_A_KIND;
            }
          }
          break;

        case 2:
          if (rank < Hand.TWO_PAIR) {
            rank = Hand.ONE_PAIR;
            result = sets[0];
            if (setsLen >= 2) {
              if (sets[1].length >= 2) {
                rank = Hand.TWO_PAIR;
                result = result.concat(sets[1]);
                if (setsLen >= 3) {
                  result.push(sets[2][0]);
                }
              } else {
                var n = 1;
                while (n < setsLen - 1) {
                  result.push(sets[n][0]);
                  ++n;
                }
              }
            }
          }
          break;
      }
    }
  }

  if (rank < Hand.STRAIGHT) {
    resultTmp = Hand.findStraight(cards);
    if (resultTmp) {
      rank = Hand.STRAIGHT;
      result = resultTmp;
    }
  }

  if (rank < Hand.HIGH_CARD) {
    rank = Hand.HIGH_CARD;
    result = Hand.findHighCard(cards);
  }

  return { rank: rank, cards: result || [] };
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
 * @param {array<Card>} cards
 * @returns {array<Card>|null}
 */
Hand.findStraight = function (cards) {
  var result = null;
  var cardsLen = cards.length;
  var rank = 0;
  cards = Hand.sortHigh2Low(cards.slice());
  for (var i = 0; i <= cardsLen - 5; i++) {
    result = [cards[i]];
    rank = Hand.RANKS.indexOf(cards[i].rank);
    for (var j = i + 1; j < cardsLen; j++, rank++) {
      var delta = Hand.RANKS.indexOf(cards[j].rank) - rank;
      if (delta === 1) {
        result.push(cards[j]);
        if (result.length === 5) {
          return result;
        }
      } else if (delta > 1) {
        break;
      }
    }
  }
  return null;
};

/**
 * @param {array<Card} cards
 * @returns {array<Card>|null}
 */
Hand.findHighCard = function (cards) {
  return Hand.sortHigh2Low(cards.slice()).slice(0, 5);
};


/**
 * @returns {array<array<Card>>}
 */
Hand.findSets = function (cards) {
  var sets = [];
  var ranks = [];
  var cardsLen = cards.length;
  cards = Hand.sortHigh2Low(cards.slice());
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
  sets.sort(function (a, b) {
    return b.length - a.length;
  });
  return sets;
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
