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
 * Returns the index of the last item in the array that contains the specified
 * value, or -1 if the value isn't found.
 * @method Array.lastIndexOf
 * @static
 * @param {Array} a Array to search in.
 * @param {any} val Value to search for.
 * @param {Number} fromIndex (optional) Index at which to start searching
 *   backwards. Defaults to the array's length - 1. If negative, it will be
 *   taken as an offset from the end of the array. If the calculated index is
 *   less than 0, the array will not be searched and -1 will be returned.
 * @return {Number} Index of the item that contains the value, or -1 if not
 *   found.
 */
A.lastIndexOf = Native.lastIndexOf ?
    function(a, val, fromIndex) {
        // An undefined fromIndex is still considered a value by some (all?)
        // native implementations, so we can't pass it unless it's actually
        // specified.
        return fromIndex || fromIndex === 0 ? a.lastIndexOf(val, fromIndex) :
                a.lastIndexOf(val);
    } :
    function(a, val, fromIndex) {
        var len = a.length,
            i   = len - 1;

        if (fromIndex || fromIndex === 0) {
            i = Math.min(fromIndex < 0 ? len + fromIndex : fromIndex, len);
        }

        if (i > -1 && len > 0) {
            for (; i > -1; --i) {
                if (a[i] === val) {
                    return i;
                }
            }
        }

        return -1;
    };

/**
 * Returns a copy of the specified array with duplicate items removed.
 * @method Array.unique
 * @param {Array} a Array to dedupe.
 * @return {Array} Copy of the array with duplicate items removed.
 * @static
 */
A.unique = function(a, sort) {
    // Note: the sort param is deprecated and intentionally undocumented since
    // YUI 3.3.0. It never did what the API docs said it did (see the older
    // comment below as well).
    var i       = 0,
        len     = a.length,
        results = [],
        item, j;

    for (; i < len; ++i) {
        item = a[i];

        // This loop iterates over the results array in reverse order and stops
        // if it finds an item that matches the current input array item (a
        // dupe). If it makes it all the way through without finding a dupe, the
        // current item is pushed onto the results array.
        for (j = results.length; j > -1; --j) {
            if (item === results[j]) {
                break;
            }
        }

        if (j === -1) {
            results.push(item);
        }
    }

    // Note: the sort option doesn't really belong here... I think it was added
    // because there was a way to fast path the two operations together.  That
    // implementation was not working, so I replaced it with the following.
    // Leaving it in so that the API doesn't get broken.
    if (sort) {
        if (L.isNumber(results[0])) {
            results.sort(A.numericSort);
        } else {
            results.sort();
        }
    }

    return results;
};

/**
* Executes the supplied function on each item in the array. Returns a new array
* containing the items for which the supplied function returned a truthy value.
* @method Array.filter
* @param {Array} a Array to filter.
* @param {Function} f Function to execute on each item.
* @param {Object} o Optional context object.
* @static
* @return {Array} Array of items for which the supplied function returned a
*   truthy value (empty if it never returned a truthy value).
*/
A.filter = Native.filter ?
    function(a, f, o) {
        return a.filter(f, o);
    } :
    function(a, f, o) {
        var i       = 0,
            len     = a.length,
            results = [],
            item;

        for (; i < len; ++i) {
            item = a[i];

            if (f.call(o, item, i, a)) {
                results.push(item);
            }
        }

        return results;
    };

/**
* The inverse of filter. Executes the supplied function on each item.
* Returns a new array containing the items that the supplied
* function returned *false* for.
* @method Array.reject
* @param {Array} a the array to iterate.
* @param {Function} f the function to execute on each item.
* @param {object} o Optional context object.
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
* Iteration stops if the supplied function does not return
* a truthy value.
* @method Array.every
* @param {Array} a the array to iterate.
* @param {Function} f the function to execute on each item.
* @param {object} o Optional context object.
* @static
* @return {boolean} true if every item in the array returns true
* from the supplied function.
*/
A.every = Native.every ?
    function(a, f, o) {
        return a.every(f, o);
    } :
    function(a, f, o) {
        for (var i = 0, l = a.length; i < l; ++i) {
            if (!f.call(o, a[i], i, a)) {
                return false;
            }
        }

        return true;
    };

/**
* Executes the supplied function on each item in the array.
* @method Array.map
* @param {Array} a the array to iterate.
* @param {Function} f the function to execute on each item.
* @param {object} o Optional context object.
* @static
* @return {Array} A new array containing the return value
* of the supplied function for each item in the original
* array.
*/
A.map = Native.map ?
    function(a, f, o) {
        return a.map(f, o);
    } :
    function(a, f, o) {
        var i       = 0,
            len     = a.length,
            results = a.concat();

        for (; i < len; ++i) {
            results[i] = f.call(o, a[i], i, a);
        }

        return results;
    };


/**
* Executes the supplied function on each item in the array.
* Reduce "folds" the array into a single value.  The callback
* function receives four arguments:
* the value from the previous callback call (or the initial value),
* the value of the current element, the current index, and
* the array over which iteration is occurring.
* @method Array.reduce
* @param {Array} a the array to iterate.
* @param {any} init The initial value to start from.
* @param {Function} f the function to execute on each item. It
* is responsible for returning the updated value of the
* computation.
* @param {object} o Optional context object.
* @static
* @return {any} A value that results from iteratively applying the
* supplied function to each element in the array.
*/
A.reduce = Native.reduce ?
    function(a, init, f, o) {
        // ES5 Array.reduce doesn't support a thisObject, so we need to
        // implement it manually
        return a.reduce(function(init, item, i, a) {
            return f.call(o, init, item, i, a);
        }, init);
    } :
    function(a, init, f, o) {
        var i      = 0,
            len    = a.length,
            result = init;

        for (; i < len; ++i) {
            result = f.call(o, result, a[i], i, a);
        }

        return result;
    };


/**
* Executes the supplied function on each item in the array,
* searching for the first item that matches the supplied
* function.
* @method Array.find
* @param {Array} a the array to search.
* @param {Function} f the function to execute on each item.
* Iteration is stopped as soon as this function returns true
* on an item.
* @param {object} o Optional context object.
* @static
* @return {object} the first item that the supplied function
* returns true for, or null if it never returns true.
*/
A.find = function(a, f, o) {
    for (var i = 0, l = a.length; i < l; i++) {
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
* @param {Array} a a collection to iterate over.
* @param {RegExp} pattern The regular expression to test against
* each item.
* @static
* @return {Array} All the items in the collection that
* produce a match against the supplied regular expression.
* If no items match, an empty array is returned.
*/
A.grep = function(a, pattern) {
    return A.filter(a, function(item, index) {
        return pattern.test(item);
    });
};


/**
* Partitions an array into two new arrays, one with the items
* that match the supplied function, and one with the items that
* do not.
* @method Array.partition
* @param {Array} a a collection to iterate over.
* @param {Function} f a function that will receive each item
* in the collection and its index.
* @param {object} o Optional execution context of f.
* @static
* @return {object} An object with two members, 'matches' and 'rejects',
* that are arrays containing the items that were selected or
* rejected by the test function (or an empty array).
*/
A.partition = function(a, f, o) {
    var results = {
        matches: [],
        rejects: []
    };

    A.each(a, function(item, index) {
        var set = f.call(o, item, index, a) ? results.matches : results.rejects;
        set.push(item);
    });

    return results;
};

/**
* Creates an array of arrays by pairing the corresponding
* elements of two arrays together into a new array.
* @method Array.zip
* @param {Array} a a collection to iterate over.
* @param {Array} a2 another collection whose members will be
* paired with members of the first parameter.
* @static
* @return {array} An array of arrays formed by pairing each element
* of the first collection with an item in the second collection
* having the corresponding index.
*/
A.zip = function(a, a2) {
    var results = [];
    A.each(a, function(item, index) {
        results.push([item, a2[index]]);
    });
    return results;
};

/**
 * forEach is an alias of Array.each.  This is part of the
 * collection module.
 * @method Array.forEach
 */
A.forEach = A.each;


}, '@VERSION@' );
YUI.add('arraylist', function(Y) {

/**
 * Collection utilities beyond what is provided in the YUI core
 * @module collection
 * @submodule arraylist
 */

var YArray      = Y.Array,
    YArray_each = YArray.each,
    ArrayListProto;

/**
 * Generic ArrayList class for managing lists of items and iterating operations
 * over them.  The targeted use for this class is for augmentation onto a
 * class that is responsible for managing multiple instances of another class
 * (e.g. NodeList for Nodes).  The recommended use is to augment your class with
 * ArrayList, then use ArrayList.addMethod to mirror the API of the constituent
 * items on the list's API.
 *
 * The default implementation creates immutable lists, but mutability can be
 * provided via the arraylist-add submodule or by implementing mutation methods
 * directly on the augmented class's prototype.
 *
 * @class ArrayList
 * @constructor
 * @param items { Array } array of items this list will be responsible for
 */
function ArrayList( items ) {
    if ( items !== undefined ) {
        this._items = Y.Lang.isArray( items ) ? items : YArray( items );
    } else {
        // ||= to support lazy initialization from augment
        this._items = this._items || [];
    }
}

ArrayListProto = {
    /**
     * Get an item by index from the list.  Override this method if managing a
     * list of objects that have a different public representation (e.g. Node
     * instances vs DOM nodes).  The iteration methods that accept a user
     * function will use this method for access list items for operation.
     *
     * @method item
     * @param i { Integer } index to fetch
     * @return { mixed } the item at the requested index
     */
    item: function ( i ) {
        return this._items[i];
    },

    /**
     * <p>Execute a function on each item of the list, optionally providing a
     * custom execution context.  Default context is the item.</p>
     *
     * <p>The callback signature is <code>callback( item, index )</code>.</p>
     *
     * @method each
     * @param fn { Function } the function to execute
     * @param context { mixed } optional override 'this' in the function
     * @return { ArrayList } this instance
     * @chainable
     */
    each: function ( fn, context ) {
        YArray_each( this._items, function ( item, i ) {
            item = this.item( i );

            fn.call( context || item, item, i, this );
        }, this);

        return this;
    },

    /**
     * <p>Execute a function on each item of the list, optionally providing a
     * custom execution context.  Default context is the item.</p>
     *
     * <p>The callback signature is <code>callback( item, index )</code>.</p>
     *
     * <p>Unlike <code>each</code>, if the callback returns true, the
     * iteratation will stop.</p>
     *
     * @method some
     * @param fn { Function } the function to execute
     * @param context { mixed } optional override 'this' in the function
     * @return { Boolean } True if the function returned true on an item
     */
    some: function ( fn, context ) {
        return YArray.some( this._items, function ( item, i ) {
            item = this.item( i );

            return fn.call( context || item, item, i, this );
        }, this);
    },

    /**
     * Finds the first index of the needle in the managed array of items.
     *
     * @method indexOf
     * @param needle { mixed } The item to search for
     * @return { Integer } Array index if found.  Otherwise -1
     */
    indexOf: function ( needle ) {
        return YArray.indexOf( this._items, needle );
    },

    /**
     * How many items are in this list?
     *
     * @method size
     * @return { Integer } Number of items in the list
     */
    size: function () {
        return this._items.length;
    },

    /**
     * Is this instance managing any items?
     *
     * @method isEmpty
     * @return { Boolean } true if 1 or more items are being managed
     */
    isEmpty: function () {
        return !this.size();
    },

    /**
     * Provides an array-like representation for JSON.stringify.
     *
     * @method toJSON
     * @return { Array } an array representation of the ArrayList
     */
    toJSON: function () {
        return this._items;
    }
};
// Default implementation does not distinguish between public and private
// item getter
/**
 * Protected method for optimizations that may be appropriate for API
 * mirroring. Similar in functionality to <code>item</code>, but is used by
 * methods added with <code>ArrayList.addMethod()</code>.
 *
 * @method _item
 * @protected
 * @param i { Integer } Index of item to fetch
 * @return { mixed } The item appropriate for pass through API methods
 */
ArrayListProto._item = ArrayListProto.item;

ArrayList.prototype  = ArrayListProto;

Y.mix( ArrayList, {

    /**
     * <p>Adds a pass through method to dest (typically the prototype of a list
     * class) that calls the named method on each item in the list with
     * whatever parameters are passed in.  Allows for API indirection via list
     * instances.</p>
     *
     * <p>Accepts a single string name or an array of string names.</p>
     *
     * <pre><code>list.each( function ( item ) {
     *     item.methodName( 1, 2, 3 );
     * } );
     * // becomes
     * list.methodName( 1, 2, 3 );</code></pre>
     *
     * <p>Additionally, the pass through methods use the item retrieved by the
     * <code>_item</code> method in case there is any special behavior that is
     * appropriate for API mirroring.</p>
     *
     * @method addMethod
     * @static
     * @param dest { Object } Object or prototype to receive the iterator method
     * @param name { String | Array } Name of method of methods to create
     */
    addMethod: function ( dest, names ) {

        names = YArray( names );

        YArray_each( names, function ( name ) {
            dest[ name ] = function () {
                var args = YArray( arguments, 0, true ),
                    ret  = [];

                YArray_each( this._items, function ( item, i ) {
                    item = this._item( i );

                    var result = item[ name ].apply( item, args );

                    if ( result !== undefined && result !== item ) {
                        ret.push( result );
                    }
                }, this);

                return ret.length ? ret : this;
            };
        } );
    }
} );

Y.ArrayList = ArrayList;


}, '@VERSION@' );
YUI.add('arraylist-add', function(Y) {

/**
 * Collection utilities beyond what is provided in the YUI core
 * @module collection
 * @submodule arraylist-add
 */

/**
 * Adds methods add and remove to Y.ArrayList
 * @class ArrayList~add
 */
Y.mix(Y.ArrayList.prototype, {

    /**
     * Add a single item to the ArrayList.  Does not prevent duplicates.
     *
     * @method add
     * @param { mixed } item Item presumably of the same type as others in the
     *                       ArrayList.
     * @param {Number} index (Optional.)  Number representing the position at
     * which the item should be inserted.
     * @return {ArrayList} the instance.
     * @chainable
     */
    add: function(item, index) {
        var items = this._items;

        if (Y.Lang.isNumber(index)) {
            items.splice(index, 0, item);
        }
        else {
            items.push(item);
        }

        return this;
    },

    /**
     * Removes first or all occurrences of an item to the ArrayList.  If a
     * comparator is not provided, uses itemsAreEqual method to determine
     * matches.
     *
     * @method remove
     * @param { mixed } needle Item to find and remove from the list.
     * @param { Boolean } all If true, remove all occurrences.
     * @param { Function } comparator optional a/b function to test equivalence.
     * @return {ArrayList} the instance.
     * @chainable
     */
    remove: function(needle, all, comparator) {
        comparator = comparator || this.itemsAreEqual;

        for (var i = this._items.length - 1; i >= 0; --i) {
            if (comparator.call(this, needle, this.item(i))) {
                this._items.splice(i, 1);
                if (!all) {
                    break;
                }
            }
        }

        return this;
    },

    /**
     * Default comparator for items stored in this list.  Used by remove().
     *
     * @method itemsAreEqual
     * @param { mixed } a item to test equivalence with.
     * @param { mixed } b other item to test equivalance.
     * @return { Boolean } true if items are deemed equivalent.
     */
    itemsAreEqual: function(a, b) {
        return a === b;
    }

});


}, '@VERSION@' ,{requires:['arraylist']});
YUI.add('arraylist-filter', function(Y) {

/**
 * Collection utilities beyond what is provided in the YUI core
 * @module collection
 * @submodule arraylist-filter
 */

/**
 * Adds filter method to ArrayList prototype
 * @class ArrayList~filter
 */
Y.mix(Y.ArrayList.prototype, {

    /**
     * <p>Create a new ArrayList (or augmenting class instance) from a subset
     * of items as determined by the boolean function passed as the
     * argument.  The original ArrayList is unchanged.</p>
     *
     * <p>The validator signature is <code>validator( item )</code>.</p>
     *
     * @method filter
     * @param { Function } validator Boolean function to determine in or out.
     * @return { ArrayList } New instance based on who passed the validator.
     */
    filter: function(validator) {
        var items = [];

        Y.Array.each(this._items, function(item, i) {
            item = this.item(i);

            if (validator(item)) {
                items.push(item);
            }
        }, this);

        return new this.constructor(items);
    }

});


}, '@VERSION@' ,{requires:['arraylist']});
YUI.add('array-invoke', function(Y) {

/**
 * Collection utilities beyond what is provided in the YUI core
 * @module collection
 * @submodule array-invoke
 */

/**
 * Adds the <code>Y.Array.invoke( items, methodName )</code> utility method.
 * @class YUI~array~invoke
 */

/**
 * <p>Execute a named method on an array of objects.  Items in the list that do
 * not have a function by that name will be skipped. For example,
 * <code>Y.Array.invoke( arrayOfDrags, 'plug', Y.Plugin.DDProxy );</code></p>
 *
 * <p>The return values from each call are returned in an array.</p>
 *
 * @method invoke
 * @static
 * @param { Array } items Array of objects supporting the named method.
 * @param { String } name the name of the method to execute on each item.
 * @param { mixed } args* Any number of additional args are passed as
 *                        parameters to the execution of the named method.
 * @return { Array } All return values, indexed according to item index.
 */
Y.Array.invoke = function(items, name) {
    var args = Y.Array(arguments, 2, true),
        isFunction = Y.Lang.isFunction,
        ret = [];

    Y.Array.each(Y.Array(items), function(item, i) {
        if (isFunction(item[name])) {
            ret[i] = item[name].apply(item, args);
        }
    });

    return ret;
};


}, '@VERSION@' );


YUI.add('collection', function(Y){}, '@VERSION@' ,{use:['array-extras', 'arraylist', 'arraylist-add', 'arraylist-filter', 'array-invoke']});

