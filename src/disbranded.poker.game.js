
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
      this._players = new NS.Players(this)
    },
    
    
    _validate: function () {
      var error = false,
          result
          
      result = this.players().validate(this.get('minSeats'), this.get('seats'))
      if (result.invalid) {
        this._trigger(result.type, result.code, { message: result.message })
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
    
    
    _burn: function () {
      var card = this._deck.deal()
      this._trigger(NS.DEAL, NS.BURN, { 'card': card, face: NS.FACE_DOWN })
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
     * @returns the players model.
     */
    players: function () {
      return this._players
    },
    
    
    
    endHand: function () {
      this._playing = false
      this._players.handEnded()
      this._deck.reset()
    },
    
    
    
    /**
     * Begin a new hand, if a hand is not already in progress.
     */
    deal: function (options) {      
      var obj
      _.extend(this._options, options)
      if (this._validate()) {
        obj = this.players().handStarted()        
        this._trigger('change', NS.BUTTON, { player: obj.button })
        this._trigger('change', NS.HAND_BEGIN)
        this._deck.shuffle()
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