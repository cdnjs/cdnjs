/**
 * The {@link Ext.direct.RemotingProvider RemotingProvider} exposes access to
 * server side methods on the client (a remote procedure call (RPC) type of
 * connection where the client can initiate a procedure on the server).
 * 
 * This allows for code to be organized in a fashion that is maintainable,
 * while providing a clear path between client and server, something that is
 * not always apparent when using URLs.
 * 
 * To accomplish this the server-side needs to describe what classes and methods
 * are available on the client-side. This configuration will typically be
 * outputted by the server-side Ext.Direct stack when the API description is built.
 */
Ext.define('Ext.direct.RemotingProvider', {
    extend: 'Ext.direct.JsonProvider', 
    alias:  'direct.remotingprovider',
    
    requires: [
        'Ext.util.MixedCollection', 
        'Ext.util.DelayedTask', 
        'Ext.direct.Transaction',
        'Ext.direct.RemotingMethod'
    ],
   
   /**
     * @cfg {Object} actions
     *
     * Object literal defining the server side actions and methods. For example, if
     * the Provider is configured with:
     *
     *      // each property within the 'actions' object represents a server side Class
     *      actions: {
     *          TestAction: [   // array of methods within each server side Class to be   
     *          {               // stubbed out on client
     *              name: 'doEcho',   // stub method will be TestAction.doEcho
     *              len:  1            
     *          }, {
     *              name: 'multiply', // name of method
     *              len:  2           // The number of parameters that will be used to create an
     *                                // array of data to send to the server side function.
     *          }, {
     *              name: 'doForm',
     *              formHandler: true // tells the client that this method handles form calls
     *          }],
     *          
     *          // These methods will be created in nested namespace TestAction.Foo
     *          'TestAction.Foo': [{
     *              name: 'ordered',  // stub method will be TestAction.Foo.ordered
     *              len:  1
     *          }, {
     *              name: 'noParams', // this method does not accept any parameters
     *              len:  0
     *          }, {
     *              name: 'named',    // stub method will be TestAction.Foo.named
     *              params: ['foo', 'bar']    // parameters are passed by name
     *          }, {
     *              name: 'namedNoStrict',
     *              params: [],       // this method accepts parameters by name
     *              strict: false     // but does not check if they are required
     *                                // and will pass any to the server side
     *          }]
     *      }
     *
     * Note that starting with 4.2, dotted Action names will generate nested objects.
     * If you wish to reverse to previous behavior, set {@link #cfg-disableNestedActions}
     * to `true`.
     *
     * In the following example a *client side* handler is used to call the
     * server side method "multiply" in the server-side "TestAction" Class:
     *
     *      TestAction.multiply(
     *          // pass two arguments to server, so specify len=2
     *          2, 4,
     *          
     *          // callback function after the server is called
     *          //  result: the result returned by the server
     *          //       e: Ext.direct.RemotingEvent object
     *          // success: true or false
     *          // options: options to be applied to method call and passed to callback
     *          function (result, e, success, options) {
     *              var t, action, method;
     *              
     *              t = e.getTransaction();
     *              action = t.action; // server side Class called
     *              method = t.method; // server side method called
     *              
     *              if (e.status) {
     *                  var answer = Ext.encode(result); // 8
     *              }
     *              else {
     *                  var msg = e.message; // failure message
     *              }
     *          },
     *          
     *          // Scope to call the callback in (optional)
     *          window,
     *          
     *          // Options to apply to this method call. This can include
     *          // Ajax.request() options; only `timeout` is supported at this time.
     *          // When timeout is set for a method call, it will be executed immediately
     *          // without buffering.
     *          // The same options object is passed to the callback so it's possible
     *          // to "forward" some data when needed.
     *          {
     *              timeout: 60000, // milliseconds
     *              foo: 'bar'
     *          }
     *      );
     *
     * In the example above, the server side "multiply" function will be passed two
     * arguments (2 and 4). The "multiply" method should return the value 8 which will be
     * available as the `result` in the callback example above. 
     */
    
    /**
     * @cfg {Boolean} [disableNestedActions=false]
     * In versions prior to 4.2, using dotted Action names was not really meaningful,
     * because it generated flat {@link #cfg-namespace} object with dotted property names.
     * For example, take this API declaration:
     *
     *      {
     *          actions: {
     *              TestAction: [{
     *                  name: 'foo',
     *                  len:  1
     *              }],
     *              'TestAction.Foo' [{
     *                  name: 'bar',
     *                  len: 1
     *              }]
     *          },
     *          namespace: 'MyApp'
     *      }
     *
     * Before 4.2, that would generate the following API object:
     *
     *      window.MyApp = {
     *          TestAction: {
     *              foo: function() { ... }
     *          },
     *          'TestAction.Foo': {
     *              bar: function() { ... }
     *          }
     *      }
     *
     * In Ext JS 4.2, we introduced new namespace handling behavior. Now the same API object
     * will be like this:
     *
     *      window.MyApp = {
     *          TestAction: {
     *              foo: function() { ... },
     *
     *              Foo: {
     *                  bar: function() { ... }
     *              }
     *          }
     *      }
     *
     * Instead of addressing Action methods array-style `MyApp['TestAction.Foo'].bar()`,
     * now it is possible to use object addressing: `MyApp.TestAction.Foo.bar()`.
     *
     * If you find this behavior undesirable, set this config option to `true`.
     */
    
    /**
     * @cfg {String/Object} namespace
     *
     * Namespace for the Remoting Provider (defaults to `Ext.global`).
     * Explicitly specify the namespace Object, or specify a String to have a
     * {@link Ext#namespace namespace} created implicitly.
     */
    
    /**
     * @cfg {String} url
     *
     * **Required**. The url to connect to the {@link Ext.direct.Manager} server-side router. 
     */
    
    /**
     * @cfg {String} [enableUrlEncode=data]
     *
     * Specify which param will hold the arguments for the method.
     */
    
    /**
     * @cfg {Number/Boolean} [enableBuffer=10]
     *
     * `true` or `false` to enable or disable combining of method
     * calls. If a number is specified this is the amount of time in milliseconds
     * to wait before sending a batched request.
     *
     * Calls which are received within the specified timeframe will be
     * concatenated together and sent in a single request, optimizing the
     * application by reducing the amount of round trips that have to be made
     * to the server. To cancel buffering for some particular invocations, pass
     * `timeout` parameter in `options` object for that method call.
     */
    enableBuffer: 10,
    
    /**
     * @cfg {Number} [maxRetries=1]
     *
     * Number of times to re-attempt delivery on failure of a call.
     */
    maxRetries: 1,
    
    /**
     * @cfg {Number} [timeout]
     *
     * The timeout to use for each request.
     */
    
    /**
     * @event beforecall
     * @preventable
     *
     * Fires immediately before the client-side sends off the RPC call. By returning
     * `false` from an event handler you can prevent the call from being made.
     *
     * @param {Ext.direct.RemotingProvider} provider
     * @param {Ext.direct.Transaction} transaction
     * @param {Object} meta The meta data
     */            

    /**
     * @event call
     *
     * Fires immediately after the request to the server-side is sent. This does
     * NOT fire after the response has come back from the call.
     *
     * @param {Ext.direct.RemotingProvider} provider
     * @param {Ext.direct.Transaction} transaction
     * @param {Object} meta The meta data
     */            

    /**
     * @event beforecallback
     * @preventable
     *
     * Fires before callback function is executed. By returning `false` from an event handler
     * you can prevent the callback from executing.
     *
     * @param {Ext.direct.RemotingProvider} provider
     * @param {Ext.direct.Transaction} transaction
     */

    constructor: function(config) {
        var me = this;

        me.callParent(arguments);

        me.namespace = (Ext.isString(me.namespace)) ? Ext.ns(me.namespace) : me.namespace || Ext.global;
        me.transactions = new Ext.util.MixedCollection();
        me.callBuffer = [];
    },
    
    /**
     * Get nested namespace by property.
     *
     * @private
     */
    getNamespace: function(root, action) {
        var parts, ns, i, l;
        
        root  = root || Ext.global;
        parts = action.toString().split('.');

        for (i = 0, l = parts.length; i < l; i++) {
            ns   = parts[i];
            root = root[ns];

            if (typeof root === 'undefined') {
                return root;
            }
        }

        return root;
    },

    /**
     * Create nested namespaces. Unlike {@link Ext#ns} this method supports
     * nested objects as root of the namespace, not only Ext.global (window).
     *
     * @private
     */
    createNamespaces: function(root, action) {
        var parts, ns;
        
        root  = root || Ext.global;
        parts = action.toString().split('.');
        
        for ( var i = 0, l = parts.length; i < l; i++ ) {
            ns = parts[i];
            
            root[ns] = root[ns] || {};
            root     = root[ns];
        }
        
        return root;
    },
    
    /**
     * Initialize the API
     *
     * @private
     */
    initAPI: function() {
        var me = this,
            actions = me.actions,
            namespace = me.namespace,
            action, cls, methods, i, len, method;
            
        for (action in actions) {
            if (actions.hasOwnProperty(action)) {
                if (me.disableNestedActions) {
                    cls = namespace[action];
                    
                    if (!cls) {
                        cls = namespace[action] = {};
                    }
                }
                else {
                    cls = me.getNamespace(namespace, action);

                    if (!cls) {
                        cls = me.createNamespaces(namespace, action);
                    }
                }

                methods = actions[action];

                for (i = 0, len = methods.length; i < len; ++i) {
                    method = new Ext.direct.RemotingMethod(methods[i]);
                    cls[method.name] = me.createHandler(action, method);
                }
            }
        }
    },
    
    /**
     * Create a handler function for a direct call.
     *
     * @param {String} action The action the call is for
     * @param {Object} method The details of the method
     *
     * @return {Function} A JS function that will kick off the call
     *
     * @private
     */
    createHandler: function(action, method) {
        var me = this,
            slice = Array.prototype.slice,
            handler;
        
        if (!method.formHandler) {
            handler = function() {
                me.configureRequest(action, method, slice.call(arguments, 0));
            };
        }
        else {
            handler = function(form, callback, scope) {
                me.configureFormRequest(action, method, slice.call(arguments, 0));
            };
        }

        handler.directCfg = {
            action: action,
            method: method
        };

        return handler;
    },
    
    /**
     * @inheritdoc
     */
    isConnected: function() {
        return !!this.connected;
    },

    /**
     * @inheritdoc
     */
    connect: function() {
        var me = this;
        
        if (me.url) {
            me.initAPI();
            me.connected = true;
            me.fireEvent('connect', me);
        }
        //<debug>
        else if (!me.url) {
            Ext.Error.raise('Error initializing RemotingProvider "' + me.id +
                            '", no url configured.');
        }
        //</debug>
    },

    /**
     * @inheritdoc
     */
    disconnect: function() {
        var me = this;
        
        if (me.connected) {
            me.connected = false;
            me.fireEvent('disconnect', me);
        }
    },
    
    /**
     * Run any callbacks related to the transaction.
     *
     * @param {Ext.direct.Transaction} transaction The transaction
     * @param {Ext.direct.Event} event The event
     *
     * @private
     */
    runCallback: function(transaction, event) {
        var success = !!event.status,
            funcName = success ? 'success' : 'failure',
            callback, options, result;
        
        if (transaction && transaction.callback) {
            callback = transaction.callback;
            options  = transaction.callbackOptions;
            result   = typeof event.result !== 'undefined' ? event.result : event.data;

            if (Ext.isFunction(callback)) {
                callback(result, event, success, options);
            }
            else {
                Ext.callback(callback[funcName], callback.scope, [result, event, success, options]);
                Ext.callback(callback.callback,  callback.scope, [result, event, success, options]);
            }
        }
    },
    
    /**
     * React to the ajax request being completed
     *
     * @private
     */
    onData: function(options, success, response) {
        var me = this,
            i, len, events, event, transaction, transactions;
            
        if (success) {
            events = me.createEvents(response);

            for (i = 0, len = events.length; i < len; ++i) {
                event = events[i];
                transaction = me.getTransaction(event);
                me.fireEvent('data', me, event);

                if (transaction && me.fireEvent('beforecallback', me, event, transaction) !== false) {
                    me.runCallback(transaction, event, true);
                    Ext.direct.Manager.removeTransaction(transaction);
                }
            }
        }
        else {
            transactions = [].concat(options.transaction);
            
            for (i = 0, len = transactions.length; i < len; ++i) {
                transaction = me.getTransaction(transactions[i]);

                if (transaction && transaction.retryCount < me.maxRetries) {
                    transaction.retry();
                }
                else {
                    event = new Ext.direct.ExceptionEvent({
                        data: null,
                        transaction: transaction,
                        code: Ext.direct.Manager.exceptions.TRANSPORT,
                        message: 'Unable to connect to the server.',
                        xhr: response
                    });

                    me.fireEvent('data', me, event);

                    if (transaction && me.fireEvent('beforecallback', me, transaction) !== false) {
                        me.runCallback(transaction, event, false);
                        Ext.direct.Manager.removeTransaction(transaction);
                    }
                }
            }
        }
    },
    
    /**
     * Get transaction from XHR options
     *
     * @param {Object} options The options sent to the Ajax request
     *
     * @return {Ext.direct.Transaction} The transaction, null if not found
     *
     * @private
     */
    getTransaction: function(options) {
        return options && options.tid ? Ext.direct.Manager.getTransaction(options.tid) : null;
    },
    
    /**
     * Configure a direct request
     *
     * @param {String} action The action being executed
     * @param {Object} method The being executed
     *
     * @private
     */
    configureRequest: function(action, method, args) {
        var me = this,
            callData, data, callback, scope, opts, transaction, params;

        callData = method.getCallData(args);
        data     = callData.data;
        callback = callData.callback;
        scope    = callData.scope;
        opts     = callData.options || {};

        params = Ext.apply({}, {
            provider: me,
            args: args,
            action: action,
            method: method.name,
            data: data,
            callbackOptions: opts,
            callback: scope && Ext.isFunction(callback) ? Ext.Function.bind(callback, scope) : callback
        });

        if (opts.timeout) {
            Ext.applyIf(params, {
                timeout: opts.timeout
            });
        }

        transaction = new Ext.direct.Transaction(params);

        if (me.fireEvent('beforecall', me, transaction, method) !== false) {
            Ext.direct.Manager.addTransaction(transaction);
            me.queueTransaction(transaction);
            me.fireEvent('call', me, transaction, method);
        }
    },
    
    /**
     * Gets the Ajax call info for a transaction
     *
     * @param {Ext.direct.Transaction} transaction The transaction
     *
     * @return {Object} The call params
     *
     * @private
     */
    getCallData: function(transaction) {
        return {
            action: transaction.action,
            method: transaction.method,
            data: transaction.data,
            type: 'rpc',
            tid: transaction.id
        };
    },
    
    /**
     * Sends a request to the server
     *
     * @param {Object/Array} data The data to send
     *
     * @private
     */
    sendRequest: function(data) {
        var me = this,
            request, callData, params,
            enableUrlEncode = me.enableUrlEncode,
            i, len;

        request = {
            url: me.url,
            callback: me.onData,
            scope: me,
            transaction: data,
            timeout: me.timeout
        };

        // Explicitly specified timeout for Ext.Direct call overrides defaults
        if (data.timeout) {
            request.timeout = data.timeout;
        }

        if (Ext.isArray(data)) {
            callData = [];

            for (i = 0, len = data.length; i < len; ++i) {
                callData.push(me.getCallData(data[i]));
            }
        }
        else {
            callData = me.getCallData(data);
        }

        if (enableUrlEncode) {
            params = {};
            params[Ext.isString(enableUrlEncode) ? enableUrlEncode : 'data'] = Ext.encode(callData);
            request.params = params;
        }
        else {
            request.jsonData = callData;
        }

        Ext.Ajax.request(request);
    },
    
    /**
     * Add a new transaction to the queue
     *
     * @param {Ext.direct.Transaction} transaction The transaction
     *
     * @private
     */
    queueTransaction: function(transaction) {
        var me = this,
            enableBuffer = me.enableBuffer;
        
        if (transaction.form) {
            me.sendFormRequest(transaction);
            return;
        }

        if (enableBuffer === false || typeof transaction.timeout !== 'undefined') {
            me.sendRequest(transaction);
            return;
        }
        
        me.callBuffer.push(transaction);

        if (enableBuffer) {
            if (!me.callTask) {
                me.callTask = new Ext.util.DelayedTask(me.combineAndSend, me);
            }

            me.callTask.delay(Ext.isNumber(enableBuffer) ? enableBuffer : 10);
        }
        else {
            me.combineAndSend();
        }
    },
    
    /**
     * Combine any buffered requests and send them off
     *
     * @private
     */
    combineAndSend : function() {
        var me = this,
            buffer = me.callBuffer,
            len = buffer.length;
            
        if (len > 0) {
            me.sendRequest(len == 1 ? buffer[0] : buffer);
            me.callBuffer = [];
        }
    },
    
    /**
     * Configure a form submission request
     *
     * @param {String} action The action being executed
     * @param {Object} method The method being executed
     * @param {HTMLElement} form The form being submitted
     * @param {Function} [callback] A callback to run after the form submits
     * @param {Object} [scope] A scope to execute the callback in
     *
     * @private
     */
    configureFormRequest: function(action, method, args) {
        var me = this,
            form = args[0],
            callback = args[1],
            scope = args[2],
            transaction, isUpload, params;
            
        transaction = new Ext.direct.Transaction({
            provider: me,
            action: action,
            method: method.name,
            args: [form, callback, scope],
            callback: scope && Ext.isFunction(callback) ? Ext.Function.bind(callback, scope) : callback,
            isForm: true
        });

        if (me.fireEvent('beforecall', me, transaction, method) !== false) {
            Ext.direct.Manager.addTransaction(transaction);
            isUpload = String(form.getAttribute("enctype")).toLowerCase() == 'multipart/form-data';
            
            params = {
                extTID: transaction.id,
                extAction: action,
                extMethod: method.name,
                extType: 'rpc',
                extUpload: String(isUpload)
            };
            
            // change made from typeof callback check to callback.params
            // to support addl param passing in DirectSubmit EAC 6/2
            Ext.apply(transaction, {
                form: Ext.getDom(form),
                isUpload: isUpload,
                params: callback && Ext.isObject(callback.params) ? Ext.apply(params, callback.params) : params
            });

            me.fireEvent('call', me, transaction, method);
            me.sendFormRequest(transaction);
        }
    },
    
    /**
     * Sends a form request
     *
     * @param {Ext.direct.Transaction} transaction The transaction to send
     *
     * @private
     */
    sendFormRequest: function(transaction) {
        var me = this;

        Ext.Ajax.request({
            url: me.url,
            params: transaction.params,
            callback: me.onData,
            scope: me,
            form: transaction.form,
            isUpload: transaction.isUpload,
            transaction: transaction
        });
    }
});
