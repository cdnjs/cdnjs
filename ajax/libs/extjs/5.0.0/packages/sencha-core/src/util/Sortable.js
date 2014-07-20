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

    $configPrefixed: false,
    $configStrict: false,

    config: {
        /**
         * @cfg {Ext.util.Sorter[]/Object[]} sorters
         * The initial set of {@link Ext.util.Sorter Sorters}.
         * 
         *     sorters: [{
         *         property: 'age',
         *         direction: 'DESC'
         *     }, {
         *         property: 'firstName',
         *         direction: 'ASC'
         *     }]
         */
        sorters: null
    },

    /**
     * @cfg {String} defaultSortDirection
     * The default sort direction to use if one is not specified.
     */
    defaultSortDirection: "ASC",

    requires: [
        'Ext.util.Sorter'
    ],

    /**
     * @event beforesort
     * Fires before a sort occurs.
     * @param {Ext.util.Sortable} me This object.
     * @param {Ext.util.Sorter[]} sorters The collection of Sorters being used to generate the comparator function.
     */

    /**
     * @cfg {Number} [multiSortLimit=3]
     * The maximum number of sorters which may be applied to this Sortable when using the "multi" insertion position
     * when adding sorters.
     *
     * New sorters added using the "multi" insertion position are inserted at the top of the sorters list becoming the
     * new primary sort key.
     *
     * If the sorters collection has grown to longer then **`multiSortLimit`**, then the it is trimmed.
     *
     */
    multiSortLimit: 3,

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

                // While we have not established a comparison value,
                // loop through subsequent sorters asking for a comparison value
                for (; !result && i < length; i++) {
                    result = sorters[i].sort.call(this, r1, r2);
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

    applySorters: function(sorters) {
        var me = this,
            sortersCollection = me.getSorters() || new Ext.util.MixedCollection(false, Ext.returnId);

        // We have been configured with a non-default value.
        if (sorters) {
            sortersCollection.addAll(me.decodeSorters(sorters));
        }
        return sortersCollection;
    },

    /**
     * Updates the sorters collection and triggers sorting of this Sortable. Example usage:
     *
     *     //sort by a single field
     *     myStore.sort('myField', 'DESC');
     *
     *     //sorting by multiple fields
     *     myStore.sort([{
     *         property : 'age',
     *         direction: 'ASC'
     *     }, {
     *         property : 'name',
     *         direction: 'DESC'
     *     }]);
     *
     * Classes which use this mixin must implement a **`soSort`** method which accepts a comparator function computed from
     * the full sorter set which performs the sort in an implementation-specific way.
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
     * @param {String/Ext.util.Sorter[]} [sorters] Either a string name of one of the fields in this Store's configured {@link Ext.data.Model Model}, or an array of sorter configurations.
     * @param {String} [direction="ASC"] The overall direction to sort the data by.
     * @param {String} [insertionPosition="replace"] Where to put the new sorter in the collection of sorters.
     * This may take the following values:
     *
     * * `replace` : This means that the new sorter(s) becomes the sole sorter set for this Sortable. This is the most useful call mode
     *           to programatically sort by multiple fields.  
     *       
     * * `prepend` : This means that the new sorters are inserted as the primary sorters, unchanged, and the sorter list length must be controlled by the developer.  
     *       
     * * `multi` :  This is mainly useful for implementing intuitive "Sort by this" user interfaces such as the {@link Ext.grid.Panel GridPanel}'s column sorting UI.
     *
     *     This mode is only supported when passing a property name and a direction.
     *
     *     This means that the new sorter is becomes the primary sorter. If the sorter was **already** the primary sorter, the direction
     *     of sort is toggled if no direction parameter is specified.
     *     
     *     The number of sorters maintained is limited by the {@link #multiSortLimit} configuration.  
     *       
     * * `append` : This means that the new sorter becomes the last sorter.
     * @return {Ext.util.Sorter[]} The new sorters.
     */
    sort: function(sorters, direction, insertionPosition, doSort) {
        var me = this,
            sorter,
            overFlow,
            currentSorters = me.getSorters();

        if (!currentSorters) {
            me.setSorters(null);
            currentSorters = me.getSorters();
        }

        if (Ext.isArray(sorters)) {
            doSort = insertionPosition;
            insertionPosition = direction;
        }
        else if (Ext.isObject(sorters)) {
            sorters = [sorters];
            doSort = insertionPosition;
            insertionPosition = direction;
        }
        else if (Ext.isString(sorters)) {
            sorter = currentSorters.get(sorters);

            if (!sorter) {
                sorter = {
                    property : sorters,
                    direction: direction
                };
            }
            else if (direction == null) {
                sorter.toggle();
            }
            else {
                sorter.setDirection(direction);
            }
            sorters = [sorter];
        }

        if (sorters && sorters.length) {
            sorters = me.decodeSorters(sorters);

            switch (insertionPosition) {
                // multi sorting means always inserting the specified sorters
                // at the top.
                // If we are asked to sort by what is already the primary sorter
                // then toggle its direction.
                case "multi":
                    // Insert the new sorter at the beginning.
                    currentSorters.insert(0, sorters[0]);

                    // If we now are oversize, trim our sorters collection
                    overFlow = currentSorters.getCount() - me.multiSortLimit;
                    if (overFlow > 0) {
                        currentSorters.removeRange(me.multiSortLimit, overFlow);
                    }
                    break;
                case "prepend" :
                    currentSorters.insert(0, sorters);
                    break;
                case "append" :
                    currentSorters.addAll(sorters);
                    break;
                case undefined:
                case null:
                case "replace":
                    currentSorters.clear();
                    currentSorters.addAll(sorters);
                    break;
                default:
                    //<debug>
                    Ext.Error.raise('Sorter insertion point must be "multi", "prepend", "append" or "replace"');
                    //</debug>
            }
        }

        if (doSort !== false) {
            me.fireEvent('beforesort', me, sorters);
            me.onBeforeSort(sorters);
            if (me.getSorterCount()) {
                // Sort using a generated sorter function which combines all of the Sorters passed
                me.doSort(me.generateComparator());
            }
        }

        return sorters;
    },

    /**
     * @protected
     * Returns the number of Sorters which apply to this Sortable.
     *
     * May be overridden in subclasses. {@link Ext.data.Store Store} in particlar overrides
     * this because its groupers must contribute to the sorter count so that the sort method above executes doSort.
     */
    getSorterCount: function( ){
        return this.getSorters().items.length;
    },

    /**
     * Returns a comparator function which compares two items and returns -1, 0, or 1 depending
     * on the currently defined set of {@link #cfg-sorters}.
     *
     * If there are no {@link #cfg-sorters} defined, it returns a function which returns `0` meaning
     * that no sorting will occur.
     */
    generateComparator: function() {
        var sorters = this.getSorters().getRange();
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
            model = this.getModel ? this.getModel() : this.model,
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
                if (model && !config.transform) {
                    field = model.getField(config.property);
                    config.transform = field && field.sortType !== Ext.identityFn ? field.sortType : undefined;
                }
                sorters[i] = new Ext.util.Sorter(config);
            }
        }

        return sorters;
    },
    
    /**
     * Gets the first sorter from the sorters collection, excluding
     * any groupers that may be in place
     * @protected
     * @return {Ext.util.Sorter} The sorter, null if none exist
     */
    getFirstSorter: function(){
        var sorters = this.getSorters().items,
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