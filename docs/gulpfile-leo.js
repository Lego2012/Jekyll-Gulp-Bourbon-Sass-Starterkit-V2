var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    sass            = require('gulp-ruby-sass'),
    prefix          = require('autoprefixer'),
    cp              = require('child_process'),
    concat          = require('gulp-concat'),
    changed         = require('gulp-changed'),
    rename          = require('gulp-rename'),
    size            = require('gulp-size'),
    sourcemaps      = require('gulp-sourcemaps'),
    postcss         = require('gulp-postcss'),
    uglify          = require('gulp-uglify'),
    runSequence     = require('run-sequence'),
    imagemin        = require('gulp-imagemin'),
    plumber         = require('gulp-plumber'),
    del             = require('del'),
    gulpFilter      = require('gulp-filter'),
    imageResize     = require('gulp-image-resize'),
    htmlmin         = require('gulp-htmlmin');

// Browser Sync
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// =====================================
// Jekyll Task
// =====================================
// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Rebuild the Jekyll site and reload the browser
gulp.task('jekyll-rebuild', function () {
    browserSync.reload();
    runSequence('jekyll-build', ['js', 'js:vendor', 'sass', 'img']);
});

// =====================================
// Browser-Sync Task
// =====================================
// Wait for Jekyll, then start server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'site'
        },
        notify: false
    });
});

// =====================================
// Sass Task
// =====================================
gulp.task('sass', function () {
    // Don't write Sourcemaps of Sourcemaps
    var filter = gulpFilter(['*.css', '!*.map'], {restore: true});
    return sass('_assets/_scss/main.sass', {style: 'compressed', sourcemap: true })
        .pipe(postcss([ prefix({ browsers: ['> 5%'] }) ]))
        .pipe(filter) // Don't write Sourcemaps of Sourcemaps
        .pipe(sourcemaps.write())
        .pipe(filter.restore) // Recreate original files
        .pipe(gulp.dest('site/css'))
        .pipe(browserSync.reload({stream:true}))
});

// =====================================
// Scripts Task
// =====================================

gulp.task('js', function(){
    return gulp.src(['_assets/_js/**/*.js', '!_assets/_js/**/*.min.js'])
        .pipe(plumber())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('site/js'))
        .pipe(browserSync.reload({stream:true}));
});

// Compile the files of `_src/_assets/_vendor` to `site/js`, `site/css` etc. (for live injecting)
gulp.task('js:vendor', function(){
    return gulp.src('_assets/_vendor/**/*.js')
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('site/js'))
        .pipe(browserSync.reload({stream:true}));
});

// =====================================
// Image optimization Task
// =====================================
gulp.task('img', function () {
    return gulp.src(['_assets/_img/*.*'])
        .pipe(changed('site/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('site/img'))
        .pipe(browserSync.reload({stream:true}));
});

// =====================================
// Minify HTML Task
// =====================================
gulp.task('minify', function() {
  return gulp.src('site/**/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true
    }))
    .pipe(gulp.dest('site'))
});

// =====================================
// Watch Task
// =====================================
gulp.task('watch', function () {
    gulp.watch('_assets/_vendor/**/*.scss', ['sass']);
    gulp.watch('_assets/_scss/**/*.sass', ['sass']);
    gulp.watch(['_assets/_js/**/*.js', '!/_assets/_js/vendor/**/*.js'], ['js']);
    gulp.watch('_assets/_img/**/*', ['img']);
    gulp.watch(['_src/**/*.html', '_src/_includes/*', '_src/_posts/*'], ['jekyll-rebuild']);
    gulp.watch('_config.yml', ['jekyll-rebuild']);
    gulp.watch('_src/_data/**/*.yml', ['jekyll-rebuild']);
});

gulp.task('build', function(callback) {
    runSequence('jekyll-build', ['copyBitters', 'js', 'js:vendor', 'sass', 'img', 'minify']);
});

// =====================================
// Default Task
// =====================================
// Default task. With `gulp` the assets are compiled and the Jekyll site is prepared for upload
gulp.task('default', ['serve']);

// With `gulp serve` Sass and the Jekyll site get compiled
// BrowserSync gets started & the files are being watched
gulp.task('serve', function(callback) {
    runSequence('jekyll-build', ['js', 'js:vendor', 'sass', 'img', 'browser-sync'], 'watch');
});

// =====================================
// Helper Tasks
// =====================================
// Copy from _bitters-adjusted to base
gulp.task('copyBitters', function() {
    gulp.src('_assets/_scss/_bitters-adjusted/*.scss')
      .pipe(gulp.dest('_assets/_scss/0-plugins/base'));
});

// Delete images in `site`
gulp.task('delimgsite', function() {
    del([ 'site/img/**/*' ] );
});

// Delete images in `site` and `_assets/_img`
// Die Task delimgsite wird innerhalb von delimg aufgerufen
gulp.task('delimg', ['delimgsite'], function() {
    del([ '_assets/_img/*-*' ] );
});

// Generate small and large thumbnails
// The task `thumb` is called inside `thumbnails`
gulp.task('thumbnails', ['thumb'], function () {
    gulp.src(['_assets/_img/**/*.*', '!_assets/_img/*-*.*'])
        .pipe(imageResize({
            width : 1024,
            height : 768,
            crop : true,
            upscale : false,
            GraphicsMagick: true
        }))
        .pipe(imagemin())
        .pipe(rename({suffix: '-large'}))
        .pipe(gulp.dest('_assets/_img'))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest('site/img'));
});

// Is called above in `thumbnails`
gulp.task('thumb', function () {
    gulp.src(['_assets/_img/**/*.*', '!_assets/_img/*-*.*'])
        .pipe(imageResize({
            width : 320,
            height : 240,
            crop : true,
            upscale : false,
            GraphicsMagick: true
        }))
        .pipe(imagemin())
        .pipe(rename({suffix: '-thumb'}))
        .pipe(gulp.dest('_assets/_img'))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest('site/img'));
});
