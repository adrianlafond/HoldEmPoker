/**
 * Poker.Card
 */
function Card(options) {
  if (!(this instanceof Card)) {
    return new Card(options);
  }
  this.value = options.value;
  this.rank = this.value.charAt(0);
  this.suit = this.value.charAt(1);
  this.face = (options.face === Card.FACE_UP) ? Card.FACE_UP : Card.FACE_DOWN;
  this.community = options.hasOwnProperty('community') ?
    !!options.community : false;
}

Card.FACE_UP    = 'faceUp';
Card.FACE_DOWN  = 'faceDown';

Card.prototype.clone = function () {
  return Card({
    value: this.value,
    face: this.face,
    community: this.community
  });
};
