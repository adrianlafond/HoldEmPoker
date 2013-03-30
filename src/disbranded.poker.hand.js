
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
      this._rank = 0
      this._high = this._low = null
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
     * @returns a number that corresponds to an index in Hand.titles
     */
    rank: function () {
      return this._rank
    },
    
    /**
     * @returns a copy of this hand's best 5-card poker hand.
     */
    high: function () {
      return this._high ? [].concat(this._high) : null
    },
    
    /**
     * @returns a copy of this hand's best LOW 5-card poker hand.
     */
    low: function () {
      return this._low ? [].concat(this._low) : null
    },
    
    
    /**
     * Updates the hand's rank (for comparison with other hands),
     * set of 5 high cards, and set of 5 low cards.
     */
    updateStatus: function () {
      var result,
          ranks,
          suits,
          i,
          len,
          setsLen
      
      this._rank = 0
      this._high = this._low = null
      
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

        if (result = flush(suits, this.size())) {
          this._rank = NS.Hand.FLUSH
          this._high = result.slice(0, 5)
        } else if (result = straight(ranks, this.size())) {
          this._rank = NS.Hand.STRAIGHT
          this._high = result.slice(0, 5)
        }
        
        if (this._rank === NS.Hand.FLUSH) {
          if (result = straight(result, result.length)) {
            if (result[result.length - 1].charAt(0) === 'A') {
              this._rank = NS.Hand.ROYAL_FLUSH
            } else {
              this._rank = NS.Hand.STRAIGHT_FLUSH
            }
            this._high = result.slice(0, 5)
          }
        }
        
        if (this._rank < NS.Hand.FOUR_OF_A_KIND) {
          result = findSets(ranks, this.size())
          setsLen = result.length
          if (setsLen >= 2) {
            if (result[0].length === 4) {
              this._rank = NS.Hand.FOUR_OF_A_KIND
              this._high = result[0].concat(result[setsLen - 1][0])
            }
            if (result[0].length === 3) {
              if (this._rank < NS.Hand.FULL_HOUSE && setsLen >= 3) {
                this._rank = NS.Hand.FULL_HOUSE
                this._high = result[0].concat(result[1].slice(0, 2))
              } else if (this._rank < NS.Hand.THREE_OF_A_KIND) {
                this._rank = NS.Hand.THREE_OF_A_KIND
                this._high = result[0].concat(result[setsLen - 1].slice(0, 2))
              }
            }
            if (setsLen >= 3 && this._rank < NS.Hand.TWO_PAIR) {
              this._rank = NS.Hand.TWO_PAIR
              this._high = result[0].concat(result[1]).concat(result[setsLen - 1][0])
            } else if (this._rank < NS.Hand.ONE_PAIR) {
              this._rank = NS.Hand.ONE_PAIR
              this._high = result[0].concat(result[setsLen - 1].slice(0, 3))
            }
          }
        }
        
        if (this._rank < NS.Hand.HIGH_CARD) {
          this._rank = NS.Hand.HIGH_CARD
          this._high = ranks.slice(-5)
        }
      }
      return this
    },
    
    
    /**
     * @static settings for lowball poker.
     */
    lowball: (function () {
      var _acesLow = true,
          _ignoreStraights = true,
          _ignoreFlushes = true

      return {
        acesAreLow: function (value) {
          if (typeof value === 'undefined') {
            return _acesLow
          }
          _acesLow = !!value
          return this
        },

        ignoreStraights: function (value) {
          if (typeof value === 'undefined') {
            return _ignoreStraights
          }
          _ignoreStraights = !!value
          return this
        },

        ignoreFlushes: function (value) {
          if (typeof value === 'undefined') {
            return _ignoreFlushes
          }
          _ignoreFlushes = !!value
          return this
        },

        aceToFive: function (value) {
          if (typeof value === 'undefined') {
            return _acesLow && _ignoreStraights && _ignoreFlushes
          }
          if (!!value) {
            _acesLow = _ignoreStraights = _ignoreFlushes = true
          }
          return this
        },

        aceToSix: function (value) {
          if (typeof value === 'undefined') {
            return _acesLow && !_ignoreStraights && !_ignoreFlushes
          }
          if (!!value) {
            _acesLow = true
            _ignoreStraights = _ignoreFlushes = false 
          }
          return this
        },

        deuceToSeven: function (value) {
          if (typeof value === 'undefined') {
            return !_acesLow && !_ignoreStraights && !_ignoreFlushes
          }
          if (!!value) {
            _acesLow = _ignoreStraights = _ignoreFlushes = false
          }
          return this
        },

        deuceToSix: function (value) {
          if (typeof value === 'undefined') {
            return !_acesLow && _ignoreStraights && _ignoreFlushes
          }
          if (!!value) {
            _acesLow = false
            _ignoreStraights = _ignoreFlushes = true
          }
          return this
        }
      }
    }())
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
        if (rank === test) {
          continue
        } else if (rank + 1 === test) {
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
  
  
  /**
   *
   */
  function findSets(hand, len) {
    var c = [],
        i = 0,
        r1,
        r2,
        temp = [],
        removed = [],
        others = [],
        j,
        jlen,
        flag = false,
        
        addTempToCards = function () {
          if (temp.length >= 2) {
            removed = removed.concat(temp)
            c.push([].concat(temp))
          }
        }

    for (; i < len; i++) {
      r2 = hand[i].charAt(0)
      if (!r1) {
        r1 = r2
        temp[0] = hand[i]
      } else if (r1 === r2) {
        temp.push(hand[i])
        if (i === len - 1) {
          addTempToCards()
        }
      } else {
        addTempToCards()
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
    
    // sort by length of each set, so larger sets come before smaller
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
    
    // Create an array of cards not in sets, for use as kickers.
    jlen = removed.length
    for (i = 0; i < len; i++) {
      flag = true
      for (j = 0; j < jlen; j++) {
        if (hand[i] === removed[j]) {
          flag = false
          break
        }
      }
      if (flag) {
        others.push(hand[i])
      }
    }
    
    // Add unneeded sets to kickers.
    len = c.length
    if (len > 0) {
      jlen = c[0].length
      if (jlen === 4) {
        i = 1
      } else if (jlen === 3) {
        i = (len >= 2) ? 2 : 1
      } else  {
        i = 2
      }
      while (c.length > i) {
        others = others.concat(c[i])
        c.splice(i, 1)
      }
    }    
    
    others.sort(compareRank)
    others.reverse()
    c.push(others)
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


  
}(this));