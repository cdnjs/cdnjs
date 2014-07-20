/**
 * @author Ed Spencer
 * 
 * Simple class that represents a Request that will be made by any {@link Ext.data.proxy.Server} subclass.
 * All this class does is standardize the representation of a Request as used by any ServerProxy subclass,
 * it does not contain any actual logic or perform the request itself.
 */
Ext.define('Ext.data.Request', {
    config: {
        /**
         * @cfg {String} action
         * The name of the action this Request represents. Usually one of 'create', 'read', 'update' or 'destroy'.
         */
        action: undefined,

        /**
         * @cfg {Object} params
         * HTTP request params. The Proxy and its Writer have access to and can modify this object.
         */
        params: undefined,

        /**
         * @cfg {String} method
         * The HTTP method to use on this Request. Should be one of 'GET', 'POST', 'PUT' or 'DELETE'.
         */
        method: 'GET',

        /**
         * @cfg {String} url
         * The url to access on this Request.
         */
        url: null,

        /**
         * @cfg {Ext.data.operation.Operation} operation
         * The operation this request belongs to.
         */
        operation: null,

        /**
         * @cfg {Ext.data.proxy.Proxy} proxy
         * The proxy this request belongs to.
         */
        proxy: null,

        /**
         * @cfg {Boolean} disableCaching
         * Whether or not to disable caching for this request.
         */
        disableCaching: false,

        /**
         * @cfg {Object} headers
         * Some requests (like XMLHttpRequests) want to send additional server headers.
         * This configuration can be set for those types of requests.
         */
        headers: {},

        /**
         * @cfg {String} callbackKey
         * Some requests (like JsonP) want to send an additional key that contains
         * the name of the callback function.
         */
        callbackKey: null,

        /**
         * @cfg {Ext.data.JsonP} rawRequest
         * Set the raw request object (Ajax/JsonP/Other)
         * @private
         */
        rawRequest: null,

        /**
         * @cfg {Object} jsonData
         * This is used by some write actions to attach data to the request without encoding it
         * as a parameter.
         */
        jsonData: undefined,

        /**
         * @cfg {Object} xmlData
         * This is used by some write actions to attach data to the request without encoding it
         * as a parameter, but instead sending it as XML.
         */
        xmlData: undefined,

        /**
         * @cfg {Boolean} withCredentials
         * This field is necessary when using cross-origin resource sharing.
         */
        withCredentials: false,

        /**
         * @cfg {String} username
         * Most oData feeds require basic HTTP authentication. This configuration allows
         * you to specify the username.
         * @accessor
         */
        username: null,

        /**
         * @cfg {String} password
         * Most oData feeds require basic HTTP authentication. This configuration allows
         * you to specify the password.
         * @accessor
         */
        password: null,
        
        /**
        * @cfg {Boolean} binary
        * True to request binary data from the server.  This feature requires
        * the use of a binary reader such as {@link Ext.data.amf.Reader AMF Reader}
        */
        binary: false,

        callback: null,
        scope: null,
        timeout: 30000,
        records: null,

        // The following two configurations are only used by Ext.data.proxy.Direct and are just
        // for being able to retrieve them after the request comes back from the server.
        directFn: null,
        args: null,
        useDefaultXhrHeader: null
    },

    /**
     * Creates the Request object.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        this.initConfig(config);
    },
    
    /**
     * Gets a single param from the {@link #params}.
     * @param {String} key The key for the param.
     * @return {Object} The value for the param. `undefined` if it does not exist.
     */
    getParam: function(key) {
        var params = this.getParams(),
            val;
            
        if (params) {
            return params[key];
        }
        return val;
    },
    
    /**
     * Sets a single param value in the {@link #params}.
     * @param {String} key The key to set.
     * @param {Object} value The value to set.
     */
    setParam: function(key, value) {
        var params = this.getParams() || {};
        params[key] = value;
        this.setParams(params);
    }
});