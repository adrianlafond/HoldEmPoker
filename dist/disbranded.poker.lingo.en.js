
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
    // Browser globals (root is window)}
    root.POKER.lingo = root.POKER.lingo || {}
    root.POKER.lingo.en = factory()
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
      'Ace-to-five Low',
      'Ace-to-six Low',
      'Deuce-to-seven Low',
      'Deuce-to-six Low'
    ],
    card: [
      'Dace Down',
      'Face Up',
      'Community'
    ],
    action: [
      null,
      'Fold',
      'Bet',
      'Call',
      'Raise'
    ],
    limit: [
      'Fixed Limit',
      'Fpread Limit',
      'Pot Limit',
      'No Limit',
      'Cap Limit'
    ],
    game: [
      'Shuffle',
      'Burn',
      'Deal',
      'Round',
      'Ante',
      'Blind',
      'Small Blind',
      'Big Blind',
      'Big Bet'
    ]
  }
}));
