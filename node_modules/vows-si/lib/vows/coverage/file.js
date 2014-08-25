
exports.coverage = function (filename, data) {
    var ret = {
        filename: filename,
        coverage: 0,
        hits:     0,
        misses:   0,
        sloc  :   0
    };

    var source = data.source;
    ret.source = source.map(function (line, num) {
        num++;
        
        if (data[num] === 0) {
            ret.misses++;
            ret.sloc++;
        } else if (data[num] !== undefined) {
            ret.hits++;
            ret.sloc++;
        }
        
        return { line: line, coverage: (data[num] === undefined ? '' : data[num]) };
    });

    ret.coverage = (ret.hits / ret.sloc) * 100;
    
    return ret;
};