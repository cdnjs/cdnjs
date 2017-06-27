YUI.add('datasource-local', function(Y) {

/**
 * The DataSource utility provides a common configurable interface for widgets to
 * access a variety of data, from JavaScript arrays to online database servers.
 *
 * @module datasource
 */
    
/**
 * Provides the base DataSource implementation, which can be extended to
 * create DataSources for specific data protocols, such as the IO Utility, the
 * Get Utility, or custom functions.
 *
 * @module datasource
 * @submodule datasource-local
 */

/**
 * Base class for the DataSource Utility.
 * @class DataSource.Local
 * @extends Base
 * @constructor
 */    
var LANG = Y.Lang,

DSLocal = function() {
    DSLocal.superclass.constructor.apply(this, arguments);
};
    
    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource static properties
    //
    /////////////////////////////////////////////////////////////////////////////
Y.mix(DSLocal, {
    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static     
     * @final
     * @value "dataSourceLocal"
     */
    NAME: "dataSourceLocal",

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {
        /**
        * @attribute source
        * @description Pointer to live data.
        * @type MIXED
        * @default null        
        */
        source: {
            value: null
        }
    },

    /**
     * Global transaction counter.
     *
     * @property DataSource._tId
     * @type Number
     * @static
     * @private
     * @default 0
     */
    _tId: 0,

    /**
     * Executes a given callback.  The third param determines whether to execute
     *
     * @method DataSource.issueCallback
     * @param callback {Object} The callback object.
     * @param params {Array} params to be passed to the callback method
     * @param error {Boolean} whether an error occurred
     * @static
     */
    issueCallback: function (e) {
        if(e.callback) {
            var callbackFunc = (e.error && e.callback.failure) || e.callback.success;
            if (callbackFunc) {
                callbackFunc(e);
            }
        }
    }
});
    
Y.extend(DSLocal, Y.Base, {
    /**
    * Internal init() handler.
    *
    * @method initializer
    * @param config {Object} Config object.
    * @private        
    */
    initializer: function(config) {
        this._initEvents();
    },

    /**
    * This method creates all the events for this module.
    * @method _initEvents
    * @private        
    */
    _initEvents: function() {
        /**
         * Fired when a data request is received.
         *
         * @event request
         * @param e {Event.Facade} Event Facade with the following properties:
         * <dl>                          
         * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
         * <dt>request (Object)</dt> <dd>The request.</dd>
         * <dt>callback (Object)</dt> <dd>The callback object.</dd>
         * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
         * </dl>
         * @preventable _defRequestFn
         */
        this.publish("request", {defaultFn: Y.bind("_defRequestFn", this), queuable:true});
         
        /**
         * Fired when raw data is received.
         *
         * @event data
         * @param e {Event.Facade} Event Facade with the following properties:
         * <dl>
         * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
         * <dt>request (Object)</dt> <dd>The request.</dd>
         * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
         *     <dl>
         *         <dt>success (Function)</dt> <dd>Success handler.</dd>
         *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
         *     </dl>
         * </dd>
         * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
         * <dt>data (Object)</dt> <dd>Raw data.</dd>
         * </dl>
         * @preventable _defDataFn
         */
        this.publish("data", {defaultFn: Y.bind("_defDataFn", this), queuable:true});

        /**
         * Fired when response is returned.
         *
         * @event response
         * @param e {Event.Facade} Event Facade with the following properties:
         * <dl>
         * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
         * <dt>request (Object)</dt> <dd>The request.</dd>
         * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
         *     <dl>
         *         <dt>success (Function)</dt> <dd>Success handler.</dd>
         *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
         *     </dl>
         * </dd>
         * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
         * <dt>data (Object)</dt> <dd>Raw data.</dd>
         * <dt>response (Object)</dt> <dd>Normalized response object with the following properties:
         *     <dl>
         *         <dt>results (Object)</dt> <dd>Parsed results.</dd>
         *         <dt>meta (Object)</dt> <dd>Parsed meta data.</dd>
         *         <dt>error (Boolean)</dt> <dd>Error flag.</dd>
         *     </dl>
         * </dd>
         * </dl>
         * @preventable _defResponseFn
         */
         this.publish("response", {defaultFn: Y.bind("_defResponseFn", this), queuable:true});

        /**
         * Fired when an error is encountered.
         *
         * @event error
         * @param e {Event.Facade} Event Facade with the following properties:
         * <dl>
         * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
         * <dt>request (Object)</dt> <dd>The request.</dd>
         * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
         *     <dl>
         *         <dt>success (Function)</dt> <dd>Success handler.</dd>
         *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
         *     </dl>
         * </dd>
         * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
         * <dt>data (Object)</dt> <dd>Raw data.</dd>
         * <dt>response (Object)</dt> <dd>Normalized response object with the following properties:
         *     <dl>
         *         <dt>results (Object)</dt> <dd>Parsed results.</dd>
         *         <dt>meta (Object)</dt> <dd>Parsed meta data.</dd>
         *         <dt>error (Object)</dt> <dd>Error object.</dd>
         *     </dl>
         * </dd>
         * </dl>
         */

    },

    /**
     * Manages request/response transaction. Must fire <code>response</code>
     * event when response is received. This method should be implemented by
     * subclasses to achieve more complex behavior such as accessing remote data.
     *
     * @method _defRequestFn
     * @param e {Event.Facade} Event Facadewith the following properties:
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
     *     <dl>
     *         <dt>success (Function)</dt> <dd>Success handler.</dd>
     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
     *     </dl>
     * </dd>
     * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
     * </dl>
     * @protected
     */
    _defRequestFn: function(e) {
        var data = this.get("source");
        
        // Problematic data
        if(LANG.isUndefined(data)) {
            e.error = new Error("Local source undefined");
        }
        if(e.error) {
            this.fire("error", e);
        }

        this.fire("data", Y.mix({data:data}, e));
    },

    /**
     * Normalizes raw data into a response that includes results and meta properties.
     *
     * @method _defDataFn
     * @param e {Event.Facade} Event Facade with the following properties:
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
     *     <dl>
     *         <dt>success (Function)</dt> <dd>Success handler.</dd>
     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
     *     </dl>
     * </dd>
     * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
     * <dt>data (Object)</dt> <dd>Raw data.</dd>
     * </dl>
     * @protected
     */
    _defDataFn: function(e) {
        var data = e.data,
            meta = e.meta,
            response = {
                results: (LANG.isArray(data)) ? data : [data],
                meta: (meta) ? meta : {}
            };

        this.fire("response", Y.mix({response: response}, e));
    },

    /**
     * Sends data as a normalized response to callback.
     *
     * @method _defResponseFn
     * @param e {Event.Facade} Event Facade with the following properties:
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
     *     <dl>
     *         <dt>success (Function)</dt> <dd>Success handler.</dd>
     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
     *     </dl>
     * </dd>
     * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
     * <dt>data (Object)</dt> <dd>Raw data.</dd>
     * <dt>response (Object)</dt> <dd>Normalized response object with the following properties:
     *     <dl>
     *         <dt>results (Object)</dt> <dd>Parsed results.</dd>
     *         <dt>meta (Object)</dt> <dd>Parsed meta data.</dd>
     *         <dt>error (Boolean)</dt> <dd>Error flag.</dd>
     *     </dl>
     * </dd>
     * </dl>
     * @protected
     */
    _defResponseFn: function(e) {
        // Send the response back to the callback
        DSLocal.issueCallback(e);
    },
    
    /**
     * Generates a unique transaction ID and fires <code>request</code> event.
     *
     * @method sendRequest
     * @param request {Object} Request.
     * @param callback {Object} An object literal with the following properties:
     *     <dl>
     *     <dt><code>success</code></dt>
     *     <dd>The function to call when the data is ready.</dd>
     *     <dt><code>failure</code></dt>
     *     <dd>The function to call upon a response failure condition.</dd>
     *     <dt><code>argument</code></dt>
     *     <dd>Arbitrary data payload that will be passed back to the success and failure handlers.</dd>
     *     </dl>
     * @param cfg {Object} Configuration object
     * @return {Number} Transaction ID.
     */
    sendRequest: function(request, callback, cfg) {
        var tId = DSLocal._tId++;
        this.fire("request", {tId:tId, request:request, callback:callback, cfg:cfg || {}});
        return tId;
    }
});
    
Y.namespace("DataSource").Local = DSLocal;



}, '@VERSION@' ,{requires:['base']});

YUI.add('datasource-io', function(Y) {

/**
 * Provides a DataSource implementation which can be used to retrieve data via the IO Utility.
 *
 * @module datasource
 * @submodule datasource-io
 */

/**
 * IO subclass for the DataSource Utility.
 * @class DataSource.IO
 * @extends DataSource.Local
 * @constructor
 */    
var DSIO = function() {
    DSIO.superclass.constructor.apply(this, arguments);
};
    

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource.IO static properties
    //
    /////////////////////////////////////////////////////////////////////////////
Y.mix(DSIO, {
    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static     
     * @final
     * @value "dataSourceIO"
     */
    NAME: "dataSourceIO",


    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource.IO Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {
        /**
         * Pointer to IO Utility.
         *
         * @attribute io
         * @type Y.io
         * @default Y.io
         */
        io: {
            value: Y.io,
            cloneDefaultValue: false
        }
    }
});
    
Y.extend(DSIO, Y.DataSource.Local, {
    /**
    * Internal init() handler.
    *
    * @method initializer
    * @param config {Object} Config object.
    * @private
    */
    initializer: function(config) {
        this._queue = {interval:null, conn:null, requests:[]};
    },

    /**
    * @property _queue
    * @description Object literal to manage asynchronous request/response
    * cycles enabled if queue needs to be managed (asyncMode/ioConnMode):
    * <dl>
    *     <dt>interval {Number}</dt>
    *         <dd>Interval ID of in-progress queue.</dd>
    *     <dt>conn</dt>
    *         <dd>In-progress connection identifier (if applicable).</dd>
    *     <dt>requests {Object[]}</dt>
    *         <dd>Array of queued request objects: {request:request, callback:callback}.</dd>
    * </dl>
    * @type Object
    * @default {interval:null, conn:null, requests:[]}
    * @private
    */
    _queue: null,

    /**
     * Passes query string to IO. Fires <code>response</code> event when
     * response is received asynchronously.
     *
     * @method _defRequestFn
     * @param e {Event.Facade} Event Facade with the following properties:
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
     *     <dl>
     *         <dt>success (Function)</dt> <dd>Success handler.</dd>
     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
     *     </dl>
     * </dd>
     * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
     * </dl>
     * @protected
     */
    _defRequestFn: function(e) {
        var uri = this.get("source"),
            io = this.get("io"),
            request = e.request,
            cfg = Y.mix(e.cfg, {
                on: {
                    success: function (id, response, e) {
                        this.fire("data", Y.mix({data:response}, e));
                    },
                    failure: function (id, response, e) {
                        e.error = new Error("IO data failure");
                        this.fire("error", Y.mix({data:response}, e));
                        this.fire("data", Y.mix({data:response}, e));
                    }
                },
                context: this,
                arguments: e
            });
        
        // Support for POST transactions
        if(Y.Lang.isString(request)) {
            if(cfg.method && (cfg.method.toUpperCase() === "POST")) {
                cfg.data = cfg.data ? cfg.data+request : request;
            }
            else {
                uri += request;
            }
        }
        io(uri, cfg);
        return e.tId;
    }
});
  
Y.DataSource.IO = DSIO;
    



}, '@VERSION@' ,{requires:['datasource-local', 'io']});

YUI.add('datasource-get', function(Y) {

/**
 * Provides a DataSource implementation which can be used to retrieve data via the Get Utility.
 *
 * @module datasource
 * @submodule datasource-get
 */

/**
 * Get Utility subclass for the DataSource Utility.
 * @class DataSource.Get
 * @extends DataSource.Local
 * @constructor
 */    
var DSGet = function() {
    DSGet.superclass.constructor.apply(this, arguments);
};
    

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource.Get static properties
    //
    /////////////////////////////////////////////////////////////////////////////
Y.mix(DSGet, {
    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static     
     * @final
     * @value "dataSourceGet"
     */
    NAME: "dataSourceGet",


    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource.Get Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {
        /**
         * Pointer to Get Utility.
         *
         * @attribute get
         * @type Y.Get
         * @default Y.Get
         */
        get: {
            value: Y.Get,
            cloneDefaultValue: false
        },

/**
 * Defines request/response management in the following manner:
 * <dl>
 *     <!--<dt>queueRequests</dt>
 *     <dd>If a request is already in progress, wait until response is returned before sending the next request.</dd>
 *     <dt>cancelStaleRequests</dt>
 *     <dd>If a request is already in progress, cancel it before sending the next request.</dd>-->
 *     <dt>ignoreStaleResponses</dt>
 *     <dd>Send all requests, but handle only the response for the most recently sent request.</dd>
 *     <dt>allowAll</dt>
 *     <dd>Send all requests and handle all responses.</dd>
 * </dl>
 *
 * @attribute asyncMode
 * @type String
 * @default "allowAll"
 */
asyncMode: {
    value: "allowAll"
},

/**
 * Callback string parameter name sent to the remote script. By default,
 * requests are sent to
 * &#60;URI&#62;?&#60;scriptCallbackParam&#62;=callbackFunction
 *
 * @attribute scriptCallbackParam
 * @type String
 * @default "callback"
 */
scriptCallbackParam : {
    value: "callback"
},

/**
 * Accepts the DataSource instance and a callback ID, and returns a callback
 * param/value string that gets appended to the script URI. Implementers
 * can customize this string to match their server's query syntax.
 *
 * @attribute generateRequestCallback
 * @type Function
 */
generateRequestCallback : {
    value: function(self, id) {
        return "&" + self.get("scriptCallbackParam") + "=YUI.Env.DataSource.callbacks["+id+"]" ;
    }
}





    },

    /**
     * Global array of callback functions, one for each request sent.
     *
     * @property callbacks
     * @type Function[]
     * @static
     */
    callbacks : [],

    /**
     * Unique ID to track requests.
     *
     * @property _tId
     * @type Number
     * @private
     * @static
     */
    _tId : 0
});
    
Y.extend(DSGet, Y.DataSource.Local, {
    /**
     * Passes query string to Get Utility. Fires <code>response</code> event when
     * response is received asynchronously.
     *
     * @method _defRequestFn
     * @param e {Event.Facade} Event Facade with the following properties:
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
     *     <dl>
     *         <dt>success (Function)</dt> <dd>Success handler.</dd>
     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
     *     </dl>
     * </dd>
     * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
     * </dl>
     * @protected
     */
    _defRequestFn: function(e) {
        var uri = this.get("source"),
            get = this.get("get"),
            id = DSGet._tId++,
            self = this;
            












    // Dynamically add handler function with a closure to the callback stack
    YUI.Env.DataSource.callbacks[id] = Y.rbind(function(response) {
        if((self.get("asyncMode") !== "ignoreStaleResponses")||
                (id === DSGet.callbacks.length-1)) { // Must ignore stale responses

            self.fire("data", Y.mix({data:response}, e));
        }
        else {
        }

        delete DSGet.callbacks[id];
    }, this, id);

    // We are now creating a request
    uri += e.request + this.get("generateRequestCallback")(this, id);
    //uri = this.doBefore(sUri);
    get.script(uri, {
        autopurge: true,
        // Works in Firefox only....
        onFailure: Y.bind(function(e) {
            e.error = new Error("Script node data failure");
            this.fire("error", e);
        }, this, e)
    });















        return e.tId;
    }
});
  
Y.DataSource.Get = DSGet;
YUI.namespace("Env.DataSource.callbacks");
    



}, '@VERSION@' ,{requires:['datasource-local', 'get']});

YUI.add('datasource-function', function(Y) {

/**
 * Provides a DataSource implementation which can be used to retrieve data from a custom function.
 *
 * @module datasource
 * @submodule datasource-function
 */

/**
 * Function subclass for the DataSource Utility.
 * @class DataSource.Function
 * @extends DataSource.Local
 * @constructor
 */    
var LANG = Y.Lang,

    DSFn = function() {
        DSFn.superclass.constructor.apply(this, arguments);
    };
    

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource.Function static properties
    //
    /////////////////////////////////////////////////////////////////////////////
Y.mix(DSFn, {
    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static     
     * @final
     * @value "dataSourceFunction"
     */
    NAME: "dataSourceFunction",


    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource.Function Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {
        /**
        * @attribute source
        * @description Pointer to live data.
        * @type MIXED
        * @default null
        */
        source: {
            validator: LANG.isFunction
        }
    }
});
    
Y.extend(DSFn, Y.DataSource.Local, {
    /**
     * Passes query string to IO. Fires <code>response</code> event when
     * response is received asynchronously.
     *
     * @method _defRequestFn
     * @param e {Event.Facade} Event Facade with the following properties:
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
     *     <dl>
     *         <dt>success (Function)</dt> <dd>Success handler.</dd>
     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
     *     </dl>
     * </dd>
     * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
     * </dl>
     * @protected
     */
    _defRequestFn: function(e) {
        var fn = this.get("source"),
            response;
            
            if(fn) {
                try {
                    response = fn(e.request, this, e);
                    this.fire("data", Y.mix({data:response}, e));
                }
                catch(error) {
                    e.error = error;
                    this.fire("error", e);
                }
            }
            else {
                e.error = new Error("Function data failure");
                this.fire("error", e);
            }
            
        return e.tId;
    }
});
  
Y.DataSource.Function = DSFn;
    



}, '@VERSION@' ,{requires:['datasource-local']});

YUI.add('datasource-cache', function(Y) {

/**
 * Extends DataSource with caching functionality.
 *
 * @module datasource
 * @submodule datasource-cache
 */

/**
 * Adds cacheability to the DataSource Utility.
 * @class DataSourceCache
 * @extends Cache
 */    
var DataSourceCache = function() {
    DataSourceCache.superclass.constructor.apply(this, arguments);
};

Y.mix(DataSourceCache, {
    /**
     * The namespace for the plugin. This will be the property on the host which
     * references the plugin instance.
     *
     * @property NS
     * @type String
     * @static
     * @final
     * @value "cache"
     */
    NS: "cache",

    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "dataSourceCache"
     */
    NAME: "dataSourceCache",

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSourceCache Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {

    }
});

Y.extend(DataSourceCache, Y.Cache, {
    /**
    * Internal init() handler.
    *
    * @method initializer
    * @param config {Object} Config object.
    * @private
    */
    initializer: function(config) {
        this.doBefore("_defRequestFn", this._beforeDefRequestFn);
        this.doBefore("_defResponseFn", this._beforeDefResponseFn);
    },

    /**
     * First look for cached response, then send request to live data.
     *
     * @method _beforeDefRequestFn
     * @param e {Event.Facade} Event Facade with the following properties:
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object.</dd>
     * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
     * </dl>
     * @protected
     */
    _beforeDefRequestFn: function(e) {
        // Is response already in the Cache?
        var entry = (this.retrieve(e.request)) || null;
        if(entry && entry.response) {
            this.get("host").fire("response", Y.mix({response: entry.response}, e));
            return new Y.Do.Halt("DataSourceCache plugin halted _defRequestFn");
        }
    },
    
    /**
     * Adds data to cache before returning data.
     *
     * @method _beforeDefResponseFn
     * @param e {Event.Facade} Event Facade with the following properties:
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
     *     <dl>
     *         <dt>success (Function)</dt> <dd>Success handler.</dd>
     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
     *     </dl>
     * </dd>
     * <dt>data (Object)</dt> <dd>Raw data.</dd>
     * <dt>response (Object)</dt> <dd>Normalized response object with the following properties:
     *     <dl>
     *         <dt>cached (Object)</dt> <dd>True when response is cached.</dd>
     *         <dt>results (Object)</dt> <dd>Parsed results.</dd>
     *         <dt>meta (Object)</dt> <dd>Parsed meta data.</dd>
     *         <dt>error (Object)</dt> <dd>Error object.</dd>
     *     </dl>
     * </dd>
     * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
     * </dl>
     * @protected
     */
     _beforeDefResponseFn: function(e) {
        // Add to Cache before returning
        if(e.response && !e.response.cached) {
            e.response.cached = true;
            this.add(e.request, e.response, (e.callback && e.callback.argument));
        }
     }
});

Y.namespace('Plugin').DataSourceCache = DataSourceCache;



}, '@VERSION@' ,{requires:['datasource-local', 'cache']});

YUI.add('datasource-jsonschema', function(Y) {

/**
 * Extends DataSource with schema-parsing on JSON data.
 *
 * @module datasource
 * @submodule datasource-jsonschema
 */

/**
 * Adds schema-parsing to the DataSource Utility.
 * @class DataSourceJSONSchema
 * @extends Plugin.Base
 */    
var DataSourceJSONSchema = function() {
    DataSourceJSONSchema.superclass.constructor.apply(this, arguments);
};

Y.mix(DataSourceJSONSchema, {
    /**
     * The namespace for the plugin. This will be the property on the host which
     * references the plugin instance.
     *
     * @property NS
     * @type String
     * @static
     * @final
     * @value "schema"
     */
    NS: "schema",

    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "dataSourceJSONSchema"
     */
    NAME: "dataSourceJSONSchema",

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSourceJSONSchema Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {
        schema: {
            //value: {}
        }
    }
});

Y.extend(DataSourceJSONSchema, Y.Plugin.Base, {
    /**
    * Internal init() handler.
    *
    * @method initializer
    * @param config {Object} Config object.
    * @private
    */
    initializer: function(config) {
        this.doBefore("_defDataFn", this._beforeDefDataFn);
    },

    /**
     * Parses raw data into a normalized response.
     *
     * @method _beforeDefDataFn
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
     *     <dl>
     *         <dt>success (Function)</dt> <dd>Success handler.</dd>
     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
     *     </dl>
     * </dd>
     * <dt>data (Object)</dt> <dd>Raw data.</dd>
     * </dl>
     * @protected
     */
    _beforeDefDataFn: function(e) {
        var data = (Y.DataSource.IO && (this.get("host") instanceof Y.DataSource.IO) && Y.Lang.isString(e.data.responseText)) ? e.data.responseText : e.data,
            response = Y.DataSchema.JSON.apply(this.get("schema"), data);
            
        // Default
        if(!response) {
            response = {
                meta: {},
                results: data
            };
        }
        
        this.get("host").fire("response", Y.mix({response:response}, e));
        return new Y.Do.Halt("DataSourceJSONSchema plugin halted _defDataFn");
    }
});
    
Y.namespace('Plugin').DataSourceJSONSchema = DataSourceJSONSchema;



}, '@VERSION@' ,{requires:['plugin', 'datasource-local', 'dataschema-json']});

YUI.add('datasource-xmlschema', function(Y) {

/**
 * Extends DataSource with schema-parsing on XML data.
 *
 * @module datasource
 * @submodule datasource-xmlschema
 */

/**
 * Adds schema-parsing to the DataSource Utility.
 * @class DataSourceXMLSchema
 * @extends Plugin.Base
 */    
var DataSourceXMLSchema = function() {
    DataSourceXMLSchema.superclass.constructor.apply(this, arguments);
};

Y.mix(DataSourceXMLSchema, {
    /**
     * The namespace for the plugin. This will be the property on the host which
     * references the plugin instance.
     *
     * @property NS
     * @type String
     * @static
     * @final
     * @value "schema"
     */
    NS: "schema",

    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "dataSourceXMLSchema"
     */
    NAME: "dataSourceXMLSchema",

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSourceXMLSchema Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {
        schema: {
            //value: {}
        }
    }
});

Y.extend(DataSourceXMLSchema, Y.Plugin.Base, {
    /**
    * Internal init() handler.
    *
    * @method initializer
    * @param config {Object} Config object.
    * @private
    */
    initializer: function(config) {
        this.doBefore("_defDataFn", this._beforeDefDataFn);
    },

    /**
     * Parses raw data into a normalized response.
     *
     * @method _beforeDefDataFn
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
     *     <dl>
     *         <dt>success (Function)</dt> <dd>Success handler.</dd>
     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
     *     </dl>
     * </dd>
     * <dt>data (Object)</dt> <dd>Raw data.</dd>
     * </dl>
     * @protected
     */
    _beforeDefDataFn: function(e) {
        var data = (Y.DataSource.IO && (this.get("host") instanceof Y.DataSource.IO) && e.data.responseXML && (e.data.responseXML.nodeType === 9)) ? e.data.responseXML : e.data,
            response = Y.DataSchema.XML.apply(this.get("schema"), data);
            
        // Default
        if(!response) {
            response = {
                meta: {},
                results: data
            };
        }
        
        this.get("host").fire("response", Y.mix({response:response}, e));
        return new Y.Do.Halt("DataSourceXMLSchema plugin halted _defDataFn");
    }
});
    
Y.namespace('Plugin').DataSourceXMLSchema = DataSourceXMLSchema;



}, '@VERSION@' ,{requires:['plugin', 'datasource-local', 'dataschema-xml']});

YUI.add('datasource-arrayschema', function(Y) {

/**
 * Extends DataSource with schema-parsing on array data.
 *
 * @module datasource
 * @submodule datasource-arrayschema
 */

/**
 * Adds schema-parsing to the DataSource Utility.
 * @class DataSourceArraySchema
 * @extends Plugin.Base
 */    
var DataSourceArraySchema = function() {
    DataSourceArraySchema.superclass.constructor.apply(this, arguments);
};

Y.mix(DataSourceArraySchema, {
    /**
     * The namespace for the plugin. This will be the property on the host which
     * references the plugin instance.
     *
     * @property NS
     * @type String
     * @static
     * @final
     * @value "schema"
     */
    NS: "schema",

    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "dataSourceArraySchema"
     */
    NAME: "dataSourceArraySchema",

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSourceArraySchema Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {
        schema: {
            //value: {}
        }
    }
});

Y.extend(DataSourceArraySchema, Y.Plugin.Base, {
    /**
    * Internal init() handler.
    *
    * @method initializer
    * @param config {Object} Config object.
    * @private
    */
    initializer: function(config) {
        this.doBefore("_defDataFn", this._beforeDefDataFn);
    },

    /**
     * Parses raw data into a normalized response.
     *
     * @method _beforeDefDataFn
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
     *     <dl>
     *         <dt>success (Function)</dt> <dd>Success handler.</dd>
     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
     *     </dl>
     * </dd>
     * <dt>data (Object)</dt> <dd>Raw data.</dd>
     * </dl>
     * @protected
     */
    _beforeDefDataFn: function(e) {
        var data = (Y.DataSource.IO && (this.get("host") instanceof Y.DataSource.IO) && Y.Lang.isString(e.data.responseText)) ? e.data.responseText : e.data,
            response = Y.DataSchema.Array.apply(this.get("schema"), data);
            
        // Default
        if(!response) {
            response = {
                meta: {},
                results: data
            };
        }
        
        this.get("host").fire("response", Y.mix({response:response}, e));
        return new Y.Do.Halt("DataSourceArraySchema plugin halted _defDataFn");
    }
});
    
Y.namespace('Plugin').DataSourceArraySchema = DataSourceArraySchema;



}, '@VERSION@' ,{requires:['plugin', 'datasource-local', 'dataschema-array']});

YUI.add('datasource-textschema', function(Y) {

/**
 * Extends DataSource with schema-parsing on text data.
 *
 * @module datasource
 * @submodule datasource-textschema
 */

/**
 * Adds schema-parsing to the DataSource Utility.
 * @class DataSourceTextSchema
 * @extends Plugin.Base
 */    
var DataSourceTextSchema = function() {
    DataSourceTextSchema.superclass.constructor.apply(this, arguments);
};

Y.mix(DataSourceTextSchema, {
    /**
     * The namespace for the plugin. This will be the property on the host which
     * references the plugin instance.
     *
     * @property NS
     * @type String
     * @static
     * @final
     * @value "schema"
     */
    NS: "schema",

    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "dataSourceTextSchema"
     */
    NAME: "dataSourceTextSchema",

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSourceTextSchema Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {
        schema: {
            //value: {}
        }
    }
});

Y.extend(DataSourceTextSchema, Y.Plugin.Base, {
    /**
    * Internal init() handler.
    *
    * @method initializer
    * @param config {Object} Config object.
    * @private
    */
    initializer: function(config) {
        this.doBefore("_defDataFn", this._beforeDefDataFn);
    },

    /**
     * Parses raw data into a normalized response.
     *
     * @method _beforeDefDataFn
     * <dl>
     * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
     * <dt>request (Object)</dt> <dd>The request.</dd>
     * <dt>callback (Object)</dt> <dd>The callback object with the following properties:
     *     <dl>
     *         <dt>success (Function)</dt> <dd>Success handler.</dd>
     *         <dt>failure (Function)</dt> <dd>Failure handler.</dd>
     *     </dl>
     * </dd>
     * <dt>data (Object)</dt> <dd>Raw data.</dd>
     * </dl>
     * @protected
     */
    _beforeDefDataFn: function(e) {
        var data = (Y.DataSource.IO && (this.get("host") instanceof Y.DataSource.IO) && Y.Lang.isString(e.data.responseText)) ? e.data.responseText : e.data,
            response = Y.DataSchema.Text.apply(this.get("schema"), data);
            
        // Default
        if(!response) {
            response = {
                meta: {},
                results: data
            };
        }
        
        this.get("host").fire("response", Y.mix({response:response}, e));
        return new Y.Do.Halt("DataSourceTextSchema plugin halted _defDataFn");
    }
});
    
Y.namespace('Plugin').DataSourceTextSchema = DataSourceTextSchema;



}, '@VERSION@' ,{requires:['plugin', 'datasource-local', 'dataschema-text']});

YUI.add('datasource-polling', function(Y) {

/**
 * Extends DataSource with polling functionality.
 *
 * @module datasource
 * @submodule datasource-polling
 */
    
/**
 * Adds polling to the DataSource Utility.
 * @class Pollable
 * @extends DataSource.Local
 */    
var LANG = Y.Lang,

    Pollable = function() {
        this._intervals = {};
    };

Pollable.prototype = {

    /**
    * @property _intervals
    * @description Hash of polling interval IDs that have been enabled,
    * stored here to be able to clear all intervals.
    * @private
    */
    _intervals: null,

    /**
     * Sets up a polling mechanism to send requests at set intervals and forward
     * responses to given callback.
     *
     * @method setInterval
     * @param msec {Number} Length of interval in milliseconds.
     * @param request {Object} Request object.
     * @param callback {Object} An object literal with the following properties:
     *     <dl>
     *     <dt><code>success</code></dt>
     *     <dd>The function to call when the data is ready.</dd>
     *     <dt><code>failure</code></dt>
     *     <dd>The function to call upon a response failure condition.</dd>
     *     <dt><code>argument</code></dt>
     *     <dd>Arbitrary data that will be passed back to the success and failure handlers.</dd>
     *     </dl>
     * @return {Number} Interval ID.
     */
    setInterval: function(msec, request, callback) {
        var x = Y.later(msec, this, this.sendRequest, [request, callback], true);
        this._intervals[x.id] = x;
        return x.id;
    },

    /**
     * Disables polling mechanism associated with the given interval ID.
     *
     * @method clearInterval
     * @param id {Number} Interval ID.
     */
    clearInterval: function(id, key) {
        // In case of being called by clearAllIntervals()
        id = key || id;
        if(this._intervals[id]) {
            // Clear the interval
            this._intervals[id].cancel();
            // Clear from tracker
            delete this._intervals[id];
        }
    },

    /**
     * Clears all intervals.
     *
     * @method clearAllIntervals
     */
    clearAllIntervals: function() {
        Y.each(this._intervals, this.clearInterval, this);
    }
};
    
Y.augment(Y.DataSource.Local, Pollable);



}, '@VERSION@' ,{requires:['datasource-local']});



YUI.add('datasource', function(Y){}, '@VERSION@' ,{use:['datasource-local','datasource-io','datasource-get','datasource-function','datasource-cache','datasource-jsonschema','datasource-xmlschema','datasource-arrayschema','datasource-textschema','datasource-polling']});

