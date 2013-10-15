/**
 * Poker.Card
 */
;(function () {
  'use strict'


  /**
   * @constructor
   */
  Card = function (options) {
    this.value = options.card
    this.rank = this.value.charAt(0)
    this.suit = this.value.charAt(1)
    this.face = (options.face === Card.FACE_UP) ? Card.FACE_UP : Card.FACE_DOWN
  }


  // Constants
  Card.FACE_DOWN  = 0
  Card.FACE_UP    = 1
  Card.COMMUNITY  = 2
}());



