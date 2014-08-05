'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var connect = require('connect');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var prefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var watchify = require('watchify');
var es6ify = require('es6ify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');


/** Config variables */
var serverPort = 8888;
var lrPort = 35731;


/** File paths */
var dist = 'dist';

var jsxFiles = 'frontend/**/*.jsx';

var vendorFiles = [
    'bower_components/react/react-with-addons.js',
    'node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js',
];
var vendorBuild = dist + '/vendor';
var requireFiles = './node_modules/react/react.js';


gulp.task('vendor', function () {
    return gulp.src(vendorFiles).
        pipe(gulp.dest(vendorBuild));
});

function compileScripts(watch) {
    gutil.log('Starting browserify');

    var entryFile = './frontend/editor.jsx';
    es6ify.traceurOverrides = {experimental: true};

    var bundler;
    if (watch) {
        bundler = watchify(entryFile);
    } else {
        bundler = browserify(entryFile);
    }

    bundler.require(requireFiles);
    bundler.transform(reactify);
    bundler.transform(es6ify.configure(/.jsx/));

    var rebundle = function () {
        var stream = bundler.bundle({ debug: true});

        stream.on('error', function (err) { console.error(err) });
        stream = stream.pipe(source(entryFile));
        stream.pipe(rename('app.js'));

        stream.pipe(gulp.dest('dist/bundle'));
    }

    bundler.on('update', rebundle);
    return rebundle();
}

var stylSelector = 'frontend/**/*.styl';
gulp.task('build-css', function() {
    return gulp.src(stylSelector)
        .pipe(stylus())
        .on('error', function(error) {
            (console.error || console.log)(error);
        })
        .pipe(prefixer())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist/css'))
});


function initWatch(files, task) {
    if (typeof task === "string") {
        gulp.start(task);
        gulp.watch(files, [task]);
    } else {
        task.map(function (t) { gulp.start(t) });
        gulp.watch(files, task);
    }
}


/**
 * Run default task
 */
gulp.task('default', ['vendor', 'build-css', 'server'], function () {
    function initWatch(files, task) {
        gulp.start(task);
        gulp.watch(files, [task]);
    }

    compileScripts(true);
    gulp.watch([stylSelector], ['build-css']);
});
