/**
 * @private
 */
Ext.define('Ext.util.SorterCollection', {
    extend: 'Ext.util.Collection',

    requires: [
        'Ext.util.Sorter'
    ],

    isSorterCollection: true,

    /**
     * @property {Ext.util.Sortable} sortable
     * The owning sortable instance. The sortable's configuration governs this
     * collection.
     * @private
     * @readonly
     */
    $sortable: null,

    /**
     * @property sortFn
     * This is the cached sorting function which is a generated function that calls all the
     * configured sorters in the correct order.
     * @readonly
     */
    sortFn: null,
    
    config: {
        /**
         * @cfg {Function} applySorterOptionsFn
         * A template method that can be used to apply options to a sorter during creation
         * @private
         */
        sorterOptionsFn: null,
        
        /**
         * @cfg {Object} applySorterOptionsScope
         * The scope to execute the {@link #applySorterOptionsFn}
         * @private
         */
        sorterOptionsScope: null
    },

    constructor: function (config) {
        var me = this;

        me.sortFn = Ext.util.Sorter.createComparator(me);

        me.callParent([config]);
        me.setDecoder(me.decodeSorter);
    },

    addSort: function (property, direction, mode) {
        var me = this,
            count, index, limit, options, primary, sorter, sorters;

        if (!property) {
            // nothing specified so just trigger a sort...
            me.beginUpdate();
            me.endUpdate();
        } else {
            options = me.getOptions();

            if (property instanceof Array) {
                sorters = property;
                mode = direction;
                direction = null;
            } else if (Ext.isString(property)) {
                if (!(sorter = me.get(property))) {
                    sorters = [{
                        property: property,
                        direction: direction || options.getDefaultSortDirection()
                    }];
                } else {
                    sorters = [sorter];
                }
            } else if (Ext.isFunction(property)) {
                sorters = [{
                    sorterFn: property,
                    direction: direction || options.getDefaultSortDirection()
                }];
            } else {
                //<debug>
                if (!Ext.isObject(property)) {
                    Ext.Error.raise('Invalid sort descriptor: ' + property);
                }
                //</debug>

                sorters = [property];
                mode = direction;
                direction = null;
            }

            //<debug>
            if (mode && !me._sortModes[mode]) {
                Ext.Error.raise(
                    'Sort mode should be "multi", "append", "prepend" or "replace", not "' +
                                mode + '"');
            }
            //</debug>
            mode = me._sortModes[mode || 'replace'];

            primary = me.getAt(0);
            count = me.length;
            index = mode.append ? count : 0;

            // We have multiple changes to make, so mark the sorters collection as updating
            // before we start.
            me.beginUpdate();

            // Leverage the decode logic wired to the collection to up-convert sorters to
            // real instances.
            me.splice(index, mode.replace ? count : 0, sorters);

            if (mode.multi) {
                count = me.length;
                limit = options.getMultiSortLimit();

                if (count > limit) {
                    me.removeAt(limit, count); // count will be truncated
                }
            }

            if (sorter && direction) {
                sorter.setDirection(direction);
            } else if (index === 0 && primary && primary === me.getAt(0)) {
                // If we just adjusted the sorters at the front and the primary sorter is
                // still the primary sorter, toggle its direction:
                primary.toggle();
            }

            me.endUpdate();
        }
    },

    /**
     * Returns an up to date sort function.
     * @return {Function} The sort function.
     */
    getSortFn: function () {
        return this.sortFn;
    },
    
    /**
     * Get the first matching sorter with a matching property.
     * @param {String} prop The property name
     * @return {Ext.util.Sorter} The sorter. `null` if not found.
     * @private
     */
    getByProperty: function(prop) {
        var items = this.items,
            len = items.length,
            i, item;
        
        for (i = 0; i < len; ++i) {
            item = items[i];
            if (item.getProperty() === prop) {
                return item;
            }
        }
        return null;
    },

    //-------------------------------------------------------------------------
    // Private

    _sortModes: {
        append:  { append:  1 },
        multi:   { multi:   1 },
        prepend: { prepend: 1 },
        replace: { replace: 1 }
    },

    decodeSorter: function (sorter, xclass) {
        var me = this,
            options = me.getOptions(),
            root = options.getRootProperty(),
            sorterOptionsFn = me.getSorterOptionsFn(),
            currentSorter, sorterConfig, type;

        if (sorter.isSorter) {
            if (!sorter.getRoot()) {
                sorter.setRoot(root);
            }
        } else {
            sorterConfig = {
                direction: options.getDefaultSortDirection(),
                root: root
            };
            type = typeof sorter;

            // If we are dealing with a string we assume it is a property they want to sort on.
            if (type === 'string') {
                currentSorter = me.get(sorter);
                if (currentSorter) {
                    return currentSorter;
                }

                sorterConfig.property = sorter;
            }
            // If it is a function, we assume its a sorting function.
            else if (type === 'function') {
                sorterConfig.sorterFn = sorter;
            }
            // If we are dealing with an object, we assume its a Sorter configuration. In
            // this case we create an instance of Sorter passing this configuration.
            else {
                // Finally we get to the point where it has to be invalid
                // <debug>
                if (!Ext.isObject(sorter)) {
                    Ext.Error.raise('Invalid sorter specified: ' + sorter);
                }
                // </debug>

                sorterConfig = Ext.apply(sorterConfig, sorter);

                if (sorterConfig.fn) {
                    sorterConfig.sorterFn = sorterConfig.fn;
                    delete sorterConfig.fn;
                }
            }

            // If a sorter config was created, make it an instance
            sorter = Ext.create(xclass || 'Ext.util.Sorter', sorterConfig);
        }

        if (sorterOptionsFn) {
            sorterOptionsFn.call(me.getSorterOptionsScope() || me, sorter);
        }

        return sorter;
    },
    
    setSorterConfigure: function(fn, scope) {
        this.setSorterOptionsFn(fn);
        this.setSorterOptionsScope(scope);
    },

    decodeRemoveItems: function (args, index) {
        var me = this,
            ret = (index === undefined) ? args : args[index];

        if (!ret || !ret.$cloned) {
            if (args.length > index + 1 || !Ext.isIterable(ret)) {
                ret = Ext.Array.slice(args, index);
            }

            var currentSorters = me.items,
                ln = ret.length,
                remove = [],
                i, item, n, sorter, type;

            for (i = 0; i < ln; i++) {
                sorter = ret[i];

                if (sorter && sorter.isFilter) {
                    remove.push(sorter);
                } else {
                    type = typeof sorter;

                    if (type === 'string') {
                        sorter = me.get(sorter);
                        if (sorter) {
                            remove.push(sorter);
                        }
                    }
                    else if (type === 'function') {
                        for (n = currentSorters.length; n-- > 0; ) {
                            item = currentSorters[n];
                            if (item.getSorterFn() === sorter) {
                                remove.push(item);
                            }
                        }
                    }
                    //<debug>
                    else {
                        Ext.Error.raise('Invalid sorter specification: ' + sorter);
                    }
                    //</debug>
                }
            }

            ret = remove;
            ret.$cloned = true;
        }

        return ret;
    },

    getOptions: function () {
        // Odd thing this. We need a Sortable to know how to manage our collection, but
        // we may not have one. Of course as a Collection, we *are* one as well... just
        // that is not really useful to sort the sorters themselves, but we do have the
        // default options for Sortables baked in, so we'll do.
        return this.$sortable || this;
    }
});
