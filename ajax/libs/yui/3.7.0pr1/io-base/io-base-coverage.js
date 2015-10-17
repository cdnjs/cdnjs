if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["/build/io-base/io-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/io-base/io-base.js",
    code: []
};
_yuitest_coverage["/build/io-base/io-base.js"].code=["YUI.add('io-base', function(Y) {","","/**","Base IO functionality. Provides basic XHR transport support.","","@module io","@submodule io-base","@for IO","**/","","var // List of events that comprise the IO event lifecycle.","    EVENTS = ['start', 'complete', 'end', 'success', 'failure', 'progress'],","","    // Whitelist of used XHR response object properties.","    XHR_PROPS = ['status', 'statusText', 'responseText', 'responseXML'],","","    win = Y.config.win,","    uid = 0;","","/**","The IO class is a utility that brokers HTTP requests through a simplified","interface.  Specifically, it allows JavaScript to make HTTP requests to","a resource without a page reload.  The underlying transport for making","same-domain requests is the XMLHttpRequest object.  IO can also use","Flash, if specified as a transport, for cross-domain requests.","","@class IO","@constructor","@param {Object} config Object of EventTarget's publish method configurations","                    used to configure IO's events.","**/","function IO (config) {","    var io = this;","","    io._uid = 'io:' + uid++;","    io._init(config);","    Y.io._map[io._uid] = io;","}","","IO.prototype = {","    //--------------------------------------","    //  Properties","    //--------------------------------------","","   /**","    * A counter that increments for each transaction.","    *","    * @property _id","    * @private","    * @type {Number}","    */","    _id: 0,","","   /**","    * Object of IO HTTP headers sent with each transaction.","    *","    * @property _headers","    * @private","    * @type {Object}","    */","    _headers: {","        'X-Requested-With' : 'XMLHttpRequest'","    },","","   /**","    * Object that stores timeout values for any transaction with a defined","    * \"timeout\" configuration property.","    *","    * @property _timeout","    * @private","    * @type {Object}","    */","    _timeout: {},","","    //--------------------------------------","    //  Methods","    //--------------------------------------","","    _init: function(config) {","        var io = this, i, len;","","        io.cfg = config || {};","","        Y.augment(io, Y.EventTarget);","        for (i = 0, len = EVENTS.length; i < len; ++i) {","            // Publish IO global events with configurations, if any.","            // IO global events are set to broadcast by default.","            // These events use the \"io:\" namespace.","            io.publish('io:' + EVENTS[i], Y.merge({ broadcast: 1 }, config));","            // Publish IO transaction events with configurations, if","            // any.  These events use the \"io-trn:\" namespace.","            io.publish('io-trn:' + EVENTS[i], config);","        }","    },","","   /**","    * Method that creates a unique transaction object for each request.","    *","    * @method _create","    * @private","    * @param {Object} cfg Configuration object subset to determine if","    *                 the transaction is an XDR or file upload,","    *                 requiring an alternate transport.","    * @param {Number} id Transaction id","    * @return {Object} The transaction object","    */","    _create: function(config, id) {","        var io = this,","            transaction = {","                id : Y.Lang.isNumber(id) ? id : io._id++,","                uid: io._uid","            },","            alt = config.xdr ? config.xdr.use : null,","            form = config.form && config.form.upload ? 'iframe' : null,","            use;","","        if (alt === 'native') {","            // Non-IE  can use XHR level 2 and not rely on an","            // external transport.","            alt = Y.UA.ie ? 'xdr' : null;","        }","","        use = alt || form;","        transaction = use ? Y.merge(Y.IO.customTransport(use), transaction) :","                            Y.merge(Y.IO.defaultTransport(), transaction);","","        if (transaction.notify) {","            config.notify = function (e, t, c) { io.notify(e, t, c); };","        }","","        if (!use) {","            if (win && win.FormData && config.data instanceof win.FormData) {","                transaction.c.upload.onprogress = function (e) {","                    io.progress(transaction, e, config);","                };","                transaction.c.onload = function (e) {","                    io.load(transaction, e, config);","                };","                transaction.c.onerror = function (e) {","                    io.error(transaction, e, config);","                };","                transaction.upload = true;","            }","        }","","        return transaction;","    },","","    _destroy: function(transaction) {","        if (win && !transaction.notify && !transaction.xdr) {","            if (XHR && !transaction.upload) {","                transaction.c.onreadystatechange = null;","            } else if (transaction.upload) {","                transaction.c.upload.onprogress = null;","                transaction.c.onload = null;","                transaction.c.onerror = null;","            } else if (Y.UA.ie && !transaction.e) {","                // IE, when using XMLHttpRequest as an ActiveX Object, will throw","                // a \"Type Mismatch\" error if the event handler is set to \"null\".","                transaction.c.abort();","            }","        }","","        transaction = transaction.c = null;","    },","","   /**","    * Method for creating and firing events.","    *","    * @method _evt","    * @private","    * @param {String} eventName Event to be published.","    * @param {Object} transaction Transaction object.","    * @param {Object} config Configuration data subset for event subscription.","    */","    _evt: function(eventName, transaction, config) {","        var io          = this, params,","            args        = config['arguments'],","            emitFacade  = io.cfg.emitFacade,","            globalEvent = \"io:\" + eventName,","            trnEvent    = \"io-trn:\" + eventName;","","        // Workaround for #2532107","        this.detach(trnEvent);","","        if (transaction.e) {","            transaction.c = { status: 0, statusText: transaction.e };","        }","","        // Fire event with parameters or an Event Facade.","        params = [ emitFacade ?","            {","                id: transaction.id,","                data: transaction.c,","                cfg: config,","                'arguments': args","            } :","            transaction.id","        ];","","        if (!emitFacade) {","            if (eventName === EVENTS[0] || eventName === EVENTS[2]) {","                if (args) {","                    params.push(args);","                }","            } else {","                if (transaction.evt) {","                    params.push(transaction.evt);","                } else {","                    params.push(transaction.c);","                }","                if (args) {","                    params.push(args);","                }","            }","        }","","        params.unshift(globalEvent);","        // Fire global events.","        io.fire.apply(io, params);","        // Fire transaction events, if receivers are defined.","        if (config.on) {","            params[0] = trnEvent;","            io.once(trnEvent, config.on[eventName], config.context || Y);","            io.fire.apply(io, params);","        }","    },","","   /**","    * Fires event \"io:start\" and creates, fires a transaction-specific","    * start event, if `config.on.start` is defined.","    *","    * @method start","    * @param {Object} transaction Transaction object.","    * @param {Object} config Configuration object for the transaction.","    */","    start: function(transaction, config) {","       /**","        * Signals the start of an IO request.","        * @event io:start","        */","        this._evt(EVENTS[0], transaction, config);","    },","","   /**","    * Fires event \"io:complete\" and creates, fires a","    * transaction-specific \"complete\" event, if config.on.complete is","    * defined.","    *","    * @method complete","    * @param {Object} transaction Transaction object.","    * @param {Object} config Configuration object for the transaction.","    */","    complete: function(transaction, config) {","       /**","        * Signals the completion of the request-response phase of a","        * transaction. Response status and data are accessible, if","        * available, in this event.","        * @event io:complete","        */","        this._evt(EVENTS[1], transaction, config);","    },","","   /**","    * Fires event \"io:end\" and creates, fires a transaction-specific \"end\"","    * event, if config.on.end is defined.","    *","    * @method end","    * @param {Object} transaction Transaction object.","    * @param {Object} config Configuration object for the transaction.","    */","    end: function(transaction, config) {","       /**","        * Signals the end of the transaction lifecycle.","        * @event io:end","        */","        this._evt(EVENTS[2], transaction, config);","        this._destroy(transaction);","    },","","   /**","    * Fires event \"io:success\" and creates, fires a transaction-specific","    * \"success\" event, if config.on.success is defined.","    *","    * @method success","    * @param {Object} transaction Transaction object.","    * @param {Object} config Configuration object for the transaction.","    */","    success: function(transaction, config) {","       /**","        * Signals an HTTP response with status in the 2xx range.","        * Fires after io:complete.","        * @event io:success","        */","        this._evt(EVENTS[3], transaction, config);","        this.end(transaction, config);","    },","","   /**","    * Fires event \"io:failure\" and creates, fires a transaction-specific","    * \"failure\" event, if config.on.failure is defined.","    *","    * @method failure","    * @param {Object} transaction Transaction object.","    * @param {Object} config Configuration object for the transaction.","    */","    failure: function(transaction, config) {","       /**","        * Signals an HTTP response with status outside of the 2xx range.","        * Fires after io:complete.","        * @event io:failure","        */","        this._evt(EVENTS[4], transaction, config);","        this.end(transaction, config);","    },","","   /**","    * Fires event \"io:progress\" and creates, fires a transaction-specific","    * \"progress\" event -- for XMLHttpRequest file upload -- if","    * config.on.progress is defined.","    *","    * @method progress","    * @param {Object} transaction Transaction object.","    * @param {Object} progress event.","    * @param {Object} config Configuration object for the transaction.","    */","    progress: function(transaction, e, config) {","       /**","        * Signals the interactive state during a file upload transaction.","        * This event fires after io:start and before io:complete.","        * @event io:progress","        */","        transaction.evt = e;","        this._evt(EVENTS[5], transaction, config);","    },","","   /**","    * Fires event \"io:complete\" and creates, fires a transaction-specific","    * \"complete\" event -- for XMLHttpRequest file upload -- if","    * config.on.complete is defined.","    *","    * @method load","    * @param {Object} transaction Transaction object.","    * @param {Object} load event.","    * @param {Object} config Configuration object for the transaction.","    */","    load: function (transaction, e, config) {","        transaction.evt = e.target;","        this._evt(EVENTS[1], transaction, config);","    },","","   /**","    * Fires event \"io:failure\" and creates, fires a transaction-specific","    * \"failure\" event -- for XMLHttpRequest file upload -- if","    * config.on.failure is defined.","    *","    * @method error","    * @param {Object} transaction Transaction object.","    * @param {Object} error event.","    * @param {Object} config Configuration object for the transaction.","    */","    error: function (transaction, e, config) {","        transaction.evt = e;","        this._evt(EVENTS[4], transaction, config);","    },","","   /**","    * Retry an XDR transaction, using the Flash tranport, if the native","    * transport fails.","    *","    * @method _retry","    * @private","    * @param {Object} transaction Transaction object.","    * @param {String} uri Qualified path to transaction resource.","    * @param {Object} config Configuration object for the transaction.","    */","    _retry: function(transaction, uri, config) {","        this._destroy(transaction);","        config.xdr.use = 'flash';","        return this.send(uri, config, transaction.id);","    },","","   /**","    * Method that concatenates string data for HTTP GET transactions.","    *","    * @method _concat","    * @private","    * @param {String} uri URI or root data.","    * @param {String} data Data to be concatenated onto URI.","    * @return {String}","    */","    _concat: function(uri, data) {","        uri += (uri.indexOf('?') === -1 ? '?' : '&') + data;","        return uri;","    },","","   /**","    * Stores default client headers for all transactions. If a label is","    * passed with no value argument, the header will be deleted.","    *","    * @method setHeader","    * @param {String} name HTTP header","    * @param {String} value HTTP header value","    */","    setHeader: function(name, value) {","        if (value) {","            this._headers[name] = value;","        } else {","            delete this._headers[name];","        }","    },","","   /**","    * Method that sets all HTTP headers to be sent in a transaction.","    *","    * @method _setHeaders","    * @private","    * @param {Object} transaction - XHR instance for the specific transaction.","    * @param {Object} headers - HTTP headers for the specific transaction, as","    *                    defined in the configuration object passed to YUI.io().","    */","    _setHeaders: function(transaction, headers) {","        headers = Y.merge(this._headers, headers);","        Y.Object.each(headers, function(value, name) {","            if (value !== 'disable') {","                transaction.setRequestHeader(name, headers[name]);","            }","        });","    },","","   /**","    * Starts timeout count if the configuration object has a defined","    * timeout property.","    *","    * @method _startTimeout","    * @private","    * @param {Object} transaction Transaction object generated by _create().","    * @param {Object} timeout Timeout in milliseconds.","    */","    _startTimeout: function(transaction, timeout) {","        var io = this;","","        io._timeout[transaction.id] = setTimeout(function() {","            io._abort(transaction, 'timeout');","        }, timeout);","    },","","   /**","    * Clears the timeout interval started by _startTimeout().","    *","    * @method _clearTimeout","    * @private","    * @param {Number} id - Transaction id.","    */","    _clearTimeout: function(id) {","        clearTimeout(this._timeout[id]);","        delete this._timeout[id];","    },","","   /**","    * Method that determines if a transaction response qualifies as success","    * or failure, based on the response HTTP status code, and fires the","    * appropriate success or failure events.","    *","    * @method _result","    * @private","    * @static","    * @param {Object} transaction Transaction object generated by _create().","    * @param {Object} config Configuration object passed to io().","    */","    _result: function(transaction, config) {","        var status;","        // Firefox will throw an exception if attempting to access","        // an XHR object's status property, after a request is aborted.","        try {","            status = transaction.c.status;","        } catch(e) {","            status = 0;","        }","","        // IE reports HTTP 204 as HTTP 1223.","        if (status >= 200 && status < 300 || status === 304 || status === 1223) {","            this.success(transaction, config);","        } else {","            this.failure(transaction, config);","        }","    },","","   /**","    * Event handler bound to onreadystatechange.","    *","    * @method _rS","    * @private","    * @param {Object} transaction Transaction object generated by _create().","    * @param {Object} config Configuration object passed to YUI.io().","    */","    _rS: function(transaction, config) {","        var io = this;","","        if (transaction.c.readyState === 4) {","            if (config.timeout) {","                io._clearTimeout(transaction.id);","            }","","            // Yield in the event of request timeout or abort.","            setTimeout(function() {","                io.complete(transaction, config);","                io._result(transaction, config);","            }, 0);","        }","    },","","   /**","    * Terminates a transaction due to an explicit abort or timeout.","    *","    * @method _abort","    * @private","    * @param {Object} transaction Transaction object generated by _create().","    * @param {String} type Identifies timed out or aborted transaction.","    */","    _abort: function(transaction, type) {","        if (transaction && transaction.c) {","            transaction.e = type;","            transaction.c.abort();","        }","    },","","   /**","    * Requests a transaction. `send()` is implemented as `Y.io()`.  Each","    * transaction may include a configuration object.  Its properties are:","    *","    * <dl>","    *   <dt>method</dt>","    *     <dd>HTTP method verb (e.g., GET or POST). If this property is not","    *         not defined, the default value will be GET.</dd>","    *","    *   <dt>data</dt>","    *     <dd>This is the name-value string that will be sent as the","    *     transaction data. If the request is HTTP GET, the data become","    *     part of querystring. If HTTP POST, the data are sent in the","    *     message body.</dd>","    *","    *   <dt>xdr</dt>","    *     <dd>Defines the transport to be used for cross-domain requests.","    *     By setting this property, the transaction will use the specified","    *     transport instead of XMLHttpRequest. The properties of the","    *     transport object are:","    *     <dl>","    *       <dt>use</dt>","    *         <dd>The transport to be used: 'flash' or 'native'</dd>","    *       <dt>dataType</dt>","    *         <dd>Set the value to 'XML' if that is the expected response","    *         content type.</dd>","    *     </dl></dd>","    *","    *   <dt>form</dt>","    *     <dd>Form serialization configuration object.  Its properties are:","    *     <dl>","    *       <dt>id</dt>","    *         <dd>Node object or id of HTML form</dd>","    *       <dt>useDisabled</dt>","    *         <dd>`true` to also serialize disabled form field values","    *         (defaults to `false`)</dd>","    *     </dl></dd>","    *","    *   <dt>on</dt>","    *     <dd>Assigns transaction event subscriptions. Available events are:","    *     <dl>","    *       <dt>start</dt>","    *         <dd>Fires when a request is sent to a resource.</dd>","    *       <dt>complete</dt>","    *         <dd>Fires when the transaction is complete.</dd>","    *       <dt>success</dt>","    *         <dd>Fires when the HTTP response status is within the 2xx","    *         range.</dd>","    *       <dt>failure</dt>","    *         <dd>Fires when the HTTP response status is outside the 2xx","    *         range, if an exception occurs, if the transation is aborted,","    *         or if the transaction exceeds a configured `timeout`.</dd>","    *       <dt>end</dt>","    *         <dd>Fires at the conclusion of the transaction","    *            lifecycle, after `success` or `failure`.</dd>","    *     </dl>","    *","    *     <p>Callback functions for `start` and `end` receive the id of the","    *     transaction as a first argument. For `complete`, `success`, and","    *     `failure`, callbacks receive the id and the response object","    *     (usually the XMLHttpRequest instance).  If the `arguments`","    *     property was included in the configuration object passed to","    *     `Y.io()`, the configured data will be passed to all callbacks as","    *     the last argument.</p>","    *     </dd>","    *","    *   <dt>sync</dt>","    *     <dd>Pass `true` to make a same-domain transaction synchronous.","    *     <strong>CAVEAT</strong>: This will negatively impact the user","    *     experience. Have a <em>very</em> good reason if you intend to use","    *     this.</dd>","    *","    *   <dt>context</dt>","    *     <dd>The \"`this'\" object for all configured event handlers. If a","    *     specific context is needed for individual callbacks, bind the","    *     callback to a context using `Y.bind()`.</dd>","    *","    *   <dt>headers</dt>","    *     <dd>Object map of transaction headers to send to the server. The","    *     object keys are the header names and the values are the header","    *     values.</dd>","    *","    *   <dt>timeout</dt>","    *     <dd>Millisecond threshold for the transaction before being","    *     automatically aborted.</dd>","    *","    *   <dt>arguments</dt>","    *     <dd>User-defined data passed to all registered event handlers.","    *     This value is available as the second argument in the \"start\" and","    *     \"end\" event handlers. It is the third argument in the \"complete\",","    *     \"success\", and \"failure\" event handlers. <strong>Be sure to quote","    *     this property name in the transaction configuration as","    *     \"arguments\" is a reserved word in JavaScript</strong> (e.g.","    *     `Y.io({ ..., \"arguments\": stuff })`).</dd>","    * </dl>","    *","    * @method send","    * @public","    * @param {String} uri Qualified path to transaction resource.","    * @param {Object} config Configuration object for the transaction.","    * @param {Number} id Transaction id, if already set.","    * @return {Object}","    */","    send: function(uri, config, id) {","        var transaction, method, i, len, sync, data,","            io = this,","            u = uri,","            response = {};","","        config = config ? Y.Object(config) : {};","        transaction = io._create(config, id);","        method = config.method ? config.method.toUpperCase() : 'GET';","        sync = config.sync;","        data = config.data;","","        // Serialize an map object into a key-value string using","        // querystring-stringify-simple.","        if ((Y.Lang.isObject(data) && !data.nodeType) && !transaction.upload) {","            data = Y.QueryString.stringify(data);","        }","","        if (config.form) {","            if (config.form.upload) {","                // This is a file upload transaction, calling","                // upload() in io-upload-iframe.","                return io.upload(transaction, uri, config);","            } else {","                // Serialize HTML form data into a key-value string.","                data = io._serialize(config.form, data);","            }","        }","","        if (data) {","            switch (method) {","                case 'GET':","                case 'HEAD':","                case 'DELETE':","                    u = io._concat(u, data);","                    data = '';","                    break;","                case 'POST':","                case 'PUT':","                    // If Content-Type is defined in the configuration object, or","                    // or as a default header, it will be used instead of","                    // 'application/x-www-form-urlencoded; charset=UTF-8'","                    config.headers = Y.merge({","                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'","                    }, config.headers);","                    break;","            }","        }","","        if (transaction.xdr) {","            // Route data to io-xdr module for flash and XDomainRequest.","            return io.xdr(u, transaction, config);","        }","        else if (transaction.notify) {","            // Route data to custom transport","            return transaction.c.send(transaction, uri, config);","        }","","        if (!sync && !transaction.upload) {","            transaction.c.onreadystatechange = function() {","                io._rS(transaction, config);","            };","        }","","        try {","            // Determine if request is to be set as","            // synchronous or asynchronous.","            transaction.c.open(method, u, !sync, config.username || null, config.password || null);","            io._setHeaders(transaction.c, config.headers || {});","            io.start(transaction, config);","","            // Will work only in browsers that implement the","            // Cross-Origin Resource Sharing draft.","            if (config.xdr && config.xdr.credentials) {","                if (!Y.UA.ie) {","                    transaction.c.withCredentials = true;","                }","            }","","            // Using \"null\" with HTTP POST will result in a request","            // with no Content-Length header defined.","            transaction.c.send(data);","","            if (sync) {","                // Create a response object for synchronous transactions,","                // mixing id and arguments properties with the xhr","                // properties whitelist.","                for (i = 0, len = XHR_PROPS.length; i < len; ++i) {","                    response[XHR_PROPS[i]] = transaction.c[XHR_PROPS[i]];","                }","","                response.getAllResponseHeaders = function() {","                    return transaction.c.getAllResponseHeaders();","                };","","                response.getResponseHeader = function(name) {","                    return transaction.c.getResponseHeader(name);","                };","","                io.complete(transaction, config);","                io._result(transaction, config);","","                return response;","            }","        } catch(e) {","            if (transaction.xdr) {","                // This exception is usually thrown by browsers","                // that do not support XMLHttpRequest Level 2.","                // Retry the request with the XDR transport set","                // to 'flash'.  If the Flash transport is not","                // initialized or available, the transaction","                // will resolve to a transport error.","                return io._retry(transaction, uri, config);","            } else {","                io.complete(transaction, config);","                io._result(transaction, config);","            }","        }","","        // If config.timeout is defined, and the request is standard XHR,","        // initialize timeout polling.","        if (config.timeout) {","            io._startTimeout(transaction, config.timeout);","        }","","        return {","            id: transaction.id,","            abort: function() {","                return transaction.c ? io._abort(transaction, 'abort') : false;","            },","            isInProgress: function() {","                return transaction.c ? (transaction.c.readyState % 4) : false;","            },","            io: io","        };","    }","};","","/**","Method for initiating an ajax call.  The first argument is the url end","point for the call.  The second argument is an object to configure the","transaction and attach event subscriptions.  The configuration object","supports the following properties:","","<dl>","  <dt>method</dt>","    <dd>HTTP method verb (e.g., GET or POST). If this property is not","        not defined, the default value will be GET.</dd>","","  <dt>data</dt>","    <dd>This is the name-value string that will be sent as the","    transaction data. If the request is HTTP GET, the data become","    part of querystring. If HTTP POST, the data are sent in the","    message body.</dd>","","  <dt>xdr</dt>","    <dd>Defines the transport to be used for cross-domain requests.","    By setting this property, the transaction will use the specified","    transport instead of XMLHttpRequest. The properties of the","    transport object are:","    <dl>","      <dt>use</dt>","        <dd>The transport to be used: 'flash' or 'native'</dd>","      <dt>dataType</dt>","        <dd>Set the value to 'XML' if that is the expected response","        content type.</dd>","    </dl></dd>","","  <dt>form</dt>","    <dd>Form serialization configuration object.  Its properties are:","    <dl>","      <dt>id</dt>","        <dd>Node object or id of HTML form</dd>","      <dt>useDisabled</dt>","        <dd>`true` to also serialize disabled form field values","        (defaults to `false`)</dd>","    </dl></dd>","","  <dt>on</dt>","    <dd>Assigns transaction event subscriptions. Available events are:","    <dl>","      <dt>start</dt>","        <dd>Fires when a request is sent to a resource.</dd>","      <dt>complete</dt>","        <dd>Fires when the transaction is complete.</dd>","      <dt>success</dt>","        <dd>Fires when the HTTP response status is within the 2xx","        range.</dd>","      <dt>failure</dt>","        <dd>Fires when the HTTP response status is outside the 2xx","        range, if an exception occurs, if the transation is aborted,","        or if the transaction exceeds a configured `timeout`.</dd>","      <dt>end</dt>","        <dd>Fires at the conclusion of the transaction","           lifecycle, after `success` or `failure`.</dd>","    </dl>","","    <p>Callback functions for `start` and `end` receive the id of the","    transaction as a first argument. For `complete`, `success`, and","    `failure`, callbacks receive the id and the response object","    (usually the XMLHttpRequest instance).  If the `arguments`","    property was included in the configuration object passed to","    `Y.io()`, the configured data will be passed to all callbacks as","    the last argument.</p>","    </dd>","","  <dt>sync</dt>","    <dd>Pass `true` to make a same-domain transaction synchronous.","    <strong>CAVEAT</strong>: This will negatively impact the user","    experience. Have a <em>very</em> good reason if you intend to use","    this.</dd>","","  <dt>context</dt>","    <dd>The \"`this'\" object for all configured event handlers. If a","    specific context is needed for individual callbacks, bind the","    callback to a context using `Y.bind()`.</dd>","","  <dt>headers</dt>","    <dd>Object map of transaction headers to send to the server. The","    object keys are the header names and the values are the header","    values.</dd>","","  <dt>timeout</dt>","    <dd>Millisecond threshold for the transaction before being","    automatically aborted.</dd>","","  <dt>arguments</dt>","    <dd>User-defined data passed to all registered event handlers.","    This value is available as the second argument in the \"start\" and","    \"end\" event handlers. It is the third argument in the \"complete\",","    \"success\", and \"failure\" event handlers. <strong>Be sure to quote","    this property name in the transaction configuration as","    \"arguments\" is a reserved word in JavaScript</strong> (e.g.","    `Y.io({ ..., \"arguments\": stuff })`).</dd>","</dl>","","@method io","@static","@param {String} url qualified path to transaction resource.","@param {Object} config configuration object for the transaction.","@return {Object}","@for YUI","**/","Y.io = function(url, config) {","    // Calling IO through the static interface will use and reuse","    // an instance of IO.","    var transaction = Y.io._map['io:0'] || new IO();","    return transaction.send.apply(transaction, [url, config]);","};","","/**","Method for setting and deleting IO HTTP headers to be sent with every","request.","","Hosted as a property on the `io` function (e.g. `Y.io.header`).","","@method header","@param {String} name HTTP header","@param {String} value HTTP header value","@static","**/","Y.io.header = function(name, value) {","    // Calling IO through the static interface will use and reuse","    // an instance of IO.","    var transaction = Y.io._map['io:0'] || new IO();","    transaction.setHeader(name, value);","};","","Y.IO = IO;","// Map of all IO instances created.","Y.io._map = {};","var XHR = win && win.XMLHttpRequest,","    XDR = win && win.XDomainRequest,","    AX = win && win.ActiveXObject;","","","Y.mix(Y.IO, {","    /**","    * The ID of the default IO transport, defaults to `xhr`","    * @property _default","    * @type {String}","    * @static","    */","    _default: 'xhr',","    /**","    *","    * @method defaultTransport","    * @static","    * @param {String} [id] The transport to set as the default, if empty a new transport is created.","    * @return {Object} The transport object with a `send` method","    */","    defaultTransport: function(id) {","        if (id) {","            Y.IO._default = id;","        } else {","            var o = {","                c: Y.IO.transports[Y.IO._default](),","                notify: Y.IO._default === 'xhr' ? false : true","            };","            return o;","        }","    },","    /**","    * An object hash of custom transports available to IO","    * @property transports","    * @type {Object}","    * @static","    */","    transports: {","        xhr: function () {","            return XHR ? new XMLHttpRequest() :","                AX ? new ActiveXObject('Microsoft.XMLHTTP') : null;","        },","        xdr: function () {","            return XDR ? new XDomainRequest() : null;","        },","        iframe: function () { return {}; },","        flash: null,","        nodejs: null","    },","    /**","    * Create a custom transport of type and return it's object","    * @method customTransport","    * @param {String} id The id of the transport to create.","    * @static","    */","    customTransport: function(id) {","        var o = { c: Y.IO.transports[id]() };","","        o[(id === 'xdr' || id === 'flash') ? 'xdr' : 'notify'] = true;","        return o;","    }","});","","Y.mix(Y.IO.prototype, {","    /**","    * Fired from the notify method of the transport which in turn fires","    * the event on the IO object.","    * @method notify","    * @param {String} event The name of the event","    * @param {Object} transaction The transaction object","    * @param {Object} config The configuration object for this transaction","    */","    notify: function(event, transaction, config) {","        var io = this;","","        switch (event) {","            case 'timeout':","            case 'abort':","            case 'transport error':","                transaction.c = { status: 0, statusText: event };","                event = 'failure';","            default:","                io[event].apply(io, [transaction, config]);","        }","    }","});","","","","","}, '@VERSION@' ,{requires:['event-custom-base', 'querystring-stringify-simple']});"];
_yuitest_coverage["/build/io-base/io-base.js"].lines = {"1":0,"11":0,"32":0,"33":0,"35":0,"36":0,"37":0,"40":0,"80":0,"82":0,"84":0,"85":0,"89":0,"92":0,"108":0,"117":0,"120":0,"123":0,"124":0,"127":0,"128":0,"131":0,"132":0,"133":0,"134":0,"136":0,"137":0,"139":0,"140":0,"142":0,"146":0,"150":0,"151":0,"152":0,"153":0,"154":0,"155":0,"156":0,"157":0,"160":0,"164":0,"177":0,"184":0,"186":0,"187":0,"191":0,"201":0,"202":0,"203":0,"204":0,"207":0,"208":0,"210":0,"212":0,"213":0,"218":0,"220":0,"222":0,"223":0,"224":0,"225":0,"242":0,"261":0,"277":0,"278":0,"295":0,"296":0,"313":0,"314":0,"333":0,"334":0,"348":0,"349":0,"363":0,"364":0,"378":0,"379":0,"380":0,"393":0,"394":0,"406":0,"407":0,"409":0,"423":0,"424":0,"425":0,"426":0,"441":0,"443":0,"444":0,"456":0,"457":0,"472":0,"475":0,"476":0,"478":0,"482":0,"483":0,"485":0,"498":0,"500":0,"501":0,"502":0,"506":0,"507":0,"508":0,"522":0,"523":0,"524":0,"632":0,"637":0,"638":0,"639":0,"640":0,"641":0,"645":0,"646":0,"649":0,"650":0,"653":0,"656":0,"660":0,"661":0,"665":0,"666":0,"667":0,"673":0,"676":0,"680":0,"682":0,"684":0,"686":0,"689":0,"690":0,"691":0,"695":0,"698":0,"699":0,"700":0,"704":0,"705":0,"706":0,"712":0,"714":0,"718":0,"719":0,"722":0,"723":0,"726":0,"727":0,"730":0,"731":0,"733":0,"736":0,"743":0,"745":0,"746":0,"752":0,"753":0,"756":0,"759":0,"762":0,"874":0,"877":0,"878":0,"892":0,"895":0,"896":0,"899":0,"901":0,"902":0,"907":0,"923":0,"924":0,"926":0,"930":0,"941":0,"945":0,"947":0,"958":0,"960":0,"961":0,"965":0,"975":0,"977":0,"981":0,"982":0,"984":0};
_yuitest_coverage["/build/io-base/io-base.js"].functions = {"IO:32":0,"_init:79":0,"notify:128":0,"onprogress:133":0,"onload:136":0,"onerror:139":0,"_create:107":0,"_destroy:149":0,"_evt:176":0,"start:237":0,"complete:254":0,"end:272":0,"success:289":0,"failure:307":0,"progress:327":0,"load:347":0,"error:362":0,"_retry:377":0,"_concat:392":0,"setHeader:405":0,"(anonymous 2):424":0,"_setHeaders:422":0,"(anonymous 3):443":0,"_startTimeout:440":0,"_clearTimeout:455":0,"_result:471":0,"(anonymous 4):506":0,"_rS:497":0,"_abort:521":0,"onreadystatechange:690":0,"getAllResponseHeaders:722":0,"getResponseHeader:726":0,"abort:758":0,"isInProgress:761":0,"send:631":0,"io:874":0,"header:892":0,"defaultTransport:922":0,"xhr:940":0,"xdr:944":0,"iframe:947":0,"customTransport:957":0,"notify:974":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/io-base/io-base.js"].coveredLines = 188;
_yuitest_coverage["/build/io-base/io-base.js"].coveredFunctions = 44;
_yuitest_coverline("/build/io-base/io-base.js", 1);
YUI.add('io-base', function(Y) {

/**
Base IO functionality. Provides basic XHR transport support.

@module io
@submodule io-base
@for IO
**/

_yuitest_coverfunc("/build/io-base/io-base.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/io-base/io-base.js", 11);
var // List of events that comprise the IO event lifecycle.
    EVENTS = ['start', 'complete', 'end', 'success', 'failure', 'progress'],

    // Whitelist of used XHR response object properties.
    XHR_PROPS = ['status', 'statusText', 'responseText', 'responseXML'],

    win = Y.config.win,
    uid = 0;

/**
The IO class is a utility that brokers HTTP requests through a simplified
interface.  Specifically, it allows JavaScript to make HTTP requests to
a resource without a page reload.  The underlying transport for making
same-domain requests is the XMLHttpRequest object.  IO can also use
Flash, if specified as a transport, for cross-domain requests.

@class IO
@constructor
@param {Object} config Object of EventTarget's publish method configurations
                    used to configure IO's events.
**/
_yuitest_coverline("/build/io-base/io-base.js", 32);
function IO (config) {
    _yuitest_coverfunc("/build/io-base/io-base.js", "IO", 32);
_yuitest_coverline("/build/io-base/io-base.js", 33);
var io = this;

    _yuitest_coverline("/build/io-base/io-base.js", 35);
io._uid = 'io:' + uid++;
    _yuitest_coverline("/build/io-base/io-base.js", 36);
io._init(config);
    _yuitest_coverline("/build/io-base/io-base.js", 37);
Y.io._map[io._uid] = io;
}

_yuitest_coverline("/build/io-base/io-base.js", 40);
IO.prototype = {
    //--------------------------------------
    //  Properties
    //--------------------------------------

   /**
    * A counter that increments for each transaction.
    *
    * @property _id
    * @private
    * @type {Number}
    */
    _id: 0,

   /**
    * Object of IO HTTP headers sent with each transaction.
    *
    * @property _headers
    * @private
    * @type {Object}
    */
    _headers: {
        'X-Requested-With' : 'XMLHttpRequest'
    },

   /**
    * Object that stores timeout values for any transaction with a defined
    * "timeout" configuration property.
    *
    * @property _timeout
    * @private
    * @type {Object}
    */
    _timeout: {},

    //--------------------------------------
    //  Methods
    //--------------------------------------

    _init: function(config) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "_init", 79);
_yuitest_coverline("/build/io-base/io-base.js", 80);
var io = this, i, len;

        _yuitest_coverline("/build/io-base/io-base.js", 82);
io.cfg = config || {};

        _yuitest_coverline("/build/io-base/io-base.js", 84);
Y.augment(io, Y.EventTarget);
        _yuitest_coverline("/build/io-base/io-base.js", 85);
for (i = 0, len = EVENTS.length; i < len; ++i) {
            // Publish IO global events with configurations, if any.
            // IO global events are set to broadcast by default.
            // These events use the "io:" namespace.
            _yuitest_coverline("/build/io-base/io-base.js", 89);
io.publish('io:' + EVENTS[i], Y.merge({ broadcast: 1 }, config));
            // Publish IO transaction events with configurations, if
            // any.  These events use the "io-trn:" namespace.
            _yuitest_coverline("/build/io-base/io-base.js", 92);
io.publish('io-trn:' + EVENTS[i], config);
        }
    },

   /**
    * Method that creates a unique transaction object for each request.
    *
    * @method _create
    * @private
    * @param {Object} cfg Configuration object subset to determine if
    *                 the transaction is an XDR or file upload,
    *                 requiring an alternate transport.
    * @param {Number} id Transaction id
    * @return {Object} The transaction object
    */
    _create: function(config, id) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "_create", 107);
_yuitest_coverline("/build/io-base/io-base.js", 108);
var io = this,
            transaction = {
                id : Y.Lang.isNumber(id) ? id : io._id++,
                uid: io._uid
            },
            alt = config.xdr ? config.xdr.use : null,
            form = config.form && config.form.upload ? 'iframe' : null,
            use;

        _yuitest_coverline("/build/io-base/io-base.js", 117);
if (alt === 'native') {
            // Non-IE  can use XHR level 2 and not rely on an
            // external transport.
            _yuitest_coverline("/build/io-base/io-base.js", 120);
alt = Y.UA.ie ? 'xdr' : null;
        }

        _yuitest_coverline("/build/io-base/io-base.js", 123);
use = alt || form;
        _yuitest_coverline("/build/io-base/io-base.js", 124);
transaction = use ? Y.merge(Y.IO.customTransport(use), transaction) :
                            Y.merge(Y.IO.defaultTransport(), transaction);

        _yuitest_coverline("/build/io-base/io-base.js", 127);
if (transaction.notify) {
            _yuitest_coverline("/build/io-base/io-base.js", 128);
config.notify = function (e, t, c) { _yuitest_coverfunc("/build/io-base/io-base.js", "notify", 128);
io.notify(e, t, c); };
        }

        _yuitest_coverline("/build/io-base/io-base.js", 131);
if (!use) {
            _yuitest_coverline("/build/io-base/io-base.js", 132);
if (win && win.FormData && config.data instanceof win.FormData) {
                _yuitest_coverline("/build/io-base/io-base.js", 133);
transaction.c.upload.onprogress = function (e) {
                    _yuitest_coverfunc("/build/io-base/io-base.js", "onprogress", 133);
_yuitest_coverline("/build/io-base/io-base.js", 134);
io.progress(transaction, e, config);
                };
                _yuitest_coverline("/build/io-base/io-base.js", 136);
transaction.c.onload = function (e) {
                    _yuitest_coverfunc("/build/io-base/io-base.js", "onload", 136);
_yuitest_coverline("/build/io-base/io-base.js", 137);
io.load(transaction, e, config);
                };
                _yuitest_coverline("/build/io-base/io-base.js", 139);
transaction.c.onerror = function (e) {
                    _yuitest_coverfunc("/build/io-base/io-base.js", "onerror", 139);
_yuitest_coverline("/build/io-base/io-base.js", 140);
io.error(transaction, e, config);
                };
                _yuitest_coverline("/build/io-base/io-base.js", 142);
transaction.upload = true;
            }
        }

        _yuitest_coverline("/build/io-base/io-base.js", 146);
return transaction;
    },

    _destroy: function(transaction) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "_destroy", 149);
_yuitest_coverline("/build/io-base/io-base.js", 150);
if (win && !transaction.notify && !transaction.xdr) {
            _yuitest_coverline("/build/io-base/io-base.js", 151);
if (XHR && !transaction.upload) {
                _yuitest_coverline("/build/io-base/io-base.js", 152);
transaction.c.onreadystatechange = null;
            } else {_yuitest_coverline("/build/io-base/io-base.js", 153);
if (transaction.upload) {
                _yuitest_coverline("/build/io-base/io-base.js", 154);
transaction.c.upload.onprogress = null;
                _yuitest_coverline("/build/io-base/io-base.js", 155);
transaction.c.onload = null;
                _yuitest_coverline("/build/io-base/io-base.js", 156);
transaction.c.onerror = null;
            } else {_yuitest_coverline("/build/io-base/io-base.js", 157);
if (Y.UA.ie && !transaction.e) {
                // IE, when using XMLHttpRequest as an ActiveX Object, will throw
                // a "Type Mismatch" error if the event handler is set to "null".
                _yuitest_coverline("/build/io-base/io-base.js", 160);
transaction.c.abort();
            }}}
        }

        _yuitest_coverline("/build/io-base/io-base.js", 164);
transaction = transaction.c = null;
    },

   /**
    * Method for creating and firing events.
    *
    * @method _evt
    * @private
    * @param {String} eventName Event to be published.
    * @param {Object} transaction Transaction object.
    * @param {Object} config Configuration data subset for event subscription.
    */
    _evt: function(eventName, transaction, config) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "_evt", 176);
_yuitest_coverline("/build/io-base/io-base.js", 177);
var io          = this, params,
            args        = config['arguments'],
            emitFacade  = io.cfg.emitFacade,
            globalEvent = "io:" + eventName,
            trnEvent    = "io-trn:" + eventName;

        // Workaround for #2532107
        _yuitest_coverline("/build/io-base/io-base.js", 184);
this.detach(trnEvent);

        _yuitest_coverline("/build/io-base/io-base.js", 186);
if (transaction.e) {
            _yuitest_coverline("/build/io-base/io-base.js", 187);
transaction.c = { status: 0, statusText: transaction.e };
        }

        // Fire event with parameters or an Event Facade.
        _yuitest_coverline("/build/io-base/io-base.js", 191);
params = [ emitFacade ?
            {
                id: transaction.id,
                data: transaction.c,
                cfg: config,
                'arguments': args
            } :
            transaction.id
        ];

        _yuitest_coverline("/build/io-base/io-base.js", 201);
if (!emitFacade) {
            _yuitest_coverline("/build/io-base/io-base.js", 202);
if (eventName === EVENTS[0] || eventName === EVENTS[2]) {
                _yuitest_coverline("/build/io-base/io-base.js", 203);
if (args) {
                    _yuitest_coverline("/build/io-base/io-base.js", 204);
params.push(args);
                }
            } else {
                _yuitest_coverline("/build/io-base/io-base.js", 207);
if (transaction.evt) {
                    _yuitest_coverline("/build/io-base/io-base.js", 208);
params.push(transaction.evt);
                } else {
                    _yuitest_coverline("/build/io-base/io-base.js", 210);
params.push(transaction.c);
                }
                _yuitest_coverline("/build/io-base/io-base.js", 212);
if (args) {
                    _yuitest_coverline("/build/io-base/io-base.js", 213);
params.push(args);
                }
            }
        }

        _yuitest_coverline("/build/io-base/io-base.js", 218);
params.unshift(globalEvent);
        // Fire global events.
        _yuitest_coverline("/build/io-base/io-base.js", 220);
io.fire.apply(io, params);
        // Fire transaction events, if receivers are defined.
        _yuitest_coverline("/build/io-base/io-base.js", 222);
if (config.on) {
            _yuitest_coverline("/build/io-base/io-base.js", 223);
params[0] = trnEvent;
            _yuitest_coverline("/build/io-base/io-base.js", 224);
io.once(trnEvent, config.on[eventName], config.context || Y);
            _yuitest_coverline("/build/io-base/io-base.js", 225);
io.fire.apply(io, params);
        }
    },

   /**
    * Fires event "io:start" and creates, fires a transaction-specific
    * start event, if `config.on.start` is defined.
    *
    * @method start
    * @param {Object} transaction Transaction object.
    * @param {Object} config Configuration object for the transaction.
    */
    start: function(transaction, config) {
       /**
        * Signals the start of an IO request.
        * @event io:start
        */
        _yuitest_coverfunc("/build/io-base/io-base.js", "start", 237);
_yuitest_coverline("/build/io-base/io-base.js", 242);
this._evt(EVENTS[0], transaction, config);
    },

   /**
    * Fires event "io:complete" and creates, fires a
    * transaction-specific "complete" event, if config.on.complete is
    * defined.
    *
    * @method complete
    * @param {Object} transaction Transaction object.
    * @param {Object} config Configuration object for the transaction.
    */
    complete: function(transaction, config) {
       /**
        * Signals the completion of the request-response phase of a
        * transaction. Response status and data are accessible, if
        * available, in this event.
        * @event io:complete
        */
        _yuitest_coverfunc("/build/io-base/io-base.js", "complete", 254);
_yuitest_coverline("/build/io-base/io-base.js", 261);
this._evt(EVENTS[1], transaction, config);
    },

   /**
    * Fires event "io:end" and creates, fires a transaction-specific "end"
    * event, if config.on.end is defined.
    *
    * @method end
    * @param {Object} transaction Transaction object.
    * @param {Object} config Configuration object for the transaction.
    */
    end: function(transaction, config) {
       /**
        * Signals the end of the transaction lifecycle.
        * @event io:end
        */
        _yuitest_coverfunc("/build/io-base/io-base.js", "end", 272);
_yuitest_coverline("/build/io-base/io-base.js", 277);
this._evt(EVENTS[2], transaction, config);
        _yuitest_coverline("/build/io-base/io-base.js", 278);
this._destroy(transaction);
    },

   /**
    * Fires event "io:success" and creates, fires a transaction-specific
    * "success" event, if config.on.success is defined.
    *
    * @method success
    * @param {Object} transaction Transaction object.
    * @param {Object} config Configuration object for the transaction.
    */
    success: function(transaction, config) {
       /**
        * Signals an HTTP response with status in the 2xx range.
        * Fires after io:complete.
        * @event io:success
        */
        _yuitest_coverfunc("/build/io-base/io-base.js", "success", 289);
_yuitest_coverline("/build/io-base/io-base.js", 295);
this._evt(EVENTS[3], transaction, config);
        _yuitest_coverline("/build/io-base/io-base.js", 296);
this.end(transaction, config);
    },

   /**
    * Fires event "io:failure" and creates, fires a transaction-specific
    * "failure" event, if config.on.failure is defined.
    *
    * @method failure
    * @param {Object} transaction Transaction object.
    * @param {Object} config Configuration object for the transaction.
    */
    failure: function(transaction, config) {
       /**
        * Signals an HTTP response with status outside of the 2xx range.
        * Fires after io:complete.
        * @event io:failure
        */
        _yuitest_coverfunc("/build/io-base/io-base.js", "failure", 307);
_yuitest_coverline("/build/io-base/io-base.js", 313);
this._evt(EVENTS[4], transaction, config);
        _yuitest_coverline("/build/io-base/io-base.js", 314);
this.end(transaction, config);
    },

   /**
    * Fires event "io:progress" and creates, fires a transaction-specific
    * "progress" event -- for XMLHttpRequest file upload -- if
    * config.on.progress is defined.
    *
    * @method progress
    * @param {Object} transaction Transaction object.
    * @param {Object} progress event.
    * @param {Object} config Configuration object for the transaction.
    */
    progress: function(transaction, e, config) {
       /**
        * Signals the interactive state during a file upload transaction.
        * This event fires after io:start and before io:complete.
        * @event io:progress
        */
        _yuitest_coverfunc("/build/io-base/io-base.js", "progress", 327);
_yuitest_coverline("/build/io-base/io-base.js", 333);
transaction.evt = e;
        _yuitest_coverline("/build/io-base/io-base.js", 334);
this._evt(EVENTS[5], transaction, config);
    },

   /**
    * Fires event "io:complete" and creates, fires a transaction-specific
    * "complete" event -- for XMLHttpRequest file upload -- if
    * config.on.complete is defined.
    *
    * @method load
    * @param {Object} transaction Transaction object.
    * @param {Object} load event.
    * @param {Object} config Configuration object for the transaction.
    */
    load: function (transaction, e, config) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "load", 347);
_yuitest_coverline("/build/io-base/io-base.js", 348);
transaction.evt = e.target;
        _yuitest_coverline("/build/io-base/io-base.js", 349);
this._evt(EVENTS[1], transaction, config);
    },

   /**
    * Fires event "io:failure" and creates, fires a transaction-specific
    * "failure" event -- for XMLHttpRequest file upload -- if
    * config.on.failure is defined.
    *
    * @method error
    * @param {Object} transaction Transaction object.
    * @param {Object} error event.
    * @param {Object} config Configuration object for the transaction.
    */
    error: function (transaction, e, config) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "error", 362);
_yuitest_coverline("/build/io-base/io-base.js", 363);
transaction.evt = e;
        _yuitest_coverline("/build/io-base/io-base.js", 364);
this._evt(EVENTS[4], transaction, config);
    },

   /**
    * Retry an XDR transaction, using the Flash tranport, if the native
    * transport fails.
    *
    * @method _retry
    * @private
    * @param {Object} transaction Transaction object.
    * @param {String} uri Qualified path to transaction resource.
    * @param {Object} config Configuration object for the transaction.
    */
    _retry: function(transaction, uri, config) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "_retry", 377);
_yuitest_coverline("/build/io-base/io-base.js", 378);
this._destroy(transaction);
        _yuitest_coverline("/build/io-base/io-base.js", 379);
config.xdr.use = 'flash';
        _yuitest_coverline("/build/io-base/io-base.js", 380);
return this.send(uri, config, transaction.id);
    },

   /**
    * Method that concatenates string data for HTTP GET transactions.
    *
    * @method _concat
    * @private
    * @param {String} uri URI or root data.
    * @param {String} data Data to be concatenated onto URI.
    * @return {String}
    */
    _concat: function(uri, data) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "_concat", 392);
_yuitest_coverline("/build/io-base/io-base.js", 393);
uri += (uri.indexOf('?') === -1 ? '?' : '&') + data;
        _yuitest_coverline("/build/io-base/io-base.js", 394);
return uri;
    },

   /**
    * Stores default client headers for all transactions. If a label is
    * passed with no value argument, the header will be deleted.
    *
    * @method setHeader
    * @param {String} name HTTP header
    * @param {String} value HTTP header value
    */
    setHeader: function(name, value) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "setHeader", 405);
_yuitest_coverline("/build/io-base/io-base.js", 406);
if (value) {
            _yuitest_coverline("/build/io-base/io-base.js", 407);
this._headers[name] = value;
        } else {
            _yuitest_coverline("/build/io-base/io-base.js", 409);
delete this._headers[name];
        }
    },

   /**
    * Method that sets all HTTP headers to be sent in a transaction.
    *
    * @method _setHeaders
    * @private
    * @param {Object} transaction - XHR instance for the specific transaction.
    * @param {Object} headers - HTTP headers for the specific transaction, as
    *                    defined in the configuration object passed to YUI.io().
    */
    _setHeaders: function(transaction, headers) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "_setHeaders", 422);
_yuitest_coverline("/build/io-base/io-base.js", 423);
headers = Y.merge(this._headers, headers);
        _yuitest_coverline("/build/io-base/io-base.js", 424);
Y.Object.each(headers, function(value, name) {
            _yuitest_coverfunc("/build/io-base/io-base.js", "(anonymous 2)", 424);
_yuitest_coverline("/build/io-base/io-base.js", 425);
if (value !== 'disable') {
                _yuitest_coverline("/build/io-base/io-base.js", 426);
transaction.setRequestHeader(name, headers[name]);
            }
        });
    },

   /**
    * Starts timeout count if the configuration object has a defined
    * timeout property.
    *
    * @method _startTimeout
    * @private
    * @param {Object} transaction Transaction object generated by _create().
    * @param {Object} timeout Timeout in milliseconds.
    */
    _startTimeout: function(transaction, timeout) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "_startTimeout", 440);
_yuitest_coverline("/build/io-base/io-base.js", 441);
var io = this;

        _yuitest_coverline("/build/io-base/io-base.js", 443);
io._timeout[transaction.id] = setTimeout(function() {
            _yuitest_coverfunc("/build/io-base/io-base.js", "(anonymous 3)", 443);
_yuitest_coverline("/build/io-base/io-base.js", 444);
io._abort(transaction, 'timeout');
        }, timeout);
    },

   /**
    * Clears the timeout interval started by _startTimeout().
    *
    * @method _clearTimeout
    * @private
    * @param {Number} id - Transaction id.
    */
    _clearTimeout: function(id) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "_clearTimeout", 455);
_yuitest_coverline("/build/io-base/io-base.js", 456);
clearTimeout(this._timeout[id]);
        _yuitest_coverline("/build/io-base/io-base.js", 457);
delete this._timeout[id];
    },

   /**
    * Method that determines if a transaction response qualifies as success
    * or failure, based on the response HTTP status code, and fires the
    * appropriate success or failure events.
    *
    * @method _result
    * @private
    * @static
    * @param {Object} transaction Transaction object generated by _create().
    * @param {Object} config Configuration object passed to io().
    */
    _result: function(transaction, config) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "_result", 471);
_yuitest_coverline("/build/io-base/io-base.js", 472);
var status;
        // Firefox will throw an exception if attempting to access
        // an XHR object's status property, after a request is aborted.
        _yuitest_coverline("/build/io-base/io-base.js", 475);
try {
            _yuitest_coverline("/build/io-base/io-base.js", 476);
status = transaction.c.status;
        } catch(e) {
            _yuitest_coverline("/build/io-base/io-base.js", 478);
status = 0;
        }

        // IE reports HTTP 204 as HTTP 1223.
        _yuitest_coverline("/build/io-base/io-base.js", 482);
if (status >= 200 && status < 300 || status === 304 || status === 1223) {
            _yuitest_coverline("/build/io-base/io-base.js", 483);
this.success(transaction, config);
        } else {
            _yuitest_coverline("/build/io-base/io-base.js", 485);
this.failure(transaction, config);
        }
    },

   /**
    * Event handler bound to onreadystatechange.
    *
    * @method _rS
    * @private
    * @param {Object} transaction Transaction object generated by _create().
    * @param {Object} config Configuration object passed to YUI.io().
    */
    _rS: function(transaction, config) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "_rS", 497);
_yuitest_coverline("/build/io-base/io-base.js", 498);
var io = this;

        _yuitest_coverline("/build/io-base/io-base.js", 500);
if (transaction.c.readyState === 4) {
            _yuitest_coverline("/build/io-base/io-base.js", 501);
if (config.timeout) {
                _yuitest_coverline("/build/io-base/io-base.js", 502);
io._clearTimeout(transaction.id);
            }

            // Yield in the event of request timeout or abort.
            _yuitest_coverline("/build/io-base/io-base.js", 506);
setTimeout(function() {
                _yuitest_coverfunc("/build/io-base/io-base.js", "(anonymous 4)", 506);
_yuitest_coverline("/build/io-base/io-base.js", 507);
io.complete(transaction, config);
                _yuitest_coverline("/build/io-base/io-base.js", 508);
io._result(transaction, config);
            }, 0);
        }
    },

   /**
    * Terminates a transaction due to an explicit abort or timeout.
    *
    * @method _abort
    * @private
    * @param {Object} transaction Transaction object generated by _create().
    * @param {String} type Identifies timed out or aborted transaction.
    */
    _abort: function(transaction, type) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "_abort", 521);
_yuitest_coverline("/build/io-base/io-base.js", 522);
if (transaction && transaction.c) {
            _yuitest_coverline("/build/io-base/io-base.js", 523);
transaction.e = type;
            _yuitest_coverline("/build/io-base/io-base.js", 524);
transaction.c.abort();
        }
    },

   /**
    * Requests a transaction. `send()` is implemented as `Y.io()`.  Each
    * transaction may include a configuration object.  Its properties are:
    *
    * <dl>
    *   <dt>method</dt>
    *     <dd>HTTP method verb (e.g., GET or POST). If this property is not
    *         not defined, the default value will be GET.</dd>
    *
    *   <dt>data</dt>
    *     <dd>This is the name-value string that will be sent as the
    *     transaction data. If the request is HTTP GET, the data become
    *     part of querystring. If HTTP POST, the data are sent in the
    *     message body.</dd>
    *
    *   <dt>xdr</dt>
    *     <dd>Defines the transport to be used for cross-domain requests.
    *     By setting this property, the transaction will use the specified
    *     transport instead of XMLHttpRequest. The properties of the
    *     transport object are:
    *     <dl>
    *       <dt>use</dt>
    *         <dd>The transport to be used: 'flash' or 'native'</dd>
    *       <dt>dataType</dt>
    *         <dd>Set the value to 'XML' if that is the expected response
    *         content type.</dd>
    *     </dl></dd>
    *
    *   <dt>form</dt>
    *     <dd>Form serialization configuration object.  Its properties are:
    *     <dl>
    *       <dt>id</dt>
    *         <dd>Node object or id of HTML form</dd>
    *       <dt>useDisabled</dt>
    *         <dd>`true` to also serialize disabled form field values
    *         (defaults to `false`)</dd>
    *     </dl></dd>
    *
    *   <dt>on</dt>
    *     <dd>Assigns transaction event subscriptions. Available events are:
    *     <dl>
    *       <dt>start</dt>
    *         <dd>Fires when a request is sent to a resource.</dd>
    *       <dt>complete</dt>
    *         <dd>Fires when the transaction is complete.</dd>
    *       <dt>success</dt>
    *         <dd>Fires when the HTTP response status is within the 2xx
    *         range.</dd>
    *       <dt>failure</dt>
    *         <dd>Fires when the HTTP response status is outside the 2xx
    *         range, if an exception occurs, if the transation is aborted,
    *         or if the transaction exceeds a configured `timeout`.</dd>
    *       <dt>end</dt>
    *         <dd>Fires at the conclusion of the transaction
    *            lifecycle, after `success` or `failure`.</dd>
    *     </dl>
    *
    *     <p>Callback functions for `start` and `end` receive the id of the
    *     transaction as a first argument. For `complete`, `success`, and
    *     `failure`, callbacks receive the id and the response object
    *     (usually the XMLHttpRequest instance).  If the `arguments`
    *     property was included in the configuration object passed to
    *     `Y.io()`, the configured data will be passed to all callbacks as
    *     the last argument.</p>
    *     </dd>
    *
    *   <dt>sync</dt>
    *     <dd>Pass `true` to make a same-domain transaction synchronous.
    *     <strong>CAVEAT</strong>: This will negatively impact the user
    *     experience. Have a <em>very</em> good reason if you intend to use
    *     this.</dd>
    *
    *   <dt>context</dt>
    *     <dd>The "`this'" object for all configured event handlers. If a
    *     specific context is needed for individual callbacks, bind the
    *     callback to a context using `Y.bind()`.</dd>
    *
    *   <dt>headers</dt>
    *     <dd>Object map of transaction headers to send to the server. The
    *     object keys are the header names and the values are the header
    *     values.</dd>
    *
    *   <dt>timeout</dt>
    *     <dd>Millisecond threshold for the transaction before being
    *     automatically aborted.</dd>
    *
    *   <dt>arguments</dt>
    *     <dd>User-defined data passed to all registered event handlers.
    *     This value is available as the second argument in the "start" and
    *     "end" event handlers. It is the third argument in the "complete",
    *     "success", and "failure" event handlers. <strong>Be sure to quote
    *     this property name in the transaction configuration as
    *     "arguments" is a reserved word in JavaScript</strong> (e.g.
    *     `Y.io({ ..., "arguments": stuff })`).</dd>
    * </dl>
    *
    * @method send
    * @public
    * @param {String} uri Qualified path to transaction resource.
    * @param {Object} config Configuration object for the transaction.
    * @param {Number} id Transaction id, if already set.
    * @return {Object}
    */
    send: function(uri, config, id) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "send", 631);
_yuitest_coverline("/build/io-base/io-base.js", 632);
var transaction, method, i, len, sync, data,
            io = this,
            u = uri,
            response = {};

        _yuitest_coverline("/build/io-base/io-base.js", 637);
config = config ? Y.Object(config) : {};
        _yuitest_coverline("/build/io-base/io-base.js", 638);
transaction = io._create(config, id);
        _yuitest_coverline("/build/io-base/io-base.js", 639);
method = config.method ? config.method.toUpperCase() : 'GET';
        _yuitest_coverline("/build/io-base/io-base.js", 640);
sync = config.sync;
        _yuitest_coverline("/build/io-base/io-base.js", 641);
data = config.data;

        // Serialize an map object into a key-value string using
        // querystring-stringify-simple.
        _yuitest_coverline("/build/io-base/io-base.js", 645);
if ((Y.Lang.isObject(data) && !data.nodeType) && !transaction.upload) {
            _yuitest_coverline("/build/io-base/io-base.js", 646);
data = Y.QueryString.stringify(data);
        }

        _yuitest_coverline("/build/io-base/io-base.js", 649);
if (config.form) {
            _yuitest_coverline("/build/io-base/io-base.js", 650);
if (config.form.upload) {
                // This is a file upload transaction, calling
                // upload() in io-upload-iframe.
                _yuitest_coverline("/build/io-base/io-base.js", 653);
return io.upload(transaction, uri, config);
            } else {
                // Serialize HTML form data into a key-value string.
                _yuitest_coverline("/build/io-base/io-base.js", 656);
data = io._serialize(config.form, data);
            }
        }

        _yuitest_coverline("/build/io-base/io-base.js", 660);
if (data) {
            _yuitest_coverline("/build/io-base/io-base.js", 661);
switch (method) {
                case 'GET':
                case 'HEAD':
                case 'DELETE':
                    _yuitest_coverline("/build/io-base/io-base.js", 665);
u = io._concat(u, data);
                    _yuitest_coverline("/build/io-base/io-base.js", 666);
data = '';
                    _yuitest_coverline("/build/io-base/io-base.js", 667);
break;
                case 'POST':
                case 'PUT':
                    // If Content-Type is defined in the configuration object, or
                    // or as a default header, it will be used instead of
                    // 'application/x-www-form-urlencoded; charset=UTF-8'
                    _yuitest_coverline("/build/io-base/io-base.js", 673);
config.headers = Y.merge({
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }, config.headers);
                    _yuitest_coverline("/build/io-base/io-base.js", 676);
break;
            }
        }

        _yuitest_coverline("/build/io-base/io-base.js", 680);
if (transaction.xdr) {
            // Route data to io-xdr module for flash and XDomainRequest.
            _yuitest_coverline("/build/io-base/io-base.js", 682);
return io.xdr(u, transaction, config);
        }
        else {_yuitest_coverline("/build/io-base/io-base.js", 684);
if (transaction.notify) {
            // Route data to custom transport
            _yuitest_coverline("/build/io-base/io-base.js", 686);
return transaction.c.send(transaction, uri, config);
        }}

        _yuitest_coverline("/build/io-base/io-base.js", 689);
if (!sync && !transaction.upload) {
            _yuitest_coverline("/build/io-base/io-base.js", 690);
transaction.c.onreadystatechange = function() {
                _yuitest_coverfunc("/build/io-base/io-base.js", "onreadystatechange", 690);
_yuitest_coverline("/build/io-base/io-base.js", 691);
io._rS(transaction, config);
            };
        }

        _yuitest_coverline("/build/io-base/io-base.js", 695);
try {
            // Determine if request is to be set as
            // synchronous or asynchronous.
            _yuitest_coverline("/build/io-base/io-base.js", 698);
transaction.c.open(method, u, !sync, config.username || null, config.password || null);
            _yuitest_coverline("/build/io-base/io-base.js", 699);
io._setHeaders(transaction.c, config.headers || {});
            _yuitest_coverline("/build/io-base/io-base.js", 700);
io.start(transaction, config);

            // Will work only in browsers that implement the
            // Cross-Origin Resource Sharing draft.
            _yuitest_coverline("/build/io-base/io-base.js", 704);
if (config.xdr && config.xdr.credentials) {
                _yuitest_coverline("/build/io-base/io-base.js", 705);
if (!Y.UA.ie) {
                    _yuitest_coverline("/build/io-base/io-base.js", 706);
transaction.c.withCredentials = true;
                }
            }

            // Using "null" with HTTP POST will result in a request
            // with no Content-Length header defined.
            _yuitest_coverline("/build/io-base/io-base.js", 712);
transaction.c.send(data);

            _yuitest_coverline("/build/io-base/io-base.js", 714);
if (sync) {
                // Create a response object for synchronous transactions,
                // mixing id and arguments properties with the xhr
                // properties whitelist.
                _yuitest_coverline("/build/io-base/io-base.js", 718);
for (i = 0, len = XHR_PROPS.length; i < len; ++i) {
                    _yuitest_coverline("/build/io-base/io-base.js", 719);
response[XHR_PROPS[i]] = transaction.c[XHR_PROPS[i]];
                }

                _yuitest_coverline("/build/io-base/io-base.js", 722);
response.getAllResponseHeaders = function() {
                    _yuitest_coverfunc("/build/io-base/io-base.js", "getAllResponseHeaders", 722);
_yuitest_coverline("/build/io-base/io-base.js", 723);
return transaction.c.getAllResponseHeaders();
                };

                _yuitest_coverline("/build/io-base/io-base.js", 726);
response.getResponseHeader = function(name) {
                    _yuitest_coverfunc("/build/io-base/io-base.js", "getResponseHeader", 726);
_yuitest_coverline("/build/io-base/io-base.js", 727);
return transaction.c.getResponseHeader(name);
                };

                _yuitest_coverline("/build/io-base/io-base.js", 730);
io.complete(transaction, config);
                _yuitest_coverline("/build/io-base/io-base.js", 731);
io._result(transaction, config);

                _yuitest_coverline("/build/io-base/io-base.js", 733);
return response;
            }
        } catch(e) {
            _yuitest_coverline("/build/io-base/io-base.js", 736);
if (transaction.xdr) {
                // This exception is usually thrown by browsers
                // that do not support XMLHttpRequest Level 2.
                // Retry the request with the XDR transport set
                // to 'flash'.  If the Flash transport is not
                // initialized or available, the transaction
                // will resolve to a transport error.
                _yuitest_coverline("/build/io-base/io-base.js", 743);
return io._retry(transaction, uri, config);
            } else {
                _yuitest_coverline("/build/io-base/io-base.js", 745);
io.complete(transaction, config);
                _yuitest_coverline("/build/io-base/io-base.js", 746);
io._result(transaction, config);
            }
        }

        // If config.timeout is defined, and the request is standard XHR,
        // initialize timeout polling.
        _yuitest_coverline("/build/io-base/io-base.js", 752);
if (config.timeout) {
            _yuitest_coverline("/build/io-base/io-base.js", 753);
io._startTimeout(transaction, config.timeout);
        }

        _yuitest_coverline("/build/io-base/io-base.js", 756);
return {
            id: transaction.id,
            abort: function() {
                _yuitest_coverfunc("/build/io-base/io-base.js", "abort", 758);
_yuitest_coverline("/build/io-base/io-base.js", 759);
return transaction.c ? io._abort(transaction, 'abort') : false;
            },
            isInProgress: function() {
                _yuitest_coverfunc("/build/io-base/io-base.js", "isInProgress", 761);
_yuitest_coverline("/build/io-base/io-base.js", 762);
return transaction.c ? (transaction.c.readyState % 4) : false;
            },
            io: io
        };
    }
};

/**
Method for initiating an ajax call.  The first argument is the url end
point for the call.  The second argument is an object to configure the
transaction and attach event subscriptions.  The configuration object
supports the following properties:

<dl>
  <dt>method</dt>
    <dd>HTTP method verb (e.g., GET or POST). If this property is not
        not defined, the default value will be GET.</dd>

  <dt>data</dt>
    <dd>This is the name-value string that will be sent as the
    transaction data. If the request is HTTP GET, the data become
    part of querystring. If HTTP POST, the data are sent in the
    message body.</dd>

  <dt>xdr</dt>
    <dd>Defines the transport to be used for cross-domain requests.
    By setting this property, the transaction will use the specified
    transport instead of XMLHttpRequest. The properties of the
    transport object are:
    <dl>
      <dt>use</dt>
        <dd>The transport to be used: 'flash' or 'native'</dd>
      <dt>dataType</dt>
        <dd>Set the value to 'XML' if that is the expected response
        content type.</dd>
    </dl></dd>

  <dt>form</dt>
    <dd>Form serialization configuration object.  Its properties are:
    <dl>
      <dt>id</dt>
        <dd>Node object or id of HTML form</dd>
      <dt>useDisabled</dt>
        <dd>`true` to also serialize disabled form field values
        (defaults to `false`)</dd>
    </dl></dd>

  <dt>on</dt>
    <dd>Assigns transaction event subscriptions. Available events are:
    <dl>
      <dt>start</dt>
        <dd>Fires when a request is sent to a resource.</dd>
      <dt>complete</dt>
        <dd>Fires when the transaction is complete.</dd>
      <dt>success</dt>
        <dd>Fires when the HTTP response status is within the 2xx
        range.</dd>
      <dt>failure</dt>
        <dd>Fires when the HTTP response status is outside the 2xx
        range, if an exception occurs, if the transation is aborted,
        or if the transaction exceeds a configured `timeout`.</dd>
      <dt>end</dt>
        <dd>Fires at the conclusion of the transaction
           lifecycle, after `success` or `failure`.</dd>
    </dl>

    <p>Callback functions for `start` and `end` receive the id of the
    transaction as a first argument. For `complete`, `success`, and
    `failure`, callbacks receive the id and the response object
    (usually the XMLHttpRequest instance).  If the `arguments`
    property was included in the configuration object passed to
    `Y.io()`, the configured data will be passed to all callbacks as
    the last argument.</p>
    </dd>

  <dt>sync</dt>
    <dd>Pass `true` to make a same-domain transaction synchronous.
    <strong>CAVEAT</strong>: This will negatively impact the user
    experience. Have a <em>very</em> good reason if you intend to use
    this.</dd>

  <dt>context</dt>
    <dd>The "`this'" object for all configured event handlers. If a
    specific context is needed for individual callbacks, bind the
    callback to a context using `Y.bind()`.</dd>

  <dt>headers</dt>
    <dd>Object map of transaction headers to send to the server. The
    object keys are the header names and the values are the header
    values.</dd>

  <dt>timeout</dt>
    <dd>Millisecond threshold for the transaction before being
    automatically aborted.</dd>

  <dt>arguments</dt>
    <dd>User-defined data passed to all registered event handlers.
    This value is available as the second argument in the "start" and
    "end" event handlers. It is the third argument in the "complete",
    "success", and "failure" event handlers. <strong>Be sure to quote
    this property name in the transaction configuration as
    "arguments" is a reserved word in JavaScript</strong> (e.g.
    `Y.io({ ..., "arguments": stuff })`).</dd>
</dl>

@method io
@static
@param {String} url qualified path to transaction resource.
@param {Object} config configuration object for the transaction.
@return {Object}
@for YUI
**/
_yuitest_coverline("/build/io-base/io-base.js", 874);
Y.io = function(url, config) {
    // Calling IO through the static interface will use and reuse
    // an instance of IO.
    _yuitest_coverfunc("/build/io-base/io-base.js", "io", 874);
_yuitest_coverline("/build/io-base/io-base.js", 877);
var transaction = Y.io._map['io:0'] || new IO();
    _yuitest_coverline("/build/io-base/io-base.js", 878);
return transaction.send.apply(transaction, [url, config]);
};

/**
Method for setting and deleting IO HTTP headers to be sent with every
request.

Hosted as a property on the `io` function (e.g. `Y.io.header`).

@method header
@param {String} name HTTP header
@param {String} value HTTP header value
@static
**/
_yuitest_coverline("/build/io-base/io-base.js", 892);
Y.io.header = function(name, value) {
    // Calling IO through the static interface will use and reuse
    // an instance of IO.
    _yuitest_coverfunc("/build/io-base/io-base.js", "header", 892);
_yuitest_coverline("/build/io-base/io-base.js", 895);
var transaction = Y.io._map['io:0'] || new IO();
    _yuitest_coverline("/build/io-base/io-base.js", 896);
transaction.setHeader(name, value);
};

_yuitest_coverline("/build/io-base/io-base.js", 899);
Y.IO = IO;
// Map of all IO instances created.
_yuitest_coverline("/build/io-base/io-base.js", 901);
Y.io._map = {};
_yuitest_coverline("/build/io-base/io-base.js", 902);
var XHR = win && win.XMLHttpRequest,
    XDR = win && win.XDomainRequest,
    AX = win && win.ActiveXObject;


_yuitest_coverline("/build/io-base/io-base.js", 907);
Y.mix(Y.IO, {
    /**
    * The ID of the default IO transport, defaults to `xhr`
    * @property _default
    * @type {String}
    * @static
    */
    _default: 'xhr',
    /**
    *
    * @method defaultTransport
    * @static
    * @param {String} [id] The transport to set as the default, if empty a new transport is created.
    * @return {Object} The transport object with a `send` method
    */
    defaultTransport: function(id) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "defaultTransport", 922);
_yuitest_coverline("/build/io-base/io-base.js", 923);
if (id) {
            _yuitest_coverline("/build/io-base/io-base.js", 924);
Y.IO._default = id;
        } else {
            _yuitest_coverline("/build/io-base/io-base.js", 926);
var o = {
                c: Y.IO.transports[Y.IO._default](),
                notify: Y.IO._default === 'xhr' ? false : true
            };
            _yuitest_coverline("/build/io-base/io-base.js", 930);
return o;
        }
    },
    /**
    * An object hash of custom transports available to IO
    * @property transports
    * @type {Object}
    * @static
    */
    transports: {
        xhr: function () {
            _yuitest_coverfunc("/build/io-base/io-base.js", "xhr", 940);
_yuitest_coverline("/build/io-base/io-base.js", 941);
return XHR ? new XMLHttpRequest() :
                AX ? new ActiveXObject('Microsoft.XMLHTTP') : null;
        },
        xdr: function () {
            _yuitest_coverfunc("/build/io-base/io-base.js", "xdr", 944);
_yuitest_coverline("/build/io-base/io-base.js", 945);
return XDR ? new XDomainRequest() : null;
        },
        iframe: function () { _yuitest_coverfunc("/build/io-base/io-base.js", "iframe", 947);
_yuitest_coverline("/build/io-base/io-base.js", 947);
return {}; },
        flash: null,
        nodejs: null
    },
    /**
    * Create a custom transport of type and return it's object
    * @method customTransport
    * @param {String} id The id of the transport to create.
    * @static
    */
    customTransport: function(id) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "customTransport", 957);
_yuitest_coverline("/build/io-base/io-base.js", 958);
var o = { c: Y.IO.transports[id]() };

        _yuitest_coverline("/build/io-base/io-base.js", 960);
o[(id === 'xdr' || id === 'flash') ? 'xdr' : 'notify'] = true;
        _yuitest_coverline("/build/io-base/io-base.js", 961);
return o;
    }
});

_yuitest_coverline("/build/io-base/io-base.js", 965);
Y.mix(Y.IO.prototype, {
    /**
    * Fired from the notify method of the transport which in turn fires
    * the event on the IO object.
    * @method notify
    * @param {String} event The name of the event
    * @param {Object} transaction The transaction object
    * @param {Object} config The configuration object for this transaction
    */
    notify: function(event, transaction, config) {
        _yuitest_coverfunc("/build/io-base/io-base.js", "notify", 974);
_yuitest_coverline("/build/io-base/io-base.js", 975);
var io = this;

        _yuitest_coverline("/build/io-base/io-base.js", 977);
switch (event) {
            case 'timeout':
            case 'abort':
            case 'transport error':
                _yuitest_coverline("/build/io-base/io-base.js", 981);
transaction.c = { status: 0, statusText: event };
                _yuitest_coverline("/build/io-base/io-base.js", 982);
event = 'failure';
            default:
                _yuitest_coverline("/build/io-base/io-base.js", 984);
io[event].apply(io, [transaction, config]);
        }
    }
});




}, '@VERSION@' ,{requires:['event-custom-base', 'querystring-stringify-simple']});
