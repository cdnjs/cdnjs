var chai = require("chai");
var mrnode = module.exports;
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
var mrnode = module.exports;
var should = require("chai").should(),
 create = function(name, extension) {
    fs.writeFile(name + '.' + extension, '//change the name of this file to whatever you like', function(err) {
        if (err) return console.log(err);
        console.log('File Created');
    });
},
 delt = function(file, dest) {
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
},
 minifyjs = function(file, dest) {
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
},
 minifycss = function(file, dest) {
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
},
 beautify = function(file, dest) {
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
},
csass = function(file, dest) {
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
},
renameit = function(file, newname, folderdest) {
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
},
createserver = function(port) {
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
    console.log('Server running at http://127.0.0.1:' + port + '/');
};

//Should statements

create.should.be.a('Function');
delt.should.be.a('Function');
minifyjs.should.be.a('Function');
minifycss.should.be.a('Function');
beautify.should.be.a('Function');
csass.should.be.a('Function');
renameit.should.be.a('Function');
createserver.should.be.a('Function');
