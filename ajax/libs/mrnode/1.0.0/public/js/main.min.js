// Mr.node
// Copyright 2017 Talon Bragg
// Open Source and free to use
// Licensed under the MIT liscense
//Variables
var fs = require('fs');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var uglify = require('gulp-uglifyjs');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var beautify = require('gulp-beautify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var mrnode = module.exports;


mrnode.create = function(name, extension) {
    fs.writeFile(name + '.' + extension, '//change the name of this file to whatever you like', function(err) {
        if (err) return console.log(err);
        console.log('File Created');
    });
};

// Delete Files
mrnode.delt = function(file, dest) {
    gulp.task('delt', function() {
        return gulp.src(file)
            .pipe(vinylPaths(del))
            .pipe(stripDebug())
            .pipe(gulp.dest(dest));
        if (!file) {
            console.log('ERR! : No File Specified!');
        } else if (!dest) {
            console.log('ERR! : No File Specified');
        } else {
            console.log('Success! File Deleted');
        }
    });


    gulp.task('default', ['clean:tmp']);
};
mrnode.minifyjs = function(file, dest) {
    gulp.task('uglify', function() {
        gulp.src(file)
            .pipe(uglify())
            .pipe(gulp.dest(dest))
    });
    if (!file) {
        console.log('ERR! : No File Specified!');
    } else if (!dest) {
        console.log('ERR! : No Destination Specified');
    } else {
        console.log('Success! File minified!');
    }
};
mrnode.minifycss = function(file, dest) {
    gulp.task('minify', function() {
        return gulp.src([file])
            .pipe(minifyCSS())
            .pipe($.header(comment))
            .pipe($.size())
            .pipe($.concat('main.min.css'))
            .pipe(gulp.dest(dest));
    });
    if (!file) {
        console.log('ERR! : No File Specified!');
    } else if (!dest) {
        console.log('ERR! : No Destination Specified');
    } else {
        console.log('Success! File minified!');
    }
};
//Beautify Files
mrnode.beautify = function(file, dest) {
    gulp.task('beautify', function() {
        gulp.src(file)
            .pipe(beautify({
                indent_size: 2
            }))
            .pipe(gulp.dest(dest))
    });
    if (!file) {
        console.log('ERR! : No File Specified');
    } else if (!dest) {
        console.log('ERR! : No Destination Specified!');
    } else {
        console.log('Success! File Beautified!');
    }
};
//Covert sass to css
mrnode.csass = function(file, dest) {
    gulp.task('sass', function() {
        return gulp.src(file)
            .pipe(sass()) // Converts Sass to CSS with gulp-sass
            .pipe(gulp.dest(dest))
    });
    if (!file) {
        console.log('ERR! : No File Specified!');
    }
    if (!dest) {
        console.log('ERR! : No Destination Specified!');
    } else {
        console.log('Success! Sass converted into CSS!');
    }
};
mrnode.renameit = function(file, newname, folderdest) {
    gulp.src(file)
        .pipe(rename(newname))
        .pipe(gulp.dest(folderdest)); // ./dist/main/text/ciao/goodbye.md
    if (!file) {
        console.log('ERR! : No File Specified!');
    } else if (!newname) {
        console.log('ERR! : No new name!');
    } else if (!folderdest) {
        console.log('ERR! : No folder destination!');
    } else {
        console.log('Success! File Renamed!');
    }
};

mrnode.createserver = function(port) {
    var http = require("http");

    http.createServer(function(request, response) {

        // Send the HTTP header 
        // HTTP Status: 200 : OK
        // Content Type: text/plain
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        // Send the response body as "Hello World"
        response.end('Sever Running\n');
    }).listen(port);

    // Console will print the message
    if (!port) {
        console.log('ERR! : No Port Specified!');
    }
    else {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    }
};
mrnode.transpile = function(file, dest) {
    gulp.task('default', function() {
    return gulp.src(file)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(dest));
    });
    if(!file) {
        console.log('ERR! : No File Specified');
    }
    else if(!dest) {
        console.log('ERR! : No Destination Specified');
    }
    else {
        console.log('Success! : File Transpiled!');
    }
};