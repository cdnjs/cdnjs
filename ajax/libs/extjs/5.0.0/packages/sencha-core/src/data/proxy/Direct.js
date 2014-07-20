/**
 * This class is used to send requests to the server using {@link Ext.direct.Manager Ext.Direct}. When a
 * request is made, the transport mechanism is handed off to the appropriate
 * {@link Ext.direct.RemotingProvider Provider} to complete the call.
 *
 * # Specifying the function
 *
 * This proxy expects a Direct remoting method to be passed in order to be able to complete requests.
 * This can be done by specifying the {@link #directFn} configuration. This will use the same direct
 * method for all requests. Alternatively, you can provide an {@link #api} configuration. This
 * allows you to specify a different remoting method for each CRUD action.
 *
 * # Parameters
 *
 * This proxy provides options to help configure which parameters will be sent to the server.
 * By specifying the {@link #paramsAsHash} option, it will send an object literal containing each
 * of the passed parameters. The {@link #paramOrder} option can be used to specify the order in which
 * the remoting method parameters are passed.
 *
 * # Example Usage
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['firstName', 'lastName'],
 *         proxy: {
 *             type: 'direct',
 *             directFn: MyApp.getUsers,
 *             paramOrder: 'id' // Tells the proxy to pass the id as the first parameter to the remoting method.
 *         }
 *     });
 *     User.load(1);
 */
Ext.define('Ext.data.proxy.Direct', {
    /* Begin Definitions */

    extend: 'Ext.data.proxy.Server',
    alternateClassName: 'Ext.data.DirectProxy',

    alias: 'proxy.direct',

    requires: ['Ext.direct.Manager'],

    /* End Definitions */

    /**
     * @cfg url
     * @hide
     */

    config: {
        /**
        * @cfg {String/String[]} paramOrder
        * Defaults to undefined. A list of params to be executed server side.  Specify the params in the order in
        * which they must be executed on the server-side as either (1) an Array of String values, or (2) a String
        * of params delimited by either whitespace, comma, or pipe. For example, any of the following would be
        * acceptable:
        *
        *     paramOrder: ['param1','param2','param3']
        *     paramOrder: 'param1 param2 param3'
        *     paramOrder: 'param1,param2,param3'
        *     paramOrder: 'param1|param2|param'
        */
        paramOrder: undefined,

        /**
        * @cfg {Boolean} paramsAsHash
        * Send parameters as a collection of named arguments.
        * Providing a {@link #paramOrder} nullifies this configuration.
        */
        paramsAsHash: true,

        /**
        * @cfg {Function/String} directFn
        * Function to call when executing a request. directFn is a simple alternative to defining the api configuration-parameter
        * for Store's which will not implement a full CRUD api. The directFn may also be a string reference to the fully qualified
        * name of the function, for example: 'MyApp.company.GetProfile'. This can be useful when using dynamic loading. The string 
        * will be looked up when the proxy is created.
        */
        directFn : undefined,

        /**
        * @cfg {Object} api
        * The same as {@link Ext.data.proxy.Server#api}, however instead of providing urls, you should provide a direct
        * function call. See {@link #directFn}.
        */
        api: undefined
    },

    // private
    paramOrderRe: /[\s,|]/,
    
    applyParamOrder: function(paramOrder) {
        if (Ext.isString(paramOrder)) {
            paramOrder = paramOrder.split(this.paramOrderRe);
        }
        return paramOrder;
    },
    
    resolveMethods: function() {
        var me = this,
            fn = me.getDirectFn(),
            api = me.getApi(),
            Manager = Ext.direct.Manager,
            method;
        
        if (fn) {
            me.setDirectFn(method = Manager.parseMethod(fn));
            
            if (!Ext.isFunction(method)) {
                Ext.Error.raise('Cannot resolve directFn ' + fn);
            }
        } else if (api) {
            for (fn in api) {
                if (api.hasOwnProperty(fn)) {
                    method = api[fn];
                    api[fn] = Manager.parseMethod(method);
                    
                    if (!Ext.isFunction(api[fn])) {
                        Ext.Error.raise('Cannot resolve Direct api ' + fn + ' method ' + method);
                    }
                }
            }
        }
        
        me.methodsResolved = true;
    },

    doRequest: function(operation) {
        var me = this,
            writer = me.getWriter(),
            request = me.buildRequest(operation),
            params = request.getParams(),
            args = [],
            action = request.getAction(),
            api = me.getApi(),
            fn, method;
        
        if (!me.methodsResolved) {
            me.resolveMethods();
        }

        if (api) {
            fn = api[action];
        }
        fn = fn || me.getDirectFn();
        
        //<debug>
        if (!fn) {
            Ext.Error.raise('No direct function specified for this proxy');
        }
        //</debug>

        if (writer && operation.allowWrite()) {
            request = writer.write(request);
        }
        
        if (action === 'read') {
            // We need to pass params
            method = fn.directCfg.method;
            args = method.getArgs(params, me.getParamOrder(), me.getParamsAsHash());
        } else {
            args.push(request.getJsonData());
        }

        args.push(me.createRequestCallback(request, operation), me);
        request.setConfig({
            args: args,
            directFn: fn
        });
        
        fn.apply(window, args);
        
        // Store expects us to return something to indicate that the request
        // is pending; not doing so will make a buffered Store repeat the
        // requests over and over. See https://sencha.jira.com/browse/EXTJSIV-11757
        return request;
    },

    /**
     * @inheritdoc
     */
    applyEncoding: Ext.identityFn,

    createRequestCallback: function(request, operation){
        var me = this;

        return function(data, event){
            me.processResponse(event.status, operation, request, event);
        };
    },

    /**
     * @inheritdoc
     */
    extractResponseData: function(response){
        return Ext.isDefined(response.result) ? response.result : response.data;
    },

    /**
     * @inheritdoc
     */
    setException: function(operation, response) {
        operation.setException(response.message);
    },

    /**
     * @inheritdoc
     */
    buildUrl: function(){
        return '';
    }
});
