var build = require('./metalsmith');
var gulp = require("gulp");
var less = require('gulp-less');
var path = require('path');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/assets/css'));
});

/*
 * # TASKS #
 */

/*
 * serve build directory
 */
gulp.task('server', function () {
  browserSync.init({
      server: { baseDir: './build' }
  });
});

/*
 * build less files to css
 */
gulp.task('less', function() {
    gulp.src('./styles/**/*.less')
    .pipe(less({
        paths: [path.join(__dirname, 'styles', 'includes') ]
    }))
    .pipe(gulp.dest('./build/assets/css/'));
});

/*
 * copy all assets to build directory
 */
gulp.task('assets', function(){
  gulp.src('./assets/**/*')
  .pipe(gulp.dest('./build/assets/'));
})

/*
 * metalsmith building
 */
gulp.task('build', build);

/*
 * reload shorthand
 */
var reload = browserSync.reload;


/*
 * # DEFAULT TASK #
 * do metalsmith and css build
 * copy assets
 * serve build directory with livereload
 * watch files -> build
 * watch build folder -> reload browser
 */
gulp.task('default', ['build', 'less', 'assets', 'server'], function(){
  /*
   * ## WATCHES ##
   */
  // files which are built with metalsmith
  gulp.watch('./src/**/*', ['build']);
  gulp.watch('./templates/**/*', ['build']);

  // styles
  gulp.watch('./styles/**/*', ['less']);

  // assets
  gulp.watch('./assets/**/*', ['assets']);


  /*
   * ## RELOAD ##
   */
  // metalsmith
  gulp.watch('./build/index.html', reload);

  // assets
  gulp.watch('./build/assets/**/*', reload);
});
