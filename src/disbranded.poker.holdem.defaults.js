
;(function (root) {
  'use strict'

  var NS = root.DISBRANDED.poker,
      defaults


  defaults = {
    maxSeats: 22,
    minSeats: 2,
    seats: 5,
    
    ante: 0,
    
    // 0 for no limit:
    minBet: 10,
    
    // small blind as % of minimum bet:
    smallBlindPerc: 0.5,
    
    // big blind as % of minimum bet:
    bigBlindPerc: 1.0,

    // not planning to implement in initial phase:
    allowStraddle: false,
    allowMississippiStraddle: false,
    allowSleeper: false,

    type: NS.LIMIT
  }
  

  /**
   * @returns a copy of the defaults.
   * Original defaults stay intact.
   */
  NS.holdem.defaults = function () {
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