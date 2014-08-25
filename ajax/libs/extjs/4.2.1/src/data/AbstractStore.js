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
 * @author Ed Spencer
 *
 * AbstractStore is a superclass of {@link Ext.data.Store} and {@link Ext.data.TreeStore}. It's never used directly,
 * but offers a set of methods used by both of those subclasses.
 *
 * We've left it here in the docs for reference purposes, but unless you need to make a whole new type of Store, what
 * you're probably looking for is {@link Ext.data.Store}. If you're still interested, here's a brief description of what
 * AbstractStore is and is not.
 *
 * AbstractStore provides the basic configuration for anything that can be considered a Store. It expects to be
 * given a {@link Ext.data.Model Model} that represents the type of data in the Store. It also expects to be given a
 * {@link Ext.data.proxy.Proxy Proxy} that handles the loading of data into the Store.
 *
 * AbstractStore provides a few helpful methods such as {@link #method-load} and {@link #sync}, which load and save data
 * respectively, passing the requests through the configured {@link #proxy}. Both built-in Store subclasses add extra
 * behavior to each of these functions. Note also that each AbstractStore subclass has its own way of storing data -
 * in {@link Ext.data.Store} the data is saved as a flat {@link Ext.util.MixedCollection MixedCollection}, whereas in
 * {@link Ext.data.TreeStore TreeStore} we use a {@link Ext.data.Tree} to maintain the data's hierarchy.
 *
 * The store provides filtering and sorting support. This sorting/filtering can happen on the client side
 * or can be completed on the server. This is controlled by the {@link Ext.data.Store#remoteSort remoteSort} and
 * {@link Ext.data.Store#remoteFilter remoteFilter} config options. For more information see the {@link #sort} and
 * {@link Ext.data.Store#filter filter} methods.
 */
Ext.define('Ext.data.AbstractStore', {
    requires: [
        'Ext.util.MixedCollection',
        'Ext.data.proxy.Proxy',
        'Ext.data.Operation',
        'Ext.util.Filter'
    ],

    mixins: {
        observable: 'Ext.util.Observable',
        sortable: 'Ext.util.Sortable'
    },

    statics: {
        /**
         * Creates a store from config object.
         * 
         * @param {Object/Ext.data.AbstractStore} store A config for
         * the store to be created.  It may contain a `type` field
         * which defines the particular type of store to create.
         * 
         * Alteratively passing an actual store to this method will
         * just return it, no changes made.
         * 
         * @return {Ext.data.AbstractStore} The created store.
         * @static
         */
        create: function(store) {
            if (!store.isStore) {
                if (!store.type) {
                    store.type = 'store';
                }
                store = Ext.createByAlias('store.' + store.type, store);
            }
            return store;
        }
    },

    onClassExtended: function(cls, data, hooks) {
        var model = data.model,
            onBeforeClassCreated;

        if (typeof model == 'string') {
            onBeforeClassCreated = hooks.onBeforeCreated;

            hooks.onBeforeCreated = function() {
                var me = this,
                    args = arguments;

                Ext.require(model, function() {
                    onBeforeClassCreated.apply(me, args);
                });
            };
        }
    },

    /**
     * @cfg {Boolean} remoteSort
     * True to defer any sorting operation to the server. If false, sorting is done locally on the client.
     */
    remoteSort  : false,

    /**
     * @cfg {Boolean} remoteFilter
     * True to defer any filtering operation to the server. If false, filtering is done locally on the client.
     */
    remoteFilter: false,

    /**
     * @cfg {String/Ext.data.proxy.Proxy/Object} proxy
     * The Proxy to use for this Store. This can be either a string, a config object or a Proxy instance -
     * see {@link #setProxy} for details.
     * @since 1.1.0
     */

    /**
     * @cfg {Boolean/Object} autoLoad
     * If data is not specified, and if autoLoad is true or an Object, this store's load method is automatically called
     * after creation. If the value of autoLoad is an Object, this Object will be passed to the store's load method.
     * @since 2.3.0
     */
    autoLoad: undefined,

    /**
     * @cfg {Boolean} autoSync
     * True to automatically sync the Store with its Proxy after every edit to one of its Records. Defaults to false.
     */
    autoSync: false,

    /**
     * @cfg {String} batchUpdateMode
     * Sets the updating behavior based on batch synchronization. 'operation' (the default) will update the Store's
     * internal representation of the data after each operation of the batch has completed, 'complete' will wait until
     * the entire batch has been completed before updating the Store's data. 'complete' is a good choice for local
     * storage proxies, 'operation' is better for remote proxies, where there is a comparatively high latency.
     */
    batchUpdateMode: 'operation',

    /**
     * @cfg {Boolean} filterOnLoad
     * If true, any filters attached to this Store will be run after loading data, before the datachanged event is fired.
     * Defaults to true, ignored if {@link Ext.data.Store#remoteFilter remoteFilter} is true
     */
    filterOnLoad: true,

    /**
     * @cfg {Boolean} sortOnLoad
     * If true, any sorters attached to this Store will be run after loading data, before the datachanged event is fired.
     * Defaults to true, igored if {@link Ext.data.Store#remoteSort remoteSort} is true
     */
    sortOnLoad: true,

    /**
     * @property {Boolean} implicitModel
     * True if a model was created implicitly for this Store. This happens if a fields array is passed to the Store's
     * constructor instead of a model constructor or name.
     * @private
     */
    implicitModel: false,

    /**
     * @property {String} defaultProxyType
     * The string type of the Proxy to create if none is specified. This defaults to creating a
     * {@link Ext.data.proxy.Memory memory proxy}.
     */
    defaultProxyType: 'memory',

    /**
     * @property {Boolean} isDestroyed
     * True if the Store has already been destroyed. If this is true, the reference to Store should be deleted
     * as it will not function correctly any more.
     * @since 3.4.0
     */
    isDestroyed: false,

    /**
     * @property {Boolean} isStore
     * `true` in this class to identify an object as an instantiated Store, or subclass thereof.
     */
    isStore: true,

    /**
     * @cfg {String} storeId
     * Unique identifier for this store. If present, this Store will be registered with the {@link Ext.data.StoreManager},
     * making it easy to reuse elsewhere.
     *
     * Note that when store is instatiated by Controller, the storeId will be overridden by the name of the store.
     */

    /**
     * @cfg {Object[]} fields
     * This may be used in place of specifying a {@link #model} configuration. The fields should be a
     * set of {@link Ext.data.Field} configuration objects. The store will automatically create a {@link Ext.data.Model}
     * with these fields. In general this configuration option should only be used for simple stores like
     * a two-field store of ComboBox. For anything more complicated, such as specifying a particular id property or
     * associations, a {@link Ext.data.Model} should be defined and specified for the {@link #model}
     * config.
     * @since 2.3.0
     */

    /**
     * @cfg {String} model
     * Name of the {@link Ext.data.Model Model} associated with this store.
     * The string is used as an argument for {@link Ext.ModelManager#getModel}.
     */

    /**
     * @cfg {Object[]/Function[]} filters
     * Array of {@link Ext.util.Filter Filters} for this store. Can also be passed array of
     * functions which will be used as the {@link Ext.util.Filter#filterFn filterFn} config
     * for filters:
     * 
     *     filters: [
     *         function(item) {
     *             return item.weight > 0;
     *         }
     *     ]
     *
     * To filter after the grid is loaded use the {@link Ext.data.Store#filterBy filterBy} function.
     */

    /**
     * @cfg {Boolean} [statefulFilters=false]
     * Configure as `true` to have the filters saved when a client {@link Ext.grid.Panel grid} saves its state.
     */

    sortRoot: 'data',

    //documented above
    constructor: function(config) {
        var me = this,
            filters;

        /**
         * @event add
         * Fired when a Model instance has been added to this Store.
         * @param {Ext.data.Store} store The store
         * @param {Ext.data.Model[]} records The Model instances that were added
         * @param {Number} index The index at which the instances were inserted
         * @since 1.1.0
         */

        /**
         * @event remove
         * Fired when a Model instance has been removed from this Store.
         *
         * **If many records may be removed in one go, then it is more efficient to listen for the {@link #event-bulkremove} event
         * and perform any processing for a bulk remove than to listen for this {@link #event-remove} event.**
         * @param {Ext.data.Store} store The Store object
         * @param {Ext.data.Model} record The record that was removed
         * @param {Number} index The index of the record that was removed
         * @param {Boolean} isMove `true` if the child node is being removed so it can be moved to another position in this Store.
         * @since 1.1.0
         */

        /**
         * @event bulkremove
         * Fired at the *end* of the {@link Ext.data.Store#method-remove remove} method when all records in the passed array have been removed.
         *
         * If many records may be removed in one go, then it is more efficient to listen for this event
         * and perform any processing for a bulk remove than to listen for many {@link #event-remove} events.
         * @param {Ext.data.Store} store The Store object
         * @param {Ext.data.Model[]} records The array of records that were removed (In the order they appear in the Store)
         * @param {Number[]} indexes The indexes of the records that were removed
         * @param {Boolean} isMove `true` if the child nodes are being removed so they can be moved to another position in this Store.
         */

        /**
         * @event update
         * Fires when a Model instance has been updated.
         * @param {Ext.data.Store} this
         * @param {Ext.data.Model} record The Model instance that was updated
         * @param {String} operation The update operation being performed. Value may be one of:
         *
         *     Ext.data.Model.EDIT
         *     Ext.data.Model.REJECT
         *     Ext.data.Model.COMMIT
         * @param {String[]} modifiedFieldNames Array of field names changed during edit.
         * @since 1.1.0
         */

        /**
         * @event datachanged
         * Fires whenever the records in the Store have changed in some way - this could include adding or removing
         * records, or updating the data in existing records
         * @param {Ext.data.Store} this The data store
         * @since 1.1.0
         */
        
        /**
         * @event refresh
         * Fires when the data cache has changed in a bulk manner (e.g., it has been sorted, filtered, etc.) and a
         * widget that is using this Store as a Record cache should refresh its view.
         * @param {Ext.data.Store} this The data store
         */

        /**
         * @event beforeload
         * Fires before a request is made for a new data object. If the beforeload handler returns false the load
         * action will be canceled.
         * @param {Ext.data.Store} store This Store
         * @param {Ext.data.Operation} operation The Ext.data.Operation object that will be passed to the Proxy to
         * load the Store
         * @since 1.1.0
         */

        /**
         * @event load
         * Fires whenever the store reads data from a remote data source.
         * @param {Ext.data.Store} this
         * @param {Ext.data.Model[]} records An array of records
         * @param {Boolean} successful True if the operation was successful.
         * @since 1.1.0
         */

        /**
         * @event write
         * Fires whenever a successful write has been made via the configured {@link #proxy Proxy}
         * @param {Ext.data.Store} store This Store
         * @param {Ext.data.Operation} operation The {@link Ext.data.Operation Operation} object that was used in
         * the write
         * @since 3.4.0
         */

        /**
         * @event beforesync
         * Fired before a call to {@link #sync} is executed. Return false from any listener to cancel the sync
         * @param {Object} options Hash of all records to be synchronized, broken down into create, update and destroy
         */
        /**
         * @event clear
         * Fired after the {@link #removeAll} method is called.
         * @param {Ext.data.Store} this
         * @since 1.1.0
         */
        /**
         * @event metachange
         * Fires when this store's underlying reader (available via the proxy) provides new metadata.
         * Metadata usually consists of new field definitions, but can include any configuration data
         * required by an application, and can be processed as needed in the event handler.
         * This event is currently only fired for JsonReaders.
         * @param {Ext.data.Store} this
         * @param {Object} meta The JSON metadata
         * @since 1.1.0
         */

        Ext.apply(me, config);
        // don't use *config* anymore from here on... use *me* instead...

        /**
         * Temporary cache in which removed model instances are kept until successfully synchronised with a Proxy,
         * at which point this is cleared.
         * @protected
         * @property {Ext.data.Model[]} removed
         */
        me.removed = [];

        me.mixins.observable.constructor.apply(me, arguments);

        // <debug>
        var configModel = me.model;
        // </debug>

        me.model = Ext.ModelManager.getModel(me.model);

        /**
         * @property {Object} modelDefaults
         * @private
         * A set of default values to be applied to every model instance added via {@link Ext.data.Store#insert insert} or created
         * via {@link Ext.data.Store#createModel createModel}. This is used internally by associations to set foreign keys and
         * other fields. See the Association classes source code for examples. This should not need to be used by application developers.
         */
        Ext.applyIf(me, {
            modelDefaults: null
        });

        //Supports the 3.x style of simply passing an array of fields to the store, implicitly creating a model
        if (!me.model && me.fields) {
            me.model = Ext.define('Ext.data.Store.ImplicitModel-' + (me.storeId || Ext.id()), {
                extend: 'Ext.data.Model',
                fields: me.fields,
                proxy: me.proxy || me.defaultProxyType
            });

            delete me.fields;

            me.implicitModel = true;
        }

        // <debug>
        if (!me.model && me.useModelWarning !== false) {
            // There are a number of ways things could have gone wrong, try to give as much information as possible
            var logMsg = [
                Ext.getClassName(me) || 'Store',
                ' created with no model.'
            ];

            if (typeof configModel === 'string') {
                logMsg.push(" The name '", configModel, "'", ' does not correspond to a valid model.');
            }

            Ext.log.warn(logMsg.join(''));
        }
        // </debug>

        //ensures that the Proxy is instantiated correctly
        me.setProxy(me.proxy || me.model.getProxy());

        if (!me.disableMetaChangeEvent) {
            me.proxy.on('metachange', me.onMetaChange, me);
        }

        if (me.id && !me.storeId) {
            me.storeId = me.id;
            delete me.id;
        }

        if (me.storeId) {
            Ext.data.StoreManager.register(me);
        }

        me.mixins.sortable.initSortable.call(me);

        /**
         * @property {Ext.util.MixedCollection} filters
         * The collection of {@link Ext.util.Filter Filters} currently applied to this Store
         */
        filters = me.decodeFilters(me.filters);
        me.filters = new Ext.util.MixedCollection();
        me.filters.addAll(filters);
    },

    /**
     * Sets the Store's Proxy by string, config object or Proxy instance
     * @param {String/Object/Ext.data.proxy.Proxy} proxy The new Proxy, which can be either a type string, a configuration object
     * or an Ext.data.proxy.Proxy instance
     * @return {Ext.data.proxy.Proxy} The attached Proxy object
     */
    setProxy: function(proxy) {
        var me = this;

        if (proxy instanceof Ext.data.proxy.Proxy) {
            proxy.setModel(me.model);
        } else {
            if (Ext.isString(proxy)) {
                proxy = {
                    type: proxy
                };
            }
            Ext.applyIf(proxy, {
                model: me.model
            });

            proxy = Ext.createByAlias('proxy.' + proxy.type, proxy);
        }

        me.proxy = proxy;

        return me.proxy;
    },

    /**
     * Returns the proxy currently attached to this proxy instance
     * @return {Ext.data.proxy.Proxy} The Proxy instance
     */
    getProxy: function() {
        return this.proxy;
    },

    // private
    onMetaChange: function(proxy, meta) {
        this.fireEvent('metachange', this, meta);
    },

    //saves any phantom records
    create: function(data, options) {
        var me = this,
            instance = Ext.ModelManager.create(Ext.applyIf(data, me.modelDefaults), me.model.modelName),
            operation;

        options = options || {};

        Ext.applyIf(options, {
            action : 'create',
            records: [instance]
        });

        operation = new Ext.data.Operation(options);

        me.proxy.create(operation, me.onProxyWrite, me);

        return instance;
    },

    read: function() {
        return this.load.apply(this, arguments);
    },

    update: function(options) {
        var me = this,
            operation;
        options = options || {};

        Ext.applyIf(options, {
            action : 'update',
            records: me.getUpdatedRecords()
        });

        operation = new Ext.data.Operation(options);

        return me.proxy.update(operation, me.onProxyWrite, me);
    },

    /**
     * @private
     * Callback for any write Operation over the Proxy. Updates the Store's MixedCollection to reflect
     * the updates provided by the Proxy
     */
    onProxyWrite: function(operation) {
        var me = this,
            success = operation.wasSuccessful(),
            records = operation.getRecords();

        switch (operation.action) {
            case 'create':
                me.onCreateRecords(records, operation, success);
                break;
            case 'update':
                me.onUpdateRecords(records, operation, success);
                break;
            case 'destroy':
                me.onDestroyRecords(records, operation, success);
                break;
        }

        if (success) {
            me.fireEvent('write', me, operation);
            me.fireEvent('datachanged', me);
            me.fireEvent('refresh', me);
        }
        //this is a callback that would have been passed to the 'create', 'update' or 'destroy' function and is optional
        Ext.callback(operation.callback, operation.scope || me, [records, operation, success]);
    },
    
    // may be implemented by store subclasses
    onCreateRecords: Ext.emptyFn,
    
    // may be implemented by store subclasses
    onUpdateRecords: Ext.emptyFn,
    
    /**
     * Removes any records when a write is returned from the server.
     * @private
     * @param {Ext.data.Model[]} records The array of removed records
     * @param {Ext.data.Operation} operation The operation that just completed
     * @param {Boolean} success True if the operation was successful
     */
    onDestroyRecords: function(records, operation, success) {
        if (success) {
            this.removed = [];
        }
    },

    // tells the attached proxy to destroy the given records
    // @since 3.4.0
    destroy: function(options) {
        var me = this,
            operation;

        options = options || {};

        Ext.applyIf(options, {
            action : 'destroy',
            records: me.getRemovedRecords()
        });

        operation = new Ext.data.Operation(options);

        return me.proxy.destroy(operation, me.onProxyWrite, me);
    },

    /**
     * @private
     * Attached as the 'operationcomplete' event listener to a proxy's Batch object. By default just calls through
     * to onProxyWrite.
     */
    onBatchOperationComplete: function(batch, operation) {
        return this.onProxyWrite(operation);
    },

    /**
     * @private
     * Attached as the 'complete' event listener to a proxy's Batch object. Iterates over the batch operations
     * and updates the Store's internal data MixedCollection.
     */
    onBatchComplete: function(batch, operation) {
        var me = this,
            operations = batch.operations,
            length = operations.length,
            i;

        me.suspendEvents();

        for (i = 0; i < length; i++) {
            me.onProxyWrite(operations[i]);
        }

        me.resumeEvents();

        me.fireEvent('datachanged', me);
        me.fireEvent('refresh', me);
    },

    /**
     * @private
     */
    onBatchException: function(batch, operation) {
        // //decide what to do... could continue with the next operation
        // batch.start();
        //
        // //or retry the last operation
        // batch.retry();
    },

    /**
     * @private
     * Filter function for new records.
     */
    filterNew: function(item) {
        // only want phantom records that are valid
        return item.phantom === true && item.isValid();
    },

    /**
     * Returns all Model instances that are either currently a phantom (e.g. have no id), or have an ID but have not
     * yet been saved on this Store (this happens when adding a non-phantom record from another Store into this one)
     * @return {Ext.data.Model[]} The Model instances
     */
    getNewRecords: function() {
        return [];
    },

    /**
     * Returns all Model instances that have been updated in the Store but not yet synchronized with the Proxy
     * @return {Ext.data.Model[]} The updated Model instances
     */
    getUpdatedRecords: function() {
        return [];
    },

    /**
     * Gets all {@link Ext.data.Model records} added or updated since the last commit. Note that the order of records
     * returned is not deterministic and does not indicate the order in which records were modified. Note also that
     * removed records are not included (use {@link #getRemovedRecords} for that).
     * @return {Ext.data.Model[]} The added and updated Model instances
     */
    getModifiedRecords : function(){
        return [].concat(this.getNewRecords(), this.getUpdatedRecords());
    },
    
    /**
     * @private
     * Filter function for updated records.
     */
    filterUpdated: function(item) {
        // only want dirty records, not phantoms that are valid
        return item.dirty === true && item.phantom !== true && item.isValid();
    },

    /**
     * Returns any records that have been removed from the store but not yet destroyed on the proxy.
     * @return {Ext.data.Model[]} The removed Model instances
     */
    getRemovedRecords: function() {
        return this.removed;
    },

    filter: function(filters, value) {

    },

    /**
     * @private
     * Normalizes an array of filter objects, ensuring that they are all Ext.util.Filter instances
     * @param {Object[]} filters The filters array
     * @return {Ext.util.Filter[]} Array of Ext.util.Filter objects
     */
    decodeFilters: function(filters) {
        if (!Ext.isArray(filters)) {
            if (filters === undefined) {
                filters = [];
            } else {
                filters = [filters];
            }
        }

        var length = filters.length,
            Filter = Ext.util.Filter,
            config, i;

        for (i = 0; i < length; i++) {
            config = filters[i];

            if (!(config instanceof Filter)) {
                Ext.apply(config, {
                    root: 'data'
                });

                //support for 3.x style filters where a function can be defined as 'fn'
                if (config.fn) {
                    config.filterFn = config.fn;
                }

                //support a function to be passed as a filter definition
                if (typeof config == 'function') {
                    config = {
                        filterFn: config
                    };
                }

                filters[i] = new Filter(config);
            }
        }

        return filters;
    },

    clearFilter: function(supressEvent) {

    },

    isFiltered: function() {

    },

    filterBy: function(fn, scope) {

    },

    /**
     * Synchronizes the store with its {@link #proxy}. This asks the proxy to batch together any new, updated
     * and deleted records in the store, updating the store's internal representation of the records
     * as each operation completes.
     * 
     * @param {Object} [options] Object containing one or more properties supported by the sync method (these get 
     * passed along to the underlying proxy's {@link Ext.data.Proxy#batch batch} method):
     * 
     * @param {Ext.data.Batch/Object} [options.batch] A {@link Ext.data.Batch} object (or batch config to apply 
     * to the created batch). If unspecified a default batch will be auto-created as needed.
     * 
     * @param {Function} [options.callback] The function to be called upon completion of the sync.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Ext.data.Batch} options.callback.batch The {@link Ext.data.Batch batch} that was processed,
     * containing all operations in their current state after processing
     * @param {Object} options.callback.options The options argument that was originally passed into sync
     * 
     * @param {Function} [options.success] The function to be called upon successful completion of the sync. The 
     * success function is called only if no exceptions were reported in any operations. If one or more exceptions
     * occurred then the failure function will be called instead. The success function is called 
     * with the following parameters:
     * @param {Ext.data.Batch} options.success.batch The {@link Ext.data.Batch batch} that was processed,
     * containing all operations in their current state after processing
     * @param {Object} options.success.options The options argument that was originally passed into sync
     * 
     * @param {Function} [options.failure] The function to be called upon unsuccessful completion of the sync. The 
     * failure function is called when one or more operations returns an exception during processing (even if some
     * operations were also successful). In this case you can check the batch's {@link Ext.data.Batch#exceptions 
     * exceptions} array to see exactly which operations had exceptions. The failure function is called with the 
     * following parameters:
     * @param {Ext.data.Batch} options.failure.batch The {@link Ext.data.Batch} that was processed, containing all
     * operations in their current state after processing
     * @param {Object} options.failure.options The options argument that was originally passed into sync
     * 
     * @param {Object} [options.scope] The scope in which to execute any callbacks (i.e. the `this` object inside
     * the callback, success and/or failure functions). Defaults to the store's proxy.
     * 
     * @return {Ext.data.Store} this
     */
    sync: function(options) {
        var me = this,
            operations = {},
            toCreate = me.getNewRecords(),
            toUpdate = me.getUpdatedRecords(),
            toDestroy = me.getRemovedRecords(),
            needsSync = false;

        if (toCreate.length > 0) {
            operations.create = toCreate;
            needsSync = true;
        }

        if (toUpdate.length > 0) {
            operations.update = toUpdate;
            needsSync = true;
        }

        if (toDestroy.length > 0) {
            operations.destroy = toDestroy;
            needsSync = true;
        }

        if (needsSync && me.fireEvent('beforesync', operations) !== false) {
            options = options || {};

            me.proxy.batch(Ext.apply(options, {
                operations: operations,
                listeners: me.getBatchListeners()
            }));
        }
        
        return me;
    },
    
    /**
     * @private
     * Returns an object which is passed in as the listeners argument to proxy.batch inside this.sync.
     * This is broken out into a separate function to allow for customisation of the listeners
     * @return {Object} The listeners object
     */
    getBatchListeners: function() {
        var me = this,
            listeners = {
                scope: me,
                exception: me.onBatchException
            };

        if (me.batchUpdateMode == 'operation') {
            listeners.operationcomplete = me.onBatchOperationComplete;
        } else {
            listeners.complete = me.onBatchComplete;
        }

        return listeners;
    },

    /**
     * Saves all pending changes via the configured {@link #proxy}. Use {@link #sync} instead.
     * @deprecated 4.0.0 Will be removed in the next major version
     */
    save: function() {
        return this.sync.apply(this, arguments);
    },

    /**
     * Loads the Store using its configured {@link #proxy}.
     * @param {Object} options (optional) config object. This is passed into the {@link Ext.data.Operation Operation}
     * object that is created and then sent to the proxy's {@link Ext.data.proxy.Proxy#read} function
     * 
     * @return {Ext.data.Store} this
     * @since 1.1.0
     */
    load: function(options) {
        var me = this,
            operation;

        options = Ext.apply({
            action: 'read',
            filters: me.filters.items,
            sorters: me.getSorters()
        }, options);
        me.lastOptions = options;

        operation = new Ext.data.Operation(options);

        if (me.fireEvent('beforeload', me, operation) !== false) {
            me.loading = true;
            me.proxy.read(operation, me.onProxyLoad, me);
        }

        return me;
    },

    /**
     * Reloads the store using the last options passed to the {@link #method-load} method.
     * @param {Object} options A config object which contains options which may override the options passed to the previous load call.
     */
    reload: function(options) {
        return this.load(Ext.apply(this.lastOptions, options));
    },

    /**
     * @private
     * A model instance should call this method on the Store it has been {@link Ext.data.Model#join joined} to.
     * @param {Ext.data.Model} record The model instance that was edited
     * @param {String[]} modifiedFieldNames Array of field names changed during edit.
     * @since 3.4.0
     */
    afterEdit : function(record, modifiedFieldNames) {
        var me = this,
            i, shouldSync;

        if (me.autoSync && !me.autoSyncSuspended) {
            for (i = modifiedFieldNames.length; i--;) {
                // only sync if persistent fields were modified
                if (record.fields.get(modifiedFieldNames[i]).persist) {
                    shouldSync = true;
                    break;
                }
            }
            if (shouldSync) {
                me.sync();
            }
        }
        me.onUpdate(record, Ext.data.Model.EDIT, modifiedFieldNames);
        me.fireEvent('update', me, record, Ext.data.Model.EDIT, modifiedFieldNames);
    },

    /**
     * @private
     * A model instance should call this method on the Store it has been {@link Ext.data.Model#join joined} to..
     * @param {Ext.data.Model} record The model instance that was edited
     * @since 3.4.0
     */
    afterReject : function(record) {
        // Must pass the 5th param (modifiedFieldNames) as null, otherwise the
        // event firing machinery appends the listeners "options" object to the arg list
        // which may get used as the modified fields array by a handler.
        // This array is used for selective grid cell updating by Grid View.
        // Null will be treated as though all cells need updating.
        this.onUpdate(record, Ext.data.Model.REJECT, null);
        this.fireEvent('update', this, record, Ext.data.Model.REJECT, null);
    },

    /**
     * @private
     * A model instance should call this method on the Store it has been {@link Ext.data.Model#join joined} to.
     * @param {Ext.data.Model} record The model instance that was edited
     * @since 3.4.0
     */
    afterCommit : function(record, modifiedFieldNames) {
        if (!modifiedFieldNames) {
            modifiedFieldNames = null;
        }
        this.onUpdate(record, Ext.data.Model.COMMIT, modifiedFieldNames);
        this.fireEvent('update', this, record, Ext.data.Model.COMMIT, modifiedFieldNames);
    },

    onUpdate: Ext.emptyFn,

    onIdChanged: function(model, oldId, newId, oldInternalId){
        this.fireEvent('idchanged', this, model, oldId, newId, oldInternalId);
    },

    // private
    destroyStore: function() {
        var implicitModelName,
            me = this;

        if (!me.isDestroyed) {
            me.clearListeners();
            if (me.storeId) {
                Ext.data.StoreManager.unregister(me);
            }
            me.clearData();
            me.data = me.tree = me.sorters = me.filters = me.groupers = null;
            if (me.reader) {
                me.reader.destroyReader();
            }
            me.proxy = me.reader = me.writer = null;
            me.isDestroyed = true;

            if (me.implicitModel) {
                implicitModelName = Ext.getClassName(me.model);
                Ext.undefine(implicitModelName);
                Ext.ModelManager.unregisterType(implicitModelName);
            } else {
                me.model = null;
            }
        }
    },
    
    /**
     * @private
     * Returns the grouping, sorting and filtered state of this Store.
     */
    getState: function() {
        var me = this,
            hasState,
            result,
            hasGroupers = !!me.groupers,
            groupers = [],
            sorters = [],
            filters = [];

        if (hasGroupers) {
            me.groupers.each(function(g) {
                groupers[groupers.length] = g.serialize();
                hasState = true;
            });
        }

        if (me.sorters) {
            // Create sorters config array.
            me.sorters.each(function(s) {
                // Sorters collection gets groupers prepended to it, so do not duplicate
                if (hasGroupers && !me.groupers.contains(s)) {
                    sorters[sorters.length] = s.serialize();
                    hasState = true;
                }
            });
        }

        // Because we do not provide a filter changing mechanism, only statify the filters if they opt in.
        // Otherwise filters would get "stuck".
        if (me.filters && me.statefulFilters) {
            me.filters.each(function(f) {
                filters[filters.length] = f.serialize();
                hasState = true;
            });
        }

        // If there is any state to save, return it as an object
        if (hasState) {
            result = {};
            if (groupers.length) {
                result.groupers = groupers;
            }
            if (sorters.length) {
                result.sorters = sorters;
            }
            if (filters.length) {
                result.filters = filters;
            }
            return result;
        }
    },

    /**
     * @private
     * Restores state to the passed state
     */
    applyState: function(state) {
        var me = this,
            hasSorters = !!me.sorters,
            hasGroupers = !!me.groupers,
            hasFilters = !!me.filters,
            locallySorted;

        if (hasGroupers && state.groupers) {
            me.groupers.clear();
            me.groupers.addAll(me.decodeGroupers(state.groupers));
        }

        if (hasSorters && state.sorters) {
            me.sorters.clear();
            me.sorters.addAll(me.decodeSorters(state.sorters));
        }

        if (hasFilters && state.filters) {
            me.filters.clear();
            me.filters.addAll(me.decodeFilters(state.filters));
        }

        if (hasSorters && hasGroupers) {
            // Sorters collection gets groupers prepended to it
            me.sorters.insert(0, me.groupers.getRange());
        }

        // Data manipulated by the server - reload 
        if (me.autoLoad && (me.remoteSort || me.remoteGroup || me.remoteFilter)) {
            if (me.autoLoad === true) {
                me.reload();
            } else {
                me.reload(me.autoLoad);
            }
        }

        // If we have local filters, filter the data
        if (hasFilters && me.filters.length && !me.remoteFilter) {
            me.filter();
            locallySorted = me.sortOnFilter;
        }

        // If we have local sorters, and the data is not already sorted by a sortOnFilter operation, then sort.
        if (hasSorters && me.sorters.length && !me.remoteSort && !locallySorted) {
            me.sort();
        }
    },

    // private
    doSort: function(sorterFn) {
        var me = this;
        if (me.remoteSort) {
            //the load function will pick up the new sorters and request the sorted data from the proxy
            me.load();
        } else {
            me.data.sortBy(sorterFn);
            me.fireEvent('datachanged', me);
            me.fireEvent('refresh', me);
        }
        me.fireEvent('sort', me, me.sorters.getRange());
    },

    // to be implemented by subclasses
    clearData: Ext.emptyFn,
    
    // to be implemented by subclasses
    getCount: Ext.emptyFn,

    // to be implemented by subclasses
    getById: Ext.emptyFn,

    /**
     * Removes all records from the store. This method does a "fast remove",
     * individual remove events are not called. The {@link #clear} event is
     * fired upon completion.
     * @method
     * @since 1.1.0
     */
    removeAll: Ext.emptyFn,
    // individual store subclasses should implement a "fast" remove
    // and fire a clear event afterwards

    /**
     * Returns true if the Store is currently performing a load operation
     * @return {Boolean} True if the Store is currently loading
     */
    isLoading: function() {
        return !!this.loading;
    },

    /**
     * Suspends automatically syncing the Store with its Proxy.  Only applicable if {@link #autoSync} is `true`
     */
    suspendAutoSync: function() {
        this.autoSyncSuspended = true;
    },

    /**
     * Resumes automatically syncing the Store with its Proxy.  Only applicable if {@link #autoSync} is `true`
     */
    resumeAutoSync: function() {
        this.autoSyncSuspended = false;
    }

});
