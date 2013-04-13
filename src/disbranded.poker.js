/**
 * Must be loaded prior to all other poker modules.
 * Sets up namespaces and other defaults.
 * DISBRANDED.poker depends on Underscore http://underscorejs.org/
 */
;(function (root) {
  'use strict'

  // @namespace
  root.DISBRANDED = (typeof root.DISBRANDED === 'undefined') ? {} : root.DISBRANDED
  root.DISBRANDED.poker = {
    
    debug: false,
    
    /**
     * @constants
     */
    // events
    CHANGE              : 'change',
      BUTTON            : 'button',
      HAND_BEGIN        : 'handBegin',
      HAND_END          : 'handEnd',
    
    DEAL                : 'deal',
      BURN              : 'burn',
      COMMUNITY         : 'community',

    ERROR               : 'error',
      TOO_MANY_PLAYERS  : 'tooManyPlayers',
      TOO_FEW_PLAYERS   : 'tooFewPlayers',
      NO_NEXT_PLAYER    : 'noNextPlayer',
      
    ADDED               : 'add',
    REMOVED             : 'remove',
      PLAYER            : 'player',
      CHIPS             : 'chips',
    
    POST                : 'post',
      ANTE              : 'ante', 
      SMALL_BLIND       : 'smallBlind',
      BIG_BLIND         : 'bigBlind',
    
    ACTION_NEEDED       : 'actionNeeded',
      CHECK             : 'check',
      CALL              : 'call',
      RAISE             : 'raise',
      
    // pots
    LIMIT               : 'limit',
    NO_LIMIT            : 'noLimit',
    POT_LIMIT           : 'potLimit',  
    
    FACE_UP             : 'faceUp',
    FACE_DOWN           : 'faceDown'

  }
}(this));