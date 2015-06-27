/**
 * Unique ID generator for Hand instances.
 */
Hand.uid = (function () {
  var uid = 0;
  return function () {
    return uid++;
  };
}());


/**
 * Returns the rank of an array of cards.
 * @param {array<Card>} cards
 * @returns {number} Number between 0 (no rank) and 10 (royal flush).
 */
Hand.rank = function (cards) {
  var rank = Poker.NOTHING;
  var result;
  var resultTmp;
  var i;

  if (cards.length >= 5) {
    result = Hand.findFlush(cards);
    if (result) {
      rank = Poker.FLUSH;
      resultTmp = Hand.findStraightFlush(result, true);
      if (resultTmp) {
        rank = Poker.STRAIGHT_FLUSH;
        result = resultTmp;
        resultTmp = Hand.findRoyalFlush(result, true);
        if (resultTmp) {
          rank = Poker.ROYAL_FLUSH;
          result = resultTmp;
        }
      }
    }
  }
  if (rank < Poker.FOUR_OF_A_KIND) {
    var sets = Hand.findSets(cards);
    var setsLen = sets.length;
    if (setsLen) {
      switch (sets[0].length) {

        case 4:
          rank = Poker.FOUR_OF_A_KIND;
          result = sets[0];
          for (i = 1; i < setsLen; i++) {
            if (result.length === 4) {
              result.push(sets[i][0]);
            } else if (Poker.RANKS.indexOf(sets[i][0].rank) < Poker.RANKS.indexOf(result[4].rank))  {
              result[4] = sets[i][0];
            }
          }
          break;

        case 3:
          if (rank < Poker.FULL_HOUSE) {
            result = sets[0];
            if (setsLen >= 2) {
              if (sets[1].length >= 2) {
                rank = Poker.FULL_HOUSE;
                result = result.concat(sets[1].slice(0, 2));
              } else if (rank < Poker.THREE_OF_A_KIND) {
                rank = Poker.THREE_OF_A_KIND;
                result.push(sets[1][0]);
                if (setsLen >= 3) {
                  result.push(sets[2][0]);
                }
              }
            } else if (rank < Poker.THREE_OF_A_KIND) {
              rank = Poker.THREE_OF_A_KIND;
            }
          }
          break;

        case 2:
          if (rank < Poker.TWO_PAIR) {
            rank = Poker.ONE_PAIR;
            result = sets[0];
            if (setsLen >= 2) {
              if (sets[1].length >= 2) {
                rank = Poker.TWO_PAIR;
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

  if (rank < Poker.STRAIGHT) {
    resultTmp = Hand.findStraight(cards);
    if (resultTmp) {
      rank = Poker.STRAIGHT;
      result = resultTmp;
    }
  }

  if (rank < Poker.HIGH_CARD) {
    rank = Poker.HIGH_CARD;
    result = Hand.findHighCard(cards);
  }

  return { rank: rank, cards: result || [] };
};

/**
 * Returns the low rank of an array of cards. Lower is better. The minimum
 * (winningest) value is 0. The maximum value depends on the type of low game.
 * @param {array<Card>} cards
 * @param {string=} type The type of low hand; default is Poker.ACE_TO_FIVE_LOW.
 * @returns {number}
 */
Hand.rankLow = function (cards, type) {
  cards = Hand.sortLow2High(cards.slice());
  return { rank: Poker.NOTHING, cards: [] };
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
    var index = Poker.RANKS.indexOf(flush[0].rank);
    for (var i = 1; i < 5; i++) {
      if (flush[i].rank === Poker.RANKS[++index]) {
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
  Poker.SUITS.split('').forEach(function (suit) {
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
    rank = Poker.RANKS.indexOf(cards[i].rank);
    for (var j = i + 1; j < cardsLen; j++, rank++) {
      var delta = Poker.RANKS.indexOf(cards[j].rank) - rank;
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
 * @param {Card} cardA
 * @param {Card} cardB
 * @returns 'id' property of highest ranked card or null is even.
 */
Hand.highest = function (handA, handB) {
  // Compare ranks.
  if (handA.rank > handB.rank) {
    return handA.id;
  } else if (handA.rank < handB.rank) {
    return handB.id;
  } if (handA.rank === Hand.ROYAL_FLUSH) {
    return null;
  }

  var cmprRanks = function () {
    for (var i = 0; i < arguments.length; i++) {
      var rankA = Poker.RANKS.indexOf(handA.cardsHigh[arguments[i]].rank);
      var rankB = Poker.RANKS.indexOf(handB.cardsHigh[arguments[i]].rank);
      if (rankA < rankB) {
        return handA.id;
      } else if (rankA > rankB) {
        return handB.id;
      }
    }
    return null;
  };

  // Compare first/highest cards.
  var comparison;
  if ((comparison = cmprRanks(0))) {
    return comparison;
  }

  // Highest cards are the same so more complex comparisons necessary.
  switch (handA.rank) {
    case Hand.STRAIGHT_FLUSH:
    case Hand.STRAIGHT:
      return null;
    // Realized that -- obviously! -- these cases are impossible:
    // case Hand.FOUR_OF_A_KIND:
    //   if ((comparison = cmprRanks(4))) {
    //     return comparison;
    //   }
    //   break;
    // case Hand.FULL_HOUSE:
    //   if ((comparison = cmprRanks(3))) {
    //     return comparison;
    //   }
    //   break;
    // case Hand.THREE_OF_A_KIND:
    //   if ((comparison = cmprRanks(3, 4))) {
    //     return comparison;
    //   }
    //   break;
    case Hand.TWO_PAIR:
      if ((comparison = cmprRanks(2, 4))) {
        return comparison;
      }
      break;
    case Hand.ONE_PAIR:
      if ((comparison = cmprRanks(2, 3, 4))) {
        return comparison;
      }
      break;
    case Hand.HIGH_CARD:
      if ((comparison = cmprRanks(1, 2, 3, 4))) {
        return comparison;
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
    var valA = Poker.RANKS.indexOf(a.rank);
    var valB = Poker.RANKS.indexOf(b.rank);
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
    var valA = Poker.RANKS.indexOf(a.rank);
    var valB = Poker.RANKS.indexOf(b.rank);
    return valB - valA;
  });
  return cards;
};
