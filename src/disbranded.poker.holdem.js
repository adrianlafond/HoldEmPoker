/**
 * Must be loaded prior to all other poker.holdem modules.
 */
;(function (root) {
  'use strict'

  var poker = root.DISBRANDED.poker

  poker.holdem = {
    ANTE            : 'ante', 
    SMALL_BLIND     : 'smallBlind',
    BIG_BLIND       : 'bigBlind',
    DEAL_HOLE_1     : 'dealHole1',
    DEAL_HOLE_2     : 'dealHole2',
    BET_PRE_FLOP    : 'betPreFlop',
    FLOP            : 'flop',
    BET_FLOP        : 'betFlop',
    TURN            : 'turn',
    BET_TURN        : 'betTurn',
    RIVER           : 'river',
    BET_RIVER       : 'betRiver',
    SHOWDOWN        : 'showdown'
  }
  
  poker.holdem.state = [
    null,
    poker.holdem.ANTE,
    poker.holdem.SMALL_BLIND,
    poker.holdem.BIG_BLIND,
    poker.holdem.DEAL_HOLE_1,
    poker.holdem.DEAL_HOLE_2,
    poker.holdem.BET_PRE_FLOP,
    poker.holdem.FLOP,
    poker.holdem.BET_FLOP,
    poker.holdem.TURN,
    poker.holdem.BET_TURN,
    poker.holdem.RIVER,
    poker.holdem.BET_RIVER,
    poker.holdem.SHOWDOWN
  ]
  
}(this));