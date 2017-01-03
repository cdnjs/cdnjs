//<feature amf>
/**
 * @class Ext.direct.AmfRemotingProvider
 * 
 * <p>The {@link Ext.direct.AmfRemotingProvider AmfRemotingProvider}
 * allows making RPC calls to a Java object on a BlazeDS or ColdFusion using either the AMFX or the AMF protocols.</p>
 * 
 * <p>The default protocol is AMFX which works on all browsers. If you choose AMF, a flash plugin might be loaded in certain browsers that do not support posting binary data to the server, e.g. Internet Explorer version 9 or less. To choose AMF, set the {@link Ext.direct.AmfRemotingProvider#binary binary} property to true.</p>
 * <p>For AMFX, the server must be configured to expose the desired services via an HTTPEndpoint. For example, the following configuration snippet adds an HTTPEndpoint (AMFX endpoint) to the BlazeDS services-config.xml file:</p>
 * <pre><code>
&lt;channel-definition id="my-http" class="mx.messaging.channels.HTTPChannel"&gt;
 &lt;endpoint url="http://{server.name}:{server.port}/{context.root}/messagebroker/http" class="flex.messaging.endpoints.HTTPEndpoint"/&gt;
&lt;/channel-definition&gt;
 </code></pre>
 *
 * <p>Once the HTTPEndpoint is configured, make sure the service is exposed via the channel by adding the channel (e.g. my-http) to your remoting-services.xml file.
 * For example this allows services to be accessed remotely by both AMF and AMFX:</p>
 * <pre><code>
&lt;default-channels&gt;
 &lt;channel ref="my-amf"/&gt;
 &lt;channel ref="my-http"/&gt;
&lt;/default-channels&gt;
 * </code></pre>
 * 
 * <p>In order to make a call, you first need to declare the API to Ext direct. The following example defines local methods to the services provided by the sample Products application provided by Adobe as part of the BlazeDS 4.x binary turnkey distribution's testdrive (Sample 5: Updating Data):</p>
 * <pre><code>
    Ext.direct.Manager.addProvider({
        "url":"/samples/messagebroker/http", // URL for the HTTPEndpoint
        "type":"amfremoting",
        "endpoint": "my-http", // the name of the HTTPEndpoint channel as defined in the server's services-config.xml
        "actions":{
        "product":[{ // name of the destination as defined in remoting-config.xml on the server
            "name":"getProducts", // method name of the method to call
            "len":0 // number of parameters
        },{
            "name":"add",
            "len":1
        },{
            "name":"bad",
            "len":0
        }]
        }
    });

 * </code></pre>
 * <p>You can now call the service as follows:</p>
 <pre><code>
 product.getProducts(function(result, e, success) {
   if (e.getStatus()) {
     alert("getProducts: " + result.length + " objects");
   } else {
     alert("getProducts: " + e.getMessage()); // failure message
   }
 });
</code></pre>
 * 
 * Note that in case server methods require parameters of a specific class (e.g. flex.samples.product.Product), you should make sure the passed parameter has a field called $flexType set to the class name (in this case flex.Samples.product.Product). This is similar to the remote class alias definition in ActionScript.
 * 
 * 
 * <p>The following example shows how to define a binary AMF-based call:</p>
 * <pre><code>
    Ext.direct.Manager.addProvider({
        "url":"/samples/messagebroker/amf", // URL for the AMFEndpoint
        "type":"amfremoting",
        "endpoint": "my-amf", // the name of the AMFEndpoint channel as defined in the server's services-config.xml
        "binary": true, // chooses AMF encoding
        "actions":{
        "product":[{ // name of the destination as defined in remoting-config.xml on the server
            "name":"getProducts", // method name of the method to call
            "len":0 // number of parameters
        },{
            "name":"add",
            "len":1
        },{
            "name":"bad",
            "len":0
        }]
        }
    });

 * </code></pre>
 * <p>Calling the server is done the same way as for the AMFX-based definition.</p>
 */

Ext.define('Ext.direct.AmfRemotingProvider', {
    alias: 'direct.amfremotingprovider',

    extend: 'Ext.direct.JsonProvider',

    requires: [
        'Ext.direct.JsonProvider',
        'Ext.util.MixedCollection',
        'Ext.util.DelayedTask',
        'Ext.direct.Transaction',
        'Ext.direct.RemotingMethod',
        'Ext.data.amf.XmlEncoder',
        'Ext.data.amf.XmlDecoder',
        'Ext.data.amf.Encoder',
        'Ext.data.amf.Packet',
        'Ext.data.amf.RemotingMessage',
        'Ext.direct.ExceptionEvent',
        'Ext.Ajax'
    ],

    config: {
        /**
         * @cfg {String/Object} namespace
         * Namespace for the Remoting Provider (defaults to the browser global scope of _window_).
         * Explicitly specify the namespace Object, or specify a String to have a
         * {@link Ext#namespace namespace created} implicitly.
         */
        namespace: undefined,

        /**
         * @cfg {String} url (required) The url to connect to the {@link Ext.direct.Manager} server-side router.
         */
        url: null,
        
        /**
         * @cfg {String} endpoint
         * <b>Requred</b>. This is the channel id defined in services-config.xml on the server (e.g. my-amf or my-http).
         */
        endpoint: null,
        
        /**
         * @cfg {String} enableUrlEncode
         * Specify which param will hold the arguments for the method.
         */
        enableUrlEncode: null,

        /**
         * @cfg {String} binary
         * If true, use AMF binary encoding instead of AMFX XML-based encoding. Note that on some browsers, this will load a flash plugin to handle binary communication with the server.
         */
        binary: false,
        
        /**
         * @cfg {Number/Boolean} enableBuffer
         *
         * `true` or `false` to enable or disable combining of method
         * calls. If a number is specified this is the amount of time in milliseconds
         * to wait before sending a batched request.
         *
         * Calls which are received within the specified timeframe will be
         * concatenated together and sent in a single request, optimizing the
         * application by reducing the amount of round trips that have to be made
         * to the server.
         */
        enableBuffer: 10,

        /**
         * @cfg {Number} maxRetries
         * Number of times to re-attempt delivery on failure of a call.
         */
        maxRetries: 1,

        /**
         * @cfg {Number} timeout
         * The timeout to use for each request.
         */
        timeout: undefined,

        /**
         * @cfg {Object} actions
         * Object literal defining the server side actions and methods. For example, if
         * the Provider is configured with:
         *
         *     actions: { // each property within the 'actions' object represents a server side Class
         *         // array of methods within each server side Class to be stubbed out on client
         *         TestAction: [{
         *             name: "doEcho",
         *             len: 1
         *         }, {
         *             "name": "multiply", // name of method
         *             "len": 2            // The number of parameters that will be used to create an
         *                                 // array of data to send to the server side function.
         *                                 // Ensure the server sends back a Number, not a String.
         *         }, {
         *             name: "doForm",
         *             formHandler: true, // direct the client to use specialized form handling method
         *             len: 1
         *         }]
         *     }
         *
         * __Note:__ A Store is not required, a server method can be called at any time.
         * In the following example a **client side** handler is used to call the
         * server side method "multiply" in the server-side "TestAction" Class:
         *
         *     TestAction.multiply(
         *         2, 4, // pass two arguments to server, so specify len=2
         *         // callback function after the server is called
         *         //     result: the result returned by the server
         *         //     e: Ext.direct.RemotingEvent object
         *         function(result, e) {
         *             var t = e.getTransaction();
         *             var action = t.action; // server side Class called
         *             var method = t.method; // server side method called
         *             if (e.getStatus()) {
         *                 var answer = Ext.encode(result); // 8
         *             } else {
         *                 var msg = e.getMessage(); // failure message
         *             }
         *         }
         *     );
         *
         * In the example above, the server side "multiply" function will be passed two
         * arguments (2 and 4).  The "multiply" method should return the value 8 which will be
         * available as the `result` in the example above.
         */
        actions: {},
        
        /**
         * @cfg {String} clientId
         * Client ID to use with the server.
         * @private
         */
        clientId: null,
        
        /**
         * @cfg {String} DSId
         * Session ID to use with the server.
         * @private
         */
        DSId: null
    },

    /**
     * @event beforecall
     * Fires immediately before the client-side sends off the RPC call.
     * By returning `false` from an event handler you can prevent the call from
     * executing.
     * @param {Ext.direct.RemotingProvider} provider
     * @param {Ext.direct.Transaction} transaction
     * @param {Object} meta The meta data.
     */

    /**
     * @event call
     * Fires immediately after the request to the server-side is sent. This does
     * NOT fire after the response has come back from the call.
     * @param {Ext.direct.RemotingProvider} provider
     * @param {Ext.direct.Transaction} transaction
     * @param {Object} meta The meta data.
     */

    constructor : function(config) {
        var me = this;

        me.callParent(arguments);

        me.transactions = Ext.create('Ext.util.Collection', function(item) {
            return item.getId();
        });
        me.callBuffer = [];
    },

    applyNamespace: function(namespace) {
        if (Ext.isString(namespace)) {
            return Ext.ns(namespace);
        }
        return namespace || window;
    },

    /**
     * Initialize the API
     * @private
     */
    initAPI : function() {
        var actions = this.getActions(),
            namespace = this.getNamespace(),
            action, cls, methods,
            i, ln, method;

        for (action in actions) {
            if (actions.hasOwnProperty(action)) {
                cls = namespace[action];
                if (!cls) {
                    cls = namespace[action] = {};
                }
                methods = actions[action];

                for (i = 0, ln = methods.length; i < ln; ++i) {
                    method = Ext.create('Ext.direct.RemotingMethod', methods[i]);
                    cls[method.getName()] = this.createHandler(action, method);
                }
            }
        }
    },

    /**
     * Create a handler function for a direct call.
     * @private
     * @param {String} action The action the call is for.
     * @param {Object} method The details of the method.
     * @return {Function} A JavaScript function that will kick off the call.
     */
    createHandler : function(action, method) {
        var me = this,
            handler;

        if (!method.getFormHandler()) {
            handler = function() {
                me.configureRequest(action, method, Array.prototype.slice.call(arguments, 0));
            };
        } else {
            handler = function(form, callback, scope) {
                me.configureFormRequest(action, method, form, callback, scope);
            };
        }
        handler.directCfg = {
            action: action,
            method: method
        };
        return handler;
    },

    // @inheritdoc
    isConnected: function() {
        return !!this.connected;
    },

    // @inheritdoc
    connect: function() {
        var me = this;

        if (me.getUrl()) {
            me.setClientId(Ext.data.amf.XmlEncoder.generateFlexUID());
            me.initAPI();
            me.connected = true;
            me.fireEvent('connect', me);
            me.setDSId(null); // clear id
        } else {
            //<debug>
            Ext.Error.raise('Error initializing RemotingProvider, no url configured.');
            //</debug>
        }
    },

    // @inheritdoc
    disconnect: function() {
        var me = this;

        if (me.connected) {
            me.connected = false;
            me.fireEvent('disconnect', me);
        }
    },

    /**
     * Run any callbacks related to the transaction.
     * @private
     * @param {Ext.direct.Transaction} transaction The transaction
     * @param {Ext.direct.Event} event The event
     */
    runCallback: function(transaction, event) {
        var success = !!event.getStatus(),
            functionName = success ? 'success' : 'failure',
            callback = transaction && transaction.getCallback(),
            result;
        if (callback) {
            // this doesnt make any sense. why do we have both result and data?
            // result = Ext.isDefined(event.getResult()) ? event.result : event.data;
            result = event.getResult();
            if (Ext.isFunction(callback)) {
                callback(result, event, success);
            } else {
                Ext.callback(callback[functionName], callback.scope, [result, event, success]);
                Ext.callback(callback.callback, callback.scope, [result, event, success]);
            }
        }
    },

    /**
     * React to the AJAX request being completed.
     * @private
     */
    onData: function(options, success, response) {
        var me = this,
            i = 0,
            ln, events, event,
            transaction, transactions;
        if (success) {
            events = me.createEvents(response);
            for (ln = events.length; i < ln; ++i) {
                event = events[i];
                transaction = me.getTransaction(event);
                me.fireEvent('data', me, event);
                if (transaction) {
                    me.runCallback(transaction, event, true);
                    Ext.direct.Manager.removeTransaction(transaction);
                }
            }
        } else {
            transactions = [].concat(options.transaction);
            for (ln = transactions.length; i < ln; ++i) {
                transaction = me.getTransaction(transactions[i]);
                if (transaction && transaction.getRetryCount() < me.getMaxRetries()) {
                    transaction.retry();
                } else {
                    event = Ext.create('Ext.direct.ExceptionEvent', {
                        data: null,
                        transaction: transaction,
                        code: Ext.direct.Manager.exceptions.TRANSPORT,
                        message: 'Unable to connect to the server.',
                        xhr: response
                    });

                    me.fireEvent('data', me, event);
                    if (transaction) {
                        me.runCallback(transaction, event, false);
                        Ext.direct.Manager.removeTransaction(transaction);
                    }
                }
            }
        }
    },

    /**
     * Get transaction from XHR options.
     * @private
     * @param {Object} options The options sent to the AJAX request.
     * @return {Ext.direct.Transaction/null} The transaction, `null` if not found.
     */
    getTransaction: function(options) {
        return options && options.getTid ? Ext.direct.Manager.getTransaction(options.getTid()) : null;
    },

    /**
     * Configure a direct request.
     * @private
     * @param {String} action The action being executed.
     * @param {Object} method The method being executed.
     * @param {Array} args
     */
    configureRequest: function(action, method, args) {
        var me = this,
            callData = method.getCallData(args),
            data = callData.data,
            callback = callData.callback,
            scope = callData.scope,
            transaction;

        transaction = Ext.create('Ext.direct.Transaction', {
            provider: me,
            args: args,
            action: action,
            method: method.getName(),
            data: data,
            callback: scope && Ext.isFunction(callback) ? Ext.Function.bind(callback, scope) : callback
        });

        if (me.fireEvent('beforecall', me, transaction, method) !== false) {
            Ext.direct.Manager.addTransaction(transaction);
            me.queueTransaction(transaction);
            me.fireEvent('call', me, transaction, method);
        }
    },

    /**
     * Gets the AJAX call info for a transaction.
     * @private
     * @param {Ext.direct.Transaction} transaction The transaction.
     * @return {Object} 
     * The Flex remoting message structure ready to encode in an AMFX RemoteMessage
     */
    getCallData: function(transaction){
        if (this.getBinary()) {
            return {
                targetUri: transaction.getAction() + "." + transaction.getMethod(),
                responseUri: '/' + transaction.getId(),
                body: transaction.getData() || []
            };
        } else {
            return new Ext.data.amf.RemotingMessage( 
                              {
                                  body: transaction.data || [],
                                  clientId: this.getClientId(),
                                  destination: transaction.getAction(),
                                  headers: {
                                      DSEndpoint: this.getEndpoint(),
                                      DSId: this.getDSId() || "nil" // if unknown yet, use "nil"
                                  },
                                  messageId: Ext.data.amf.XmlEncoder.generateFlexUID(transaction.getId()), // encode as first 4 bytes of UID
                                  operation: transaction.getMethod(),
                                  timestamp: 0,
                                  timeToLive: 0
                              });
        }
        /*
        return {
            action: transaction.getAction(),
            method: transaction.getMethod(),
            data: transaction.getData(),
            type: 'rpc',
            tid: transaction.getId()
        };
         */
    },

    /**
     * Sends a request to the server.
     * @private
     * @param {Object/Array} data The data to send.
     */
    sendRequest : function(data) {
        var me = this,
            request = {
                url: me.getUrl(),
                callback: me.onData,
                scope: me,
                transaction: data,
                timeout: me.getTimeout()
            }, callData,
            enableUrlEncode = me.getEnableUrlEncode(),
            i = 0,
            ln, params,
            encoder,
            amfMessages = [],
            amfHeaders = [];


        
        // prepare AMFX messages
        if (Ext.isArray(data)) {
            //<debug>
            if (!me.getBinary()) {
                Ext.Error.raise("Mutltiple messages in the same call are not supported in AMFX");
            }
            //</debug>
            for (i = 0, ln = data.length; i < ln; ++i) {
                amfMessages.push(me.getCallData(data[i]));
            }
        } else {
            amfMessages.push(me.getCallData(data));
        }

        if (me.getBinary()) {
            encoder = new Ext.data.amf.Encoder( {format: 0}); // AMF message sending always uses AMF0
            // encode packet
            encoder.writeAmfPacket(amfHeaders, amfMessages);
            request.binaryData = encoder.getBytes();
            request.binary = true; // Binary response
            request.headers = {'Content-Type': 'application/x-amf'};
        } else {
            encoder = new Ext.data.amf.XmlEncoder();
            // encode packet
            encoder.writeAmfxRemotingPacket(amfMessages[0]);
            request.xmlData = encoder.getBody();
        }
        
        Ext.Ajax.request(request);
    },

    /**
     * Add a new transaction to the queue.
     * @private
     * @param {Ext.direct.Transaction} transaction The transaction.
     */
    queueTransaction: function(transaction) {
        var me = this,
            enableBuffer = false; // no queueing for AMFX

        if (transaction.getForm()) {
            me.sendFormRequest(transaction);
            return;
        }

        me.callBuffer.push(transaction);
        if (enableBuffer) {
            if (!me.callTask) {
                me.callTask = Ext.create('Ext.util.DelayedTask', me.combineAndSend, me);
            }
            me.callTask.delay(Ext.isNumber(enableBuffer) ? enableBuffer : 10);
        } else {
            me.combineAndSend();
        }
    },

    /**
     * Combine any buffered requests and send them off.
     * @private
     */
    combineAndSend : function() {
        var buffer = this.callBuffer,
            ln = buffer.length;

        if (ln > 0) {
            this.sendRequest(ln == 1 ? buffer[0] : buffer);
            this.callBuffer = [];
        }
    },

    
    /**
     * Creates a set of events based on the XHR response
     * @private
     * @param {Object} response The XHR response
     * @return {Ext.direct.Event[]} An array of Ext.direct.Event
     */
    createEvents: function(response){
        var data = null,
            rawBytes = [],
            events = [],
            event,
            i = 0,
            len,
            decoder;
        try {
            if (this.getBinary()) {
                decoder = new Ext.data.amf.Packet();
                data = decoder.decode(response.responseBytes);
            } else {
                decoder = new Ext.data.amf.XmlDecoder();
                data = decoder.readAmfxMessage(response.responseText);
            }
            /*
             // This won't be sent back unless we use a ping message, so ignore for now
             // if we don't have the server ID yet, check for it here
             if (!this.DSId) {
             if (data.message.headers && data.message.headers.DSId) {
             this.DSId = data.message.headers.DSId;
             }
             }
             */
      } catch(e) {

            event = new Ext.direct.ExceptionEvent({
                data: e,
                xhr: response,
                code: Ext.direct.Manager.exceptions.PARSE,
                message: 'Error parsing AMF response: \n\n ' + data
            });
            return [event];
        }

        if (this.getBinary()) {
            for (i=0; i < data.getMessages().length; i++) {
                events.push(this.createEvent(data.getMessages()[i]));
            }
        } else {
            // AMFX messages have one response per message
            events.push(this.createEvent(data));
        }
        return events;
    },

    /**
     * Create an event from an AMF / AMFX response object
     * @param {Object} response The AMF/AMFX response object
     * @return {Ext.direct.Event} The event
     */
    createEvent: function(response){
        // Check targetUri to identify transaction ID and status
        var status = response.targetURI.split("/"),
            tid,
            event,
            data, statusIndex,
            me = this;
        if (me.getBinary()) {
            tid = status[1];
            statusIndex = 2;
        } else {
            tid = Ext.data.amf.XmlDecoder.decodeTidFromFlexUID(response.message.correlationId);
            statusIndex = 1;
        }
        // construct data structure
        if (status[statusIndex] == "onStatus") {
            // The call failed
            data = {
                tid: tid,
                data: (me.getBinary() ? response.body : response.message),
                code: (me.getBinary() ? response.body.code : response.message.faultCode),
                message: (me.getBinary() ? response.body.message : response.message.faultString)
            };
            event = Ext.create('direct.exception', data);
        } else if(status[statusIndex] == "onResult") {
            // Call succeeded
            data = {
                tid: tid,
                data: (me.getBinary() ? response.body : response.message),
                result: (me.getBinary() ? response.body : response.message.body)
            };
            event = Ext.create('direct.rpc', data);
        } else {
            //<debug>
            Ext.Error.raise("Unknown AMF return status: " + status[statusIndex]);
            //</debug>
        }
        
        return event;
    }


    
});
//</feature>