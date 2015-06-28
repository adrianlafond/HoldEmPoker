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
