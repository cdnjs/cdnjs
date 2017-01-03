/**
 * Maintains an additional key map for an `Ext.util.Collection`. Instances of this class
 * are seldom created manually. Rather they are created by the `Ext.util.Collection' when
 * given an `extraKeys` config.
 *
 * @since 5.0.0
 */
Ext.define('Ext.util.CollectionKey', {
    mixins: [
        'Ext.mixin.Identifiable'
    ],

    config: {
        collection: null,

        /**
         * @cfg {Function/String} [keyFn]
         * A function to retrieve the key of an item in the collection. This can be normal
         * function that takes an item and returns the key or it can be the name of the
         * method to call on an item to get the key.
         *
         * For example:
         *
         *      new Ext.util.Collection({
         *          keys: {
         *              byName: {
         *                  keyFn: 'getName' // each item has a "getName" method
         *              }
         *          }
         *      });
         *
         * Or equivalently:
         *
         *      new Ext.util.Collection({
         *          keys: {
         *              byName: {
         *                  keyFn: function (item) {
         *                      return item.getName();
         *                  }
         *              }
         *          }
         *      });
         *
         * @since 5.0.0
         */
        keyFn: null,

        /**
         * @cfg {String} property
         * The name of the property on each item that is its key.
         *
         *      new Ext.util.Collection({
         *          keys: {
         *              byName: 'name'
         *          }
         *      });
         *
         * Or equivalently:
         *
         *      new Ext.util.Collection({
         *          keys: {
         *              byName: {
         *                  property: 'name'
         *              }
         *          }
         *      });
         *
         *      var item = collection.byName.get('fooname');
         */
        property: null,

        /**
         * @cfg {String} rootProperty
         * The name of the sub-object property on each item that is its key. This value
         * overrides `{@link Ext.util.Collection#rootProperty}`.
         *
         *      new Ext.util.Collection({
         *          keys: {
         *              byName: {
         *                  property: 'name',
         *                  rootProperty: 'data'
         *              }
         *          }
         *      });
         *
         *      var item = collection.byName.get('fooname');
         */
        rootProperty: null,

        unique: true
    },

    /**
     * This property is used to know when this `Index` is in sync with the `Collection`.
     * When the two are synchronized, their `generation` values match.
     * @private
     * @readonly
     * @since 5.0.0
     */
    generation: 0,

    /**
     * @property {Object} map
     * An object used as map to get an object based on its key.
     * @since 5.0.0
     * @private
     */
    map: null,

    /**
     * @property {Number} mapRebuilds
     * The number of times the `map` has been rebuilt. This is for diagnostic use.
     * @private
     * @readonly
     */
    mapRebuilds: 0,

    /**
     * @property {String} name
     * This property is set by `Ext.util.Collection` when added via `extraKeys`.
     * @readonly
     */

    constructor: function (config) {
        this.initConfig(config);

        //<debug>
        if (!Ext.isFunction(this.getKey)) {
            Ext.Error.raise('CollectionKey requires a keyFn or property config');
        }
        //</debug>
    },

    /**
     * Returns the item or, if not `unique` possibly array of items that have the given
     * key.
     * @param {Mixed} key The key that will match the `keyFn` return value or value of
     * the specified `property`.
     * @return {Object}
     */
    get: function (key) {
        var map = this.map || this.getMap();
        return map[key] || null;
    },

    getRootProperty: function () {
        var me = this,
            root = this.callParent();

        return root !== null ? root : me.getCollection().getRootProperty();
    },

    /**
     * Returns the index of the item with the given key in the collection. If this is not
     * a `unique` result, the index of the first item in the collection with the matching
     * key.
     *
     * To iterate the indices of all items with a matching (not `unique`) key:
     *
     *      for (index = collection.byName.indexOf('foo');
     *              index >= 0;
     *              index = collection.byName.indexOf('foo', index)) {
     *          // process item at "index"
     *      }
     *
     * @param {Mixed} key The key that will match the `keyFn` return value or value of
     * the specified `property`.
     * @param {Number} [startAt=-1] The index at which to start. Only occurrences beyond
     * this index are returned.
     * @return {Number} The index of the first item with the given `key` beyond the given
     * `startAt` index or -1 if there are no such items.
     */
    indexOf: function (key, startAt) {
        var map = this.map || this.getMap(),
            item = map[key],
            collection = this.getCollection(),
            length = collection.length,
            i, index, items, n;

        if (!item) {
            return -1;
        }

        if (startAt === undefined) {
            startAt = -1;
        }

        if (item instanceof Array) {
            items = item;
            index = length; // greater than any actual indexOf

            for (n = items.length; n-- > 0; ) {
                i = collection.indexOf(items[n]);
                if (i < index && i > startAt) {
                    index = i;
                }
            }
            if (index === length) {
                return -1;
            }
        } else {
            index = collection.indexOf(item);
        }

        return (index > startAt) ? index : -1;
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
            bucket, index;

        if (map) {
            bucket = map[oldKey];

            if (bucket instanceof Array) {
                index = Ext.Array.indexOf(bucket, item);

                if (index >= 0) {
                    if (bucket.length > 2) {
                        bucket.splice(index, 1);
                    } else {
                        // If there is an array of 2 items, replace the array with the
                        // one remaining item. Since index then is either 0 or 1, the
                        // index of the other item is easy.
                        map[oldKey] = bucket[1 - index];  // "1 - 0" = 1, "1 - 1" = 0
                    }
                }
            } else if (bucket) {
                //<debug>
                if (me.getUnique() && bucket !== item) {
                    Ext.Error.raise('Incorrect oldKey "' + oldKey +
                                    '" for item with newKey "' + me.getKey(item) + '"');
                }
                //</debug>

                delete map[oldKey];
            }

            me.add([ item ]);
        }
    },

    //-------------------------------------------------------------------------
    // Calls from our Collection:

    onCollectionAdd: function (collection, add) {
        if (this.map) {
            this.add(add.items);
        }
    },

    onCollectionItemChange: function (collection, details) {
        this.map = null;
    },

    onCollectionRefresh: function () {
        this.map = null;
    },

    onCollectionRemove: function (collection, remove) {
        var me = this,
            map = me.map,
            items = remove.items,
            length = items.length,
            i, item, key;

        if (map) {
            if (me.getUnique() && length < collection.length / 2) {
                for (i = 0; i < length; ++i) {
                    key = me.getKey(item = items[i]);
                    delete map[key];
                }
            } else {
                me.map = null;
            }
        }
    },

    //-------------------------------------------------------------------------
    // Private

    add: function (items) {
        var me = this,
            map = me.map,
            bucket, i, item, key, length, unique;

        length = items.length;
        unique = me.getUnique();

        for (i = 0; i < length; ++i) {
            key = me.getKey(item = items[i]);

            if (unique || !(key in map)) {
                map[key] = item;
            } else {
                if (!((bucket = map[key]) instanceof Array)) {
                    map[key] = bucket = [ bucket ];
                }

                bucket.push(item);
            }
        }
    },

    applyKeyFn: function (keyFn) {
        if (Ext.isString(keyFn)) {
            this.getKey = function (item) {
                return item[keyFn]();
            };
        } else {
            this.getKey = keyFn;
        }
    },

    applyProperty: function (property) {
        var root = this.getRootProperty();

        this.getKey = function (item) {
            return (root ? item[root] : item)[property];
        };
    },

    getMap: function () {
        var me = this,
            map = me.map;

        if (!map) {
            me.map = map = {};
            me.keysByItemKey = {};
            ++me.mapRebuilds;

            me.add(me.getCollection().items);
        }

        return map;
    },

    updateCollection: function (collection) {
        collection.addObserver(this);
    }
});
