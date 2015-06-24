Object.defineProperties(Hand, {
  // Hand ranks.
  ROYAL_FLUSH: { value: 10, enumerable: true },
  STRAIGHT_FLUSH: { value: 9, enumerable: true },
  FOUR_OF_A_KIND: { value: 8, enumerable: true },
  FULL_HOUSE: { value: 7, enumerable: true },
  FLUSH: { value: 6, enumerable: true },
  STRAIGHT: { value: 5, enumerable: true },
  THREE_OF_A_KIND: { value: 4, enumerable: true },
  TWO_PAIR: { value: 3, enumerable: true },
  ONE_PAIR: { value: 2, enumerable: true },
  HIGH_CARD: { value: 1, enumerable: true },
  NOTHING: { value: 0, enumerable: true },

  // Low hand types.
  ACE_TO_FIVE_LOW: { value: 'aceToFiveLow', enumerable: true },
  ACE_TO_SIX_LOW: { value: 'aceToSizeLow', enumerable: true },
  DEUCE_TO_SEVEN_LOW: { value: 'deuceToSevenLow', enumerable: true },
  DEUCE_TO_SIX_LOW: { value: 'deuceToSixLow', enumerable: true },

  // For sorting.
  RANKS: { value: 'WAKQJT98765432', enumerable: true },
  SUITS: { value: 'SHDC', enumerable: true }
});


