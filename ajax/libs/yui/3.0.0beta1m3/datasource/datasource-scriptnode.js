YUI.add('datasource-scriptnode', function(Y) {

/**
 * The DataSource utility provides a common configurable interface for widgets to
 * access a variety of data, from JavaScript arrays to online database servers.
 *
 * @module datasource
 */
    
/**
 * Dynamic script node subclass for the YUI DataSource utility.
 * @class DataSource.ScriptNode
 * @extends DataSource.Local
 * @constructor
 */    
var DSSN = function() {
    DSSN.superclass.constructor.apply(this, arguments);
};
    

    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource.ScriptNode static properties
    //
    /////////////////////////////////////////////////////////////////////////////
Y.mix(DSSN, {
    /**
     * Class name.
     *
     * @property NAME
     * @type String
     * @static     
     * @final
     * @value "dataSourceScriptNode"
     */
    NAME: "dataSourceScriptNode",


    /////////////////////////////////////////////////////////////////////////////
    //
    // DataSource.ScriptNode Attributes
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
 * @property asyncMode
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
 * @property scriptCallbackParam
 * @type String
 * @default "callback"
 */
scriptCallbackParam : {
    value: "callback"
},

/**
 * Creates a request callback that gets appended to the script URI. Implementers
 * can customize this string to match their server's query syntax.
 *
 * @method generateRequestCallback
 * @return {String} String fragment that gets appended to script URI that
 * specifies the callback function
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
    
Y.extend(DSSN, Y.DataSource.Local, {


    /**
    * Internal init() handler.
    *
    * @method initializer
    * @param config {Object} Config object.
    * @private
    */
    initializer: function(config) {
        
    },

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
     *         <dt>scope (Object)</dt> <dd>Execution context.</dd>
     *     </dl>
     * </dd>
     * <dt>cfg (Object)</dt> <dd>Configuration object.</dd>
     * </dl>
     * @protected
     */
    _defRequestFn: function(e) {
        var uri = this.get("source"),
            get = this.get("get"),
            id = DSSN._tId++,
            self = this;
            












    // Dynamically add handler function with a closure to the callback stack
    YUI.Env.DataSource.callbacks[id] = Y.rbind(function(response) {
        if((self.get("asyncMode") !== "ignoreStaleResponses")||
                (id === DSSN.callbacks.length-1)) { // Must ignore stale responses

            self.fire("data", Y.mix({data:response}, e));
        }
        else {
        }

        delete DSSN.callbacks[id];
    }, this, id);

    // We are now creating a request
    uri += e.request + this.get("generateRequestCallback")(this, id);
    //uri = this.doBeforeGetScriptNode(sUri);
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
  
Y.DataSource.ScriptNode = DSSN;
YUI.namespace("Env.DataSource.callbacks");
    



}, '@VERSION@' ,{requires:['datasource-local', 'get']});
