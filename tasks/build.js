var gulp        = require('gulp');
var srcFiles    = require('./files-src.json');

gulp.task('game', function () {
  return gulp.src(srcFiles)
    .pipe(gulp.dest('./game/js/game/'));
});
