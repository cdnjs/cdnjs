/**
 * @author Ed Spencer
 *
 * Proxies are used by {@link Ext.data.Store Stores} to handle the loading and saving of {@link Ext.data.Model Model}
 * data. Usually developers will not need to create or interact with proxies directly.
 *
 * # Types of Proxy
 *
 * There are two main types of Proxy - {@link Ext.data.proxy.Client Client} and {@link Ext.data.proxy.Server Server}.
 * The Client proxies save their data locally and include the following subclasses:
 *
 * - {@link Ext.data.proxy.LocalStorage LocalStorageProxy} - saves its data to localStorage if the browser supports it
 * - {@link Ext.data.proxy.SessionStorage SessionStorageProxy} - saves its data to sessionStorage if the browsers supports it
 * - {@link Ext.data.proxy.Memory MemoryProxy} - holds data in memory only, any data is lost when the page is refreshed
 *
 * The Server proxies save their data by sending requests to some remote server. These proxies include:
 *
 * - {@link Ext.data.proxy.Ajax Ajax} - sends requests to a server on the same domain
 * - {@link Ext.data.proxy.JsonP JsonP} - uses JSON-P to send requests to a server on a different domain
 * - {@link Ext.data.proxy.Rest Rest} - uses RESTful HTTP methods (GET/PUT/POST/DELETE) to communicate with server
 * - {@link Ext.data.proxy.Direct Direct} - uses {@link Ext.direct.Manager} to send requests
 *
 * Proxies operate on the principle that all operations performed are either Create, Read, Update or Delete. These four
 * operations are mapped to the methods {@link #create}, {@link #read}, {@link #update} and {@link #erase}
 * respectively. Each Proxy subclass implements these functions.
 *
 * The CRUD methods each expect an {@link Ext.data.operation.Operation Operation} object as the sole argument. The Operation
 * encapsulates information about the action the Store wishes to perform, the {@link Ext.data.Model model} instances
 * that are to be modified, etc. See the {@link Ext.data.operation.Operation Operation} documentation for more details. Each CRUD
 * method also accepts a callback function to be called asynchronously on completion.
 *
 * Proxies also support batching of Operations via a {@link Ext.data.Batch batch} object, invoked by the {@link #batch}
 * method.
 */
Ext.define('Ext.data.proxy.Proxy', {
    mixins: [
        'Ext.mixin.Factoryable',
        'Ext.mixin.Observable'
    ],

    $configPrefixed: false,

    alias: 'proxy.proxy', // also configures Factoryable

    alternateClassName: [
        'Ext.data.DataProxy',
        'Ext.data.Proxy'
    ],

    requires: [
        'Ext.data.schema.Schema',
        'Ext.data.reader.Reader',
        'Ext.data.writer.Writer'
    ],

    uses: [
        'Ext.data.Batch',
        'Ext.data.operation.*',
        'Ext.data.Model'
    ],

    config: {
        /**
         * @cfg {String} batchOrder
         * Comma-separated ordering 'create', 'update' and 'destroy' actions when batching. Override this to set a different
         * order for the batched CRUD actions to be executed in. Defaults to 'create,update,destroy'.
         */
        batchOrder: 'create,update,destroy',

        /**
         * @cfg {Boolean} batchActions
         * True to batch actions of a particular type when synchronizing the store. Defaults to true.
         */
        batchActions: true,

        /**
         * @cfg {String/Ext.data.Model} model
         * The name of the Model to tie to this Proxy. Can be either the string name of the Model, or a reference to the
         * Model constructor. Required.
         */
        model: undefined,

        /**
         * @cfg {Object/String/Ext.data.reader.Reader} reader
         * The Ext.data.reader.Reader to use to decode the server's response or data read
         * from client. This can either be a Reader instance, a config object or just a
         * valid Reader type name (e.g. 'json', 'xml').
         */
        reader: {
            type: 'json'
        },

        /**
         * @cfg {Object/String/Ext.data.writer.Writer} writer
         * The Ext.data.writer.Writer to use to encode any request sent to the server or
         * saved to client. This can either be a Writer instance, a config object or just
         * a valid Writer type name (e.g. 'json', 'xml').
         */
        writer: {
            type: 'json'
        }
    },

    /**
     * @property {Boolean} isProxy
     * `true` in this class to identify an object as an instantiated Proxy, or subclass thereof.
     */
    isProxy: true,

    /**
     * @property {Boolean} [isSynchronous=false]
     * Identifies the proxy as (a)synchronous.
     */
    isSynchronous: false,
     
     /**
     * @event metachange
     * Fires when this proxy's reader provides new metadata. Metadata usually consists
     * of new field definitions, but can include any configuration data required by an
     * application, and can be processed as needed in the event handler.
     * This event is currently only fired for JsonReaders. Note that this event is also
     * propagated by {@link Ext.data.Store}, which is typically where it would be handled.
     * @param {Ext.data.proxy.Proxy} this
     * @param {Object} meta The JSON metadata
     */

    /**
     * Creates the Proxy
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        // Will call initConfig
        this.mixins.observable.constructor.call(this, config);
    },
     
    applyModel: function(model) {
        return Ext.data.schema.Schema.lookupEntity(model);
    },

    updateModel: function(model) {
        if (model) {
            var reader = this.getReader();
                
            if (reader && !reader.getModel()) {
                reader.setModel(model);
            }
        }
    },
    
    applyReader: function(reader) {
        return Ext.Factory.reader(reader);
    },
    
    updateReader: function (reader) {
        if (reader) {
            var me = this,
                model = me.getModel();
                
            if (!model) {
                model = reader.getModel();
                if (model) {
                    me.setModel(model);
                }
            } else {
                reader.setModel(model);
            }

            // TODO: an event here?
            if (reader.onMetaChange) {
                 reader.onMetaChange = Ext.Function.createSequence(reader.onMetaChange, me.onMetaChange, me);
            }
        }
    },
    
    applyWriter: function(writer) {
        return Ext.Factory.writer(writer);
    },
    
    abort: Ext.emptyFn,

    /**
     * @private
     * Called each time the reader's onMetaChange is called so that the proxy can fire the metachange event
     */
    onMetaChange: function(meta) {
        this.fireEvent('metachange', this, meta);
    },

    /**
     * Performs the given create operation.
     * @param {Ext.data.operation.Operation} operation The Operation to perform
     * @method
     */
    create: Ext.emptyFn,

    /**
     * Performs the given read operation.
     * @param {Ext.data.operation.Operation} operation The Operation to perform
     * @method
     */
    read: Ext.emptyFn,

    /**
     * Performs the given update operation.
     * @param {Ext.data.operation.Operation} operation The Operation to perform
     * @method
     */
    update: Ext.emptyFn,

    /**
     * Performs the given destroy operation.
     * @param {Ext.data.operation.Operation} operation The Operation to perform
     * @method
     */
    erase: Ext.emptyFn,

    /**
     * Performs a batch of {@link Ext.data.operation.Operation Operations}, in the order specified by {@link #batchOrder}. Used
     * internally by {@link Ext.data.Store}'s {@link Ext.data.Store#sync sync} method. Example usage:
     *
     *     myProxy.batch({
     *         create : [myModel1, myModel2],
     *         update : [myModel3],
     *         destroy: [myModel4, myModel5]
     *     });
     *
     * Where the myModel* above are {@link Ext.data.Model Model} instances - in this case 1 and 2 are new instances and
     * have not been saved before, 3 has been saved previously but needs to be updated, and 4 and 5 have already been
     * saved but should now be destroyed.
     * 
     * Note that the previous version of this method took 2 arguments (operations and listeners). While this is still
     * supported for now, the current signature is now a single `options` argument that can contain both operations and
     * listeners, in addition to other options. The multi-argument signature will likely be deprecated in a future release.
     *
     * @param {Object} options Object containing one or more properties supported by the batch method:
     * 
     * @param {Object} options.operations Object containing the Model instances to act upon, keyed by action name
     * 
     * @param {Object} [options.listeners] Event listeners object passed straight through to the Batch -
     * see {@link Ext.data.Batch} for details
     * 
     * @param {Ext.data.Batch/Object} [options.batch] A {@link Ext.data.Batch} object (or batch config to apply 
     * to the created batch). If unspecified a default batch will be auto-created.
     * 
     * @param {Function} [options.callback] The function to be called upon completion of processing the batch.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Ext.data.Batch} options.callback.batch The {@link Ext.data.Batch batch} that was processed,
     * containing all operations in their current state after processing
     * @param {Object} options.callback.options The options argument that was originally passed into batch
     * 
     * @param {Function} [options.success] The function to be called upon successful completion of the batch. The 
     * success function is called only if no exceptions were reported in any operations. If one or more exceptions
     * occurred then the `failure` function will be called instead. The success function is called 
     * with the following parameters:
     * @param {Ext.data.Batch} options.success.batch The {@link Ext.data.Batch batch} that was processed,
     * containing all operations in their current state after processing
     * @param {Object} options.success.options The options argument that was originally passed into batch
     * 
     * @param {Function} [options.failure] The function to be called upon unsuccessful completion of the batch. The 
     * failure function is called when one or more operations returns an exception during processing (even if some
     * operations were also successful). In this case you can check the batch's {@link Ext.data.Batch#exceptions
     * exceptions} array to see exactly which operations had exceptions. The failure function is called with the 
     * following parameters:
     * @param {Ext.data.Batch} options.failure.batch The {@link Ext.data.Batch batch} that was processed,
     * containing all operations in their current state after processing
     * @param {Object} options.failure.options The options argument that was originally passed into batch
     * 
     * @param {Object} [options.scope] The scope in which to execute any callbacks (i.e. the `this` object inside
     * the callback, success and/or failure functions). Defaults to the proxy.
     *
     * @return {Ext.data.Batch} The newly created Batch
     */
    batch: function(options, /* deprecated */listeners) {
        var me = this,
            useBatch = me.getBatchActions(),
            batch,
            records,
            actions, aLen, action, a, r, rLen, record;

        if (options.operations === undefined) {
            // the old-style (operations, listeners) signature was called
            // so convert to the single options argument syntax
            options = {
                operations: options,
                listeners: listeners
            };
        }

        if (options.batch) {
            if (Ext.isDefined(options.batch.runOperation)) {
                batch = Ext.applyIf(options.batch, {
                    proxy: me,
                    listeners: {}
                });
            }
        } else {
            options.batch = {
                proxy: me,
                listeners: options.listeners || {}
            };
        }

        if (!batch) {
            batch = new Ext.data.Batch(options.batch);
        }

        batch.on('complete', Ext.bind(me.onBatchComplete, me, [options], 0));

        actions = me.getBatchOrder().split(',');
        aLen    = actions.length;

        for (a = 0; a < aLen; a++) {
            action  = actions[a];
            records = options.operations[action];

            if (records) {
                if (useBatch) {
                    batch.add(me.createOperation(action, {
                        records : records,
                        // Relay any additional params through to the Operation (and Request).
                        params: options.params
                    }));
                } else {
                    rLen = records.length;

                    for (r = 0; r < rLen; r++) {
                        record = records[r];

                        batch.add(me.createOperation(action, {
                            records : [record],
                            // Relay any additional params through to the Operation (and Request).
                            params: options.params
                        }));
                    }
                }
            }
        }

        batch.start();
        return batch;
    },

    /**
     * @private
     * The internal callback that the proxy uses to call any specified user callbacks after completion of a batch
     */
    onBatchComplete: function(batchOptions, batch) {
        var scope = batchOptions.scope || this;

        if (batch.hasException()) {
            if (Ext.isFunction(batchOptions.failure)) {
                Ext.callback(batchOptions.failure, scope, [batch, batchOptions]);
            }
        } else if (Ext.isFunction(batchOptions.success)) {
            Ext.callback(batchOptions.success, scope, [batch, batchOptions]);
        }

        if (Ext.isFunction(batchOptions.callback)) {
            Ext.callback(batchOptions.callback, scope, [batch, batchOptions]);
        }
    },
    
    createOperation: function(action, config) {
        var operation = Ext.createByAlias('data.operation.' + action, config);
        operation.setProxy(this);
        return operation;  
    },

    clone: function() {
        return new this.self(this.getInitialConfig());
    }
});
