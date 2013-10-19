;(function () {
  'use strict'


  var defaults = {
    maxRaises: 3,
    limit: 0
  }


  /**
   * A round of betting, before bets are added to the pot.
   */
  Round = function () {
    this.options = util.extend({}, defaults, options || {})
    this.reset()
  }


  Round.prototype = {

    reset: function () {
      this.bets = []
    }
  }
}());



