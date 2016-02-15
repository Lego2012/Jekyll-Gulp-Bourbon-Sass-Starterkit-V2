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
