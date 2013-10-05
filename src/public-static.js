/**
 * Static classes and properties made accessible
 * via the public Poker API.
 */
Poker.Deck = Deck


/**
 * @param {string} lang
 * @returns poker lingo for a particular language. Defaults to English.
 */
Poker.lingo = function (lang) {
  lang = lang || 'en'
  return lingo.hasOwnProperty(lang) ? lingo[lang] : null
}



