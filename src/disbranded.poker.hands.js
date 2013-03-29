
;(function (root) {
  'use strict'

  var NS
      
  
  // @namespace
  root.DISBRANDED = (typeof root.DISBRANDED === 'undefined') ? {} : root.DISBRANDED
  root.DISBRANDED.poker = root.DISBRANDED.poker || {}
  NS = root.DISBRANDED.poker
  
  
  /**
   * @public api
   */
  NS.hands = {
    
    /**
     * 
     */
    sort: function (hands) {
      var result = [],
          i, len
          
      for (i = 0, len = hands.length; i < len; i++) {
        result[i] = {
          title: this.FULL_HOUSE,
          hand: hands[i]
        }
      }
      
      return result
    },
    
    /**
     * @returns 
     */
    highest: function (hands) {
      console.log(this)
      return this.sort(hands)[0]
    },
    
    /**
     * 
     */
    lowest: function (hands) {
      return this.sort(hands)[hands.length - 1]
    },

    
    ROYAL_FLUSH           : 'Royal Flush',
    STRAIGHT_FLUSH        : 'Straight Flush',
    FOUR_OF_A_KIND        : 'Four of a Kind',
    FULL_HOUSE            : 'Full House',
    FLUSH                 : 'Flush',
    STRAIGHT              : 'Straight',
    THREE_OF_A_KIND       : 'Three of a Kind',
    TWO_PAIR              : 'Two Pair',
    ONE_PAIR              : 'One Pair',
    HIGH_CARD             : 'High Card'
  }
}(this));