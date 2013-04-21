
;(function (root, _) {
  'use strict'

  var NS = root.DISBRANDED.poker


  /**
   * 
   */
  NS.holdem.Game = function (options) {        
    if (!(this instanceof NS.holdem.Game)) {
      return new NS.holdem.Game(options)
    }
    this._init(options)
  }
  
  
  
  /**
   * @public API
   */
  NS.holdem.Game.prototype = {
    
    _init: function (options) {
      NS.Game.prototype._init.call(this, options)
      _.extend(this._options, NS.holdem.defaults())
      this.gameState = NS.holdem.state
    },
    
    

    
    
    /**
     * Plays the current states.
     */
    _playState: function (state) {
      var h = NS.holdem
      state = (_.isUndefined(state)) ? this._state : state 
      switch (h.state[state]) {
        case h.ANTE:
          this._ante()
          break
        case h.SMALL_BLIND:
          this._bettingRound()
          break
        case h.BIG_BLIND:
          this._turn()
          break
        case h.DEAL_HOLE_1:
        case h.DEAL_HOLE_2:
          this._dealPlayerCards(NS.FACE_DOWN)
          break
        case h.BET_PRE_FLOP:
          this._turn()
          break
        case h.FLOP:
          this._dealFlop()
          break
        case h.BET_FLOP:
          this._bettingRound()
          break
        case h.TURN:
          this._dealTurn()
          break
        case h.BET_TURN:
          this._bettingRound()
          break
        case h.RIVER:
          this._dealRiver()
          break
        case h.BET_RIVER:
          this._bettingRound()
          break
        case h.SHOWDOWN:
          this._showdown()
          break
      }
    },
    
    
    _blind: function (type) {
      var opt = this._options,
          player,
          bet
      if (this._players.headsup() && type === NS.holdem.SMALL_BLIND) {
        this._live.index = 1
      }
      player = this._live.players[this._live.index]
      bet = opt.minBet * ((type === NS.holdem.SMALL_BLIND) ? opt.smallBlindPerc : opt.bigBlindPerc)
      bet = this._players.bet(player.id, bet)
      this._pot.bet(player.id, bet)
      this._trigger(type, player.id, { player: player.id, chips: bet })
      this._live.index++
      this._nextState()
    },
    
    
    /**
     * @see http://www.holdemreview.com/texas-holdem-heads-up-rules/
     * @overrides poker.game._turn()
     */
    _turn: function () {
      var state = NS.holdem.state[this._state]
      if (state === NS.holdem.SMALL_BLIND || state === NS.holdem.BIG_BLIND) {
        this._blind(state)
      } else {
        NS.Game.prototype._turn.call(this)
      }      
    },   
    
    
    /**
     * @overrides poker.game._betLimit()
     */
    _betLimit: function () {
      return (this._state < NS.holdem.TURN) ? this._options.minBet : (this._options.minBet * 2)
    },

    
    _dealFlop: function () {
      this._burn()
      this._dealCommunity()
      this._dealCommunity()
      this._dealCommunity()
      this._nextState()
    },
    
    _dealTurn: function () {
      this._burn()
      this._dealCommunity()
      this._nextState()
    },
    
    _dealRiver: function () {
      this._burn()
      this._dealCommunity()
      this._nextState()
    },
    
    
    deal: function (options) {
      NS.Game.prototype.deal.call(this, options)
      if (this.playing()) {
        this._playState()
      }
      return this
    },
    
    
    /**
     * 
     */
    play: function (id, action, chips) {
      console.log(id, action)
    }
  }
  
  
  
  NS.Game.extend(NS.holdem.Game)
  
}(this, _));