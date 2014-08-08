'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var prefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var watchify = require('watchify');
var es6ify = require('es6ify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');


/** File paths */
var dist = 'dist';

var jsxFiles = 'frontend/**/*.jsx';

function compileScripts(watch) {
    gutil.log('Starting browserify');

    var entryFile = './frontend/index.jsx';
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

var stylSelector = 'styles/**/*.styl';
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


// gulp.task('server', function (next) {
//     var server = connect();
//     server.use(connect.static(dist)).listen(serverPort, next);
// });


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
gulp.task('default', ['build-css'], function () {
    function initWatch(files, task) {
        gulp.start(task);
        gulp.watch(files, [task]);
    }

    //compileScripts(true);

//    gulp.watch([dist + '/**/*'], reloadPage);
    gulp.watch([stylSelector], ['build-css']);
});
