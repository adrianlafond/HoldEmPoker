var gulp        = require('gulp');

// Include tasks in ./tasks folder.
var requireDir  = require('require-dir');
var dir         = requireDir('./tasks');

gulp.task('default', ['lint']);
