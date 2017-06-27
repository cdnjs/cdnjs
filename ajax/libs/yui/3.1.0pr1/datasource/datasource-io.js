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
