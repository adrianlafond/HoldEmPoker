
;(function (root) {
  'use strict'

  var NS
      
  
  // @namespace
  root.DISBRANDED = (typeof root.DISBRANDED === 'undefined') ? {} : root.DISBRANDED
  root.DISBRANDED.poker = root.DISBRANDED.poker || {}
  NS = root.DISBRANDED.poker
  
  
  NS.Hand = function (id) {
    this.id = id
    this.reset()
  }
  
  NS.Hand.prototype = {
    
    /**
     * @param {string} card
     * @returns {boolean}
     */
    hasCard: function (card) {
      var i = 0, len = this._cards.length
      for (; i < len; i++) {
        if (this._cards[i] === card) {
          return true
        }
      }
      return false
    },
    
    /**
     * @param {string|array}
     */
    add: function (card) {
      var i, len
      if (typeof card === 'string') {
        if (!this.hasCard(card)) {
          this._cards[this._size] = card
          this._size += 1
          this.updateStatus()
        }
      } else if (Object.prototype.toString.call(card) === '[object Array]') {
        for (i = 0, len = card.length; i < len; i++) {
          this.add(card[i])
        }
        // this._cards = this._cards.concat(card)
      } else {
        throw 'Error: @param "card" must be a string or an array.'
      }
      return this
    },
    
    /**
     * @return {string} card at index; null if index is out of range
     */
    get: function (index) {
      return (index in this._cards) ? this._cards[index] : null
    },
    
    /**
     * Set the card at a specific index.
     */
    set: function (index, card) {
      this._cards[Math.max(0, Math.min(this._size, parseInt(index, 10)))] = card
      this._size = this._cards.length
      this.updateStatus()
      return this
    },
    
    /**
     *
     */
    reset: function () {
      this._cards = []
      this._size = 0
      this.title = this.titleHigh = this.high = null
      this.titleLow = this.low = null
      return this
    },
    
    /**
     * @return number of cards in hand
     */
    size: function () {
      return this._size
    },
    
    
    /**
     * For quick comparisons between hands.
     * @returns a number that corresponds to indices of Hand.titles
     */
    rank: function () {
      return 0
    },
    
    
    /**
     * 
     */
    updateStatus: function () {
      var result,
          ranks,
          suits,
          i,
          isFlush,
          isStraight,
          isStraightFlush,
          isRoyalFlush,
          sets,
          len
      
      if (this.size() >= 5) {
        ranks = []
        suits = []
        for (i = 0; i < this.size(); i++) {
          ranks[i] = suits[i] = this.get(i)
        }
        ranks.sort(compareSuit)
        ranks.sort(compareRank)        
        suits.sort(compareRank)
        suits.sort(compareSuit)
        
        console.log('test:', this._cards)
        isFlush = flush(suits, this.size())
        if (isFlush) {
          console.log('flush:', isFlush)
        }
        isStraight = straight(ranks, this.size())
        if (isStraight) {
          console.log('straight:', isStraight)
        }
        
        if (isFlush) {
          isStraightFlush = straight(isFlush, isFlush.length)
          if (isStraightFlush) {
            if (isStraightFlush[isStraightFlush.length - 1].charAt(0) === 'A') {
              isRoyalFlush = isStraightFlush
              console.log('royal flush:', isRoyalFlush)
            } else {
              console.log('straight flush:', isStraightFlush)
            }            
          }
        }
        
        sets = findSets(ranks, this.size())
        if (sets.length >= 1) {
          console.log('sets:', sets)
          len = sets[0].length
          if (len === 4) {
            console.log('4 of a kind:', sets[0])
          } else if (len === 3) {
            if (sets.length > 1) {
              console.log('full house:', sets[0].concat(sets[1]))
            } else {
              console.log('3 of a kind:', sets[0])
            }
          } else if (sets.length > 1) {
            console.log('2 pair:', sets[0].concat(sets[1]))
          } else {
            console.log('1 pair:', sets[0])
          }
        }
        
        console.log('')

        this.title = this.titleHigh
      }
      return this
    }
  }
  
  
  function compareRank(a, b) {
    var a = NS.Hand.RANKS.indexOf(a.charAt(0)),
        b = NS.Hand.RANKS.indexOf(b.charAt(0))
    if (a < b) {
      return -1
    } else if (a > b) {
      return 1
    }
    return 0
  }
  
  function compareSuit(a, b) {
    var a = NS.Hand.SUITS.indexOf(a.charAt(1)),
        b = NS.Hand.SUITS.indexOf(b.charAt(1))
    if (a < b) {
      return -1
    } else if (a > b) {
      return 1
    }
    return 0
  }
  
  
  function flush(hand, len) {
    var n = 0,
        i = 0,
        suit = null,
        test = null,
        cards = []
    for (; i < len; i++) {
      if (i === 0) {
        suit = hand[i].charAt(1)
        cards[0] = hand[i]
        ++n
      } else {
        test = hand[i].charAt(1)
        if (suit === test) {
          cards.push(hand[i])
          ++n
        } else if (n < 5) {
          suit = test
          n = 0
          cards = []
        }
      }
    }
    return (n >= 5) ? cards : null
  }
  
  
  function straight(hand, len) {
    var n = 0,
        i = 0,
        cards = [],
        rank,
        test
    for (; i < len; i++) {
      if (i === 0) {
        rank = NS.Hand.RANKS.indexOf(hand[i].charAt(0))
        cards[i] = hand[i]
        ++n
      } else {
        test = NS.Hand.RANKS.indexOf(hand[i].charAt(0))
        if (rank + 1 === test) {
          rank = test
          cards.push(hand[i])
          ++n
        } else if (n < 5) {
          rank = -999
          n = 0
          cards = []
        }
      }
    }
    return (n >= 5) ? cards : null
  }
  
  
  function findSets(hand, len) {
    var c = [],
        i = 0,
        r1,
        r2,
        temp = []

    for (; i < len; i++) {
      r2 = hand[i].charAt(0)
      if (!r1) {
        r1 = r2
        temp[0] = hand[i]
      } else if (r1 === r2) {
        temp.push(hand[i])
        if (i === len - 1) {
          c.push([].concat(temp))
        }
      } else {
        if (temp.length >= 2) {
          c.push([].concat(temp))
        }
        r1 = r2
        temp = [hand[i]]
      }
    }
    
    // sort by rank, so sets with higher sets come before smaller
    c.sort(function (a, b) {
      var ar = NS.Hand.RANKS.indexOf(a[0].charAt(0)),
          br = NS.Hand.RANKS.indexOf(b[0].charAt(0))
      if (ar < br) {
        return 1
      } else if (ar > br) {
        return -1
      }
      return 0
    }) 
    
    // sort by # in each set, so larger sets come before smaller
    c.sort(function (a, b) {
      var alen = a.length,
          blen = b.length
      if (alen < blen) {
        return 1
      } else if (alen > blen) {
        return -1
      }
      return 0
    })
    return c
  }

  
  NS.Hand.RANKS = '23456789TJQKA'
  NS.Hand.SUITS = 'CDHS'
  
  NS.Hand.ROYAL_FLUSH     = 10
  NS.Hand.STRAIGHT_FLUSH  = 9
  NS.Hand.FOUR_OF_A_KIND  = 8
  NS.Hand.FULL_HOUSE      = 7
  NS.Hand.FLUSH           = 6
  NS.Hand.STRAIGHT        = 5
  NS.Hand.THREE_OF_A_KIND = 4
  NS.Hand.TWO_PAIR        = 3
  NS.Hand.ONE_PAIR        = 2
  NS.Hand.HIGH_CARD       = 1

  NS.Hand.titles = [
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


  
}(this));