/**
 * This class manages uniquely keyed objects such as {@link Ext.data.Model records} or
 * {@link Ext.Component components}.
 *
 * ## Keys
 *
 * Unlike `Ext.util.MixedCollection` this class can only manage objects whose key can be
 * extracted from the instance. That is, this class does not support "external" keys. This
 * makes this class more efficient because it does not need to track keys in parallel with
 * items. It also means key-to-item lookup will be optimal and never need to perform a
 * linear search.
 *
 * ### Extra Keys
 *
 * In some cases items may need to be looked up by multiple property values. To enable this
 * there is the `extraKeys` config.
 *
 * For example, to quickly look up items by their "name" property:
 *
 *      var collection = new Ext.util.Collection({
 *          extraKeys: {
 *              byName: 'name' // based on "name" property of each item
 *          }
 *      });
 *
 * ## Ranges
 *
 * When methods accept index arguments to indicate a range of items, these are either an
 * index and a number of items or a "begin" and "end" index.
 *
 * In the case of "begin" and "end", the "end" is the first item outside the range. This
 * definition makes it simple to expression empty ranges because "length = end - begin".
 *
 * ### Negative Indices
 *
 * When an item index is provided, negative values are treated as offsets from the end of
 * the collection. In other words the follow are equivalent:
 *
 *      +---+---+---+---+---+---+
 *      |   |   |   |   |   |   |
 *      +---+---+---+---+---+---+
 *        0   1   2   3   4   5
 *       -6  -5  -4  -3  -2  -1
 *
 * ## Legacy Classes
 *
 * The legacy classes `Ext.util.MixedCollection' and `Ext.util.AbstractMixedCollection`
 * may be needed if external keys are required, but for all other situations this class
 * should be used instead.
 */
Ext.define('Ext.util.Collection', {
    mixins: [
        'Ext.mixin.Observable'
    ],

    requires: [
        'Ext.util.CollectionKey',
        'Ext.util.Filter',
        'Ext.util.Sorter',
        'Ext.util.Grouper'
    ],
    
    uses: [
        'Ext.util.SorterCollection',
        'Ext.util.FilterCollection',
        'Ext.util.GroupCollection'
    ],

    /**
     * @property {Boolean} isCollection
     * `true` in this class to identify an object as an instantiated Collection, or subclass
     * thereof.
     * @readonly
     */
    isCollection: true,

    config: {
        autoFilter: true,

        autoSort: true,

        /**
         * @cfg {Function} decoder
         * A function that can convert newly added items to a proper type before being
         * added to this collection.
         */
        decoder: null,

        /**
         * @cfg {Object} extraKeys
         * One or more `Ext.util.CollectionKey' configuration objects or key properties.
         * Each property of the given object is the name of the `CollectionKey` instance
         * that is stored on this collection. The value of each property configures the
         * `CollectionKey` instance.
         *
         *      var collection = new Ext.util.Collection({
         *          extraKeys: {
         *              byName: 'name' // based on "name" property of each item
         *          }
         *      });
         *
         * Or equivalently:
         *
         *      var collection = new Ext.util.Collection({
         *          extraKeys: {
         *              byName: {
         *                  property: 'name'
         *              }
         *          }
         *      });
         *
         * To provide a custom key extraction function instead:
         *
         *      var collection = new Ext.util.Collection({
         *          extraKeys: {
         *              byName: {
         *                  keyFn: function (item) {
         *                      return item.name;
         *                  }
         *              }
         *          }
         *      });
         *
         * Or to call a key getter method from each item:
         *
         *      var collection = new Ext.util.Collection({
         *          extraKeys: {
         *              byName: {
         *                  keyFn: 'getName'
         *              }
         *          }
         *      });
         *
         * To use the above:
         *
         *      var item = collection.byName.get('somename');
         *
         * **NOTE** Either a `property` or `keyFn` must be be specified to define each
         * key.
         * @since 5.0.0
         */
        extraKeys: null,

        /**
         * @cfg {Array/Ext.util.FilterCollection} filters
         * The collection of {@link Ext.util.Filter Filters} for this collection. At the
         * time a collection is created `filters` can be specified as a unit. After that
         * time the normal `setFilters` method can also be given a set of replacement
         * filters for the collection.
         *
         * Individual filters can be specified as an `Ext.util.Filter` instance, a config
         * object for `Ext.util.Filter` or simply a function that will be wrapped in a
         * instance with its {@Ext.util.Filter#filterFn filterFn} set.
         *
         * For fine grain control of the filters collection, call `getFilters` to return
         * the `Ext.util.Collection` instance that holds this collection's filters.
         *
         *      var collection = new Ext.util.Collection();
         *      var filters = collection.getFilters(); // an Ext.util.FilterCollection
         *
         *      function legalAge (item) {
         *          return item.age >= 21;;
         *      }
         *
         *      filters.add(legalAge);
         *
         *      //...
         *
         *      filters.remove(legalAge);
         *
         * Any changes to the `filters` collection will cause this collection to adjust
         * its items accordingly (if `autoFilter` is `true`).
         * @since 5.0.0
         */
        filters: null,

        /**
         * @cfg {Object} grouper
         * A configuration object for this collection's {@link Ext.util.Grouper grouper}.
         *
         * For example, to group items by the first letter of the last name:
         *
         *      var collection = new Ext.util.Collection({
         *          grouper: {
         *              groupFn: function (item) {
         *                  return item.lastName.substring(0, 1);
         *              }
         *          }
         *      });
         */
        grouper: null,
        
        /**
         * @cfg {Ext.util.GroupCollection} groups
         * The collection of to hold each group container. This collection is created and
         * removed dynamically based on `grouper`. Application code should only need to
         * call `getGroups` to retrieve the collection and not `setGroups`.
         */
        groups: null,

        /**
         * @cfg {String} rootProperty
         * The root property to use for aggregation, filtering and sorting. By default
         * this is `null` but when containing things like {@link Ext.data.Model records}
         * this config would likely be set to "data" so that property names are applied
         * to the fields of each record.
         */
        rootProperty: null,

        /**
         * @cfg {Array/Ext.util.SorterCollection} sorters
         * Array of {@link Ext.util.Sorter sorters} for this collection. At the time a
         * collection is created the `sorters` can be specified as a unit. After that time
         * the normal `setSorters` method can be also be given a set of replacement
         * sorters.
         *
         * Individual sorters can be specified as an `Ext.util.Sorter` instance, a config
         * object for `Ext.util.Sorter` or simply the name of a property by which to sort.
         *
         * An alternative way to extend the sorters is to call the `sort` method and pass
         * a property or sorter config to add to the sorters.
         *
         * For fine grain control of the sorters collection, call `getSorters` to return
         * the `Ext.util.Collection` instance that holds this collection's sorters.
         *
         *      var collection = new Ext.util.Collection();
         *      var sorters = collection.getSorters(); // an Ext.util.SorterCollection
         *
         *      sorters.add('name');
         *
         *      //...
         *
         *      sorters.remove('name');
         *
         * Any changes to the `sorters` collection will cause this collection to adjust
         * its items accordingly (if `autoSort` is `true`).
         *
         * @since 5.0.0
         */
        sorters: null,
        
        /**
         * @cfg {Number} [multiSortLimit=3]
         * The maximum number of sorters which may be applied to this Sortable when using
         * the "multi" insertion position when adding sorters.
         *
         * New sorters added using the "multi" insertion position are inserted at the top
         * of the sorters list becoming the new primary sort key.
         *
         * If the sorters collection has grown to longer then **`multiSortLimit`**, then
         * the it is trimmed.
         */
        multiSortLimit: 3,
        
        /**
         * cfg {String} defaultSortDirection
         * The default sort direction to use if one is not specified.
         */
        defaultSortDirection: 'ASC',

        /**
         * @cfg {Ext.util.Collection} source
         * The base `Collection`. This collection contains the items to which filters
         * are applied to populate this collection. In this configuration, only the
         * root `source` collection can have items truly added or removed.
         * @since 5.0.0
         */
        source: null
    },
    
    /**
     * @property {Number} generation
     * Mutation counter which is incremented when the collection changes.
     * @readonly
     * @since 5.0.0
     */
    generation: 0,

    /**
     * @property {Object} indices
     * An object used as map to get the index of an item.
     * @private
     * @since 5.0.0
     */
    indices: null,

    /**
     * @property {Number} indexRebuilds
     * The number of times the `indices` have been rebuilt. This is for diagnostic use.
     * @private
     * @readonly
     * @since 5.0.0
     */
    indexRebuilds: 0,

    /**
     * @property {Number} updating
     * A counter that is increased by `beginUpdate` and decreased by `endUpdate`. When
     * this transitions from 0 to 1 the `{@link #event-beginupdate beginupdate}` event is
     * fired. When it transitions back from 1 to 0 the `{@link #event-endupdate endupdate}`
     * event is fired.
     * @readonly
     * @since 5.0.0
     */
    updating: 0,
    
    /**
     * @property {Boolean} grouped
     * A read-only flag indicating if this object is grouped.
     * @readonly
     */
    grouped: false,

    /**
     * @property {Boolean} sorted
     * A read-only flag indicating if this object is sorted. This flag may not be correct
     * during an update of the sorter collection but will be correct before `onSortChange`
     * is called. This flag is `true` if `grouped` is `true` because the collection is at
     * least sorted by the `grouper`.
     * @readonly
     */
    sorted: false,
    
    /**
     * @property {Boolean} filtered
     * A read-only flag indicating if this object is filtered.
     * @readonly
     */
    filtered: false,

    /**
     * @event add
     * Fires after items have been added to the collection.
     *
     * All `{@link #event-add add}` and `{@link #event-remove remove}` events occur between
     * `{@link #event-beginupdate beginupdate}` and `{@link #event-endupdate endupdate}`
     * events so it is best to do only the minimal amount of work in response to these
     * events and move the more expensive side-effects to an `endupdate` listener.
     *
     * @param {Ext.util.Collection} collection The collection being modified.
     *
     * @param {Object} details An object describing the addition.
     *
     * @param {Number} details.at The index in the collection where the add occurred.
     *
     * @param {Object[]} details.items The items that are now added to the collection.
     *
     * @param {Array} [details.keys] If available this array holds the keys (extracted by
     * `getKey`) for each item in the `items` array.
     *
     * @param {Object} [details.next] If more `{@link #event-add add}` events are in queue
     * to be delivered this is a reference to the `details` instance for the next
     * `{@link #event-add add}` event. This will only be the case when the collection is
     * sorted as the new items often need to be inserted at multiple locations to maintain
     * the sort. In this case, all of the new items have already been added not just those
     * described by the first `{@link #event-add add}` event.
     *
     * @param {Object} [details.replaced] If this addition has a corresponding set of
     * `{@link #event-remove remove}` events this reference holds the `details` object for
     * the first `remove` event. That `details` object may have a `next` property if there
     * are multiple associated `remove` events.
     *
     * @since 5.0.0
     */

    /**
     * @event beginupdate
     * Fired before changes are made to the collection. This event fires when the
     * `beginUpdate` method is called and the counter it manages transitions from 0 to 1.
     *
     * All `{@link #event-add add}` and `{@link #event-remove remove}` events occur between
     * `{@link #event-beginupdate beginupdate}` and `{@link #event-endupdate endupdate}`
     * events so it is best to do only the minimal amount of work in response to these
     * events and move the more expensive side-effects to an `endupdate` listener.
     *
     * @param {Ext.util.Collection} collection The collection being modified.
     *
     * @since 5.0.0
     */

    /**
     * @event endupdate
     * Fired after changes are made to the collection. This event fires when the `endUpdate`
     * method is called and the counter it manages transitions from 1 to 0.
     *
     * All `{@link #event-add add}` and `{@link #event-remove remove}` events occur between
     * `{@link #event-beginupdate beginupdate}` and `{@link #event-endupdate endupdate}`
     * events so it is best to do only the minimal amount of work in response to these
     * events and move the more expensive side-effects to an `endupdate` listener.
     *
     * @param {Ext.util.Collection} collection The collection being modified.
     *
     * @since 5.0.0
     */

    /**
     * @event beforeitemchange
     * This event fires before an item change is reflected in the collection. This event
     * is always followed by an `itemchange` event and, depending on the change, possibly
     * an `add`, `remove` and/or `updatekey` event.
     *
     * @param {Ext.util.Collection} collection The collection being modified.
     *
     * @param {Object} details An object describing the change.
     *
     * @param {Object} details.item The item that has changed.
     *
     * @param {String} details.key The key of the item that has changed.
     *
     * @param {Boolean} details.filterChanged This is `true` if the filter status of the
     * `item` has changed. That is, the item was previously filtered out and is no longer
     * or the opposite.
     *
     * @param {Boolean} details.keyChanged This is `true` if the item has changed keys. If
     * so, check `oldKey` for the old key. An `updatekey` event will follow.
     *
     * @param {Boolean} details.indexChanged This is `true` if the item needs to move to
     * a new index in the collection due to sorting. The index can be seen in `index`.
     * The old index is in `oldIndex`.
     *
     * @param {String[]} [details.modified] If known this property holds the array of names
     * of the modified properties of the item.
     *
     * @param {Boolean} [details.filtered] This value is `true` if the item will be filtered
     * out of the collection.
     *
     * @param {Number} [details.index] The new index in the collection for the item if
     * the item is being moved (see `indexChanged`). If the item is being removed due to
     * filtering, this will be -1.
     *
     * @param {Number} [details.oldIndex] The old index in the collection for the item if
     * the item is being moved (see `indexChanged`). If the item was being removed due to
     * filtering, this will be -1.
     *
     * @param {Object} [details.oldKey] The old key for the `item` if the item's key has
     * changed (see `keyChanged`).
     *
     * @param {Boolean} [details.wasFiltered] This value is `true` if the item was filtered
     * out of the collection.
     *
     * @since 5.0.0
     */

    /**
     * @event itemchange
     * This event fires after an item change is reflected in the collection. This event
     * always follows a `beforeitemchange` event and its corresponding `add`, `remove`
     * and/or `updatekey` events.
     *
     * @param {Ext.util.Collection} collection The collection being modified.
     *
     * @param {Object} details An object describing the change.
     *
     * @param {Object} details.item The item that has changed.
     *
     * @param {String} details.key The key of the item that has changed.
     *
     * @param {Boolean} details.filterChanged This is `true` if the filter status of the
     * `item` has changed. That is, the item was previously filtered out and is no longer
     * or the opposite.
     *
     * @param {Object} details.keyChanged This is `true` if the item has changed keys. If
     * so, check `oldKey` for the old key. An `updatekey` event will have been sent.
     *
     * @param {Boolean} details.indexChanged This is `true` if the item was moved to a
     * new index in the collection due to sorting. The index can be seen in `index`.
     * The old index is in `oldIndex`.
     *
     * @param {String[]} [details.modified] If known this property holds the array of names
     * of the modified properties of the item.
     *
     * @param {Boolean} [details.filtered] This value is `true` if the item is filtered
     * out of the collection.
     *
     * @param {Number} [details.index] The new index in the collection for the item if
     * the item has been moved (see `indexChanged`). If the item is removed due to
     * filtering, this will be -1.
     *
     * @param {Number} [details.oldIndex] The old index in the collection for the item if
     * the item has been moved (see `indexChanged`). If the item was being removed due to
     * filtering, this will be -1.
     *
     * @param {Object} [details.oldKey] The old key for the `item` if the item's key has
     * changed (see `keyChanged`).
     *
     * @param {Boolean} [details.wasFiltered] This value is `true` if the item was filtered
     * out of the collection.
     *
     * @since 5.0.0
     */

    /**
     * @event refresh
     * This event fires when the collection has changed entirely. This event is fired in
     * cases where the collection's filter is updated or the items are sorted. While the
     * items previously in the collection may remain the same, the order at a minimum has
     * changed in ways that cannot be simply translated to other events.
     *
     * @param {Ext.util.Collection} collection The collection being modified.
     */

    /**
     * @event remove
     * Fires after items have been removed from the collection. Some properties of this
     * object may not be present if calculating them is deemed too expensive. These are
     * marked as "optional".
     *
     * All `{@link #event-add add}` and `{@link #event-remove remove}` events occur between
     * `{@link #event-beginupdate beginupdate}` and `{@link #event-endupdate endupdate}`
     * events so it is best to do only the minimal amount of work in response to these
     * events and move the more expensive side-effects to an `endupdate` listener.
     *
     * @param {Ext.util.Collection} collection The collection being modified.
     *
     * @param {Object} details An object describing the removal.
     *
     * @param {Number} details.at The index in the collection where the removal occurred.
     *
     * @param {Object[]} details.items The items that are now removed from the collection.
     *
     * @param {Array} [details.keys] If available this array holds the keys (extracted by
     * `getKey`) for each item in the `items` array.
     *
     * @param {Object} [details.map] If available this is a map keyed by the key of each
     * item in the `items` array. This will often contain all of the items being removed
     * and not just the items in the range described by this event. The value held in this
     * map is the item.
     *
     * @param {Object} [details.next] If more `{@link #event-remove remove}` events are in
     * queue to be delivered this is a reference to the `details` instance for the next
     * remove event.
     *
     * @param {Object} [details.replacement] If this removal has a corresponding
     * `{@link #event-add add}` taking place this reference holds the `details` object for
     * that `add` event. If the collection is sorted, the new items are pre-sorted but the
     * `at` property for the `replacement` will **not** be correct. The new items will be
     * added in one or more chunks at their proper index.
     *
     * @since 5.0.0
     */

    /**
     * @event sort
     * This event fires after the contents of the collection have been sorted.
     *
     * @param {Ext.util.Collection} collection The collection being sorted.
     */

    /**
     * @event updatekey
     * Fires after the key for an item has changed.
     *
     * @param {Ext.util.Collection} collection The collection being modified.
     *
     * @param {Object} details An object describing the update.
     *
     * @param {Object} details.item The item whose key has changed.
     *
     * @param {Object} details.newKey The new key for the `item`.
     *
     * @param {Object} details.oldKey The old key for the `item`.
     *
     * @since 5.0.0
     */

    constructor: function (config) {
        var me = this;

        /**
         * @property {Object[]} items
         * An array containing the items.
         * @private
         * @since 5.0.0
         */
        me.items = [];

        /**
         * @property {Object} map
         * An object used as map to get an object based on its key.
         * @private
         * @since 5.0.0
         */
        me.map = {};

        /**
         * @property {Number} length
         * The count of items in the collection filtered and sorted
         * @readonly
         * @since 5.0.0
         */
        me.length = 0;

        /**
         * @cfg {Function} [keyFn]
         * A function to retrieve the key of an item in the collection. If provided,
         * this replaces the default `getKey` method. The default `getKey` method handles
         * items that have either an "id" or "_id" property or failing that a `getId`
         * method to call.
         * @since 5.0.0
         */
        if (config && config.keyFn) {
            me.getKey = config.keyFn;
        }

        me.mixins.observable.constructor.call(me, config);
    },

    /**
     * Destroys this collection. This is only necessary if this collection uses a `source`
     * collection as that relationship will keep a reference from the `source` to this
     * collection and potentially leak memory.
     * @since 5.0.0
     */
    destroy: function () {
        var me = this,
            filters = me._filters,
            sorters = me._sorters,
            groups = me._groups;

        if (filters) {
            filters.destroy();
            me._filters = null;
        }

        if (sorters) {
            sorters.destroy();
            me._sorters = null;
        }

        if (groups) {
            groups.destroy();
            me._groups = null;
        }
        me.setSource(null);
        me.observers = me.items = me.map = null;
    },

    /**
     * Adds an item to the collection. If the item already exists or an item with the
     * same key exists, the old item will be removed and the new item will be added to
     * the end.
     *
     * This method also accepts an array of items or simply multiple items as individual
     * arguments. The following 3 code sequences have the same end result:
     *
     *      // Call add() once per item (not optimal - best avoided):
     *      collection.add(itemA);
     *      collection.add(itemB);
     *      collection.add(itemC);
     *      collection.add(itemD);
     *
     *      // Call add() with each item as an argument:
     *      collection.add(itemA, itemB, itemC, itemD);
     *
     *      // Call add() with the items as an array:
     *      collection.add([ itemA, itemB, itemC, itemD ]);
     *
     * The first form should be avoided where possible because the collection and all
     * parties "watching" it will be updated 4 times.
     *
     * @param {Object/Object[]} item The item or items to add.
     * @return {Object/Object[]} The item or items added.
     * @since 5.0.0
     */
    add: function (item) {
        var me = this,
            items = me.decodeItems(arguments, 0),
            ret = items;

        if (items.length) {
            me.splice(me.length, 0, items);
            ret = (items.length === 1) ? items[0] : items;
        }

        return ret;
    },
    
    /**
     * Adds an item to the collection while removing any existing items. Similar to {@link #method-add}.
     * @param {Object/Object[]} item The item or items to add.
     * @return {Object/Object[]} The item or items added.
     * @since 5.0.0
     */
    replaceAll: function() {
        var me = this,
            len = me.length,
            ret, items;

        if (len === 0) {
            return me.add.apply(me, arguments);
        }
        
        items = me.decodeItems(arguments, 0);
        ret = items;

        if (items.length) {
            me.splice(0, me.length, items);
            ret = (items.length === 1) ? items[0] : items;
        } else {
            me.removeAll();
        }

        return ret;
    },

    /**
     * Returns the result of the specified aggregation operation against all items in this
     * collection.
     *
     * This method is not typically called directly because there are convenience methods
     * for each of the supported `operation` values. These are:
     *
     *   * **average** - Returns the average value.
     *   * **bounds**  - Returns an array of `[min, max]`.
     *   * **max**     - Returns the maximum value or `undefined` if empty.
     *   * **min**     - Returns the minimum value or `undefined` if empty.
     *   * **sum**     - Returns the sum of all values.
     *
     * For example:
     *
     *      result = collection.aggregate('age', 'sum');
     *
     *      result = collection.aggregate('age', 'sum', 2, 10); // the 8 items at index 2
     *
     * To provide a custom operation function:
     *
     *      function averageAgeOfMinors (items, values) {
     *          var sum = 0,
     *              count = 0;
     *
     *          for (var i = 0; i < values.length; ++i) {
     *              if (values[i] < 18) {
     *                  sum += values[i];
     *                  ++count;
     *              }
     *          }
     *
     *          return count ? sum / count : 0;
     *      }
     *
     *      result = collection.aggregate('age', averageAgeOfMinors);
     *
     * @param {String} property The name of the property to aggregate from each item.
     * @param {String/Function} operation The operation to perform.
     * @param {Array} operation.items The items on which the `operation` function is to
     * operate.
     * @param {Array} operation.values The values on which the `operation` function is to
     * operate.
     * @param {Number} [begin] The index of the first item in `items` to include in the
     * aggregation.
     * @param {Number} [end] The index at which to stop aggregating `items`. The item at
     * this index will *not* be included in the aggregation.
     * @param {Object} [scope] The `this` pointer to use if `operation` is a function.
     * Defaults to this collection.
     * @returns {Object}
     */
    aggregate: function (property, operation, begin, end, scope) {
        var me = this,
            args = Ext.Array.slice(arguments);

        args.unshift(me.items);

        return me.aggregateItems.apply(me, args);
    },
    
    /**
     * See {@link #aggregate}. The functionality is the same, however the aggregates are
     * provided per group. Assumes this collection has an active {@link #grouper}.
     * 
     * @param {String} property The name of the property to aggregate from each item.
     * @param {String/Function} operation The operation to perform.
     * @param {Array} operation.items The items on which the `operation` function is to
     * operate.
     * @param {Array} operation.values The values on which the `operation` function is to
     * operate.
     * @param {Object} [scope] The `this` pointer to use if `operation` is a function.
     * Defaults to this collection.
     * @returns {Object}
     */
    aggregateByGroup: function(property, operation, scope) {
        var groups = this.getGroups();
        return this.aggregateGroups(groups, property, operation, scope);
    },
    
    /**
     * Returns the result of the specified aggregation operation against the given items.
     * For details see `aggregate`.
     *
     * @param {Array} items The items to aggregate.
     * @param {String} property The name of the property to aggregate from each item.
     * @param {String/Function} operation The operation to perform.
     * @param {Array} operation.items The items on which the `operation` function is to
     * operate.
     * @param {Array} operation.values The values on which the `operation` function is to
     * operate.
     * @param {Number} [begin] The index of the first item in `items` to include in the
     * aggregation.
     * @param {Number} [end] The index at which to stop aggregating `items`. The item at
     * this index will *not* be included in the aggregation.
     * @param {Object} [scope] The `this` pointer to use if `operation` is a function.
     * Defaults to this collection.
     * 
     * @private
     * @returns {Object}
     */
    aggregateItems: function (items, property, operation, begin, end, scope) {
        var me = this,
            range = Ext.Number.clipIndices(items.length, [ begin, end ]),
                
            // Only extract items into new array if a subset is required
            subsetRequested = (begin !== 0 && end !== items.length),

            i, j,
            rangeLen,
            root, value,
            values, valueItems;

        begin = range[0];
        end = range[1];

        if (!Ext.isFunction(operation)) {
            operation = me._aggregators[operation];
            return operation.call(me, items, begin, end, property, me.getRootProperty());
        }

        root = me.getRootProperty();

        // Preallocate values array with known set size.
        // valueItems can be just the items array is a subset has not been requested
        values = new Array(rangeLen);
        valueItems = subsetRequested ? new Array(rangeLen) : items;

        // Collect the extracted property values and the items for passing to the operation.
        for (i = begin, j = 0; i < end; ++i, j++) {
            if (subsetRequested) {
                valueItems[j] = value = items[i];
            }
            values[j] = (root ? value[root] : value)[property];
        }

        return operation.call(scope || me, items, values, 0);
    },
    
    /**
     * Aggregates a set of groups.
     * @param {Ext.util.GroupCollection} groups The groups
     * @param {String} property The name of the property to aggregate from each item.
     * @param {String/Function} operation The operation to perform.
     * @param {Array} operation.values The values on which the `operation` function is to
     * operate.
     * @param {Array} operation.items The items on which the `operation` function is to
     * operate.
     * @param {Number} operation.index The index in `items` at which the `operation`
     * function is to start. The `values.length` indicates the number of items involved.
     * @param {Object} [scope] The `this` pointer to use if `operation` is a function.
     * Defaults to this collection.
     * 
     * @return {Object}
     * @private
     */
    aggregateGroups: function(groups, property, operation, scope) {
        var items = groups.items,
            len  = items.length,
            callDirect = !Ext.isFunction(operation),
            out = {},
            i, group, result;
        
        for (i = 0; i < len; ++i) {
            group = items[i];
            if (!callDirect) {
                result = this.aggregateItems(group.items, property, operation, null, null, scope);
            } else {
                result = group[operation](property);
            }
            out[group.getGroupKey()] = result;
        }
        return out;
    },

    /**
     * This method is called to indicate the start of multiple changes to the collection.
     * Application code should seldom need to call this method as it is called internally
     * when needed. If multiple collection changes are needed, consider wrapping them in
     * an `update` call rather than calling `beginUpdate` directly.
     *
     * Internally this method increments a counter that is decremented by `endUpdate`. It
     * is important, therefore, that if you call `beginUpdate` directly you match that
     * call with a call to `endUpdate` or you will prevent the collection from updating
     * properly.
     *
     * For example:
     *
     *      var collection = new Ext.util.Collection();
     *
     *      collection.beginUpdate();
     *
     *      collection.add(item);
     *      // ...
     *
     *      collection.insert(index, otherItem);
     *      //...
     *
     *      collection.endUpdate();
     *
     * @since 5.0.0
     */
    beginUpdate: function () {
        if (!this.updating++) {
            this.notify('beginupdate');
        }
    },

    /**
     * Removes all items from the collection. This is similar to `removeAll` except that
     * `removeAll` fire events to inform listeners. This means that this method should be
     * called only when you are sure there are no listeners.
     * @since 5.0.0
     */
    clear: function () {
        var me = this,
            generation = me.generation,
            ret = generation ? me.items : [];

        if (generation) {
            me.items = [];
            me.length = 0;
            me.map = {};
            me.indices = {};
            me.generation++;
        }

        return ret;
    },

    /**
     * Creates a shallow copy of this collection
     * @return {Ext.util.Collection}
     * @since 5.0.0
     */
    clone: function () {
        var me = this,
            copy = new me.self(me.initialConfig);

        copy.add(me.items);
        return copy;
    },

    /**
     * Collects unique values of a particular property in this Collection.
     * @param {String} property The property to collect on
     * @param {String} root (optional) 'root' property to extract the first argument from. This is used mainly when
     * summing fields in records, where the fields are all stored inside the 'data' object
     * @param {Boolean} [allowNull] Pass `true` to include `null`, `undefined` or empty
     * string values.
     * @return {Array} The unique values
     * @since 5.0.0
     */
    collect: function (property, root, allowNull) {
        var items = this.items,
            length = items.length,
            map = {},
            ret = [],
            i, strValue, value;

        for (i = 0; i < length; ++i) {
            value = items[i];
            value = (root ? value[root] : value)[property];

            strValue = String(value);

            if ((allowNull || !Ext.isEmpty(value)) && !map[strValue]) {
                map[strValue] = 1;
                ret.push(value);
            }
        }

        return ret;
    },

    /**
     * Returns true if the collection contains the passed Object as an item.
     * @param {Object} item The Object to look for in the collection.
     * @return {Boolean} `true` if the collection contains the Object as an item.
     * @since 5.0.0
     */
    contains: function (item) {
        var ret = false,
            key;

        if (item != null) {
            key = this.getKey(item);
            ret = this.map[key] === item;
        }

        return ret;
    },

    /**
     * Returns true if the collection contains the passed Object as a key.
     * @param {String} key The key to look for in the collection.
     * @return {Boolean} True if the collection contains the Object as a key.
     * @since 5.0.0
     */
    containsKey: function (key) {
        return key in this.map;
    },

    /**
     * Creates a new collection that is a filtered subset of this collection. The filter
     * passed can be a function, a simple property name and value, an `Ext.util.Filter`
     * instance, an array of `Ext.util.Filter` instances.
     *
     * If the passed filter is a function the second argument is its "scope" (or "this"
     * pointer). The function should return `true` given each item in the collection if
     * that item should be included in the filtered collection.
     *
     *      var people = new Ext.util.Collection();
     *
     *      people.add([
     *          { id: 1, age: 25, name: 'Ed' },
     *          { id: 2, age: 24, name: 'Tommy' },
     *          { id: 3, age: 24, name: 'Arne' },
     *          { id: 4, age: 26, name: 'Aaron' }
     *      ]);
     *
     *      // Create a collection of people who are older than 24:
     *      var oldPeople = people.createFiltered(function (item) {
     *          return item.age > 24;
     *      });
     *
     * If the passed filter is a `Ext.util.Filter` instance or array of `Ext.util.Filter`
     * instances the filter(s) are used to produce the filtered collection and there are
     * no further arguments.
     *
     * If the passed filter is a string it is understood as the name of the property by
     * which to filter. The second argument is the "value" used to compare each item's
     * property value. This comparison can be further tuned with the `anyMatch` and
     * `caseSensitive` (optional) arguments.
     *
     *    // Create a new Collection containing only the items where age == 24
     *    var middleAged = people.createFiltered('age', 24);
     *
     * Alternatively you can apply `filters` to this Collection by calling `setFilters`
     * or modifying the filter collection returned by `getFilters`.
     *
     * @param {Ext.util.Filter[]/String/Function} property A property on your objects, an
     * array of {@link Ext.util.Filter Filter} objects or a filter function.
     *
     * @param {Object} value If `property` is a function, this argument is the "scope"
     * (or "this" pointer) for the function. Otherwise this is either a `RegExp` to test
     * property values or the value with which to compare.
     *
     * @param {Boolean} [anyMatch=false] True to match any part of the string, not just
     * the beginning.
     *
     * @param {Boolean} [caseSensitive=false] True for case sensitive comparison.
     * 
     * @param {Boolean} [exactMatch=false] `true` to force exact match (^ and $ characters added to the regex).
     *
     * @return {Ext.util.Collection} The new, filtered collection.
     *
     * @since 5.0.0
     */
    createFiltered: function (property, value, anyMatch, caseSensitive, exactMatch) {
        var me = this,
            ret = new me.self(me.initialConfig),
            root = me.getRootProperty(),
            items = me.items,
            length, i, filters, fn, scope;

        if (Ext.isFunction(property)) {
            fn = property;
            scope = value;
        } else {
            //support for the simple case of filtering by property/value
            if (Ext.isString(property)) {
                filters = [
                    new Ext.util.Filter({
                        property     : property,
                        value        : value,
                        root         : root,
                        anyMatch     : anyMatch,
                        caseSensitive: caseSensitive,
                        exactMatch   : exactMatch
                    })
                ];
            } else if (property instanceof Ext.util.Filter) {
                filters = [ property ];
                property.setRoot(root);
            } else if (Ext.isArray(property)) {
                filters = property.slice(0);
                for (i = 0, length = filters.length; i < length; ++i) {
                    filters[i].setRoot(root);
                }
            }

            // At this point we have an array of zero or more Ext.util.Filter objects to
            // filter with, so here we construct a function that combines these filters by
            // ANDing them together and filter by that.
            fn = Ext.util.Filter.createFilterFn(filters);
        }

        scope = scope || me;

        for (i = 0, length = items.length; i < length; i++) {
            if (fn.call(scope, items[i])) {
                ret.add(items[i]);
            }
        }

        return ret;
    },
    
    /**
     * Filter by a function. Returns a <i>new</i> collection that has been filtered.
     * The passed function will be called with each object in the collection.
     * If the function returns true, the value is included otherwise it is filtered.
     * @param {Function} fn The function to be called.
     * @param {Mixed} fn.item The collection item.
     * @param {String} fn.key The key of collection item.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in
     * which the function is executed. Defaults to this Collection.
     * @return {Ext.util.Collection} The new filtered collection
     * @since 5.0.0
     * @deprecated
     */
    filterBy: function(fn, scope) {
        return this.createFiltered(fn, scope);
    },

    /**
     * Executes the specified function once for every item in the collection. If the value
     * returned by `fn` is `false` the iteration stops. In all cases, the last value that
     * `fn` returns is returned by this method.
     *
     * @param {Function} fn The function to execute for each item.
     * @param {Object} fn.item The collection item.
     * @param {Number} fn.index The index of item.
     * @param {Number} fn.len Total length of collection.
     * @param {Object} [scope=this] The scope (`this` reference) in which the function
     * is executed. Defaults to this collection.
     * @since 5.0.0
     */
    each: function (fn, scope) {
        var items = this.items,
            len = items.length,
            i, ret;

        if (len) {
            scope = scope || this;
            items = items.slice(0); // safe for re-entrant calls

            for (i = 0; i < len; i++) {
                ret = fn.call(scope, items[i], i, len);
                if (ret === false) {
                    break;
                }
            }
        }

        return ret;
    },

    /**
     * Executes the specified function once for every key in the collection, passing each
     * key, and its associated item as the first two parameters. If the value returned by
     * `fn` is `false` the iteration stops. In all cases, the last value that `fn` returns
     * is returned by this method.
     *
     * @param {Function} fn The function to execute for each item.
     * @param {String} fn.key The key of collection item.
     * @param {Object} fn.item The collection item.
     * @param {Number} fn.index The index of item.
     * @param {Number} fn.len Total length of collection.
     * @param {Object} [scope=this] The scope (`this` reference) in which the function
     * is executed. Defaults to this collection.
     * @since 5.0.0
     */
    eachKey: function (fn, scope) {
        var me = this,
            items = me.items,
            len = items.length,
            i, item, key, ret;

        if (len) {
            scope = scope || me;
            items = items.slice(0); // safe for re-entrant calls

            for (i = 0; i < len; i++) {
                key = me.getKey(item = items[i]);
                ret = fn.call(scope, key, item, i, len);
                if (ret === false) {
                    break;
                }
            }
        }

        return ret;
    },

    /**
     * This method is called after modifications are complete on a collection. For details
     * see `beginUpdate`.
     * @since 5.0.0
     */
    endUpdate: function () {
        if (! --this.updating) {
            this.notify('endupdate');
        }
    },

    /**
     * Finds the first matching object in this collection by a specific property/value.
     *
     * @param {String} property The name of a property on your objects.
     * @param {String/RegExp} value A string that the property values
     * should start with or a RegExp to test against the property.
     * @param {Number} [start=0] The index to start searching at.
     * @param {Boolean} [startsWith=true] Pass `false` to allow a match start anywhere in
     * the string. By default the `value` will match only at the start of the string.
     * @param {Boolean} [endsWith=true] Pass `false` to allow the match to end before the
     * end of the string. By default the `value` will match only at the end of the string.
     * @param {Boolean} [ignoreCase=true] Pass `false` to make the `RegExp` case
     * sensitive (removes the 'i' flag).
     * @return {Object} The first item in the collection which matches the criteria or
     * `null` if none was found.
     * @since 5.0.0
     */
    find: function (property, value, start, startsWith, endsWith, ignoreCase) {
        if (Ext.isEmpty(value, false)) {
            return null;
        }

        var regex = Ext.String.createRegex(value, startsWith, endsWith, ignoreCase),
            root = this.getRootProperty();

        return this.findBy(function (item) {
            return item && regex.test((root ? item[root] : item)[property]);
        }, null, start);
    },

    /**
     * Returns the first item in the collection which elicits a true return value from the
     * passed selection function.
     * @param {Function} fn The selection function to execute for each item.
     * @param {Object} fn.item The collection item.
     * @param {String} fn.key The key of collection item.
     * @param {Object} [scope=this] The scope (`this` reference) in which the function
     * is executed. Defaults to this collection.
     * @param {Number} [start=0] The index at which to start searching.
     * @return {Object} The first item in the collection which returned true from the selection
     * function, or null if none was found.
     * @since 5.0.0
     */
    findBy: function (fn, scope, start) {
        var me = this,
            items = me.items,
            len = items.length,
            i, item, key;

        scope = scope || me;
        for (i = start || 0; i < len; i++) {
            key = me.getKey(item = items[i]);
            if (fn.call(scope, item, key)) {
                return items[i];
            }
        }

        return null;
    },

    /**
     * Finds the index of the first matching object in this collection by a specific
     * property/value.
     *
     * @param {String} property The name of a property on your objects.
     * @param {String/RegExp} value A string that the property values
     * should start with or a RegExp to test against the property.
     * @param {Number} [start=0] The index to start searching at.
     * @param {Boolean} [startsWith=true] Pass `false` to allow a match start anywhere in
     * the string. By default the `value` will match only at the start of the string.
     * @param {Boolean} [endsWith=true] Pass `false` to allow the match to end before the
     * end of the string. By default the `value` will match only at the end of the string.
     * @param {Boolean} [ignoreCase=true] Pass `false` to make the `RegExp` case
     * sensitive (removes the 'i' flag).
     * @return {Number} The matched index or -1 if not found.
     * @since 5.0.0
     */
    findIndex: function (property, value, start, startsWith, endsWith, ignoreCase) {
        var item = this.find(property, value, start, startsWith, endsWith, ignoreCase);

        return item ? this.indexOf(item) : -1;
    },

    /**
     * Find the index of the first matching object in this collection by a function.
     * If the function returns `true` it is considered a match.
     * @param {Function} fn The function to be called.
     * @param {Object} fn.item The collection item.
     * @param {String} fn.key The key of collection item.
     * @param {Object} [scope=this] The scope (`this` reference) in which the function
     * is executed. Defaults to this collection.
     * @param {Number} [start=0] The index at which to start searching.
     * @return {Number} The matched index or -1
     * @since 5.0.0
     */
    findIndexBy: function (fn, scope, start) {
        var item = this.findBy(fn, scope, start);
        return item ? this.indexOf(item) : -1;
    },

    /**
     * Returns the first item in the collection.
     * @param {Boolean} [grouped] `true` to extract the first item in each group. Only applies if
     * a {@link #grouper} is active in the collection.
     * @return {Object} The first item in the collection. If the grouped paramter is passed,
     * see {@link #aggregateByGroup} for information on the return type.
     * @since 5.0.0
     */
    first: function (grouped) {
        var groups = grouped ? this.getGroups() : undefined;
        return groups ? this.aggregateGroups(groups, null, 'first') : this.items[0];
    },
    
    /**
     * Returns the last item in the collection.
     * @param {Boolean} [grouped] `true` to extract the first item in each group. Only applies if
     * a {@link #grouper} is active in the collection.
     * @return {Object} The last item in the collection. If the grouped paramter is passed,
     * see {@link #aggregateByGroup} for information on the return type.
     * @since 5.0.0
     */
    last: function (grouped) {
        var groups = grouped ? this.getGroups() : undefined;
        return groups ? this.aggregateGroups(groups, null, 'last') : this.items[this.length - 1];
    },

    /**
     * Returns the item associated with the passed key.
     * @param {String/Number} key The key of the item.
     * @return {Object} The item associated with the passed key.
     * @since 5.0.0
     */
    get: function (key) {
        return this.map[key];
    },

    /**
     * Returns the item at the specified index.
     * @param {Number} index The index of the item.
     * @return {Object} The item at the specified index.
     * @since 5.0.0
     */
    getAt: function (index) {
        return this.items[index];
    },

    /**
     * Returns the item associated with the passed key.
     * @param {String/Number} key The key of the item.
     * @return {Object} The item associated with the passed key.
     * @since 5.0.0
     */
    getByKey: function (key) {
        return this.map[key];
    },

    /**
     * Returns the number of items in the collection.
     * @return {Number} the number of items in the collection.
     * @since 5.0.0
     */
    getCount: function () {
        return this.length;
    },

    /**
     * A function which will be called, passing an object belonging to this collection.
     * The function should return the key by which that object will be indexed. This key
     * must be unique to this item as only one item with this key will be retained.
     *
     * The default implementation looks basically like this (give or take special case
     * handling of 0):
     *
     *      function getKey (item) {
     *          return item.id || item._id || item.getId();
     *      }
     *
     * You can provide your own implementation by passing the `keyFn` config.
     *
     * For example, to hold items that have a unique "name" property:
     *
     *     var elementCollection = new Ext.util.Collection({
     *         keyFn: function (item) {
     *             return item.name;
     *         }
     *     });
     *
     * The collection can have `extraKeys` if items need to be quickly looked up by other
     * (potentially non-unique) properties.
     *
     * @param {Object} item The item.
     * @return {Object} The key for the passed item.
     * @since 5.0.0
     */
    getKey: function (item) {
        var id = item.id;
        return (id === 0 || id) ? id :
              ((id = item._id) === 0 || id) ? id : item.getId();
    },

    /**
     * Returns a range of items in this collection
     * @param {Number} [begin=0] The index of the first item to get.
     * @param {Number} [end] The ending index. The item at this index is *not* included.
     * @return {Array} An array of items
     * @since 5.0.0
     */
    getRange: function (begin, end) {
        var items = this.items,
            length = items.length,
            range;

        //<debug>
        if (begin > end) {
            Ext.Error.raise('Inverted range passed to Collection.getRange: [' + begin +
                            ',' + end + ']');
        }
        //</debug>

        if (!length) {
            range = [];
        } else {
            range = Ext.Number.clipIndices(length, [begin, end]);
            range = items.slice(range[0], range[1]);
        }

        return range;
    },

    /**
     * Returns an array of values for the specified (sub) property.
     *
     * For example, to get an array of "name" properties from a collection of records (of
     * `Ext.data.Model` objects):
     *
     *      var names = collection.getValues('name', 'data');
     *
     * @param {String} property The property to collect on
     * @param {String} [root] 'root' property to extract the first argument from. This is
     * used mainly when operating on fields in records, where the fields are all stored
     * inside the 'data' object.
     * @return {Array} The values.
     * @param {Number} [start=0] The index of the first item to include.
     * @param {Number} [end] The index at which to stop getting values. The value of this
     * item is *not* included.
     * @return {Object[]} The array of values.
     * @since 5.0.0
     */
    getValues: function (property, root, start, end) {
        var items = this.items,
            range = Ext.Number.clipIndices(items.length, [start, end]),
            ret = [],
            i, value;

        for (i = range[0], end = range[1]; i < end; ++i) {
            value = items[i];
            value = (root ? value[root] : value)[property];
            ret.push(value);
        }

        return ret;
    },

    /**
     * Returns index within the collection of the passed Object.
     * @param {Object} item The item to find.
     * @return {Number} The index of the item or -1 if not found.
     * @since 5.0.0
     */
    indexOf: function (item) {
        if (!item) {
            return -1;
        }
        
        var key = this.getKey(item);
        return this.indexOfKey(key);
    },

    /**
     * Returns index within the collection of the passed key.
     * @param {Object} key The key to find.
     * @return {Number} The index of the item or -1 if not found.
     * @since 5.0.0
     */
    indexOfKey: function (key) {
        var me = this,
            indices = me.indices;

        if (key in me.map) {
            if (!indices) {
                indices = me.getIndices();
            }
            return indices[key];
        }

        return -1;
    },

    /**
     * Inserts one or more items to the collection. The `index` value is the position at
     * which the first item will be placed. The items starting at that position will be
     * shifted to make room.
     *
     * @param {Number} index The index at which to insert the item(s).
     * @param {Object/Object[]} item The item or items to add.
     * @return {Object/Object[]} The item or items added.
     * @since 5.0.0
     */
    insert: function (index, item) {
        var me = this,
            items = me.decodeItems(arguments, 1),
            ret = items;

        if (items.length) {
            me.splice(index, 0, items);
            ret = (items.length === 1) ? items[0] : items;
        }

        return ret;
    },

    /**
     * This method should be called when an item in this collection has been modified. If
     * the collection is sorted or filtered the result of modifying an item needs to be
     * reflected in the collection. If the item's key is also being modified, it is best
     * to pass the `oldKey` to this same call rather than call `updateKey` separately.
     *
     * @param {Object} item The item that was modified.
     * @param {String[]} [modified] The names of the modified properties of the item.
     * @param {String/Number} [oldKey] Passed if the item's key was also modified.
     * @since 5.0.0
     */
    itemChanged: function (item, modified, oldKey) {
        var me = this,
            keyChanged = oldKey === 0 || !!oldKey,
            filtered = me.filtered && me.getAutoFilter(),
            filterChanged = false,
            itemMovement = 0,
            items = me.items,
            last = me.length - 1,
            sorted = me.sorted && last, // one item is not really sorted
            source = me.getSource(),
            toAdd,
            toRemove = 0,
            index,
            itemFiltered = false,
            newIndex,
            wasFiltered = false,
            details, newKey, sortFn;

        // We are owned, we cannot react, inform owning collection.
        if (source && !source.updating) {
            source.itemChanged(item, oldKey);
        }

        // Root Collection has been informed.
        // Change is propagating downward from root.
        else {
            newKey = me.getKey(item);

            if (filtered) {
                index = me.indexOfKey(keyChanged ? oldKey : newKey);
                wasFiltered = (index < 0);
                itemFiltered = me.isItemFiltered(item);
                filterChanged = (wasFiltered !== itemFiltered);
            }

            if (filterChanged) {
                if (itemFiltered) {
                    toRemove = [ item ];
                    newIndex = -1;
                } else {
                    toAdd = [ item ];
                    newIndex = me.length; // this will be ignored if sorted
                }
            }
            // If sorted, the newIndex must be reported correctly in the beforeitemchange and itemchange events.
            // Even though splice ignores the parameter and calculates the insertion point
            else if (sorted && !itemFiltered) {
                // If we are sorted and there are 2 or more items make sure this item is at
                // the proper index.
                if (!filtered) {
                    // If the filter has not changed we may need to move the item but if
                    // there is a filter we have already determined its index.
                    index = me.indexOfKey(keyChanged ? oldKey : newKey);
                }

                sortFn = me.getSortFn();

                if (index && sortFn(items[index - 1], items[index]) > 0) {
                    // If this item is not the first and the item before it compares as
                    // greater-than then item needs to move left since it is less-than
                    // item[index - 1].
                    itemMovement = -1;

                    // We have to bound the binarySearch or else the presence of the
                    // out-of-order "item" would break it.
                    newIndex = Ext.Array.binarySearch(items, item, 0, index, sortFn);
                }
                else if (index < last && sortFn(items[index], items[index + 1]) > 0) {
                    // If this item is not the last and the item after it compares as
                    // less-than then item needs to move right since it is greater-than
                    // item[index + 1].
                    itemMovement = 1;

                    // We have to bound the binarySearch or else the presence of the
                    // out-of-order "item" would break it.
                    newIndex = Ext.Array.binarySearch(items, item, index + 1, sortFn);
                }

                if (itemMovement) {
                    toAdd = [ item ];
                }
            }

            // One may be tempted to avoid this notification when none of our three vars
            // are true, *but* the problem with that is that these three changes we care
            // about are only what this collection cares about. Child collections or
            // outside parties still need to know that the item has changed in some way.
            // We do NOT adjust the newIndex reported here to allow for position *after* the item has been removed
            // We report the "visual" position at which the item would be inserted as if it were new.
            details = {
                item: item,
                key: newKey,
                index: newIndex,

                filterChanged: filterChanged,
                keyChanged: keyChanged,
                indexChanged: !!itemMovement,

                filtered: itemFiltered,
                oldIndex: index,
                newIndex: newIndex,
                wasFiltered: wasFiltered
            };

            if (keyChanged) {
                details.oldKey = oldKey;
            }
            if (modified) {
                details.modified = modified;
            }

            me.beginUpdate();

            me.notify('beforeitemchange', [details]);

            if (keyChanged) {
                me.updateKey(item, oldKey);
            }

            if (toAdd || toRemove) {
                // In sorted mode (which is the only time we get here), newIndex is
                // correct but *ignored* by splice since it has to assume that *insert*
                // index values need to be determined internally. In other words, the
                // first argument here is both the remove and insert index but in sorted
                // mode the insert index is calculated by splice.
                me.splice(newIndex, toRemove, toAdd);
            }

            // Ensure that the newIndex always refers to the item the insertion is *before*.
            // Ensure that the oldIndex always refers to the item the insertion was *before*.
            //
            // Before change to "c" to "h":     |   Before change "i" to "d":
            //                                  |
            //      +---+---+---+---+---+---+   |   +---+---+---+---+---+---+
            //      | a | c | e | g | i | k |   |   | a | c | e | g | i | k |
            //      +---+---+---+---+---+---+   |   +---+---+---+---+---+---+
            //        0   1   2   3   4   5     |     0   1   2   3   4   5   
            //            ^           ^         |             ^       ^
            //            |           |         |             |       |
            //        oldIndex    newIndex      |       newIndex     oldIndex
            //                                  |
            // After change to "c" to "h":      |   After change "i" to "d":
            //                                  |
            //      +---+---+---+---+---+---+   |   +---+---+---+---+---+---+
            //      | a | e | g | h | i | k |   |   | a | c | d | e | g | k |
            //      +---+---+---+---+---+---+   |   +---+---+---+---+---+---+
            //        0   1   2   3   4   5     |     0   1   2   3   4   5  
            //            ^       ^             |             ^           ^
            //            |       |             |             |           |
            //      oldIndex    newIndex        |        newIndex     oldIndex
            //
            if (itemMovement > 0) {
                details.newIndex--;
            } else if (itemMovement < 0) {
                details.oldIndex++;
            }

            me.notify('itemchange', [details]);

            me.endUpdate();
        }
    },

    /**
     * Remove an item from the collection.
     * @param {Object/Object[]} item The item or items to remove.
     * @return {Number} The number of items removed.
     * @since 5.0.0
     */
    remove: function (item) {
        var me = this,
            items = me.decodeRemoveItems(arguments, 0),
            length = me.length;

        me.splice(0, items);

        return length - me.length;
    },

    /**
     * Remove all items in the collection.
     * @return {Ext.util.Collection} This object.
     * @since 5.0.0
     */
    removeAll: function () {
        var me = this,
            length = me.length;

        if (me.generation && length) {
            me.splice(0, length);
        }

        return me;
    },

    /**
     * Remove an item from a specified index in the collection.
     * @param {Number} index The index within the collection of the item to remove.
     * @param {Number} [count=1] The number of items to remove.
     * @return {Object/Number} If `count` was 1 and the item was removed, that item is
     * returned. Otherwise the number of items removed is returned.
     * @since 5.0.0
     */
    removeAt: function (index, count) {
        var me = this,
            length = me.length,
            Num = Ext.Number,
            range = Num.clipIndices(length, [ index, (count === undefined) ? 1 : count ],
                                    Num.Clip.COUNT),
            n = range[0],
            removeCount = range[1] - n,
            item = (removeCount === 1) && me.getAt(n),
            removed;

        me.splice(n, removeCount);

        removed = me.length - length;

        return (item && removed) ? item : removed;
    },

    /**
     * Removes the item associated with the passed key fom the collection.
     * @param {String} key The key of the item to remove.
     * @return {Object} Only returned if removing at a specified key. The item removed or
     * `false` if no item was removed.
     * @since 5.0.0
     */
    removeByKey: function (key) {
        var item = this.getByKey(key);

        if (!item || !this.remove(item)) {
            return false;
        }

        return item;
    },

    /**
     * This method is basically the same as the JavaScript Array splice method.
     *
     * Negative indexes are interpreted starting at the end of the collection. That is,
     * a value of -1 indicates the last item, or equivalent to `length - 1`.
     *
     * @param {Number} index The index at which to add or remove items.
     * @param {Number/Object[]} toRemove The number of items to remove or an array of the
     * items to remove.
     * @param {Object[]} [toAdd] The items to insert at the given `index`.
     * @since 5.0.0
     */
    splice: function (index, toRemove, toAdd) {
        var me = this,
            autoSort = me.sorted && me.getAutoSort(),
            map = me.map,
            items = me.items,
            length = me.length,
            removeItems = (toRemove instanceof Array) ? me.decodeRemoveItems(toRemove) : null,
            isRemoveCount = !removeItems,
            Num = Ext.Number,
            range = Num.clipIndices(length, [index, isRemoveCount ? toRemove : 0],
                                    Num.Clip.COUNT),
            begin = range[0],
            end = range[1],
            // Determine how many items we might actually remove:
            removeCount = end - begin,
            newItems = me.decodeItems(arguments, 2),
            newCount = newItems ? newItems.length : 0,
            addItems, newItemsMap, removeMap,
            insertAt = begin,
            indices = me.indices || ((newCount || removeItems) ? me.getIndices() : null),
            adds = null,
            removes = removeCount ? [begin] : null,
            newKeys = null,
            source = me.getSource(),
            chunk, chunkItems, chunks, i, item, itemIndex, k, key, keys, n, duplicates,
            sorters;

        if (source && !source.updating) {
            // Modifying the content of a child collection has to be translated into a
            // change of its source. Because the source has all of the items of the child
            // (but likely at different indices) we can translate "index" and convert a
            // "removeCount" request into a "removeItems" request.
            if (isRemoveCount) {
                removeItems = [];
                for (i = 0; i < removeCount; ++i) {
                    removeItems.push(items[begin + i]);
                }
            }

            if (begin < length) {
                // Map index based on the item at that index since that item will be in
                // the source collection.
                i = source.indexOf(items[begin]);
            } else {
                // Map end of this collection to end of the source collection.
                i = source.length;
            }

            source.splice(i, removeItems, newItems);
            return me;
        }

        // Loop over the newItems because they could already be in the collection or may
        // be replacing items in the collection that just happen to have the same key. In
        // this case, those items must be removed as well. Since we need to call getKey
        // on each newItem to do this we may as well keep those keys for later.
        if (newCount) {
            addItems = newItems;
            newKeys = [];
            newItemsMap = {};

            // If this collection is sorted we will eventually need to sort addItems so
            // do that now so we can line up the newKeys properly. We optimize for the
            // case where we have no duplicates. It would be more expensive to do this
            // in two passes in an attempt to take advantage of removed duplicates.
            if (autoSort) {
                // We'll need the sorters later as well
                sorters = me.getSorters();

                if (newCount > 1) {
                    if (!addItems.$cloned) {
                        newItems = addItems = addItems.slice(0);
                    }
                    me.sortData(addItems);
                }
            }

            for (i = 0; i < newCount; ++i) {
                key = me.getKey(item = newItems[i]);

                if ((k = newItemsMap[key]) !== undefined) {
                    // Duplicates in the incoming newItems need to be discarded keeping the
                    // last of the duplicates. We add the index of the last duplicate of
                    // this key to the "duplicates" map.
                    (duplicates || (duplicates = {}))[k] = 1;
                } else {
                    // This item's index is outside the remove range, so we need to remove
                    // some extra stuff. Only the first occurrence of a given key in the
                    // newItems needs this processing.
                    itemIndex = indices[key];
                    if (itemIndex < begin || end <= itemIndex) {
                        (removes || (removes = [])).push(itemIndex); // might be the first
                    }
                }

                newItemsMap[key] = i; // track the last index of this key in newItems
                newKeys.push(key); // must correspond 1-to-1 with newItems
            }

            if (duplicates) {
                keys = newKeys;
                addItems = [];
                newKeys = [];
                addItems.$cloned = true;

                for (i = 0; i < newCount; ++i) {
                    if (!duplicates[i]) {
                        item = newItems[i];
                        addItems.push(item);
                        newKeys.push(keys[i]);
                    }
                }

                newCount = addItems.length;
            }

            adds = {
                //at: insertAt, // must fill this in later
                //next: null,  // only set by spliceMerge
                //replaced: null,  // must fill this in later
                items: addItems,
                keys: newKeys
            };
        }

        // If we are given a set of items to remove, map them to their indices.
        for (i = removeItems ? removeItems.length : 0; i-- > 0; ) {
            key = me.getKey(removeItems[i]);
            if ((itemIndex = indices[key]) !== undefined) {
                // ignore items we don't have (probably due to filtering)
                (removes || (removes = [])).push(itemIndex); // might be the first remove
            }
        }

        if (!adds && !removes) {
            return me;
        }

        me.beginUpdate();

        // Now we that everything we need to remove has its index in the removes array.
        // We start by sorting the array so we can coalesce the index values into chunks
        // or ranges.
        if (removes) {
            chunk = null;
            chunks = [];
            removeMap = {};
            if (removes.length > 1) {
                removes.sort(Ext.Array.numericSortFn);
            }

            // Coalesce the index array into chunks of (index, count) pairs for efficient
            // removal.
            for (i = 0, n = removes.length; i < n; ++i) {
                key = me.getKey(item = items[itemIndex = removes[i]]);
                if (!(key in map)) {
                    continue;
                }

                // Avoids 2nd loop of removed items but also means we won't process any
                // given item twice (in case of duplicates in removeItems).
                delete map[key];

                // Consider chunk = { at: 1, items: [ item1, item2 ] }
                //
                //      +---+---+---+---+---+---+
                //      |   | x | x |   |   |   |
                //      +---+---+---+---+---+---+
                //        0   1   2   3   4   5
                //
                // If we are adding an itemIndex > 3 we need a new chunk.
                //
                if (!chunk || itemIndex > (chunk.at + chunkItems.length)) {
                    chunks.push(chunk = {
                        at: itemIndex,
                        items: (chunkItems = []),
                        keys: (keys = []),
                        map: removeMap,
                        next: chunk,
                        replacement: adds
                    });

                    // Point "replaced" at the last chunk
                    if (adds) {
                        adds.replaced = chunk;
                    }
                }

                chunkItems.push(removeMap[key] = item);
                keys.push(key);

                if (itemIndex < insertAt) {
                    // If the removal is ahead of the insertion point specified, we need
                    // to move the insertAt backwards.
                    //
                    // Consider the following splice:
                    //
                    //      collection.splice(3, 2, [ { id: 'b' } ]);
                    //
                    //      +---+---+---+---+---+---+
                    //      | a | b | c | x | y | d |
                    //      +---+---+---+---+---+---+
                    //        0   1   2   3   4   5
                    //            ^       ^   ^
                    //            |        \ /
                    //         replace    remove
                    //
                    // The intent is to replace x and y with the new item at index=3. But
                    // since the new item has the same key as the item at index=1, that
                    // item must be replaced. The resulting collection will be:
                    //
                    //      +---+---+---+---+
                    //      | a | c | b | d |
                    //      +---+---+---+---+
                    //        0   1   2   3
                    //
                    --insertAt;
                }

                if (removeCount > 1 && itemIndex === begin) {
                    // To account for the given range to remove we started by putting the
                    // index of the first such item ("begin") in the array. When we find
                    // it in this loop we have to process all of the items and add them
                    // to the current chunk. The following trick allows us to repeat the
                    // loop for each item in the removeCount.
                    //
                    --removeCount; // countdown...
                    removes[i--] = ++begin; // backup and increment begin
                }
            } // for (removes)

            if (adds) {
                adds.at = insertAt; // we have the correct(ed) insertAt now
            }

            // Loop over the chunks in reverse so as to not invalidate index values on
            // earlier chunks.
            for (k = chunks.length; k-- > 0; ) {
                chunk = chunks[k];
                i = chunk.at;
                n = chunk.items.length;

                if (i + n < length) {
                    // If we are removing the tail of the collection, we can keep the
                    // indices for the rest of the things... otherwise we need to zap it
                    // and fix up later.
                    me.indices = indices = null;
                }

                me.length = length -= n;
                // We can use splice directly. The IE8 bug which Ext.Array works around
                // only affects *insertion*
                // http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/6e946d03-e09f-4b22-a4dd-cd5e276bf05a/
                //Ext.Array.erase(items, i, n);
                items.splice(i, n);

                if (indices) {
                    keys = chunk.keys;
                    for (i = 0; i < n; ++i) {
                        delete indices[keys[i]];
                    }
                }

                ++me.generation;
                me.notify('remove', [ chunk ]);
            }
        } // if (removes)

        if (adds) {
            if (autoSort && newCount > 1 && length) {
                me.spliceMerge(addItems);
            } else {
                if (autoSort) {
                    if (newCount > 1) {
                        // We have multiple addItems but we are empty, so just add at 0
                        insertAt = 0;
                        me.indices = indices = null;
                    } else {
                        // If we are adding one item we can position it properly now and
                        // avoid a full sort.
                        insertAt = sorters.findInsertionIndex(adds.items[0], items, me.getSortFn());
                    }
                }

                if (insertAt === length) {
                    // appending
                    items.push.apply(items, addItems);

                    if (indices) {
                        for (i = 0; i < newCount; ++i) {
                            indices[newKeys[i]] = insertAt + i;
                        }
                    }
                } else {
                    // inserting
                    me.indices = null;
                    Ext.Array.insert(items, insertAt, addItems);
                }

                for (i = 0; i < newCount; ++i) {
                    map[newKeys[i]] = addItems[i];
                }

                me.length += newCount;
                adds.at = insertAt;
                ++me.generation;
                me.notify('add', [ adds ]);
            }
        } // if (adds)

        me.endUpdate();

        return me;
    },

    /**
     * This method calls the supplied function `fn` between `beginUpdate` and `endUpdate`
     * calls.
     *
     *      collection.update(function () {
     *          // Perform multiple collection updates...
     *
     *          collection.add(item);
     *          // ...
     *
     *          collection.insert(index, otherItem);
     *          //...
     *
     *          collection.remove(someItem);
     *      });
     *
     * @param {Function} fn The function to call that will modify this collection.
     * @param {Ext.util.Collection} fn.collection This collection.
     * @param {Object} [scope=this] The `this` pointer to use when calling `fn`.
     * @return {Object} Returns the value returned from `fn` (typically `undefined`).
     * @since 5.0.0
     */
    update: function (fn, scope) {
        var me = this;

        me.beginUpdate();

        try {
            return fn.call(scope || me, me);
        }
        catch (e) {
            //<debug>
            Ext.log.error(this.$className + ': Unhandled Exception: ', e.description || e.message);
            //</debug>
            throw e;
        }
        finally {
            me.endUpdate();
        }
    },

    /**
     * Change the key for an existing item in the collection. If the old key does not
     * exist this call does nothing.
     * @param {Object} item The item whose key has changed.
     * @param {String} oldKey The old key for the `item`.
     * @since 5.0.0
     */
    updateKey: function (item, oldKey) {
        var me = this,
            map = me.map,
            indices = me.indices,
            source = me.getSource(),
            newKey;

        if (source && !source.updating) {
            // If we are being told of the key change and the source has the same idea
            // on keying the item, push the change down instead.
            source.updateKey(item, oldKey);
        }
        else if ((newKey = me.getKey(item)) !== oldKey) {
            if (oldKey in map || map[newKey] !== item) {
                if (oldKey in map) {
                    //<debug>
                    if (map[oldKey] !== item) {
                        Ext.Error.raise('Incorrect oldKey "' + oldKey +
                                        '" for item with newKey "' + newKey + '"');
                    }
                    //</debug>

                    delete map[oldKey];
                }

                // We need to mark ourselves as updating so that observing collections
                // don't reflect the updateKey back to us (see above check) but this is
                // not really a normal update cycle so we don't call begin/endUpdate.
                me.updating++;

                me.generation++;
                map[newKey] = item;
                if (indices) {
                    indices[newKey] = indices[oldKey];
                    delete indices[oldKey];
                }

                me.notify('updatekey', [{
                    item: item,
                    newKey: newKey,
                    oldKey: oldKey
                }]);

                me.updating--;
            }
        }
    },

    //-------------------------------------------------------------------------
    // Calls from the source Collection:

    /**
     * This method is called when items are added to the `source` collection. This is
     * equivalent to the `{@link #event-add add}` event but is called before the `add`
     * event is fired.
     * @param {Ext.util.Collection} source The source collection.
     * @param {Object} details The `details` of the `{@link #event-add add}` event.
     * @private
     * @since 5.0.0
     */
    onCollectionAdd: function (source, details) {
        var me = this,
            atItem = source.getAt(details.at),
            index = atItem ? me.indexOf(atItem) : -1,
            items = details.items,
            filtered,
            copy, i, item, n;

        if (me.getAutoFilter() && me.filtered) {
            for (i = 0, n = items.length; i < n; ++i) {
                item = items[i];
                if (me.isItemFiltered(item)) {
                    // If we have an item that is filtered out of this collection, we need
                    // to make a copy of the items up to this point.
                    if (!copy) {
                        copy = items.slice(0, i);
                    }
                    if (!filtered) {
                        filtered = [];
                    }
                    filtered.push(item);
                } else if (copy) {
                    // If we have a copy of the items, we need to put this item in that
                    // copy since it is not being filtered out.
                    copy.push(item);
                }
            }
        }

        me.splice((index < 0) ? me.length : index, 0, copy || items);
        if (filtered) {
            // Private for now. We may want to let any observers know we just
            // added these items but got filtered out
            me.notify('filteradd', [filtered]);
        }
    },

    /**
     * This method is called when an item is modified in the `source` collection. This is
     * equivalent to the `{@link #event-beforeitemchange beforeitemchange}` event but is
     * called before the `beforeitemchange` event is fired.
     * @param {Ext.util.Collection} source The source collection.
     * @param {Object} details The `details` of the
     * `{@link #event-beforeitemchange beforeitemchange}` event.
     * @private
     * @since 5.0.0
     */
    onCollectionBeforeItemChange: function (source, details) {
        // Drop the next updatekey event
        this.onCollectionUpdateKey = null;
    },

    /**
     * This method is called when the `source` collection starts updating. This is
     * equivalent to the `{@link #event-beginupdate beginupdate}` event but is called
     * before the `beginupdate` event is fired.
     * @param {Ext.util.Collection} source The source collection.
     * @private
     * @since 5.0.0
     */
    onCollectionBeginUpdate: function () {
        this.beginUpdate();
    },

    /**
     * This method is called when the `source` collection finishes updating. This is
     * equivalent to the `{@link #event-endupdate endupdate}` event but is called before
     * the `endupdate` event is fired.
     * @param {Ext.util.Collection} source The source collection.
     * @private
     * @since 5.0.0
     */
    onCollectionEndUpdate: function () {
        this.endUpdate();
    },

    /**
     * This method is called when an item is modified in the `source` collection. This is
     * equivalent to the `{@link #event-itemchange itemchange}` event but is called before
     * the `itemchange` event is fired.
     * @param {Ext.util.Collection} source The source collection.
     * @param {Object} details The `details` of the `{@link #event-itemchange itemchange}`
     * event.
     * @private
     * @since 5.0.0
     */
    onCollectionItemChange: function (source, details) {
        // Restore updatekey events
        delete this.onCollectionUpdateKey;

        this.itemChanged(details.item, details.modified, details.oldKey);
    },

    /**
     * This method is called when the `source` collection refreshes. This is equivalent to
     * the `{@link #event-refresh refresh}` event but is called before the `refresh` event
     * is fired.
     * @param {Ext.util.Collection} source The source collection.
     * @private
     * @since 5.0.0
     */
    onCollectionRefresh: function (source) {
        var me = this,
            map = {},
            indices = {},
            i, item, items, key, length;

        items = source.items;
        items = me.filtered && me.getAutoFilter() ? Ext.Array.filter(items, me.getFilterFn()) : items.slice(0);

        if (me.sorted) {
            me.sortData(items);
        }

        me.items = items;
        me.length = length = items.length;
        me.map = map;
        me.indices = indices;

        for (i = 0; i < length; ++i) {
            key = me.getKey(item = items[i]);
            map[key] = item;
            indices[key] = i;
        }

        me.notify('refresh');
    },

    /**
     * This method is called when items are removed from the `source` collection. This is
     * equivalent to the `{@link #event-remove remove}` event but is called before the
     * `remove` event is fired.
     * @param {Ext.util.Collection} source The source collection.
     * @param {Object} details The `details` of the `remove` event.
     * @private
     * @since 5.0.0
     */
    onCollectionRemove: function (source, details) {
        this.splice(0, details.items);
    },

    /**
     * @method onCollectionSort
     * This method is called when the `source` collection is sorted. This is equivalent to
     * the `{@link #event-sort sort}` event but is called before the `sort` event is fired.
     * @param {Ext.util.Collection} source The source collection.
     * @private
     * @since 5.0.0
     */
    // onCollectionSort: function (source) {
    //    we ignore sorting of the source collection because we prefer our own order.
    // },

    /**
     * This method is called when key changes in the `source` collection. This is
     * equivalent to the `updatekey` event but is called before the `updatekey` event is
     * fired.
     * @param {Ext.util.Collection} source The source collection.
     * @param {Object} details The `details` of the `updatekey` event.
     * @private
     * @since 5.0.0
     */
    onCollectionUpdateKey: function (source, details) {
        this.updateKey(details.item, details.oldKey);
    },

    //-------------------------------------------------------------------------
    // Private

    /**
     * @method average
     * Averages property values from some or all of the items in this collection.
     *
     * @param {String} property The name of the property to average from each item.
     * @param {Number} [begin] The index of the first item to include in the average.
     * @param {Number} [end] The index at which to stop averaging `items`. The item at
     * this index will *not* be included in the average.
     * @return {Object} The result of averaging the specified property from the indicated
     * items.
     * @since 5.0.0
     */
    
    /**
     * @method averageByGroup
     * See {@link #average}. The result is partitioned by group.
     *
     * @param {String} property The name of the property to average from each item.
     * @return {Object} The result of {@link #average}, partitioned by group. See {@link #aggregateByGroup}.
     * @since 5.0.0
     */

    /**
     * @method bounds
     * Determines the minimum and maximum values for the specified property over some or
     * all of the items in this collection.
     *
     * @param {String} property The name of the property from each item.
     * @param {Number} [begin] The index of the first item to include in the bounds.
     * @param {Number} [end] The index at which to stop in `items`. The item at this index
     * will *not* be included in the bounds.
     * @return {Array} An array `[min, max]` with the minimum and maximum of the specified
     * property.
     * @since 5.0.0
     */
    
    /**
     * @method boundsByGroup
     * See {@link #bounds}. The result is partitioned by group.
     *
     * @param {String} property The name of the property from each item.
     * @return {Object} The result of {@link #bounds}, partitioned by group. See {@link #aggregateByGroup}.
     * @since 5.0.0
     */
    
    /**
     * @method count
     * Determines the number of items in the collection.
     * 
     * @return {Number} The number of items.
     * @since 5.0.0
     */
    
    /**
     * @method countByGroup
     * See {@link #count}. The result is partitioned by group.
     *
     * @return {Object} The result of {@link #count}, partitioned by group. See {@link #aggregateByGroup}.
     * @since 5.0.0
     */

    /**
     * @method extremes
     * Finds the items with the minimum and maximum for the specified property over some
     * or all of the items in this collection.
     *
     * @param {String} property The name of the property from each item.
     * @param {Number} [begin] The index of the first item to include.
     * @param {Number} [end] The index at which to stop in `items`. The item at this index
     * will *not* be included.
     * @return {Array} An array `[minItem, maxItem]` with the items that have the minimum
     * and maximum of the specified property.
     * @since 5.0.0
     */
    
    /**
     * @method extremesByGroup
     * See {@link #extremes}. The result is partitioned by group.
     *
     * @param {String} property The name of the property from each item.
     * @return {Object} The result of {@link #extremes}, partitioned by group. See {@link #aggregateByGroup}.
     * @since 5.0.0
     */

    /**
     * @method max
     * Determines the maximum value for the specified property over some or all of the
     * items in this collection.
     *
     * @param {String} property The name of the property from each item.
     * @param {Number} [begin] The index of the first item to include in the maximum.
     * @param {Number} [end] The index at which to stop in `items`. The item at this index
     * will *not* be included in the maximum.
     * @return {Object} The maximum of the specified property from the indicated items.
     * @since 5.0.0
     */
    
    /**
     * @method maxByGroup
     * See {@link #max}. The result is partitioned by group.
     *
     * @param {String} property The name of the property from each item.
     * @return {Object} The result of {@link #max}, partitioned by group. See {@link #aggregateByGroup}.
     * @since 5.0.0
     */

    /**
     * @method maxItem
     * Finds the item with the maximum value for the specified property over some or all
     * of the items in this collection.
     *
     * @param {String} property The name of the property from each item.
     * @param {Number} [begin] The index of the first item to include in the maximum.
     * @param {Number} [end] The index at which to stop in `items`. The item at this index
     * will *not* be included in the maximum.
     * @return {Object} The item with the maximum of the specified property from the
     * indicated items.
     * @since 5.0.0
     */
    
    /**
     * @method maxItemByGroup
     * See {@link #maxItem}. The result is partitioned by group.
     *
     * @param {String} property The name of the property from each item.
     * @return {Object} The result of {@link #maxItem}, partitioned by group. See {@link #aggregateByGroup}.
     * @since 5.0.0
     */

    /**
     * @method min
     * Determines the minimum value for the specified property over some or all of the
     * items in this collection.
     *
     * @param {String} property The name of the property from each item.
     * @param {Number} [begin] The index of the first item to include in the minimum.
     * @param {Number} [end] The index at which to stop in `items`. The item at this index
     * will *not* be included in the minimum.
     * @return {Object} The minimum of the specified property from the indicated items.
     * @since 5.0.0
     */
    
    /**
     * @method minByGroup
     * See {@link #min}. The result is partitioned by group.
     *
     * @param {String} property The name of the property from each item.
     * @return {Object} The result of {@link #min}, partitioned by group. See {@link #aggregateByGroup}.
     * @since 5.0.0
     */

    /**
     * @method minItem
     * Finds the item with the minimum value for the specified property over some or all
     * of the items in this collection.
     *
     * @param {String} property The name of the property from each item.
     * @param {Number} [begin] The index of the first item to include in the minimum.
     * @param {Number} [end] The index at which to stop in `items`. The item at this index
     * will *not* be included in the minimum.
     * @return {Object} The item with the minimum of the specified property from the
     * indicated items.
     * @since 5.0.0
     */
    
    /**
     * @method minItemByGroup
     * See {@link #minItem}. The result is partitioned by group.
     *
     * @param {String} property The name of the property from each item.
     * @return {Object} The result of {@link #minItem}, partitioned by group. See {@link #aggregateByGroup}.
     * @since 5.0.0
     */

    /**
     * @method sum
     * Sums property values from some or all of the items in this collection.
     *
     * @param {String} property The name of the property to sum from each item.
     * @param {Number} [begin] The index of the first item to include in the sum.
     * @param {Number} [end] The index at which to stop summing `items`. The item at this
     * index will *not* be included in the sum.
     * @return {Object} The result of summing the specified property from the indicated
     * items.
     * @since 5.0.0
     */
    
    /**
     * @method sumByGroup
     * See {@link #sum}. The result is partitioned by group.
     *
     * @param {String} property The name of the property to sum from each item.
     * @return {Object} The result of {@link #sum}, partitioned by group. See {@link #aggregateByGroup}.
     * @since 5.0.0
     */

    _aggregators: {
        average: function (items, begin, end, property, root) {
            var n = end - begin;
            return n &&
                   this._aggregators.sum.call(this, items, begin, end, property, root) / n;
        },

        bounds: function (items, begin, end, property, root) {
            for (var value, max, min, i = begin; i < end; ++i) {
                value = items[i];
                value = (root ? value[root] : value)[property];

                // First pass max and min are undefined and since nothing is less than
                // or greater than undefined we always evaluate these "if" statements as
                // true to pick up the first value as both max and min.
                if (!(value < max)) {
                    max = value;
                }
                if (!(value > min)) {
                    min = value;
                }
            }

            return [min, max];
        },
        
        count: function(items) {
            return items.length;
        },

        extremes: function (items, begin, end, property, root) {
            var most = null,
                least = null,
                i, item, max, min, value;

            for (i = begin; i < end; ++i) {
                item = items[i];
                value = (root ? item[root] : item)[property];

                // Same trick as "bounds"
                if (!(value < max)) {
                    max = value;
                    most = item;
                }
                if (!(value > min)) {
                    min = value;
                    least = item;
                }
            }

            return [least, most];
        },

        max: function (items, begin, end, property, root) {
            var b = this._aggregators.bounds.call(this, items, begin, end, property, root);
            return b[1];
        },

        maxItem: function (items, begin, end, property, root) {
            var b = this._aggregators.extremes.call(this, items, begin, end, property, root);
            return b[1];
        },

        min: function (items, begin, end, property, root) {
            var b = this._aggregators.bounds.call(this, items, begin, end, property, root);
            return b[0];
        },

        minItem: function (items, begin, end, property, root) {
            var b = this._aggregators.extremes.call(this, items, begin, end, property, root);
            return b[0];
        },

        sum: function (items, begin, end, property, root) {
            for (var value, sum = 0, i = begin; i < end; ++i) {
                value = items[i];
                value = (root ? value[root] : value)[property];
                sum += value;
            }

            return sum;
        }
    },

    _eventToMethodMap: {
        add:              'onCollectionAdd',
        beforeitemchange: 'onCollectionBeforeItemChange',
        beginupdate:      'onCollectionBeginUpdate',
        endupdate:        'onCollectionEndUpdate',
        itemchange:       'onCollectionItemChange',
        refresh:          'onCollectionRefresh',
        remove:           'onCollectionRemove',
        sort:             'onCollectionSort',
        filter:           'onCollectionFilter',
        filteradd:        'onCollectionFilterAdd',
        updatekey:        'onCollectionUpdateKey'
    },

    /**
     * Adds an observing object to this collection. Observers are given first view of all
     * events that we may fire. For any event an observer may implement a method whose
     * name starts with "onCollection" to receive the event. The `{@link #event-add add}`
     * event for example would be passed to `"onCollectionAdd"`.
     *
     * The only restriction to observers is that they are not allowed to add or remove
     * observers from inside these methods.
     *
     * @param {Ext.util.Collection} observer The observer instance.
     * @private
     * @since 5.0.0
     */
    addObserver: function (observer) {
        var observers = this.observers,
            observerMap,
            observerId = observer.getId();

        if (!observers) {
            observers = this.observers = [];
            this.observerMap = {};
        }
        observerMap = this.observerMap;

        if (!observerMap[observerId]) {
            observers.push(observer);
            observerMap[observerId] = observer;

            // Allow observers to be inserted with a priority.
            // For example GroupCollections must react to Collection mutation before views.
            Ext.Array.sort(observers, this.prioritySortFn);
        }
    },

    prioritySortFn: function(o1, o2) {
        var a = o1.observerPriority || 0,
            b = o2.observerPriority || 0;

        return a - b;
    },

    applyExtraKeys: function (extraKeys) {
        var me = this,
            ret = {},
            config, key, name, value;

        for (name in extraKeys) {
            config = {
                collection: me
            };

            if (Ext.isString(value = extraKeys[name])) {
                config.property = value;
            } else {
                Ext.apply(config, value);
            }

            ret[name] = me[name] = key = new Ext.util.CollectionKey(config);
            key.name = name;
        }

        return ret;
    },

    applyGrouper: function (grouper) {
        if (grouper) {
            grouper = this.getSorters().decodeSorter(grouper, 'Ext.util.Grouper');
        }
        return grouper;
    },

    /**
     * Returns the items array on which to operate. This is called to handle the two
     * possible forms used by various methods that accept items:
     *
     *      collection.add(item1, item2, item3);
     *      collection.add([ item1, item2, item3 ]);
     *
     * Things get interesting when other arguments are involved:
     *
     *      collection.insert(index, item1, item2, item3);
     *      collection.insert(index, [ item1, item2, item3 ]);
     *
     * As well as below because we have to distinguish the one item from from the array:
     *
     *      collection.add(item);
     *      collection.insert(index, item);
     *
     * @param {Arguments} args The arguments object from the caller.
     * @param {Number} index The index in `args` (the caller's arguments) of `items`.
     * @return {Object[]} The array of items on which to operate.
     * @private
     * @since 5.0.0
     */
    decodeItems: function (args, index) {
        var me = this,
            ret = (index === undefined) ? args : args[index],
            cloned, decoder, i;

        if (!ret || !ret.$cloned) {
            cloned = args.length > index + 1 || !Ext.isIterable(ret);
            if (cloned) {
                ret = Ext.Array.slice(args, index);
                if (ret.length === 1 && ret[0] === undefined) {
                    ret.length = 0;
                }
            }

            decoder = me.getDecoder();
            if (decoder) {
                if (!cloned) {
                    ret = ret.slice(0);
                    cloned = true;
                }

                for (i = ret.length; i-- > 0; ) {
                    if ((ret[i] = decoder.call(me, ret[i])) === false) {
                        ret.splice(i, 1);
                    }
                }
            }

            if (cloned) {
                ret.$cloned = true;
            }
        }

        return ret;
    },

    /**
     * Returns the map of key to index for all items in this collection. This method will
     * lazily populate this map on request. This map is maintained when doing so does not
     * involve too much overhead. When this threshold is cross, the index map is discarded
     * and must be rebuilt by calling this method.
     *
     * @returns {Object}
     * @private
     * @since 5.0.0
     */
    getIndices: function () {
        var me = this,
            indices = me.indices,
            items = me.items,
            n = items.length,
            i, key;

        if (!indices) {
            me.indices = indices = {};
            ++me.indexRebuilds;

            for (i = 0; i < n; ++i) {
                key = me.getKey(items[i]);
                indices[key] = i;
            }
        }

        return indices;
    },

    /**
     * This method wraps all fired events and gives observers first view of the change.
     *
     * @param {String} eventName The name of the event to fire.
     * @param {Array} [args] The event arguments. This collection instance is inserted at
     * the front of this array if there is any receiver for the notification.
     *
     * @private
     * @since 5.0.0
     */
    notify: function (eventName, args) {
        var me = this,
            observers = me.observers,
            methodName = me._eventToMethodMap[eventName],
            added = 0,
            index, length, method, observer;

        args = args || [];

        if (observers && methodName) {
            for (index = 0, length = observers.length; index < length; ++index) {
                method = (observer = observers[index])[methodName];
                if (method) {
                    if (!added++) {
                        args.unshift(me); // put this Collection as the first argument
                    }
                    method.apply(observer, args);
                }
            }
        }
        
        // During construction, no need to fire an event here
        if (!me.hasListeners) {
            return;
        }
        
        if (me.hasListeners[eventName]) {
            if (!added) {
                args.unshift(me); // put this Collection as the first argument
            }
            me.fireEventArgs(eventName, args);
        }
    },
    
    /**
     * Returns the filter function.
     * @return {Function} sortFn The sort function.
     */
    getFilterFn: function () {
        return this.getFilters().getFilterFn();
    },

    /**
     * Returns the `Ext.util.FilterCollection`. Unless `autoCreate` is explicitly passed
     * as `false` this collection will be automatically created if it does not yet exist.
     * @param [autoCreate=true] Pass `false` to disable auto-creation of the collection.
     * @return {Ext.util.FilterCollection} The collection of filters.
     */
    getFilters: function (autoCreate) {
        var ret = this._filters;

        if (!ret && autoCreate !== false) {
            ret = new Ext.util.FilterCollection();
            this.setFilters(ret);
        }

        return ret;
    },

    /**
     * This method can be used to conveniently test whether an individual item would be
     * removed due to the current filter.
     * @param {Object} item The item to test.
     * @return {Boolean} The value `true` if the item would be "removed" from the
     * collection due to filters or `false` otherwise.
     */
    isItemFiltered: function (item) {
        return !this.getFilters().filterFn(item);
    },

    /**
     * Called after a change of the filter is complete.
     *
     * For example:
     *
     *      onFilterChange: function (filters) {
     *          if (this.filtered) {
     *              // process filters
     *          } else {
     *              // no filters present
     *          }
     *      }
     *
     * @template
     * @method
     * @param {Ext.util.FilterCollection} filters The filters collection.
     */
    onFilterChange: function (filters) {
        var me = this,
            source = me.getSource();

        if (!source) {
            // In this method, we have changed the filter but since we don't start with
            // any and we create the source collection as needed that means we are getting
            // our first filter.
            source = new Ext.util.Collection({
                keyFn: me.getKey,
                extraKeys: me.getInitialConfig().extraKeys,
                rootProperty: me.getRootProperty()
            });

            if (me.length) {
                source.add(me.items);
            }

            me.setSource(source);
            me.autoSource = source;
        } else if (source.length || me.length) {
            // if both us and the source are empty then we can skip this
            me.onCollectionRefresh(source);
        }
        me.notify('filter');
    },

    //-------------------------------------------------------------------------
    // Private

    applyFilters: function (filters, collection) {
        if (filters == null || (filters && filters.isFilterCollection)) {
            return filters;
        }

        if (filters) {
            if (!collection) {
                collection = this.getFilters();
            }

            collection.splice(0, collection.length, filters);
        }

        return collection;
    },

    updateFilters: function (newFilters, oldFilters) {
        var me = this;

        if (oldFilters) {
            // Do not disconnect from owning Filterable because
            // default options (eg _rootProperty) are read from there.
            // FilterCollections are detached from the Collection when the owning Store is remoteFilter: true
            // or the owning store is a TreeStore and only filters new nodes before filling a parent node.
            oldFilters.un('endupdate', 'onEndUpdateFilters', me);
        }

        if (newFilters) {
            // The Collection itself must have priority over user code, so use listener prepend option
            newFilters.on('endupdate', 'onEndUpdateFilters', me, {prepend: true});
            newFilters.$filterable = me;
        }

        me.onEndUpdateFilters(newFilters);
    },

    onEndUpdateFilters: function (filters) {
        var me = this,
            was = me.filtered,
            is = !!filters && (filters.length > 0); // booleanize filters

        if (was || is) {
            me.filtered = is;
            me.onFilterChange(filters);
        }
    },
    
    /**
     * Returns an up to date sort function.
     * @return {Function} The sort function.
     */
    getSortFn: function () {
        return this._sortFn || this.createSortFn();
    },

    /**
     * Returns the `Ext.util.SorterCollection`. Unless `autoCreate` is explicitly passed
     * as `false` this collection will be automatically created if it does not yet exist.
     * @param [autoCreate=true] Pass `false` to disable auto-creation of the collection.
     * @return {Ext.util.SorterCollection} The collection of sorters.
     */
    getSorters: function (autoCreate) {
        var ret = this._sorters;

        if (!ret && autoCreate !== false) {
            ret = new Ext.util.SorterCollection();
            this.setSorters(ret);
        }

        return ret;
    },

    /**
     * Called after a change of the sort is complete.
     *
     * For example:
     *
     *      onSortChange: function (sorters) {
     *          if (this.sorted) {
     *              // process sorters
     *          } else {
     *              // no sorters present
     *          }
     *      }
     *
     * @template
     * @method
     * @param {Ext.util.SorterCollection} sorters The sorters collection.
     */
    onSortChange: function () {
        if (this.sorted) {
            this.sortItems();
        }
    },

    /**
     * Updates the sorters collection and triggers sorting of this Sortable.
     *
     * For example:
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
     * When passing a single string argument to sort, the `direction` is maintained for
     * each field and is toggled automatically. So this code:
     *
     *     store.sort('myField');
     *     store.sort('myField');
     *
     * Is equivalent to the following:
     *
     *     store.sort('myField', 'ASC');
     *     store.sort('myField', 'DESC');
     *
     * @param {String/Function/Ext.util.Sorter[]} [property] Either the name of a property
     * (such as a field of a `Ext.data.Model` in a `Store`), an array of configurations
     * for `Ext.util.Sorter` instances or just a comparison function.
     * @param {String} [direction] The direction by which to sort the data. This parameter
     * is only valid when `property` is a String, otherwise the second parameter is the
     * `mode`.
     * @param {String} [mode="replace"] Where to put new sorters in the collection. This
     * should be one the following values:
     *
     * * `**replace**` : The new sorter(s) become the sole sorter set for this Sortable.
     *   This is the most useful call mode to programmaticly sort by multiple fields.
     *
     * * `**prepend**` : The new sorters are inserted as the primary sorters. The sorter
     *   collection length must be controlled by the developer.
     *
     * * `**multi**` : Similar to `**prepend**` the new sorters are inserted at the front
     *   of the collection of sorters. Following the insertion, however, this mode trims
     *   the sorter collection to enforce the `multiSortLimit` config. This is useful for
     *   implementing intuitive "Sort by this" user interfaces.
     *
     * * `**append**` : The new sorters are added at the end of the collection.
     * @return {Ext.util.Collection} This instance.
     */
    sort: function (property, direction, mode) {
        var sorters = this.getSorters();

        sorters.addSort.apply(sorters, arguments);

        return this;
    },

    /**
     * This method will sort an array based on the currently configured {@link #sorters}.
     * @param {Array} data The array you want to have sorted.
     * @return {Array} The array you passed after it is sorted.
     */
    sortData: function (data) {
        Ext.Array.sort(data, this.getSortFn());
        return data;
    },

    /**
     * Sorts the items of the collection using the supplied function. This should only be
     * called for collections that have no `sorters` defined.
     * @param {Function} sortFn The function by which to sort the items.
     * @since 5.0.0
     */
    sortItems: function (sortFn) {
        var me = this;

        if (me.sorted) {
            //<debug>
            if (sortFn) {
                Ext.Error.raise('Collections with sorters cannot resorted');
            }
            //</debug>
            sortFn = me.getSortFn();
        }

        me.indices = null;

        if (me.length) {
            Ext.Array.sort(me.items, sortFn);
        }
        
        // Even if there's no data, notify interested parties.
        // Eg: Stores must react and fire their refresh and sort events.
        me.notify('sort');
    },

    /**
     * Sorts the collection by a single sorter function
     * @param {Function} sorterFn The function to sort by
     * @deprecated
     */
    sortBy: function(sortFn) {
        return this.sortItems(sortFn);
    },

    //-------------------------------------------------------------------------
    // Private
    // Can be called to find the insertion index of a passed object in this collection.
    // Or can be passed an items array to search in, and may be passed a comparator
    findInsertionIndex: function(item, items, comparatorFn) {
        if (!items) {
            items = this.items;
        }
        if (!comparatorFn) {
            comparatorFn = this.getSortFn();
        }
        return Ext.Array.binarySearch(items, item, comparatorFn);
    },

    applySorters: function (sorters, collection) {
        if (sorters == null || (sorters && sorters.isSorterCollection)) {
            return sorters;
        }

        if (sorters) {
            if (!collection) {
                collection = this.getSorters();
            }

            collection.splice(0, collection.length, sorters);
        }

        return collection;
    },

    createSortFn: function () {
        var me = this,
            grouper = me.getGrouper(),
            sorterFn = me.getSorters().getSortFn();

        if (!grouper) {
            return sorterFn;
        }

        return function (lhs, rhs) {
            return grouper.sort(lhs, rhs) || sorterFn(lhs, rhs);
        };
    },

    updateGrouper: function (grouper) {
        var me = this,
            groups = me.getGroups(),
            sorters = me.getSorters(),
            populate, groupSorters;

        me.onSorterChange();
        me.grouped = !!grouper;

        if (grouper) {
            if (!groups) {
                groups = new Ext.util.GroupCollection({
                    itemRoot: me.getRootProperty()
                });

                me.addObserver(groups);
                me.setGroups(groups);
            }

            groupSorters = groups.getSorters();

            groupSorters.splice(0, groupSorters.length, {
                property: '_groupKey',
                direction: grouper.getDirection()
            });

            populate = true;
        } else {
            if (groups) {
                me.removeObserver(groups);
                groups.destroy();
            }
            me.setGroups(null);
        }

        if (!sorters.updating) {
            me.onEndUpdateSorters(sorters);
        }

        if (populate) {
            groups.onCollectionRefresh(me);
        }
    },

    updateSorters: function (newSorters, oldSorters) {
        var me = this;

        if (oldSorters) {
            // Do not disconnect from owning Filterable because
            // default options (eg _rootProperty) are read from there.
            // SorterCollections are detached from the Collection when the owning Store is remoteSort: true
            // or the owning store is a TreeStore and only sorts new nodes before filling a parent node.
            oldSorters.un('endupdate', 'onEndUpdateSorters', me);
        }

        if (newSorters) {
            // The Collection itself must have priority over user code, so use listener prepend option
            newSorters.on('endupdate', 'onEndUpdateSorters', me, {prepend: true});
            newSorters.$sortable = me;
        }

        me.onSorterChange();
        me.onEndUpdateSorters(newSorters);
    },
    
    onSorterChange: function() {
        this._sortFn = null;
    },

    onEndUpdateSorters: function (sorters) {
        var me = this,
            was = me.sorted,
            is = me.grouped || (!!sorters && (sorters.length > 0));  // booleanize sorters

        if (was || is) {
            me.sorted = is;
            me.onSortChange(sorters);
        }
    },

    /**
     * Removes an observing object to this collection. See `addObserver` for details.
     *
     * @param {Ext.util.Collection} observer The observer instance.
     * @private
     * @since 5.0.0
     */
    removeObserver: function (observer) {
        var observers = this.observers;

        if (observers) {
            Ext.Array.remove(observers, observer);
            delete this.observerMap[observer.getId()];
        }
    },

    /**
     * This method is what you might find in the core of a merge sort. We have an items
     * array that is sorted so we sort the newItems and merge the two sorted arrays. In
     * the general case, newItems will be no larger than all items so sorting it will be
     * faster than simply concatenating the arrays and calling sort on it.
     *
     * We take advantage of the nature of this process to generate add events as ranges.
     *
     * @param {Object[]} newItems
     * @private
     * @since 5.0.0
     */
    spliceMerge: function (newItems) {
        var me = this,
            newIndex,
            newLength = newItems.length,
            oldIndex = 0,
            oldItems = me.items,
            oldLength = oldItems.length,
            adds = [],
            count = 0,
            items = [],
            sorters = me.getSorters(),
            addItems, end, i, newItem, oldItem;

        me.items = items;

        //
        //  oldItems
        //      +----+----+----+----+
        //      | 15 | 25 | 35 | 45 |
        //      +----+----+----+----+
        //        0    1    2    3
        //
        //  newItems
        //      +----+----+----+----+----+----+
        //      | 10 | 11 | 20 | 21 | 50 | 51 |
        //      +----+----+----+----+----+----+
        //        0    1    2    3    4    5
        //

        for (newIndex = 0; newIndex < newLength; newIndex = end) {
            newItem = newItems[newIndex];

            // Flush out any oldItems that are <= newItem
            for ( ; oldIndex < oldLength; ++oldIndex) {
                // Consider above arrays...
                //  at newIndex == 0 this loop sets oldItem but breaks immediately
                //  at newIndex == 2 this loop pushes 15 and breaks w/oldIndex=1
                //  at newIndex == 4 this loop pushes 25, 35 and 45 and breaks w/oldIndex=4
                if (sorters.sortFn(newItem, oldItem = oldItems[oldIndex]) < 0) {
                    break;
                }
                items.push(oldItem);
            }

            if (oldIndex === oldLength) {
                // Consider above arrays...
                //  at newIndex == 0 we won't come in here (oldIndex == 0)
                //  at newIndex == 2 we won't come in here (oldIndex == 1)
                //  at newIndex == 4 we come here (oldIndex == 4), push 50 & 51 and break
                adds[count++] = {
                    at: items.length,
                    items: (addItems = [])
                };
                if (count > 1) {
                    adds[count - 2].next = adds[count - 1];
                }

                for (; newIndex < newLength; ++newIndex) {
                    addItems.push(newItem = newItems[newIndex]);
                    items.push(newItem);
                }
                break;
            }

            // else oldItem is the item from oldItems that is > newItem

            // Consider above arrays...
            //  at newIndex == 0 we will push 10
            //  at newIndex == 2 we will push 20
            adds[count++] = {
                at: items.length,
                items: (addItems = [ newItem ])
            };
            if (count > 1) {
                adds[count - 2].next = adds[count - 1];
            }

            items.push(newItem);

            for (end = newIndex + 1; end < newLength; ++end) {
                // Consider above arrays...
                //  at newIndex == 0 this loop pushes 11 then breaks w/end == 2
                //  at newIndex == 2 this loop pushes 21 the breaks w/end == 4
                if (sorters.sortFn(newItem = newItems[end], oldItem) >= 0) {
                    break;
                }
                items.push(newItem);
                addItems.push(newItem);
            }

            // if oldItems had 55 as its final element, the above loop would have pushed
            // all of newItems so the outer for loop would then fall out
        }

        for (; oldIndex < oldLength; ++oldIndex) {
            // In the above example, we won't come in here, but if you imagine a 55 in
            // oldItems we would have oldIndex == 4 and oldLength == 5
            items.push(oldItems[oldIndex]);
        }

        me.length = items.length;
        ++me.generation;

        // Tell users of the adds in increasing index order.
        for (i = 0; i < count; ++i) {
            me.notify('add', [ adds[i] ]);
        }
    },
    
    getGroups: function() {
        return this.callParent() || null;
    },

    updateGroups: function (newGroups, oldGroups) {
        if (oldGroups) {
            this.removeObserver(oldGroups);
        }
        if (newGroups) {
            this.addObserver(newGroups);
        }
    },

    updateSource: function (newSource, oldSource) {
        var auto = this.autoSource;
        if (oldSource) {
            oldSource.removeObserver(this);
            if (oldSource === auto) {
                auto.destroy();
                this.autoSource = null;
            }
        }
        if (newSource) {
            newSource.addObserver(this);
            if (newSource.length || this.length) {
                this.onCollectionRefresh(newSource);
            }
        }
    }
},
function () {
    var prototype = this.prototype;

    // Minor compat method
    prototype.removeAtKey = prototype.removeByKey;

    /**
     * This method is an alias for `decodeItems` but is called when items are being
     * removed. If a `decoder` is provided it may be necessary to also override this
     * method to achieve symmetry between adding and removing items. This is the case
     * for `Ext.util.FilterCollection' and `Ext.util.SorterCollection' for example.
     *
     * @method decodeRemoveItems
     * @protected
     * @since 5.0.0
     */
    prototype.decodeRemoveItems = prototype.decodeItems;

    Ext.Object.each(prototype._aggregators, function (name) {
        prototype[name] = function (property, begin, end) {
            return this.aggregate(property, name, begin, end);
        };
        
        prototype[name + 'ByGroup'] = function(property) {
            return this.aggregateByGroup(property, name);
        };
    });
});
