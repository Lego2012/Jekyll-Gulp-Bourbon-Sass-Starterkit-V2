var gulp   = require('gulp');
var rename = require('gulp-rename');
var config = require('../../config').normalize;

// Copy from _bitters-adjusted to base
gulp.task('copyNormalize', function() {
    gulp.src(config.src)
      .pipe(rename('_normalize.scss'))
      .pipe(gulp.dest(config.dest));
});
