
;(function (root) {
  'use strict'

  var NS,
  
      defaults = {
        maxSeats: 13,
        minSeats: 2,
        seats: 5
      }
      
  // @namespace
  root.DISBRANDED = (typeof root.DISBRANDED === 'undefined') ? {} : root.DISBRANDED
  root.DISBRANDED.poker = root.DISBRANDED.poker || {}
  NS = root.DISBRANDED.poker
  NS.holdem = NS.holdem || {}


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