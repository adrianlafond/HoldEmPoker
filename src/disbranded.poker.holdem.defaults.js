
;(function (root) {
  'use strict'

  var defaults = {
    maxSeats: 22,
    minSeats: 2,
    seats: 5,
    
    type: NS.LIMIT,
    
    ante: 0,
    
    // 0 for no limit:
    minBet: 10,
    
    // small blind as % of minimum bet:
    smallBlindPerc: 0.5,
    
    // big blind as % of minimum bet:
    bigBlindPerc: 1.0,

    maxRaises: 3,
    unlimitedHeadsUpRaises: true,

    // not planning to implement in initial phase:
    allowStraddle: false,
    allowMississippiStraddle: false,
    allowSleeper: false
  }
  

  /**
   * @returns a copy of the defaults.
   * Original defaults stay intact.
   */
  root.DISBRANDED.poker.holdem.defaults = function () {
    var key,
        obj = {}
    for (key in defaults) {
      if (defaults.hasOwnProperty(key)) {
        obj[key] = defaults[key]
      }
    }
    return obj
  }
  
}(this));