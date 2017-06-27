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
            a = c.arguments,
            cT = c.context || Y;

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
        // additional data are defined in configuration.data, it must
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
        s += ((s.indexOf('?') == -1) ? '?' : '&') + d;
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
				/*
                if (h[p]) {
                    // Configuration headers will supersede preset io headers,
                    // if headers match.
                    continue;
                }
                else {
                    h[p] = _headers[p];
                }
				*/
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
        var status;

        try {
			status = (o.c.status && o.c.status !== 0) ? o.c.status : 0;
        }
        catch(e) {
            status = 0;
        }

        // IE reports HTTP 204 as HTTP 1223.
        if (status >= 200 && status < 300 || status === 1223) {
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
        var f, o, d, m, r, s, oD, a, j,
            u = uri;
            c = Y.Object(c);
            o = _create(c.xdr || c.form, i);
            m = c.method ? c.method = c.method.toUpperCase() : c.method = 'GET';
            s = c.sync;
            oD = c.data;

        //To serialize an object into a key-value string, add the
        //QueryString module to the YUI instance's 'use' method.
        if (Y.Lang.isObject(c.data) && Y.QueryString) {
            c.data = Y.QueryString.stringify(c.data);
        }

        if (c.form) {
            if (c.form.upload) {
                // This is a file upload transaction, calling
                // upload() in io-upload-iframe.
                return Y.io.upload(o, uri, c);
            }
            else {
                // Serialize HTML form data.
                f = Y.io._serialize(c.form, c.data);
                if (m === 'POST' || m === 'PUT') {
                    c.data = f;
                }
                else if (m === 'GET') {
                    uri = _concat(uri, f);
                }
            }
        }

        if (c.data && m === 'GET') {
            uri = _concat(uri, c.data);
        }

        if (c.data && m === 'POST') {
            c.headers = Y.merge({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, c.headers);
        }

        if (o.t) {
            return Y.io.xdr(uri, o, c);
        }

        if (!s) {
            o.c.onreadystatechange = function() { _readyState(o, c); };
        }

        try {
			// Determine if request is to be set as
			// synchronous or asynchronous.
            o.c.open(m, uri, s ? false : true);
			_setHeaders(o.c, c.headers);
			_ioStart(o.id, c);

            // Will work only in browsers that implement the
            // Cross-Origin Resource Sharing draft.
            if (c.xdr && c.xdr.credentials && !Y.UA.ie) {
				o.c.withCredentials = true;
            }

            // Using "null" with HTTP POST will  result in a request
            // with no Content-Length header defined.
            o.c.send(c.data || '');

            if (s) {
				// Create a response object for synchronous transactions.
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
                // that do not support native XDR transactions.
				// Retry the request with the xdr transport set
				// to 'flash'.  If the Flash transport is not
				// initialized or available, the transaction
				// resolves to a transport error.
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
YUI.add('io-form', function(Y) {

   /**
    * Extends the IO base class to enable HTML form data serialization, when specified
    * in the transaction's configuration object.
    * @module io
    * @submodule io-form
    */

    var eUC = encodeURIComponent;

    Y.mix(Y.io, {
       /**
        * @description Method to enumerate through an HTML form's elements collection
        * and return a string comprised of key-value pairs.
        *
        * @method _serialize
        * @private
        * @static
        * @param {object} c - YUI form node or HTML form id.
        * @param {string} s - Transaction data defined in the configuration.
        * @return string
        */
        _serialize: function(c, s) {
            var data = [],
                useDf = c.useDisabled || false,
                item = 0,
                id = (typeof c.id === 'string') ? c.id : c.id.getAttribute('id'),
                e, f, n, v, d, i, il, j, jl, o;

                if (!id) {
                    id = Y.guid('io:');
                    c.id.setAttribute('id', id);
                }

                f = Y.config.doc.getElementById(id);

            // Iterate over the form elements collection to construct the
            // label-value pairs.
            for (i = 0, il = f.elements.length; i < il; ++i) {
                e = f.elements[i];
                d = e.disabled;
                n = e.name;

                if (useDf ? n : n && !d) {
                    n = eUC(n) + '=';
                    v = eUC(e.value);

                    switch (e.type) {
                        // Safari, Opera, FF all default options.value from .text if
                        // value attribute not specified in markup
                        case 'select-one':
                            if (e.selectedIndex > -1) {
                                o = e.options[e.selectedIndex];
                                data[item++] = n + eUC(o.attributes.value && o.attributes.value.specified ? o.value : o.text);
                            }
                            break;
                        case 'select-multiple':
                            if (e.selectedIndex > -1) {
                                for (j = e.selectedIndex, jl = e.options.length; j < jl; ++j) {
                                    o = e.options[j];
                                    if (o.selected) {
                                      data[item++] = n + eUC(o.attributes.value && o.attributes.value.specified ? o.value : o.text);
                                    }
                                }
                            }
                            break;
                        case 'radio':
                        case 'checkbox':
                            if (e.checked) {
                                data[item++] = n + v;
                            }
                            break;
                        case 'file':
                            // stub case as XMLHttpRequest will only send the file path as a string.
                        case undefined:
                            // stub case for fieldset element which returns undefined.
                        case 'reset':
                            // stub case for input type reset button.
                        case 'button':
                            // stub case for input type button elements.
                            break;
                        case 'submit':
                        default:
                            data[item++] = n + v;
                    }
                }
            }
            return s ? data.join('&') + "&" + s : data.join('&');
        }
    }, true);


}, '@VERSION@' ,{requires:['io-base','node-base']});
YUI.add('io-xdr', function(Y) {

   /**
    * Extends the IO base class to provide an alternate, Flash transport, for making
    * cross-domain requests.
    * @module io
    * @submodule io-xdr
    */

   /**
    * @event io:xdrReady
    * @description This event is fired by YUI.io when the specified transport is
    * ready for use.
    * @type Event Custom
    */
    var E_XDR_READY = Y.publish('io:xdrReady', { fireOnce: true }),

   /**
    * @description Object that stores callback handlers for cross-domain requests
    * when using Flash as the transport.
    *
    * @property _cB
    * @private
    * @static
    * @type object
    */
    _cB = {},

   /**
    * @description Map of transaction readyState values used when
    * XDomainRequest is the XDR transport.
    *
    * @property _rS
    * @private
    * @static
    * @type object
    */
    _rS = {},

    // Document reference
    d = Y.config.doc,
    // Window reference
    w = Y.config.win,
	// IE8 cross-origin request detection
    ie = w && w.XDomainRequest;

   /**
    * @description Method that creates the Flash transport swf.
    *
    * @method _swf
    * @private
    * @static
    * @param {string} uri - location of io.swf.
    * @param {string} yid - YUI instance id.
    * @return void
    */
    function _swf(uri, yid) {
        var o = '<object id="yuiIoSwf" type="application/x-shockwave-flash" data="' +
                uri + '" width="0" height="0">' +
                '<param name="movie" value="' + uri + '">' +
                '<param name="FlashVars" value="yid=' + yid + '">' +
                '<param name="allowScriptAccess" value="always">' +
                '</object>',
            c = d.createElement('div');

        d.body.appendChild(c);
        c.innerHTML = o;
    }

   /**
    * @description Sets event handlers for XDomainRequest transactions.
    *
    * @method _evt
    * @private
    * @static
    * @param {object} o - Transaction object generated by _create() in io-base.
    * @param {object} c - configuration object for the transaction.
    * @return void
    */
    function _evt(o, c) {
        o.c.onprogress = function() { _rS[o.id] = 3; };
        o.c.onload = function() {
            _rS[o.id] = 4;
            Y.io.xdrResponse(o, c, 'success');
        };
        o.c.onerror = function() {
            _rS[o.id] = 4;
            Y.io.xdrResponse(o, c, 'failure');
        };
        if (c.timeout) {
            o.c.ontimeout = function() {
                _rS[o.id] = 4;
                Y.io.xdrResponse(o, c, 'timeout');
            };
            o.c.timeout = c.timeout;
        }
    }

   /**
    * @description Creates a response object for XDR transactions, for success
    * and failure cases.
    *
    * @method _data
    * @private
    * @static
    * @param {object} o - Transaction object generated by _create() in io-base.
    * @param {boolean} f - True if Flash was used as the transport.
    * @param {boolean} t - DataType value, as defined in the configuration.
    *
    * @return object
    */
    function _data(o, f, t) {
        var s, x;

        if (!o.e) {
            s = f ? decodeURI(o.c.responseText) : o.c.responseText;
            x = t === 'xml' ?  Y.DataType.XML.parse(s) : null;

            return { id: o.id, c: { responseText: s, responseXML: x } };
        }
        else {
            return { id: o.id, e: o.e };
        }

    }

   /**
    * @description Method for intiating an XDR transaction abort.
    *
    * @method _abort
    * @private
    * @static
    * @param {object} o - Transaction object generated by _create() in io-base.
    * @param {object} c - configuration object for the transaction.
    */
    function _abort(o, c) {
        return o.c.abort(o.id, c);
    }

   /**
    * @description Method for determining if an XDR transaction has completed
    * and all data are received.
    *
    * @method _isInProgress.
    * @private
    * @static
    * @param {object} o - Transaction object generated by _create() in io-base.
    */
    function _isInProgress(o) {
        return ie ? _rS[o.id] !== 4 : o.c.isInProgress(o.id);
    }

    Y.mix(Y.io, {

       /**
        * @description Map of io transports.
        *
        * @property _transport
        * @private
        * @static
        * @type object
        */
        _transport: {},

       /**
        * @description Method for accessing the transport's interface for making a
        * cross-domain transaction.
        *
        * @method xdr
        * @private
        * @static
        * @param {string} uri - qualified path to transaction resource.
        * @param {object} o - Transaction object generated by _create() in io-base.
        * @param {object} c - configuration object for the transaction.
        */
        xdr: function(uri, o, c) {
			if (c.xdr.use === 'flash') {
				_cB[o.id] = {
					on: c.on,
					context: c.context,
					arguments: c.arguments
				};
				// These properties cannot be serialized across Flash's
				// ExternalInterface.  Doing so will result in exceptions.
				c.context = null;
				c.form = null;

				w.setTimeout(function() {
					if (o.c && o.c.send) {
						o.c.send(uri, c, o.id);
					}
					else {
						Y.io.xdrResponse(o, c, 'transport error');
					}
				}, Y.io.xdr.delay);
			}
			else if (ie) {
				_evt(o, c);
				o.c.open(c.method || 'GET', uri);
				o.c.send(c.data);
			}
			else {
				o.c.send(uri, o, c);
			}

			return {
				id: o.id,
				abort: function() {
					return o.c ? _abort(o, c) : false;
				},
				isInProgress: function() {
					return o.c ? _isInProgress(o.id) : false;
				}
			};
        },

       /**
        * @description Response controller for cross-domain requests when using the
        * Flash transport or IE8's XDomainRequest object.
        *
        * @method xdrResponse
        * @private
        * @static
        * @param {object} o - Transaction object generated by _create() in io-base.
        * @param {object} c - configuration object for the transaction.
        * @param {string} e - Event name
        * @return object
        */
        xdrResponse: function(o, c, e) {
            var cb,
                m = ie ? _rS : _cB,
                f = c.xdr.use === 'flash' ? true : false,
                t = c.xdr.dataType;
                c.on = c.on || {};

            if (f) {
                cb = _cB[o.id] ? _cB[o.id] : null;
                if (cb) {
                    c.on = cb.on;
                    c.context = cb.context;
                    c.arguments = cb.arguments;
                }
            }

            switch (e) {
                case 'start':
                    Y.io.start(o.id, c);
                    break;
                case 'complete':
                    Y.io.complete(o, c);
                    break;
                case 'success':
                    Y.io.success(t || f ? _data(o, f, t) : o, c);
                    delete m[o.id];
                    break;
                case 'timeout':
                case 'abort':
				case 'transport error':
					o.e = e;
                case 'failure':
                    Y.io.failure(t || f ? _data(o, f, t) : o, c);
                    delete m[o.id];
                    break;
            }
        },

       /**
        * @description Fires event "io:xdrReady"
        *
        * @method xdrReady
        * @private
        * @static
        * @param {number} id - transaction id
        * @param {object} c - configuration object for the transaction.
        *
        * @return void
        */
        xdrReady: function(id) {
			Y.io.xdr.delay = 0;
            Y.fire(E_XDR_READY, id);
        },

       /**
        * @description Method to initialize the desired transport.
        *
        * @method transport
        * @public
        * @static
        * @param {object} o - object of transport configurations.
        * @return void
        */
        transport: function(o) {
            var yid = o.yid || Y.id,
				oid = o.id || 'flash',
				src = Y.UA.ie ? o.src + '?d=' + new Date().valueOf().toString() : o.src;

            if (oid === 'native' || oid === 'flash') {

				_swf(src, yid);
                this._transport.flash = d.getElementById('yuiIoSwf');
            }
            else if (oid) {
                this._transport[o.id] = o.src;
            }
        }
    });

   /**
	* @description Delay value to calling the Flash transport, in the
	* event io.swf has not finished loading.  Once the E_XDR_READY
    * event is fired, this value will be set to 0.
	*
	* @property delay
	* @public
	* @static
	* @type number
	*/
	Y.io.xdr.delay = 50;


}, '@VERSION@' ,{requires:['io-base','datatype-xml']});
YUI.add('io-upload-iframe', function(Y) {

   /**
    * Extends the IO base class to enable file uploads, with HTML forms,
    * using an iframe as the transport medium.
    * @module io
    * @submodule io-upload-iframe
    */

    var w = Y.config.win,
        d = Y.config.doc,
        _std = (d.documentMode && d.documentMode >= 8),
		_d = decodeURIComponent;
   /**
    * @description Parses the POST data object and creates hidden form elements
    * for each key-value, and appends them to the HTML form object.
    * @method appendData
    * @private
    * @static
    * @param {object} f HTML form object.
    * @param {string} s The key-value POST data.
    * @return {array} e Array of created fields.
    */
    function _addData(f, s) {
        var o = [],
            m = s.split('='),
            i, l;

        for (i = 0, l = m.length - 1; i < l; i++) {
            o[i] = d.createElement('input');
            o[i].type = 'hidden';
            o[i].name = _d(m[i].substring(m[i].lastIndexOf('&') + 1));
            o[i].value = (i + 1 === l) ? _d(m[i + 1]) : _d(m[i + 1].substring(0, (m[i + 1].lastIndexOf('&'))));
            f.appendChild(o[i]);
        }

        return o;
    }

   /**
    * @description Removes the custom fields created to pass additional POST
    * data, along with the HTML form fields.
    * @method f
    * @private
    * @static
    * @param {object} f HTML form object.
    * @param {object} o HTML form fields created from configuration.data.
    * @return {void}
    */
    function _removeData(f, o) {
        var i, l;

        for (i = 0, l = o.length; i < l; i++) {
            f.removeChild(o[i]);
        }
    }

   /**
    * @description Sets the appropriate attributes and values to the HTML
    * form, in preparation of a file upload transaction.
    * @method _setAttrs
    * @private
    * @static
    * @param {object} f HTML form object.
    * @param {object} id The Transaction ID.
    * @param {object} uri Qualified path to transaction resource.
    * @return {void}
    */
    function _setAttrs(f, id, uri) {
        f.setAttribute('action', uri);
        f.setAttribute('method', 'POST');
        f.setAttribute('target', 'ioupload' + id );
        f.setAttribute(Y.UA.ie && !_std ? 'encoding' : 'enctype', 'multipart/form-data');
    }

   /**
    * @description Reset the HTML form attributes to their original values.
    * @method _resetAttrs
    * @private
    * @static
    * @param {object} f HTML form object.
    * @param {object} a Object of original attributes.
    * @return {void}
    */
    function _resetAttrs(f, a){
        var p;

        for (p in a) {
            if (a.hasOwnProperty(p)) {
                if (a[p]) {
                    f.setAttribute(p, a[p]);
                }
                else {
                    f.removeAttribute(p);
                }
            }
        }
    }

   /**
    * @description Starts timeout count if the configuration object
    * has a defined timeout property.
    *
    * @method _startTimeout
    * @private
    * @static
    * @param {object} o Transaction object generated by _create().
    * @param {object} c Configuration object passed to YUI.io().
    * @return {void}
    */
    function _startTimeout(o, c) {
        Y.io._timeout[o.id] = w.setTimeout(
            function() {
                var r = { id: o.id, status: 'timeout' };

                Y.io.complete(r, c);
                Y.io.end(r, c);
            }, c.timeout);
    }

   /**
    * @description Clears the timeout interval started by _startTimeout().
    * @method _clearTimeout
    * @private
    * @static
    * @param {number} id - Transaction ID.
    * @return {void}
    */
    function _clearTimeout(id) {
        w.clearTimeout(Y.io._timeout[id]);
        delete Y.io._timeout[id];
    }

   /**
    * @description
    * @method _destroy
    * @private
    * @static
    * @param {o} o The transaction object
    * @param {object} uri Qualified path to transaction resource.
    * @param {object} c Configuration object for the transaction.
    * @return {void}
    */
    function _destroy(id) {
        Y.Event.purgeElement('#ioupload' + id, false);
        Y.one('body').removeChild(Y.one('#ioupload' + id));
    }

   /**
    * @description Bound to the iframe's Load event and processes
    * the response data.
    * @method _handle
    * @private
    * @static
    * @param {o} o The transaction object
    * @param {object} c Configuration object for the transaction.
    * @return {void}
    */
    function _handle(o, c) {
        var d = Y.one('#ioupload' + o.id).get('contentWindow.document'),
            b = d.one('body'),
            p;

        if (c.timeout) {
            _clearTimeout(o.id);
        }

        if (b) {
            // When a response Content-Type of "text/plain" is used, Firefox and Safari
            // will wrap the response string with <pre></pre>.
            p = b.one('pre:first-child');
            o.c.responseText = p ? p.get('text') : b.get('text');
        }
        else {
            o.c.responseXML = d._node;
        }

        Y.io.complete(o, c);
        Y.io.end(o, c);
        // The transaction is complete, so call _destroy to remove
        // the event listener bound to the iframe transport, and then
        // destroy the iframe.
        w.setTimeout( function() { _destroy(o.id); }, 0);
    }

   /**
    * @description Creates the iframe transported used in file upload
    * transactions, and binds the response event handler.
    *
    * @method _create
    * @private
    * @static
    * @param {object} o Transaction object generated by _create().
    * @param {object} c Configuration object passed to YUI.io().
    * @return {void}
    */
    function _create(o, c) {
        var i = Y.Node.create('<iframe id="ioupload' + o.id + '" name="ioupload' + o.id + '" />');
            i._node.style.position = 'absolute';
            i._node.style.top = '-1000px';
            i._node.style.left = '-1000px';

        Y.one('body').appendChild(i);
        // Bind the onload handler to the iframe to detect the file upload response.
        Y.on("load", function() { _handle(o, c); }, '#ioupload' + o.id);
    }

   /**
    * @description Uploads HTML form data, inclusive of files/attachments,
    * using the iframe created in _create to facilitate the transaction.
    * @method _upload
    * @private
    * @static
    * @param {o} o The transaction object
    * @param {object} uri Qualified path to transaction resource.
    * @param {object} c Configuration object for the transaction.
    * @return {void}
    */
    function _send(o, uri, c) {
        var f = (typeof c.form.id === 'string') ? d.getElementById(c.form.id) : c.form.id,
            fields,
            // Track original HTML form attribute values.
            attr = {
                action: f.getAttribute('action'),
                target: f.getAttribute('target')
            };

        // Initialize the HTML form properties in case they are
        // not defined in the HTML form.
        _setAttrs(f, o.id, uri);
        if (c.data) {
            fields = _addData(f, c.data);
        }

        // Start polling if a callback is present and the timeout
        // property has been defined.
        if (c.timeout) {
            _startTimeout(o, c);
        }

        // Start file upload.
        f.submit();
        Y.io.start(o.id, c);
        if (c.data) {
            _removeData(f, fields);
        }
        // Restore HTML form attributes to their original values.
        _resetAttrs(f, attr);

        return {
            id: o.id,
            abort: function() {
                var r = { id: o.id, status: 'abort' };

                if (Y.one('#ioupload' + o.id)) {
                    _destroy(o.id);
                    Y.io.complete(r, c);
                    Y.io.end(r, c);
                }
                else {
                    return false;
                }
            },
            isInProgress: function() {
                return Y.one('#ioupload' + o.id) ? true : false;
            }
        };
    }

    Y.mix(Y.io, {
        upload: function(o, uri, c) {
            _create(o, c);
            return _send(o, uri, c);
        }
    });


}, '@VERSION@' ,{requires:['io-base','node-base']});
YUI.add('io-queue', function(Y) {

   /**
    * Extends the IO base class to implement Queue for synchronous
    * transaction processing.
    * @module io
    * @submodule io-queue
    */

   /**
    * @description Array of transactions queued for processing
    *
    * @property _yQ
    * @private
    * @static
    * @type Object
    */
    var _q = new Y.Queue(),

    _activeId,
   /**
    * @description Property to determine whether the queue is set to
    * 1 (active) or 0 (inactive).  When inactive, transactions
    * will be stored in the queue until the queue is set to active.
    *
    * @property _qState
    * @private
    * @static
    * @type int
    */
    _qState = 1;

   /**
    * @description Method Process the first transaction from the
    * queue in FIFO order.
    *
    * @method _shift
    * @private
    * @static
    * @return void
    */
    function _shift() {
        var o = _q.next();

        _activeId = o.id;
        _qState = 0;
        Y.io(o.uri, o.cfg, o.id);
    }

   /**
    * @description Method for promoting a transaction to the top of the queue.
    *
    * @method _unshift
    * @private
    * @static
    * @return void
    */
    function _unshift(o) {
        _q.promote(o);
    }

   /**
    * @description Method for requesting a transaction, and queueing the
    * request before it is sent to the resource.
    *
    * @method _queue
    * @private
    * @static
    * @return Object
    */
    function _queue(uri, c) {
        var o = { uri: uri, id: Y.io._id(), cfg:c };

        _q.add(o);
        if (_qState === 1) {
            _shift();
        }

        return o;
    }

    function _next(id) {
        _qState = 1;
        if (_activeId === id && _q.size() > 0) {
            _shift();
        }
    }

   /**
    * @description Method for removing a specific, pending transaction from
    * the queue.
    *
    * @method _remove
    * @private
    * @static
    * @return void
    */
    function _remove(o) {
        _q.remove(o);
    }

    function _start() {
        _qState = 1;

        if (_q.size() > 0) {
            _shift();
        }
    }

   /**
    * @description Method for setting queue processing to inactive.
    * Transaction requests to YUI.io.queue() will be stored in the queue, but
    * not processed until the queue is reset to "active".
    *
    * @method _stop
    * @private
    * @static
    * @return void
    */
    function _stop() {
        _qState = 0;
    }

   /**
    * @description Method to query the current size of the queue.
    *
    * @method _size
    * @private
    * @static
    * @return int
    */
    function _size() {
        return _q.size();
    }

   /**
    * @description Method to query the current size of the queue, or to
    * set a maximum queue size.  This is the interface for _size().
    *
    * @method size
    * @public
    * @static
    * @param {number} i - Specified maximum size of queue.
    * @return number
    */
    _queue.size = _size;

   /**
    * @description Method for setting the queue to active. If there are
    * transactions pending in the queue, they will be processed from the
    * queue in FIFO order. This is the interface for _start().
    *
    * @method start
    * @public
    * @static
    * @return void
    */
    _queue.start = _start;

   /**
    * @description Method for setting queue processing to inactive.
    * Transaction requests to YUI.io.queue() will be stored in the queue, but
    * not processed until the queue is restarted. This is the
    * interface for _stop().
    *
    * @method stop
    * @public
    * @static
    * @return void
    */
    _queue.stop = _stop;

   /**
    * @description Method for promoting a transaction to the top of the queue.
    * This is the interface for _unshift().
    *
    * @method promote
    * @public
    * @static
    * @param {Object} o - Reference to queued transaction.
    * @return void
    */
    _queue.promote = _unshift;

   /**
    * @description Method for removing a specific, pending transaction from
    * the queue. This is the interface for _remove().
    *
    * @method remove
    * @public
    * @static
    * @param {Object} o - Reference to queued transaction.
    * @return void
    */
    _queue.remove = _remove;

    Y.on('io:complete', function(id) { _next(id); }, Y.io);

    Y.mix(Y.io, {
        queue: _queue
    }, true);


}, '@VERSION@' ,{requires:['io-base','queue-promote']});


YUI.add('io', function(Y){}, '@VERSION@' ,{use:['io-base', 'io-form', 'io-xdr', 'io-upload-iframe', 'io-queue']});

