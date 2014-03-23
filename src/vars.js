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
    ROYAL_FLUSH     = 10,
    STRAIGHT_FLUSH  = 9,
    FOUR_OF_A_KIND  = 8,
    FULL_HOUSE      = 7,
    FLUSH           = 6,
    STRAIGHT        = 5,
    THREE_OF_A_KIND = 4,
    TWO_PAIR        = 3,
    ONE_PAIR        = 2,
    HIGH_CARD       = 1,


    /**
     * Constants matched to lingo[lang].low.
     */
    ACE_TO_FIVE_LOW    = 1,
    ACE_TO_SIX_LOW     = 2,
    DEUCE_TO_SEVEN_LOW = 3,
    DEUCE_TO_SIX_LOW   = 4,



    /**
     * Cosntants matched lingo[lang].card.
     */
    FACE_DOWN  = 0,
    FACE_UP    = 1,
    COMMUNITY  = 2,


    /**
     * Constants that correspond with lingo[lang].action.
     */
    FOLD   = 1,
    BET    = 2,
    CALL   = 3,
    RAISE  = 4,


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
    SHUFFLE           = 0,
    BURN              = 1,
    DEAL              = 2,
    BETTING_ROUND     = 3,
    ANTE              = 4,
    BLIND             = 5,
    SMALL_BLIND       = 6,
    BIG_BLIND         = 7,
    BIG_BET           = 8,

    BETTER  = -1,
    WORSE   = 1,
    EVEN    = 0
