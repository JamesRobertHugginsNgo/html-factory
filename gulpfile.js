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

// -- BUILD NODE ---------------------------------------------------------------

function buildNode_withDebug() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(buildNode_withDebug) })
		.pipe(gulpPreprocess({ context: { TARGET: 'NODE', DEBUG: true } }))
		.pipe(gulpRename((path) => path.basename += '.debug'))
		.pipe(gulp.dest('./dist/node/'));
}

function buildNode_withoutDebug() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(buildNode_withoutDebug) })
		.pipe(gulpPreprocess({ context: { TARGET: 'NODE', DEBUG: false } }))
		.pipe(gulp.dest('./dist/node/'));
}

// -- BUILD BROWSER ESM --------------------------------------------------------

function buildBrowserEsm_withDebug() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(buildBrowserEsm_withDebug) })
		.pipe(gulpPreprocess({ context: { TARGET: 'BROWSER_ESM', DEBUG: true } }))
		.pipe(gulpRename((path) => path.basename += '.debug'))
		.pipe(gulp.dest('./dist/browser/esm/'));
}

function buildBrowserEsm_withoutDebug() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(buildBrowserEsm_withoutDebug) })
		.pipe(gulpPreprocess({ context: { TARGET: 'BROWSER_ESM', DEBUG: false } }))
		.pipe(gulp.dest('./dist/browser/esm/'))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourcemaps.init())
		.pipe(gulpTerser())
		.pipe(gulpSourcemaps.write('.'))
		.pipe(gulp.dest('./dist/browser/esm/'));
}

// -- BUILD BROWSER ES6 --------------------------------------------------------

function buildBrowserEs6_withDebug() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(buildBrowserEs6_withDebug) })
		.pipe(gulpPreprocess({ context: { TARGET: 'BROWSER_ES6', DEBUG: true } }))
		.pipe(gulpRename((path) => path.basename += '.debug'))
		.pipe(gulp.dest('./dist/browser/es6/'));
}

function buildBrowserEs6_withoutDebug() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(buildBrowserEs6_withoutDebug) })
		.pipe(gulpPreprocess({ context: { TARGET: 'BROWSER_ES6', DEBUG: false } }))
		.pipe(gulp.dest('./dist/browser/es6/'))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourcemaps.init())
		.pipe(gulpTerser())
		.pipe(gulpSourcemaps.write('.'))
		.pipe(gulp.dest('./dist/browser/es6/'));
}

// -- BUILD BROWSER ES5 --------------------------------------------------------

function buildBrowserEs5_withDebug() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(buildBrowserEs5_withDebug) })
		.pipe(gulpPreprocess({ context: { TARGET: 'BROWSER_ES5', DEBUG: true } }))
		.pipe(gulpBabel())
		.pipe(gulpRename((path) => path.basename += '.debug'))
		.pipe(gulp.dest('./dist/browser/es5/'));
}

function buildBrowserEs5_withoutDebug() {
	return gulp.src('./src/**/*.js', { since: gulp.lastRun(buildBrowserEs5_withoutDebug) })
		.pipe(gulpPreprocess({ context: { TARGET: 'BROWSER_ES5', DEBUG: false } }))
		.pipe(gulpBabel())
		.pipe(gulp.dest('./dist/browser/es5/'))
		.pipe(gulpRename((path) => path.basename += '.min'))
		.pipe(gulpSourcemaps.init())
		.pipe(gulpUglify())
		.pipe(gulpSourcemaps.write('.'))
		.pipe(gulp.dest('./dist/browser/es5/'));
}

// -- EXPORT -------------------------------------------------------------------

const build = gulp.parallel(
	buildNode_withDebug,
	buildNode_withoutDebug,
	buildBrowserEsm_withDebug,
	buildBrowserEsm_withoutDebug,
	buildBrowserEs6_withDebug,
	buildBrowserEs6_withoutDebug,
	buildBrowserEs5_withDebug,
	buildBrowserEs5_withoutDebug
);

function watch() {
	gulp.watch('src/**/*.js', build);
}

module.exports = {
	build: gulp.series(cleanup, build),
	watch: gulp.series(cleanup, build, watch)
};
