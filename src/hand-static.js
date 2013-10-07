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
      flush = null

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


  return flush
}



