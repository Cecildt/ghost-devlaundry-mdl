var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject');
  
 var jsFiles = ['assets/js/prism.js', 'assets/js/jquery.fitvids.js',
                'assets/js/jquery.ghostrelated.js', 'assets/js/jquery.toc.js',
                'assets/js/readingTime.min.js', 'assets/js/index.js'];
                
var cssFiles = ['assets/css/materialdesignicons.min.css', 'assets/css/prism.css', 
                'assets/css/devlaundry.css']
    
 gulp.task('compress-js', function() {
  return gulp.src(jsFiles)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/dist'));
});

gulp.task('compress-css', function () {
	gulp.src(cssFiles)
        .pipe(concat('all.css'))
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('assets/dist'));
});

gulp.task('inject-prod', function () {
  var target = gulp.src('./default.hbs');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['assets/dist/all.min.js', 'assets/dist/all.min.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});

gulp.task('inject-cdn', function () {
  // Not working yet.
  var target = gulp.src('./default.hbs');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['https://cdn.devlaundry.com/assets/dist/all.min.js', 'https://cdn.devlaundry.com/assets/dist/all.min.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});

gulp.task('inject-dev', function () {
  var target = gulp.src('./default.hbs');
   
  var sourcesJS = gulp.src(jsFiles, {read: false});
  var sourcesCss = gulp.src(cssFiles, {read: false});
  
  target.pipe(inject(sourcesCss))
    .pipe(gulp.dest('./'));
 
  return target.pipe(inject(sourcesJS))
    .pipe(gulp.dest('./'));
});

gulp.task('prod', ['compress-js', 'compress-css', 'inject-prod']);
gulp.task('dev', ['inject-dev']);