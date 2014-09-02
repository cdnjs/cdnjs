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
Y.mix( Y.ArrayList.prototype, {

    /**
     * Add a single item to the ArrayList.  Does not prevent duplicates.
     *
     * @method add
     * @param item { mixed } Item presumably of the same type as others in the
     *                       ArrayList
     * @param index {Number} (Optional.)  Number representing the position at 
     * which the item should be inserted.
     * @return {ArrayList} the instance
     * @chainable
     */
    add: function ( item, index ) {
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
     * comparitor is not provided, uses itemsAreEqual method to determine
     * matches.
     *
     * @method remove
     * @param needle { mixed } Item to find and remove from the list
     * @param all { Boolean } If true, remove all occurrences
     * @param comparitor { Function } optional a/b function to test equivalence
     * @return {ArrayList} the instance
     * @chainable
     */
    remove: function ( needle, all, comparitor ) {
        comparitor = comparitor || this.itemsAreEqual;

        for (var i = this._items.length - 1; i >= 0; --i) {
            if ( comparitor.call( this, needle, this.item( i ) ) ) {
                this._items.splice( i, 1 );
                if ( !all ) {
                    break;
                }
            }
        }

        return this;
    },

    /**
     * Default comparitor for items stored in this list.  Used by remove().
     *
     * @method itemsAreEqual
     * @param a { mixed } item to test equivalence with
     * @param b { mixed } other item to test equivalance
     * @return { Boolean } true if items are deemed equivalent
     */
    itemsAreEqual: function ( a, b ) {
        return a === b;
    }

} );


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
Y.mix( Y.ArrayList.prototype, {

    /**
     * <p>Create a new ArrayList (or augmenting class instance) from a subset
     * of items as determined by the boolean function passed as the
     * argument.  The original ArrayList is unchanged.</p>
     *
     * <p>The validator signature is <code>validator( item )</code>.</p>
     *
     * @method filter
     * @param validator { Function } Boolean function to determine in or out
     * @return { ArrayList } New instance based on who passed the validator
     */
    filter: function ( validator ) {
        var items = [];

        Y.Array.each( this._items, function ( item, i ) {
            item = this.item( i );

            if ( validator( item ) ) {
                items.push( item );
            }
        }, this);

        return new this.constructor( items );
    }

} );


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
 * @param items { Array } Array of objects supporting the named method
 * @param name { String } the name of the method to execute on each item
 * @param args* { mixed } Any number of additional args are passed as
 *                        parameters to the execution of the named method.
 * @return { Array } All return values, indexed according to item index.
 */
Y.Array.invoke = function ( items, name ) {
    var args       = Y.Array( arguments, 2, true ),
        isFunction = Y.Lang.isFunction,
        ret        = [];

    Y.Array.each( Y.Array( items ), function ( item, i ) {
        if ( isFunction( item[ name ] ) ) {
            ret[i] = item[ name ].apply( item, args );
        }
    });

    return ret;
};


}, '@VERSION@' );


YUI.add('collection', function(Y){}, '@VERSION@' ,{use:['array-extras', 'arraylist', 'arraylist-add', 'arraylist-filter', 'array-invoke']});

