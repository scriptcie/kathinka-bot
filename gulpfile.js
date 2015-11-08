var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

// Remove ugly stack trace (this is an ugly solution to an ugly problem)
console.oldError = console.error;
console.error = function() {
    if (typeof arguments.stack !== 'undefined') {
        console.oldError.call(console, arguments.stack);
    } else {
        if (typeof arguments[4] !== 'undefined') arguments[4] = "...";
        console.oldError.apply(console, arguments);
    }
 }

gulp.task('mocha', function() {
    return gulp.src(['test/**/*.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec', // list ?
            globals: {
                should: require('should'),
            },
        }))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(['./src/**/*.js', './test/**/*.js'], ['mocha']);
});

// Default Task
gulp.task('default', ['mocha', 'watch-mocha']);