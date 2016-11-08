'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');
let browserify = require('browserify');
let source = require('vinyl-source-stream');

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
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./js/'));
});
