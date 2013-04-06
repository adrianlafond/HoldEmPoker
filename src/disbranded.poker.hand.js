
;(function (root, _) {
  'use strict'

  var NS = root.DISBRANDED.poker


  
  
  NS.Hand = function (id) {
    if (!(this instanceof NS.Hand)) {
      return new NS.Hand(id)
    }
    this.id = id
    this.reset()
  }
  
  NS.Hand.prototype = {
    
    
    /**
     * Create lowball only if/when it's needed.
     */
    lowball: function () {
      return this._lowball || (this._lowball = new NS.Hand.Lowball)
    },
    
    
    /**
     * @param {string} card
     * @returns {boolean}
     */
    has: function (card) {
      return _.contains(this._cards, card)
    },
    
    /**
     * @param {string|array}
     */
    add: function () {
      var self = this
      _.each(arguments, function (card, i) {
        if (_.isString(card)) {
          if (!self.has(card)) {
            self._cards[self.size()] = card
            self.updateStatus()
          }
        } else if (_.isArray(card)) {
          self.add.apply(self, card)
        } else if (NS.debug) {
          throw 'Error: Hand.add() argument value is invalid.'
        }
      })
      if (NS.debug && arguments.length === 0) {
        throw 'Error: Hand.add() needs at least one argument.'
      }
      return self
    },
    
    /**
     * @return {string} card at index; null if index is out of range
     */
    get: function (index) {
      return _.has(this._cards, index) ? this._cards[index] : null
    },
    
    /**
     * Set the card at a specific index.
     */
    set: function (index, card) {
      index = parseInt(index, 10)
      if (_.isNumber(index) && !_.isNaN(index)) {
        index = Math.max(0, Math.min(this._cards.length, index))
        this._cards[index] = card
        this.updateStatus()
      } else if (NS.debug) {
        throw 'Error: Hand.set() first argument must be a number.'
      }
      return this
    },
    
    /**
     * Empties the hand.
     */
    reset: function () {
      this._cards = []
      this._rank = 0
      this._high = this._low = null
      return this
    },
    
    /**
     * @returns number of cards in hand
     */
    size: function () {
      return this._cards.length
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
      return this._high ? this._high.slice(0) : null
    },
    
    /**
     * @returns a copy of this hand's best LOW 5-card poker hand.
     */
    low: function () {
      return this._low ? this._low.slice(0) : null
    },
    
    
    /**
     * Updates the hand's rank (for comparison with other hands),
     * set of 5 high cards, and set of 5 low cards.
     */
    updateStatus: function () {
      var result,
          tempResult,
          ranks,
          suits,
          i,
          len,
          setsLen,
          
          fnSuit,
          fnRank
      
      this._rank = 0
      this._high = this._low = null
      
      if (this.size() >= 5) {
        ranks = []
        suits = []
        for (i = 0; i < this.size(); i++) {
          ranks[i] = suits[i] = this.get(i)
        }
        
        ranks.sort(compareCardsBySuit)
        ranks.sort(compareCardsByRank)        
        suits.sort(compareCardsByRank)
        suits.sort(compareCardsBySuit)

        if (tempResult = NS.Hand.isFlush(suits)) {
          result = tempResult
          this._rank = NS.Hand.FLUSH
          this._high = result.slice(0, 5)
        } else if (tempResult = NS.Hand.isStraight(ranks)) {
          result = tempResult
          this._rank = NS.Hand.STRAIGHT
          this._high = result.slice(0, 5)
        }
        
        if (this._rank === NS.Hand.FLUSH) {
          if (tempResult = NS.Hand.isStraight(suits, this.size())) {
            result = tempResult
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
          this._high = ranks.slice(0, 5)
        }
      }
      return this
    },
    
    
    /**
     * Compares this Hand to another Hand instance.
     * @param {Hand} hand
     * @returns  1 / BETTER if this Hand is better
     *          -1 / WORSE if param Hand is better
     *           0 / EVEN if Hands are event
     */
    compareTo: function (hand) {
      var r1 = this.rank(),
          r2 = hand.rank(),
          h1,
          h2,
          result,
          n
      
      if (r1 === 0 || r2 === 0) {
        return NS.Hand.EVEN
      }
      
      if (r1 > r2) {
        return NS.Hand.BETTER
      } else if (r1 < r2) {
        return NS.Hand.WORSE
      }
      
      // royal flushes necessarily have the same rank
      if (r1 < NS.Hand.ROYAL_FLUSH) {
        
        h1 = this.high()
        h2 = hand.high()
        
        // hands where no kicker need be compared
        if (r1 === NS.Hand.STRAIGHT_FLUSH
            || r1 === NS.Hand.FLUSH
            || r1 === NS.Hand.STRAIGHT) {
          return compareCardsByRank(h1[4], h2[4])  
        }
        
        n = 0
        while (n < 5) {
          result = compareCardsByRank(h1[n], h2[n])
          if (result !== NS.Hand.EVEN) {
            return result
          }
          ++n
        }
      }
      
      return NS.Hand.EVEN
    }
  }
  
  
  /**
   * Settings for lowball poker.
   * For aceToFive(), aceToFive(), deuceToSeven(), and deuceToSix(),
   * TRUE will set them to true, but FALSE will not disable.
   * To disable a lowball setting, enable a different one.
   * For internal use by Hand, but there's no technical reason
   * why it could not be used on its own.
   */
  NS.Hand.Lowball = function (options) {
    options = options || {}
    this._acesLow = !!options.acesAreLow || true
    this._ignoreStraights = !!options.ignoreStraights || true
    this._ignoreFlushes = !!options.ignoreFlushes || true
  }
  
  NS.Hand.Lowball.prototype = {
    acesAreLow: function () {
      if (arguments.length === 0) {
        return this._acesLow
      }
      this._acesLow = !!arguments[0]
      return this
    },

    ignoreStraights: function () {
      if (arguments.length === 0) {
        return this._ignoreStraights
      }
      this._ignoreStraights = !!arguments[0]
      return this
    },

    ignoreFlushes: function () {
      if (arguments.length === 0) {
        return this._ignoreFlushes
      }
      this._ignoreFlushes = !!arguments[0]
      return this
    },

    aceToFive: function () {
      if (arguments.length === 0) {
        return this._acesLow && this._ignoreStraights && this._ignoreFlushes
      }
      if (!!arguments[0]) {
        this._acesLow = this._ignoreStraights = this._ignoreFlushes = true
      }
      return this
    },

    aceToSix: function () {
      if (arguments.length === 0) {
        return this._acesLow && !this._ignoreStraights && !this._ignoreFlushes
      }
      if (!!arguments[0]) {
        this._acesLow = true
        this._ignoreStraights = this._ignoreFlushes = false 
      }
      return this
    },

    deuceToSeven: function () {
      if (arguments.length === 0) {
        return !this._acesLow && !this._ignoreStraights && !this._ignoreFlushes
      }
      if (!!arguments[0]) {
        this._acesLow = this._ignoreStraights = this._ignoreFlushes = false
      }
      return this
    },

    deuceToSix: function () {
      if (arguments.length === 0) {
        return !this._acesLow && this._ignoreStraights && this._ignoreFlushes
      }
      if (!!arguments[0]) {
        this._acesLow = false
        this._ignoreStraights = this._ignoreFlushes = true
      }
      return this
    }
  }
  
  
  /**
   * Sorts @params hands from highest to lowest.
   * @param hands {array} of Hand instances.
   * @returns {array} of hands, sorted.
   */
  NS.Hand.sort = function (hands) {
    hands.sort(function (a, b) {
      return a.compareTo(b)
    })
    return hands
  }
  
  
  /**
   * Find highest flush in @param hand.
   */
  NS.Hand.isFlush = function (hand) {
    var suits = {},
        high = -1, rank,
        flush, others
        
    if (hand.length < 5) {
      return null
    }
    
    _.times(4, function (suitIndex) {
      var suit = NS.Hand.SUITS.charAt(suitIndex)
      suits[suit] = _.filter(hand, function (card) {
        return card.charAt(1) === suit
      })
      if (suits[suit].length < 5) {
        delete suits[suit]
      }
    })

    if (_.size(suits) > 0) {
      _.each(suits, function (cards, suit) {
        cards.sort(compareCardsByRank)
        rank = 0
        _.times(5, function (n) {
          rank += NS.Hand.RANKS.indexOf(cards[n].charAt(0))
        })
        if (rank > high) {
          high = rank
          flush = cards
        }
      })

      others = _.difference(hand, flush).sort(compareCardsByRank)
      return flush.concat(others)
    }
    
    return null
  }
  
  
  /**
   * Find highest straight in @param hand.
   * @param {boolean} flush Whether to test for straight flush.
   */
  NS.Hand.isStraight = function (hand, flush) {
    var straights = [],
        n = -1,
        rank = 0,
        suit,
        testRank,
        testSuit,
        straight,
        others
    
    if (hand.length < 5) {
      return null
    }
        
    hand = hand.sort(compareCardsByRank)
    flush = !!flush
    
    console.log('')
    _.each(hand, function (card, index) {
      var testRank = NS.Hand.RANKS.indexOf(card.charAt(0)),
          testSuit = flush ? card.charAt(1) : null,
          rankOk = index > 0 && testRank === rank - 1
      if (rankOk && (flush ? (testSuit === suit) : true)) {
        straights[n].push(card)
      } else {
        straights[++n] = [card]
      }   
      rank = testRank
      suit = testSuit
    })
    
    straights = _.filter(straights, function (s) {
      return s.length >= 5
    })
    
    if (straights.length) {
      straight = _.max(straights, function (s) {
        return NS.Hand.RANKS.indexOf(s[0].charAt(0))
      }).slice(0, 5)
      others = _.difference(hand, straight).sort(compareCardsByRank)
      return straight.concat(others)
    }
    
    return null
  }
  
  
  NS.Hand.isStraightFlush = function (hand) {
    return NS.Hand.isStraight(hand, true)
  }
  


  NS.Hand.RANKS = '23456789TJQKAW'
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
  
  
  // for comparisons between hands
  NS.Hand.BETTER = -1
  NS.Hand.WORSE = 1
  NS.Hand.EVEN = 0
  
  
  
  /**
   * Sorting functions
   */
  function compareCardsByRank(a, b) {
    return compareRank(NS.Hand.RANKS.indexOf(a.charAt(0)),
                       NS.Hand.RANKS.indexOf(b.charAt(0)))
  }
  
  function compareRank(a, b) {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    }
    return 0
  }
  
  function compareCardsBySuit(a, b) {
    return compareSuit(NS.Hand.SUITS.indexOf(a.charAt(1)),
                       NS.Hand.SUITS.indexOf(b.charAt(1)))
  }

  function compareSuit(a, b) {
    if (a < b) {
      return -1
    } else if (a > b) {
      return 1
    }
    return 0
  }
  

  
  
  /**
   * Finds 4 of a kind, 3 of a kind, and pairs in @param hand
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
    
    // Sort by rank, so sets with higher sets come before smaller.
    c.sort(function (a, b) {
      return compareRank(NS.Hand.RANKS.indexOf(a[0].charAt(0)),
                         NS.Hand.RANKS.indexOf(b[0].charAt(0)))
    }) 
    
    // Sort by length of each set, so larger sets come before smaller.
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
    
    others.sort(compareCardsByRank)
    c.push(others)
    return c
  }

  
}(this, _));