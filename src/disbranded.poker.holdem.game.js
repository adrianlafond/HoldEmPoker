
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
    },
    
    
    _dealHoleCards: function () {
      var n = 0,
          len = this._players.total() * 2,
          player,
          card

      while (n++ < len) {
        try {
          player = this._players.next()
        } catch (e) {
          this._trigger(NS.ERROR, e.code, { message: e.message })
        }
        card = this._deck.deal()
        this._trigger(NS.DEAL, player.id, { 'card': card, face: NS.FACE_DOWN })
        player.hand.add(this._deck.deal())
      }
    },

    
    
    deal: function (options) {
      if (!this.playing()) {
        this._playing = true
        NS.Game.prototype.deal.call(this, options)
        this._dealHoleCards()
        this._burn()
      }
      return this
    } 
  }
  
  
  
  NS.Game.extend(NS.holdem.Game)
  
}(this, _));