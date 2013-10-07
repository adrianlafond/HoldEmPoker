// @constants correspond with indices in lingo[lang].cards array
// or Poker.lingo([lang]).cards array
Hand.ROYAL_FLUSH     = 10
Hand.STRAIGHT_FLUSH  = 9
Hand.FOUR_OF_A_KIND  = 8
Hand.FULL_HOUSE      = 7
Hand.FLUSH           = 6
Hand.STRAIGHT        = 5
Hand.THREE_OF_A_KIND = 4
Hand.TWO_PAIR        = 3
Hand.ONE_PAIR        = 2
Hand.HIGH_CARD       = 1

// @constants for comparisons between hands
// They are "backwards" for purposes of array sorting
// (better is closer to start of array).
Hand.BETTER = -1
Hand.WORSE = 1
Hand.EVEN = 0

// @constants used for sorting
// Ranks are "backwards" because higher ranks have
// lower indices in sorted arrays.
Hand.RANKS = 'WAKQJT98765432'
Hand.SUITS = 'SHDC'



