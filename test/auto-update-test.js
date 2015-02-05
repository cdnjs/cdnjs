var assert = require("assert"),
    path = require("path"),
    fs = require("fs"),
    vows = require("vows-si"),
    _  = require('lodash'),
    au = require('./../auto-update');




var suite = vows.describe('NPM Auto Update - stand alone methods');
suite.addBatch({
    'npm name validation': {
        topic: ["floatthead", "../evil"],
        'This is a valid npm name': function (arr) {
            assert.equal(au.invalidNpmName(arr[0]), false);
        },
        'This is an invalid npm name': function (arr) {
            assert.equal(au.invalidNpmName(arr[1]), true);
        }
    },
    'npmFileMap validation - simple': {
        topic: {"npmFileMap": [
            {
                "basePath": "/dist/",
                "files": [
                    "*.js",
                    "blee/blah//script.js",
                    "blee/blah//script.min.js",
                    "styles.css",
                    "/test/**/*.*"
                ]
            }
        ]},
        'This is a valid npm file map': function (obj) {
            assert.equal(au.isValidFileMap(obj), true);
        },
        'file paths are ok too': function(obj){
            var map = obj.npmFileMap[0];
            var testFn = au.isAllowedPathFn(path.join('someplace', map.basePath));
            assert.equal(testFn.apply(null, _.map(map.files, function(f){ return path.join("someplace", map.basePath, f)})), true)
        }
    },
    'npmFileMap validation - arrays': {
        topic: {"npmFileMap": [
            {
                "basePath": "/dist/",
                "files": [
                    "*.js",
                    "blee/blah//script.js",
                    "blee/blah//script.min.js",
                    "styles.css",
                    "/test/**/*.*"
                ]
            },
            {
                "basePath": "",
                "files": [
                    "test.css",
                    "/blee.js",
                    "this_is_ok_right_now.zip"
                ]
            },
            {
                "basePath": "/",
                "files": [
                    "*"
                ]
            }
        ]},
        'valid array of file maps': function (obj) {
            assert.equal(au.isValidFileMap(obj), true);
        },
        'these paths are ok too': function(obj){
            var map = obj.npmFileMap[0];
            var testFn = au.isAllowedPathFn(path.join('someplace', map.basePath));
            assert.equal(testFn.apply(null, _.map(map.files, function(f){ return path.join("someplace", map.basePath, f)})), true)
        },
        'these paths are also allowed': function(obj){
            var map = obj.npmFileMap[1];
            var testFn = au.isAllowedPathFn(path.join('someplace', map.basePath));
            assert.equal(testFn.apply(null, _.map(map.files, function(f){ return path.join("someplace", map.basePath, f)})), true)
        }

    },
    'npmFileMap validation - invalid 1': {
        topic: {"npmFileMap": [
            {
                "basePath": "/dist/",
                "files": [
                    "*.js",
                    "blee/blah/../../../script.js",
                    "/../../../../../../../../../../etc/hosts",
                    "styles.css",
                    "/test/**/*.*"
                ]
            }
        ]},
        'this npm filemap is doing evil things': function (obj) {
            assert.equal(au.isValidFileMap(obj), false);
        },
        'these paths are bad': function(obj){
            var map = obj.npmFileMap[0];
            var testFn = au.isAllowedPathFn(path.join('someplace', map.basePath));
            assert.equal(testFn.apply(null, _.map(map.files, function(f){ return path.join("someplace", map.basePath, f)})), false)
        }
    }
});
suite.export(module);
