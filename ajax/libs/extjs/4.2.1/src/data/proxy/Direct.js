/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
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

    /**
     * @cfg {Object} extraParams
     * Extra parameters that will be included on every read request. Individual requests with params
     * of the same name will override these params when they are in conflict.
     */

    // private
    paramOrderRe: /[\s,|]/,

    constructor: function(config){
        var me = this,
            paramOrder;
            
        me.callParent(arguments);
        
        paramOrder = me.paramOrder;
        if (Ext.isString(paramOrder)) {
            me.paramOrder = paramOrder.split(me.paramOrderRe);
        }
    },
    
    resolveMethods: function() {
        var me = this,
            fn = me.directFn,
            api = me.api,
            Manager = Ext.direct.Manager,
            method;
        
        if (fn) {
            method = me.directFn = Manager.parseMethod(fn);
            
            if (!Ext.isFunction(method)) {
                Ext.Error.raise('Cannot resolve directFn ' + fn);
            }
        }
        else if (api) {
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

    doRequest: function(operation, callback, scope) {
        var me = this,
            writer = me.getWriter(),
            request = me.buildRequest(operation),
            params = request.params,
            args = [],
            fn, method;
        
        if (!me.methodsResolved) {
            me.resolveMethods();
        }

        fn = me.api[request.action] || me.directFn;
        
        //<debug>
        if (!fn) {
            Ext.Error.raise('No direct function specified for this proxy');
        }
        //</debug>

        if (operation.allowWrite()) {
            request = writer.write(request);
        }

        if (operation.action == 'read') {
            // We need to pass params
            method = fn.directCfg.method;
            args = method.getArgs(params, me.paramOrder, me.paramsAsHash);
        } else {
            args.push(request.jsonData);
        }

        Ext.apply(request, {
            args: args,
            directFn: fn
        });
        args.push(me.createRequestCallback(request, operation, callback, scope), me);
        fn.apply(window, args);
    },

    /*
     * Inherit docs. We don't apply any encoding here because
     * all of the direct requests go out as jsonData
     */
    applyEncoding: Ext.identityFn,

    createRequestCallback: function(request, operation, callback, scope){
        var me = this;

        return function(data, event){
            me.processResponse(event.status, operation, request, event, callback, scope);
        };
    },

    // inherit docs
    extractResponseData: function(response){
        return Ext.isDefined(response.result) ? response.result : response.data;
    },

    // inherit docs
    setException: function(operation, response) {
        operation.setException(response.message);
    },

    // inherit docs
    buildUrl: function(){
        return '';
    }
});
