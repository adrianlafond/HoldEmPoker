/**
 * Players is the model for current players of a poker game.
 */
;(function (root) {
  'use strict'

  var NS = root.DISBRANDED.poker
  
  NS.Players = function (game) {
    this._game = game
    this._players = []
    this._removed = []
    this._index = 0
  }
  
  NS.Players.prototype = {
    
    
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

    get: function (id) {
      return _.findWhere(this._players, { 'id': id }) || null
    },
    
    atSeat: function (seat) {
      return _.findWhere(this._players, { 'seat': seat }) || null
    },
    
    
    total: function () {
      return this._players.length
    },


    add: function (id, chips, seat) {
      var player
      if (!this._game.playing()) {
        player = this.get(id)
        if (!player) {
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
        }
      }
      return this
    },
    

    addAtSeat: function (id, chips, seat) {
      return this.add(id, chips, seat)
    },
    

    addChips: function (id, amount) {
      var player = this.get(id)
      if (player) {
        player.chips += amount
      }
      return this
    },
    
    
    remove: function (id) {
      var i,
          player = this.get(id)
          
      if (player) {
        
        // If hand in progress, fold now and remove later.
        if (this._game.playing()) {
          player.folded = true
          this._removed.push(id)
        
        // If hand not in progress, remove immediately.
        } else {
          for (i = this._players.length - 1; i >= 0; i--) {
            if (this._players[i].id === id) {
              this._players.splice(i, 1)
              break
            }
          }
        }
      }
      return this
    },
    
    
    removeAtSeat: function (seat) {
      var player = this.atSeat(seat)
      if (player) {
        this.remove(player.id)
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
      return {
        button: _.last(this._players).id
      }
    },
    
    
    /**
     * Called after a hand is complete, if any players were removed
     * whle the hand was in progress.
     */
    removePlayers: function () {
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
  }
}(this));