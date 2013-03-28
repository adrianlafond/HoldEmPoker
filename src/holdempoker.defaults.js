
;(function (root) {
  'use strict'

  var HEP = root.HOLDEM_POKER || (root.HOLDEM_POKER = {}),
  
      defaults = {
        maxSeats: 13,
        minSeats: 2,
        seats: 5
      }


  /**
   * @returns a copy of the defaults.
   * Original defaults stay intact.
   */
  HEP.defaults = function () {
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