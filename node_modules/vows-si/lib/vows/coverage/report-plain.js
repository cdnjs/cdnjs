var util = require('util'),
    file = require('./file');

this.name = 'coverage-report-plain';

function lpad(str, width) {
    str = String(str);
    var n = width - str.length;

    if (n < 1) {
        return str;
    }
    
    while (n--) {
        str = ' ' + str;
    }

    return str;
}


this.report = function (coverageMap) {
    for (var filename in coverageMap) {
        if (coverageMap.hasOwnProperty(filename)) {
            var data = file.coverage(filename, coverageMap[filename]);
            
            console.log(filename + ":");
            process.stdout.write("[ hits: " + data.hits + ", misses: " + data.misses);
            console.log(", sloc: " + data.sloc + ", coverage: " + data.coverage.toFixed(2) + "% ]");

            for (var i = 0; i < data.source.length; i++) {
                console.log(lpad(data.source[i].coverage, 5) + " | " + data.source[i].line);
            }
            
            console.log();
        }
    }
};
