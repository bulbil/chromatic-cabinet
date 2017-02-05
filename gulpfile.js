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
    return gulp.src('./js/**/*.js')
        .pipe(jshint())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function(){
    // var glob = mainBowerFiles('**/*.scss');
    // glob.push('sass/**/*.scss');
    // console.log(glob);

    return gulp.src('sass/**/*.scss')
        .pipe(sass({
            includePaths: [ 'bower_components']
        }).on('error', sass.logError))
        .pipe(prefix())
        .pipe(gulp.dest('dist/css'));
});


// Task for serving blog with Browsersync
gulp.task('serve', ['scripts','styles','static'], function () {
    bs.init({server: {baseDir: 'dist'}, port: 4000});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', bs.reload);
});

gulp.task('dependencies', function(){
    return gulp.src(mainBowerFiles('**/*.js'))
    .pipe(concat('deps.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch',function(){
    gulp.watch('./*.html', ['static']);
    gulp.watch('./js/**/*.js', ['scripts']);
    gulp.watch('./sass/**/*.scss', ['styles']);
});

gulp.task('default', ['dependencies','watch','serve']);
