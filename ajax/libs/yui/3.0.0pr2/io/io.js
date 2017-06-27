YUI.add('io-base', function(Y) {

   /**
	* HTTP communications module.
	* @module io
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
	* @description This event is fired by YUI.io when a transaction is initiated..
	* @type Event Custom
	*/
	E_START = 'io:start',

   /**
	* @event io:complete
	* @description This event is fired by YUI.io when a transaction is complete and
	* all response data are available.
	* @type Event Custom
	*/
	E_COMPLETE = 'io:complete',

   /**
	* @event io:success
	* @description This event is fired by YUI.io when a transaction is complete and
	* the HTTP status resolves to HTTP2xx.
	* @type Event Custom
	*/
	E_SUCCESS = 'io:success',

   /**
	* @event io:failure
	* @description This event is fired by YUI.io when a transaction is complete and
	* the HTTP status resolves to HTTP4xx, 5xx and above.
	* @type Event Custom
	*/
	E_FAILURE = 'io:failure',

   /**
	* @event io:abort
	* @description This event is fired by YUI.io when a transaction is aborted
	* explicitly or by a defined config.timeout.
	* @type Event Custom
	*/
	E_ABORT = 'io:abort',

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
	* @property _timeOut
	* @private
	* @static
	* @type object
	*/
	_timeout = {},

   /**
	* @description Array of transactions queued for processing
	*
	* @property _q
	* @private
	* @static
	* @type array
	*/
	_q = [],

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
	_qState = 1,

   /**
	* @description Queue property to set a maximum queue storage size.  When
	* this property is set, the queue will not store any more transactions
	* until the queue size os reduced below this threshold. There is no
	* maximum queue size until it is explicitly set.
	*
	* @property _qMaxSize
	* @private
	* @static
	* @type int
	*/
	_qMaxSize = false,

	// Window reference
	w = Y.config.win;

	//--------------------------------------
	//  Methods
	//--------------------------------------
   /**
	* @description Method for requesting a transaction, and queueing the
	* request before it is sent to the resource.
	*
	* @method _queue
	* @private
	* @static
    * @return int
	*/
	function _queue(uri, c) {

		if (_qMaxSize === false || _q.length < _qMaxSize) {
			var id = _id();
			_q.push({ uri: uri, id: id, cfg:c });
		}
		else {
			return false;
		}

		if (_qState === 1) {
			_shift();
		}

		return id;
	};

   /**
	* @description Method for promoting a transaction to the top of the queue.
	*
	* @method _unshift
	* @private
	* @static
    * @return void
	*/
	function _unshift(id) {
		var r;

		for (var i = 0; i < _q.length; i++) {
			if (_q[i].id === id) {
				r = _q.splice(i, 1);
				var p = _q.unshift(r[0]);
				break;
			}
		}
	};

   /**
	* @description Method for removing a transaction from the top of the
	* queue, and sending the transaction to _io().
	*
	* @method _shift
	* @private
	* @static
    * @return void
	*/
	function _shift() {
		var c = _q.shift();
		_io(c.uri, c.cfg, c.id);
	};

   /**
	* @description Method to query the current size of the queue, or to
	* set a maximum queue size.
	*
	* @method _size
	* @private
	* @static
    * @return int
	*/
	function _size(i) {
		if (i) {
			_qMaxSize = i;
			return i;
		}
		else {
			return _q.length;
		}
	};

   /**
	* @description Method for setting the queue to active. If there are
	* transactions pending in the queue, they will be processed from the
	* queue in FIFO order.
	*
	* @method _start
	* @private
	* @static
    * @return void
	*/
	function _start() {
		var len = (_q.length > _qMaxSize > 0) ? _qMaxSize : _q.length;

		if (len > 1) {
			for (var i=0; i < len; i++) {
				_shift();
			}
		}
		else {
			_shift();
		}

	};

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
	};

   /**
	* @description Method for removing a specific, pending transaction from
	* the queue.
	*
	* @method _purge
	* @private
	* @static
    * @return void
	*/
	function _purge(id) {
		if (Y.Lang.isNumber(id)) {
			for (var i = 0; i < _q.length; i++) {
				if (_q[i].id === id) {
					_q.splice(i, 1);
					break;
				}
			}
		}
	};
	/* End Queue Functions */

   /**
	* @description Method for requesting a transaction. _io() is implemented as
	* yui.io().  Each transaction may include a configuration object.  Its
	* properties are:
	*
	* method: HTTP method verb (e.g., GET or POST). If this property is not
	*         not defined, the default value will be GET.
	*
	* data: This is the name-value string that will be sent as the transaction
    *		data.  If the request is HTTP GET, the data become part of
    *		querystring. If HTTP POST, the data are sent in the message body.
	*
	* xdr: Defines the transport to be used for cross-domain requests.  By
	*      setting this property, the transaction will use the specified
	*      transport instead of XMLHttpRequest.  Currently, the only alternate
	*      transport supported is Flash (e.g., { xdr: 'flash' }).
	*
	* form: This is a defined object used to process HTML form as data.  The
	*       properties are:
	*       {
	*	      id: object, //HTML form object or id of HTML form
	*         useDisabled: boolean, //Allow disabled HTML form field values
	*                      to be sent as part of the data.
    *       }
    *
    * on: This is a defined object used to create and handle specific
    *     events during a transaction lifecycle.  These events will fire in
    *     addition to the global io events. The events are:
    *	  start - This event is fired when a request is sent to a resource.
    *     complete - This event fires when the transaction is complete.
    *     success - This event fires when the response status resolves to
    *               HTTP 2xx.
    *     failure - This event fires when the response status resolves to
    *               HTTP 4xx, 5xx, and beyond.
    *	  abort - This even is fired when a transaction abort is fire by
    *             timeout, or when it is manually aborted.
    *
    *     The properties are:
    *     {
	*       start: function(id, args){},
	*       complete: function(id, responseobject, args){},
	*       success: function(id, responseobject, args){},
	*       failure: function(id, responseobject, args){},
	*       abort: function(id, args){}
	*     }
	*	  Each property can reference a function or be written as an
	*     inline function.
	*
	* context: Object reference for an event handler when it is implemented
	*          as a method of a base object. Defining "context" will preserve
	*          the proper reference of "this" used in the event handler.
	* headers: This is a defined object of client headers, as many as.
	*         desired for the transaction.  These headers are sentThe object
	*         pattern is:
	*		  {
	*		    header: value
	*         }
	*
	* timeout: This value, defined as milliseconds, is a time threshold for the
	*          transaction. When this threshold is reached, and the transaction's
	*          Complete event has not yet fired, the transaction will be aborted.
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
    * @return object
	*/
	function _io(uri, c) {
		var c = c || {},
		o = _create((arguments.length === 3) ? arguments[2] : null, c),
		m = (c.method) ? c.method.toUpperCase() : 'GET',
		d = (c.data) ? c.data : null,
		f;

		/* Determine configuration properties */
		// If config.form is defined, perform data operations.
		if (c.form) {

			if (c.form.upload) {
				u = Y.io._upload(o, uri, c);
				return u;
			}

			// Serialize the HTML form into a string of name-value pairs.
			f = Y.io._serialize(c.form);
			// If config.data is defined, concatenate the data to the form string.
			if (d) {
				f += "&" + d;
			}

			if (m === 'POST') {
				d = f;
				_setHeader('Content-Type', 'application/x-www-form-urlencoded');
			}
			else if (m === 'GET') {
				uri = _concat(uri, f);
			}
		}
		else if (d && m === 'GET') {
			uri = _concat(uri, c.data);
		}
		else if (d && m === 'POST') {
			_setHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		}

		if (c.xdr) {
			Y.io._xdr(uri, o, c);
			return o;
		}

		// If config.timeout is defined, and the request is standard XHR,
		// initialize timeout polling.
		if (c.timeout) {
			_startTimeout(o, c);
		}
		/* End Configuration Properties */

		o.c.onreadystatechange = function() { _readyState(o, c); };
		try {
			_open(o.c, m, uri);
		}
		catch (e) {
		}
		_setHeaders(o.c, (c.headers || {}));

		o.abort = function () {
			_ioAbort(o, c);
		}

		o.isInProgress = function() {
			return o.c.readyState !== 4 && o.c.readyState !== 0;
		}
		// Do not pass null, in the absence of data, as this
		// wiil result in a POST request with no Content-Length
		// defined.
		_async(o, (d || ''), c);

		return o;
	};

   /**
	* @description Method for creating and subscribing transaction events.
	*
	* @method _tPubSub
	* @private
	* @static
	* @param {string} e - event to be published
	* @param {object} c - configuration object for the transaction.
	*
    * @return void
	*/
	function _tPubSub(e, c){
			var event = new Y.Event.Target().publish('transaction:' + e);
			event.subscribe(c.on[e], (c.context || this), c.arguments);

			return event;
	};

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
		// Set default value of argument c, property "on" to Object if
		// the property is null or undefined.
		c.on = c.on || {};
		var m = Y.io._fn || {},
		fn = (m && m[id]) ? m[id] : null,
		event;

		if (fn) {
			c.on.start = fn.start;
			delete fn;
		}

		Y.fire(E_START, id);
		if (c.on.start) {
			event = _tPubSub('start', c);
			event.fire(id);
		}
	};

   /**
	* @description Fires event "io:complete" and creates, fires a
	* transaction-specific "complete" event, if config.on.complete is
	* defined.
	*
	* @method _ioComplete
	* @private
	* @static
	* @param {object} id - transaction object.
	* @param {object} c - configuration object for the transaction.
	*
    * @return void
	*/
	function _ioComplete(o, c) {
		// Set default value of argument c, property "on" to Object if
		// the property is null or undefined.
		c.on = c.on || {};
		var event;

		Y.fire(E_COMPLETE, o.id, o.c);
		if (c.on.complete) {
			event = _tPubSub('complete', c);
			event.fire(o.id, o.c);
		}
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
		// Set default value of argument c, property "on" to Object if
		// the property is null or undefined.
		c.on = c.on || {};
		var m = Y.io._fn || {},
		fn = (m && m[o.id]) ? m[o.id] : null,
		event;

		if (fn) {
			c.on.success = fn.success;
			delete fn;
			//Decode the response from IO.swf
			o.c.responseText = decodeURI(o.c.responseText);
		}

		Y.fire(E_SUCCESS, o.id, o.c);
		if (c.on.success) {
			event = _tPubSub('success', c);
			event.fire(o.id, o.c);
		}

		_destroy(o, (c.xdr) ? true : false );
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
		// Set default value of argument c, property "on" to Object if
		// the property is null or undefined.
		c.on = c.on || {};
		var m = Y.io._fn || {},
		fn = (m && m[o.id]) ? m[o.id] : null,
		event;

		if (fn) {
			c.on.failure = fn.failure;
			delete fn;
			//Decode the response from IO.swf
			o.c.responseText = decodeURI(o.c.responseText);
		}

		Y.fire(E_FAILURE, o.id, o.c);
		if (c.on.failure) {
			event = _tPubSub('failure', c);
			event.fire(o.id, o.c);
		}

		_destroy(o, (c.xdr) ? true : false );
	}

   /**
	* @description Fires event "io:abort" and creates, fires a
	* transaction-specific "abort" event, if config.on.abort is
	* defined.
	*
	* @method _ioAbort
	* @private
	* @static
    * @param {object} o - Transaction object generated by _create().
    * @param {object} c - Configuration object passed to YUI.io().
	*
    * @return void
	*/
	function _ioAbort(o, c) {
		// Set default value of argument c, property "on" to Object if
		// the property is null or undefined.
		c.on = c.on || {};
		var m = Y.io._fn || {},
		fn = (m && m[o.id]) ? m[o.id] : null,
		event;

		if(o && o.c  && !c.xdr) {
			// Terminate the transaction
			o.c.abort();
			if (c) {
				// Clear the timeout poll for this specific transaction.
				if (c.timeout) {
					_clearTimeout(o.id);
				}
			}
		}

		if (fn) {
			c.on.abort = fn.abort;
			delete fn;
		}

		Y.fire(E_ABORT, o.id);
		if (c.on.abort) {
			event = _tPubSub('abort', c);
			event.fire(id);
		}

		_destroy(o, (c.xdr) ? true : false );
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
	};

   /**
	* @description Method that creates a unique transaction object for each
	* request..
	*
	* @method _create
	* @private
	* @static
    * @param {number} s - URI or root data.
    * @param {number} c - configuration object
    * @return object
	*/
	function _create(i, c) {
		var o = {};
		o.id = Y.Lang.isNumber(i) ? i : _id();

		if (c.xdr) {
			o.c = Y.io._transport[c.xdr.use];
		}
		else if (c.form && c.form.upload) {
			o.c = {};
		}
		else {
			o.c = _xhr();
		}

		return o;
	};

   /**
	* @description Method that creates the XMLHttpRequest transport
	*
	* @method _xhr
	* @private
	* @static
    * @return object
	*/
	function _xhr() {
		return (w.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	};

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
	};

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
	};

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

		for (p in _headers) {
			if (_headers.hasOwnProperty(p)) {
				h[p] = _headers[p];
			}
		}

		for (p in h) {
			if (h.hasOwnProperty(p)) {
				o.setRequestHeader(p, h[p]);
			}
		}
	};

	function _open(o, m, uri) {
		o.open(m, uri, true);
	};

   /**
	* @description Method that sends the transaction request.
	*
	* @method _async
	* @private
	* @static
    * @param {object} o - Transaction object generated by _create().
    * @param {string} d - Transaction data.
    * @param {object} c - Configuration object passed to YUI.io().
    * @return void
	*/
	function _async(o, d, c) {
		o.c.send(d);
		_ioStart(o.id, c);
	};

   /**
	* @description Starts timeout count if the configuration object
	* has a defined timeout property.
	*
	* @method _startTimeout
	* @private
	* @static
    * @param {object} o - Transaction object generated by _create().
    * @param {object} c - Configuration object passed to YUI.io().
    * @return void
	*/
	function _startTimeout(o, c) {
		_timeout[o.id] = w.setTimeout(function() { _ioAbort(o, c); }, c.timeout);
	};

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
	};

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
			_ioComplete(o, c);
			_handleResponse(o, c);
		}
	};

   /**
	* @description Method that determines if a transaction response qualifies
	* as success or failure, based on the response HTTP status code, and
	* fires the appropriate success or failure events.
	*
	* @method _handleResponse
	* @private
	* @static
    * @param {object} o - Transaction object generated by _create().
    * @param {object} c - Configuration object passed to YUI.io().
    * @return void
	*/
	function _handleResponse(o, c) {
		var status;
		try{
			if (o.c.status && o.c.status !== 0) {
				status = o.c.status;
			}
			else {
				status = 0;
			}
		}
		catch(e) {
			status = 0;
		}

		/*
		 * IE reports HTTP 204 as HTTP 1223.
		 * However, the response data are still available.
		 *
		 * setTimeout() is used to prevent transactions from becoming
		 * synchronous, in IE, when the response data are read from cache
		 * (e.g., HTTP 304).
		 */
		if (status >= 200 && status < 300 || status === 1223) {
			w.setTimeout( function() { _ioSuccess(o, c); }, 0);
		}
		else {
			w.setTimeout( function() {_ioFailure(o, c); }, 0);
		}
	};

	function _destroy(o, isTransport) {
		// IE6 will throw a "Type Mismatch" error if the event handler is set to "null".
		if(w.XMLHttpRequest && !isTransport) {
			if (o.c) {
				o.c.onreadystatechange = null;
			}
		}

		o.c = null;
		o = null;
	};

	_io.start = _ioStart;
	_io.complete = _ioComplete;
	_io.success = _ioSuccess;
	_io.failure = _ioFailure;
	_io.abort = _ioAbort;
	_io.timeout = _timeout;

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
	* @description Method for requesting a transaction, and queueing the
	* request before it is sent to the resource. This is the
	* interface for _queue().
	*
	* @method queue
	* @public
	* @static
    * @param {string} uri - qualified path to transaction resource.
    * @param {object} c - configuration object for the transaction.
    * @return int
	*/
	_io.queue = _queue;

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
	_io.queue.size = _size;

   /**
	* @description Method for setting the queue to "active". If there are
	* transactions pending in the queue, they will be processed from the
	* queue in FIFO order. This is the interface for _start().
	*
	* @method start
	* @public
	* @static
    * @return void
	*/
	_io.queue.start = _start;

   /**
	* @description Method for setting queue processing to inactive.
	* Transaction requests to YUI.io.queue() will be stored in the queue, but
	* not processed until the queue is set to "active". This is the
	* interface for _stop().
	*
	* @method stop
	* @public
	* @static
    * @return void
	*/
	_io.queue.stop = _stop;

   /**
	* @description Method for promoting a transaction to the top of the queue.
	* This is the interface for _unshift().
	*
	* @method promote
	* @public
	* @static
	* @param {number} i - ID of queued transaction.
    * @return void
	*/
	_io.queue.promote = _unshift;

   /**
	* @description Method for removing a specific, pending transaction from
	* the queue. This is the interface for _purge().
	*
	* @method purge
	* @public
	* @static
	* @param {number} i - ID of queued transaction.
    * @return void
	*/
	_io.queue.purge = _purge;

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



}, '@VERSION@' );

YUI.add('io-form', function(Y) {

   /*
	* @module io-base
	* @submodule io-form
	*/

    Y.mix(Y.io, {
       /**
        * @description Method to enumerate through an HTML form's elements collection
        * and return a string comprised of key-value pairs.
        *
        * @method _serialize
        * @private
        * @static
        * @param {object} f - HTML form object or id.
        * @return string
        */
        _serialize: function(o) {
            var f = (typeof o.id === 'object') ? o.id : Y.config.doc.getElementById(o.id),
            eUC = encodeURIComponent,
            data = [],
            useDf = o.useDisabled || false,
            item = 0,
            e, n, v, d, i, ilen, j, jlen, o;

            // Iterate over the form elements collection to construct the
            // label-value pairs.
            for (i = 0, ilen = f.elements.length; i < ilen; ++i) {
                e = f.elements[i];
                d = e.disabled;
                n = e.name;

                if ((useDf) ? n : (n && !d)) {
                    n = encodeURIComponent(n) + '=';
                    v = encodeURIComponent(e.value);

                    switch (e.type) {
                        // Safari, Opera, FF all default opt.value from .text if
                        // value attribute not specified in markup
                        case 'select-one':
                            if (e.selectedIndex > -1) {
                                o = e.options[e.selectedIndex];
                                data[item++] = n + eUC((o.attributes.value && o.attributes.value.specified) ? o.value : o.text);
                            }
                            break;
                        case 'select-multiple':
                            if (e.selectedIndex > -1) {
                                for (j = e.selectedIndex, jlen = e.options.length; j < jlen; ++j) {
                                    o = e.options[j];
                                    if (o.selected) {
                                      data[item++] = n + eUC((o.attributes.value && opt.attributes.value.specified) ? o.value : o.text);
                                    }
                                }
                            }
                            break;
                        case 'radio':
                        case 'checkbox':
                            if(e.checked){
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
                            break;
                        default:
                            data[item++] = n + v;
                    }
                }
            }
            return data.join('&');
        }
    }, true);



}, '@VERSION@' ,{requires:['io-base']});

YUI.add('io-xdr', function(Y) {

   /*
	* @module io-base
	* @submodule io-xdr
	*/

   /**
	* @event io:xdrReady
	* @description This event is fired by YUI.io when a transaction is initiated..
	* @type Event Custom
	*/
	var E_XDR_READY = 'io:xdrReady';

   /**
	* @description Method that creates the Flash transport swf.
	*
	* @method _swf
	* @private
	* @static
	* @param {string} uri - location of IO.swf.
	* @param {string} yid - YUI instance id.
	* @return void
	*/
	function swf(uri, yid) {
		var XDR_SWF = '<object id="yuiSwfIo" type="application/x-shockwave-flash" data="' + uri + '" width="0" height="0">' +
		     		  '<param name="movie" value="' + uri + '">' +
		     		  '<param name="FlashVars" value="yid=' + yid + '">' +
                      '<param name="allowScriptAccess" value="sameDomain">' +
		    	      '</object>';
		Y.get('body').appendChild(Y.Node.create(XDR_SWF))
	};

    Y.mix(Y.io, {

	   /**
		* @description Map of IO transports.
		*
		* @property _transport
		* @private
		* @static
		* @type object
		*/
		_transport: {},

	   /**
		* @description Object that stores callback handlers for cross-domain requests
		* when using Flash as the transport.
		*
		* @property _fn
		* @private
		* @static
		* @type object
		*/
		_fn: {},

		_xdr: function(uri, o, c){
			if (c.on) {
				this._fn[o.id] = c.on;
			}
			o.c.send(uri, c, o.id);

			return o;
		},

	   /**
		* @description Method to initialize the desired transport medium.
		*
		* @method transport
		* @public
		* @static
		* @param {object} o - object of transport configurations.
		* @return void
		*/
		transport: function(o) {
			switch (o.id) {
				case 'flash':
					swf(o.src, o.yid);
					this._transport.flash = Y.config.doc.getElementById('yuiSwfIo');
					break;
				case 'upload':
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
			Y.fire(E_XDR_READY, id);
		}
	});



}, '@VERSION@' ,{requires:['io-base']});



YUI.add('io', function(Y){}, '@VERSION@' ,{use:['io-base', 'io-form', 'io-xdr']});

