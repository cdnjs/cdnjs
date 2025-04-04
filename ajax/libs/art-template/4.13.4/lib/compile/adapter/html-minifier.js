'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var detectNode = typeof window === 'undefined';

/**
 * HTML 压缩器
 * @param  {string}     source
 * @param  {Object}     options
 * @return {string}
 */
var htmlMinifier = function htmlMinifier(source, options) {
    if (detectNode) {
        var _htmlMinifierOptions$;

        var _htmlMinifier = require('html-minifier').minify;
        var htmlMinifierOptions = options.htmlMinifierOptions;
        var ignoreCustomFragments = options.rules.map(function (rule) {
            return rule.test;
        });
        (_htmlMinifierOptions$ = htmlMinifierOptions.ignoreCustomFragments).push.apply(_htmlMinifierOptions$, _toConsumableArray(ignoreCustomFragments));
        source = _htmlMinifier(source, htmlMinifierOptions);
    }

    return source;
};

module.exports = htmlMinifier;