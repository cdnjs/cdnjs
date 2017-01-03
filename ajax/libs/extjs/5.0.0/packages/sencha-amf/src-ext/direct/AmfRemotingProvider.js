// @tag enterprise
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
product.getProducts((function(provider, response) {
    // do something with the response
    console.log("Got " + response.data.length + " objects");
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
    
    /* Begin Definitions */
   
    alias: 'direct.amfremotingprovider',
    
    extend: 'Ext.direct.Provider', 
    
    requires: [
        'Ext.util.MixedCollection', 
        'Ext.util.DelayedTask', 
        'Ext.direct.Transaction',
        'Ext.direct.RemotingMethod',
        'Ext.data.amf.XmlEncoder',
        'Ext.data.amf.XmlDecoder',
        'Ext.data.amf.Encoder',
        'Ext.data.amf.Packet',
        'Ext.data.amf.RemotingMessage',
        'Ext.direct.ExceptionEvent'
    ],
   
    /* End Definitions */
   
   /**
     * @cfg {Object} actions
     * Object literal defining the server side actions and methods. For example, if
     * the Provider is configured with:
     * <pre><code>
"actions":{ // each property within the 'actions' object represents a server side Class 
    "TestAction":[ // array of methods within each server side Class to be   
    {              // stubbed out on client
        "name":"doEcho", 
        "len":1            
    },{
        "name":"multiply",// name of method
        "len":2           // The number of parameters that will be used to create an
                          // array of data to send to the server side function.
                          // Ensure the server sends back a Number, not a String. 
    },{
        "name":"doForm",
        "formHandler":true, // direct the client to use specialized form handling method 
        "len":1
    }]
}
     * </code></pre>
     * <p>Note that a Store is not required, a server method can be called at any time.
     * In the following example a <b>client side</b> handler is used to call the
     * server side method "multiply" in the server-side "TestAction" Class:</p>
     * <pre><code>
TestAction.multiply(
    2, 4, // pass two arguments to server, so specify len=2
    // callback function after the server is called
    // result: the result returned by the server
    //      e: Ext.direct.RemotingEvent object
    function(result, e) {
        var t = e.getTransaction();
        var action = t.action; // server side Class called
        var method = t.method; // server side method called
        if(e.status) {
            var answer = Ext.encode(result); // 8
    
        } else {
            var msg = e.message; // failure message
        }
    }
);
     * </code></pre>
     * In the example above, the server side "multiply" function will be passed two
     * arguments (2 and 4).  The "multiply" method should return the value 8 which will be
     * available as the <tt>result</tt> in the example above. 
     */
    
    /**
     * @cfg {String/Object} namespace
     * Namespace for the Remoting Provider (defaults to the browser global scope of <i>window</i>).
     * Explicitly specify the namespace Object, or specify a String to have a
     * {@link Ext#namespace namespace created} implicitly.
     */
    
    /**
     * @cfg {String} url
     * <b>Required</b>. The URL to connect to the Flex remoting server (LCDS, BlazeDS, etc).
     * This should include the /messagebroker/amf suffix as defined in the services-config.xml and remoting-config.xml files.
     */
    
    /**
     * @cfg {String} endpoint
     * <b>Requred</b>. This is the channel id defined in services-config.xml on the server (e.g. my-amf or my-http).
     */

    /**
     * @cfg {String} enableUrlEncode
     * Specify which param will hold the arguments for the method.
     * Defaults to <tt>'data'</tt>.
     */
    
    /**
     * @cfg {String} binary
     * If true, use AMF binary encoding instead of AMFX XML-based encoding. Note that on some browsers, this will load a flash plugin to handle binary communication with the server. Important: If using binary encoding with older browsers, see notes in {@link Ext.data.flash.BinaryXhr BinaryXhr} regarding packaging the Flash plugin for use in older browsers.
     */
    binary: false,
    
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
    
    constructor : function(config){
        var me = this;
        me.callParent(arguments);
        me.addEvents(
            /**
             * @event beforecall
             * Fires immediately before the client-side sends off the RPC call.
             * By returning false from an event handler you can prevent the call from
             * executing.
             * @param {Ext.direct.AmfRemotingProvider} provider
             * @param {Ext.direct.Transaction} transaction
             * @param {Object} meta The meta data
             */            
            'beforecall',            
            /**
             * @event call
             * Fires immediately after the request to the server-side is sent. This does
             * NOT fire after the response has come back from the call.
             * @param {Ext.direct.AmfRemotingProvider} provider
             * @param {Ext.direct.Transaction} transaction
             * @param {Object} meta The meta data
             */            
            'call'
        );
        me.namespace = (Ext.isString(me.namespace)) ? Ext.ns(me.namespace) : me.namespace || window;
        me.transactions = new Ext.util.MixedCollection();
        me.callBuffer = [];
    },

    /**
     * Initialize the API
     * @private
     */
    initAPI : function(){
        var actions = this.actions,
            namespace = this.namespace,
            action,
            cls,
            methods,
            i,
            len,
            method;
        
        for (action in actions) {
            if (actions.hasOwnProperty(action)) {
                cls = namespace[action];
                if (!cls) {
                    cls = namespace[action] = {};
                }
                methods = actions[action];
                
                for (i = 0, len = methods.length; i < len; ++i) {
                    method = new Ext.direct.RemotingMethod(methods[i]);
                    cls[method.name] = this.createHandler(action, method);
                }
            }
        }
    },
    
    /**
     * Create a handler function for a direct call.
     * @private
     * @param {String} action The action the call is for
     * @param {Object} method The details of the method
     * @return {Function} A JS function that will kick off the call
     */
    createHandler : function(action, method){
        var me = this,
            handler;
        
        if (!method.formHandler) {
            handler = function(){
                me.configureRequest(action, method, Array.prototype.slice.call(arguments, 0));
            };
        } else {
            handler = function(form, callback, scope){
                me.configureFormRequest(action, method, form, callback, scope);
            };
        }
        handler.directCfg = {
            action: action,
            method: method
        };
        return handler;
    },
    
    // inherit docs
    isConnected: function(){
        return !!this.connected;
    },

    // inherit docs
    connect: function(){
        var me = this;
        
        if (me.url) {
            // Generate a unique ID for this client
            me.clientId = Ext.data.amf.XmlEncoder.generateFlexUID();
            me.initAPI();
            me.connected = true;
            me.fireEvent('connect', me);
            me.DSId = null;
        } else if(!me.url) {
            //<debug>
            Ext.Error.raise('Error initializing RemotingProvider, no url configured.');
            //</debug>
        }
    },

    // inherit docs
    disconnect: function(){
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
    runCallback: function(transaction, event){
        var success = !!event.status,
            funcName = success ? 'success' : 'failure',
            callback,
            result;
        if (transaction && transaction.callback) {
            callback = transaction.callback;
            result = Ext.isDefined(event.result) ? event.result : event.data;
            
            if (Ext.isFunction(callback)) {
                callback(result, event, success);
            } else {
                Ext.callback(callback[funcName], callback.scope, [result, event, success]);
                Ext.callback(callback.callback, callback.scope, [result, event, success]);
            }
        }
    },
    
    /**
     * React to the ajax request being completed
     * @private
     */
    onData: function(options, success, response){
        var me = this,
            i = 0,
            len,
            events,
            event,
            transaction,
            transactions;
        
        if (success) {
            events = me.createEvents(response);
            for (len = events.length; i < len; ++i) {
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
            for (len = transactions.length; i < len; ++i) {
                transaction = me.getTransaction(transactions[i]);
                if (transaction && transaction.retryCount < me.maxRetries) {
                    transaction.retry();
                } else {
                    event = new Ext.direct.ExceptionEvent({
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
     * Get transaction from XHR options
     * @private
     * @param {Object} options The options sent to the Ajax request
     * @return {Ext.direct.Transaction} The transaction, null if not found
     */
    getTransaction: function(options){
        return options && options.tid ? Ext.direct.Manager.getTransaction(options.tid) : null;
    },
    
    /**
     * Configure a direct request
     * @private
     * @param {String} action The action being executed
     * @param {Object} method The method being executed
     */
    configureRequest: function(action, method, args){
        var me = this,
            callData = method.getCallData(args),
            data = callData.data, 
            callback = callData.callback, 
            scope = callData.scope,
            transaction;

        transaction = new Ext.direct.Transaction({
            provider: me,
            args: args,
            action: action,
            method: method.name,
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
     * Gets the Flex remoting message info for a transaction
     * @private
     * @param {Ext.direct.Transaction} transaction The transaction
     * @return {Object} The Flex remoting message structure ready to encode in an AMFX RemoteMessage
     */
    getCallData: function(transaction){
        if (this.binary) {
            return {
                targetUri: transaction.action + "." + transaction.method,
                responseUri: '/' + transaction.id,
                body: transaction.data || []
            };
        } else {
            return new Ext.data.amf.RemotingMessage( 
                              {
                                  body: transaction.data || [],
                                  clientId: this.clientId,
                                  destination: transaction.action,
                                  headers: {
                                      DSEndpoint: this.endpoint,
                                      DSId: this.DSId || "nil" // if unknown yet, use "nil"
                                  },
                                  messageId: Ext.data.amf.XmlEncoder.generateFlexUID(transaction.id), // encode as first 4 bytes of UID
                                  operation: transaction.method,
                                  timestamp: 0,
                                  timeToLive: 0
                              });
        }
        /*
         return {
         action: transaction.action,
         method: transaction.method,
         data: transaction.data,
         type: 'rpc',
         tid: transaction.id
         };
         */
    },
    
    /**
     * Sends a request to the server
     * @private
     * @param {Object/Array} data The data to send
     */
    sendRequest : function(data){
        var me = this,
            request = {
                url: me.url,
                callback: me.onData,
                scope: me,
                transaction: data,
                timeout: me.timeout
            }, callData,
            i = 0,
            len,
            params,
            encoder,
            amfMessages = [],
            amfHeaders = [];
        

        // prepare AMFX messages
        if (Ext.isArray(data)) {
            //<debug>
            if (!me.binary) {
                Ext.Error.raise("Mutltiple messages in the same call are not supported in AMFX");
            }
            //</debug>
            for (len = data.length; i < len; ++i) {
                amfMessages.push(me.getCallData(data[i]));
            }
        } else {
            amfMessages.push(me.getCallData(data));
        }
        
        if (me.binary) {
            encoder = new Ext.data.amf.Encoder( {format: 0}); // AMF message sending always uses AMF0
            // encode packet
            encoder.writeAmfPacket(amfHeaders, amfMessages);
            request.binaryData = encoder.bytes;
            request.binary = true; // Binary response
            request.headers = {'Content-Type': 'application/x-amf'};
        } else {
            encoder = new Ext.data.amf.XmlEncoder();
            // encode packet
            encoder.writeAmfxRemotingPacket(amfMessages[0]);
            request.xmlData = encoder.body;
        }
        
        
        // prepare Ajax request
        Ext.Ajax.request(request);

    },
    
    /**
     * Add a new transaction to the queue
     * @private
     * @param {Ext.direct.Transaction} transaction The transaction
     */
    queueTransaction: function(transaction){
        var me = this,
            enableBuffer = false; // no queueing for AMFX
        
        if (transaction.form) {
            me.sendFormRequest(transaction);
            return;
        }
        
        me.callBuffer.push(transaction);
        if (enableBuffer) {
            if (!me.callTask) {
                me.callTask = new Ext.util.DelayedTask(me.combineAndSend, me);
            }
            me.callTask.delay(Ext.isNumber(enableBuffer) ? enableBuffer : 10);
        } else {
            me.combineAndSend();
        }
    },
    
    /**
     * Combine any buffered requests and send them off
     * @private
     */
    combineAndSend : function(){
        var buffer = this.callBuffer,
            len = buffer.length;
        
        if (len > 0) {
            this.sendRequest(len == 1 ? buffer[0] : buffer);
            this.callBuffer = [];
        }
    },
    
    /**
     * Configure a form submission request
     * @private
     * @param {String} action The action being executed
     * @param {Object} method The method being executed
     * @param {HTMLElement} form The form being submitted
     * @param {Function} callback (optional) A callback to run after the form submits
     * @param {Object} scope (optional) A scope to execute the callback in
     */
    configureFormRequest : function(action, method, form, callback, scope){
        //<debug>
        Ext.Error.raise("Form requests are not supported for AmfRemoting");
        //</debug>
        /*
         var me = this,
         transaction = new Ext.direct.Transaction({
         provider: me,
         action: action,
         method: method.name,
         args: [form, callback, scope],
         callback: scope && Ext.isFunction(callback) ? Ext.Function.bind(callback, scope) : callback,
         isForm: true
         }),
         isUpload,
         params;

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
         */
    },
    
    /**
     * Sends a form request
     * @private
     * @param {Ext.direct.Transaction} transaction The transaction to send
     */
    sendFormRequest: function(transaction){
        //<debug>
        Ext.Error.raise("Form requests are not supported for AmfRemoting");
        //</debug>
        /*
         Ext.Ajax.request({
         url: this.url,
         params: transaction.params,
         callback: this.onData,
         scope: this,
         form: transaction.form,
         isUpload: transaction.isUpload,
         transaction: transaction
         });
         */
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
            if (this.binary) {
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

        if (this.binary) {
            for (i=0; i < data.messages.length; i++) {
                events.push(this.createEvent(data.messages[i]));
            }
        } else {
            // AMFX messages have one response per message
            events.push(this.createEvent(data));
        }
        return events;
    },

    /**
     * Create an event from an AMFX response object
     * @param {Object} response The AMFX response object
     * @return {Ext.direct.Event} The event
     */
    createEvent: function(response){
        // Check targetUri to identify transaction ID and status
        var status = response.targetURI.split("/"),
            tid,
            event,
            data, statusIndex,
            me = this;
        if (me.binary) {
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
                data: (me.binary ? response.body : response.message)
            };
            event = Ext.create('direct.exception', data);
        } else if(status[statusIndex] == "onResult") {
            // Call succeeded
            data = {
                tid: tid,
                data: (me.binary ? response.body : response.message.body)
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
