
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
          len = this.players().total() * 2,
          player

      while (n++ < len) {
        try {
          player = this.players().next()
        } catch (e) {
          this._trigger('error', e.code, { message: e.message })
        }
        player.hand.add(this._deck.deal())
      }
      
      n = 0
      while (n++ < this.players().total()) {
        player = this.players().next()
        console.log(player.id, player.hand.cards())
      }
    },
    
    
    deal: function (options) {
      if (!this.playing()) {
        this._playing = true
        NS.Game.prototype.deal.call(this, options)
        this._dealHoleCards()
      }
      return this
    } 
  }
  
  
  
  NS.Game.extend(NS.holdem.Game)
  
}(this, _));