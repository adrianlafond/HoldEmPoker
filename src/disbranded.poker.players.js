/**
 * Players is the model for current players of a poker game.
 */
;(function (root) {
  'use strict'

  var NS = root.DISBRANDED.poker
  
  NS.Players = function (trigger) {
    this.trigger = trigger
    this._players = []
    this._removed = []
    this._index = 0
    this._button = null
  }
  
  NS.Players.prototype = {
    
    
    /**
     * TODO: return instead a array of non-folded, non-allin players
     *       and the game itself will keep track of index. That' because
     *       the problem the next() method is that it lacks context.
     */
    next: function () {
      var n = 0,
          index = this._index,
          len = this.total(),
          player
      while (++n < len) {
        player = this._players[index]
        ++index
        if (index >= len) {
          index = 0
        }
        if (!player.folded && !player.allin) {
          this._index = index
          return player
        }
      }
      throw { code: NS.NO_NEXT_PLAYER, message: 'Next player could not be discovered.'}
    },
    
    
    button: function () {
      return this._button
    },
    
    
    /**
     * Do not call if player is folded or allin.
     */
    bet: function (id, chips) {
      var player = this.get(id),
          betChips = Math.min(player.chips, chips)
      player.chips = Math.max(0, player.chips - betChips)
      if (player.chips === 0) {
        player.allin = true
      }
      return betChips
    },


    get: function (id) {
      return _.findWhere(this._players, { 'id': id }) || null
    },
    
    atIndex: function (index) {
      return (index in this._players) ? this._players[index] : null
    },
    
    atSeat: function (seat) {
      return _.findWhere(this._players, { 'seat': seat }) || null
    },
    
    
    total: function () {
      return this._players.length
    },


    add: function (id, chips, seat) {
      var player
      if (this.get(id) === null) {
        if (!seat && seat !== 0) {
          player = _.last(this._players)
          seat = player ? (player.seat + 1) : 0
        }
        seat = Math.max(0, parseInt(seat, 10))
        this.removeAtSeat(seat)
        player = {
          'id': id,
          'chips': chips,
          'seat': seat,
          'folded': false,
          'allin': false,
          'hand': new NS.Hand(id)
        }
        this._players.push(player)
        this._players.sort(function (a, b) {
          return a.seat - b.seat
        })
        this.trigger(NS.ADDED, NS.PLAYER, _.clone(player))
      }
      return this
    },

    

    addChips: function (id, amount) {
      var player = this.get(id)
      if (player) {
        player.chips += amount
        this.trigger(NS.ADDED, NS.CHIPS, _.clone(player))
      }
      return this
    },
    
    
    remove: function (id, playing) {
      var i,
          player = this.get(id)
          
      if (player) {
        
        // If hand in progress, fold now and remove later.
        if (playing) {
          player.folded = true
          this._removed.push(id)
        
        // If hand not in progress, remove immediately.
        } else {
          for (i = this._players.length - 1; i >= 0; i--) {
            if (this._players[i].id === id) {
              this._players.splice(i, 1)
              this.trigger(NS.REMOVED, NS.PLAYER, _.clone(player))
              break
            }
          }
        }
      }
      return this
    },
    
    
    removeAtSeat: function (seat, playing) {
      var player = this.atSeat(seat)
      if (player) {
        this.remove(player.id, playing)
      }
      return this
    },

    
    
    validate: function (minSeats, seats) {
      var playerLen = this._players.length,
          error = { type: 'error' }
      if (playerLen < minSeats) {
        error.code = NS.TOO_FEW_PLAYERS
        error.message = 'Not enough players. '+ minSeats  +' required.'
      } else if (playerLen > seats) {
        error.code = NS.TOO_MANY_PLAYERS
        error.message = 'Too many players. Maximum is '+ seats  +'.'
      }
      error.invalid = !!error.code
      return error
    },
    
    
    handEnded: function () {
      this.removePlayers()
    },
    
    handStarted: function () {
      this._players.unshift(this._players.pop())
      this._button = _.last(this._players).id
      return {
        button: this._button
      }
    },
    
    
    /**
     * Called after a hand is complete, if any players were removed
     * whle the hand was in progress.
     */
    removePlayers: function () {
      var r = this._removed.length - 1,
          p,
          player
      for (; r >= 0; r--) {
        p = this._players.length - 1
        for (; p >= 0; p--) {
          if (this._players[p].id === this._removed[r]) {
            player = _.clone(this._players[p])
            this._players.splice(p, 1)
            this.trigger(NS.REMOVED, NS.PLAYER, player)
            break
          }
        }
      }
    },
  }
}(this));