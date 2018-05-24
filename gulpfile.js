
var gulp = require('gulp');

// var connect = require('connect');
// var serve = require('serve-static');
var browsersync = require('browser-sync');
// var browserify = require('browserify'); 
// var source = require('vinyl-source-stream'); 
// var beeper = require('beeper');
// var del = require('del');

// var concat = require('gulp-concat');
// var sass = require('gulp-sass');
// var myth = require('gulp-myth');
// var uglify = require('gulp-uglify');
// var jshint = require('gulp-jshint');
// var imagemin = require('gulp-imagemin');
// var plumber = require('gulp-plumber');
// var sourcemaps = require('gulp-sourcemaps')

gulp.task('html', function() {
    return gulp.src('index.html')
        // .pipe(plumber())
        .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
    return gulp.src('css/*.css')
        // .pipe(plumber({
        //     errorHandler: onError
        // }))
        // // .pipe(jshint())
        // // .pipe(jshint.reporter('default'))
        // .pipe(concat('all.css'))
        // .pipe(myth())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init()) 
        .pipe(concat('all.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(sourcemaps.write('/maps')) 
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('app/img/*')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('server', function() {
    return connect().use(serve(__dirname))
        .listen(8080)
        .on('listening', function() {
        console.log('Server Running: View at http://localhost:8080');
 }); });

 gulp.task('browsersync', function(cb) {
    return browsersync({
        server: {
            baseDir:'./'
    } }, cb);
});

gulp.task('browserify', function() {
    return browserify('./dist/all.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function (fileName, cb) {
    del(['dist/*'], cb);
});

gulp.task('watch', function() {
    gulp.watch('index.html', ['html', browsersync.reload]);
    gulp.watch('css/*.css', ['styles', browsersync.reload]);
    
    // gulp.watch('app/js/*.js', ['scripts', browsersync.reload]);
    // gulp.watch('app/img/*', ['images', browsersync.reload]);
});

gulp.task('default', ['html', 'styles', 'browsersync', 'watch']);

//////////////////////////////////

 // Error Helper
function onError(err) {
    beeper();
    console.log(err);
}