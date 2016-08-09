var gulp = require('gulp');

// Requires the gulp-sass plugin
var sass = require('gulp-sass');

// Pug / JADE
var pug = require('gulp-pug');
//Needed to save the pug file as a HTML
var rename = require("gulp-rename");


var browserSync = require('browser-sync').create();

gulp.task('hello', function() {
  console.log('Hello Andrew!');
});

gulp.task('sass-task', function(){
  return gulp.src('app/scss/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('pug-task', function buildHTML() {
  return gulp.src('app/pug/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(rename(function(path) {
        var filename = path.basename;
        path.basename = filename;
        path.extname = '.html';
        //path.dirname = filename;
        return path;
    }))
    .pipe(gulp.dest('public'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

//Automaticall run task
gulp.task('watch', ['browserSync', 'pug-task', 'sass-task'], function(){
  gulp.watch('app/scss/*.scss', ['sass-task']);
  gulp.watch('app/pug/*.pug', ['pug-task']);

  // Other watchers
  // Reloads the browser whenever HTML or JS files change
  //gulp.watch('app/css/*.css', browserSync.reload);
gulp.watch('app/*.html', browserSync.reload);
gulp.watch('app/js/*.js', browserSync.reload);
})


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
})
