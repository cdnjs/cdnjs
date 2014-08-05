var options = { tail: '\n', raw: true };
var console = require('../../vows/console');
var puts = console.puts(options);

//
// Console JSON reporter
//
this.name = 'json';
this.setStream = function (s) {
    options.stream = s;
};

function removeCircularSuite(obj, suite) {
    var result = {};

    if (typeof obj !== 'object' || obj === null) return obj;

    Object.keys(obj).forEach(function(key) {
        if (obj[key] === suite) {
            result[key] = {};
        } else {
            result[key] = removeCircularSuite(obj[key], suite || obj.suite);
        }
    });

    return result;
};

this.report = function (obj) {
    puts(JSON.stringify(removeCircularSuite(obj)));
};

this.print = function (str) {};
