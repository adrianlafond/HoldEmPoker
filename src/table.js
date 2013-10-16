/**
 * Poker.Table
 */
;(function () {
  'use strict'


  var defaults = {
    seats: 5
  }


  /**
   * @constructor
   */
  Table = function (options) {
    this.options = util.extend({}, defaults, options || {})
    this.players = []
  }

  Table.prototype = {

    /**
     * Add a player to the table. Options:
     *   seat {number} Optional; will overwrite any player already at the
     *     index; if absent, player will be seated first available seat;
     *     if seat index does not exist, player will not be added.
     *   player {Player}
     */
    add: function (options) {
      var index,
          tmpIndex
      if (options.hasOwnProperty('seat')) {
        tmpIndex = +options.seat
        if (util.isInteger(tmpIndex) && tmpIndex >= 0 && tmpIndex < this.options.seats) {
          index = tmpIndex
        }
      }
      if (index === undefined) {
        util.times(this.options.seats, function (i) {
          if (util.isNada(this.players[i])) {
            index = i
            return false
          }
        }, this)
      }
      if (index !== undefined) {
        this.remove(index)
        this.players[index] = options.player
      }
    },


    /**
     * Remove a player from the table.
     * @param {string} id Remove the player with that id.
     * @param {number} id Remove the player at that seat index.
     */
    remove: function (id) {
      var index
      if (util.isString(id)) {
        util.each(this.players, function (player, i) {
          if (player && player.id === id) {
            index = i
            return false
          }
        })
      } else if (util.isInteger(id)) {
        if (this.players[id]) {
          index = id
        }
      }
      if (index !== undefined) {
        this.players.spice(index, 1)
        // fire player removed event
      }
    },


    /**
     * Return the player seated at @param index.
     */
    at: function (index) {
      return this.players[index] || null
    },


    /**
     * Remove all players from the table.
     */
    reset: function () {
      this.players = []
    },

    /**
     * Returns the id of the player with the dealer button.
     */
    button: function () {
      //
    },

    /**
     * Push the button to next player, before the start of a new hand.
     */
    advance: function () {
      //
    }
  }
}());




