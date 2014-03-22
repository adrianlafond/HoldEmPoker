/**
 * The main Poker class and the returned API.
 * A separate Dealer/Game class will instantiate a Poker instance.
 */
;(function () {
  'use strict'


  var defaults = {

    // Game format.
    game: null,

    // Number of raises allowed per round:
    maxRaises: 3,

    // Type of betting limit:
    limit: FIXED_LIMIT,

    // If high hand, low hand, or both wins/splits the pot.
    high: true,
    low: false
  }



  function validateOptions(options) {
    if (util.isNada(options.game)) {
      throw 'Game format not valid.'
    }
    if (util.isNada(options.game.maxPlayers)) {
      throw 'Game format maximum players not set.'
    }
  }


  /**
   * @constructor
   */
  Poker = function (options) {
    var options,
        table,
        pot,
        round

    if (!(this instanceof Poker)) {
      return new Poker(options)
    }

    /*************************************************************************
     * Public privileged (and therefor not prototype) methods.
     *************************************************************************/
    this.setOption = function (key, val) {
      return this
    }

    this.getOption = function (key) {
      return null
    }

    options = util.extend({}, defaults, options || {})
    validateOptions(options)

    table = new Table({ seats: options.game.maxPlayers })

    util.each(options, function (val, key) {
      this.setOption(key, val)
    }, this)
  }


  Poker.prototype = {
    //
  }
}());
