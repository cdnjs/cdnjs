var gulp = require('gulp'),
    jsx = require('gulp-jsx'),
    babel = require('gulp-babel'),
    rename = require("gulp-rename");

gulp.task('default', function(){
        return gulp.src('index.jsx')
                .pipe(babel())
                .pipe(jsx())
                .pipe(rename('index.js'))
                .pipe(gulp.dest('./'));
});
