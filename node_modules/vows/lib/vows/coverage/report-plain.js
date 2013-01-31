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
            
            util.print(filename + ":\n");
            util.print("[ hits: " + data.hits + ", misses: " + data.misses);
            util.print(", sloc: " + data.sloc + ", coverage: " + data.coverage.toFixed(2) + "% ]\n");

            for (var i = 0; i < data.source.length; i++) {
                util.print(lpad(data.source[i].coverage, 5) + " | " + data.source[i].line + "\n");
            }
            
            util.print("\n");
        }
    }
};
