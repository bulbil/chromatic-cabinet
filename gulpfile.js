var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    wiredep = require('wiredep').stream;
    bs = require('browser-sync').create();

gulp.task('scripts', function(){
    return gulp.src('./js/**/*.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function(){
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(gulp.dest('dist/css'));
});


// Task for serving blog with Browsersync
gulp.task('serve', ['js'], function () {
    bs.init({server: {baseDir: '_site/'}, port: 4000});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', bs.reload);
});

gulp.task('deps', function(){
    return gul.src('./**/*.html')
        .pipe(wiredep())
        .pipe(gulp.dest('dest'))
});

gulp.task('watch',function(){
    gulp.watch('./js/*.js', ['js']);
});

gulp.task('default', ['deps','watch','serve']);
