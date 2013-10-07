/**
 * Static methods attached to Poker.Hand.
 */

/**
 * Find a flush in an array of cards.
 * Options for arguments:
 *   @param {array} of at least 5 cards.
 *   @returns highest flush found.
 * or:
 *   @params {object} with properties:
 *     {array} cards Mandatory; at least 5 cards.
 *     {boolean} low Optional; finds lowest flush; default false.
 *   @returns highest flush found unless options.low is true.
 */
Hand.findFlush = function () {
  var param = (arguments.length > 0) ? arguments[0] : null,
      cards = null,
      low = false,
      flush = null,
      s, suit,
      c, clen,
      n,
      tmpCards

  // Interpret arguments.
  if (_.isArray(param)) {
    cards = param
  } else if (_.isObject(param)) {
    cards = param.cards
    low = !!param.low
  }

  // Make sure cards array is valid.
  if (!_.isArray(cards) || cards.length < 5) {
    return null
  }

  cards = cards.slice(0)
  Hand.sortByRank(cards)
  clen = cards.length

  // Loop through the suits to match them to flushes.
  for (s = 0; s < 4; s++) {
    suit = Hand.SUITS[s]
    tmpCards = []
    n = 0

    // Find the subset of cards with the current suit.
    for (c = 0; c < clen; c++) {
      if (cards[c].charAt(1) === suit) {
        tmpCards[n++] = cards[c]
      }
    }

    // If the subset has at least 5 cards, it is a flush.
    if (tmpCards.length >= 5) {

      // If no other flush has yet been found, this one will do.
      // This will also get the job done 99.999% of the time.
      if (flush === null) {
        flush = low ? tmpCards.slice(tmpCards.length - 5) : tmpCards.slice(0, 5)

      // Compare this flush to a flush that was already found,
      // in the unlikely event that a hand contains >= 10 cards
      // and multiple flushes.
      } else {
        tmpCards = low ? tmpCards.slice(tmpCards.length - 5) : tmpCards.slice(0, 5)
        if (low) {
          for (n = 0; n < 5; n++) {
            if (Hand.isLower(tmpCards[n], flush[n])) {
              flush = tmpCards
              break
            }
          }
        } else {
          for (n = 0; n < 5; n++) {
            if (Hand.isHigher(tmpCards[n], flush[n])) {
              flush = tmpCards
              break
            }
          }
        }
      }
    }
  }

  return flush ? { cards: flush } : null
}



/**
 * Find a straight flush in an array of cards all of the same suit.
 * In other words, the array must be a FLUSH, so call Hand.findFlush() first.
 * Options for arguments:
 *   @param {array} of at least 5 flush cards.
 *   @returns highest straight flush found.
 * or:
 *   @params {object} with properties:
 *     {array} cards Mandatory; at least 5 flush cards.
 *     {boolean} low Optional; finds lowest straight flush; default false.
 *   @returns highest straight flush found unless options.low is true.
 */
Hand.findStraightFlush = function () {
  var param = (arguments.length > 0) ? arguments[0] : null,
      cards,
      low = false,
      result

  // Interpret arguments.
  if (_.isArray(param)) {
    cards = param
  } else if (_.isObject(param)) {
    cards = param.cards
    low = !!param.low
  }

  // Make sure cards array is valid.
  if (!_.isArray(cards) || cards.length < 5) {
    return null
  }

  if (result = Hand.findStraight(cards, true)) {
    result.royalFlush = Hand.rank(result.cards[0]) === 'A'
  }
  return result
}


/**
 *
 */
Hand.findStraight = function (cards) {
  return null
}



/**
 * Sorts an array of cards by rank.
 */
Hand.sortByRank = function (cards) {
  cards.sort(Hand.compareCardsByRank)
}

/**
 * Returns true if the rank of card a is higher than that of b.
 */
Hand.isHigher = function (a, b) {
  return Hand.compareCardsByRank(a, b) < 0
}

/**
 * Returns true if the rank of card a is lower than that of b.
 */
Hand.isLower = function (a, b) {
  return Hand.compareCardsByRank(a, b) > 0
}


/**
 * For use with Array.sort().
 */
Hand.compareCardsByRank = function (a, b) {
  var valA = Hand.RANKS.indexOf(Hand.rank(a)),
      valB = Hand.RANKS.indexOf(Hand.rank(b))
  return valA - valB
}

/**
 * For use with Array.sort().
 */
Hand.compareCardsBySuit = function (a, b) {
  var valA = Hand.SUITS.indexOf(Hand.suit(a)),
      valB = Hand.SUITS.indexOf(Hand.suit(b))
  return valA - valB
}

/**
 * For use with Array.sort().
 * Sorts by the length of sets of cards.
 */
Hand.compareSetSize = function (a, b) {
  var valA = a.length,
      valB = b.length
  return valB - valA
}

/**
 * Returns the rank of @param card.
 */
Hand.rank = function (card) {
  return card.charAt(0)
}

/**
 * Returns the suit of @param card.
 */
Hand.suit = function (card) {
  return card.charAt(1)
}





