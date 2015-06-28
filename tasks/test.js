var gulp      = require('gulp');
var jasmine   = require('gulp-jasmine-phantom');
var sequence  = require('run-sequence');

var poker = ['./spec/pluck.js', './src/poker.js', './src/poker-constants.js'];
var hand = ['./src/card.js', './src/hand.js', './src/hand-static.js'];

gulp.task('test-card', function () {
  return gulp.src('./spec/cardSpec.js')
    .pipe(jasmine({
      integration: true,
      vendor: poker.concat([
        './src/card.js'
      ]),
      keepRunner: true
    }));
});

gulp.task('test-deck', function () {
  return gulp.src('./spec/deckSpec.js')
    .pipe(jasmine({
      integration: true,
      vendor: poker.concat([
        './src/card.js',
        './src/deck.js'
      ]),
      keepRunner: true
    }));
});

gulp.task('test-hand', function () {
  return gulp.src([
      './spec/handSpec.js',
      './spec/handHighSpec.js',
      './spec/handCompareHighSpec.js'
    ])
    .pipe(jasmine({
      integration: true,
      vendor: poker.concat(hand),
      keepRunner: true
    }));
});

gulp.task('test-player', function () {
  return gulp.src('./spec/playerSpec.js')
    .pipe(jasmine({
      integration: true,
      vendor: poker.concat(hand, [
        './src/player.js'
      ]),
      keepRunner: true
    }));
});

gulp.task('test-sidepot', function () {
  return gulp.src('./spec/sidepotSpec.js')
    .pipe(jasmine({
      integration: true,
      vendor: poker.concat(hand, [
        './src/player.js',
        './src/sidepot.js'
      ]),
      keepRunner: true
    }));
});

gulp.task('test-pot', function () {
  return gulp.src('./spec/potSpec.js')
    .pipe(jasmine({
      integration: true,
      vendor: poker.concat(hand, [
        './src/card.js',
        './src/player.js',
        './src/sidepot.js',
        './src/pot.js'
      ]),
      keepRunner: true
    }));
});


gulp.task('test', function () {
  sequence('test-card', 'test-deck', 'test-hand');
});
