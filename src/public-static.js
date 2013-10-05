/**
 * Static classes and properties made accessible
 * via the public Poker API.
 */
Poker.Deck = Deck
Poker.Hand = Hand


/**
 * @param {string} lang
 * @returns poker lingo for a particular language. Defaults to English.
 */
Poker.lingo = function (lang) {
  lang = lang || 'en'
  if (lingo.hasOwnProperty(lang)) {
    return {
      cards: _.extend({}, lingo[lang].cards)
    }
  }
  return null
}



