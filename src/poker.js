/**
 * Poker is the API return for the module. It acts as a factory for all
 * other classes for use by a separate Dealer/Game instance.
 * Classes that will need to instantiated by a Dealer include: Table, Player,
 * Pot, Bet, Round
 */
;(function () {
  'use strict'


  Poker = (function () {
    return {


      /**
       * Constants matched to lingo[lang].cards.
       */
      ROYAL_FLUSH     : ROYAL_FLUSH,
      STRAIGHT_FLUSH  : STRAIGHT_FLUSH,
      FOUR_OF_A_KIND  : FOUR_OF_A_KIND,
      FULL_HOUSE      : FULL_HOUSE,
      FLUSH           : FLUSH,
      STRAIGHT        : STRAIGHT,
      THREE_OF_A_KIND : THREE_OF_A_KIND,
      TWO_PAIR        : TWO_PAIR,
      ONE_PAIR        : ONE_PAIR,
      HIGH_CARD       : HIGH_CARD,


      /**
       * Constants matched to lingo[lang].low.
       */
      ACE_TO_FIVE_LOW    : ACE_TO_FIVE_LOW,
      ACE_TO_SIX_LOW     : ACE_TO_SIX_LOW,
      DEUCE_TO_SEVEN_LOW : DEUCE_TO_SEVEN_LOW,
      DEUCE_TO_SIX_LOW   : DEUCE_TO_SIX_LOW,


      /**
       * Cosntants matched lingo[lang].card.
       */
      FACE_DOWN  : FACE_DOWN,
      FACE_UP    : FACE_UP,
      COMMUNITY  : COMMUNITY,


      /**
       * Constants that correspond with lingo[lang].action.
       */
      FOLD   : FOLD,
      BET    : BET,
      CALL   : CALL,
      RAISE  : RAISE,


      /**
       * Constants matched to lingo[lang].limit.
       */
      FIXED_LIMIT     : FIXED_LIMIT,
      SPREAD_LIMIT    : SPREAD_LIMIT,
      POT_LIMIT       : POT_LIMIT,
      NO_LIMIT        : NO_LIMIT,
      CAP_LIMIT       : CAP_LIMIT,


      /**
       * Constants matched to lingo[lang].dealer.
       */
      SHUFFLE         : SHUFFLE,
      BURN            : BURN,
      DEAL            : DEAL,
      BETTING_ROUND   : BETTING_ROUND,
      ANTE            : ANTE,
      BLIND           : BLIND,
      SMALL_BLIND     : SMALL_BLIND,
      BIG_BLIND       : BIG_BLIND,
      BIG_BET         : BIG_BET,
      BUTTON          : BUTTON,


      /**
       * Constants for comparisons between hands.
       * They are "backwards" for purposes of array sorting
       * (better is closer to start of array).
       */
      BETTER  : BETTER,
      WORSE   : WORSE,
      EVEN    : EVEN,


      /**
       * Classes and utils.
       */
      Card    : Card,
      Deck    : Deck,
      Hand    : Hand,
      Player  : Player,
      Bet     : Bet,
      Round   : Round,
      SidePot : SidePot,
      Pot     : Pot,
      Table   : Table,
      util    : util
    }
  }())
}());
