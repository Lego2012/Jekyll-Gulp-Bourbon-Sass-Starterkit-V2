var gulp   = require('gulp');
var config      = require('../../config').bitters;

// Copy from _bitters-adjusted to base
gulp.task('copyBitters', function() {
    gulp.src(config.src)
      .pipe(gulp.dest(config.dest));
});
