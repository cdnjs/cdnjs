/* Ruby-like simple string interpolation for Node.js
 * Copyright (c) 2014 Mark Vasilkov (https://github.com/mvasilkov)
 * License: MIT */
(function () {
    var cache_normal = {}
    var cache_blank = {}

    var void_checker = 'if (typeof obj == "undefined") obj = {}; '

    function fmt(input, options) {
        var blank = (options && options.blank)
        var cache = blank ? cache_blank : cache_normal
        if (!(options && options.noCache) && input in cache) return cache[input]


        var out = JSON.stringify(input).replace(/#\{(.*?)\}/g, function(foo, bar) {
            return '"+(typeof obj["' + bar + '"]!="undefined"?obj["' +
                    bar + '"]:"' + (blank ? '' : foo) + '")+"'
        })

        /* jshint boss: true, evil: true */
        return (cache[input] = Function('obj', (blank ? void_checker : '') +
                                                'return ' + out))
    }

    if (typeof module == 'object' && module.exports) module.exports = fmt
    else if (typeof define == 'function' && define.amd) define(function () { return fmt })
    else if (typeof window == 'object') window.fmt = fmt
}())
