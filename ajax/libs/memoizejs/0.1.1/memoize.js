/*
 * memoize.js
 * by @philogb and @addyosmani
 * further optimizations by @mathias, @DmitryBaranovsk & @GotNoSugarBaby
 * fixes by @AutoSponge
 * perf tests: http://bit.ly/q3zpG3
 * Released under an MIT license.
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.memoize = factory();
    }
}(this, function() {
    "use strict";

    var memoize = function(func) {
        var stringifyJson = JSON.stringify,
            cache = {};

        var cachedfun = function() {
            var hash = stringifyJson(arguments);
            return (hash in cache) ? cache[hash] : cache[hash] = func.apply(this, arguments);
        };

        cachedfun.__cache = (function() {
            cache.remove || (cache.remove = function() {
                var hash = stringifyJson(arguments);
                return (delete cache[hash]);
            });
            return cache;
        }).call(this);

        return cachedfun;
    };

    return memoize;
}));
