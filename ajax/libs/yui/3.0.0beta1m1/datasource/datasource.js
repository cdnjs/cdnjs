YUI.add('datasource-local', function(Y) {

/**
 * The DataSource utility provides a common configurable interface for widgets to
 * access a variety of data, from JavaScript arrays to online database servers.
 *
 * @module datasource
 */
var LANG = Y.Lang,
    
/**
 * Base class for the YUI DataSource utility.
 * @class DataSource.Local
 * @extends Base
 * @constructor
 */    
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
     * @value "DataSource.Local"
     */
    NAME: "DataSource.Local",

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
            var scope = e.callback.scope || this,
                callbackFunc = (e.error && e.callback.failure) || e.callback.success;
            if (callbackFunc) {
                callbackFunc.apply(scope, [e]);
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
    * Internal destroy() handler.
    *
    * @method destructor
    * @private        
    */
    destructor: function() {
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
         * @param e {Event.Facade} Event Facade.         
         * @param o {Object} Object with the following properties:
         * <dl>                          
         * <dt>tId (Number)</dt> <dd>Unique transaction ID.</dd>
         * <dt>request (Object)</dt> <dd>The request.</dd>
         * <dt>callback (Object)</dt> <dd>The callback object.</dd>
         * </dl>
         * @preventable _defRequestFn
         */
        //this.publish("request", {defaultFn: this._defRequestFn});
        this.publish("request", {defaultFn:function(e){
            this._defRequestFn(e);
        }});
         
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
         *         <dt>scope (Object)</dt> <dd>Execution context.</dd>
         *     </dl>
         * </dd>
         * <dt>data (Object)</dt> <dd>Raw data.</dd>
         * </dl>
         * @preventable _defDataFn
         */
        //this.publish("data", {defaultFn: this._defDataFn});
         this.publish("data", {defaultFn:function(e){
            this._defDataFn(e);
        }});

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
         *         <dt>scope (Object)</dt> <dd>Execution context.</dd>
         *     </dl>
         * </dd>
         * <dt>data (Object)</dt> <dd>Raw data.</dd>
         * <dt>response (Object)</dt> <dd>Normalized resopnse object with the following properties:
         *     <dl>
         *         <dt>results (Object)</dt> <dd>Parsed results.</dd>
         *         <dt>meta (Object)</dt> <dd>Parsed meta data.</dd>
         *         <dt>error (Boolean)</dt> <dd>Error flag.</dd>
         *     </dl>
         * </dd>
         * </dl>
         * @preventable _defResponseFn
         */
         //this.publish("response", {defaultFn: this._defResponseFn});
         this.publish("response", {defaultFn:function(e){
            this._defResponseFn(e);
        }});

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
         *         <dt>scope (Object)</dt> <dd>Execution context.</dd>
         *     </dl>
         * </dd>
         * <dt>data (Object)</dt> <dd>Raw data.</dd>
         * <dt>response (Object)</dt> <dd>Normalized resopnse object with the following properties:
         *     <dl>
         *         <dt>results (Object)</dt> <dd>Parsed results.</dd>
         *         <dt>meta (Object)</dt> <dd>Parsed meta data.</dd>
         *         <dt>error (Boolean)</dt> <dd>Error flag.</dd>
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
     *         <dt>scope (Object)</dt> <dd>Execution context.</dd>
     *     </dl>
     * </dd>
     * </dl>
     * @protected
     */
    _defRequestFn: function(e) {
        var data = this.get("source");
        
        // Problematic data
        if(LANG.isUndefined(data)) {
            e.error = true;
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
     *         <dt>scope (Object)</dt> <dd>Execution context.</dd>
     *     </dl>
     * </dd>
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
     *         <dt>scope (Object)</dt> <dd>Execution context.</dd>
     *     </dl>
     * </dd>
     * <dt>data (Object)</dt> <dd>Raw data.</dd>
     * <dt>response (Object)</dt> <dd>Normalized resopnse object with the following properties:
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
     *     <dt><code>scope</code></dt>
     *     <dd>The object to serve as the scope for the success and failure handlers.</dd>
     *     <dt><code>argument</code></dt>
     *     <dd>Arbitrary data payload that will be passed back to the success and failure handlers.</dd>
     *     </dl>
     * @return {Number} Transaction ID.
     */
    sendRequest: function(request, callback) {
        var tId = DSLocal._tId++;
        this.fire("request", {tId:tId, request:request,callback:callback});
        return tId;
    }
});
    
Y.namespace("DataSource");
Y.DataSource.Local = DSLocal;
    



}, '@VERSION@' ,{requires:['base']});

YUI.add('datasource-xhr', function(Y) {

/**
 * The DataSource utility provides a common configurable interface for widgets to
 * access a variety of data, from JavaScript arrays to online database servers.
 *
 * @module datasource
 */
    
/**
 * XHR subclass for the YUI DataSource utility.
 * @class DataSource.XHR
 * @extends DataSource.Local
 * @constructor
 */    
var DSXHR = function() {
    DSXHR.superclass.constructor.apply(this, arguments);
};
    

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource.XHR static properties
    //
    /////////////////////////////////////////////////////////////////////////////
Y.mix(DSXHR, {
    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static     
     * @final
     * @value "DataSource.XHR"
     */
    NAME: "DataSource.XHR",


    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource.XHR Attributes
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
            value: Y.io
        }
    }
});
    
Y.extend(DSXHR, Y.DataSource.Local, {
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
    * cycles enabled if queue needs to be managed (asyncMode/xhrConnMode):
    * <dl>
    *     <dt>interval {Number}</dt>
    *         <dd>Interval ID of in-progress queue.</dd>
    *     <dt>conn</dt>
    *         <dd>In-progress connection identifier (if applicable).</dd>
    *     <dt>requests {Object[]}</dt>
    *         <dd>Array of queued request objects: {request:oRequest, callback:_xhrCallback}.</dd>
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
     *         <dt>scope (Object)</dt> <dd>Execution context.</dd>
     *     </dl>
     * </dd>
     * </dl>
     * @protected
     */
    _defRequestFn: function(e) {
        var uri = this.get("source"),
            cfg = {
                on: {
                    success: function (id, response, e) {
                        this.fire("data", Y.mix({data:response}, e));
                        //{tId:args.tId, request:args.request, callback:args.callback, response:response}
                        //this.handleResponse(args.tId, args.request, args.callback, response);
                    },
                    failure: function (id, response, e) {
                        e.error = true;
                        this.fire("error", Y.mix({data:response}, e));
                        this.fire("data", Y.mix({data:response}, e));
                        //{tId:args.tId, request:args.request, callback:args.callback, response:response}
                        //this.handleResponse(args.tId, args.request, args.callback, response);
                    }
                },
                context: this,
                arguments: e
            };
        
        this.get("io")(uri, cfg);
        return e.tId;
    }
});
  
Y.DataSource.XHR = DSXHR;
    



}, '@VERSION@' ,{requires:['datasource-base']});

YUI.add('datasource-cache', function(Y) {

/**
 * Extends DataSource with caching functionality.
 *
 * @module datasource
 * @submodule datasource-cache
 */

/**
 * Adds cacheability to the YUI DataSource utility.
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
     * @value "DataSourceCache"
     */
    NAME: "DataSourceCache",

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
     * </dl>
     * @protected
     */
    _beforeDefRequestFn: function(e) {
        // Is response already in the Cache?
        var entry = (this.retrieve(e.request)) || null;
        if(entry && entry.response) {
            this._owner.fire("response", Y.mix({response: entry.response}, e));
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
     *         <dt>scope (Object)</dt> <dd>Execution context.</dd>
     *     </dl>
     * </dd>
     * <dt>data (Object)</dt> <dd>Raw data.</dd>
     * <dt>response (Object)</dt> <dd>Normalized resopnse object with the following properties:
     *     <dl>
     *         <dt>results (Object)</dt> <dd>Parsed results.</dd>
     *         <dt>meta (Object)</dt> <dd>Parsed meta data.</dd>
     *         <dt>error (Boolean)</dt> <dd>Error flag.</dd>
     *     </dl>
     * </dd>
     * </dl>
     * @protected
     */
     _beforeDefResponseFn: function(e) {
        // Add to Cache before returning
        this.add(e.request, e.response, (e.callback && e.callback.argument));
     }
});

Y.namespace('plugin');
Y.plugin.DataSourceCache = DataSourceCache;



}, '@VERSION@' ,{requires:['plugin', 'datasource-base', 'cache']});

YUI.add('datasource-jsonparser', function(Y) {

/**
 * Extends DataSource with schema-based JSON parsing functionality.
 *
 * @module datasource
 * @submodule datasource-dataparser
 */

/**
 * Adds parsability to the YUI DataSource utility.
 * @class DataSourceJSONParser
 * @extends Plugin
 */    
var DataSourceJSONParser = function() {
    DataSourceJSONParser.superclass.constructor.apply(this, arguments);
};

Y.mix(DataSourceJSONParser, {
    /**
     * The namespace for the plugin. This will be the property on the host which
     * references the plugin instance.
     *
     * @property NS
     * @type String
     * @static
     * @final
     * @value "parser"
     */
    NS: "parser",

    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static
     * @final
     * @value "DataSourceJSONParser"
     */
    NAME: "DataSourceJSONParser",

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSourceCache Attributes
    //
    /////////////////////////////////////////////////////////////////////////////

    ATTRS: {
        parser: {
            readOnly: true,
            value: Y.DataParser.JSON,
            useRef: true
        },
        schema: {
            //value: {}
        }
    }
});

Y.extend(DataSourceJSONParser, Y.Plugin, {
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
     *         <dt>scope (Object)</dt> <dd>Execution context.</dd>
     *     </dl>
     * </dd>
     * <dt>data (Object)</dt> <dd>Raw data.</dd>
     * </dl>
     * @protected
     */
    _beforeDefDataFn: function(e) {
        var response = (this.get("parser").parse(this.get("schema"), e.data));
        if(!response) {
            response = {
                meta: {},
                results: e.data
            };
        }
        this._owner.fire("response", Y.mix({response:response}, e));
        return new Y.Do.Halt("DataSourceJSONParser plugin halted _defDataFn");
    }
});
    
Y.namespace('plugin');
Y.plugin.DataSourceJSONParser = DataSourceJSONParser;



}, '@VERSION@' ,{requires:['plugin', 'datasource-base', 'dataparser-json']});

YUI.add('datasource-polling', function(Y) {

/**
 * Extends DataSource with polling functionality.
 *
 * @module datasource
 * @submodule datasource-polling
 */
    var LANG = Y.Lang,
    
    /**
     * Adds polling to the YUI DataSource utility.
     * @class Pollable
     * @extends DataSource.Local
     */    
    Pollable = function() {};

    
Pollable.prototype = {

    /**
    * @property _intervals
    * @description Array of polling interval IDs that have been enabled,
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
     *     <dt><code>scope</code></dt>
     *     <dd>The object to serve as the scope for the success and failure handlers.</dd>
     *     <dt><code>argument</code></dt>
     *     <dd>Arbitrary data that will be passed back to the success and failure handlers.</dd>
     *     </dl>
     * @return {Number} Interval ID.
     */
    setInterval: function(msec, request, callback) {
        if(LANG.isNumber(msec) && (msec >= 0)) {
            var self = this,
                id = setInterval(function() {
                    self.sendRequest(request, callback);
                    //self._makeConnection(request, callback);
                }, msec);
            if(!this._intervals) {
                this._intervals = [];
            }
            this._intervals.push(id);
            return id;
        }
        else {
        }
    },

    /**
     * Disables polling mechanism associated with the given interval ID.
     *
     * @method clearInterval
     * @param id {Number} Interval ID.
     */
    clearInterval: function(id) {
        // Remove from tracker if there
        var tracker = this._intervals || [],
            i = tracker.length-1;

        for(; i>-1; i--) {
            if(tracker[i] === id) {
                tracker.splice(i,1);
                clearInterval(id);
            }
        }
    },

    /**
     * Clears all intervals.
     *
     * @method clearAllIntervals
     */
    clearAllIntervals: function() {
        for(var i = tracker.length-1; i>-1; i--) {
            clearInterval(id);
        }
        
        this._intervals = []
    }
};
    
Y.Base.build(Y.DataSource.Local.NAME, Y.DataSource.Local, [Pollable], {dynamic:false});



}, '@VERSION@' ,{requires:['datasource-base']});



YUI.add('datasource', function(Y){}, '@VERSION@' ,{use:['datasource-local','datasource-xhr','datasource-cache','datasource-jsonparser','datasource-polling']});

