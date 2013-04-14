
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
      this._state = 0
      this._deck = new NS.Deck
      this._pot = new NS.Pot
      this._players = new NS.Players(_.bind(this._trigger, this))
    },
    
    
    _validate: function () {
      var result
      this._state = 1
      
      result = this._players.validate(this.get('minSeats'), this.get('seats'))
      if (result.invalid) {
        this._trigger(result.type, result.code, { message: result.message })
        this._state = 0
      }

      return this._state !== 0
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
    
    
    
    _nextPlayer: function () {
      var player
      try {
        player = this._players.next()
      } catch (e) {
        this._trigger(NS.ERROR, e.code, { message: e.message })
      }
      return player
    },

    
    
    /**
     * Advances the state.
     */
    _nextState: function () {
      this._state += 1
      if (this._state < this.gameState.length) {
        this._playState()
      } else {
        this._endHand()
      }
    },
    
    
    _ante: function () {
      var id, player, bet
      if (this._options.ante > 0) {
        while (true) {
          player = this._nextPlayer()
          if (!id) {
            id = player.id
          } else if (player.id === id) {
            break
          }
          bet = this._players.bet(player.id, this._options.ante)
          this._trigger(NS.ANTE, player.id, { player: player.id, chips: bet })
        }
      }
      this._nextState()
    },
    
    
    _dealPlayerCard: function (face) {
      var startId = null,
          player,
          card
      while (true) {
        player = this._nextPlayer()
        card = this._deck.deal()
        player.hand.add(card)
        this._trigger(NS.DEAL, player.id, { 'card': card, 'face': face })
        if (player.id === this._players.button()) {
          break
        }
      }
      this._nextState()
    },
    
    
    /**
     * TODO: "pause" betting round; eg, collect blinds, then deal cards, then continue.
     *       Do in conjunction with update to _players.next().
     */
    _bettingRound: function (startIndex) {
      var player,
          n = 0

      // Optionally start with a player other than the first player,
      // eg, after blinds. Code below skips players before the index.
      startIndex = _.isUndefined(startIndex) ? 0 : startIndex
      while (n++ < startIndex) {
        player = this._nextPlayer()
      }
      
      player = this._nextPlayer()
      this._trigger(NS.ACTION_TODO, player.id, {
        check: true,// true/false if check is an option
        call: 0,//call 0 = check; or # to call
        minRaise: 0,//0 if raises not possible
        maxRaise: 0//0 if raises not possible
      })
    },
    
    
    _burn: function () {
      var card = this._deck.deal()
      this._trigger(NS.DEAL, NS.BURN, { card: card, face: NS.FACE_DOWN })
    },
    
    
    _endHand: function () {
      this._state = 0
      this._players.handEnded()
      this._deck.reset()
      this._pot.reset()
    },



    /**
     * @returns {boolean} TRUE if a hand is in progress.
     */
    playing: function () {
      return this._state !== 0
    },
    
    /**
     * @returns {boolean} FALSE is hand is in progress.
     */
    notPlaying: function () {
      return this._state === 0
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
      if (this.notPlaying()) {
        this._options[key] = value
      }
      return this
    },
    

    /**
     * If hand is not in progress, add a new player.
     * @param seat is optional.
     */
    addPlayer: function (id, chips, seat) {
      if (this.notPlaying()) {
        this._players.add(id, chips, seat)
      }
      return this
    },
    
    /**
     * Give @param chips to player with @param id.
     */
    addChipsForPlayer: function (id, chips) {
      this._players.addChips(id, chips)
      return this
    },
    
    
    /**
     * @param idOrSeat {string|number}
     */
    removePlayer: function (idOrSeat) {
      if (_.isString(idOrSeat)) {
        this._players.remove(idOrSeat, this.playing())
      } else if (_.isNumber(idOrSeat)) {
        this._players.removeAtSeat(idOrSeat, this.playing())
      }
      return this
    },
    
    
    /**
     * @returns {number} of players.
     */
    playersTotal: function () {
      return this._players.total()
    },
    
    /**
     * @returns {object} of player with @param id.
     */
    getPlayer: function (id) {
      return _.clone(this._players.get(id))
    },
    
    /**
     * @returns {object} of player at @param seat.
     */
    getPlayerAtSeat: function (seat) {
      return _.clone(this._players.atSeat(seat))
    },
    
    
    
    /**
     * Begin a new hand, if a hand is not already in progress.
     */
    deal: function (options) {
      var obj
      if (this.notPlaying()) {
        _.extend(this._options, options)
        if (this._validate()) {
          obj = this._players.handStarted()        
          this._trigger(NS.BUTTON, obj.button, { player: obj.button })
          this.trigger(NS.BEGIN)
          this._deck.shuffle()
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