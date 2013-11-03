
;(function (root, factory) {
  /**
   * Module pattern from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['disbranded.poker'], factory)
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require('disbranded.poker'))
  } else {
    // Browser globals (root is window)
    root.DISBRANDED.Poker.game = root.DISBRANDED.Poker.game || {}
    root.DISBRANDED.Poker.game.holdem = factory(root.DISBRANDED.Poker)
  }
}(this, function (Poker) {
  'use strict'

  var p = Poker

  return {
    game: [{
      action: Poker.SHUFFLE

    // deal
    }, {
      action: Poker.DEAL,
      face: Poker.FACE_DOWN
    }, {
      action: Poker.DEAL,
      face: Poker.FACE_DOWN

    // pre-flop
    }, {
      action: Poker.BETTING_ROUND,
      round: [
        Poker.SMALL_BLIND,
        Poker.BIG_BLIND,
        Poker.BET
      ]

    // flop
    }, {
      action: Poker.DEAL,
      face: Poker.COMMUNITY
    }, {
      action: Poker.DEAL,
      face: Poker.COMMUNITY
    }, {
      action: Poker.DEAL,
      face: Poker.COMMUNITY
    }, {
      action: Poker.BETTING_ROUND,
      round: [Poker.BET]

    // turn
    }, {
      action: Poker.DEAL,
      face: Poker.COMMUNITY
    }, {
      action: Poker.BETTING_ROUND,
      round: [Poker.BIG_BET]

    // river
    }, {
      action: Poker.DEAL,
      face: Poker.COMMUNITY
    }, {
      action: Poker.BETTING_ROUND,
      round: [Poker.BIG_BET]
    }]
  }
}));

