var util = require('util'),
    fs   = require('fs'),
    file = require('./file');

this.name = 'coverage-report-json';

this.report = function (coverageMap) {
    var output = {
        meta: {
            "generator":        "vowsjs",
            "generated":        new Date().toString(),
            "instrumentation":  "node-jscoverage",
            "file-version":     "1.0"
        },
        files:     [ ],
        coverage:  [ ]
    };
    
    
    for (var filename in coverageMap) {
        if (coverageMap.hasOwnProperty(filename)) {
            var data = file.coverage(filename, coverageMap[filename]);
            
            var coverage = {
                file:      filename,
                coverage:  data.coverage.toFixed(2),
                hits:      data.hits,
                misses:    data.misses,
                sloc:      data.sloc,
                source:    { }
            };

            for (var i = 0; i < data.source.length; i++) {
                coverage.source[i + 1] = {
                    line:     data.source[i].line,
                    coverage: data.source[i].coverage
                };
            }

            output.coverage.push(coverage);

            output.files.push(filename);
        }
    }

    try {
        out  = fs.openSync("coverage.json", "w");
        fs.writeSync(out, JSON.stringify(output));
        fs.close(out);
    } catch (error) {
        util.print("Error: Unable to write to file coverage.json\n");
        return;
    }
};
