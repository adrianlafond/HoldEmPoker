var DEFAULT_DECK = [
  '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', 'TC', 'JC', 'QC', 'KC', 'AC',
  '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', 'TD', 'JD', 'QD', 'KD', 'AD',
  '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', 'TH', 'JH', 'QH', 'KH', 'AH',
  '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', 'TS', 'JS', 'QS', 'KS', 'AS'
];

Object.defineProperties(Poker, {
  // Games.
  HOLDEM: { value: 'holdem', enumerable: true },

  // Variations.
  LIMIT: { value: 'limit', enumerable: true },
  NO_LIMIT: { value: 'noLimit', enumerable: true },
  POT_LIMIT: { value: 'potLimit', enumerable: true },

  // Actions.
  FOLD: { value: 'fold', enumerable: true },
  BET: { value: 'bet', enumerable: true },
  CHECK: { value: 'check', enumerable: true },

  // Card.
  FACE_UP: { value: 'faceUp', enumerable: true },
  FACE_DOWN: { value: 'faceDown', enumerable: true },

  // Deck.
  CARDS: { value: DEFAULT_DECK, enumerable: true },
  SIZE: { value: DEFAULT_DECK.length, enumerable: true },
  MAX_JOKERS: { value: 4, enumerable: true },

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

  // Hand low hand types.
  ACE_TO_FIVE_LOW: { value: 'aceToFiveLow', enumerable: true },
  ACE_TO_SIX_LOW: { value: 'aceToSizeLow', enumerable: true },
  DEUCE_TO_SEVEN_LOW: { value: 'deuceToSevenLow', enumerable: true },
  DEUCE_TO_SIX_LOW: { value: 'deuceToSixLow', enumerable: true },

  // Hand values for sorting.
  RANKS: { value: 'WAKQJT98765432', enumerable: true },
  SUITS: { value: 'SHDC', enumerable: true }
});
