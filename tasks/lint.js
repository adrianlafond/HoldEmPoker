var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var srcFiles    = require('./files-src.json');

gulp.task('lint-src', function () {
  return gulp.src(srcFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('lint-spec', function () {
  return gulp.src('./spec/*Spec.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
gulp.task('lint', ['lint-src']);
