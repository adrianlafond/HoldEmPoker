
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
          this._smallBlind()
          break
        case h.BIG_BLIND:
          this._bigBlind()
          break
        case h.DEAL_HOLE_1:
        case h.DEAL_HOLE_2:
          this._dealPlayerCard(NS.FACE_DOWN)
          break
        case h.BET_PRE_FLOP:
          this._betPreFlop()
          break
        default:
          console.log('   next:', h.state[state])
          break
      }
    },
    
    
    _smallBlind: function () {
      var player = this._players.atIndex(0),
          opt = this._options,
          bet = this._players.bet(player.id, opt.smallBlindPerc * opt.minBet)
      this._trigger(NS.holdem.SMALL_BLIND, player.id, { player: player.id, chips: bet })
      this._nextState()
    },
    
    _bigBlind: function () {
      var player = this._players.atIndex(1),
          opt = this._options,
          bet = this._players.bet(player.id, opt.bigBlindPerc * opt.minBet)
      this._trigger(NS.holdem.BIG_BLIND, player.id, { player: player.id, chips: bet })
      this._nextState()
    },
    
    _betPreFlop: function () {
      this._bettingRound(2)
    },
    
    
    
    _dealHoleCards: function () {
      var n = 0,
          len = this._players.total() * 2,
          player,
          card

      while (n++ < len) {
        player = this._nextPlayer()
        card = this._deck.deal()
        this._trigger(NS.DEAL, player.id, { 'card': card, face: NS.FACE_DOWN })
        player.hand.add(this._deck.deal())
      }
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