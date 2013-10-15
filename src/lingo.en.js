
;(function (root, factory) {
  /**
   * Module pattern from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory)
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    root.DISBRANDED = root.DISBRANDED || {}
    root.DISBRANDED.Poker = root.DISBRANDED.Poker || {}
    root.DISBRANDED.Poker.lingo = root.DISBRANDED.Poker.lingo || {}
    root.DISBRANDED.Poker.lingo.en = factory()
  }
}(this, function () {
  'use strict'

  return {
    cards: [
      null,
      'High Card',
      'One Pair',
      'Two Pair',
      'Three of a Kind',
      'Straight',
      'Flush',
      'Full House',
      'Four of a Kind',
      'Straight Flush',
      'Royal Flush'
    ],
    low: [
      null,
      'Ace-to-five low',
      'Ace-to-six low',
      'Deuce-to-seven low',
      'Deuce-to-six low'
    ],
    action: [
      null,
      'fold',
      'bet',
      'call',
      'raise'
    ]
  }
}));

