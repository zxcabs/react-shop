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

    var bundler = watchify(browserify(entryFile, watchify.args))

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

var stylSelector = 'styles/**/*.styl';
gulp.task('build-css', function() {
    return gulp.src(stylSelector)
        .pipe(plugins.cached('styles'))
        .pipe(plugins.stylus())
        .on('error', function(error) {
            (console.error || console.log)(error);
        })
        .pipe(plugins.autoprefixer())
        .pipe(plugins.concat('app.css'))
        .pipe(gulp.dest('dist/css'))
});

var jsSelector = 'react-store/**/*.jsx';
plugins.traceur.RUNTIME_PATH = pathToTraceur;
gulp.task('build-js', function() {
    return gulp.src(jsSelector)
        .pipe(plugins.cached('scripts'))
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

gulp.task('server', ['vendor', 'build-js'], (function() {
    var child = null;
    var id = 0;
    return function reload(next) {
        if (child) {
            child.kill();
        }
        child = childProcess.fork('./worker.js');
        child.___id = ++id;
        child.on('exit', function(code) {
            plugins.util.log('Stopping server with id "' + this.___id + '"');
            this.removeAllListeners();
        }.bind(child));

        child.on('message', function(data) {
            if (data === 'server started') {
                if (next) {
                    next();
                }
            }
        })
    }
})());



/**
 * Run default task
 */
gulp.task('default', ['build-css', 'server'], function () {
    compileScripts(true);
    gulp.watch([stylSelector], ['build-css']);
    gulp.watch([jsSelector], ['server']);
});
