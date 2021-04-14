// grab our gulp packages
const gulp = require('gulp');
const gutil = require('gulp-util');
const { execSync } = require('child_process');

function runCmd(taskName, cmd) {
    try {
        execSync(cmd, {stdio: [0, 1, 2]});
    }
    catch (error) {
        throw new gutil.PluginError({
            plugin: taskName,
            message: error.message
        });
    }
}

gulp.task('eslint', function eslintTask(done) {
    runCmd('eslint', 'npm run eslint-fix');
    done();
});

gulp.task('dev-test', gulp.series('eslint', function devTestTask(done) {
    runCmd('dev-test', 'npm run dev-test');
    done();
}));

gulp.task('esdoc', gulp.series('dev-test', function esdocTask(done) {
    runCmd('esdoc', 'npm run esdoc');
    done();
}));

gulp.task('webpack', gulp.series('esdoc', function webpackTask(done) {
    runCmd('webpack', 'npm run webpack');
    done();
}));

gulp.task('prod-test', gulp.series('webpack', function prodTestTask(done) {
    runCmd('prod-test', 'npm run prod-test');
    done();
}));

gulp.task('web-test', gulp.series('prod-test', function prodTestTask(done) {
    runCmd('web-test', 'npm run web-test');
    done();
}));

gulp.task('build', gulp.series('web-test', function buildTask(done) {
    gutil.log('Build is complete.');
    done();
}));

gulp.task('watch', function watchTask(done) {
    gulp.watch(['src/**/*.js', 'test/**/*.js', 'gulpfile.js', 'package.json'], gulp.series('build'));
    done();
});

gulp.task('default', gulp.series('build', 'watch', function defaultTask(done) {
    gutil.log('Default task is complete.');
    done();
}));
