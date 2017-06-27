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
	* @method IO
	* @private
	* @static
	* @return object
	*/
	function IO () {
		var io = this;
		
		this._init(io);
		Y.io._map[io._uid] = io;
	}

	IO.prototype = {
		//--------------------------------------
		//  Properties
		//--------------------------------------
	   /**
		* @description Unique id assigned each IO instance.
		*
		* @property _id
		* @private
		* @static
		* @type int
		*/
		_uid: 'io:' + _i++,

	   /**
		* @description A counter that increments for each transaction.
		*
		* @property _id
		* @private
		* @static
		* @type int
		*/
		_id: 0,

	   /**
		* @description Object of IO HTTP headers sent with each transaction.
		*
		* @property _headers
		* @private
		* @static
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
		* @static
		* @type object
		*/
		_timeout: {},

		//--------------------------------------
		//  Methods
		//--------------------------------------

		_init: function() {
			var io = this, i;

			Y.augment(io, Y.EventTarget);
			for (i = 0; i < 5; i++) {
				io.publish('io:' + E[i], { broadcast: 1 });
				io.publish('io-trn:' + E[i]);
			}
		},

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
		* @static
		* @param {string} e - event to be published.
		* @param {object} o - transaction object.
		* @param {object} c - configuration data subset for event subscription.
		*
		* @return void
		*/
		_evt: function(e, o, c) {
			var io = this,
				f = c.on ? c.on[e] : null,
				y = c.context || Y,
				a = c['arguments'],
				g, t;

			o.c = o.e ? { status: 0, statusText: o.e } : o.c;
			switch (e) {
				case 'start':
				case 'end':
					g = a ? io.fire("io:" + e, o.id, a) : io.fire("io:" + e, o.id);
					if (f) {
						e = "io-trn:" + e;
						t = a ? io.once(e, f, y, a) : io.once(e, f, y);
						io.fire(e, o.id);
					}
					break;
				default:
					g = a ? io.fire("io:" + e, o.id, o.c, a) : io.fire("io:" + e, o.id, o.c);
					if (f) {
						e = "io-trn:" + e;
						t = a ? io.once(e, f, y, a) : io.once(e, f, y);
						io.fire(e, o.id, o.c);
						// t ? io.fire(e, o.id, o.c) : io.fire(e, o.id);
					}
			}
		},

	   /**
		* @description Fires event "io:start" and creates, fires a
		* transaction-specific start event, if config.on.start is
		* defined.
		*
		* @method start
		* @public
		* @static
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
		* @static
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
		* @static
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
		* @static
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
		* @static
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
		* @static

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
		* @static
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
		* @static
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
		* @static
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
		* @static
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
		* @static
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
		* @static
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
		* @static
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
		* @static
		* @param {string} uri - qualified path to transaction resource.
		* @param {object} c - configuration object for the transaction.
		* @param {number} i - transaction id, if already set.
		* @return object
		*/
		send: function(uri, c, i) {
			var f, o, m, r, s, d, io = this,
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
		var o = Y.io._map['io:0'] || new IO();
		return o.send.apply(o, [u, c]);
	};

	Y.IO = IO;
	Y.io._map = {};



}, '@VERSION@' ,{requires:['event-custom-base', 'querystring-stringify-simple']});

YUI.add('io-form', function(Y) {

   /**
    * Extends the IO base class to enable HTML form data serialization, when specified
    * in the transaction's configuration object.
    * @module io
    * @submodule io-form
    */

    var eUC = encodeURIComponent;

    Y.mix(Y.IO.prototype, {
       /**
        * @description Method to enumerate through an HTML form's elements collection
        * and return a string comprised of key-value pairs.
        *
        * @method _serialize
        * @private
        * @static
        * @param {object} c - YUI form node or HTML form id.
        * @param {string} s - Key-value data defined in the configuration object.
        * @return string
        */
        _serialize: function(c, s) {
            var data = [],
                df = c.useDisabled || false,
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

                if (df ? n : n && !d) {
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
    * @description Map of stored configuration objects when using 
    * Flash as the transport for cross-domain requests.
    *
    * @property _cB
    * @private
    * @static
    * @type object
    */
    _cB = {},

   /**
    * @description Map of transaction simulated readyState values
    * when XDomainRequest is the transport.
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
	// XDomainRequest cross-origin request detection
    xdr = w && w.XDomainRequest;

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
        var o = '<object id="io_swf" type="application/x-shockwave-flash" data="' +
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
		var io = this,
			i = o.id,
			p = 'xdrResponse',
			t = 'timeout';

        o.c.onprogress = function() { _rS[i] = 3; };
        o.c.onload = function() {
            _rS[i] = 4;
            io[p](o, c, 'success');
        };
        o.c.onerror = function() {
            _rS[i] = 4;
            io[p](o, c, 'failure');
        };
        if (c.timeout) {
            o.c.ontimeout = function() {
                _rS[i] = 4;
                io[p](o, c, t);
            };
            o.c[t] = c[t];
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
    * @param {boolean} u - Configuration xdr.use.
    * @param {boolean} d - Configuration xdr.dataType.
    *
    * @return object
    */
    function _data(o, u, d) {
		if (u === 'flash') {
			o.c.responseText = decodeURI(o.c.responseText);
		}
		if (d === 'xml') {
			o.c.responseXML = Y.DataType.XML.parse(o.c.responseXML);
		}
			
		return o;
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
        return xdr ? _rS[o.id] !== 4 : o.c.isInProgress(o.id);
    }

    Y.mix(Y.IO.prototype, {

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
        * @public
        * @static
        * @param {string} uri - qualified path to transaction resource.
        * @param {object} o - Transaction object generated by _create() in io-base.
        * @param {object} c - configuration object for the transaction.
        */
        xdr: function(uri, o, c) {
			var io = this;

			if (c.xdr.use === 'flash') {
				// The configuration object cannot be serialized safely
				// across Flash's ExternalInterface.
				_cB[o.id] = c;
				w.setTimeout(function() {
					if (o.c.send) {
						o.c.send(uri, { id: o.id,
										uid: o.uid,
										method: c.method,
										data: c.data,
										headers: c.headers });
					}
					else {
						io.xdrResponse(o, c, 'transport error');
						delete _cB[o.id];
					}
				}, Y.io.xdr.delay);
			}
			else if (xdr) {
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
				},
				io: io
			};
        },

       /**
        * @description Response controller for cross-domain requests when using the
        * Flash transport or IE8's XDomainRequest object.
        *
        * @method xdrResponse
        * @public
        * @static
        * @param {string} e - Event name
        * @param {object} o - Transaction object generated by _create() in io-base.
        * @param {object} c - configuration object for the transaction.
        * @return object
        */
        xdrResponse: function(e, o, c) {
			c = _cB[o.id] ? _cB[o.id] : c;
            var io = this,
                m = xdr ? _rS : _cB,
                u = c.xdr.use,
                d = c.xdr.dataType;

            switch (e) {
                case 'start':
                    io.start(o, c);
                    break;
               //case 'complete':
					//This case is not used by Flash or XDomainRequest.
                    //io.complete(o, c);
                    //break;
                case 'success':
                    io.success(_data(o, u, d), c);
                    delete m[o.id];
                    break;
                case 'timeout':
                case 'abort':
				case 'transport error':
					o.e = e;
                case 'failure':
                    io.failure(_data(o, u, d), c);
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
        *
        * @return void
        */
        _xdrReady: function(yid, uid) {
			Y.io.xdr.delay = 0;
            Y.fire(E_XDR_READY, yid);
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
            if (o.id === 'flash') {
				_swf(Y.UA.ie ? o.src + '?d=' + new Date().valueOf().toString() : o.src, Y.id);
			}

			this._transport[o.id] = (o.id === 'flash') ? d.getElementById('io_swf') : o.src;
        }
    });

	Y.io.xdrResponse = function(e, o, c){
		var io = Y.io._map[o.uid];
		io.xdrResponse.apply(io, [e, o, c]);
	};

	Y.io.transport = function(c){
		var io = Y.io._map['io:0'] || new Y.IO();
		io.transport.apply(io, [c]);
	};
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
	Y.io.xdr = { delay : 100 };



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
	function _iframe(o, c, io) {
		var i = Y.Node.create('<iframe id="io_iframe' + o.id + '" name="io_iframe' + o.id + '" />');
			i._node.style.position = 'absolute';
			i._node.style.top = '-1000px';
			i._node.style.left = '-1000px';
			Y.one('body').appendChild(i);
		// Bind the onload handler to the iframe to detect the file upload response.
		Y.on("load", function() { io._uploadComplete(o, c); }, '#io_iframe' + o.id);
	}

    Y.mix(Y.IO.prototype, {
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
		_addData: function(f, s) {
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
		},

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
		_removeData: function(f, o) {
			var i, l;

			for (i = 0, l = o.length; i < l; i++) {
				f.removeChild(o[i]);
			}
		},

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
		_setAttrs: function(f, id, uri) {
			f.setAttribute('action', uri);
			f.setAttribute('method', 'POST');
			f.setAttribute('target', 'io_iframe' + id );
			f.setAttribute(Y.UA.ie && !_std ? 'encoding' : 'enctype', 'multipart/form-data');
		},

	   /**
		* @description Reset the HTML form attributes to their original values.
		* @method _resetAttrs
		* @private
		* @static
		* @param {object} f HTML form object.
		* @param {object} a Object of original attributes.
		* @return {void}
		*/
		_resetAttrs: function(f, a) {
			Y.Object.each(a, function(v, p) {
				if (v) {
					f.setAttribute(p, v);
				}
				else {
					f.removeAttribute(p);
				}
			});
		},

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
		_startTimeout: function(o, c) {
			var io = this;

			io._timeout[o.id] = w.setTimeout(
				function() {
					o.status = 0;
					o.statusText = 'timeout';
					io.complete(o, c);
					io.end(o, c);
				}, c.timeout);
		},

	   /**
		* @description Clears the timeout interval started by _startTimeout().
		* @method _clearTimeout
		* @private
		* @static
		* @param {number} id - Transaction ID.
		* @return {void}
		*/
		_clearTimeout: function(id) {
			var io = this;

			w.clearTimeout(io._timeout[id]);
			delete io._timeout[id];
		},

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
		_destroy: function(id) {
			Y.Event.purgeElement('#io_iframe' + id, false);
			Y.one('body').removeChild(Y.one('#io_iframe' + id));
		},

	   /**
		* @description Bound to the iframe's Load event and processes
		* the response data.
		* @method _uploadComplete
		* @private
		* @static
		* @param {o} o The transaction object
		* @param {object} c Configuration object for the transaction.
		* @return {void}
		*/
		_uploadComplete: function(o, c) {
			var io = this,
				d = Y.one('#io_iframe' + o.id).get('contentWindow.document'),
				b = d.one('body'),
				p;

			if (c.timeout) {
				io._clearTimeout(o.id);
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

			io.complete(o, c);
			io.end(o, c);
			// The transaction is complete, so call _destroy to remove
			// the event listener bound to the iframe transport, and then
			// destroy the iframe.
			w.setTimeout( function() { io._destroy(o.id); }, 0);
		},

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
		_upload: function(o, uri, c) {
			var io = this,
				f = (typeof c.form.id === 'string') ? d.getElementById(c.form.id) : c.form.id,
				// Track original HTML form attribute values.
				attr = {
					action: f.getAttribute('action'),
					target: f.getAttribute('target')
				},
				fields;

			// Initialize the HTML form properties in case they are
			// not defined in the HTML form.
			io._setAttrs(f, o.id, uri);
			if (c.data) {
				fields = io._addData(f, c.data);
			}

			// Start polling if a callback is present and the timeout
			// property has been defined.
			if (c.timeout) {
				io._startTimeout(o, c);
			}

			// Start file upload.
			f.submit();
			io.start(o, c);
			if (c.data) {
				io._removeData(f, fields);
			}
			// Restore HTML form attributes to their original values.
			io._resetAttrs(f, attr);

			return {
				id: o.id,
				abort: function() {
					o.status = 0;
					o.statusText = 'abort';
					if (Y.one('#io_iframe' + o.id)) {
						io._destroy(o.id);
						io.complete(o, c);
						io.end(o, c);
					}
					else {
						return false;
					}
				},
				isInProgress: function() {
					return Y.one('#io_iframe' + o.id) ? true : false;
				},
				conn: io
			};
		},

        upload: function(o, uri, c) {
            _iframe(o, c, this);
            return this._upload(o, uri, c);
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
	var io = Y.io._map['io:0'] || new Y.IO();

    Y.mix(Y.IO.prototype, {
	   /**
		* @description Array of transactions queued for processing
		*
		* @property _q
		* @private
		* @static
		* @type Object
		*/
		_q: new Y.Queue(),
		_qActiveId: null,
		_qInit: false,
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
		_qState: 1,

	   /**
		* @description Method Process the first transaction from the
		* queue in FIFO order.
		*
		* @method _qShift
		* @private
		* @static
		* @return void
		*/
		_qShift: function() {
			var io = this,
				o = io._q.next();

			io._qActiveId = o.id;
			io._qState = 0;
			io.send(o.uri, o.cfg, o.id);
		},

	   /**
		* @description Method for queueing a transaction
		* before the request is sent to the resource, to ensure
		* sequential processing.
		*
		* @method queue
		* @public
		* @static
		* @return Object
		*/
		queue: function(uri, c) {
			var io = this,
				o = { uri: uri, cfg:c, id: this._id++ };

			if(!io._qInit) {
				Y.on('io:complete', function(id, o) { io._qNext(id); }, io);
				io._qInit = true;
			}

			io._q.add(o);
			if (io._qState === 1) {
				io._qShift();
			}

			return o;
		},

		_qNext: function(id) {
			var io = this;
			io._qState = 1;
			if (io._qActiveId === id && io._q.size() > 0) {
				io._qShift();
			}
		},

	   /**
		* @description Method for promoting a transaction to the top of the queue.
		*
		* @method promote
		* @public
		* @static
		* @return void
		*/
		qPromote: function(o) {
			this._q.promote(o);
		},

	   /**
		* @description Method for removing a specific, pending transaction from
		* the queue.
		*
		* @method remove
		* @private
		* @static
		* @return void
		*/
		qRemove: function(o) {
			this._q.remove(o);
		},

		qStart: function() {
			var io = this;
			io._qState = 1;

			if (io._q.size() > 0) {
				io._qShift();
			}
		},

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
		qStop: function() {
			this._qState = 0;
		},

	   /**
		* @description Method to query the current size of the queue.
		*
		* @method _size
		* @private
		* @static
		* @return int
		*/
		qSize: function() {
			return this._q.size();
		}

    }, true);

	function _queue(u, c) {
		return io.queue.apply(io, [u, c]);
	}
	
	_queue.start = function () { io.qStart(); };
	_queue.stop = function () { io.qStop(); };
	_queue.promote = function (o) { io.qPromote(o); };
	_queue.remove = function (o) { io.qRemove(o); };
	_queue.size = function () { io.qSize(); };
	Y.io.queue = _queue;



}, '@VERSION@' ,{requires:['io-base','queue-promote']});



YUI.add('io', function(Y){}, '@VERSION@' ,{use:['io-base', 'io-form', 'io-xdr', 'io-upload-iframe', 'io-queue']});

