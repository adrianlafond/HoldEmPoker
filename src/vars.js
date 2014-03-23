/**
 * Variables scoped to entire Poker module.
 */
var Poker,

    util,

    Card,
    Deck,
    Hand,
    Player,
    Bet,
    Round,
    SidePot,
    Pot,
    Table,
    Dealer,


    /**
     * Constants matched to lingo[lang].cards.
     */
    ROYAL_FLUSH     = 'royalFlush',
    STRAIGHT_FLUSH  = 'straightFlush',
    FOUR_OF_A_KIND  = 'fourOfAKind',
    FULL_HOUSE      = 'fullHouse',
    FLUSH           = 'flush',
    STRAIGHT        = 'straight',
    THREE_OF_A_KIND = 'threeOfAKind',
    TWO_PAIR        = 'twoPair',
    ONE_PAIR        = 'onePair',
    HIGH_CARD       = 'highCard',


    /**
     * Constants matched to lingo[lang].low.
     */
    ACE_TO_FIVE_LOW    = 'aceToFiveLow',
    ACE_TO_SIX_LOW     = 'aceToSixLow',
    DEUCE_TO_SEVEN_LOW = 'deuceToSevenLow',
    DEUCE_TO_SIX_LOW   = 'deuceToSixLow',



    /**
     * Cosntants matched lingo[lang].card.
     */
    FACE_DOWN  = 'faceDown',
    FACE_UP    = 'faceUp',
    COMMUNITY  = 'community',


    /**
     * Constants that correspond with lingo[lang].action.
     */
    FOLD   = 'fold',
    BET    = 'bet',
    CALL   = 'call',
    RAISE  = 'raise',


    /**
     * Constants matched to lingo[lang].limit.
     */
    FIXED_LIMIT     = 'fixedLimit',
    SPREAD_LIMIT    = 'spreadLimit',
    POT_LIMIT       = 'potLimit',
    NO_LIMIT        = 'noLimit',
    CAP_LIMIT       = 'capLimit',


    /**
     * Constants matched to lingo[lang].game.
     */
    SHUFFLE           = 'shuffle',
    BURN              = 'burn',
    DEAL              = 'deal',
    BETTING_ROUND     = 'bettingRound',
    ANTE              = 'ante',
    BLIND             = 'blind',
    SMALL_BLIND       = 'smallBlind',
    BIG_BLIND         = 'bigBlind',
    BIG_BET           = 'bigBet',

    BETTER  = -1,
    WORSE   = 1,
    EVEN    = 0
