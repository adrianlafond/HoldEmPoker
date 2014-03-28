/**
 * Poker.Player
 */
;(function () {
  'use strict'

  // If a Player is not instantiated with an id,
  // one will be created for it.
  var uid = (function () {
    var u = 0
    return function () {
      return 'player-' + u++
    }
  }()),

  defaults = {
    id: null,
    chips: 0
  }


  /**
   * @constructor
   */
  Player = function (options) {
    this.options = util.extend({}, defaults, options || {})
    this.id = this.options.id || uid()
    this.chips = this.options.chips
    this.folded = false
    this.hand = new Hand
    this.cards = []
  }

  Player.prototype = {

    /**
     * @param {Card}
     */
    addCard: function (card) {
      this.hand.add(card.value)
      this.cards.push(card)
    },

    /**
     *
     */
    removeCards: function () {
      this.hand.reset()
      this.cards = []
    }
  }

}());
