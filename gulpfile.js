var gulp      = require('gulp');
var jshint    = require('gulp-jshint');
var jasmine   = require('gulp-jasmine-phantom');



var srcFiles = [
  './src/card.js',
  './src/deck.js'
];


gulp.task('lint-src', function () {
  return gulp.src(srcFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('lint-spec', function () {
  return gulp.src('./spec/deckSpec.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('lint', ['lint']);

gulp.task('test', function () {
  return gulp.src('./spec/deckSpec.js')
    .pipe(jasmine({
      integration: true,
      vendor: [
        'http://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.9.3/lodash.min.js',
        './src/card.js',
        './src/deck.js'
      ]
    }));
});

gulp.task('default', ['lint']);
