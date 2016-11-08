'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let babelify = require("babelify");

// default
gulp.task('default', ['build']);

// build
gulp.task('build', () => {
    runSequence(['browserify']);
});

// browserify
gulp.task('browserify', () => {
    browserify({
        entries: ['./js/index.js'],
    })
    .transform(babelify, { presets: ["es2015", "react"] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./js/'));
});
