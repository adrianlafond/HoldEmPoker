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
 *   @returns highest flush found unless options.low is true.
 */
Hand.findFlush = function () {
  var param = (arguments.length > 0) ? arguments[0] : null,
      cards = null,
      sorted = false,
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
    sorted = param.sorted === true
    low = param.low === true
  }

  // Make sure cards array is valid.
  if (!_.isArray(cards) || cards.length < 5) {
    return null
  }

  cards = cards.slice(0)
  if (!sorted) {
    Hand.sortByRank(cards)
  }
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
 * @returns { cards: [best flush found] }
 */
Hand.findStraightFlush = function () {
  var param = (arguments.length > 0) ? arguments[0] : null,
      cards,
      flush = false,
      sorted = false,
      low = false,
      result

  // Interpret arguments.
  if (_.isArray(param)) {
    cards = param
  } else if (_.isObject(param)) {
    cards = param.cards
    flush = param.flush === true
    sorted = param.sorted === true
    low = param.low === true
  }

  // Make sure cards array is valid.
  if (!_.isArray(cards) || cards.length < 5) {
    return null
  }

  cards = cards.slice(0)
  if (!sorted) {
    Hand.sortByRank(cards)
  }

  // Make sure cards are a flush.
  if (!flush) {
    if (result = Hand.findFlush({ cards: cards, sorted: sorted, low: low })) {
      cards = result.cards
    } else {
      return null
    }
  }

  if (result = Hand.findStraight({ cards: cards, sorted: sorted, low: low })) {
    result.royalFlush = Hand.rank(result.cards[0]) === 'A'
  }
  return result
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
 * @returns { cards: [best straight found] }
 */
Hand.findStraight = function () {
  var param = (arguments.length > 0) ? arguments[0] : null,
      cards,
      sorted = false,
      low = false,
      tmpStr8 = null,
      str8 = null,
      c, clen,
      r = -1,
      tmpIndex

  // Interpret arguments.
  if (_.isArray(param)) {
    cards = param
  } else if (_.isObject(param)) {
    cards = param.cards
    sorted = param.sorted === true
    low = param.low === true
  }

  // Make sure cards array is valid.
  if (!_.isArray(cards) || cards.length < 5) {
    return null
  }

  cards = cards.slice()
  if (!sorted) {
    Hand.sortByRank(cards)
  }

  clen = cards.length
  for (c = 0; c < clen; c++) {
    if (r === -1) {
      // No straight cards yet, so start a straight with current card.
      r = Hand.RANKS.indexOf(Hand.rank(cards[c]))
      tmpStr8 = [cards[c]]

    } else {
      // A straight is in the works and it must be determined
      // if the current loop card can be added to it.
      tmpIndex = Hand.RANKS.indexOf(Hand.rank(cards[c]))

      if (tmpIndex === r) {
        // If rank is same as last card in the straight, skip.
        continue
      } else if (tmpIndex === r + 1) {
        // If rank is next after the last card in the straight, add it.
        r = tmpIndex
        tmpStr8.push(cards[c])
      } else {
        // Current loop card does not fit onto the straight.
        if (tmpStr8.length >= 5) {
          str8 = tmpStr8.slice()
          tmpStr8 = null
          if (!low) {
            break
          }
        }
        // If enough cards are left, see if there is still a straight in them.
        if (clen - (c + 1) >= 5) {
          r = -1
          tmpStr8 = null
        }
      }
    }
  }

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
      sets = [],
      r,
      n,
      set,
      c, clen,
      slen,
      remainderIndex = 0,
      kickers,
      type

  // Interpret arguments.
  if (_.isArray(param)) {
    cards = param
  } else if (_.isObject(param)) {
    cards = param.cards
    sorted = param.sorted === true
  }

  // Make sure cards array is valid.
  if (!_.isArray(cards) || cards.length < 5) {
    return null
  }

  cards = cards.slice()
  if (!sorted) {
    Hand.sortByRank(cards)
  }

  n = 0
  clen = cards.length

  // Find sets, including sets of one.
  for (r = 1; r < 13; r++) {
    set = []
    for (c = n; c < clen; c++) {
      if (Hand.RANKS.indexOf(Hand.rank(cards[c])) === r) {
        set.push(cards[c])
        if (r === 12) {
          sets.push(set)
        }
      } else if (set.length >= 1) {
        n = c++
        sets.push(set)
        break
      }
    }
  }

  // Sort sets by set size.
  sets.sort(function (a, b) {
    return Math.max(-1, Math.min(1, b.length - a.length))
  })

  // Separate the sets that matter from those that don't.
  for (c = 0; c < 2; c++) {
    slen = sets[c].length
    if (slen >= 3) {
      if (slen === 4) {
        remainderIndex = 1
        break
      }
    } else if (sets[c].length >= 2) {
      remainderIndex = c + 1
    }
  }

  // Sort the kickers.
  kickers = []
  for (c = remainderIndex, clen = sets.length; c < clen; c++) {
    if ((slen = sets[c].length) > 1) {
      kickers = kickers.concat[sets[c]]
    } else {
      kickers.push(sets[c][0])
    }
  }
  kickers.sort(Hand.compareCardsByRank)

  // Delete the kickers from the sets.
  sets = sets.slice(remainderIndex)

  // Determine type
  switch (sets[0].length) {
    case 4:
      type = Hand.FOUR_OF_A_KIND
      break
    case 3:
      //

  }

  if (sets.length) {
    return {
      sets: sets,
      kickers: kickers,
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
      a = 1,
      alen = array.length,
      c, clen,
      bestArray = array[0].slice(),
      tmpArray

  for (; a < alen; a++) {
    clen = array[a].length
    if (low) {
      tmpArray = array[a].slice(Math.max(0, clen - 5))
      clen = tmpArray.length
    } else {
      tmpArray = array[a].slice()
    }
    for (c = 0; c < clen; c++) {
      if (cmprFn(tmpArray[c], bestArray[c])) {
        bestArray = tmpArray
        break
      }
    }
  }
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





