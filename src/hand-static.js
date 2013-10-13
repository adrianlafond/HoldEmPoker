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
 *     {boolean} sorted Optional; whether cards are already sorted highest
 *       to lowest; default false.
 *     {boolean} low Optional; finds lowest flush; default false.
 *     {boolean} all Optional; returns all flush hands (more than 5), for
 *       use in teting for a straight flush; default false
 *   @returns highest flush found unless options.low is true.
 */
Hand.findFlush = function () {
  var param = (arguments.length > 0) ? arguments[0] : null,
      cards = null,
      sorted = false,
      low = false,
      all = false,
      flush = null,
      s, suit,
      n,
      tmpCards,
      tmpCardsLen

  // Interpret arguments.
  if (util.isArray(param)) {
    cards = param
  } else if (util.isObject(param)) {
    cards = param.cards
    sorted = param.sorted === true
    low = param.low === true
    all = param.all === true
  }

  // Make sure cards array is valid.
  if (!util.isArray(cards) || cards.length < 5) {
    return null
  }

  cards = cards.slice(0)
  if (!sorted) {
    Hand.sortByRank(cards)
  }

  // Loop through the suits to match them to flushes.
  for (s = 0; s < 4; s++) {
    suit = Hand.SUITS.charAt(s)
    tmpCards = []
    n = 0

    // Find the subset of cards with the current suit.
    util.each(cards, function (card, c) {
      if (Hand.suit(card) === suit) {
        tmpCards[n++] = card
      }
    })

    // If the subset has at least 5 cards, it is a flush.
    tmpCardsLen = tmpCards.length
    if (tmpCardsLen >= 5) {

      // If no other flush has yet been found, this one will do.
      // This will also get the job done 99.999% of the time.
      if (flush === null) {
        flush = low
          ? tmpCards.slice(tmpCardsLen - 5)
          : tmpCards.slice(0, all ? tmpCardsLen : 5)

      // Compare this flush to a flush that was already found,
      // in the unlikely event that a hand contains >= 10 cards
      // and multiple flushes.
      } else {
        tmpCards = low
          ? tmpCards.slice(tmpCards.length - 5)
          : tmpCards.slice(0, all ? tmpCardsLen : 5)
        if (low) {
          flush = Hand.getBestCardsByRank({ low: true, cards: [tmpCards, flush] })
        } else {
          flush = Hand.getBestCardsByRank(tmpCards, flush)
        }
      }
    }
  }

  return flush ? { cards: flush } : null
}



/**
 * Find a straight flush in an array of cards.
 * Options for arguments:
 *   @param {array} of at least 5 cards.
 * or:
 *   @params {object} with properties:
 *     {array} cards Mandatory; at least 5 cards.
 *     {boolean} flush Optional; if true will skip call to findFlush().
 *     {boolean} sorted Optional; whether cards are already sorted highest
 *       to lowest; default false.
 *     {boolean} low Optional; finds lowest straight flush; default false.
 *     {boolean} acesAreLow Optional; default true.
 * @returns { cards: [best flush found] }
 */
Hand.findStraightFlush = function () {
  var param = (arguments.length > 0) ? arguments[0] : null,
      cards,
      flush = false,
      sorted = false,
      low = false,
      acesAreLow = true,
      result

  // Interpret arguments.
  if (util.isArray(param)) {
    cards = param
  } else if (util.isObject(param)) {
    cards = param.cards
    flush = param.flush === true
    sorted = param.sorted === true
    low = param.low === true
    acesAreLow = !(param.acesAreLow === false)
  }

  // Make sure cards array is valid.
  if (!util.isArray(cards) || cards.length < 5) {
    return null
  }

  cards = cards.slice(0)
  if (!sorted) {
    Hand.sortByRank(cards)
  }

  // Make sure cards are a flush.
  if (!flush) {
    result = Hand.findFlush({
      cards: cards,
      sorted: sorted,
      low: low,
      acesAreLow: acesAreLow
    })
    if (result) {
      cards = result.cards
    } else {
      return null
    }
  }

  result = Hand.findStraight({
    cards: cards,
    sorted: sorted,
    low: low,
    acesAreLow: acesAreLow
  })
  if (result) {
    result.royalFlush = Hand.rank(result.cards[0]) === 'A'
    return result
  }
  return null
}


/**
 * Find a straight in an array of cards.
 * Options for arguments:
 *   @param {array} of at least 5 cards.
 * or:
 *   @params {object} with properties:
 *     {array} cards Mandatory; at least 5 cards.
 *     {boolean} sorted Optional; whether cards are already sorted highest
 *       to lowest; default false.
 *     {boolean} low Optional; finds lowest straight; default false.
 *     {boolean} acesAreLow Optional; default true.
 * @returns { cards: [best straight found] }
 */
Hand.findStraight = function () {
  var param = (arguments.length > 0) ? arguments[0] : null,
      cards,
      sorted = false,
      low = false,
      acesAreLow = true,
      ace = null,
      tmpStr8 = null,
      str8 = null,
      r = -1,
      tmpIndex,
      ranks

  // Interpret arguments.
  if (util.isArray(param)) {
    cards = param
  } else if (util.isObject(param)) {
    cards = param.cards
    sorted = param.sorted === true
    low = param.low === true
    acesAreLow = !(param.acesAreLow === false)
  }

  // Make sure cards array is valid.
  if (!util.isArray(cards) || cards.length < 5) {
    return null
  }

  cards = cards.slice()
  if (!sorted) {
    Hand.sortByRank(cards)
  }

  util.each(cards, function (card, c) {
    if (r === -1 || tmpStr8 === null) {
      // No straight cards yet, so start a straight with current card.
      r = Hand.RANKS.indexOf(Hand.rank(card))
      tmpStr8 = [card]

    } else {
      // A straight is in the works and it must be determined
      // if the current loop card can be added to it.
      tmpIndex = Hand.RANKS.indexOf(Hand.rank(card))

      if (tmpIndex === r) {
        // If rank is same as last card in the straight, skip.

      } else if (tmpIndex === r + 1) {
        // If rank is next after the last card in the straight, add it.
        r = tmpIndex
        tmpStr8.push(card)

        // Test fot 5-4-3-2-A straight.
        if (acesAreLow && tmpStr8.length === 4 && Hand.rank(tmpStr8[0]) === '5') {
          ;(function () {
            var aceIndex = Hand.RANKS.indexOf('A'),
                cardIndex
            util.each(cards, function (cardA, i) {
              cardIndex = Hand.RANKS.indexOf(Hand.rank(cardA))
              if (cardIndex === aceIndex) {
                tmpStr8[4] = cardA
                return false
              } else if (cardIndex > aceIndex) {
                return false
              }
            }, this)
          }());
        }

      } else {
        // Current loop card does not fit onto the straight.
        // Test if straight is complete.
        if (tmpStr8.length >= 5) {
          str8 = tmpStr8.slice(0, 5)
          tmpStr8 = null
          if (!low) {
            return false
          }
        }

        if (cards.length - c < 4) {
          return false
        }
        r = tmpIndex
        tmpStr8 = [card]
      }
    }
  }, this)

  if (tmpStr8 && tmpStr8.length >= 5) {
    if (str8) {
      str8 = Hand.getBestCardsByRank({
        low: low,
        cards: [str8, tmpStr8]
      })
    } else {
      str8 = tmpStr8
    }
  }
  if (str8) {
    if (low) {
      return { cards: str8.slice(str8.length - 5) }
    }
    return { cards: str8.slice(0, 5) }
  }
  return null
}



/**
 * Find sets of cards of the same rank in an array of cards.
 * Options for arguments:
 *   @param {array} of at least 5 cards.
 * or:
 *   @params {object} with properties:
 *     {array} cards Mandatory; at least 5 cards.
 *     {boolean} sorted Optional; whether cards are already sorted highest
 *       to lowest; default false.
 * @returns { sets: [], kickers: [], type: [index of Hand.RANKS] }
 */
Hand.findSets = function () {
  var param = (arguments.length > 0) ? arguments[0] : null,
      cards,
      sorted = false,
      sets,
      setsLen,
      finalSets,
      setsCardsLen = 0,
      kickers,
      type

  // Interpret arguments.
  if (util.isArray(param)) {
    cards = param
  } else if (util.isObject(param)) {
    cards = param.cards
    sorted = param.sorted === true
  }

  // Make sure cards array is valid.
  if (!util.isArray(cards) || cards.length < 5) {
    return null
  }

  cards = cards.slice()
  if (!sorted) {
    Hand.sortByRank(cards)
  }

  sets = (function (cards) {
    var sets = [],
        r = 1,
        set,
        c,
        clen = cards.length
    for (; r < 14; r++) {
      set = []
      for (c = 0; c < clen; c++) {
        if (Hand.RANKS.indexOf(Hand.rank(cards[c])) === r) {
          set.push(cards[c])
          if (c === clen - 1) {
            sets.push(set)
          }
        } else if (set.length >= 1) {
          sets.push(set)
          break
        }
      }
    }
    return sets
  }(cards))
  finalSets = []
  kickers = []

  // Sort sets by set size.
  sets.sort(function (a, b) {
    return Math.max(-1, Math.min(1, b.length - a.length))
  })

  // Separate the sets that matter from those that don't.
  ;(function () {
    var c = 0,
        setsLen = sets.length,
        handLen = 0,
        sliceLen,
        slen
    util.each(sets, function (set, c) {
      if (handLen < 4 && (slen = set.length) >= 2) {
        sliceLen = Math.min(slen, 5 - handLen)
        finalSets.push(set.slice(0, sliceLen))
        setsCardsLen += sliceLen
        if (sliceLen < slen - 1) {
          kickers.push(set.slice(sliceLen))
        }
        handLen += slen
      } else {
        kickers = kickers.length ? kickers.concat(set) : set
        handLen += set.length
      }
      handLen = Math.min(5, handLen)
    }, this)
  }());


  // Sort the kickers.
  kickers.sort(Hand.compareCardsByRank)

  // Determine type
  switch (sets[0].length) {
    case 4:
      type = Hand.FOUR_OF_A_KIND
      break
    case 3:
      type = (finalSets.length === 2) ? Hand.FULL_HOUSE : Hand.THREE_OF_A_KIND
      break
    case 2:
      type = (finalSets.length === 2) ? Hand.TWO_PAIR : Hand.ONE_PAIR
      break
    default:
      type = Hand.HIGH_CARD
  }

  if (finalSets.length) {
    return {
      sets: finalSets,
      kickers: kickers.slice(0, 5 - setsCardsLen),
      type: type
    }
  }
  return null
}




/**
 * Compares array of arrays of cards and returns the array of cards
 * with the best hand by card rank. The arrays must already be sorted.
 * Can be called either by passing the arrays as separate arguments,
 * or by passing an object with properties:
 *   low: {boolean} default false
 *   cards: {array} array of arrays of cards
 */
Hand.getBestCardsByRank = function () {
  var array = arguments[0].hasOwnProperty('cards')
        ? arguments[0].cards
        : Array.prototype.slice.call(arguments),
      low = arguments[0].hasOwnProperty('low')
        ? (arguments[0].low === true)
        : false,
      cmprFn = low ? Hand.isLower : Hand.isHigher,
      bestArray

  util.each(array, function (cards, a) {
    var tmpArray
    if (a === 0) {
      bestArray = cards.slice()
    } else {
      if (low) {
        tmpArray = cards.slice(Math.max(0, cards.length - 5))
      } else {
        tmpArray = cards.slice()
      }
      util.each(tmpArray, function (card, c) {
        if (cmprFn(card, bestArray[c])) {
          bestArray = tmpArray
          return false
        }
      })
    }
  })
  return bestArray
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





