const del = require('del');
const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpPreprocess = require('gulp-preprocess');
const gulpRename = require('gulp-rename');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpTerser = require('gulp-terser');
const gulpUglify = require('gulp-uglify');

// -- CLEAN UP -----------------------------------------------------------------

function cleanup() {
	return del('./dist/');
}

// -- NODE ---------------------------------------------------------------------

// BUILD NODE DEBUG
// function build_node_debug() {
// 	return gulp.src('./src/**/*.js', { since: gulp.lastRun(build_node_debug) })
// 		.pipe(gulpPreprocess({ context: { TARGET: 'NODE', DEBUG: true } }))
// 		.pipe(gulpRename((path) => path.basename += '.debug'))
// 		.pipe(gulp.dest('./dist/node/'));
// }

// BUILD NODE
// function build_node() {
// 	return gulp.src('./src/**/*.js', { since: gulp.lastRun(build_node) })
// 		.pipe(gulpPreprocess({ context: { TARGET: 'NODE', DEBUG: false } }))
// 		.pipe(gulp.dest('./dist/node/'));
// }

// -- BROWSER ES6 MODULE -------------------------------------------------------

// BUILD BROWSER ES6 MODULE DEBUG
function build_browser_es6Module_debug() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(build_browser_es6Module_debug) })
		.pipe(gulpPreprocess({ context: { TARGET: 'BROWSER_ES6_MODULE', DEBUG: true } }))
		.pipe(gulpRename((path) => path.basename += '.debug'))
		.pipe(gulp.dest('./dist/browser/es6-module/'));
}

// BUILD BROWSER ES6 MODULE
function build_browser_es6Module() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(build_browser_es6Module) })
		.pipe(gulpPreprocess({ context: { TARGET: 'BROWSER_ES6_MODULE', DEBUG: false } }))
		.pipe(gulp.dest('./dist/browser/es6-module/'))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourcemaps.init())
		.pipe(gulpTerser())
		.pipe(gulpSourcemaps.write('.'))
		.pipe(gulp.dest('./dist/browser/es6-module/'));
}

// -- BROWSER ES6 --------------------------------------------------------------

// BUILD BROWSER ES6 DEBUG
function build_browser_es6_debug() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(build_browser_es6_debug) })
		.pipe(gulpPreprocess({ context: { TARGET: 'BROWSER_ES6', DEBUG: true } }))
		.pipe(gulpRename((path) => path.basename += '.debug'))
		.pipe(gulp.dest('./dist/browser/es6/'));
}

// BUILD BROWSER ES6
function build_browser_es6() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(build_browser_es6) })
		.pipe(gulpPreprocess({ context: { TARGET: 'BROWSER_ES6', DEBUG: false } }))
		.pipe(gulp.dest('./dist/browser/es6/'))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourcemaps.init())
		.pipe(gulpTerser())
		.pipe(gulpSourcemaps.write('.'))
		.pipe(gulp.dest('./dist/browser/es6/'));
}

// -- BROWSER ES5 --------------------------------------------------------------

// BUILD BROWSER ES5 DEBUG
function build_browser_es5_debug() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(build_browser_es5_debug) })
		.pipe(gulpPreprocess({ context: { TARGET: 'BROWSER_ES5', DEBUG: true } }))
		.pipe(gulpBabel())
		.pipe(gulpRename((path) => path.basename += '.debug'))
		.pipe(gulp.dest('./dist/browser/es5/'));
}

// BUILD BROWSER ES5
function build_browser_es5() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(build_browser_es5) })
		.pipe(gulpPreprocess({ context: { TARGET: 'BROWSER_ES5', DEBUG: false } }))
		.pipe(gulpBabel())
		.pipe(gulp.dest('./dist/browser/es5/'))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourcemaps.init())
		.pipe(gulpUglify())
		.pipe(gulpSourcemaps.write('.'))
		.pipe(gulp.dest('./dist/browser/es5/'));
}

// -----------------------------------------------------------------------------

const build = gulp.parallel(
	// build_node_debug,
	// build_node,
	build_browser_es6Module_debug,
	build_browser_es6Module,
	build_browser_es6_debug,
	build_browser_es6,
	build_browser_es5_debug,
	build_browser_es5
);

function watch() {
	gulp.watch('src/**/*.js', build);
}

module.exports = {
	build: gulp.series(cleanup, build),
	watch: gulp.series(cleanup, build, watch)
};
