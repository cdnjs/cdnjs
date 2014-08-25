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
 * @docauthor Tommy Maintz <tommy@sencha.com>
 *
 * A mixin which allows a data component to be sorted. This is used by e.g. {@link Ext.data.Store} and {@link Ext.data.TreeStore}.
 *
 * **NOTE**: This mixin is mainly for internal use and most users should not need to use it directly. It
 * is more likely you will want to use one of the component classes that import this mixin, such as
 * {@link Ext.data.Store} or {@link Ext.data.TreeStore}.
 */
Ext.define("Ext.util.Sortable", {
    /**
     * @property {Boolean} isSortable
     * `true` in this class to identify an object as an instantiated Sortable, or subclass thereof.
     */
    isSortable: true,

    /**
     * @cfg {String} defaultSortDirection
     * The default sort direction to use if one is not specified.
     */
    defaultSortDirection: "ASC",

    requires: [
        'Ext.util.Sorter'
    ],

    statics: {
        /**
         * Creates a single comparator function which encapsulates the passed Sorter array.
         * @param {Ext.util.Sorter[]} sorters The sorter set for which to create a comparator function
         * @return {Function} a function, which when passed two comparable objects returns the result
         * of the whole sorter comparator functions.
         */
        createComparator: function(sorters) {
            return sorters && sorters.length ? function(r1, r2) {
                var result = sorters[0].sort(r1, r2),
                    length = sorters.length,
                    i = 1;

                // if we have more than one sorter, OR any additional sorter functions together
                for (; i < length; i++) {
                    result = result || sorters[i].sort.call(this, r1, r2);
                }
                return result;
            }: function() {
                return 0;
            };
        }
    },

    /**
     * @cfg {String} sortRoot
     * The property in each item that contains the data to sort.
     */

    /**
     * @cfg {Ext.util.Sorter[]/Object[]} sorters
     * The initial set of {@link Ext.util.Sorter Sorters}
     */

    /**
     * Performs initialization of this mixin. Component classes using this mixin should call this method during their
     * own initialization.
     */
    initSortable: function() {
        var me = this,
            sorters = me.sorters;

        /**
         * @property {Ext.util.MixedCollection} sorters
         * The collection of {@link Ext.util.Sorter Sorters} currently applied to this Store
         */
        me.sorters = new Ext.util.AbstractMixedCollection(false, function(item) {
            return item.id || item.property;
        });

        if (sorters) {
            me.sorters.addAll(me.decodeSorters(sorters));
        }
    },

    /**
     * Sorts the data in the Store by one or more of its properties. Example usage:
     *
     *     //sort by a single field
     *     myStore.sort('myField', 'DESC');
     *
     *     //sorting by multiple fields
     *     myStore.sort([
     *         {
     *             property : 'age',
     *             direction: 'ASC'
     *         },
     *         {
     *             property : 'name',
     *             direction: 'DESC'
     *         }
     *     ]);
     *
     * Internally, Store converts the passed arguments into an array of {@link Ext.util.Sorter} instances, and delegates
     * the actual sorting to its internal {@link Ext.util.MixedCollection}.
     *
     * When passing a single string argument to sort, Store maintains a ASC/DESC toggler per field, so this code:
     *
     *     store.sort('myField');
     *     store.sort('myField');
     *
     * Is equivalent to this code, because Store handles the toggling automatically:
     *
     *     store.sort('myField', 'ASC');
     *     store.sort('myField', 'DESC');
     *
     * @param {String/Ext.util.Sorter[]} [sorters] Either a string name of one of the fields in this Store's configured
     * {@link Ext.data.Model Model}, or an array of sorter configurations.
     * @param {String} [direction="ASC"] The overall direction to sort the data by.
     * @return {Ext.util.Sorter[]}
     */
    sort: function(sorters, direction, where, doSort) {
        var me = this,
            sorter,
            newSorters;

        if (Ext.isArray(sorters)) {
            doSort = where;
            where = direction;
            newSorters = sorters;
        }
        else if (Ext.isObject(sorters)) {
            doSort = where;
            where = direction;
            newSorters = [sorters];
        }
        else if (Ext.isString(sorters)) {
            sorter = me.sorters.get(sorters);

            if (!sorter) {
                sorter = {
                    property : sorters,
                    direction: direction
                };
                newSorters = [sorter];
            }
            else if (direction === undefined) {
                sorter.toggle();
            }
            else {
                sorter.setDirection(direction);
            }
        }

        if (newSorters && newSorters.length) {
            newSorters = me.decodeSorters(newSorters);
            if (Ext.isString(where)) {
                if (where === 'prepend') {
                    me.sorters.insert(0, newSorters);
                }
                else {
                    me.sorters.addAll(newSorters);
                }
            }
            else {
                me.sorters.clear();
                me.sorters.addAll(newSorters);
            }
        }

        if (doSort !== false) {
            me.fireEvent('beforesort', me, newSorters);
            me.onBeforeSort(newSorters);
            
            sorters = me.sorters.items;
            if (sorters.length) {
                // Sort using a generated sorter function which combines all of the Sorters passed
                me.doSort(me.generateComparator());
            }
        }

        return sorters;
    },

    /**
     * Returns a comparator function which compares two items and returns -1, 0, or 1 depending
     * on the currently defined set of {@link #cfg-sorters}.
     *
     * If there are no {@link #cfg-sorters} defined, it returns a function which returns `0` meaning
     * that no sorting will occur.
     */
    generateComparator: function() {
        var sorters = this.sorters.getRange();
        return sorters.length ? this.createComparator(sorters) : this.emptyComparator;
    },

    emptyComparator: function(){
        return 0;
    },

    onBeforeSort: Ext.emptyFn,

    /**
     * @private
     * Normalizes an array of sorter objects, ensuring that they are all Ext.util.Sorter instances
     * @param {Object[]} sorters The sorters array
     * @return {Ext.util.Sorter[]} Array of Ext.util.Sorter objects
     */
    decodeSorters: function(sorters) {
        if (!Ext.isArray(sorters)) {
            if (sorters === undefined) {
                sorters = [];
            } else {
                sorters = [sorters];
            }
        }

        var length = sorters.length,
            Sorter = Ext.util.Sorter,
            fields = this.model ? this.model.prototype.fields : null,
            field,
            config, i;

        for (i = 0; i < length; i++) {
            config = sorters[i];

            if (!(config instanceof Sorter)) {
                if (Ext.isString(config)) {
                    config = {
                        property: config
                    };
                }

                Ext.applyIf(config, {
                    root     : this.sortRoot,
                    direction: "ASC"
                });

                //support for 3.x style sorters where a function can be defined as 'fn'
                if (config.fn) {
                    config.sorterFn = config.fn;
                }

                //support a function to be passed as a sorter definition
                if (typeof config == 'function') {
                    config = {
                        sorterFn: config
                    };
                }

                // ensure sortType gets pushed on if necessary
                if (fields && !config.transform) {
                    field = fields.get(config.property);
                    config.transform = field && field.sortType !== Ext.identityFn ? field.sortType : undefined;
                }
                sorters[i] = new Ext.util.Sorter(config);
            }
        }

        return sorters;
    },

    getSorters: function() {
        return this.sorters.items;
    },
    
    /**
     * Gets the first sorter from the sorters collection, excluding
     * any groupers that may be in place
     * @protected
     * @return {Ext.util.Sorter} The sorter, null if none exist
     */
    getFirstSorter: function(){
        var sorters = this.sorters.items,
            len = sorters.length,
            i = 0,
            sorter;
            
        for (; i < len; ++i) {
            sorter = sorters[i];
            if (!sorter.isGrouper) {
                return sorter;    
            }
        }
        return null;
    }
}, function() {
    // Reference the static implementation in prototype
    this.prototype.createComparator = this.createComparator;
});