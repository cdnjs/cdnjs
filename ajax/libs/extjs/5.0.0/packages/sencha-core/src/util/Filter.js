/**
 * Represents a filter that can be applied to a {@link Ext.util.MixedCollection MixedCollection}. Can either simply
 * filter on a property/value pair or pass in a filter function with custom logic. Filters are always used in the
 * context of MixedCollections, though {@link Ext.data.Store Store}s frequently create them when filtering and searching
 * on their records. Example usage:
 *
 *     // Set up a fictional MixedCollection containing a few people to filter on
 *     var allNames = new Ext.util.MixedCollection();
 *     allNames.addAll([
 *         { id: 1, name: 'Ed',    age: 25 },
 *         { id: 2, name: 'Jamie', age: 37 },
 *         { id: 3, name: 'Abe',   age: 32 },
 *         { id: 4, name: 'Aaron', age: 26 },
 *         { id: 5, name: 'David', age: 32 }
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
 *     // a new MixedCollection with the 3 names longer than 4 characters
 *     var longNames = allNames.filter(longNameFilter);
 *
 *     // a new MixedCollection with the 2 people of age 32:
 *     var youngFolk = allNames.filter(ageFilter);
 */
Ext.define('Ext.util.Filter', {
    isFilter: true,

    config: {
        /**
         * @cfg {String} [property=null]
         * The property to filter on. Required unless a {@link #filterFn} is passed.
         */
        property: null,

        /**
         * @cfg {RegExp/Mixed} [value=null]
         * The value you want to match against. Required unless a {@link #filterFn} is passed.
         * 
         * Can be a regular expression which will be used as a matcher or any other value
         * such as an object or an array of objects.
         */
        value: null,

        /**
         * @cfg {Function} filterFn
         * A custom filter function which is passed each item in the {@link Ext.util.MixedCollection} in turn. Should return
         * `true` to accept each item or `false` to reject it.
         */
        filterFn: null,

        /**
         * @cfg {String} [id]
         * An identifier by which this Filter is indexed in a {@link Ext.data.Store#cfg-filters Store's filters collection}
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
         * @cfg {Boolean} [exactMatch=false]
         * True to force exact match (^ and $ characters added to the regex). Ignored if anyMatch is true.
         */
        exactMatch: false,

        /**
         * @cfg {Boolean} [caseSensitive=false]
         * True to make the regex case sensitive (adds 'i' switch to regex).
         */
        caseSensitive: false,

        /**
         * @property {Boolean} disabled
         * Setting this property to `true` disables this individual Filter so that it no longer contributes to a {@link Ext.data.Store#cfg-filters Store's filter set}
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
         *
         *    * <
         *    * <=
         *    * =
         *    * &gt;=
         *    * &gt;
         *    * !=
         */
        operator: null,

        /**
         * @cfg {String} [root=null]
         * Optional root property. This is mostly useful when filtering a Store, in which case we set the root to 'data' to
         * make the filter pull the {@link #property} out of the data object of each item
         */
        root: null
    },

    /**
     * @cfg {Object} [scope]
     * The context (`this` property) in which the filtering function is called. Defaults
     * to this Filter object.
     */
    scope: null,

    // Needed for scope above. If `scope` were a "config" it would be merged and lose its
    // identity.
    $configStrict: false,

    statics: {
        /**
         * Creates a single filter function which encapsulates the passed Filter array or
         * Collection.
         * @param {Ext.util.Filter[]/Ext.util.Collection} filters The filters from which to
         * create a filter function.
         * @return {Function} A function, which when passed a candidate object returns `true`
         * if the candidate passes all the specified Filters.
         */
        createFilterFn: function (filters) {
            if (!filters) {
                return Ext.returnTrue;
            }

            return function (candidate) {
                var items = filters.isCollection ? filters.items : filters,
                    length = items.length,
                    match = true,
                    i, filter;

                for (i = 0; match && i < length; i++) {
                    filter = items[i];

                    // Skip disabled filters
                    if (!filter.getDisabled()) {
                        match = filter.filter(candidate);
                    }
                }

                return match;
            };
        },
        
        /**
         * Checks whether the filter will produce a meaningful value. Since filters
         * may be used in conjunction with data binding, this is a sanity check to
         * check whether the resulting filter will be able to match.
         * 
         * @param {Object} cfg The filter config object
         * @return {Boolean} `true` if the filter will produce a valid value
         * 
         * @private
         */
        isInvalid: function(cfg) {
            var value = cfg.value;
            
            if (!cfg.filterFn) {
                // If we don't have a filterFn, we must have a property
                if (!cfg.property) {
                    return 'A Filter requires either a property or a filterFn to be set';
                }
                
                if (!(value || value === 0 || value === false || (value === '' && cfg.exatchMatch))) {
                    // No valid valid
                    if (!cfg.operator) {
                        return 'A Filter requires either a property and value, or a filterFn to be set';
                    }
                }
                
            }
            return false;
        }
    },

    /**
     * Creates new Filter.
     * @param {Object} config Config object
     */
    constructor: function(config) {
        //<debug>
        var warn = Ext.util.Filter.isInvalid(config);
        if (warn) {
            Ext.log.warn(warn);
        }
        //</debug>
        this.initConfig(config);
    },

    filter: function (item) {
        var me = this,
            filterFn = me._filterFn || me.getFilterFn();

        return filterFn.call(me.scope || me, item);
    },

    getId: function () {
        var id = this._id;

        if (!id) {
            id = this.getProperty();
            if (!id) {
                id = Ext.id(null, 'ext-filter-');
            }
            this._id = id;
        }

        return id;
    },

    getFilterFn: function () {
        var me = this,
            filterFn = me._filterFn,
            operator;

        if (!filterFn) {
            operator = me.getOperator();

            if (operator) {
                filterFn = me.operatorFns[operator];
            } else {
                // This part is broken our into its own method so the function expression
                // contained there does not get hoisted and created on each call this
                // method.
                filterFn = me.createRegexFilter();
            }

            me._filterFn = filterFn;
        }

        return filterFn;
    },

    /**
     * @private
     * Creates a filter function for the configured value/anyMatch/caseSensitive options
     * for this Filter.
     */
    createRegexFilter: function () {
        var me       = this,
            anyMatch = !!me.getAnyMatch(),
            exact    = !!me.getExactMatch(),
            value    = me.getValue(),
            matcher  = Ext.String.createRegex(value,
                                              !anyMatch,  // startsWith
                                              !anyMatch && exact, // endsWith
                                              !me.getCaseSensitive());

        return function(item) {
            var val = me.getPropertyValue(item);
            return matcher ? matcher.test(val) : (val == null);
        };
    },

    /**
     * Returns the property of interest from the given item, based on the configured `root`
     * and `property` configs.
     * @param {Object} item The item.
     * @return {Object} The property of the object.
     * @private
     */
    getPropertyValue: function (item) {
        var root = this._root,
            value = (root == null) ? item : item[root];

        return value[this._property];
    },

    /**
     * Returns this filter's state.
     * @return {Object}
     */
    getState: function () {
         var config = this.getInitialConfig(),
             result = {},
             name;

        for (name in config) {
            // We only want the instance properties in this case, not inherited ones,
            // so we need hasOwnProperty to filter out our class values.
            if (config.hasOwnProperty(name)) {
                result[name] = config[name];
            }
        }

        delete result.root;
        result.value = this.getValue();
        return result;
    },

    getScope: function() {
        return this.scope;
    },

    /**
     * Returns this filter's serialized state. This is used when transmitting this filter
     * to a server.
     * @return {Object}
     */
    serialize: function () {
        var result = this.getState();

        delete result.id;

        return result;
    }
}, function() {
    var prototype = this.prototype,
        operatorFns = (prototype.operatorFns = {
            "<": function (candidate) {
                var v = this._value;
                return Ext.coerce(this.getPropertyValue(candidate), v) < v;
            },
            "<=": function (candidate) {
                var v = this._value;
                return Ext.coerce(this.getPropertyValue(candidate), v) <= v;
            },
            "=": function (candidate) {
                var v = this._value;
                return Ext.coerce(this.getPropertyValue(candidate), v) == v;
            },
            ">=": function (candidate) {
                var v = this._value;
                return Ext.coerce(this.getPropertyValue(candidate), v) >= v;
            },
            ">": function (candidate) {
                var v = this._value;
                return Ext.coerce(this.getPropertyValue(candidate), v) > v;
            },
            "!=": function (candidate) {
                var v = this._value;
                return Ext.coerce(this.getPropertyValue(candidate), v) != v;
            },
            "in": function (candidate) {
                var v = this._value;
                return Ext.Array.contains(v, Ext.coerce(this.getPropertyValue(candidate), v));
            },
            like: function (candidate) {
                var v = this._value;
                return v && Ext.coerce(this.getPropertyValue(candidate), v).toLowerCase().indexOf(v.toLowerCase()) > -1;
            }
        }),
        invalidateFilterFn = function () {
            this._filterFn = null;
        },
        updaters = [
            // These updaters all clear filterFn so that it will be recreated on the next
            // call to getFilterFn.
            'updateOperator',
            'updateValue'
        ],
        i;

    // Operator type '==' is the same as operator type '='
    operatorFns['=='] = operatorFns['='];

    operatorFns.gt = operatorFns['>'];
    operatorFns.ge = operatorFns['>='];

    operatorFns.lt = operatorFns['<'];
    operatorFns.le = operatorFns['<='];

    operatorFns.eq = operatorFns['='];
    operatorFns.ne = operatorFns['!='];

    for (i = updaters.length; i-- > 0; ) {
        prototype[updaters[i]] = invalidateFilterFn;
    }
});
