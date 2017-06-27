/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * Represents a collection of a set of key and value pairs. Each key in the MixedCollection
 * must be unique, the same key cannot exist twice. This collection is ordered, items in the
 * collection can be accessed by index  or via the key. Newly added items are added to
 * the end of the collection. This class is similar to {@link Ext.util.HashMap} however it
 * is heavier and provides more functionality. Sample usage:
 *
 *     var coll = new Ext.util.MixedCollection();
 *     coll.add('key1', 'val1');
 *     coll.add('key2', 'val2');
 *     coll.add('key3', 'val3');
 *
 *     console.log(coll.get('key1')); // prints 'val1'
 *     console.log(coll.indexOfKey('key3')); // prints 2
 *
 * The MixedCollection also has support for sorting and filtering of the values in the collection.
 *
 *     var coll = new Ext.util.MixedCollection();
 *     coll.add('key1', 100);
 *     coll.add('key2', -100);
 *     coll.add('key3', 17);
 *     coll.add('key4', 0);
 *     var biggerThanZero = coll.filterBy(function(value){
 *         return value > 0;
 *     });
 *     console.log(biggerThanZero.getCount()); // prints 2
 *
 */
Ext.define('Ext.util.MixedCollection', {
    extend: 'Ext.util.AbstractMixedCollection',
    mixins: {
        sortable: 'Ext.util.Sortable'
    },

    /**
     * @cfg {Boolean} allowFunctions
     * Configure as `true` if the {@link #addAll} function should add function references to the collection.
     */

    /**
     * Creates new MixedCollection.
     * @param {Object} config A configuration object.
     *  @param {Boolean} [config.allowFunctions=false] Specify `true` if the {@link #addAll}
     * function should add function references to the collection.
     *  @param {Function} [config.getKey] A function that can accept an item of the type(s) stored in this MixedCollection
     * and return the key value for that item.  This is used when available to look up the key on items that
     * were passed without an explicit key parameter to a MixedCollection method.  Passing this parameter is
     * equivalent to overriding the {@link #method-getKey} method.
     */
    constructor: function() {
        var me = this;
        me.callParent(arguments);
        me.addEvents('sort');
        me.mixins.sortable.initSortable.call(me);
    },

    doSort: function(sorterFn) {
        this.sortBy(sorterFn);
    },

    /**
     * @private
     * Performs the actual sorting based on a direction and a sorting function. Internally,
     * this creates a temporary array of all items in the MixedCollection, sorts it and then writes
     * the sorted array data back into this.items and this.keys
     * @param {String} property Property to sort by ('key', 'value', or 'index')
     * @param {String} dir (optional) Direction to sort 'ASC' or 'DESC'. Defaults to 'ASC'.
     * @param {Function} fn (optional) Comparison function that defines the sort order.
     * Defaults to sorting by numeric value.
     */
    _sort : function(property, dir, fn) {
        var me = this,
            i, len,
            dsc   = String(dir).toUpperCase() == 'DESC' ? -1 : 1,

            //this is a temporary array used to apply the sorting function
            c     = [],
            keys  = me.keys,
            items = me.items,
            o;

        //default to a simple sorter function if one is not provided
        fn = fn || function(a, b) {
            return a - b;
        };

        //copy all the items into a temporary array, which we will sort
        for (i = 0, len = items.length; i < len; i++) {
            c[c.length] = {
                key  : keys[i],
                value: items[i],
                index: i
            };
        }

        //sort the temporary array
        Ext.Array.sort(c, function(a, b) {
            return fn(a[property], b[property]) * dsc ||
                // In case of equality, ensure stable sort by comparing collection index
                (a.index < b.index ? -1 : 1);
        });

        // Copy the temporary array back into the main this.items and this.keys objects
        // Repopulate the indexMap hash if configured to do so.
        for (i = 0, len = c.length; i < len; i++) {
            o = c[i];
            items[i] = o.value;
            keys[i]  = o.key;
            me.indexMap[o.key] = i;
        }
        me.generation++;
        me.indexGeneration = me.generation;
        me.fireEvent('sort', me);
    },

    /**
     * Sorts the collection by a single sorter function
     * @param {Function} sorterFn The function to sort by
     */
    sortBy: function(sorterFn) {
        var me     = this,
            items  = me.items,
            item,
            keys   = me.keys,
            key,
            length = items.length,
            i;

        // Stamp the collection index into each item so that we can implement stable sort
        for (i = 0; i < length; i++) {
            items[i].$extCollectionIndex = i;
        }

        Ext.Array.sort(items, function(a, b) {
            return sorterFn(a, b) ||
                // In case of equality, ensure stable sort by comparing collection index
                (a.$extCollectionIndex < b.$extCollectionIndex ? -1 : 1);
        });

        // Update the keys array, and remove the index
        for (i = 0; i < length; i++) {
            item = items[i];
            key = me.getKey(item);
            keys[i] = key;
            me.indexMap[key] = i;
            delete items.$extCollectionIndex;
        }
        me.generation++;
        me.indexGeneration = me.generation;
        me.fireEvent('sort', me, items, keys);
    },

    /**
     * Calculates the insertion index of the new item based upon the comparison function passed, or the current sort order.
     * @param {Object} newItem The new object to find the insertion position of.
     * @param {Function} [sorterFn] The function to sort by. This is the same as the sorting function
     * passed to {@link #sortBy}. It accepts 2 items from this MixedCollection, and returns -1 0, or 1
     * depending on the relative sort positions of the 2 compared items.
     *
     * If omitted, a function {@link #generateComparator generated} from the currently defined set of
     * {@link #cfg-sorters} will be used.
     *
     * @return {Number} The insertion point to add the new item into this MixedCollection at using {@link #insert}
     */
    findInsertionIndex: function(newItem, sorterFn) {
        var me    = this,
            items = me.items,
            start = 0,
            end   = items.length - 1,
            middle,
            comparison;

        if (!sorterFn) {
            sorterFn = me.generateComparator();
        }
        while (start <= end) {
            middle = (start + end) >> 1;
            comparison = sorterFn(newItem, items[middle]);
            if (comparison >= 0) {
                start = middle + 1;
            } else if (comparison < 0) {
                end = middle - 1;
            }
        }
        return start;
    },

    /**
     * Reorders each of the items based on a mapping from old index to new index. Internally this
     * just translates into a sort. The 'sort' event is fired whenever reordering has occured.
     * @param {Object} mapping Mapping from old item index to new item index
     */
    reorder: function(mapping) {
        var me = this,
            items = me.items,
            index = 0,
            length = items.length,
            order = [],
            remaining = [],
            oldIndex;

        me.suspendEvents();

        //object of {oldPosition: newPosition} reversed to {newPosition: oldPosition}
        for (oldIndex in mapping) {
            order[mapping[oldIndex]] = items[oldIndex];
        }

        for (index = 0; index < length; index++) {
            if (mapping[index] == undefined) {
                remaining.push(items[index]);
            }
        }

        for (index = 0; index < length; index++) {
            if (order[index] == undefined) {
                order[index] = remaining.shift();
            }
        }

        me.clear();
        me.addAll(order);

        me.resumeEvents();
        me.fireEvent('sort', me);
    },

    /**
     * Sorts this collection by <b>key</b>s.
     * @param {String} direction (optional) 'ASC' or 'DESC'. Defaults to 'ASC'.
     * @param {Function} fn (optional) Comparison function that defines the sort order.
     * Defaults to sorting by case insensitive string.
     */
    sortByKey : function(dir, fn){
        this._sort('key', dir, fn || function(a, b){
            var v1 = String(a).toUpperCase(), v2 = String(b).toUpperCase();
            return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
        });
    }
});
