
;(function (root) {
  'use strict'

  var NS
      
  // @namespace
  root.DISBRANDED = (typeof root.DISBRANDED === 'undefined') ? {} : root.DISBRANDED
  root.DISBRANDED.poker = root.DISBRANDED.poker || {}
  NS = root.DISBRANDED.poker
  
  NS.string = {
    
    en: {
      cards: [
        null,
        'High Card',
        'One Pair',
        'Two Pair',
        'Three of a Kind',
        'Straight',
        'Flush',
        'Full House',
        'Four of a Kind',
        'Straight Flush',
        'Royal Flush'
      ]
    }
  }
  
}(this));