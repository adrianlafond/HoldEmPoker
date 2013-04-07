/**
 * poker.Pot is the model for the main and side pots of a poker hand.
 */
;(function (root) {
  'use strict'

  var NS = root.DISBRANDED.poker
  
  NS.Pot = function () {
    this.reset()
  }
  
  NS.Pot.prototype = {
    
    
    /**
     * TODO: if amount < minBet, create new SidePot.
     */
    bet: function (player, amount) {
      this.current().bet(player, amount)
      return this
    },
    
    
    /**
     * Get or set the minium bet.
     */
    minBet: function () {
      if (arguments.length === 0) {
        return this.current().minBet()
      }
      this.current().minBet(parseFloat(arguments[0]))
      return this
    },
    
    
    /**
     * Fold/remove player in all pots player is in.
     */
    fold: function (player) {
      _.each(this._pots, function (pot, index) {
        pot.fold(player)
      })
      return this
    },
    
    
    /**
     * @returns pot at @param index or null if no such pot exists.
     */
    get: function (index) {
      return (index in this._pots) ? this._pots[index] : null
    },
    
    /**
     * @returns currently active pot.
     */
    current: function () {
      return this.get(this._index)
    },
    
    
    /**
     * @returns amount in pot at @param index.
     */
    amount: function (index) {
      var pot = this.get(index)
      return pot ? pot.amount() : 0
    },
    
    /**
     * @returns number of pots.
     */
    length: function () {
      return this._pots.length
    },
    
    /**
     * Empties main pot and deletes side pots. Back to original state.
     */
    reset: function () {
      this._pots = [new NS.Pot.SidePot]
      this._index = 0
      return this
    }
  }
  
  
  
  /**
   * Designed for internal use with NS.Pot isntances.
   */
  NS.Pot.SidePot = function () {
    this._players = {}
    this._minBet = 0
  }
  
  NS.Pot.SidePot.prototype = {
    
    /**
     * @returns player with @param id.
     * If player does not already exist, creates him.
     */
    player: function (id) {
      if (!(id in this._players)) {
        this._players[id] = { amount: 0 }
      }
      return this._players[id]
    },
    
    /**
     * Add @param amount to the pot for player with @param id.
     */
    bet: function (id, amount) {
      this.player(id).amount += amount
      return this
    },
    
    
    /**
     * Get or set the minium bet.
     */
    minBet: function () {
      if (arguments.length === 0) {
        return this._minBet
      }
      this._minBet = parseFloat(arguments[0])
      return this
    },
    
    /**
     * Fold player with @param id.
     */
    fold: function (id) {
      delete this.player(id)
      return this
    },
  
    /**
     * @returns total amount in pot.
     */
    amount: function () {
      var n = 0
      _.each(this._players, function (player) {
        n += player.amount
      })
      return n
    },
  }
  
  
}(this));