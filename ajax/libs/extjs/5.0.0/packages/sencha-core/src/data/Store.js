/**
 * The Store class encapsulates a client side cache of {@link Ext.data.Model Model} objects. Stores load data via a
 * {@link Ext.data.proxy.Proxy Proxy}, and also provide functions for {@link #sort sorting}, {@link #filter filtering}
 * and querying the {@link Ext.data.Model model} instances contained within it.
 *
 * Creating a Store is easy - we just tell it the Model and the Proxy to use for loading and saving its data:
 *
 *      // Set up a {@link Ext.data.Model model} to use in our Store
 *      Ext.define('User', {
 *          extend: 'Ext.data.Model',
 *          fields: [
 *              {name: 'firstName', type: 'string'},
 *              {name: 'lastName',  type: 'string'},
 *              {name: 'age',       type: 'int'},
 *              {name: 'eyeColor',  type: 'string'}
 *          ]
 *      });
 *
 *      var myStore = Ext.create('Ext.data.Store', {
 *          model: 'User',
 *          proxy: {
 *              type: 'ajax',
 *              url: '/users.json',
 *              reader: {
 *                  type: 'json',
 *                  rootProperty: 'users'
 *              }
 *          },
 *          autoLoad: true
 *      });
 *
 * In the example above we configured an AJAX proxy to load data from the url '/users.json'. We told our Proxy to use a
 * {@link Ext.data.reader.Json JsonReader} to parse the response from the server into Model object - {@link
 * Ext.data.reader.Json see the docs on JsonReader} for details.
 *
 * ## Inline data
 *
 * Stores can also load data inline. Internally, Store converts each of the objects we pass in as {@link #cfg-data} into
 * Model instances:
 *
 *      Ext.create('Ext.data.Store', {
 *          model: 'User',
 *          data : [
 *              {firstName: 'Ed',    lastName: 'Spencer'},
 *              {firstName: 'Tommy', lastName: 'Maintz'},
 *              {firstName: 'Aaron', lastName: 'Conran'},
 *              {firstName: 'Jamie', lastName: 'Avins'}
 *          ]
 *      });
 *
 * Loading inline data using the method above is great if the data is in the correct format already (e.g. it doesn't
 * need to be processed by a {@link Ext.data.reader.Reader reader}). If your inline data requires processing to decode
 * the data structure, use a {@link Ext.data.proxy.Memory MemoryProxy} instead (see the {@link Ext.data.proxy.Memory
 * MemoryProxy} docs for an example).
 *
 * Additional data can also be loaded locally using {@link #method-add}.
 * 
 * ## Dynamic Loading
 *
 * Stores can be dynamically updated by calling the {@link #method-load} method:
 *
 *     store.load({
 *         params: {
 *             group: 3,
 *             type: 'user'
 *         },
 *         callback: function(records, operation, success) {
 *             // do something after the load finishes
 *         },
 *         scope: this
 *     });
 *
 * Here a bunch of arbitrary parameters is passed along with the load request and a callback function is set
 * up to do something after the loading is over.
 *
 * ## Loading Nested Data
 *
 * Applications often need to load sets of associated data - for example a CRM system might load a User and her Orders.
 * Instead of issuing an AJAX request for the User and a series of additional AJAX requests for each Order, we can load
 * a nested dataset and allow the Reader to automatically populate the associated models. Below is a brief example, see
 * the {@link Ext.data.reader.Reader} intro docs for a full explanation:
 *
 *      var store = Ext.create('Ext.data.Store', {
 *          autoLoad: true,
 *          model: "User",
 *          proxy: {
 *              type: 'ajax',
 *              url: 'users.json',
 *              reader: {
 *                  type: 'json',
 *                  rootProperty: 'users'
 *              }
 *          }
 *      });
 *
 * Which would consume a response like this:
 *
 *      {
 *          "users": [{
 *              "id": 1,
 *              "name": "Ed",
 *              "orders": [{
 *                  "id": 10,
 *                  "total": 10.76,
 *                  "status": "invoiced"
 *             },{
 *                  "id": 11,
 *                  "total": 13.45,
 *                  "status": "shipped"
 *             }]
 *          }]
 *      }
 *
 * See the {@link Ext.data.reader.Reader} intro docs for a full explanation.
 *
 * ## Filtering and Sorting
 *
 * Stores can be sorted and filtered - in both cases either remotely or locally. The {@link #cfg-sorters} and
 * {@link #cfg-filters} are held inside {@link Ext.util.MixedCollection MixedCollection} instances to make them easy to manage.
 * Usually it is sufficient to either just specify sorters and filters in the Store configuration or call {@link #sort}
 * or {@link #filter}:
 *
 *      var store = Ext.create('Ext.data.Store', {
 *          model: 'User',
 *          sorters: [{
 *              property: 'age',
 *              direction: 'DESC'
 *          }, {
 *              property: 'firstName',
 *              direction: 'ASC'
 *          }],
 *
 *          filters: [{
 *              property: 'firstName',
 *              value: /Ed/
 *          }]
 *      });
 *
 * The new Store will keep the configured sorters and filters in the MixedCollection instances mentioned above. By
 * default, sorting and filtering are both performed locally by the Store - see {@link #remoteSort} and
 * {@link #remoteFilter} to allow the server to perform these operations instead.
 *
 * Filtering and sorting after the Store has been instantiated is also easy. Calling {@link #filter} adds another filter
 * to the Store and automatically filters the dataset (calling {@link #filter} with no arguments simply re-applies all
 * existing filters).
 *
 *     store.filter('eyeColor', 'Brown');
 *
 * Change the sorting at any time by calling {@link #sort}:
 *
 *     store.sort('height', 'ASC');
 *
 * Note that all existing sorters will be removed in favor of the new sorter data (if {@link #sort} is called with no
 * arguments, the existing sorters are just reapplied instead of being removed). To keep existing sorters and add new
 * ones, just add them to the MixedCollection:
 *
 *     store.sorters.add(new Ext.util.Sorter({
 *         property : 'shoeSize',
 *         direction: 'ASC'
 *     }));
 *
 *     store.sort();
 *
 * ## Registering with StoreManager
 *
 * Any Store that is instantiated with a {@link #storeId} will automatically be registered with the {@link
 * Ext.data.StoreManager StoreManager}. This makes it easy to reuse the same store in multiple views:
 *
 *     //this store can be used several times
 *     Ext.create('Ext.data.Store', {
 *         model: 'User',
 *         storeId: 'usersStore'
 *     });
 *
 *     new Ext.List({
 *         store: 'usersStore',
 *         //other config goes here
 *     });
 *
 *     new Ext.view.View({
 *         store: 'usersStore',
 *         //other config goes here
 *     });
 *
 * ## Further Reading
 *
 * Stores are backed up by an ecosystem of classes that enables their operation. To gain a full understanding of these
 * pieces and how they fit together, see:
 *
 *   - {@link Ext.data.proxy.Proxy Proxy} - overview of what Proxies are and how they are used
 *   - {@link Ext.data.Model Model} - the core class in the data package
 *   - {@link Ext.data.reader.Reader Reader} - used by any subclass of {@link Ext.data.proxy.Server ServerProxy} to read a response
 *
 * @author Ed Spencer
 */
Ext.define('Ext.data.Store', {
    extend: 'Ext.data.ProxyStore',

    alias: 'store.store',

    mixins: [
        'Ext.data.LocalStore'
    ],

    // Required classes must be loaded before the definition callback runs
    // The class definition callback creates a dummy Store which requires that
    // all the classes below have been loaded.
    requires: [
        'Ext.data.Model',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',

        // This ensures that we have Ext.util.Collection and all of its requirements.
        'Ext.util.GroupCollection',
        'Ext.util.DelayedTask'
    ],

    uses: [
        'Ext.data.StoreManager',
        'Ext.util.Grouper'
    ],

    config: {
        /**
         * @cfg {Object[]/Ext.data.Model[]} data
         * Array of Model instances or data objects to load locally. See "Inline data"
         * above for details.
         */
        data: 0, // pass 0 to ensure applyData is called
        
        /**
        * @cfg {Boolean} [clearRemovedOnLoad=true]
        * `true` to clear anything in the {@link #removed} record collection when the store loads.
        */
        clearRemovedOnLoad: true,
       
        /**
        * @cfg {Boolean} [clearOnPageLoad=true]
        * True to empty the store when loading another page via {@link #loadPage},
        * {@link #nextPage} or {@link #previousPage}. Setting to false keeps existing records, allowing
        * large data sets to be loaded one page at a time but rendered all together.
        */
        clearOnPageLoad: true,

        /**
         * @cfg {Ext.data.Model} [associatedEntity]
         * The owner of this store if the store is used as part of an association.
         * @private
         */
        associatedEntity: null,

        /**
         * @cfg {Ext.data.schema.Role} [role]
         * The role for the {@link #associatedEntity}.
         */
        role: null
    },

    /**
     * @property {Ext.util.Collection} data
     * The `data` property is a `Collection` which holds this store's local cache of records.
     * @private
     * @readonly
     */

    // Private. Used as parameter to loadRecords
    addRecordsOptions: {
        addRecords: true
    },

    /**
     * @property {Number} loadCount
     * The number of times records have been loaded into the store. This includes loads via 
     * {@link #loadData} & {@link #loadRecords}.
     * @readonly
     */
    loadCount: 0,

    /**
     * `true` once the store has loaded data from the server.
     * @property {Boolean} complete
     *
     * @private
     */
    complete: false,

    /**
     * Creates the store.
     * @param {Object} [config] Config object.
     */
    constructor: function (config) {
        var me = this,
            data;

        if (config) {
            if (config.buffered) {
                //<debug>
                if (this.self !== Ext.data.Store) {
                    Ext.Error.raise('buffered config not supported on derived Store classes. '+
                                    'Please derive from Ext.data.BufferedStore.');
                }
                //</debug>

                return new Ext.data.BufferedStore(config);
            }

            //<debug>
            if (config.remoteGroup) {
                Ext.log.warn('Ext.data.Store: remoteGroup has been removed. Use remoteSort instead.');
            }
            //</debug>
        }

        /**
         * @event beforeprefetch
         * Fires before a prefetch occurs. Return `false` to cancel.
         * @param {Ext.data.Store} this
         * @param {Ext.data.operation.Operation} operation The associated operation.
         */
        /**
         * @event groupchange
         * Fired whenever the grouping in the grid changes.
         * @param {Ext.data.Store} store The store.
         * @param {Ext.util.Grouper} grouper The grouper object.
         */
        /**
         * @event prefetch
         * Fires whenever records have been prefetched.
         * @param {Ext.data.Store} this
         * @param {Ext.data.Model[]} records An array of records.
         * @param {Boolean} successful `true` if the operation was successful.
         * @param {Ext.data.operation.Operation} operation The associated operation.
         */
        /**
         * @event filterchange
         * Fired whenever the filter set changes.
         * @param {Ext.data.Store} store The store.
         * @param {Ext.util.Filter[]} filters The array of Filter objects.
         */

        me.callParent(arguments);

        // See applyData for the details.
        data = me.inlineData;
        if (data) {
            delete me.inlineData;
            me.loadInlineData(data);
        }
        me.getData().addObserver(this);

    },

    onCollectionBeginUpdate: function() {
        this.beginUpdate();
    },
    
    onCollectionEndUpdate: function() {
        this.endUpdate();
    },

    applyData: function (data, dataCollection) {
        // We bring up the Collection for records which forms the bottom of the config
        // dependency graph. The appliers for "filters" and "sorters" depend on "data"
        // and "remoteFilter" and "remoteSort" depend on both in their updaters.
        var me = this;

        // Ensure that the model class exits
        me.getFields();
        me.getModel();

        if (!dataCollection) {
            dataCollection = me.constructDataCollection();
        }

        if (data) {
            if (me.isInitializing) {
                // When data is configured on the instance of a Store we must wait for
                // all the things to initialize (sorters, filters, groupers) so that we
                // can properly process that data. All of those appliers, however, depend
                // on the dataCollection (us) to get booted up first so we must defer
                // this back to after initConfig. In previous versions this was hacked
                // at by the constructor via "config.data" but "data" can also be set on
                // the Ext.define level so best to pick it up here and store aside to be
                // finished in the constructor.
                me.inlineData = data;
            } else {
                // If we are not constructing the Store than a setData call needs to be equivalent
                // to the legacy loadData method with respect to events that fire, etc..
                me.loadData(data);
            }
        }

        return dataCollection;
    },

    loadInlineData: function(data) {
        var me = this,
            proxy = me.getProxy(),
            blocked;

        if (proxy && proxy.isMemoryProxy) {
            proxy.setData(data);
            blocked = me.unblockLoad(true); // fully unblock

            // Allow a memory proxy to trigger a load initially
            me.suspendEvents();
            me.read();
            me.resumeEvents();

            me.blockLoad(blocked);
        } else {
            // We make it silent because we don't want to fire a refresh event
            me.removeAll(true);

            // We don't want to fire addrecords event since we will be firing
            // a refresh event later which will already take care of updating
            // any views bound to this store
            me.suspendEvents();
            me.fireEvent('clear', me);
            me.loadData(data);
            me.resumeEvents();
        }
    },

    updateRemoteFilter: function (remote) {
        var data = this.getData(),
            filters = this.getFilters(); // ensure applyFilters is called

        if (remote) {
            data.setFilters(null);
        } else {
            data.setFilters(filters);
        }
        this.callParent(arguments);
    },

    updateRemoteSort: function (remote) {
        var data = this.getData(),
            sorters = this.getSorters(); // ensure applySorters is called
        
        if (remote) {
            data.setSorters(null);
        } else {
            data.setSorters(sorters);
        }
        this.callParent(arguments);
    },

    /**
     * Inserts Model instances into the Store at the given index and fires the {@link #event-add} event.
     * See also {@link #method-add}.
     *
     * @param {Number} index The start index at which to insert the passed Records.
     * @param {Ext.data.Model[]} records An Array of Ext.data.Model objects to add to the store.
     * @return {Ext.data.Model[]} records The added records
     */
    insert: function(index, records) {
        var me = this,
            len, i;
        
        if (records) {
            if (!Ext.isIterable(records)) {
                records = [records];
            } else {
                records = Ext.Array.clone(records);
            }
            len = records.length;
        }
        
        if (!len) {
            return [];
        }
        
        for (i = 0; i < len; ++i) {
            records[i] = me.createModel(records[i]);
        }
        
        me.getData().insert(index, records);
        return records;
    },
    
    onCollectionAdd: function(collection, info) {
        var me = this,
            records = info.items,
            len = records.length,
            lastChunk = !info.next,
            i, sync, record,
            removed = me.getRemovedRecords();
        
        if (me.ignoreCollectionAdd) {
            return;
        }

        for (i = 0; i < len; ++i) {
            record = records[i];
            
            record.join(me);
            if (removed && removed.length) {
                Ext.Array.remove(removed, record);
            }
            sync = sync || record.phantom || record.dirty;
        }
        
        me.fireEvent('add', me, records, info.at);
        // If there is a next property, that means there is another range that needs
        // to be removed after this. Wait until everything is gone before firign datachanged
        // since it should be a bulk operation
        if (lastChunk) {
            me.fireEvent('datachanged', me);
        }

        // Addition means a sync is needed.
        me.needsSync = me.needsSync || sync;
    },
    
    onCollectionItemChange: function(collection, info) {
        var me = this,
            record = info.item,
            modifiedFieldNames = info.modified;
        
        if (me.contains(record)) {
            me.onUpdate(record, 'edit', modifiedFieldNames);
            me.fireEvent('update', me, record, 'edit', modifiedFieldNames);
        }
    },

    afterEdit: function(record, modifiedFieldNames) {
        this.needsSync = this.needsSync || record.dirty;
        this.getData().itemChanged(record, modifiedFieldNames);
    },

    afterDrop: function(record) {
        this.getData().remove(record);
    },
    
    onCollectionFilterAdd: function(collection, items) {
        var len = items.length,
            i;
        
        for (i = 0; i < len; ++i) {
            items[i].join(this);
        }
    },

    /**
     * Adds Model instance to the Store. This method accepts either:
     *
     * - An array of Model instances or Model configuration objects.
     * - Any number of Model instance or Model configuration object arguments.
     *
     * The new Model instances will be added at the end of the existing collection.
     *
     * Sample usage:
     *
     *     myStore.add({some: 'data'}, {some: 'other data'});
     *
     * Note that if this Store is sorted, the new Model instances will be inserted
     * at the correct point in the Store to maintain the sort order.
     *
     * @param {Ext.data.Model[]/Ext.data.Model.../Object[]/Object...} model An array of Model instances
     * or Model configuration objects, or variable number of Model instance or config arguments.
     * @return {Ext.data.Model[]} The model instances that were added
     */
    add: function(arg) {
        return this.insert(this.getCount(), arguments.length === 1 ? arg : arguments);
    },

    /**
     * (Local sort only) Inserts the passed Record into the Store at the index where it
     * should go based on the current sort information.
     *
     * @param {Ext.data.Record} record
     */
    addSorted: function(record) {
        var me = this,
            remote = me.getRemoteSort(),
            data = me.getData(),
            index;
        
        if (remote) {
            data.setSorters(me.getSorters());
        }
        index = data.findInsertionIndex(record);
        if (remote) {
            data.setSorters(null);
        }
        
        return me.insert(index, record);
    },

    /**
     * Converts a literal to a model, if it's not a model already
     * @private
     * @param {Ext.data.Model/Object} record The record to create
     * @return {Ext.data.Model}
     */
    createModel: function(record) {
        if (!record.isModel) {
            var Model = this.getModel();
            record = new Model(record, this.getSession());
        }
        return record;
    },

    /**
     * Removes the specified record(s) from the Store, firing the {@link #event-remove}
     * event for the removed records.
     * 
     * After all records have been removed a single `datachanged` is fired.
     *
     * @param {Ext.data.Model/Ext.data.Model[]/Number/Number[]} records Model instance or
     * array of instances to remove or an array of indices from which to remove records.
     */
    remove: function(records, /* private */ isMove, silent) {
        var me = this,
            data = me.getData(),
            len, i, toRemove, record;
        
        if (records) {
            if (records.isModel) {
                if (me.indexOf(records) > -1) {
                    toRemove = [records];
                    len = 1;
                } else {
                    len = 0;
                }
            } else {
                toRemove = [];
                for (i = 0, len = records.length; i < len; ++i) {
                    record = records[i];

                    if (record && record.isEntity) {
                        if (!data.contains(record)) {
                            continue;
                        }
                    } else if (!(record = data.getAt(record))) { // an index
                        continue;
                    }

                    toRemove.push(record);
                }

                len = toRemove.length;
            }
        }
        
        if (!len) {
            return [];
        }
        
        me.removeIsMove = isMove === true;
        me.removeIsSilent = silent;
        data.remove(toRemove);
        me.removeIsSilent = false;
        return toRemove;
    },
    
    onCollectionRemove: function(collection, info) {
        var me = this,
            removed = me.removed,
            records = info.items,
            index = info.at,
            len = records.length,
            isMove = me.removeIsMove,
            silent = me.removeIsSilent,
            lastChunk = !info.next,
            i, record, sync, notPhantom;
        
        if (me.ignoreCollectionRemove) {
            return;
        }
        
        for (i = 0; i < len; ++i) {
            record = records[i];
            record.unjoin(me);
            notPhantom = !record.phantom;
            // don't push phantom records onto removed
            if (removed && !isMove && notPhantom) {
                // Store the index the record was removed from so that rejectChanges can re-insert at the correct place.
                // The record's index property won't do, as that is the index in the overall dataset when Store is buffered.
                record.removedFrom = index + i;
                removed.push(record);
            }
            
            sync = sync || notPhantom;
        }
        
        if (!silent) {
            me.fireEvent('remove', me, records, index, isMove);
            // If there is a next property, that means there is another range that needs
            // to be removed after this. Wait until everything is gone before firign datachanged
            // since it should be a bulk operation
            if (lastChunk) {
                me.fireEvent('datachanged', me);
            }
        }

        // Removal means a sync is needed unless it's just for a move within the store
        me.needsSync = me.needsSync || (sync && !isMove);
    },

    onFilterEndUpdate: function() {
        this.callParent(arguments);
        this.callObservers('Filter');
    },

    /**
     * Removes the model instance(s) at the given index
     * @param {Number} index The record index
     * @param {Number} [count=1] The number of records to delete
     */
    removeAt: function(index, count) {
        var data = this.getData();

        // Sanity check input.
        index = Math.max(index, 0);

        if (index < data.length) {
            if (arguments.length === 1) {
                count = 1;
            } else if (!count) {
                return;
            }

            data.removeAt(index, count);
        }
    },

    /**
     * Removes all items from the store.
     *
     * Individual record `{@link #event-remove}` events are not fired by this method.
     *
     * @param {Boolean} [silent=false] Pass `true` to prevent the `{@link #event-clear}` event from being fired.
     */
    removeAll: function(silent) {
        var me = this,
            data = me.getData(),
            hasClear = me.hasListeners.clear,
            records;

        // We want to remove and mute any events here
        if (data.length) {
            // Explicit true here, we never want to fire remove events
            me.removeIsSilent = true;
            me.callObservers('BeforeRemoveAll');
            if (hasClear) {
                records = data.getRange();
            }
            data.removeAll();
            if (!silent) {
                me.fireEvent('clear', me, records);
                me.fireEvent('datachanged', me);
            }
            me.callObservers('AfterRemoveAll', [!!silent]);
        }
    },

    /**
     * Make a set of records be current in the store. This means that unneeded records
     * will be removed and new records will be added.
     * @param {Ext.data.Model[]} records The records to be current in the store.
     * 
     * @private
     */
    setRecords: function(records) {
        var count = this.getCount();

        ++this.loadCount;
        if (count) {
            this.getData().splice(0, count, records);
        } else {
            this.add(records);
        }
    },

    /**
     * [splice description]
     * @param  {[type]} index
     * @param  {[type]} toRemove
     * @param  {[type]} toAdd
     *
     * @private
     */
    splice: function(index, toRemove, toAdd) {
        return this.getData().splice(index, toRemove, toAdd);
    },

    /**
     * Loads data into the Store via the configured {@link #proxy}. This uses the Proxy to make an
     * asynchronous call to whatever storage backend the Proxy uses, automatically adding the retrieved
     * instances into the Store and calling an optional callback if required. Example usage:
     *
     *     store.load({
     *         scope: this,
     *         callback: function(records, operation, success) {
     *             // the {@link Ext.data.operation.Operation operation} object
     *             // contains all of the details of the load operation
     *             console.log(records);
     *         }
     *     });
     *
     * If the callback scope does not need to be set, a function can simply be passed:
     *
     *     store.load(function(records, operation, success) {
     *         console.log('loaded records');
     *     });
     *
     * @param {Object/Function} [options] config object, passed into the Ext.data.operation.Operation object before loading.
     * Additionally `addRecords: true` can be specified to add these records to the existing records, default is
     * to remove the Store's existing records first.
     */
    load: function(options) {
        var me = this,
            pageSize = me.getPageSize();

        if (typeof options === 'function') {
            options = {
                callback: options
            };
        } else {
            options = Ext.apply({}, options);
        }

        // Only add grouping options if grouping is remote
        if (me.getRemoteSort() && !options.grouper && me.getGrouper()) {
            options.grouper = me.getGrouper();
        }

        if (pageSize || 'start' in options || 'limit' in options || 'page' in options) {
            options.page = options.page || me.currentPage;
            options.start = (options.start !== undefined) ? options.start : (options.page - 1) * pageSize;
            options.limit = options.limit || pageSize;
        }

        options.addRecords = options.addRecords || false;

        return me.callParent([options]);
    },

    /**
     * @private
     * Called internally when a Proxy has completed a load request
     */
    onProxyLoad: function(operation) {
        var me = this,
            resultSet = operation.getResultSet(),
            records = operation.getRecords(),
            successful = operation.wasSuccessful(),
            session, associatedEntity;

        if (me.isDestroyed) {
            return;
        }
        
        if (resultSet) {
            me.totalCount = resultSet.getTotal();
        }

        // Loading should be set to false before loading the records.
        // loadRecords doesn't expose any hooks or events until refresh
        // and datachanged, so by that time loading should be false
        me.loading = false;
        if (successful) {
            session = me.getSession();
            associatedEntity = me.getAssociatedEntity();
            if (session && associatedEntity && !associatedEntity.phantom) {
                records = me.getRole().validateAssociationRecords(session, associatedEntity, records);
            }
            me.loadRecords(records, operation.getAddRecords() ? {
                addRecords: true
            } : undefined);
        }

        if (me.hasListeners.load) {
            me.fireEvent('load', me, records, successful, operation);
        }
    },

    getNewRecords: function() {
        return this.getData().createFiltered(this.filterNew).getRange();
    },

    getUpdatedRecords: function() {
        return this.getData().createFiltered(this.filterUpdated).getRange();
    },

    /**
     * Loads an array of data straight into the Store.
     *
     * Using this method is great if the data is in the correct format already (e.g. it doesn't need to be
     * processed by a reader). If your data requires processing to decode the data structure, use a
     * {@link Ext.data.proxy.Memory MemoryProxy} or {@link #loadRawData}.
     *
     * @param {Ext.data.Model[]/Object[]} data Array of data to load. Any non-model instances will be cast
     * into model instances first.
     * @param {Boolean} [append=false] `true` to add the records to the existing records in the store, `false`
     * to remove the old ones first.
     */
    loadData: function(data, append) {
        var length = data.length,
            newData = [],
            i;

        //make sure each data element is an Ext.data.Model instance
        for (i = 0; i < length; i++) {
            newData.push(this.createModel(data[i]));
        }

        this.loadRecords(newData, append ? this.addRecordsOptions : undefined);
    },

    /**
     * Loads data via the bound Proxy's reader
     *
     * Use this method if you are attempting to load data and want to utilize the configured data reader.
     *
     * As of 4.2, this method will no longer fire the {@link #event-load} event.
     *
     * @param {Object[]} data The full JSON object you'd like to load into the Data store.
     * @param {Boolean} [append=false] `true` to add the records to the existing records in the store, `false`
     * to remove the old ones first.
     * 
     * @return {Boolean} `true` if the reader processed the records correctly. See {@link Ext.data.reader.Reader#successProperty}.
     * If the reader did not process the records, nothing will be added.
     */
    loadRawData : function(data, append) {
         var me      = this,
             session = me.getSession(),
             result  = me.getProxy().getReader().read(data, session ? {
                 recordCreator: session.recordCreator
             } : undefined),
             records = result.getRecords(),
             success = result.getSuccess();

         if (success) {
             me.totalCount = result.getTotal();
             me.loadRecords(records, append ? me.addRecordsOptions : undefined);
         }
         return success;
     },

    /**
     * Loads an array of {@link Ext.data.Model model} instances into the store, fires the datachanged event. This should only usually
     * be called internally when loading from the {@link Ext.data.proxy.Proxy Proxy}, when adding records manually use {@link #method-add} instead
     * @param {Ext.data.Model[]} records The array of records to load
     * @param {Object} options
     * @param {Boolean} [options.addRecords=false] Pass `true` to add these records to the existing records, `false` to remove the Store's existing records first.
     * @param {Number}  [options.start] Only used by buffered Stores. The index *within the overall dataset* of the first record in the array.
     */
    loadRecords: function(records, options) {
        var me     = this,
            length = records.length,
            data   = me.getData(),
            addRecords, autoSort, skipSort, i;

        if (options) {
            addRecords = options.addRecords;
        }
        
        skipSort = me.getRemoteSort() || !me.getSortOnLoad();
        if (skipSort) {
            autoSort = data.getAutoSort();
            data.setAutoSort(false);
        }

        if (!addRecords) {
            me.clearData(true);
        }

        me.ignoreCollectionAdd = true;
        me.callObservers('BeforeLoad');
        data.add(records);
        me.ignoreCollectionAdd = false;

        for (i = 0; i < length; i++) {
            records[i].join(me);
        }

        if (skipSort) {
            data.setAutoSort(autoSort);
        }
        ++me.loadCount;
        me.complete = true;
        me.fireEvent('datachanged', me);
        me.fireEvent('refresh', me);
        me.callObservers('AfterLoad');
    },

    // PAGING METHODS
    /**
     * Loads a given 'page' of data by setting the start and limit values appropriately. Internally this just causes a normal
     * load operation, passing in calculated 'start' and 'limit' params.
     * @param {Number} page The number of the page to load.
     * @param {Object} [options] See options for {@link #method-load}.
     */
    loadPage: function(page, options) {
        var me = this,
            size = me.getPageSize();

        me.currentPage = page;

        // Copy options into a new object so as not to mutate passed in objects
        options = Ext.apply({
            page: page,
            start: (page - 1) * size,
            limit: size,
            addRecords: !me.getClearOnPageLoad()
        }, options);

        me.read(options);
    },

    /**
     * Loads the next 'page' in the current data set
     * @param {Object} options See options for {@link #method-load}
     */
    nextPage: function(options) {
        this.loadPage(this.currentPage + 1, options);
    },

    /**
     * Loads the previous 'page' in the current data set
     * @param {Object} options See options for {@link #method-load}
     */
    previousPage: function(options) {
        this.loadPage(this.currentPage - 1, options);
    },

    // private
    clearData: function(isLoad) {
        var me = this,
            data = me.getData(),
            removed = me.removed,
            records,
            i, len;

        // We only have to do the unjoining if not buffered. PageMap will unjoin its records when it clears itself.
        // There is a potential for a race condition in stores configured with autoDestroy: true;
        // if loading was initiated but didn't complete by the time the store is destroyed,
        // the data MC may not have been created yet so we have to check for its existence
        // here and below.
        if (data) {
            records = data.items;
            for (i = 0, len = records.length; i < len; ++i) {
                records[i].unjoin(me);
            }
            me.ignoreCollectionRemove = true;
            me.callObservers('BeforeClear');
            data.removeAll();
            me.ignoreCollectionRemove = false;
            me.callObservers('AfterClear');
        }

        if (removed && (isLoad !== true || me.getClearRemovedOnLoad())) {
            removed.length = 0;
        }
    },

    onIdChanged: function(rec, oldId, newId){
        this.getData().updateKey(rec, oldId);
    },

    /**
     * Commits all Records with {@link #getModifiedRecords outstanding changes}. To handle updates for changes,
     * subscribe to the Store's {@link #event-update update event}, and perform updating when the third parameter is
     * Ext.data.Record.COMMIT.
     */
    commitChanges : function(){
        var me = this,
            recs = me.getModifiedRecords(),
            len = recs.length,
            removed = me.removed,
            i = 0;

        for (; i < len; i++){
            recs[i].commit();
        }

        // Since removals are cached in a simple array we can simply reset it here.
        // Adds and updates are managed in the data MixedCollection and should already be current.
        if (removed) {
            removed.length = 0;
        }
    },

    filterNewOnly: function(item){
        return item.phantom === true;
    },

    // Ideally in the future this will use getModifiedRecords, where there will be a param
    // to getNewRecords & getUpdatedRecords to indicate whether to get only the valid
    // records or grab all of them
    getRejectRecords: function() {
        // Return phantom records + updated records
        var newOnly = this.getData().createFiltered(this.filterNew).getRange();
        return Ext.Array.push(newOnly, this.getUpdatedRecords());
    },

    /**
     * {@link Ext.data.Model#reject Rejects} outstanding changes on all {@link #getModifiedRecords modified records}
     * and re-insert any records that were removed locally. Any phantom records will be removed.
     */
    rejectChanges : function() {
        var me = this,
            recs = me.getRejectRecords(),
            len = recs.length,
            i = 0,
            rec;

        for (; i < len; i++) {
            rec = recs[i];
            rec.reject();
            if (rec.phantom) {
                me.remove(rec);
            }
        }

        // Restore removed records back to their original positions
        recs = me.removed;
        if (recs) {
            len = recs.length;
            for (i = len-1; i >= 0; i--) {
                rec = recs[i];
                me.insert(rec.removedFrom || 0, rec);
                rec.reject();
            }

            // Since removals are cached in a simple array we can simply reset it here.
            // Adds and updates are managed in the data MixedCollection and should already be current.
            recs.length = 0;
        }
    },
    
    onDestroy: function() {
        var me = this,
            task = me.loadTask;
        
        me.callParent();
        me.observers = null;
        if (task) {
            task.cancel();
            me.loadTask = null;
        }
        me.getData().destroy();
        me.setData(null);
    }

    // Provides docs from the mixin
    /**
     * @method each
     * @inheritdoc Ext.data.LocalStore#each
     */

    /**
     * @method collect
     * @inheritdoc Ext.data.LocalStore#collect
     */

    /**
     * @method getById
     * @inheritdoc Ext.data.LocalStore#getById
     */

    /**
     * @method getByInternalId
     * @inheritdoc Ext.data.LocalStore#getByInternalId
     */

    /**
     * @method indexOf
     * @inheritdoc Ext.data.LocalStore#indexOf
     */

    /**
     * @method indexOfId
     * @inheritdoc Ext.data.LocalStore#indexOfId
     */

    /**
     * @method queryBy
     * @inheritdoc Ext.data.LocalStore#queryBy
     */

    /**
     * @method query
     * @inheritdoc Ext.data.LocalStore#query
     */

    /**
     * @method first
     * @inheritdoc Ext.data.LocalStore#first
     */

    /**
     * @method last
     * @inheritdoc Ext.data.LocalStore#last
     */

    /**
     * @method sum
     * @inheritdoc Ext.data.LocalStore#sum
     */

    /**
     * @method count
     * @inheritdoc Ext.data.LocalStore#count
     */

    /**
     * @method min
     * @inheritdoc Ext.data.LocalStore#min
     */

    /**
     * @method max
     * @inheritdoc Ext.data.LocalStore#max
     */

    /**
     * @method average
     * @inheritdoc Ext.data.LocalStore#average
     */

    /**
     * @method aggregate
     * @inheritdoc Ext.data.LocalStore#aggregate
     */
});
