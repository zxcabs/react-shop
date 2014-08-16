'use strict';
var childProcess = require('child_process');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    camelize: true
});
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');


/** File paths */
var dist = 'dist';

var jsxFiles = 'frontend/**/*.jsx';
var pathToTraceur = 'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js';

gulp.task('vendor', function () {
    return gulp.src(pathToTraceur)
        .pipe(gulp.dest(dist + '/vendor'));
});

function compileScripts(watch) {
    plugins.util.log('Starting browserify');
    var entryFile = './dist/app/admin/AdminFrontend.jsx';

    var bundler = watchify(browserify(entryFile, {
        cache: {}, packageCache: {}, fullPaths: true, debug: true
    }));

    var rebundle = function () {
        var stream = bundler.bundle();

        stream.on('error', function (err) {
            (console.error || console.log)(err);
        });
        stream = stream.pipe(source(entryFile));
        stream.pipe(plugins.rename('app.js'));
        stream.pipe(gulp.dest('dist/bundle'));
    }

    bundler.on('update', rebundle);
    return rebundle();
}

function compileFrontend(watch) {
    plugins.util.log('Starting browserify frontend');
    var entryFile = './dist/app/frontend/SupplyClubTheme.jsx';
    var bundler = watchify(browserify(entryFile, {
        cache: {}, packageCache: {}, fullPaths: true, debug: true
    }));
    var rebundle = function () {
        var stream = bundler.bundle();

        stream.on('error', function (err) {
            (console.error || console.log)(err);
        });
        stream = stream.pipe(source(entryFile));
        stream.pipe(plugins.rename('frontend.js'));
        stream.pipe(gulp.dest('dist/bundle'));
    }

    bundler.on('update', rebundle);
    return rebundle();
}

var stylSelector = [
    'bower_components/font-awesome/css/font-awesome.css',
    'bower_components/normalize-css/normalize.css',
    'styles/**/*.styl'
];

gulp.task('build-fonts', function() {
    return gulp.src('bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
});
gulp.task('build-css', function() {
    return gulp.src(stylSelector)
        .pipe(plugins.cached('styles'))
        .pipe(plugins.stylus())
        .on('error', function(error) {
            (console.error || console.log)(error);
        })
        .pipe(plugins.autoprefixer())
        .pipe(plugins.remember('styles'))
        .pipe(plugins.concat('app.css'))
        .pipe(gulp.dest('dist/css'))
});

var jsSelector = 'react-store/**/*.jsx';
plugins.traceur.RUNTIME_PATH = pathToTraceur;
gulp.task('build-js', function() {
    return gulp.src(jsSelector)
        .pipe(plugins.cached('js'))
        .pipe(plugins.react({
            sourceMaps: true
        }))
        .pipe(plugins.traceur({
            sourceMaps: true,
            experimental: true
        }))
        .on('error', function(error) {
            plugins.util.log('js error:' + error);
        })
        .pipe(plugins.rename(function(path) {
            path.extname = '.jsx';
        }))
        .pipe(gulp.dest('dist/app'))
});


/**
 * Run default task
 */
gulp.task('default', ['build-css', 'build-fonts', 'build-js'], function () {
    compileScripts(true);
    compileFrontend(true);
    gulp.watch([stylSelector], ['build-css']);
    gulp.watch([jsSelector], ['build-js']);
});
