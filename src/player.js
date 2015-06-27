/**
 * Poker.Player
 */
function Player(options) {
  options = options || {};
  this.id = (options.id || Player.uid()) + '';
  this.chips = Math.max(0, +options.chips || 0);
  this.folded = false;
  this.hand = new Hand();
}

/**
 * Unique ID generator for Player instances.
 */
Player.uid = (function () {
  var uid = 0;
  return function () {
    return 'player-' + uid++;
  };
}());
