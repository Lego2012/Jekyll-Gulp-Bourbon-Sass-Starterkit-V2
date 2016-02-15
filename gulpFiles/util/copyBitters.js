// Copy from _bitters-adjusted to base
gulp.task('copyBitters', function() {
    gulp.src('_assets/_scss/_bitters-adjusted/*.scss')
      .pipe(gulp.dest('_assets/_scss/0-plugins/base'));
});
