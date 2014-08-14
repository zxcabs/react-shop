'use strict';
var childProcess = require('child_process');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    camelize: true
});
var browserify = require('browserify');
var watchify = require('watchify');
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

    var bundler;
    if (watch) {
        bundler = watchify(entryFile);
    } else {
        bundler = browserify(entryFile);
    }

    var rebundle = function () {
        var stream = bundler.bundle({ debug: true});

        stream.on('error', function (err) { console.error(err) });
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
        .pipe(plugins.stylus())
        .on('error', function(error) {
            (console.error || console.log)(error);
        })
        .pipe(plugins.autoprefixer())
        .pipe(plugins.concat('app.css'))
        .pipe(gulp.dest('dist/css'))
});

var jsSelector = ['react-store/**/*.js','react-store/**/*.jsx'];
plugins.traceur.RUNTIME_PATH = pathToTraceur;
gulp.task('build-js', function() {
    return gulp.src(jsSelector)
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
        .pipe(gulp.dest('dist/app'))
});

gulp.task('server', ['vendor', 'build-js'], (function() {
    var child = null;
    var id = 0;
    return function reload(next) {
        if (child) {
            child.removeAllListeners();
            child.kill();
        }
        child = childProcess.fork('./worker.js');
        child.___id = ++id;
        child.on('close', function(code) {
            var self = this;
            plugins.util.log('Stopping server with id "' + self.___id + '" with code "' + code + '"');
            setTimeout(function() {
                if (self.___id === id) {
                    reload();
                }
            }, 50);
        }.bind(child));
        child.stdout.on('data', function(data) {
            plugins.util.log('Log from id: ' + this.___id + '. ' + data);
        }.bind(child));
        child.stderr.on('data', function(data) {
            plugins.util.log('Error from id: ' + this.___id + '. ' + data);
        }.bind(child));

        if (next) {
            next();
        }
    }
})());



/**
 * Run default task
 */
gulp.task('default', ['server'], function () {
    compileScripts(true);
    gulp.watch([stylSelector], ['build-css']);
    gulp.watch([jsSelector], ['build-css']);
});
