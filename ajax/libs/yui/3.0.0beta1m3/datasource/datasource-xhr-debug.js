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
     * @value "dataSourceXHR"
     */
    NAME: "dataSourceXHR",


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
            value: Y.io,
            cloneDefaultValue: false
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
     * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
     * </dl>
     * @protected
     */
    _defRequestFn: function(e) {
        var uri = this.get("source"),
            cfg = Y.mix(e.cfg, {
                on: {
                    success: function (id, response, e) {
                        this.fire("data", Y.mix({data:response}, e));
                        Y.log("Received XHR data response for \"" + e.request + "\"", "info", "datasource-xhr");
                    },
                    failure: function (id, response, e) {
                        e.error = new Error("XHR data failure");
                        this.fire("error", Y.mix({data:response}, e));
                        this.fire("data", Y.mix({data:response}, e));
                        Y.log("Received XHR data response for \"" + e.request + "\"", "info", "datasource-xhr");
                    }
                },
                context: this,
                arguments: e
            });
        
        this.get("io")(uri, cfg);
        return e.tId;
    }
});
  
Y.DataSource.XHR = DSXHR;
    



}, '@VERSION@' ,{requires:['datasource-local', 'io']});
