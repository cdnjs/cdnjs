(function () {
    function rewrite(foo, bar) {
        return '"+(typeof obj["' + bar + '"]!="undefined"?obj["' + bar + '"]:"' + foo + '")+"'
    }

    function fmt(input) {
        var out = JSON.stringify(input).replace(/#\{(.*?)\}/g, rewrite)
        /* jshint evil: true */
        return Function('obj', 'return ' + out)
    }

    if (typeof module != 'undefined' && module.exports) module.exports = fmt
}())
