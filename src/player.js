/**
 * Poker.Player
 */
function Player(id, chips) {
  this.id = id;
  this.chips = Math.max(0, +chips || 0);
  this.folded = false;
  this.hand = new Hand();
  if (!this.id) {
    throw 'Player "id" is not valid.';
  }
}

/**
 * @returns {object} for sharing information about a player without sharing
 *   the original Player instance.
 */
Player.prototype.data = function () {
  return {
    id: this.id,
    chips: this.chips,
    folded: this.folded,
    hand: this.hand.data()
  };
};
