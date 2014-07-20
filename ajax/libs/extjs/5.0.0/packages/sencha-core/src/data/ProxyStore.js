/**
 * ProxyStore is a superclass of {@link Ext.data.Store} and {@link Ext.data.BufferedStore}. It's never used directly,
 * but offers a set of methods used by both of those subclasses.
 *
 * We've left it here in the docs for reference purposes, but unless you need to make a whole new type of Store, what
 * you're probably looking for is {@link Ext.data.Store}. If you're still interested, here's a brief description of what
 * ProxyStore is and is not.
 *
 * ProxyStore provides the basic configuration for anything that can be considered a Store. It expects to be
 * given a {@link Ext.data.Model Model} that represents the type of data in the Store. It also expects to be given a
 * {@link Ext.data.proxy.Proxy Proxy} that handles the loading of data into the Store.
 *
 * ProxyStore provides a few helpful methods such as {@link #method-load} and {@link #sync}, which load and save data
 * respectively, passing the requests through the configured {@link #proxy}.
 *
 * Built-in Store subclasses add extra behavior to each of these functions. Note also that each ProxyStore subclass
 * has its own way of storing data - in {@link Ext.data.Store} the data is saved as a flat {@link Ext.util.Collection Collection},
 * whereas in {@link Ext.data.BufferedStore BufferedStore} we use a {@link Ext.data.PageMap} to maintain a client side cache of pages of records.
 *
 * The store provides filtering and sorting support. This sorting/filtering can happen on the client side
 * or can be completed on the server. This is controlled by the {@link Ext.data.Store#remoteSort remoteSort} and
 * {@link Ext.data.Store#remoteFilter remoteFilter} config options. For more information see the {@link #sort} and
 * {@link Ext.data.Store#filter filter} methods.
 */
Ext.define('Ext.data.ProxyStore', {
    extend: 'Ext.data.AbstractStore',

    requires: [
        'Ext.data.proxy.Proxy',
        'Ext.data.proxy.Memory',
        'Ext.data.operation.*'
    ],

    config: {
        /**
         * @cfg {String/Ext.data.Model} model
         * Name of the {@link Ext.data.Model Model} associated with this store. See
         * {@link Ext.data.Model#entityName}.
         *
         * May also be the actual Model subclass.
         *
         * This config is required for the store to be able to read data unless you have defined
         * the {@link #fields} config which will create an anonymous `Ext.data.Model`.
         */
        model: undefined,
        
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
        fields: null,
        
        /**
         * @cfg {String/Ext.data.proxy.Proxy/Object} proxy
         * The Proxy to use for this Store. This can be either a string, a config object or a Proxy instance -
         * see {@link #setProxy} for details.
         * @since 1.1.0
         */
        proxy: undefined,

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
         * @cfg {Boolean} sortOnLoad
         * If true, any sorters attached to this Store will be run after loading data, before the datachanged event is fired.
         * Defaults to true, ignored if {@link Ext.data.Store#remoteSort remoteSort} is true
         */
        sortOnLoad: true,

        /**
         * @cfg {Boolean} [trackRemoved=true]
         * This config controls whether removed records are remembered by this store for
         * later saving to the server.
         */
        trackRemoved: true,
        
        /**
         * @cfg {Ext.data.Session} session
         * The session this store interacts with
         * @private
         */
        session: undefined
    },

    onClassExtended: function(cls, data, hooks) {
        var model = data.model,
            onBeforeClassCreated;

        if (typeof model === 'string') {
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
     * @property {Boolean} implicitModel
     * True if a model was created implicitly for this Store. This happens if a fields array is passed to the Store's
     * constructor instead of a model constructor or name.
     * @private
     */
    implicitModel: false,
    
    blockLoadCounter: 0,

    /**
     * @property {Object} lastOptions
     * Property to hold the last options from a {@link #method-load} method call. This object is used for the {@link #method-reload}
     * to reuse the same options. Please see {@link #method-reload} for a simple example on how to use the lastOptions property.
     */

    /**
     * @property {Number} autoSyncSuspended
     * A counter to track suspensions.
     * @private
     */
    autoSyncSuspended: 0,

    //documented above
    constructor: function(config) {
        var me = this;

        // <debug>
        var configModel = me.model;
        // </debug>

        /**
         * @event beforeload
         * Fires before a request is made for a new data object. If the beforeload handler returns false the load
         * action will be canceled.
         * @param {Ext.data.Store} store This Store
         * @param {Ext.data.operation.Operation} operation The Ext.data.operation.Operation object that will be passed to the Proxy to
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
         * @param {Ext.data.operation.Operation} operation The {@link Ext.data.operation.Operation Operation} object that was used in
         * the write
         * @since 3.4.0
         */

        /**
         * @event beforesync
         * Fired before a call to {@link #sync} is executed. Return false from any listener to cancel the sync
         * @param {Object} options Hash of all records to be synchronized, broken down into create, update and destroy
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


        /**
         * Temporary cache in which removed model instances are kept until successfully
         * synchronised with a Proxy, at which point this is cleared.
         *
         * This cache is maintained unless you set `trackRemoved` to `false`.
         *
         * @protected
         * @property {Ext.data.Model[]} removed
         */
        me.removed = [];

        me.blockLoad();
        me.callParent(arguments);
        me.unblockLoad();

        // <debug>
        if (!me.getModel() && me.useModelWarning !== false && me.getStoreId() !== 'ext-empty-store') {
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
    },

    updateAutoLoad: function(autoLoad) {
        var me = this,
            task;

        // Ensure the data collection is set up
        me.getData();
        if (autoLoad) {
            task = me.loadTask || (me.loadTask = new Ext.util.DelayedTask());

            // Defer the load until the store (and probably the view) is fully constructed
            task.delay(1, me.attemptLoad, me, Ext.isObject(autoLoad) ? [autoLoad] : undefined);
        }
    },

    /**
     * Returns the total number of {@link Ext.data.Model Model} instances that the {@link Ext.data.proxy.Proxy Proxy}
     * indicates exist. This will usually differ from {@link #getCount} when using paging - getCount returns the
     * number of records loaded into the Store at the moment, getTotalCount returns the number of records that
     * could be loaded into the Store if the Store contained all data
     * @return {Number} The total number of Model instances available via the Proxy. 0 returned if
     * no value has been set via the reader.
     */
    getTotalCount: function() {
        return this.totalCount || 0;
    },

    applyFields: function(fields) {
        var me = this,
            model,
            proxy;

        // Create implicit, anonymous model from fields IF there are fields.
        if (fields) {
            me.implicitModel = true;
            me.setModel(model = Ext.define(null, {
                extend: 'Ext.data.Model',
                fields: fields,
                proxy: (proxy = me.getProxy())
            }));

            // getProxy can call getModel, and we are in the process of creating the model here, so poke it in.
            if (proxy && !proxy.getModel()) {
                proxy.setModel(model);
            }
        }
    },

    applyModel: function(model) {
        if (model) {
            model = Ext.data.schema.Schema.lookupEntity(model);
        }
        // If no model, ensure that the fields config is converted to a model.
        else {
            this.getFields();
            return this.getModel();
        }
        return model;
    },

    applyProxy: function(proxy) {
        var me = this,
            model = me.getModel();

        if (proxy) {
            if (proxy.isProxy) {
                proxy.setModel(model);
            } else {
                if (Ext.isString(proxy)) {
                    proxy = {
                        type: proxy,
                        model: model
                    };
                } else if (!proxy.model) {
                    proxy = Ext.apply({
                        model: model
                    }, proxy);
                }

                proxy = Ext.createByAlias('proxy.' + proxy.type, proxy);
            }
        } else if (model) {
            proxy = model.getProxy();
        }
        
        if (!proxy) {
            proxy = Ext.createByAlias('proxy.memory');
        }
        
        if (!me.disableMetaChangeEvent) {
             proxy.on('metachange', me.onMetaChange, me); 
        }

        return proxy;
    },

    updateTrackRemoved: function (track) {
        this.removed = track ? [] : null;
    },

    // private
    onMetaChange: function(proxy, meta) {
        this.fireEvent('metachange', this, meta);
    },

    //saves any phantom records
    create: function(data, options) {
        var me = this,
            instance = new me.model(data),
            proxy = me.getProxy(),
            operation;

        options = Ext.apply({}, options);
        if (!options.records) {
            options.records = [instance];
        }
        options.internalScope = me;
        options.internalCallback = me.onProxyWrite;

        operation = proxy.createOperation('create', options);
        return operation.execute();
    },

    read: function() {
        return this.load.apply(this, arguments);
    },

    update: function(options) {
        var me = this,
            proxy = me.getProxy(),
            operation;
            
        options = Ext.apply({}, options);
        if (!options.records) {
            options.records = me.getUpdatedRecords();
        }
        options.internalScope = me;
        options.internalCallback = me.onProxyWrite;

        operation = proxy.createOperation('update', options);
        return operation.execute();
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

        switch (operation.getAction()) {
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
    },
    
    // may be implemented by store subclasses
    onCreateRecords: Ext.emptyFn,
    
    // may be implemented by store subclasses
    onUpdateRecords: Ext.emptyFn,
    
    /**
     * Removes any records when a write is returned from the server.
     * @private
     * @param {Ext.data.Model[]} records The array of removed records
     * @param {Ext.data.operation.Operation} operation The operation that just completed
     * @param {Boolean} success True if the operation was successful
     */
    onDestroyRecords: function(records, operation, success) {
        if (success) {
            this.removed.length = 0;
        }
    },

    // tells the attached proxy to destroy the given records
    // @since 3.4.0
    erase: function(options) {
        var me = this,
            proxy = me.getProxy(),
            operation;

        options = Ext.apply({}, options);
        if (!options.records) {
            options.records = me.getRemovedRecords();
        }
        options.internalScope = me;
        options.internalCallback = me.onProxyWrite;

        operation = proxy.createOperation('destroy', options);
        return operation.execute();
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

        if (me.batchUpdateMode != 'operation') {
            me.suspendEvents();

            for (i = 0; i < length; i++) {
                me.onProxyWrite(operations[i]);
            }

            me.resumeEvents();
        }

        me.isSyncing = false;
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
     * Returns all valid, non-phantom Model instances that have been updated in the Store but not yet synchronized with the Proxy.
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
     * @param {Object} [options.params] Additional params to send during the sync Operation(s).
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

        //<debug>
        if (me.isSyncing) {
            Ext.Error.warn('Sync called while a sync operation is in progress. Consider configuring autoSync as false.');
        }
        //</debug>

        me.needsSync = false;

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
            me.isSyncing = true;

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
                exception: me.onBatchException,
                complete: me.onBatchComplete
            };

        if (me.batchUpdateMode == 'operation') {
            listeners.operationcomplete = me.onBatchOperationComplete;
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
     * @private
     * @param {Boolean} value
     */
    blockLoad: function (value) {
        if (value !== undefined) {
            this.blockLoadCounter = value;
        } else {
            ++this.blockLoadCounter;
        }
    },

    /**
     * @private
     * @param {Boolean} full
     */
    unblockLoad: function (full) {
        var me = this,
            ret = me.blockLoadCounter;

        if (full) {
            me.blockLoadCounter = 0;
        } else if (ret) {
            --me.blockLoadCounter;
        }

        return ret;
    },
    
    isLoadBlocked: function () {
        return !!this.blockLoadCounter;
    },
    
    attemptLoad: function(options) {
        if (!this.isLoadBlocked()) {
            this.load(options);
        }
    },

    /**
     * Loads the Store using its configured {@link #proxy}.
     * @param {Object} options (optional) config object. This is passed into the {@link Ext.data.operation.Operation Operation}
     * object that is created and then sent to the proxy's {@link Ext.data.proxy.Proxy#read} function
     * 
     * @return {Ext.data.Store} this
     * @since 1.1.0
     */
    load: function(options) {
        // Prevent loads from being triggered while applying initial configs
        if (this.isLoadBlocked()) {
            return;
        }
        
        var me = this,
            proxy = me.getProxy(),
            loadTask = me.loadTask,
            operation = {
                internalScope: me,
                internalCallback: me.onProxyLoad
            }, filters, sorters, session;
        
        // Only add filtering and sorting options if those options are remote
        if (me.getRemoteFilter()) {
            filters = me.getFilters();
            if (filters.getCount()) {
                operation.filters = filters.getRange();
            }
        }
        if (me.getRemoteSort()) {
            sorters = me.getSorters();
            if (sorters.getCount()) {
                operation.sorters = sorters.getRange();
            }
        }
        Ext.apply(operation, options);
        operation.scope = operation.scope || me;
        if (!operation.recordCreator) {
            session = me.getSession();
            if (session) {
                operation.recordCreator = session.recordCreator;
            }
        }
        me.lastOptions = operation;
        

        operation = proxy.createOperation('read', operation);

        if (me.fireEvent('beforeload', me, operation) !== false) {
            me.loading = true;
            if (loadTask) {
                loadTask.cancel();
                me.loadTask = null;
            }
            operation.execute();
        }

        return me;
    },

    /**
     * Reloads the store using the last options passed to the {@link #method-load} method. You can use the reload method to reload the
     * store using the parameters from the last load() call. For example:
     *
     *     store.load({
     *         params : {
     *             userid : 22216
     *         }
     *     });
     *
     *     //...
     *
     *     store.reload();
     *
     * The initial {@link #method-load} execution will pass the `userid` parameter in the request. The {@link #reload} execution
     * will also send the same `userid` parameter in its request as it will reuse the `params` object from the last {@link #method-load} call.
     *
     * You can override a param by passing in the config object with the `params` object:
     *
     *     store.load({
     *         params : {
     *             userid : 22216,
     *             foo    : 'bar'
     *         }
     *     });
     *
     *     //...
     *
     *     store.reload({
     *         params : {
     *             userid : 1234
     *         }
     *     });
     *
     * The initial {@link #method-load} execution sends the `userid` and `foo` parameters but in the {@link #reload} it only sends
     * the `userid` paramter because you are overriding the `params` config not just overriding the one param. To only change a single param
     * but keep other params, you will have to get the last params from the {@link #lastOptions} property:
     *
     *     var lastOptions = store.lastOptions,
     *         lastParams = Ext.clone(lastOptions.params); // make a copy of the last params so we don't affect future reload() calls
     *
     *     lastParams.userid = 1234;
     *
     *     store.reload({
     *         params : lastParams
     *     });
     *
     * This will now send the `userid` parameter as `1234` and the `foo` param as `'bar'`.
     *
     * @param {Object} [options] A config object which contains options which may override the options passed to the previous load call. See the
     * {@link #method-load} method for valid configs.
     */
    reload: function(options) {
        var o = Ext.apply({}, options, this.lastOptions);
        return this.load(o);
    },

    onEndUpdate: function() {
        var me = this;

        if (me.needsSync && me.autoSync && !me.autoSyncSuspended) {
            me.sync();
        }
    },

    /**
     * @private
     * A model instance should call this method on the Store it has been {@link Ext.data.Model#join joined} to..
     * @param {Ext.data.Model} record The model instance that was edited
     * @since 3.4.0
     */
    afterReject : function(record) {
        var me = this;
        // Must pass the 5th param (modifiedFieldNames) as null, otherwise the
        // event firing machinery appends the listeners "options" object to the arg list
        // which may get used as the modified fields array by a handler.
        // This array is used for selective grid cell updating by Grid View.
        // Null will be treated as though all cells need updating.
        if (me.contains(record)) {
            me.onUpdate(record, Ext.data.Model.REJECT, null);
            me.fireEvent('update', me, record, Ext.data.Model.REJECT, null);
        }
    },

    /**
     * @private
     * A model instance should call this method on the Store it has been {@link Ext.data.Model#join joined} to.
     * @param {Ext.data.Model} record The model instance that was edited
     * @since 3.4.0
     */
    afterCommit : function(record, modifiedFieldNames) {
        var me = this;
        if (!modifiedFieldNames) {
            modifiedFieldNames = null;
        }
        if (me.contains(record)) {
            me.onUpdate(record, Ext.data.Model.COMMIT, modifiedFieldNames);
            me.fireEvent('update', me, record, Ext.data.Model.COMMIT, modifiedFieldNames);
        }
    },
    
    afterErase: function(record) {
        this.onErase(record);
    },
    
    onErase: Ext.emptyFn,

    onUpdate: Ext.emptyFn,

    // private
    onDestroy: function() {
        var me = this;
        
        me.blockLoad();
        me.clearData();
        me.setProxy(null);
        me.setModel(null);
        me.setSession(null);
    },

    
    /**
     * Returns true if the store has a pending load task.
     * @return {Boolean} `true` if the store has a pending load task.
     * @private
     */
    hasPendingLoad: function() {
        return !!this.loadTask || this.isLoading();
    },

    /**
     * Returns true if the Store is currently performing a load operation
     * @return {Boolean} `true` if the Store is currently loading
     */
    isLoading: function() {
        return !!this.loading;
    },

    /**
     * Returns `true` if the Store has been loaded.
     * @return {Boolean} `true` if the Store has been loaded.
     */
    isLoaded: function() {
        return this.loadCount > 0;
    },

    /**
     * Suspends automatically syncing the Store with its Proxy.  Only applicable if {@link #autoSync} is `true`
     */
    suspendAutoSync: function() {
        ++this.autoSyncSuspended;
    },

    /**
     * Resumes automatically syncing the Store with its Proxy.  Only applicable if {@link #autoSync} is `true`
     * @param {Boolean} syncNow Pass `true` to synchronize now. Only synchronizes with the Proxy if the suspension
     * count has gone to zero (We are not under a higher level of suspension)
     * 
     */
    resumeAutoSync: function(syncNow) {
        var me = this;

        //<debug>
        if (!me.autoSyncSuspended) {
            Ext.log.warn('Mismatched call to resumeAutoSync - auto synchronization is currently not suspended.');
        }
        //</debug>
        if (me.autoSyncSuspended && ! --me.autoSyncSuspended) {
            if (syncNow) {
                me.sync();
            }
        }
    },

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
    
    // to be implemented by subclasses
    clearData: Ext.emptyFn

});
