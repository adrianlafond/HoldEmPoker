/**
 * Hold'em Poker. Child of Game.
 */
function GameHoldem(options) {
  // Call the Game parent, which validates and writes getters for options
  // common to all poker variants.
  Game.call(this, options);

  var players = [];
  for (var i = 0; i < options.players.length; i++) {
    players[i] = new Player(options.players[i].id, options.players[i].chips);
  }

  Object.defineProperties(this, {
    /**
     * @returns a (new) array with information about all players.
     */
    players: function () {
      var p = [];
      for (var i = 0; i < players.length; i++) {
        p[i] = players[i].data()
      }
      return p;
    },

    /**
     * @param {*} id
     * @returns info concerning a specific player.
     */
    player: function (id) {
      for (var i = 0; i < players.length; i++) {
        if (players[i].id === id) {
          return players[i].data();
        }
      }
      return null;
    }
  });
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
