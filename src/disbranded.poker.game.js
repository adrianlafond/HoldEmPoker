
/**
 * poker.Game is an abstract base class that specific types
 * of poker game will extend.
 */
;(function (root, _) {
  'use strict'

  var NS = root.DISBRANDED.poker
  
  /**
   *
   */
  NS.Game = function () {}
  
  NS.Game.prototype = {
    
    _init: function (options) {
      this._options = options ? _.extend(NS.defaults(), options) : NS.defaults()
      this._playing = false
      this._deck = new NS.Deck
      this._pot = new NS.Pot
      this._players = []
      this._removed = []
    },

    _getPlayer: function (id) {
      return _.findWhere(this._players, { 'id': id }) || null
    },
    
    _getPlayerAtSeat: function (seat) {
      return _.findWhere(this._players, { 'seat': seat }) || null
    },
    
    _removePlayers: function () {
      var r = this._removed.length - 1,
          p
      for (; r >= 0; r--) {
        p = this._players.length - 1
        for (; p >= 0; p--) {
          if (this._players[p].id === this._removed[r]) {
            this._players.splice(p, 1)
            break
          }
        }
      }
    },
    
    
    _validatePlayers: function () {
      var playerLen = this._players.length,
          type,
          code,
          message
      if (playerLen < this.get('minSeats')) {
        type = 'error',
        code = NS.TOO_FEW_PLAYERS
        message = 'Not enough players. '+ this.get('minSeats')  +' required.'
      } else if (playerLen > this.get('seats')) {
        type = 'error',
        code = NS.TOO_MANY_PLAYERS
        message = 'Too many players. Maximum is '+ this.get('seats')  +'.'
      }
      if (type) {
        this._trigger(type, code, { 'message': message })
        return false
      }
      return true
    },
    
    
    _validate: function () {
      var error = false
      if (!this._validatePlayers()) {
        error = true
      }
      return !error
    },
    
    
    _trigger: function (type, code, data) {
      var evt = data || {}
      evt.type = type
      evt.code = code || null
      this.trigger(evt)
      if (evt.code) {
        evt.type += '.' + evt.code
        this.trigger(evt)
      }
    },


    /**
     * @returns {boolean} TRUE if a hand is in progress.
     */
    playing: function () {
      return this._playing
    },
    
    
    /**
     * @returns value in options for @param key.
     */
    get: function (key) {
      return _.has(this._options, key) ? this._options[key] : null
    },
    
    /**
     * Set an option with @param key to @param value.
     * Options can be changed only when a hand is not progress.
     */
    set: function (key, value) {
      if (!this.playing()) {
        this._options[key] = value
      }
      return this
    },
    
    
    /**
     * 
     */
    getPlayer: function (id) {
      var player = this._getPlayer(id)
      return player ? _.clone(player) : null
    },
    
    /**
     * 
     */
    getPlayerAtSeat: function (seat) {
      var player = this._getPlayerAtSeat(seat)
      return player ? _.clone(player) :  null
    },
    
    /**
     * 
     */
    addPlayer: function (id, chips, seat) {
      var player
      if (!this.playing()) {
        player = this._getPlayer(id)
        if (!player) {
          if (!seat && seat !== 0) {
            player = _.last(this._players)
            seat = player ? (player.seat + 1) : 0
          }
          seat = Math.max(0, parseInt(seat, 10))
          // seat %= this.get('seats')
          this.removePlayerAtSeat(seat)
          player = {
            'id': id,
            'chips': chips,
            'seat': seat,
            'folded': false,
            'allin': false
          }
          this._players.push(player)
          this._players.sort(function (a, b) {
            return a.seat - b.seat
          })
        }
      }
      return this
    },
    
    /**
     * Same as addPlayer(id, chips, seat).
     */
    addPlayerAtSeat: function (id, chips, seat) {
      return this.addPlayer(id, chips, seat)
    },
    
    
    removePlayer: function (id) {
      var player = this._getPlayer(id),
          i, len
      if (player) {
        if (this.playing()) {
          player.folded = true
          this._removed.push(id)
        } else {
          for (i = 0, len = this._players.length; i < len; i++) {
            if (this._players[i].id === id) {
              this._players.splice(i, 1)
              break
            }
          }
        }
      }
      return this
    },
    
    
    removePlayerAtSeat: function (seat) {
      var player = this._getPlayerAtSeat(seat)
      if (player) {
        this.removePlayer(player.id)
      }
      return this
    },
    
    
    /**
     * Add @param amount of chips to player with @param id.
     */
    addChips: function (id, amount) {
      var player = this.getPlayer(id)
      if (player) {
        player.chips += amount
      }
      return this
    },
    
    
    /**
     * Begin a new hand, if a hand is not already in progress.
     */
    deal: function (options) {      
      if (!this.playing()) {
        _.extend(this._options, options)
        if (this._validate()) {
          this._players.unshift(this._players.pop())
          this._trigger('change', 'button', { player: this._players[this._players.length - 1].id })
        }        
      }
      return this
    }
  }
  
  
  // Mixin event publishing methods.
  NS.util.events.call(NS.Game.prototype)
  
  
  
  /**
   * Util to extend a specific game from this abstract game.
   */
  NS.Game.extend = function (ChildGame) {
    ChildGame.prototype = _.extend(new NS.Game, ChildGame.prototype)
    ChildGame.prototype.constructor = ChildGame
  }
  
}(this, _));