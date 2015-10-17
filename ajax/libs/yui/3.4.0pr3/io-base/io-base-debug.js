YUI.add('io-base', function(Y) {

   /**
    * Base IO functionality. Provides basic XHR transport support.
    * @module io
    * @submodule io-base
    */

	// Window reference
	var L = Y.Lang,
		// List of events that comprise the IO event lifecycle.
		E = ['start', 'complete', 'end', 'success', 'failure'],
		// Whitelist of used XHR response object properties.
		P = ['status', 'statusText', 'responseText', 'responseXML'],
		aH = 'getAllResponseHeaders',
		oH = 'getResponseHeader',
		w = Y.config.win,
		xhr = w.XMLHttpRequest,
		xdr = w.XDomainRequest,
		_i = 0;

   /**
    * The io class is a utility that brokers HTTP requests through a simplified
    * interface.  Specifically, it allows JavaScript to make HTTP requests to
    * a resource without a page reload.  The underlying transport for making
    * same-domain requests is the XMLHttpRequest object.  YUI.io can also use
    * Flash, if specified as a transport, for cross-domain requests.
    *
	* @class IO
	* @constructor
    * @param {object} c - Object of EventTarget's publish method configurations
    *                     used to configure IO's events.
	*/
	function IO (c) {
		var io = this;

		io._uid = 'io:' + _i++;
		io._init(c);
		Y.io._map[io._uid] = io;
	}

	IO.prototype = {
		//--------------------------------------
		//  Properties
		//--------------------------------------

	   /**
		* @description A counter that increments for each transaction.
		*
		* @property _id
		* @private
		* @type int
		*/
		_id: 0,

	   /**
		* @description Object of IO HTTP headers sent with each transaction.
		*
		* @property _headers
		* @private
		* @type object
		*/
		_headers: {
			'X-Requested-With' : 'XMLHttpRequest'
		},

	   /**
		* @description Object that stores timeout values for any transaction with
		* a defined "timeout" configuration property.
		*
		* @property _timeout
		* @private
		* @type object
		*/
		_timeout: {},

		//--------------------------------------
		//  Methods
		//--------------------------------------

		_init: function(c) {
			var io = this, i;
			
			io.cfg = c || {};
	
			Y.augment(io, Y.EventTarget);
			for (i = 0; i < 5; i++) {
				// Publish IO global events with configurations, if any.
				// IO global events are set to broadcast by default.
				// These events use the "io:" namespace.
				io.publish('io:' + E[i], Y.merge({ broadcast: 1 }, c));
				// Publish IO transaction events with configurations, if
				// any.  These events use the "io-trn:" namespace.
				io.publish('io-trn:' + E[i], c);
			}
		},

	   /**
		* @description Method that creates a unique transaction object for each
		* request.
		*
		* @method _create
		* @private
		* @param {number} c - configuration object subset to determine if
		*                     the transaction is an XDR or file upload,
		*                     requiring an alternate transport.
		* @param {number} i - transaction id
		* @return object
		*/
		_create: function(c, i) {
			var io = this,
				o = { id: L.isNumber(i) ? i : io._id++, uid: io._uid },
				x = c.xdr,
				u = x ? x.use : c.form && c.form.upload ? 'iframe' : 'xhr',
				ie = (x && x.use === 'native' && xdr),
				t = io._transport;

			switch (u) {
				case 'native':
				case 'xhr':
					o.c = ie ? new xdr() : xhr ? new xhr() : new ActiveXObject('Microsoft.XMLHTTP');
					o.t =  ie ? true : false;
					break;
				default:
					o.c = t ? t[u] : {};
					o.t = true;
			}

			return o;
		},

		_destroy: function(o) {
			if (w) {
				if (xhr && o.t === true) {
					o.c.onreadystatechange = null;
				}
				else if (Y.UA.ie) {
					// IE, when using XMLHttpRequest as an ActiveX Object, will throw
					// a "Type Mismatch" error if the event handler is set to "null".
					o.c.abort();
				}
			}

			o.c = null;
			o = null;
		},

	   /**
		* @description Method for creating and firing events.
		*
		* @method _evt
		* @private
		* @param {string} e - event to be published.
		* @param {object} o - transaction object.
		* @param {object} c - configuration data subset for event subscription.
		*
		* @return void
		*/
		_evt: function(e, o, c) {
			var io = this,
				a = c['arguments'],
				eF = io.cfg.emitFacade,
				// Use old-style parameters or use an Event Facade
				p = eF ? [{ id: o.id, data: o.c, cfg: c, arguments: a }] : [o.id],
				// IO Global events namespace.
				gE = "io:" + e,
				// IO Transaction events namespace.
				tE = "io-trn:" + e;

				if (!eF) {
					if (e === E[0] || e === E[2]) {
						if (a) {
							p.push(a);
						}
					}
					else {
						a ? p.push(o.c, a) : p.push(o.c);
					}
				}
				
				p.unshift(gE);
				io.fire.apply(io, p);
				if (c.on) {
					p[0] = tE;
					io.once(tE, c.on[e], c.context || Y);
					io.fire.apply(io, p);
				}
		},

	   /**
		* @description Fires event "io:start" and creates, fires a
		* transaction-specific start event, if config.on.start is
		* defined.
		*
		* @method start
		* @public
		* @param {object} o - transaction object.
		* @param {object} c - configuration object for the transaction.
		*
		* @return void
		*/
		start: function(o, c) {
			this._evt(E[0], o, c);
		},

	   /**
		* @description Fires event "io:complete" and creates, fires a
		* transaction-specific "complete" event, if config.on.complete is
		* defined.
		*
		* @method complete
		* @public
		* @param {object} o - transaction object.
		* @param {object} c - configuration object for the transaction.
		*
		* @return void
		*/
		complete: function(o, c) {
			this._evt(E[1], o, c);
		},

	   /**
		* @description Fires event "io:end" and creates, fires a
		* transaction-specific "end" event, if config.on.end is
		* defined.
		*
		* @method end
		* @public
		* @param {object} o - transaction object.
		* @param {object} c - configuration object for the transaction.
		*
		* @return void
		*/
		end: function(o, c) {
			this._evt(E[2], o, c);
			this._destroy(o);
		},

	   /**
		* @description Fires event "io:success" and creates, fires a
		* transaction-specific "success" event, if config.on.success is
		* defined.
		*
		* @method success
		* @public
		* @param {object} o - transaction object.
		* @param {object} c - configuration object for the transaction.
		*
		* @return void
		*/
		success: function(o, c) {
			this._evt(E[3], o, c);
			this.end(o, c);
		},

	   /**
		* @description Fires event "io:failure" and creates, fires a
		* transaction-specific "failure" event, if config.on.failure is
		* defined.
		*
		* @method failure
		* @public
		* @param {object} o - transaction object.
		* @param {object} c - configuration object for the transaction.
		*
		* @return void
		*/
		failure: function(o, c) {
			this._evt(E[4], o, c);
			this.end(o, c);
		},

	   /**
		* @description Retry an XDR transaction, using the Flash tranport,
		* if the native transport fails.
		*
		* @method _retry
		* @private

		* @param {object} o - Transaction object generated by _create().
		* @param {string} uri - qualified path to transaction resource.
		* @param {object} c - configuration object for the transaction.
		*
		* @return void
		*/
		_retry: function(o, uri, c) {
			this._destroy(o);
			c.xdr.use = 'flash';
			return this.send(uri, c, o.id);
		},

	   /**
		* @description Method that concatenates string data for HTTP GET transactions.
		*
		* @method _concat
		* @private
		* @param {string} s - URI or root data.
		* @param {string} d - data to be concatenated onto URI.
		* @return int
		*/
		_concat: function(s, d) {
			s += (s.indexOf('?') === -1 ? '?' : '&') + d;
			return s;
		},

	   /**
		* @description Method that stores default client headers for all transactions.
		* If a label is passed with no value argument, the header will be deleted.
		*
		* @method _setHeader
		* @private
		* @param {string} l - HTTP header
		* @param {string} v - HTTP header value
		* @return int
		*/
		setHeader: function(l, v) {
			if (v) {
				this._headers[l] = v;
			}
			else {
				delete this._headers[l];
			}
		},

	   /**
		* @description Method that sets all HTTP headers to be sent in a transaction.
		*
		* @method _setHeaders
		* @private
		* @param {object} o - XHR instance for the specific transaction.
		* @param {object} h - HTTP headers for the specific transaction, as defined
		*                     in the configuration object passed to YUI.io().
		* @return void
		*/
		_setHeaders: function(o, h) {
			h = Y.merge(this._headers, h);
			Y.Object.each(h, function(v, p) {
				if (v !== 'disable') {
					o.setRequestHeader(p, h[p]);
				}
			});
		},

	   /**
		* @description Starts timeout count if the configuration object
		* has a defined timeout property.
		*
		* @method _startTimeout
		* @private
		* @param {object} o - Transaction object generated by _create().
		* @param {object} t - Timeout in milliseconds.
		* @return void
		*/
		_startTimeout: function(o, t) {
			var io = this;
			io._timeout[o.id] = w.setTimeout(function() { io._abort(o, 'timeout'); }, t);
		},

	   /**
		* @description Clears the timeout interval started by _startTimeout().
		*
		* @method _clearTimeout
		* @private
		* @param {number} id - Transaction id.
		* @return void
		*/
		_clearTimeout: function(id) {
			w.clearTimeout(this._timeout[id]);
			delete this._timeout[id];
		},

	   /**
		* @description Method that determines if a transaction response qualifies
		* as success or failure, based on the response HTTP status code, and
		* fires the appropriate success or failure events.
		*
		* @method _result
		* @private
		* @static
		* @param {object} o - Transaction object generated by _create().
		* @param {object} c - Configuration object passed to io().
		* @return void
		*/
		_result: function(o, c) {
			var s = o.c.status;

			// IE reports HTTP 204 as HTTP 1223.
			if (s >= 200 && s < 300 || s === 1223) {
				this.success(o, c);
			}
			else {
				this.failure(o, c);
			}
		},

	   /**
		* @description Event handler bound to onreadystatechange.
		*
		* @method _rS
		* @private
		* @param {object} o - Transaction object generated by _create().
		* @param {object} c - Configuration object passed to YUI.io().
		* @return void
		*/
		_rS: function(o, c) {
			var io = this;

			if (o.c.readyState === 4) {
				if (c.timeout) {
					io._clearTimeout(o.id);
				}

				// Yield in the event of request timeout or  abort.
				w.setTimeout(function() { io.complete(o, c); io._result(o, c); }, 0);
			}
		},

	   /**
		* @description Terminates a transaction due to an explicit abort or
		* timeout.
		*
		* @method _abort
		* @private
		* @param {object} o - Transaction object generated by _create().
		* @param {string} s - Identifies timed out or aborted transaction.
		*
		* @return void
		*/
		_abort: function(o, s) {
			if (o && o.c) {
				o.e = s;
				o.c.abort();
			}
		},

	   /**
		* @description Method for requesting a transaction. send() is implemented as
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
		*       "sync" to true. Synchronous requests are limited to same-domain
		*       requests only.
		*
		* context: Object reference for all defined transaction event handlers
		*          when it is implemented as a method of a base object. Defining
		*          "context" will set the reference of "this," used in the
		*          event handlers, to the context value.  In the case where
		*          different event handlers all have different contexts,
		*          use Y.bind() to set the execution context, instead.
		*
		* headers: This is a defined object of client headers, as many as
		*          desired for this specific transaction.  The object pattern is:
		*          { 'header': 'value' }.
		*
		* timeout: This value, defined as milliseconds, is a time threshold for the
		*          transaction. When this threshold is reached, and the transaction's
		*          Complete event has not yet fired, the transaction will be aborted.
		*
		* arguments: User-defined data passed to all registered event handlers.
		*            This value is available as the second argument in the "start"
		*            and "end" event handlers. It is the third argument in the
		*            "complete", "success", and "failure" event handlers.
		*
		* @method send
		* @private
		* @
		* @param {string} uri - qualified path to transaction resource.
		* @param {object} c - configuration object for the transaction.
		* @param {number} i - transaction id, if already set.
		* @return object
		*/
		send: function(uri, c, i) {
			var o, m, r, s, d, io = this,
				u = uri;
				c = c ? Y.Object(c) : {};
				o = io._create(c, i);
				m = c.method ? c.method.toUpperCase() : 'GET';
				s = c.sync;
				d = c.data;

			// Serialize an object into a key-value string using
			// querystring-stringify-simple.
			if (L.isObject(d)) {
				d = Y.QueryString.stringify(d);
			}

			if (c.form) {
				if (c.form.upload) {
					// This is a file upload transaction, calling
					// upload() in io-upload-iframe.
					return io.upload(o, uri, c);
				}
				else {
					// Serialize HTML form data into a key-value string.
					d = io._serialize(c.form, d);
				}
			}

			if (d) {
				switch (m) {
					case 'GET':
					case 'HEAD':
					case 'DELETE':
						u = io._concat(u, d);
						d = '';
						Y.log('HTTP' + m + ' with data.  The querystring is: ' + u, 'info', 'io');
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
				// Cross-domain request or custom transport configured.
				return io.xdr(u, o, c);
			}

			if (!s) {
				o.c.onreadystatechange = function() { io._rS(o, c); };
			}

			try {
				// Determine if request is to be set as
				// synchronous or asynchronous.
				o.c.open(m, u, s ? false : true, c.username || null, c.password || null);
				io._setHeaders(o.c, c.headers || {});
				io.start(o, c);

				// Will work only in browsers that implement the
				// Cross-Origin Resource Sharing draft.
				if (c.xdr && c.xdr.credentials) {
					if (!Y.UA.ie) {
						o.c.withCredentials = true;
					}
				}

				// Using "null" with HTTP POST will result in a request
				// with no Content-Length header defined.
				o.c.send(d);

				if (s) {
					// Create a response object for synchronous transactions,
					// mixing id and arguments properties with the xhr
					// properties whitelist.
					r = Y.mix({ id: o.id, 'arguments': c['arguments'] }, o.c, false, P);
					r[aH] = function() { return o.c[aH](); };
					r[oH] = function(h) { return o.c[oH](h); };
					io.complete(o, c);
					io._result(o, c);

					return r;
				}
			}
			catch(e) {
				if (o.t) {
					// This exception is usually thrown by browsers
					// that do not support XMLHttpRequest Level 2.
					// Retry the request with the XDR transport set
					// to 'flash'.  If the Flash transport is not
					// initialized or available, the transaction
					// will resolve to a transport error.
					return io._retry(o, uri, c);
				}
				else {
					io.complete(o, c);
					io._result(o, c);
				}
			}

			// If config.timeout is defined, and the request is standard XHR,
			// initialize timeout polling.
			if (c.timeout) {
				io._startTimeout(o, c.timeout);
				Y.log('Configuration timeout set to: ' + c.timeout, 'info', 'io');
			}

			return {
				id: o.id,
				abort: function() {
					return o.c ? io._abort(o, 'abort') : false;
				},
				isInProgress: function() {
					return o.c ? o.c.readyState !== 4 && o.c.readyState !== 0 : false;
				},
				io: io
			};
		}
	};

   /**
    * @description Method for requesting a transaction.
    *
    * @method io
    * @public
    * @static
    * @param {string} u - qualified path to transaction resource.
    * @param {object} c - configuration object for the transaction.
    * @return object
    */
    Y.io = function(u, c) {
		// Calling IO through the static interface will use and reuse
		// an instance of IO.
		var o = Y.io._map['io:0'] || new IO();
		return o.send.apply(o, [u, c]);
	};

	Y.IO = IO;
	// Map of all IO instances created.
	Y.io._map = {};



}, '@VERSION@' ,{requires:['event-custom-base', 'querystring-stringify-simple']});
