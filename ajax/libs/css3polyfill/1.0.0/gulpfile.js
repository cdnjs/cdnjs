var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var insert = require('gulp-insert');
var concat = require('gulp-concat');

var info = "/*" + "\n" +
        "*  CSS3polyfill - v1.0.0" + "\n" +
        "*  A CSS3 polyfill collection for IE8" + "\n" +
        "*  https://github.com/marcofugaro/css3polyfill" + "\n" +
        "*  License: MIT" + "\n" +
        "**/" + "\n\n";

gulp.task('build', function() { 
    return gulp.src('./libs/**/*.js')  
        .pipe(concat('css3polyfill.js'))
        .pipe(insert.prepend(info))
        .pipe(gulp.dest('.'))
        .pipe(uglify({ preserveComments: 'license' }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('.')) 
});

gulp.task('default', ['build']);