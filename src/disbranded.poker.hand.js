
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
  

  // @constants correspond with indices in poker.string[lang].cards array.
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
  
  // @constants for comparisons between hands
  NS.Hand.BETTER = -1
  NS.Hand.WORSE = 1
  NS.Hand.EVEN = 0
  
  
  NS.Hand.RANKS = '23456789TJQKAW'
  NS.Hand.SUITS = 'CDHS'
  
  
  NS.Hand.prototype = {
    
    
    /**
     * Create lowball only if/when it's needed.
     */
    lowball: function () {
      return this._lowball || (this._lowball = new NS.Hand.Lowball({ hand: this }))
    },
    
    
    /**
     * @param {string} card
     * @returns {boolean}
     */
    has: function (card) {
      return _.contains(this._cards, card)
    },
    
    
    /**
     * @returns a copy of cards.
     */
    cards: function () {
      return this._cards.slice(0)
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
            self.updateValue()
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
        this.updateValue()
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
      this._high = null
      if (this._lowball) {
        this._lowball.reset()
      }
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
      return this._high.slice(0)
    },
    
    
    /**
     * Update rank and high (array of cards that make the best hand).
     * If lowball, also updates low hand.
     */
    updateValue: function () {
      var hand = this.cards(),
          result = NS.Hand.isFlush(hand)
      
      this._rank = 0

      if (result) {
        this._rank = NS.Hand.FLUSH
        this._high = result.cards.slice(0)
        
        result = NS.Hand.isStraightFlush(hand)
        if (result) {
          this._rank = result.royalFlush ? NS.Hand.ROYAL_FLUSH : NS.Hand.STRAIGHT_FLUSH
          this._high = result.cards.slice(0)
          return
        } 
      }

      result = NS.Hand.findSets(hand)
      if (result) {
        if (result.type === NS.Hand.FOUR_OF_A_KIND) {
          this._rank = NS.Hand.FOUR_OF_A_KIND
          this._high = result.cards.slice(0)
          return
        }
        if (result.type === NS.Hand.FULL_HOUSE) {
          this._rank = NS.Hand.FULL_HOUSE
          this._high = result.cards.slice(0)
          return
        }
        if (this._rank < NS.Hand.THREE_OF_A_KIND) {
          this._rank = result.type
          this._high = result.cards.slice(0)
        }
      }
      
      if (this._rank < NS.Hand.STRAIGHT) {
        result = NS.Hand.isStraight(hand)
        if (result) {
          this._rank = NS.Hand.STRAIGHT
          this._high = result.cards.slice(0)
          return
        }
      }
      
      if (this._rank < NS.Hand.HIGH_CARD) {
        this._rank = NS.Hand.HIGH_CARD
        this._high = NS.Hand.sortByRank(hand).slice(0, 5)
      }
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
        NS.Hand.EVEN
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
    this._hand = options.hand || null
    this._acesLow = !!options.acesAreLow || true
    this._ignoreStraights = !!options.ignoreStraights || true
    this._ignoreFlushes = !!options.ignoreFlushes || true
    this._low = null
  }
  
  NS.Hand.Lowball.prototype = {
    /**
     * @returns a copy of this hand's best LOW 5-card poker hand.
     */
    low: function () {
      return this._low ? this._low.slice(0) : null
    },
    
    /**
     * Set the hand this lowball instance is associated with.
     */
    hand: function () {
      if (arguments.length === 0) {
        return this._hand
      }
      this._hand = arguments[0]
      return this
    },
    
    reset: function () {
      this._low = null
    },
    
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
   * Sorts @param hands from highest to lowest.
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
   * @returns {null} if no flush or {array} sorted flush, kickers.
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

      return { cards: flush }
    }
    
    return null
  }
  
  
  /**
   * Find highest straight in @param hand.
   * @param {boolean} flush Whether to test for straight flush.
   * @returns {null} if no straight or {array} sorted straight, kickers.
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
      return { cards: straight }
    }
    
    return null
  }
  
  
  /**
   * Find a straight flush in @param hand.
   * @returns {null} or {array} sorted straight flush, kickers.
   */
  NS.Hand.isStraightFlush = function (hand) {
    var result = NS.Hand.isStraight(hand, true)
    if (result) {
      result.royalFlush = result.cards[0].charAt(0) === 'A'
    }
    return result
  }
  
  
  /**
   * Find sets in @param hand.
   * @returns {null} if hand.length < 5 or no pairs.
   * or @returns or {array} of arrays of sets sorted largest + highest sets first
   */
  NS.Hand.findSets = function (hand) {
    var sets = [],
        set0Len,
        result,
        type
    
    if (hand.length < 5) {
      return null
    }
    
    _.times(13, function (n) {
      var rank = NS.Hand.RANKS[n],
        set = _.filter(hand, function (card) {
          return card.charAt(0) === rank
        })
      if (set.length >= 2) {
        sets.push(set)
      }
    })
    
    if (sets.length) {
      // Sort by value of cards in each set.
      sets.sort(function (a, b) {
        return compareCardsByRank(a[0], b[0])
      })
      
      // Sort by number of cards in each set.
      sets.sort(compareSetLen)
      
      set0Len = sets[0].length
      if (set0Len === 4) {
        return {
          cards: [sets[0], _.difference(hand, sets[0]).sort(compareCardsByRank).slice(0, 1)],
          type: NS.Hand.FOUR_OF_A_KIND
        }
      }
      
      result = [sets[0]]
      if (sets.length > 1) {
        // get_kickers_for ? fullhouse : 2_pair
        result[1] = (set0Len === 3) ? sets[1].slice(0, 2) : sets[1]
        if (set0Len < 3) {
          // get kicker for 2 pair
          result[2] = _.difference(hand, sets[0], sets[1]).sort(compareCardsByRank).slice(0, 1)
        }
        type = (set0Len === 3) ? NS.Hand.FULL_HOUSE : NS.Hand.TWO_PAIR
      } else {
        // kickers for three of a kind or 1 pair
        result[1] = _.difference(hand, sets[0]).sort(compareCardsByRank)
        result[1] = result[1].slice(0, (set0Len === 3) ? 2 : 3)
        type = (set0Len === 3) ? NS.Hand.THREE_OF_A_KIND : NS.Hand.ONE_PAIR
      }
      return {
        cards: result,
        type: type
      }
    }
    
    return null
  }
  
  
  /**
   * @returns copy of hand sorted by rank high to low.
   */
  NS.Hand.sortByRank = function (hand) {
    return hand.slice(0).sort(compareCardsByRank)
  }
  



  
  
  
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
  
  function compareSetLen(a, b) {
    var al = a.length,
        bl = b.length
    if (al > bl) {
      return -1
    } else if (al < bl) {
      return 1
    }
    return 0
  }

  
}(this, _));