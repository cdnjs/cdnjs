/**
 *  (C) Microsoft Open Technologies, Inc.   All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var PATH = require('path');
var fs = require('fs');

/**
 * @type {Function} wildcard(pattern)
 *  wildcard searches for files matching pattern.
 *
 * @pattern {String} search pattern with optional * wildcards
 * @return an array containing the paths to the matching files
 */
var wildcard = exports.wildcard = function(pattern) {

    // process pattern string for * wildcard
    var matchers = [],
        tokens,
        path;

    var index = pattern.indexOf('*');
    if(index === -1)   {
        return [pattern];
    }

    path = pattern.substr(0, index-1);
    pattern = pattern.substr(index);
    pattern = pattern.replace(/\*/g, '(?=.*)');
    tokens = pattern.split(PATH.sep);

    // create matcher regex for each path component in pattern
    tokens.forEach(function(token, index, array) {
        var matcher = {};
        matcher.index = index;
        matcher.isDir = index < array.length -1;
        matcher.regex = new RegExp(token);
        matchers.push(matcher);
    });

    return process(path, matchers);
};

// searches starting from the path directory and returns files matching wildcard pattern
// search only proceeds to directory depth equal to the numbe rof matchers.
var process = function(path, matchers) {

    var files = [];
    var traverse = function(path, level) {
        var dirs,
            matcher;

        // check we have not exceeded search directory depth
        if(level >= matchers.length) {
            return;
        }

        // read the dirs and files from the current path
        dirs = fs.readdirSync(path);
        matcher = matchers[level];

        // check if each dir or file matches the matcher for the current directory level
        for(var i = 0; i < dirs.length; i++) {
            var dir = dirs[i];

            if(dir.match(matcher.regex) === null) {
                continue;
            }

            var pathName = PATH.join(path,dir);

            var stats = fs.statSync(pathName);
            if(stats.isDirectory()) {
                if(matcher.isDir) {
                    traverse(pathName, level + 1);
                } else {
                    continue;
                }
            }
            else if(level === matchers.length - 1) {
                // found a matching file
                if(stats.isFile()) {
                    files.push(pathName);
                }
            }
        }
    };

    traverse(path, 0);
    return files;
};



//var pattern = '/Users/stammen/dev/microsoft/pkgcloud/test/*/*/*-test.js';
//
//var result = wildcard(pattern);
//console.log(result);
//console.log(result.length);




