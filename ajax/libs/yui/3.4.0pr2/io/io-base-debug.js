YUI.add('io-base', function(Y) {

   /**
    * Base IO functionality. Provides basic XHR transport support.
    * @module io
    * @submodule io-base
    */

   /**
    * The io class is a utility that brokers HTTP requests through a simplified
    * interface.  Specifically, it allows JavaScript to make HTTP requests to
    * a resource without a page reload.  The underlying transport for making
    * same-domain requests is the XMLHttpRequest object.  YUI.io can also use
    * Flash, if specified as a transport, for cross-domain requests.
    *
    * @class io
    */

   /**
    * @event io:start
    * @description This event is fired by YUI.io when a transaction is initiated.
    * @type Event Custom
    */
    var E_START = 'io:start',

   /**
    * @event io:complete
    * @description This event is fired by YUI.io when a transaction is complete.
    * Response status and data are accessible, if available.
    * @type Event Custom
    */
    E_COMPLETE = 'io:complete',

   /**
    * @event io:success
    * @description This event is fired by YUI.io when a transaction is complete, and
    * the HTTP status resolves to HTTP2xx.
    * @type Event Custom
    */
    E_SUCCESS = 'io:success',

   /**
    * @event io:failure
    * @description This event is fired by YUI.io when a transaction is complete, and
    * the HTTP status resolves to HTTP4xx, 5xx and above.
    * @type Event Custom
    */
    E_FAILURE = 'io:failure',

   /**
    * @event io:end
    * @description This event signifies the end of the transaction lifecycle.  The
    * transaction transport is destroyed.
    * @type Event Custom
    */
    E_END = 'io:end',

    //--------------------------------------
    //  Properties
    //--------------------------------------
   /**
    * @description A transaction counter that increments for each transaction.
    *
    * @property transactionId
    * @private
    * @static
    * @type int
    */
    transactionId = 0,

   /**
    * @description Object of default HTTP headers to be initialized and sent
    * for all transactions.
    *
    * @property _headers
    * @private
    * @static
    * @type object
    */
    _headers = {
        'X-Requested-With' : 'XMLHttpRequest'
    },

   /**
    * @description Object that stores timeout values for any transaction with
    * a defined "timeout" configuration property.
    *
    * @property _timeout
    * @private
    * @static
    * @type object
    */
    _timeout = {},

    // Window reference
    w = Y.config.win;

    //--------------------------------------
    //  Methods
    //--------------------------------------

   /**
    * @description Method that creates the XMLHttpRequest transport
    *
    * @method _xhr
    * @private
    * @static
    * @return object
    */
    function _xhr() {
        return w.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    }

   /**
    * @description Method that increments _transactionId for each transaction.
    *
    * @method _id
    * @private
    * @static
    * @return int
    */
    function _id() {
        var id = transactionId;

		transactionId++;

        return id;
    }

   /**
    * @description Method that creates a unique transaction object for each
    * request.
    *
    * @method _create
    * @private
    * @static
    * @param {number} c - configuration object subset to determine if
    *                     the transaction is an XDR or file upload,
    *                     requiring an alternate transport.
    * @param {number} i - transaction id
    * @return object
    */
    function _create(c, i) {
        var o = {};
            o.id = Y.Lang.isNumber(i) ? i : _id();
            c = c || {};

        if (!c.use && !c.upload) {
            o.c = _xhr();
        }
        else if (c.use) {
            if (c.use === 'native') {
                if (w.XDomainRequest) {
                    o.c = new XDomainRequest();
                    o.t = c.use;
                }
                else {
                    o.c = _xhr();
                }
            }
            else {
                o.c = Y.io._transport[c.use];
                o.t = c.use;
            }
        }
        else {
            o.c = {};
			o.t = 'io:iframe';
        }

        return o;
    }


    function _destroy(o) {
        if (w) {
            if (o.c && w.XMLHttpRequest) {
                o.c.onreadystatechange = null;
            }
			else if (Y.UA.ie === 6 && !o.t) {
				// IE, when using XMLHttpRequest as an ActiveX Object, will throw
				// a "Type Mismatch" error if the event handler is set to "null".
				o.c.abort();
			}
        }

        o.c = null;
        o = null;
    }

   /**
    * @description Method for creating and subscribing transaction events.
    *
    * @method _tE
    * @private
    * @static
    * @param {string} e - event to be published
    * @param {object} c - configuration data subset for event subscription.
    *
    * @return void
    */
    function _tE(e, c) {
        var eT = new Y.EventTarget().publish('transaction:' + e),
            cT = c.context || Y,
            a = c.arguments;

        if (a) {
            eT.on(c.on[e], cT, a);
        }
        else {
            eT.on(c.on[e], cT);
        }

        return eT;
    }

   /**
    * @description Fires event "io:start" and creates, fires a
    * transaction-specific start event, if config.on.start is
    * defined.
    *
    * @method _ioStart
    * @private
    * @static
    * @param {number} id - transaction id
    * @param {object} c - configuration object for the transaction.
    *
    * @return void
    */
    function _ioStart(id, c) {
        var a = c.arguments;

        if (a) {
            Y.fire(E_START, id, a);
        }
        else {
            Y.fire(E_START, id);
        }

        if (c.on && c.on.start) {
            _tE('start', c).fire(id);
        }
    }


   /**
    * @description Fires event "io:complete" and creates, fires a
    * transaction-specific "complete" event, if config.on.complete is
    * defined.
    *
    * @method _ioComplete
    * @private
    * @static
    * @param {object} o - transaction object.
    * @param {object} c - configuration object for the transaction.
    *
    * @return void
    */
    function _ioComplete(o, c) {
        var r = o.e ? { status: 0, statusText: o.e } : o.c,
            a = c.arguments;

        if (a) {
            Y.fire(E_COMPLETE, o.id, r, a);
        }
        else {
            Y.fire(E_COMPLETE, o.id, r);
        }

        if (c.on && c.on.complete) {
            _tE('complete', c).fire(o.id, r);
        }
    }

   /**
    * @description Fires event "io:end" and creates, fires a
    * transaction-specific "end" event, if config.on.end is
    * defined.
    *
    * @method _ioEnd
    * @private
    * @static
    * @param {object} o - transaction object.
    * @param {object} c - configuration object for the transaction.
    *
    * @return void
    */
    function _ioEnd(o, c) {
        var a = c.arguments;

        if (a) {
            Y.fire(E_END, o.id, a);
        }
        else {
            Y.fire(E_END, o.id);
        }

        if (c.on && c.on.end) {
            _tE('end', c).fire(o.id);
        }

        _destroy(o);
    }

   /**
    * @description Fires event "io:success" and creates, fires a
    * transaction-specific "success" event, if config.on.success is
    * defined.
    *
    * @method _ioSuccess
    * @private
    * @static
    * @param {object} o - transaction object.
    * @param {object} c - configuration object for the transaction.
    *
    * @return void
    */
    function _ioSuccess(o, c) {
        var a = c.arguments;

        if (a) {
            Y.fire(E_SUCCESS, o.id, o.c, a);
        }
        else {
            Y.fire(E_SUCCESS, o.id, o.c);
        }

        if (c.on && c.on.success) {
            _tE('success', c).fire(o.id, o.c);
        }

        _ioEnd(o, c);
    }

   /**
    * @description Fires event "io:failure" and creates, fires a
    * transaction-specific "failure" event, if config.on.failure is
    * defined.
    *
    * @method _ioFailure
    * @private
    * @static
    * @param {object} o - transaction object.
    * @param {object} c - configuration object for the transaction.
    *
    * @return void
    */
    function _ioFailure(o, c) {
        var r = o.e ? { status: 0, statusText: o.e } : o.c,
            a = c.arguments;

        if (a) {
            Y.fire(E_FAILURE, o.id, r, a);
        }
        else {
            Y.fire(E_FAILURE, o.id, r);
        }

        if (c.on && c.on.failure) {
            _tE('failure', c).fire(o.id, r);
        }

        _ioEnd(o, c);
    }

   /**
    * @description Resends an XDR transaction, using the Flash tranport,
    * if the native transport fails.
    *
    * @method _resend
    * @private
    * @static

    * @param {object} o - Transaction object generated by _create().
    * @param {string} uri - qualified path to transaction resource.
    * @param {object} c - configuration object for the transaction.
    *
    * @return void
    */
    function _resend(o, uri, c, d) {
        _destroy(o);
        c.xdr.use = 'flash';
        // If the original request included serialized form data and
        // additional data are defined in the configuration, it must
        // be reset to prevent data duplication.
        c.data = c.form && d ? d : null;

        return Y.io(uri, c, o.id);
    }

   /**
    * @description Method that concatenates string data for HTTP GET transactions.
    *
    * @method _concat
    * @private
    * @static
    * @param {string} s - URI or root data.
    * @param {string} d - data to be concatenated onto URI.
    * @return int
    */
    function _concat(s, d) {
        s += (s.indexOf('?') === -1 ? '?' : '&') + d;
        return s;
    }

   /**
    * @description Method that stores default client headers for all transactions.
    * If a label is passed with no value argument, the header will be deleted.
    *
    * @method _setHeader
    * @private
    * @static
    * @param {string} l - HTTP header
    * @param {string} v - HTTP header value
    * @return int
    */
    function _setHeader(l, v) {
        if (v) {
            _headers[l] = v;
        }
        else {
            delete _headers[l];
        }
    }

   /**
    * @description Method that sets all HTTP headers to be sent in a transaction.
    *
    * @method _setHeaders
    * @private
    * @static
    * @param {object} o - XHR instance for the specific transaction.
    * @param {object} h - HTTP headers for the specific transaction, as defined
    *                     in the configuration object passed to YUI.io().
    * @return void
    */
    function _setHeaders(o, h) {
        var p;
            h = h || {};

        for (p in _headers) {
            if (_headers.hasOwnProperty(p)) {
				if (!h[p]) {
					h[p] = _headers[p];
				}
            }
        }

        for (p in h) {
            if (h.hasOwnProperty(p)) {
				if (h[p] !== 'disable') {
					o.setRequestHeader(p, h[p]);
				}
			}
        }
    }

   /**
    * @description Terminates a transaction due to an explicit abort or
    * timeout.
    *
    * @method _ioCancel
    * @private
    * @static
    * @param {object} o - Transaction object generated by _create().
    * @param {string} s - Identifies timed out or aborted transaction.
    *
    * @return void
    */
    function _ioCancel(o, s) {
        if (o && o.c) {
            o.e = s;
            o.c.abort();
        }
    }

   /**
    * @description Starts timeout count if the configuration object
    * has a defined timeout property.
    *
    * @method _startTimeout
    * @private
    * @static
    * @param {object} o - Transaction object generated by _create().
    * @param {object} t - Timeout in milliseconds.
    * @return void
    */
    function _startTimeout(o, t) {
        _timeout[o.id] = w.setTimeout(function() { _ioCancel(o, 'timeout'); }, t);
    }

   /**
    * @description Clears the timeout interval started by _startTimeout().
    *
    * @method _clearTimeout
    * @private
    * @static
    * @param {number} id - Transaction id.
    * @return void
    */
    function _clearTimeout(id) {
        w.clearTimeout(_timeout[id]);
        delete _timeout[id];
    }

   /**
    * @description Method that determines if a transaction response qualifies
    * as success or failure, based on the response HTTP status code, and
    * fires the appropriate success or failure events.
    *
    * @method _handleResponse
    * @private
    * @static
    * @param {object} o - Transaction object generated by _create().
    * @param {object} c - Configuration object passed to io().
    * @return void
    */
    function _handleResponse(o, c) {
        var status = o.c.status;

        // IE reports HTTP 204 as HTTP 1223.
		if (status === 0 && o.c.responseText || status === 1223) {
			status = 200;
		}

		if (status >= 200 && status < 300) {
            _ioSuccess(o, c);
		}
        else {
            _ioFailure(o, c);
        }
    }

   /**
    * @description Event handler bound to onreadystatechange.
    *
    * @method _readyState
    * @private
    * @static
    * @param {object} o - Transaction object generated by _create().
    * @param {object} c - Configuration object passed to YUI.io().
    * @return void
    */
    function _readyState(o, c) {
        if (o.c.readyState === 4) {
            if (c.timeout) {
                _clearTimeout(o.id);
            }

            w.setTimeout(
                function() {
                    _ioComplete(o, c);
                    _handleResponse(o, c);
                }, 0);
        }
    }

   /**
    * @description Method for requesting a transaction. _io() is implemented as
    * yui.io().  Each transaction may include a configuration object.  Its
    * properties are:
    *
    * method: HTTP method verb (e.g., GET or POST). If this property is not
    *         not defined, the default value will be GET.
    *
    * data: This is the name-value string that will be sent as the transaction
    *       data.  If the request is HTTP GET, the data become part of
    *       querystring. If HTTP POST, the data are sent in the message body.
    *
    * xdr: Defines the transport to be used for cross-domain requests.  By
    *      setting this property, the transaction will use the specified
    *      transport instead of XMLHttpRequest.
    *      The properties are:
    *      {
    *        use: Specify the transport to be used: 'flash' and 'native'
    *        dataType: Set the value to 'XML' if that is the expected
    *                  response content type.
    *      }
    *
    *
    * form: This is a defined object used to process HTML form as data.  The
    *       properties are:
    *       {
    *         id: Node object or id of HTML form.
    *         useDisabled: Boolean value to allow disabled HTML form field
    *                      values to be sent as part of the data.
    *       }
    *
    * on: This is a defined object used to create and handle specific
    *     events during a transaction lifecycle.  These events will fire in
    *     addition to the global io events. The events are:
    *     start - This event is fired when a request is sent to a resource.
    *     complete - This event fires when the transaction is complete.
    *     success - This event fires when the response status resolves to
    *               HTTP 2xx.
    *     failure - This event fires when the response status resolves to
    *               HTTP 4xx, 5xx; and, for all transaction exceptions,
    *               including aborted transactions and transaction timeouts.
    *     end -  This even is fired at the conclusion of the transaction
    *            lifecycle, after a success or failure resolution.
    *
    *     The properties are:
    *     {
    *       start: function(id, arguments){},
    *       complete: function(id, responseobject, arguments){},
    *       success: function(id, responseobject, arguments){},
    *       failure: function(id, responseobject, arguments){},
    *       end: function(id, arguments){}
    *     }
    *     Each property can reference a function or be written as an
    *     inline function.
    *
    * sync: To enable synchronous transactions, set the configuration property
    *       "sync" to true; the default behavior is false.  Synchronous
    *       transactions are limited to same-domain requests only.
    *
    * context: Object reference for all defined transaction event handlers
    *          when it is implemented as a method of a base object. Defining
    *          "context" will set the reference of "this," used in the
    *          event handlers, to the context value.  In the case where
    *          different event handlers all have different contexts,
    *          use Y.bind() to set the execution context, bypassing this
    *          configuration.
    *
    * headers: This is a defined object of client headers, as many as.
    *          desired for the transaction.  The object pattern is:
    *          { 'header': 'value' }.
    *
    * timeout: This value, defined as milliseconds, is a time threshold for the
    *          transaction. When this threshold is reached, and the transaction's
    *          Complete event has not yet fired, the transaction will be aborted.
    *
    * arguments: Object, array, string, or number passed to all registered
    *            event handlers.  This value is available as the second
    *            argument in the "start" and "abort" event handlers; and, it is
    *            the third argument in the "complete", "success", and "failure"
    *            event handlers.
    *
    * @method _io
    * @private
    * @static
    * @param {string} uri - qualified path to transaction resource.
    * @param {object} c - configuration object for the transaction.
    * @param {number} i - transaction id, if already set.
    * @return object
    */
    function _io(uri, c, i) {
        var f, o, d, m, r, s, oD, a, j, usr, pwd,
            u = uri;
            c = Y.Object(c) || {};
            o = _create(c.xdr || c.form, i);
			usr = c.username || null;
			pwd = c.password || null;
            m = c.method ? c.method = c.method.toUpperCase() : c.method = 'GET';
            s = c.sync;
            oD = c.data;

        // Serialize an object into a key-value string using
        // querystring-stringify-simple.
		c.data = (Y.Lang.isObject(c.data) && Y.QueryString) ? Y.QueryString.stringify(c.data) : c.data;

        if (c.form) {
            if (c.form.upload) {
                // This is a file upload transaction, calling
                // upload() in io-upload-iframe.
                return Y.io.upload(o, uri, c);
            }
            else {
                // Serialize HTML form data into a key-value string.
                f = Y.io._serialize(c.form, c.data);
                if (m === 'POST' || m === 'PUT') {
                    c.data = f;
                }
                else if (m === 'GET') {
                    uri = _concat(uri, f);
                }
            }
        }

		if (c.data) {
			switch (m) {
				case 'GET':
				case 'HEAD':
				case 'DELETE':
					uri = _concat(uri, c.data);
					c.data = null;
					Y.log('HTTP' + m + ' with data.  The querystring is: ' + uri, 'info', 'io');
					break;
				case 'POST':
				case 'PUT':
					// If Content-Type is defined in the configuration object, or
					// or as a default header, it will be used instead of
					// 'application/x-www-form-urlencoded; charset=UTF-8'
					c.headers = Y.merge({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, c.headers);
					break;
			}
		}

        if (o.t) {
			// Cross-domain request or custom transport detected.
            return Y.io.xdr(uri, o, c);
        }

        if (!s) {
            o.c.onreadystatechange = function() { _readyState(o, c); };
        }

        try {
			// Determine if request is to be set as
			// synchronous or asynchronous.
            o.c.open(m, uri, s ? false : true, usr, pwd);
			_setHeaders(o.c, c.headers);
			_ioStart(o.id, c);

            // Will work only in browsers that implement the
            // Cross-Origin Resource Sharing draft.
            if (c.xdr && c.xdr.credentials) {
				if (!Y.UA.ie) {
					o.c.withCredentials = true;
				}
            }

            // Using "null" with HTTP POST will  result in a request
            // with no Content-Length header defined.
            o.c.send(c.data || '');

            if (s) {
				// Create a response object for synchronous transactions,
				// merging ID and arguments fields into a single object.
                d = o.c;
                a  = ['status', 'statusText', 'responseText', 'responseXML'];
                r = c.arguments ? { id: o.id, arguments: c.arguments } : { id: o.id };
                r.getAllResponseHeaders = function() { return d.getAllResponseHeaders(); };
                r.getResponseHeader = function(h) { return d.getResponseHeader(h); };

                for (j = 0; j < 4; j++) {
                    r[a[j]] = o.c[a[j]];
                }

                _ioComplete(o, c);
                _handleResponse(o, c);

                return r;
            }
        }
        catch(e) {
            if (c.xdr && c.xdr.use === 'native') {
                // This exception is usually thrown by browsers
                // that do not support XMLHttpRequest Level 2.
				// Retry the request with the XDR transport set
				// to 'flash'.  If the Flash transport is not
				// initialized or available, the transaction
				// will resolve to a transport error.
                return _resend(o, u, c, oD);
            }
			else {
                _ioComplete(o, c);
				_handleResponse(o, c);
			}
        }

        // If config.timeout is defined, and the request is standard XHR,
        // initialize timeout polling.
        if (c.timeout) {
            _startTimeout(o, c.timeout);
            Y.log('Configuration timeout set to: ' + c.timeout, 'info', 'io');
        }

        return {
            id: o.id,
            abort: function() {
                return o.c ? _ioCancel(o, 'abort') : false;
            },
            isInProgress: function() {
                return o.c ? o.c.readyState !== 4 && o.c.readyState !== 0 : false;
            }
        };
    }

    _io.start = _ioStart;
    _io.complete = _ioComplete;
    _io.success = _ioSuccess;
    _io.failure = _ioFailure;
    _io.end = _ioEnd;
    _io._id = _id;
    _io._timeout = _timeout;

    //--------------------------------------
    //  Begin public interface definition
    //--------------------------------------
   /**
    * @description Method that stores default client headers for all transactions.
    * If a label is passed with no value argument, the header will be deleted.
    * This is the interface for _setHeader().
    *
    * @method header
    * @public
    * @static
    * @param {string} l - HTTP header
    * @param {string} v - HTTP header value
    * @return int
    */
    _io.header = _setHeader;

   /**
    * @description Method for requesting a transaction. This
    * is the interface for _io().
    *
    * @method io
    * @public
    * @static
    * @param {string} uri - qualified path to transaction resource.
    * @param {object} c - configuration object for the transaction.
    * @return object
    */
    Y.io = _io;
    Y.io.http = _io;



}, '@VERSION@' ,{requires:['event-custom-base', 'querystring-stringify-simple']});
