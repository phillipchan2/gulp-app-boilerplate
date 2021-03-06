// Include gulp & gulp plugins
var concat = require('gulp-concat');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var minify = require('gulp-minify');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');

// Compile SASS
gulp.task('sass', function() {
	return gulp.src('src/scss/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(concat('app.css'))
	.pipe(gulp.dest('css'))
});

// Concat JS Files
gulp.task('scripts', function() {
	return gulp.src([
		'src/js/**/*.js'
		])
	.pipe(concat('app.js'))
	.pipe(minify(
		{
			ext:{
				min:'.min.js'
			},
			ignoreFiles: ['.combo.js', '-min.js']
		}
	))
	.pipe(gulp.dest('js'));
});

gulp.task('refresh', function() {
	return gulp.src('index.html')
	.pipe(livereload({start: true}))
});

// Watch for changes
gulp.task('watch', function() {
	// Watch .js files
	gulp.watch('src/js/*.js', ['scripts', 'refresh']);
	// Watch .scss files
	gulp.watch('src/scss/*.scss', ['sass', 'refresh']);
	// Watch HTML files
	gulp.watch('**/*.html', ['refresh']);
});


// Default Task
gulp.task('default', function() {
	runSequence('scripts', 'sass', 'watch', 'refresh');
});
