/**
 * Hold'em Poker. Child of Game.
 * @see Game for additional options common to all poker games.
 * @param {object} options
 * @param {number=} options.minimumBet Default is 10.
 * @param {number=} options.smallBlind Default is options.minimumBet / 2.
 * @param {number=} options.ante Default is 0. Must be >= 0.
 * @param {string=} options.variation Default is Poker.LIMIT; other options are
 *   Poker.NO_LIMIT and Poker.POT_LIMIT.
 * Possible future additions: straddles.
 */
function GameHoldem(options) {
  var data = {};
  Game.call(this, options, data);

  data.minBet = Game.validateBetOption('minBet', options.minBet, 10, 0);
  data.smallBlind = Game.validateBetOption('smallBlind', options.smallBlind,
    data.minBet / 2, 0, data.minBet);
  data.ante = Game.validateBetOption('ante', options.ante, 0, 0);
  data.maxRaises = Game.validateBetOption('maxRaises', options.maxRaises, 3, 0);

  switch (options.variation) {
    case Poker.LIMIT:
    case Poker.NO_LIMIT:
    case Poker.POT_LIMIT:
      data.variation = options.variation;
      break;
    case undefined:
    case null:
      data.variation = Poker.LIMIT;
      break;
    default:
      throw String(options.variation) + ' is not a valid hold\'em poker variant.';
  }

  Game.getter(this, data, 'minBet');
  Game.getter(this, data, 'smallBlind');
  Game.getter(this, data, 'bigBlind', 'minBet');
  Game.getter(this, data, 'ante');
  Game.getter(this, data, 'maxRaises');
  Game.getter(this, data, 'variation');

  var step = 'ante';
  var steps = [
    'ante',
    'smallblind',
    'bigblind',
    'deal-hole1',
    'deal-hole2',
    'bet-flopreflop',
    'burn-flop',
    'flop1',
    'flop2',
    'flop3',
    'bet-flop',
    'burn-turn',
    'turn',
    'bet-turn',
    'burn-river',
    'river',
    'bet-river',
    'showdown'
  ];

  // Used for ensuring all players are accounted for in antes, betting rounds, etc.
  var seats = [];

  function go(info) {
    switch (step) {
      case 'ante':
        doAnte();
        break;
      case 'smallblind':
        doSmallBlind();
        break;
    }
  }

  function doAnte() {
    if (ante) {
      //
    } else {
      step = 'smallblind';
      go();
    }
  }

  function doSmallBlind() {
    var a = new Game.Action(
      data.players[0].id,
      Poker.SMALL_BLIND,
      { chips: smallBlind }
    );
    // console.log(a.player);
    // console.log(a.action);
    // console.log(a.data);
    // action();
  }


 /**
  * Updates the game with information about a player's action. Designer to be
  * overridden by a method in a specific game class.
  * @param {object} info
  * @param {*} info.id The ID of the player who must take action.
  * @param {string} info.action The player's action; e.g., Poker.FOLD.
  * @param {number=} info.value If action is Poker.BET, the amount.
  */
 Object.defineProperty(this, 'go', {
   value: go,
   enumerable: true,
 })
}

GameHoldem.prototype = Object.create(Game.prototype);
GameHoldem.prototype.constructor = GameHoldem;



// ;(function (root, factory) {
//   /**
//    * Module pattern from https://github.com/umdjs/umd/blob/master/returnExports.js
//    */
//   if (typeof define === 'function' && define.amd) {
//     // AMD. Register as an anonymous module.
//     define(['disbranded.poker'], factory)
//   } else if (typeof exports === 'object') {
//     // Node. Does not work with strict CommonJS, but
//     // only CommonJS-like enviroments that support module.exports,
//     // like Node.
//     module.exports = factory(require('disbranded.poker'))
//   } else {
//     // Browser globals (root is window)
//     root.POKER.games = root.POKER.games || {}
//     root.POKER.games.Holdem = factory(root.POKER)
//   }
// }(this, function (Poker) {
//   'use strict'
//
//   var each = Poker.util.each,
//
//       defaults = {
//         action: null,
//         seats: 5,
//         limit: Poker.FIXED_LIMIT,
//         bets: [10, 20]
//       }
//
//
//
//   function Game(options) {
//     this.options = Poker.util.extend({}, defaults, options || {})
//     this.active = false
//     this.deck = new Poker.Deck
//     this.table = new Poker.Table({ seats: this.options.seats })
//     this.rounds = {
//       preflop: null,
//       flop: null,
//       turn: null,
//       river: null
//     }
//   }
//
//
//   Game.prototype = {
//
//
//     /**
//      * Starts a hand of poker.
//      * @returns {object} with "status" and "message" properties.
//      */
//     deal: function () {
//       var valid = this.validate()
//       if (valid.status === 200) {
//         this.active = true
//         this.deck.shuffle()
//         this.addPlayersToTable()
//
//         this.broadcast('button', { player: this.table.button().id })
//         this.rounds.preflop = new Poker.Round
//         this.smallBlind()
//         this.bigBlind()
//
//         this.dealHoleCard()
//         this.dealHoleCard()
//         console.log(this.summary())
//       }
//       return valid
//     },
//
//
//     smallBlind: function () {
//       var player = this.table.smallBlind(),
//           bet$ = Math.min(player.chips, this.options.bets[0] / 2),
//           bet = new Poker.Bet(player.id, bet$, player.chips === bet$),
//           data = {
//             player: player.id,
//             chips: bet$
//           }
//       player.chips -= bet$
//       this.rounds.preflop.bet(bet)
//       this.broadcast('smallblind', data)
//     },
//
//
//     bigBlind: function () {
//       var player = this.table.bigBlind(),
//           bet$ = Math.min(player.chips, this.options.bets[0]),
//           bet = new Poker.Bet(player.id, bet$, player.chips === bet$),
//           data = {
//             player: player.id,
//             chips: bet$
//           }
//       player.chips -= bet$
//       this.rounds.preflop.bet(bet)
//       this.broadcast('bigblind', data)
//     },
//
//
//
//     /**
//      * @api private
//      */
//     broadcast: function (type, data) {
//       this.options.action({
//         target: this,
//         type: type,
//         data: data
//       })
//     },
//
//
//     /**
//      * @api private
//      */
//     addPlayersToTable: function () {
//       each(this.options.players, function (player, i) {
//         this.table.add({
//           seat: player.seated,
//           player: new Poker.Player({
//             id: player.id,
//             chips: player.chips
//           })
//         })
//       }, this)
//     },
//
//
//     /**
//      * Deals a hole card face down to each player.
//      * @api private
//      */
//     dealHoleCard: function () {
//       each(this.options.players, function (player, i) {
//         var card = this.deck.deal()
//         card.face = Poker.FACE_DOWN
//         this.broadcast('deal:hole', {
//           to: player.id,
//           card: card
//         })
//       }, this)
//     },
//
//
//     /**
//      * Returns the status of the table for use by players.
//      */
//     summary: function () {
//       var seats = []
//       this.table.seats.forEach(function (player, index) {
//         if (player) {
//           seats[index] = {
//             id: player.id,
//             chips: player.chips,
//             folded: player.folded
//           }
//         } else {
//           seats[index] = null
//         }
//       })
//       return {
//         seats: seats,
//         button: this.table.button().id,
//         smallBlind: this.table.smallBlind().id,
//         bigBlind: this.table.bigBlind().id
//       }
//     },
//
//
//     /**
//      * Resets entirely, destroys knowledge of the table, players, etc.
//      */
//     reset: function () {
//       //
//     },
//
//
//     /**
//      * Ensures that options are valid before dealing a new hand.
//      * @api private
//      */
//     validate: function () {
//       var valid = {
//         status: 200,
//         message: null
//       }
//       if (this.active) {
//         valid.status = 500
//         valid.message = 'A hand is already in progress.'
//       }
//       if (this.options.players.length < 2) {
//         valid.status = 501
//         valid.message = 'There must be at least two players.'
//       }
//       if (typeof this.options.action !== 'function') {
//         valid.status = 502
//         valid.message = 'An "action" callback function was not defined.'
//       }
//       return valid
//     },
//   }
//
//
//   return Game
//
//   // return {
//   //   maxPlayers: 22,
//   //
//   //   game: [{
//   //     action: Poker.SHUFFLE
//   //
//   //   // deal
//   //   }, {
//   //     action: Poker.DEAL,
//   //     face: Poker.FACE_DOWN
//   //   }, {
//   //     action: Poker.DEAL,
//   //     face: Poker.FACE_DOWN
//   //
//   //   // pre-flop
//   //   }, {
//   //     action: Poker.BETTING_ROUND,
//   //     round: [
//   //       Poker.SMALL_BLIND,
//   //       Poker.BIG_BLIND,
//   //       Poker.BET
//   //     ]
//   //
//   //   // flop
//   //   }, {
//   //     action: Poker.BURN
//   //   }, {
//   //     action: Poker.DEAL,
//   //     face: Poker.COMMUNITY
//   //   }, {
//   //     action: Poker.DEAL,
//   //     face: Poker.COMMUNITY
//   //   }, {
//   //     action: Poker.DEAL,
//   //     face: Poker.COMMUNITY
//   //   }, {
//   //     action: Poker.BETTING_ROUND,
//   //     round: [Poker.BET]
//   //
//   //   // turn
//   //   }, {
//   //     action: Poker.BURN
//   //   }, {
//   //     action: Poker.DEAL,
//   //     face: Poker.COMMUNITY
//   //   }, {
//   //     action: Poker.BETTING_ROUND,
//   //     round: [Poker.BIG_BET]
//   //
//   //   // river
//   //   }, {
//   //     action: Poker.BURN
//   //   }, {
//   //     action: Poker.DEAL,
//   //     face: Poker.COMMUNITY
//   //   }, {
//   //     action: Poker.BETTING_ROUND,
//   //     round: [Poker.BIG_BET]
//   //   }]
//   // }
// }));
