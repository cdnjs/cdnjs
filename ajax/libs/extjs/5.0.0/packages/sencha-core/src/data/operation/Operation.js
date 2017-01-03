/**
 * Represents a read or write operation performed by a {@link Ext.data.proxy.Proxy Proxy}.
 * Operation objects are used to enable communication between Stores and Proxies.
 * Application developers should rarely need to interact with Operation objects directly.
 *
 * Several Operations can be batched together in a {@link Ext.data.Batch batch}.
 */
Ext.define('Ext.data.operation.Operation', {
    alternateClassName: 'Ext.data.Operation',
    
    isOperation: true,
    
    config: {
        /**
         * @cfg {Boolean} synchronous
         * True if this Operation is to be executed synchronously. This property is inspected by a
         * {@link Ext.data.Batch Batch} to see if a series of Operations can be executed in parallel or not.
         */
        synchronous: false,
        
        /**
         * @cfg {Object} params
         * Parameters to pass along with the request when performing the operation.
         */
        params: undefined,
    
        /**
         * @cfg {Function} callback
         * Function to execute when operation completed.
         * @cfg {Ext.data.Model[]} callback.records Array of records.
         * @cfg {Ext.data.operation.Operation} callback.operation The Operation itself.
         * @cfg {Boolean} callback.success True when operation completed successfully.
         */
        callback: undefined,
    
        /**
         * @cfg {Object} scope
         * Scope for the {@link #callback} function.
         */
        scope: undefined,
        
        /**
         * @cfg {Ext.data.ResultSet} resultSet
         * The ResultSet for this operation.
         * @accessor
         */
        resultSet: null,
        
        /**
         * @private
         * @cfg {Object} response
         * The response for this operation.
         */
        response: null,
        
        /**
         * @cfg {Ext.data.Request} request
         * The request for this operation.
         */
        request: null,
        
        /**
         * @cfg {Ext.data.Model[]} records
         * The records associated with this operation. If this is a `read` operation, this will be
         * `null` until data is returned from the {@link Ext.data.proxy.Proxy}.
         */
        records: null,
        
        /**
         * @cfg {Object} id
         * The id of the operation.
         */
        id: undefined,
        
        /**
         * @cfg {Ext.data.proxy.Proxy} proxy
         * The proxy for this operation
         */
        proxy: null,
        
        /**
         * @cfg {Ext.data.Batch} 
         * The batch for this operation, if applicable
         */
        batch: null,
        
        /**
         * @cfg {Function} recordCreator
         * Passed to the reader, see {@link Ext.data.reader.Reader#read}
         * @private
         */
        recordCreator: null,
        
        //We use this because in a lot of cases the developer can indirectly pass
        // a callback/scope and that will get pushed on to the operation. As such,
        // create our own hook for the callback that will fire first
        /**
         * @cfg {Function} internalCallback
         * A callback to run before the {@link #callback}. 
         * @private
         */
        internalCallback: null,
        
        /**
         * @cfg {Object} internalScope
         * Scope to run the {@link #internalCallback}
         * @private
         */
        internalScope: null
    },

    /**
     * @property {Number} order
     * This number is used by `{@link Ext.data.Batch#sort}` to order operations. Order of
     * operations of the same type is determined by foreign-key dependencies. The array of
     * operations is sorted by ascending (increasing) values of `order`.
     * @private
     * @readonly
     * @since 5.0.0
     */
    order: 0,

    /**
     * @property {Number} foreignKeyDirection
     * This number is used by `{@link Ext.data.Batch#sort}` to order operations of the
     * same type. This value is multipled by the "entity rank" (which is determined by
     * foreign-key dependencies) to invert the direction of the sort based on the type of
     * operation. Only `Ext.data.operation.Destroy` overrides this value.
     * @private
     * @readonly
     * @since 5.0.0
     */
    foreignKeyDirection: 1,

    /**
     * @property {Boolean} started
     * The start status of this Operation. Use {@link #isStarted}.
     * @readonly
     * @private
     */
    started: false,

    /**
     * @property {Boolean} running
     * The run status of this Operation. Use {@link #isRunning}.
     * @readonly
     * @private
     */
    running: false,

    /**
     * @property {Boolean} complete
     * The completion status of this Operation. Use {@link #isComplete}.
     * @readonly
     * @private
     */
    complete: false,

    /**
     * @property {Boolean} success
     * Whether the Operation was successful or not. This starts as undefined and is set to true
     * or false by the Proxy that is executing the Operation. It is also set to false by {@link #setException}. Use
     * {@link #wasSuccessful} to query success status.
     * @readonly
     * @private
     */
    success: undefined,

    /**
     * @property {Boolean} exception
     * The exception status of this Operation. Use {@link #hasException} and see {@link #getError}.
     * @readonly
     * @private
     */
    exception: false,

    /**
     * @property {String/Object} error
     * The error object passed when {@link #setException} was called. This could be any object or primitive.
     * @private
     */
    error: undefined,

    /**
     * Creates new Operation object.
     * @param {Object} config (optional) Config object.
     */
    constructor: function(config) {
        // This ugliness is here to prevent an issue when specifying scope
        // as an object literal. The object will be pulled in as part of
        // the merge() during initConfig which will change the object 
        // reference. As such, we attempt to fudge it here until we come
        // up with a better solution for describing how specific config
        // objects should behave during init() time.
        var scope = config && config.scope;

        this.initConfig(config);

        if (config) {
            config.scope = scope;
        }
        if (scope) {
            this.setScope(scope);
            this.initialConfig.scope = scope;
        }
    },
    
    getAction: function() {
        return this.action;    
    },
    
    /**
     * @private
     * Executes the operation on the configured {@link #proxy}.
     * @return {Ext.data.Request} The request object
     */
    execute: function() {
        var me = this;
        delete me.error;
        delete me.success;
        me.complete = me.exception = false;
        
        me.setStarted();
        return me.request = me.doExecute();
    },
    
    doExecute: Ext.emptyFn,
    
    /**
     * Aborts the processing of this operation on the {@link #proxy}.
     * This is only valid for proxies that make asynchronous requests.
     */
    abort: function() {
        var me = this,
            request = me.request;
            
        if (me.running && request) {
            me.getProxy().abort(request);
            me.request = null;
        }    
    },
    
    process: function(resultSet, request, response, autoComplete) {
        var me = this;
        
        autoComplete = autoComplete !== false;
        
        me.setResponse(response);
        me.setResultSet(resultSet);
        if (resultSet.getSuccess()) {
            me.doProcess(resultSet, request, response);
            me.setSuccessful(autoComplete);
        } else if (autoComplete) {
            me.setException(resultSet.getMessage());
        }
    },

    // This private object is used to save on memory allocation. This instance is used to
    // apply server record updates as part of a record commit performed by calling the
    // set() method on the record. See doProcess.
    _commitSetOptions: { convert: true, commit: true },

    /**
     * Process records in the operation after the response is successful and the result
     * set is parsed correctly. The base class implementation of this method is used by
     * "create" and "update" operations to allow the server response to update the client
     * side records.
     * 
     * @param {Ext.data.ResultSet} resultSet The result set
     * @param {Ext.data.Request} request The request
     * @param {Object} response The response
     * @protected
     */
    doProcess: function(resultSet, request, response) {
        var me = this,
            commitSetOptions = me._commitSetOptions,
            clientRecords = me.getRecords(),
            clientLen = clientRecords.length,
            clientIdProperty = clientRecords[0].clientIdProperty,
            serverRecords = resultSet.getRecords(), // a data array, not records yet
            serverLen = serverRecords ? serverRecords.length : 0,
            clientMap, serverRecord, clientRecord, i;

        if (serverLen && clientIdProperty) {
            // Linear pass over clientRecords to map them by their idProperty
            clientMap = Ext.Array.toValueMap(clientRecords, 'id');

            // Linear pass over serverRecords to match them by clientIdProperty to the
            // corresponding clientRecord (if one exists).
            for (i = 0; i < serverLen; ++i) {
                serverRecord = serverRecords[i];
                clientRecord = clientMap[serverRecord[clientIdProperty]];

                if (clientRecord) {
                    // Remove this one so we don't commit() on it next
                    delete clientMap[clientRecord.id];
                    // Remove the clientIdProperty value since we don't want to store it
                    delete serverRecord[clientIdProperty];

                    clientRecord.set(serverRecord, commitSetOptions); // set & commit
                }
                //<debug>
                else {
                    Ext.log.warn('Ignoring server record: ' + Ext.encode(serverRecord));
                }
                //</debug>
            }

            // Linear pass over any remaining client records.
            for (i in clientMap) {
                clientMap[i].commit();
            }
        }
        else {
            // Either no serverRecords or no clientIdProperty, so index correspondence is
            // all we have to go on. If there is no serverRecord at a given index we just
            // commit() the record.
            for (i = 0; i < clientLen; ++i) {
                clientRecord = clientRecords[i];

                if (serverLen === 0 || !(serverRecord = serverRecords[i])) {
                    // once i > serverLen then serverRecords[i] will be undefined...
                    clientRecord.commit();
                } else {
                    clientRecord.set(serverRecord, commitSetOptions);
                }
            }
        }
    },

    /**
     * Marks the Operation as started.
     */
    setStarted: function() {
        this.started = this.running = true;
    },

    /**
     * Marks the Operation as completed.
     */
    setCompleted: function() {
        this.complete = true;
        this.running  = false;
        
        this.triggerCallbacks();
    },

    /**
     * Marks the Operation as successful.
     * @param {Boolean} [complete] `true` to also mark this operation
     * as being complete See {@link #setCompleted}.
     */
    setSuccessful: function(complete) {
        this.success = true;
        if (complete) {
            this.setCompleted();
        }
    },

    /**
     * Marks the Operation as having experienced an exception. Can be supplied with an option error message/object.
     * @param {String/Object} error (optional) error string/object
     */
    setException: function(error) {
        var me = this;
        
        me.exception = true;
        me.success = me.running = false;
        me.error = error;
        
        me.setCompleted();
    },

    triggerCallbacks: function() {
        var me = this,
            callback = me.getInternalCallback();

        // Call internal callback first (usually the Store's onProxyLoad method)
        if (callback) {
            callback.call(me.getInternalScope() || me, me);
            me.setInternalCallback(null);
            me.setInternalScope(null);
        }

        // Call the user's callback as passed to Store's read/write
        if (callback = me.getCallback()) {
            // Maintain the public API for callback
            callback.call(me.getScope() || me, me.getRecords(), me, me.wasSuccessful());
            me.setCallback(null);
            me.setScope(null);
        }
    },

    /**
     * Returns true if this Operation encountered an exception (see also {@link #getError})
     * @return {Boolean} True if there was an exception
     */
    hasException: function() {
        return this.exception;
    },

    /**
     * Returns the error string or object that was set using {@link #setException}
     * @return {String/Object} The error object
     */
    getError: function() {
        return this.error;
    },

    /**
     * Returns the {@link Ext.data.Model record}s associated with this operation. For read
     * operations the records as set by the {@link Ext.data.proxy.Proxy Proxy} will be
     * returned (returns `null` if the proxy has not yet set the records).
     *
     * For create, update, and destroy operations the operation's initially configured
     * records will be returned, although the proxy may modify these records' data at some
     * point after the operation is initialized.
     *
     * @return {Ext.data.Model[]}
     */
    getRecords: function() {
        var resultSet;
        return this._records ||
               ((resultSet = this.getResultSet()) ? resultSet.getRecords() : null);
    },

    /**
     * Returns true if the Operation has been started. Note that the Operation may have started AND completed, see
     * {@link #isRunning} to test if the Operation is currently running.
     * @return {Boolean} True if the Operation has started
     */
    isStarted: function() {
        return this.started;
    },

    /**
     * Returns true if the Operation has been started but has not yet completed.
     * @return {Boolean} True if the Operation is currently running
     */
    isRunning: function() {
        return this.running;
    },

    /**
     * Returns true if the Operation has been completed
     * @return {Boolean} True if the Operation is complete
     */
    isComplete: function() {
        return this.complete;
    },

    /**
     * Returns true if the Operation has completed and was successful
     * @return {Boolean} True if successful
     */        
    wasSuccessful: function() {
        return this.isComplete() && this.success === true; // success can be undefined
    },

    /**
     * Checks whether this operation should cause writing to occur.
     * @return {Boolean} Whether the operation should cause a write to occur.
     */
    allowWrite: function() {
        return true;
    }
});
