/**
 * Poker.Card
 */
function Card(options) {
  if (!(this instanceof Card)) {
    return new Card(options);
  }

  var face = (options.face === Card.FACE_UP) ? Card.FACE_UP : Card.FACE_DOWN;
  var community = options.hasOwnProperty('community') ?
    !!options.community : false;

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
        if (value === Card.FACE_UP || value === Card.FACE_DOWN) {
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

Object.defineProperties(Card, {
  FACE_UP: {
    value: 'faceUp',
    enumerable: true
  },
  FACE_DOWN: {
    value: 'faceDown',
    enumerable: true
  }
});

Card.prototype.clone = function () {
  return new Card({
    value: this.value,
    face: this.face,
    community: this.community
  });
};


