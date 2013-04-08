/**
 * poker.Pot is the model for the main and side pots of a poker hand.
 */
;(function (root, _) {
  'use strict'

  var NS = root.DISBRANDED.poker


  NS.Pot = function () {
    this.reset()
  }
  
  NS.Pot.prototype = {
    
    /**
     * 
     */
    reset: function () {
      this._live = {}
      this._pots = null
      return this
    },
    
    
    /**
     * 
     */
    bet: function (player, amount) {
      if (!_.has(this._live, player)) {
        this._live[player] = { live: false, bet: 0 }
      }
      if (this._live[player].live) {
        this._live[player].bet += amount
      }      
      return this
    },
    
    
    /**
     * Fold/remove player in all pots player is in.
     */
    fold: function (player) {
      if (_.has(this._live, player)) {
        this._live[player].live = false
      }
      return this
    },
    
    
    /**
     * End a round of betting. Create side pots if necessary.
     * @returns array of amounts in all pots.
     */
    end: function () {
      
      
      this._live = {}
      return this
    },


    /**
     * Return the accumulated bet for player with @param id in current betting round.
     */
    getLive: function (id) {
      return (_.has(this._live, id)) ? this._live[id].bet : 0
    },

    
    /**
     * @returns pot at @param index or null if no such pot exists.
     */
    getPot: function (index) {
      return this._pots ? this._pots[index] : null
    },

    
    /**
     * @returns number of pots.
     */
    length: function () {
      return this._pots ? this._pots.length : 0
    }
  }
  
  
  
  /**
   * Designed for internal use with NS.Pot isntances.
   */
  NS.Pot.SidePot = function () {
    this.reset()
  }
  
  NS.Pot.SidePot.prototype = {
    
    reset: function () {
      this._players = []
      this._total = 0
      return this
    },
    

    add: function (id, bet) {
      if (_.indexOf(this._players, id) === -1) {
        this._players.push(id)
        this._total += bet
      }
      return this
    },
    
    
    players: function () {
      return this._players.slice(0)
    },
    
    
    total: function () {
      return this._amount
    }
  }
  
  
}(this, _));