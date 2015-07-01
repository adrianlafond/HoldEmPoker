/**
 * Poker.Card
 */
function Card(options) {
  if (!(this instanceof Card)) {
    return new Card(options);
  }

  if (typeof options === 'string') {
    options = { value: options };
  }
  var face = (options.face === Poker.FACE_UP) ? Poker.FACE_UP : Poker.FACE_DOWN;
  var community = options.hasOwnProperty('community') ?
    !!options.community : false;
  var hole = options.hasOwnProperty('hole') ?
    (options.hole === true || options.pocket === true) : false;

  Object.defineProperties(this, {
    value: {
      value: options.value,
      enumerable: true
    },
    rank: {
      value: options.value.charAt(0),
      enumerable: true
    },
    suit: {
      value: options.value.charAt(1),
      enumerable: true
    },
    face: {
      get: function () {
        return face;
      },
      set: function (value) {
        if (value === Poker.FACE_UP || value === Poker.FACE_DOWN) {
          face = value;
        }
      },
      enumerable: true
    },
    community: {
      get: function () {
        return community;
      },
      set: function (value) {
        community = !!value;
      },
      enumerable: true
    }
  });
}

Card.prototype.clone = function () {
  return new Card({
    value: this.value,
    face: this.face,
    community: this.community
  });
};
