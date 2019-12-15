/* Ruby-like simple string interpolation for Node.js
 * Copyright (c) 2013 Mark Vasilkov (https://github.com/mvasilkov)
 * License: MIT */
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
    else if (typeof define == 'function' && define.amd) define(function () { return fmt })
    else if (typeof window != 'undefined') window.fmt = fmt
}())
