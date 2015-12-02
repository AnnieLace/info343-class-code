//uses node packages before gulp plugins
//(unlike grunt, where everything is a plug-in)
var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');


//like registering a task with grunt, one of four gulp commands
gulp.task('connect', function() {
   connect.server({
       root: 'dawg-coffee',
       livereload: true
   })
});

gulp.task('sass', function() {
    //another of four commands, takes files from that location
    //pipe is a function that comes from node streams, not a gulp command
    //pipe takes the things from one place and puts them in a new stream
    //this takes sass files and transforms them into css
    //and puts them in the css directory
    //(gulp.dest is the third command, puts things in a location, sort of the opposite of src)
    gulp.src('dawg-coffee/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dawg-coffee/css/'))
        .pipe(connect.reload());
    //web page in browser will instantly reflect sass changes with this last pipe
    //works best to do it after the individual task to keep them as separate as possible
});

gulp.task('uglify', function() {
    gulp.src('dawg-coffee/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('minify', function() {
    gulp.src('dawg-coffee/*.html')
    .pipe(minifyHTML())
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('sass:watch', function(){
    //the last gulp function
    //recompiles the files every time they change
    gulp.watch('dawg-coffee/scss/*.scss', ['sass']);
    gulp.watch('dawg-coffee/js/*.js', ['uglify']);
    gulp.watch('dawg-coffee/*.html', ['minify']);
});

gulp.task('copy', function() {
   gulp.src('dawg-coffee/img/*')
       .pipe(gulp.dest('dist/img/'));
});

gulp.task('default', ['sass:watch', 'connect']);