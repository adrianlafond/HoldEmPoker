/**
 * Dealer is the model for the current state of a poker game.
 */
;(function (root) {
  'use strict'

  var NS = root.DISBRANDED.poker
  
  NS.Dealer = function () {
    this._init()
  }
  
  NS.Dealer.prototype = {
    
    _init: function () {
      this.deck = new NS.Deck
    },
    
    deal: function (options) {
      //
    }
  }
}(this));