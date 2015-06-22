var gulp      = require('gulp');
var jasmine   = require('gulp-jasmine-phantom');
var sequence  = require('run-sequence');

var LODASH = 'http://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.9.3/lodash.min.js';


gulp.task('test-card', function () {
  return gulp.src('./spec/cardSpec.js')
    .pipe(jasmine({
      integration: true,
      vendor: [
        LODASH,
        './src/card.js'
      ],
      keepRunner: true
    }));
});

gulp.task('test-deck', function () {
  return gulp.src('./spec/deckSpec.js')
    .pipe(jasmine({
      integration: true,
      vendor: [
        LODASH,
        './src/card.js',
        './src/deck.js'
      ],
      keepRunner: true
    }));
});


gulp.task('test', function () {
  sequence('test-card', 'test-deck');
});

