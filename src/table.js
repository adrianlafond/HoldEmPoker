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
    this.reset()
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
          tmpIndex,
          player

      // Either add player or read options.
      if (options instanceof Player) {
        player = options
      } else {
        player = options.player
        if (options.hasOwnProperty('seat')) {
          tmpIndex = +options.seat
          if (util.isInteger(tmpIndex) && tmpIndex >= 0 && tmpIndex < this.options.seats) {
            index = tmpIndex
          } else {
            return this
          }
        }
      }

      // If player is already seated, unseat him.
     this.remove(player)

      // Find seat index if it has not already been set.
      if (index === undefined) {
        util.times(this.options.seats, function (i) {
          if (util.isNada(this.seats[i])) {
            index = i
            return false
          }
        }, this)
      }

      // Seat the player.
      if (index !== undefined) {
        this.remove(index)
        this.seats[index] = player
      }
      return this
    },


    /**
     * Remove a player from the table.
     * @param {string} id Remove the player with that id.
     * @param {number} id Remove the player at that seat index.
     * @param {Player} id Remove the player.
     */
    remove: function (id) {
      var index
      if (id instanceof Player) {
        id = id.id
      }
      if (util.isString(id)) {
        util.each(this.seats, function (player, i) {
          if (player && player.id === id) {
            index = i
            return false
          }
        })
      } else if (util.isInteger(id)) {
        if (this.seats[id]) {
          index = id
        }
      }
      if (index !== undefined) {
        this.seats[index] = null
        // fire player removed event
      }
      return this
    },


    /**
     * Return the player seated at @param index.
     */
    at: function (index) {
      return this.seats[index] || null
    },


    /**
     * Return the seat index for player with @param id.
     * Or return the seart index for @param {Player} id.
     * Returns -1 if not found.
     */
    indexOf: function (id) {
      var index = -1,
          id = (id instanceof Player) ? id.id : id
      util.each(this.seats, function (player, i) {
        if (player && player.id === id) {
          index = i
          return false
        }
      }, this)
      return index
    },

    /**
     * Returns the player with the dealer button.
     */
    button: function () {
      var n = this.options.seats
      while (n-- > 0) {
        if (this.seats[n]) {
          return this.seats[n]
        }
      }
      return null
    },

    /**
     * Push the button to next player, before the start of a new hand.
     */
    advance: function () {
      this.seats.unshift(this.seats.pop())
      return this
    },


    /**
     * Remove all players from the table.
     */
    reset: function () {
      this.seats = []
      util.times(this.options.seats, function (index) {
        this.seats[index] = null
      }, this)
      return this
    },
  }
}());




