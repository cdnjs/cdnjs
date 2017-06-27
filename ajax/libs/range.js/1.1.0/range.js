// Copyright (c) 2012 Florian H., https://github.com/js-coder/range.js

!function () {

    var letters = 'abcdefghijklmnopqrstuvwxyz';
    letters = letters.toUpperCase() + letters + letters.toUpperCase();

    var range = function (from, to, step) {
        var self, isExclusive, isReversed, isNumberRange, index, finalIndex, parts, method, tmp;
        self = [];

        // Ruby style range? `range('a..z') or `range('a..z', 2)`
        if (arguments.length == 1 || typeof from == 'string' && typeof to == 'number') {
            isExclusive = from.indexOf('...') > -1;
            step = to;

            parts = from.split(/\.{2,3}/);
            from = parts[0];
            to = parts[1];
        }

        step = step || 1;

        // Check if the first range part is numeric.
        // `isNaN` is broken, but NaN is the only value that doesn't equal itself.
        isNumberRange = Number(from) == Number(from);

        if (isNumberRange) {
            // JS floats are broken: `0.1 + 0.2 == 0.3 + 4e-17 == 0.30000000000000004`.
            // Dirty fix to make `range(0, 1, 0.1)` work as expected.
            finalIndex = Number(to) + 1e-16;
            index = Number(from);
        } else {
            index = letters.indexOf(from);
            method = (from == from.toLowerCase() && to == to.toUpperCase()) ? 'lastIndexOf' : 'indexOf';
            finalIndex = letters[method](to);
        }

        isReversed = index > finalIndex;
        if (isReversed) {
            tmp = index;
            index = finalIndex;
            finalIndex = tmp;
        }

        while (index <= finalIndex) {
            self.push(isNumberRange ? index : letters.charAt(index));
            index += step;
        }

        if (isReversed) self.reverse();
        if (isExclusive) self.pop();

        return self;
    };

    range.equals = function (one, two) {
        return one.join() == two.join();
    };

    range.overlaps = function (one, two) {
        return one[0] <= two.slice(-1)[0] && two[0] <= one.slice(-1)[0];
    };

    // AMD, CommonJS or just adding it to the global scope.
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return range;
        });
    } else if (typeof exports !== 'undefined') {
        module.exports = range;
    } else window.range = range;

}();