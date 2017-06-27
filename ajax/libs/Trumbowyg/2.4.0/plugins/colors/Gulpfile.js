// jshint node:true
'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

var paths = {
    mainStyle: 'ui/sass/trumbowyg.colors.scss',
    styles: {
        sass: 'ui/sass',
        includePaths: ['ui/sass', '../../src/ui/sass/mixins']
    }
};

var pkg = require('../../package.json');
var banner = ['/**',
    ' * <%= pkg.title %> v<%= pkg.version %> - <%= pkg.description %>',
    ' * <%= description %>',
    ' * ------------------------',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' * @author <%= pkg.author.name %>',
    ' *         Twitter : @AlexandreDemode',
    ' *         Website : <%= pkg.author.url.replace("http://", "") %>',
    ' */',
    '\n'].join('\n');
var bannerLight = ['/** <%= pkg.title %> v<%= pkg.version %> - <%= pkg.description %>',
    ' - <%= pkg.homepage.replace("http://", "") %>',
    ' - License <%= pkg.license %>',
    ' - Author : <%= pkg.author.name %>',
    ' / <%= pkg.author.url.replace("http://", "") %>',
    ' */',
    '\n'].join('');



gulp.task('styles', function () {
    return gulp.src(paths.mainStyle)
        .pipe($.sass({
            sass: paths.styles.sass,
            includePaths: paths.styles.includePaths
        }))
        .pipe($.autoprefixer(['last 1 version', '> 1%', 'ff >= 20', 'ie >= 8', 'opera >= 12', 'Android >= 2.2'], {cascade: true}))
        .pipe($.header(banner, {pkg: pkg, description: 'Colors plugin stylesheet for Trumbowyg editor'}))
        .pipe(gulp.dest('../../dist/plugins/colors/ui/'))
        .pipe($.size({title: 'trumbowyg.colors.css'}))
        .pipe($.rename({suffix: '.min'})) // génère une version minimifié
        .pipe($.minifyCss())
        .pipe($.header(bannerLight, {pkg: pkg}))
        .pipe(gulp.dest('../../dist/plugins/colors/ui/'))
        .pipe($.size({title: 'trumbowyg.colors.min.css'}));
});


gulp.task('sass-dist', function () {
    return gulp.src('ui/sass/**/*.scss')
        .pipe($.header(banner, {pkg: pkg, description: 'Colors plugin stylesheet for Trumbowyg editor'}))
        .pipe(gulp.dest('../../dist/plugins/colors/ui/sass/'));
});


gulp.task('watch', function () {
    gulp.watch(paths.mainStyle, ['styles']);
});


gulp.task('build', ['styles', 'sass-dist']);

gulp.task('default', ['build', 'watch']);