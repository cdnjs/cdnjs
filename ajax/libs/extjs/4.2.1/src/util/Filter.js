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
 * Represents a filter that can be applied to a {@link Ext.util.MixedCollection MixedCollection}. Can either simply
 * filter on a property/value pair or pass in a filter function with custom logic. Filters are always used in the
 * context of MixedCollections, though {@link Ext.data.Store Store}s frequently create them when filtering and searching
 * on their records. Example usage:
 *
 *     //set up a fictional MixedCollection containing a few people to filter on
 *     var allNames = new Ext.util.MixedCollection();
 *     allNames.addAll([
 *         {id: 1, name: 'Ed',    age: 25},
 *         {id: 2, name: 'Jamie', age: 37},
 *         {id: 3, name: 'Abe',   age: 32},
 *         {id: 4, name: 'Aaron', age: 26},
 *         {id: 5, name: 'David', age: 32}
 *     ]);
 *
 *     var ageFilter = new Ext.util.Filter({
 *         property: 'age',
 *         value   : 32
 *     });
 *
 *     var longNameFilter = new Ext.util.Filter({
 *         filterFn: function(item) {
 *             return item.name.length > 4;
 *         }
 *     });
 *
 *     //a new MixedCollection with the 3 names longer than 4 characters
 *     var longNames = allNames.filter(longNameFilter);
 *
 *     //a new MixedCollection with the 2 people of age 32:
 *     var youngFolk = allNames.filter(ageFilter);
 *
 */
Ext.define('Ext.util.Filter', {

    /**
     * @cfg {String} property
     * The property to filter on. Required unless a {@link #filterFn} is passed
     */
    /**
     * @cfg {Mixed} value
     * The value to filter on. Required unless a {@link #filterFn} is passed.
     */

    /**
     * @cfg {Function} filterFn
     * A custom filter function which is passed each item in the {@link Ext.util.MixedCollection} in turn. Should return
     * `true` to accept each item or `false` to reject it.
     */

    /**
     * @cfg {String} [id]
     * An identifier by which this Filter is indexed in a {@link Ext.data.Store#property-filters Store's filters collection}
     *
     * Identified Filters may be individually removed from a Store's filter set by using {@link Ext.data.Store#removeFilter}.
     *
     * Anonymous Filters may be removed en masse by passing `null` to {@link Ext.data.Store#removeFilter}.
     */
    id: null,

    /**
     * @cfg {Boolean} anyMatch
     * True to allow any match - no regex start/end line anchors will be added.
     */
    anyMatch: false,

    /**
     * @cfg {Boolean} exactMatch
     * True to force exact match (^ and $ characters added to the regex). Ignored if anyMatch is true.
     */
    exactMatch: false,

    /**
     * @cfg {Boolean} caseSensitive
     * True to make the regex case sensitive (adds 'i' switch to regex).
     */
    caseSensitive: false,

    /**
     * @property {Boolean} disabled
     * Setting this property to `true` disables this individual Filter so that it no longer contributes to a {@link Ext.data.Store#property-filters Store's filter set}
     *
     * When disabled, the next time the store is filtered, the Filter plays no part in filtering and records eliminated by it may rejoin the dataset.
     *
     */
    disabled: false,

    /**
     * @cfg {String} [operator]
     * The operator to use to compare the {@link #cfg-property} to this Filter's {@link #cfg-value}
     *
     * Possible values are:
     *    * <
     *    * <=
     *    * =
     *    * >=
     *    * >
     *    * !=
     */
    operator: null,

    /**
     * @cfg {String} root
     * Optional root property. This is mostly useful when filtering a Store, in which case we set the root to 'data' to
     * make the filter pull the {@link #property} out of the data object of each item
     */

    statics: {
        /**
         * Creates a single filter function which encapsulates the passed Filter array.
         * @param {Ext.util.Filter[]} filters The filter set for which to create a filter function
         * @return {Function} a function, which when passed a candidate object returns `true` if
         * the candidate passes all the specified Filters.
         */
        createFilterFn: function(filters) {
            return filters && filters.length ? function(candidate) {
                var isMatch = true,
                    length = filters.length,
                    i, filter;

                for (i = 0; isMatch && i < length; i++) {
                    filter = filters[i];

                    // Disabling a filter stops it from contributing to the overall filter function.
                    if (!filter.disabled) {
                        isMatch = isMatch && filter.filterFn.call(filter.scope || filter, candidate);
                    }
                }
                return isMatch;
            } : function() {
                return true;
            };
        }
    },

    operatorFns: {
        "<": function(candidate) {
            return Ext.coerce(this.getRoot(candidate)[this.property], this.value) < this.value;
        },
        "<=": function(candidate) {
            return Ext.coerce(this.getRoot(candidate)[this.property], this.value) <= this.value;
        },
        "=": function(candidate) {
            return Ext.coerce(this.getRoot(candidate)[this.property], this.value) == this.value;
        },
        ">=": function(candidate) {
            return Ext.coerce(this.getRoot(candidate)[this.property], this.value) >= this.value;
        },
        ">": function(candidate) {
            return Ext.coerce(this.getRoot(candidate)[this.property], this.value) > this.value;
        },
        "!=": function(candidate) {
            return Ext.coerce(this.getRoot(candidate)[this.property], this.value) != this.value;
        }
    },

    /**
     * Creates new Filter.
     * @param {Object} [config] Config object
     */
    constructor: function(config) {
        var me = this;
        me.initialConfig = config;
        Ext.apply(me, config);

        //we're aliasing filter to filterFn mostly for API cleanliness reasons, despite the fact it dirties the code here.
        //Ext.util.Sorter takes a sorterFn property but allows .sort to be called - we do the same here
        me.filter = me.filter || me.filterFn;

        if (me.filter === undefined) {
            me.setValue(config.value);
        }
    },

    /**
     * Changes the value that this filter tests its configured (@link #cfg-property} with.
     * @param {Mixed} value The new value to compare the property with.
     */
    setValue: function(value) {
        var me = this;
        me.value = value;
        if (me.property === undefined || me.value === undefined) {
            // Commented this out temporarily because it stops us using string ids in models. TODO: Remove this once
            // Model has been updated to allow string ids

            // Ext.Error.raise("A Filter requires either a property or a filterFn to be set");
        } else {
            me.filter = me.createFilterFn();
        }

        me.filterFn = me.filter;
    },

    /**
     * Changes the filtering function which this Filter uses to choose items to include.
     *
     * This replaces any configured {@link #cfg-filterFn} and overrides any {@link #cfg-property} and {@link #cfg-value) settings.
     * @param {Function} filterFn A function which returns `true` or `false` to either include or exclude the passed object.
     * @param {Object} filterFn.value The value for consideration to be included or excluded.
     *
     */
    setFilterFn: function(filterFn) {
        this.filterFn = this.filter = filterFn;
    },

    /**
     * @private
     * Creates a filter function for the configured property/value/anyMatch/caseSensitive options for this Filter
     */
    createFilterFn: function() {
        var me       = this,
            matcher  = me.createValueMatcher(),
            property = me.property;

        if (me.operator) {
            return me.operatorFns[me.operator];
        } else {
            return function(item) {
                var value = me.getRoot(item)[property];
                return matcher === null ? value === null : matcher.test(value);
            };
        }
    },

    /**
     * @private
     * Returns the root property of the given item, based on the configured {@link #root} property
     * @param {Object} item The item
     * @return {Object} The root property of the object
     */
    getRoot: function(item) {
        var root = this.root;
        return root === undefined ? item : item[root];
    },

    /**
     * @private
     * Returns a regular expression based on the given value and matching options
     */
    createValueMatcher : function() {
        var me            = this,
            value         = me.value,
            anyMatch      = me.anyMatch,
            exactMatch    = me.exactMatch,
            caseSensitive = me.caseSensitive,
            escapeRe      = Ext.String.escapeRegex;

        if (value === null) {
            return value;
        }

        if (!value.exec) { // not a regex
            value = String(value);

            if (anyMatch === true) {
                value = escapeRe(value);
            } else {
                value = '^' + escapeRe(value);
                if (exactMatch === true) {
                    value += '$';
                }
            }
            value = new RegExp(value, caseSensitive ? '' : 'i');
         }

         return value;
    },

    serialize: function() {
        var me = this,
            result = Ext.apply({}, me.initialConfig);

        result.value = me.value;
        return result;
    }
}, function() {
    // Operator type '==' is the same as operator type '='
    this.prototype.operatorFns['=='] = this.prototype.operatorFns['='];
});