/*
YUI 3.16.0 (build 76f0e08)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('arraysort', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Provides comparator functions useful for sorting arrays.

@module arraysort
**/

var LANG = Y.Lang,
    ISVALUE = LANG.isValue,
    ISSTRING = LANG.isString;

/**
Provides comparator functions useful for sorting arrays.

@class ArraySort
@static
**/

var ArraySort = Y.ArraySort = {
    // -- Public Methods -------------------------------------------------------

    /**
    Comparator function for simple case-insensitive sorting of an array of
    strings.

    @method compare
    @param a {Object} First sort argument.
    @param b {Object} Second sort argument.
    @param desc {Boolean} `true` if sort direction is descending, `false` if
        sort direction is ascending.
    @return {Boolean} -1 when a < b. 0 when a == b. 1 when a > b.
    @static
    */
    compare: function(a, b, desc) {
        if(!ISVALUE(a)) {
            if(!ISVALUE(b)) {
                return 0;
            }
            else {
                return 1;
            }
        }
        else if(!ISVALUE(b)) {
            return -1;
        }

        if(ISSTRING(a)) {
            a = a.toLowerCase();
        }
        if(ISSTRING(b)) {
            b = b.toLowerCase();
        }
        if(a < b) {
            return (desc) ? 1 : -1;
        }
        else if (a > b) {
            return (desc) ? -1 : 1;
        }
        else {
            return 0;
        }
    },

    /**
    Performs a natural-order comparison of two strings or numbers (or a string
    and a number). This ensures that a value like 'foo2' will be sorted before
    'foo10', whereas a standard ASCII sort would sort 'foo10' first.

    @example

        var items = ['item10', 'item2', 'item1', 10, '1', 2];

        items.sort(Y.ArraySort.naturalCompare);
        console.log(items); // => ['1', 2, 10, 'item1', 'item2', 'item10']

    @method naturalCompare
    @param {Number|String} a First value to compare.
    @param {Number|String} b Second value to compare.
    @param {Object} [options] Options.
        @param {Boolean} [options.caseSensitive=false] If `true`, a
            case-sensitive comparison will be performed. By default the
            comparison is case-insensitive.
        @param {Boolean} [options.descending=false] If `true`, the sort order
            will be reversed so that larger values are sorted before smaller
            values.
    @return {Number} `0` if the two items are equal, a negative number if _a_
        should be sorted before _b_, or a positive number if _b_ should be
        sorted before _a_.
    @static
    @since 3.11.0
    **/
    naturalCompare: function (a, b, options) {
        // Coerce `a` and `b` to strings.
        a += '';
        b += '';

        // Convert `a` and `b` to lowercase unless `options.caseSensitive` is
        // truthy.
        if (!options || !options.caseSensitive) {
            a = a.toLowerCase();
            b = b.toLowerCase();
        }

        // Split `a` and `b` into alpha parts and numeric parts.
        var aParts = ArraySort._splitAlphaNum(a),
            bParts = ArraySort._splitAlphaNum(b),
            length = Math.min(aParts.length, bParts.length),
            result = 0,

            aPart,
            bPart,
            i;

        // Compare each part of `a` with each part of `b`.
        for (i = 0; i < length; i++) {
            aPart = aParts[i];
            bPart = bParts[i];

            // If the two parts aren't equal, compare them and stop iterating.
            if (aPart !== bPart) {
                // First, try comparing them as numbers.
                result = aPart - bPart;

                // If that didn't work, compare them as strings. This falsiness
                // check works because `result` can't be 0 (we checked for
                // equality above) and NaN is falsy.
                if (!result) {
                    result = aPart > bPart ? 1 : -1;
                }

                // At this point we know enough to be able to sort the two
                // strings, so we don't need to compare any more parts.
                break;
            }
        }

        // If we get here and `result` is still 0, then sort the shorter string
        // before the longer string.
        result || (result = a.length - b.length);

        // Return the result, flipping the order if `options.descending` is
        // truthy.
        return options && options.descending ? -result : result;
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    Splits a string into an array of alpha character and digit character parts.

    @example

        Y.ArraySort._splitAlphaNum('abc123def456');
        // => ['abc', '123', 'def', '456']

    @method _splitAlphaNum
    @param {String} string String to split.
    @return {String[]} Array of alpha parts and digit parts.
    @protected
    @static
    @since 3.11.0
    **/
    _splitAlphaNum: function (string) {
        /*jshint boss:true */
        var parts = [],
            regex = /(\d+|\D+)/g,
            match;

        while (match = regex.exec(string)) { // assignment
            parts.push(match[1]);
        }

        return parts;
    }
};


}, '3.16.0', {"requires": ["yui-base"]});
