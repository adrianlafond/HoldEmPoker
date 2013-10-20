/**
 * Poker.Card
 */
;(function () {
  'use strict'


  /**
   * @constructor
   */
  Card = function (options) {
    this.value = options.value
    this.rank = this.value.charAt(0)
    this.suit = this.value.charAt(1)
    this.face = (options.face === FACE_UP) ? FACE_UP : FACE_DOWN
    this.community = false
  }

}());



