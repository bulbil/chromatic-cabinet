var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    mainBowerFiles = require('main-bower-files'),
    bs = require('browser-sync').create();

gulp.task('static', function(){
    return gulp.src('./*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function(){
    return gulp.src([
        './js/**/*.js'
        ])
        .pipe(jshint())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function(){
    return gulp.src('sass/**/*.scss')
        .pipe(sass({
            includePaths: [ 'bower_components']
        }).on('error', sass.logError))
        .pipe(prefix())
        .pipe(gulp.dest('dist/css'));
});


// Task for serving blog with Browsersync
gulp.task('serve', function () {
    bs.init({server: {baseDir: 'dist'}, port: 4000});
    // Reloads page when some of the already built files changed:
    gulp.watch('dist/**/*').on('change', bs.reload);
});

gulp.task('dependencies', function(){
    var glob = mainBowerFiles('**/*.js');
    return gulp.src(glob)
        .pipe(concat('deps.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch',function(){
    gulp.watch('./*.html', ['static']);
    gulp.watch('./js/**/*.js', ['scripts']);
    gulp.watch('./sass/**/*.scss', ['styles']);
});

gulp.task('default', ['dependencies','styles','watch','scripts','serve']);
