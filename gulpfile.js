var gulp = require('gulp'),
	sass = require('gulp-sass'),
	less = require('gulp-less'),
	cleancss = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	header = require('gulp-header'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect');

var pkg = require('./package.json'),
	notes = ['/**',
	  ' * @author <%= pkg.author.name %>',
	  ' * @email <%= pkg.author.email %>',
	  ' * @descrip <%= pkg.description %>',
	  ' * @version v<%= pkg.version %>',
	  ' */',
	  ''].join('\n');

gulp.task('sass', function() {
	return gulp.src('dev/style/**/*.scss')
			.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
			.pipe(sass())
			.pipe(cleancss())
			.pipe(header(notes, { pkg : pkg } ))
			.pipe(gulp.dest('assets/style'))
			.pipe(livereload());
});

gulp.task('css', function(){
	return gulp.src('dev/**/*.css')
			.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
			.pipe(cleancss())
			.pipe(gulp.dest('assets'))
			.pipe(livereload());
});

gulp.task('uglifyjs', function() {
	return gulp.src(['dev/script/**/*.js', '!dev/script/**/*.min.js'])
			.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
			.pipe(uglify())
			.pipe(header(notes, { pkg : pkg } ))
			.pipe(gulp.dest('assets/script'))
			.pipe(livereload());
});

gulp.task('js', function(){
	return gulp.src('dev/script/**/*.min.js')
			.pipe(gulp.dest('assets/script'))
			.pipe(livereload());
});

gulp.task('json', function(){
	return gulp.src('dev/script/**/*.json')
			.pipe(gulp.dest('assets/script'))
			.pipe(livereload());
});

gulp.task('images', function(){
	return gulp.src('dev/**/*.{png,jpg,gif,svg,ico}')
			.pipe(gulp.dest('assets'))
			.pipe(livereload());
});

gulp.task('html', function(){
	return gulp.src('dev/**/*.html')
			.pipe(gulp.dest('assets'))
			.pipe(livereload());
});

gulp.task('htm', function(){
	return gulp.src('dev/**/*.htm')
		.pipe(gulp.dest('assets'))
		.pipe(livereload());
});

gulp.task('change', function() {
    gulp.src([
    	'dev/**/*.html',
		'dev/**/*.htm',
    	'dev/style/**/*.scss',
    	'dev/**/*.{png,jpg,gif,svg,ico}',
    	'dev/script/**/*.js',
    	'dev/script/**/*.json'
    	])
        .pipe(connect.reload());
});

// gulp.task('webserver', function() {
//     connect.server({
//     	host: '',
//     	port: 9999,
//     	root: './',
//     	livereload: true
//     });
// });

gulp.task('watch', function() {
    gulp.watch('dev/style/**/*.scss', ['sass']);
    gulp.watch('dev/**/*.css', ['css']);
    gulp.watch(['dev/script/**/*.js', '!dev/script/**/*.min.js'], ['uglifyjs']);
    gulp.watch('dev/script/**/*.min.js', ['js']);
    gulp.watch('dev/script/**/*.json', ['json']);
    gulp.watch('dev/**/*.{png,jpg,gif,svg,ico}', ['images']);
    gulp.watch('dev/**/*.html', ['html']);
	gulp.watch('dev/**/*.htm', ['htm']);
    gulp.watch([
    	'dev/**/*.html',
		'dev/**/*.htm',
    	'dev/style/**/*.scss',
    	'dev/**/*.{png,jpg,gif,svg,ico}',
    	'dev/script/**/*.js',
    	'dev/script/**/*.json'
    	], ['change']);
});

// gulp.task('server', ['sass', 'css', 'uglifyjs', 'js', 'images', 'html', 'webserver', 'watch']);
gulp.task('default', function(){
    gulp.start('sass', 'css', 'uglifyjs', 'js', 'json', 'images', 'html', 'htm', 'watch');
});