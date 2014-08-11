YUI.add('array-extras', function(Y) {

/**
 * Collection utilities beyond what is provided in the YUI core
 * @module collection
 * @submodule array-extras
 */

var L = Y.Lang, Native = Array.prototype, A = Y.Array;

/**
 * Adds the following array utilities to the YUI instance
 * (Y.Array).  This is in addition to the methods provided
 * in the core.
 * @class YUI~array~extras
 */

/**
 * Returns the index of the last item in the array
 * that contains the specified value, -1 if the
 * value isn't found.
 * @method Array.lastIndexOf
 * @static
 * @param a {Array} the array to search
 * @param val the value to search for
 * @return {int} the index of hte item that contains the value or -1
 */
A.lastIndexOf = (Native.lastIndexOf) ?
    function(a ,val) {
        return a.lastIndexOf(val);    
    } :
    function(a, val) {
        for (var i=a.length-1; i>=0; i=i-1) {
            if (a[i] === val) {
                break;
            }
        }
        return i;
    };

/**
 * Returns a copy of the array with the duplicate entries removed
 * @method Array.unique
 * @static
 * @param a {Array} the array to find the subset of uniques for
 * @param sort {bool} flag to denote if the array is sorted or not. Defaults to false, the more general operation
 * @return {Array} a copy of the array with duplicate entries removed
 */
A.unique = function(a, sort) {
    var b = a.slice(), i = 0, n = -1, item = null;

    while (i < b.length) {
        item = b[i];
        while ((n = A.lastIndexOf(b, item)) !== i) {
            b.splice(n, 1);
        }
        i += 1;
    }

    // Note: the sort option doesn't really belong here... I think it was added
    // because there was a way to fast path the two operations together.  That
    // implementation was not working, so I replaced it with the following.
    // Leaving it in so that the API doesn't get broken.
    if (sort) {
        if (L.isNumber(b[0])) {
            b.sort(A.numericSort);
        } else {
            b.sort();
        }
    }

    return b;
};

/**
* Executes the supplied function on each item in the array.
* Returns a new array containing the items that the supplied
* function returned true for.
* @method Array.filter
* @param a {Array} the array to iterate
* @param f {Function} the function to execute on each item
* @param o Optional context object
* @static
* @return {Array} The items on which the supplied function
* returned true. If no items matched an empty array is 
* returned.
*/
A.filter = (Native.filter) ?
    function(a, f, o) {
        return Native.filter.call(a, f, o);
    } :
    function(a, f, o) {
        var results = [];
        A.each(a, function(item, i, a) {
            if (f.call(o, item, i, a)) {
                results.push(item);
            }
        });

        return results;
    };

/**
* The inverse of filter. Executes the supplied function on each item. 
* Returns a new array containing the items that the supplied
* function returned *false* for.
* @method Array.reject
* @param a {Array} the array to iterate
* @param f {Function} the function to execute on each item
* @param o Optional context object
* @static
* @return {Array} The items on which the supplied function
* returned false.
*/
A.reject = function(a, f, o) {
    return A.filter(a, function(item, i, a) {
        return !f.call(o, item, i, a);
    });
};

/**
* Executes the supplied function on each item in the array.
* @method Array.every
* @param a {Array} the array to iterate
* @param f {Function} the function to execute on each item
* @param o Optional context object
* @static
* @return {boolean} true if every item in the array returns true
* from the supplied function.
*/
A.every = (Native.every) ?
    function(a, f, o) {
        return Native.every.call(a,f,o);
    } :
    function(a, f, o) {
        for (var i = 0, l = a.length; i < l; i=i+1) {
            if (!f.call(o, a[i], i, a)) {
                return false;
            }
        }

        return true;
    };

/**
* Executes the supplied function on each item in the array.
* @method Array.map
* @param a {Array} the array to iterate
* @param f {Function} the function to execute on each item
* @param o Optional context object
* @static
* @return {Array} A new array containing the return value
* of the supplied function for each item in the original
* array.
*/
A.map = (Native.map) ? 
    function(a, f, o) {
        return Native.map.call(a, f, o);
    } :
    function(a, f, o) {
        var results = [];
        A.each(a, function(item, i, a) {
            results.push(f.call(o, item, i, a));
        });
        return results;
    };


/**
* Executes the supplied function on each item in the array.
* Reduce "folds" the array into a single value.
* @method Array.reduce
* @param a {Array} the array to iterate
* @param init The initial value to start from
* @param f {Function} the function to execute on each item. It
* is responsible for returning the updated value of the
* computation.
* @param o Optional context object
* @static
* @return A value that results from iteratively applying the
* supplied function to each element in the array.
*/
A.reduce = (Native.reduce) ?
    function(a, init, f, o) {
        //Firefox's Array.reduce does not allow inclusion of a
        //  thisObject, so we need to implement it manually
        return Native.reduce.call(a, function(init, item, i, a) {
            return f.call(o, init, item, i, a);
        }, init);
    } :
    function(a, init, f, o) {
        var r = init;
        A.each(a, function (item, i, a) {
            r = f.call(o, r, item, i, a);
        });
        return r;
    };


/**
* Executes the supplied function on each item in the array,
* searching for the first item that matches the supplied
* function.
* @method Array.find
* @param a {Array} the array to search
* @param f {Function} the function to execute on each item. 
* Iteration is stopped as soon as this function returns true
* on an item.
* @param o Optional context object
* @static
* @return {object} the first item that the supplied function
* returns true for, or null if it never returns true
*/
A.find = function(a, f, o) {
    for(var i=0, l = a.length; i < l; i++) {
        if (f.call(o, a[i], i, a)) {
            return a[i];
        }
    }
    return null;
};

/**
* Iterates over an array, returning a new array of all the elements
* that match the supplied regular expression
* @method Array.grep
* @param a {Array} a collection to iterate over
* @param pattern {RegExp} The regular expression to test against 
* each item
* @static
* @return {Array} All the items in the collection that 
* produce a match against the supplied regular expression. 
* If no items match, an empty array is returned.
*/
A.grep = function (a, pattern) {
    return A.filter(a, function (item, index) {
        return pattern.test(item);
    });
};


/**
* Partitions an array into two new arrays, one with the items
* that match the supplied function, and one with the items that
* do not.
* @method Array.partition
* @param a {Array} a collection to iterate over
* @paran f {Function} a function that will receive each item 
* in the collection and its index.
* @param o Optional execution context of f.
* @static
* @return An object with two members, 'matches' and 'rejects',
* that are arrays containing the items that were selected or 
* rejected by the test function (or an empty array).
*/
A.partition = function (a, f, o) {
    var results = {
        matches: [], 
        rejects: []
    };

    A.each(a, function (item, index) {
        var set = f.call(o, item, index, a) ? results.matches : results.rejects;
        set.push(item);
    });

    return results;
};

/**
* Creates an array of arrays by pairing the corresponding
* elements of two arrays together into a new array.
* @method Array.zip
* @param a {Array} a collection to iterate over
* @param a2 {Array} another collection whose members will be 
* paired with members of the first parameter
* @static
* @return An array of arrays formed by pairing each element 
* of the first collection with an item in the second collection 
* having the corresponding index.
*/
A.zip = function (a, a2) {
    var results = [];
    A.each(a, function (item, index) {
        results.push([item, a2[index]]);
    });
    return results;
};

A.forEach = A.each;


}, '@VERSION@' );
