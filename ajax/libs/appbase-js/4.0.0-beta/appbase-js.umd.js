(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global['appbase-js'] = factory());
}(this, (function () { 'use strict';

    function URL(url) {
        var pattern = RegExp("^(([^:/?#]*)?://)?(((.*)?@)?([^/?#]*)?)([^?#]*)(\\?([^#]*))?(#(.*))?");
        var matches = url.match(pattern);

        return {
            protocol: matches[2],
            auth: matches[5],
            host: matches[6],
            path: matches[7],
            query: matches[9],
            hash: matches[11]
        };
    }

    var urlParserLite = URL;

    function contains(string, substring) {
      return string.indexOf(substring) !== -1;
    }
    function isAppbase(url) {
      return contains(url, 'scalr.api.appbase.io');
    }
    function btoa(input = '') {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      const str = input;
      let output = '';

      // eslint-disable-next-line
      for (
        let block = 0, charCode, i = 0, map = chars;
        str.charAt(i | 0) || ((map = '='), i % 1); // eslint-disable-line no-bitwise
        output += map.charAt(63 & (block >> (8 - (i % 1) * 8))) // eslint-disable-line no-bitwise
      ) {
        charCode = str.charCodeAt((i += 3 / 4));

        if (charCode > 0xff) {
          throw new Error(
            '"btoa" failed: The string to be encoded contains characters outside of the Latin1 range.',
          );
        }

        block = (block << 8) | charCode; // eslint-disable-line no-bitwise
      }

      return output;
    }
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0; // eslint-disable-line no-bitwise

        const v = c === 'x' ? r : (r & 0x3) | 0x8; // eslint-disable-line no-bitwise
        return v.toString(16);
      });
    }
    function validate(object, fields) {
      const invalid = [];
      const emptyFor = {
        object: null,
        string: '',
      };
      const keys = Object.keys(fields);
      keys.forEach((key) => {
        const type = fields[key];
        // eslint-disable-next-line
        if (typeof object[key] !== type || object[key] === emptyFor[type]) {
          invalid.push(key);
        }
      });
      let missing = '';
      for (let i = 0; i < invalid.length; i += 1) {
        missing += `${invalid[i]}, `;
      }
      if (invalid.length > 0) {
        return new Error(`fields missing: ${missing}`);
      }

      return true;
    }

    function removeUndefined(value) {
      if (value || !(Object.keys(value).length === 0 && value.constructor === Object)) {
        return JSON.parse(JSON.stringify(value));
      }
      return null;
    }

    /**
     * Send only when a connection is opened
     * @param {Object} socket
     * @param {Function} callback
     */
    function waitForSocketConnection(socket, callback) {
      setTimeout(() => {
        if (socket.readyState === 1) {
          if (callback != null) {
            callback();
          }
        } else {
          waitForSocketConnection(socket, callback);
        }
      }, 5); // wait 5 ms for the connection...
    }

    /**
     * Returns an instance of Appbase client
     * @param {Object} config To configure properties
     * @param {String} config.url
     * @param {String} config.app
     * @param {String} config.credentials
     * @param {String} config.username
     * @param {String} config.password
     * A callback function which will be invoked before a fetch request made
     */
    function AppBase(config) {
      const {
     auth = null, host = '', path = '', protocol = '',
    } = urlParserLite(config.url || '');
      let url = host + path;

      // Validate config and throw appropriate error
      if (typeof url !== 'string' || url === '') {
        throw new Error('URL not present in options.');
      }
      if (typeof config.app !== 'string' || config.app === '') {
        throw new Error('App name is not present in options.');
      }
      if (typeof protocol !== 'string' || protocol === '') {
        throw new Error(
          'Protocol is not present in url. URL should be of the form https://scalr.api.appbase.io',
        );
      }
      // Parse url
      if (url.slice(-1) === '/') {
        url = url.slice(0, -1);
      }
      let credentials = auth || null;
      /**
       * Credentials can be provided as a part of the URL,
       * as username, password args or as a credentials argument directly */
      if (typeof config.credentials === 'string' && config.credentials !== '') {
        // eslint-disable-next-line
        credentials = config.credentials;
      } else if (
        typeof config.username === 'string'
        && config.username !== ''
        && typeof config.password === 'string'
        && config.password !== ''
      ) {
        credentials = `${config.username}:${config.password}`;
      }

      if (isAppbase(url) && credentials === null) {
        throw new Error('Authentication information is not present. Did you add credentials?');
      }
      this.url = url;
      this.protocol = protocol;
      this.app = config.app;
      this.credentials = credentials;
      this.headers = {};
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    // Copyright Joyent, Inc. and other Node contributors.

    // If obj.hasOwnProperty has been overridden, then calling
    // obj.hasOwnProperty(prop) will break.
    // See: https://github.com/joyent/node/issues/1707
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    var decode = function(qs, sep, eq, options) {
      sep = sep || '&';
      eq = eq || '=';
      var obj = {};

      if (typeof qs !== 'string' || qs.length === 0) {
        return obj;
      }

      var regexp = /\+/g;
      qs = qs.split(sep);

      var maxKeys = 1000;
      if (options && typeof options.maxKeys === 'number') {
        maxKeys = options.maxKeys;
      }

      var len = qs.length;
      // maxKeys <= 0 means that we should not limit keys count
      if (maxKeys > 0 && len > maxKeys) {
        len = maxKeys;
      }

      for (var i = 0; i < len; ++i) {
        var x = qs[i].replace(regexp, '%20'),
            idx = x.indexOf(eq),
            kstr, vstr, k, v;

        if (idx >= 0) {
          kstr = x.substr(0, idx);
          vstr = x.substr(idx + 1);
        } else {
          kstr = x;
          vstr = '';
        }

        k = decodeURIComponent(kstr);
        v = decodeURIComponent(vstr);

        if (!hasOwnProperty(obj, k)) {
          obj[k] = v;
        } else if (Array.isArray(obj[k])) {
          obj[k].push(v);
        } else {
          obj[k] = [obj[k], v];
        }
      }

      return obj;
    };

    // Copyright Joyent, Inc. and other Node contributors.

    var stringifyPrimitive = function(v) {
      switch (typeof v) {
        case 'string':
          return v;

        case 'boolean':
          return v ? 'true' : 'false';

        case 'number':
          return isFinite(v) ? v : '';

        default:
          return '';
      }
    };

    var encode = function(obj, sep, eq, name) {
      sep = sep || '&';
      eq = eq || '=';
      if (obj === null) {
        obj = undefined;
      }

      if (typeof obj === 'object') {
        return Object.keys(obj).map(function(k) {
          var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
          if (Array.isArray(obj[k])) {
            return obj[k].map(function(v) {
              return ks + encodeURIComponent(stringifyPrimitive(v));
            }).join(sep);
          } else {
            return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
          }
        }).join(sep);

      }

      if (!name) return '';
      return encodeURIComponent(stringifyPrimitive(name)) + eq +
             encodeURIComponent(stringifyPrimitive(obj));
    };

    var querystring = createCommonjsModule(function (module, exports) {

    exports.decode = exports.parse = decode;
    exports.encode = exports.stringify = encode;
    });
    var querystring_1 = querystring.decode;
    var querystring_2 = querystring.parse;
    var querystring_3 = querystring.encode;
    var querystring_4 = querystring.stringify;

    // Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js
    // (MIT licensed)

    const BUFFER = Symbol('buffer');
    const TYPE = Symbol('type');

    class Blob {
    	constructor() {
    		this[TYPE] = '';

    		const blobParts = arguments[0];
    		const options = arguments[1];

    		const buffers = [];

    		if (blobParts) {
    			const a = blobParts;
    			const length = Number(a.length);
    			for (let i = 0; i < length; i++) {
    				const element = a[i];
    				let buffer;
    				if (element instanceof Buffer) {
    					buffer = element;
    				} else if (ArrayBuffer.isView(element)) {
    					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
    				} else if (element instanceof ArrayBuffer) {
    					buffer = Buffer.from(element);
    				} else if (element instanceof Blob) {
    					buffer = element[BUFFER];
    				} else {
    					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
    				}
    				buffers.push(buffer);
    			}
    		}

    		this[BUFFER] = Buffer.concat(buffers);

    		let type = options && options.type !== undefined && String(options.type).toLowerCase();
    		if (type && !/[^\u0020-\u007E]/.test(type)) {
    			this[TYPE] = type;
    		}
    	}
    	get size() {
    		return this[BUFFER].length;
    	}
    	get type() {
    		return this[TYPE];
    	}
    	slice() {
    		const size = this.size;

    		const start = arguments[0];
    		const end = arguments[1];
    		let relativeStart, relativeEnd;
    		if (start === undefined) {
    			relativeStart = 0;
    		} else if (start < 0) {
    			relativeStart = Math.max(size + start, 0);
    		} else {
    			relativeStart = Math.min(start, size);
    		}
    		if (end === undefined) {
    			relativeEnd = size;
    		} else if (end < 0) {
    			relativeEnd = Math.max(size + end, 0);
    		} else {
    			relativeEnd = Math.min(end, size);
    		}
    		const span = Math.max(relativeEnd - relativeStart, 0);

    		const buffer = this[BUFFER];
    		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
    		const blob = new Blob([], { type: arguments[2] });
    		blob[BUFFER] = slicedBuffer;
    		return blob;
    	}
    }

    Object.defineProperties(Blob.prototype, {
    	size: { enumerable: true },
    	type: { enumerable: true },
    	slice: { enumerable: true }
    });

    Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
    	value: 'Blob',
    	writable: false,
    	enumerable: false,
    	configurable: true
    });

    /**
     * fetch-error.js
     *
     * FetchError interface for operational errors
     */

    /**
     * Create FetchError instance
     *
     * @param   String      message      Error message for human
     * @param   String      type         Error type for machine
     * @param   String      systemError  For Node.js system error
     * @return  FetchError
     */
    function FetchError(message, type, systemError) {
      Error.call(this, message);

      this.message = message;
      this.type = type;

      // when err.type is `system`, err.code contains system error code
      if (systemError) {
        this.code = this.errno = systemError.code;
      }

      // hide custom error implementation details from end-users
      Error.captureStackTrace(this, this.constructor);
    }

    FetchError.prototype = Object.create(Error.prototype);
    FetchError.prototype.constructor = FetchError;
    FetchError.prototype.name = 'FetchError';

    /**
     * body.js
     *
     * Body interface provides common methods for Request and Response
     */

    const Stream = require('stream');

    var _require = require('stream');

    const PassThrough = _require.PassThrough;


    let convert;
    try {
    	convert = require('encoding').convert;
    } catch (e) {}

    const INTERNALS = Symbol('Body internals');

    /**
     * Body mixin
     *
     * Ref: https://fetch.spec.whatwg.org/#body
     *
     * @param   Stream  body  Readable stream
     * @param   Object  opts  Response options
     * @return  Void
     */
    function Body(body) {
    	var _this = this;

    	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    	    _ref$size = _ref.size;

    	let size = _ref$size === undefined ? 0 : _ref$size;
    	var _ref$timeout = _ref.timeout;
    	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

    	if (body == null) {
    		// body is undefined or null
    		body = null;
    	} else if (typeof body === 'string') ; else if (isURLSearchParams(body)) ; else if (body instanceof Blob) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') ; else if (body instanceof Stream) ; else {
    		// none of the above
    		// coerce to string
    		body = String(body);
    	}
    	this[INTERNALS] = {
    		body,
    		disturbed: false,
    		error: null
    	};
    	this.size = size;
    	this.timeout = timeout;

    	if (body instanceof Stream) {
    		body.on('error', function (err) {
    			_this[INTERNALS].error = new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
    		});
    	}
    }

    Body.prototype = {
    	get body() {
    		return this[INTERNALS].body;
    	},

    	get bodyUsed() {
    		return this[INTERNALS].disturbed;
    	},

    	/**
      * Decode response as ArrayBuffer
      *
      * @return  Promise
      */
    	arrayBuffer() {
    		return consumeBody.call(this).then(function (buf) {
    			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    		});
    	},

    	/**
      * Return raw response as Blob
      *
      * @return Promise
      */
    	blob() {
    		let ct = this.headers && this.headers.get('content-type') || '';
    		return consumeBody.call(this).then(function (buf) {
    			return Object.assign(
    			// Prevent copying
    			new Blob([], {
    				type: ct.toLowerCase()
    			}), {
    				[BUFFER]: buf
    			});
    		});
    	},

    	/**
      * Decode response as json
      *
      * @return  Promise
      */
    	json() {
    		var _this2 = this;

    		return consumeBody.call(this).then(function (buffer) {
    			try {
    				return JSON.parse(buffer.toString());
    			} catch (err) {
    				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
    			}
    		});
    	},

    	/**
      * Decode response as text
      *
      * @return  Promise
      */
    	text() {
    		return consumeBody.call(this).then(function (buffer) {
    			return buffer.toString();
    		});
    	},

    	/**
      * Decode response as buffer (non-spec api)
      *
      * @return  Promise
      */
    	buffer() {
    		return consumeBody.call(this);
    	},

    	/**
      * Decode response as text, while automatically detecting the encoding and
      * trying to decode to UTF-8 (non-spec api)
      *
      * @return  Promise
      */
    	textConverted() {
    		var _this3 = this;

    		return consumeBody.call(this).then(function (buffer) {
    			return convertBody(buffer, _this3.headers);
    		});
    	}

    };

    // In browsers, all properties are enumerable.
    Object.defineProperties(Body.prototype, {
    	body: { enumerable: true },
    	bodyUsed: { enumerable: true },
    	arrayBuffer: { enumerable: true },
    	blob: { enumerable: true },
    	json: { enumerable: true },
    	text: { enumerable: true }
    });

    Body.mixIn = function (proto) {
    	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
    		// istanbul ignore else: future proof
    		if (!(name in proto)) {
    			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
    			Object.defineProperty(proto, name, desc);
    		}
    	}
    };

    /**
     * Consume and convert an entire Body to a Buffer.
     *
     * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
     *
     * @return  Promise
     */
    function consumeBody() {
    	var _this4 = this;

    	if (this[INTERNALS].disturbed) {
    		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
    	}

    	this[INTERNALS].disturbed = true;

    	if (this[INTERNALS].error) {
    		return Body.Promise.reject(this[INTERNALS].error);
    	}

    	// body is null
    	if (this.body === null) {
    		return Body.Promise.resolve(Buffer.alloc(0));
    	}

    	// body is string
    	if (typeof this.body === 'string') {
    		return Body.Promise.resolve(Buffer.from(this.body));
    	}

    	// body is blob
    	if (this.body instanceof Blob) {
    		return Body.Promise.resolve(this.body[BUFFER]);
    	}

    	// body is buffer
    	if (Buffer.isBuffer(this.body)) {
    		return Body.Promise.resolve(this.body);
    	}

    	// body is buffer
    	if (Object.prototype.toString.call(this.body) === '[object ArrayBuffer]') {
    		return Body.Promise.resolve(Buffer.from(this.body));
    	}

    	// istanbul ignore if: should never happen
    	if (!(this.body instanceof Stream)) {
    		return Body.Promise.resolve(Buffer.alloc(0));
    	}

    	// body is stream
    	// get ready to actually consume the body
    	let accum = [];
    	let accumBytes = 0;
    	let abort = false;

    	return new Body.Promise(function (resolve, reject) {
    		let resTimeout;

    		// allow timeout on slow response body
    		if (_this4.timeout) {
    			resTimeout = setTimeout(function () {
    				abort = true;
    				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
    			}, _this4.timeout);
    		}

    		// handle stream error, such as incorrect content-encoding
    		_this4.body.on('error', function (err) {
    			reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
    		});

    		_this4.body.on('data', function (chunk) {
    			if (abort || chunk === null) {
    				return;
    			}

    			if (_this4.size && accumBytes + chunk.length > _this4.size) {
    				abort = true;
    				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
    				return;
    			}

    			accumBytes += chunk.length;
    			accum.push(chunk);
    		});

    		_this4.body.on('end', function () {
    			if (abort) {
    				return;
    			}

    			clearTimeout(resTimeout);

    			try {
    				resolve(Buffer.concat(accum));
    			} catch (err) {
    				// handle streams that have accumulated too much data (issue #414)
    				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
    			}
    		});
    	});
    }

    /**
     * Detect buffer encoding and convert to target encoding
     * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
     *
     * @param   Buffer  buffer    Incoming buffer
     * @param   String  encoding  Target encoding
     * @return  String
     */
    function convertBody(buffer, headers) {
    	if (typeof convert !== 'function') {
    		throw new Error('The package `encoding` must be installed to use the textConverted() function');
    	}

    	const ct = headers.get('content-type');
    	let charset = 'utf-8';
    	let res, str;

    	// header
    	if (ct) {
    		res = /charset=([^;]*)/i.exec(ct);
    	}

    	// no charset in content type, peek at response body for at most 1024 bytes
    	str = buffer.slice(0, 1024).toString();

    	// html5
    	if (!res && str) {
    		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
    	}

    	// html4
    	if (!res && str) {
    		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

    		if (res) {
    			res = /charset=(.*)/i.exec(res.pop());
    		}
    	}

    	// xml
    	if (!res && str) {
    		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
    	}

    	// found charset
    	if (res) {
    		charset = res.pop();

    		// prevent decode issues when sites use incorrect encoding
    		// ref: https://hsivonen.fi/encoding-menu/
    		if (charset === 'gb2312' || charset === 'gbk') {
    			charset = 'gb18030';
    		}
    	}

    	// turn raw buffers into a single utf-8 buffer
    	return convert(buffer, 'UTF-8', charset).toString();
    }

    /**
     * Detect a URLSearchParams object
     * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
     *
     * @param   Object  obj     Object to detect by type or brand
     * @return  String
     */
    function isURLSearchParams(obj) {
    	// Duck-typing as a necessary condition.
    	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
    		return false;
    	}

    	// Brand-checking and more duck-typing as optional condition.
    	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
    }

    /**
     * Clone body given Res/Req instance
     *
     * @param   Mixed  instance  Response or Request instance
     * @return  Mixed
     */
    function clone(instance) {
    	let p1, p2;
    	let body = instance.body;

    	// don't allow cloning a used body
    	if (instance.bodyUsed) {
    		throw new Error('cannot clone body after it is used');
    	}

    	// check that body is a stream and not form-data object
    	// note: we can't clone the form-data object without having it as a dependency
    	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
    		// tee instance body
    		p1 = new PassThrough();
    		p2 = new PassThrough();
    		body.pipe(p1);
    		body.pipe(p2);
    		// set instance body to teed body and return the other teed body
    		instance[INTERNALS].body = p1;
    		body = p2;
    	}

    	return body;
    }

    /**
     * Performs the operation "extract a `Content-Type` value from |object|" as
     * specified in the specification:
     * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
     *
     * This function assumes that instance.body is present.
     *
     * @param   Mixed  instance  Response or Request instance
     */
    function extractContentType(instance) {
    	const body = instance.body;

    	// istanbul ignore if: Currently, because of a guard in Request, body
    	// can never be null. Included here for completeness.

    	if (body === null) {
    		// body is null
    		return null;
    	} else if (typeof body === 'string') {
    		// body is string
    		return 'text/plain;charset=UTF-8';
    	} else if (isURLSearchParams(body)) {
    		// body is a URLSearchParams
    		return 'application/x-www-form-urlencoded;charset=UTF-8';
    	} else if (body instanceof Blob) {
    		// body is blob
    		return body.type || null;
    	} else if (Buffer.isBuffer(body)) {
    		// body is buffer
    		return null;
    	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
    		// body is array buffer
    		return null;
    	} else if (typeof body.getBoundary === 'function') {
    		// detect form data input from form-data module
    		return `multipart/form-data;boundary=${body.getBoundary()}`;
    	} else {
    		// body is stream
    		// can't really do much about this
    		return null;
    	}
    }

    /**
     * The Fetch Standard treats this as if "total bytes" is a property on the body.
     * For us, we have to explicitly get it with a function.
     *
     * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
     *
     * @param   Body    instance   Instance of Body
     * @return  Number?            Number of bytes, or null if not possible
     */
    function getTotalBytes(instance) {
    	const body = instance.body;

    	// istanbul ignore if: included for completion

    	if (body === null) {
    		// body is null
    		return 0;
    	} else if (typeof body === 'string') {
    		// body is string
    		return Buffer.byteLength(body);
    	} else if (isURLSearchParams(body)) {
    		// body is URLSearchParams
    		return Buffer.byteLength(String(body));
    	} else if (body instanceof Blob) {
    		// body is blob
    		return body.size;
    	} else if (Buffer.isBuffer(body)) {
    		// body is buffer
    		return body.length;
    	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
    		// body is array buffer
    		return body.byteLength;
    	} else if (body && typeof body.getLengthSync === 'function') {
    		// detect form data input from form-data module
    		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
    		body.hasKnownLength && body.hasKnownLength()) {
    			// 2.x
    			return body.getLengthSync();
    		}
    		return null;
    	} else {
    		// body is stream
    		// can't really do much about this
    		return null;
    	}
    }

    /**
     * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
     *
     * @param   Body    instance   Instance of Body
     * @return  Void
     */
    function writeToStream(dest, instance) {
    	const body = instance.body;


    	if (body === null) {
    		// body is null
    		dest.end();
    	} else if (typeof body === 'string') {
    		// body is string
    		dest.write(body);
    		dest.end();
    	} else if (isURLSearchParams(body)) {
    		// body is URLSearchParams
    		dest.write(Buffer.from(String(body)));
    		dest.end();
    	} else if (body instanceof Blob) {
    		// body is blob
    		dest.write(body[BUFFER]);
    		dest.end();
    	} else if (Buffer.isBuffer(body)) {
    		// body is buffer
    		dest.write(body);
    		dest.end();
    	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
    		// body is array buffer
    		dest.write(Buffer.from(body));
    		dest.end();
    	} else {
    		// body is stream
    		body.pipe(dest);
    	}
    }

    // expose Promise
    Body.Promise = global.Promise;

    /**
     * headers.js
     *
     * Headers class offers convenient helpers
     */

    const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
    const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

    function validateName(name) {
    	name = `${name}`;
    	if (invalidTokenRegex.test(name)) {
    		throw new TypeError(`${name} is not a legal HTTP header name`);
    	}
    }

    function validateValue(value) {
    	value = `${value}`;
    	if (invalidHeaderCharRegex.test(value)) {
    		throw new TypeError(`${value} is not a legal HTTP header value`);
    	}
    }

    /**
     * Find the key in the map object given a header name.
     *
     * Returns undefined if not found.
     *
     * @param   String  name  Header name
     * @return  String|Undefined
     */
    function find(map, name) {
    	name = name.toLowerCase();
    	for (const key in map) {
    		if (key.toLowerCase() === name) {
    			return key;
    		}
    	}
    	return undefined;
    }

    const MAP = Symbol('map');
    class Headers {
    	/**
      * Headers class
      *
      * @param   Object  headers  Response headers
      * @return  Void
      */
    	constructor() {
    		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

    		this[MAP] = Object.create(null);

    		if (init instanceof Headers) {
    			const rawHeaders = init.raw();
    			const headerNames = Object.keys(rawHeaders);

    			for (const headerName of headerNames) {
    				for (const value of rawHeaders[headerName]) {
    					this.append(headerName, value);
    				}
    			}

    			return;
    		}

    		// We don't worry about converting prop to ByteString here as append()
    		// will handle it.
    		if (init == null) ; else if (typeof init === 'object') {
    			const method = init[Symbol.iterator];
    			if (method != null) {
    				if (typeof method !== 'function') {
    					throw new TypeError('Header pairs must be iterable');
    				}

    				// sequence<sequence<ByteString>>
    				// Note: per spec we have to first exhaust the lists then process them
    				const pairs = [];
    				for (const pair of init) {
    					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
    						throw new TypeError('Each header pair must be iterable');
    					}
    					pairs.push(Array.from(pair));
    				}

    				for (const pair of pairs) {
    					if (pair.length !== 2) {
    						throw new TypeError('Each header pair must be a name/value tuple');
    					}
    					this.append(pair[0], pair[1]);
    				}
    			} else {
    				// record<ByteString, ByteString>
    				for (const key of Object.keys(init)) {
    					const value = init[key];
    					this.append(key, value);
    				}
    			}
    		} else {
    			throw new TypeError('Provided initializer must be an object');
    		}
    	}

    	/**
      * Return combined header value given name
      *
      * @param   String  name  Header name
      * @return  Mixed
      */
    	get(name) {
    		name = `${name}`;
    		validateName(name);
    		const key = find(this[MAP], name);
    		if (key === undefined) {
    			return null;
    		}

    		return this[MAP][key].join(', ');
    	}

    	/**
      * Iterate over all headers
      *
      * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
      * @param   Boolean   thisArg   `this` context for callback function
      * @return  Void
      */
    	forEach(callback) {
    		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    		let pairs = getHeaders(this);
    		let i = 0;
    		while (i < pairs.length) {
    			var _pairs$i = pairs[i];
    			const name = _pairs$i[0],
    			      value = _pairs$i[1];

    			callback.call(thisArg, value, name, this);
    			pairs = getHeaders(this);
    			i++;
    		}
    	}

    	/**
      * Overwrite header values given name
      *
      * @param   String  name   Header name
      * @param   String  value  Header value
      * @return  Void
      */
    	set(name, value) {
    		name = `${name}`;
    		value = `${value}`;
    		validateName(name);
    		validateValue(value);
    		const key = find(this[MAP], name);
    		this[MAP][key !== undefined ? key : name] = [value];
    	}

    	/**
      * Append a value onto existing header
      *
      * @param   String  name   Header name
      * @param   String  value  Header value
      * @return  Void
      */
    	append(name, value) {
    		name = `${name}`;
    		value = `${value}`;
    		validateName(name);
    		validateValue(value);
    		const key = find(this[MAP], name);
    		if (key !== undefined) {
    			this[MAP][key].push(value);
    		} else {
    			this[MAP][name] = [value];
    		}
    	}

    	/**
      * Check for header name existence
      *
      * @param   String   name  Header name
      * @return  Boolean
      */
    	has(name) {
    		name = `${name}`;
    		validateName(name);
    		return find(this[MAP], name) !== undefined;
    	}

    	/**
      * Delete all header values given name
      *
      * @param   String  name  Header name
      * @return  Void
      */
    	delete(name) {
    		name = `${name}`;
    		validateName(name);
    		const key = find(this[MAP], name);
    		if (key !== undefined) {
    			delete this[MAP][key];
    		}
    	}

    	/**
      * Return raw headers (non-spec api)
      *
      * @return  Object
      */
    	raw() {
    		return this[MAP];
    	}

    	/**
      * Get an iterator on keys.
      *
      * @return  Iterator
      */
    	keys() {
    		return createHeadersIterator(this, 'key');
    	}

    	/**
      * Get an iterator on values.
      *
      * @return  Iterator
      */
    	values() {
    		return createHeadersIterator(this, 'value');
    	}

    	/**
      * Get an iterator on entries.
      *
      * This is the default iterator of the Headers object.
      *
      * @return  Iterator
      */
    	[Symbol.iterator]() {
    		return createHeadersIterator(this, 'key+value');
    	}
    }
    Headers.prototype.entries = Headers.prototype[Symbol.iterator];

    Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
    	value: 'Headers',
    	writable: false,
    	enumerable: false,
    	configurable: true
    });

    Object.defineProperties(Headers.prototype, {
    	get: { enumerable: true },
    	forEach: { enumerable: true },
    	set: { enumerable: true },
    	append: { enumerable: true },
    	has: { enumerable: true },
    	delete: { enumerable: true },
    	keys: { enumerable: true },
    	values: { enumerable: true },
    	entries: { enumerable: true }
    });

    function getHeaders(headers) {
    	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

    	const keys = Object.keys(headers[MAP]).sort();
    	return keys.map(kind === 'key' ? function (k) {
    		return k.toLowerCase();
    	} : kind === 'value' ? function (k) {
    		return headers[MAP][k].join(', ');
    	} : function (k) {
    		return [k.toLowerCase(), headers[MAP][k].join(', ')];
    	});
    }

    const INTERNAL = Symbol('internal');

    function createHeadersIterator(target, kind) {
    	const iterator = Object.create(HeadersIteratorPrototype);
    	iterator[INTERNAL] = {
    		target,
    		kind,
    		index: 0
    	};
    	return iterator;
    }

    const HeadersIteratorPrototype = Object.setPrototypeOf({
    	next() {
    		// istanbul ignore if
    		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
    			throw new TypeError('Value of `this` is not a HeadersIterator');
    		}

    		var _INTERNAL = this[INTERNAL];
    		const target = _INTERNAL.target,
    		      kind = _INTERNAL.kind,
    		      index = _INTERNAL.index;

    		const values = getHeaders(target, kind);
    		const len = values.length;
    		if (index >= len) {
    			return {
    				value: undefined,
    				done: true
    			};
    		}

    		this[INTERNAL].index = index + 1;

    		return {
    			value: values[index],
    			done: false
    		};
    	}
    }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

    Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
    	value: 'HeadersIterator',
    	writable: false,
    	enumerable: false,
    	configurable: true
    });

    /**
     * Export the Headers object in a form that Node.js can consume.
     *
     * @param   Headers  headers
     * @return  Object
     */
    function exportNodeCompatibleHeaders(headers) {
    	const obj = Object.assign({ __proto__: null }, headers[MAP]);

    	// http.request() only supports string as Host header. This hack makes
    	// specifying custom Host header possible.
    	const hostHeaderKey = find(headers[MAP], 'Host');
    	if (hostHeaderKey !== undefined) {
    		obj[hostHeaderKey] = obj[hostHeaderKey][0];
    	}

    	return obj;
    }

    /**
     * Create a Headers object from an object of headers, ignoring those that do
     * not conform to HTTP grammar productions.
     *
     * @param   Object  obj  Object of headers
     * @return  Headers
     */
    function createHeadersLenient(obj) {
    	const headers = new Headers();
    	for (const name of Object.keys(obj)) {
    		if (invalidTokenRegex.test(name)) {
    			continue;
    		}
    		if (Array.isArray(obj[name])) {
    			for (const val of obj[name]) {
    				if (invalidHeaderCharRegex.test(val)) {
    					continue;
    				}
    				if (headers[MAP][name] === undefined) {
    					headers[MAP][name] = [val];
    				} else {
    					headers[MAP][name].push(val);
    				}
    			}
    		} else if (!invalidHeaderCharRegex.test(obj[name])) {
    			headers[MAP][name] = [obj[name]];
    		}
    	}
    	return headers;
    }

    /**
     * response.js
     *
     * Response class provides content decoding
     */

    var _require$1 = require('http');

    const STATUS_CODES = _require$1.STATUS_CODES;


    const INTERNALS$1 = Symbol('Response internals');

    /**
     * Response class
     *
     * @param   Stream  body  Readable stream
     * @param   Object  opts  Response options
     * @return  Void
     */
    class Response {
    	constructor() {
    		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    		Body.call(this, body, opts);

    		const status = opts.status || 200;

    		this[INTERNALS$1] = {
    			url: opts.url,
    			status,
    			statusText: opts.statusText || STATUS_CODES[status],
    			headers: new Headers(opts.headers)
    		};
    	}

    	get url() {
    		return this[INTERNALS$1].url;
    	}

    	get status() {
    		return this[INTERNALS$1].status;
    	}

    	/**
      * Convenience property representing if the request ended normally
      */
    	get ok() {
    		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
    	}

    	get statusText() {
    		return this[INTERNALS$1].statusText;
    	}

    	get headers() {
    		return this[INTERNALS$1].headers;
    	}

    	/**
      * Clone this response
      *
      * @return  Response
      */
    	clone() {
    		return new Response(clone(this), {
    			url: this.url,
    			status: this.status,
    			statusText: this.statusText,
    			headers: this.headers,
    			ok: this.ok
    		});
    	}
    }

    Body.mixIn(Response.prototype);

    Object.defineProperties(Response.prototype, {
    	url: { enumerable: true },
    	status: { enumerable: true },
    	ok: { enumerable: true },
    	statusText: { enumerable: true },
    	headers: { enumerable: true },
    	clone: { enumerable: true }
    });

    Object.defineProperty(Response.prototype, Symbol.toStringTag, {
    	value: 'Response',
    	writable: false,
    	enumerable: false,
    	configurable: true
    });

    /**
     * request.js
     *
     * Request class contains server only options
     *
     * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
     */

    var _require$2 = require('url');

    const format_url = _require$2.format;
    const parse_url = _require$2.parse;


    const INTERNALS$2 = Symbol('Request internals');

    /**
     * Check if a value is an instance of Request.
     *
     * @param   Mixed   input
     * @return  Boolean
     */
    function isRequest(input) {
    	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
    }

    /**
     * Request class
     *
     * @param   Mixed   input  Url or Request instance
     * @param   Object  init   Custom options
     * @return  Void
     */
    class Request {
    	constructor(input) {
    		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    		let parsedURL;

    		// normalize input
    		if (!isRequest(input)) {
    			if (input && input.href) {
    				// in order to support Node.js' Url objects; though WHATWG's URL objects
    				// will fall into this branch also (since their `toString()` will return
    				// `href` property anyway)
    				parsedURL = parse_url(input.href);
    			} else {
    				// coerce input to a string before attempting to parse
    				parsedURL = parse_url(`${input}`);
    			}
    			input = {};
    		} else {
    			parsedURL = parse_url(input.url);
    		}

    		let method = init.method || input.method || 'GET';
    		method = method.toUpperCase();

    		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
    			throw new TypeError('Request with GET/HEAD method cannot have body');
    		}

    		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

    		Body.call(this, inputBody, {
    			timeout: init.timeout || input.timeout || 0,
    			size: init.size || input.size || 0
    		});

    		const headers = new Headers(init.headers || input.headers || {});

    		if (init.body != null) {
    			const contentType = extractContentType(this);
    			if (contentType !== null && !headers.has('Content-Type')) {
    				headers.append('Content-Type', contentType);
    			}
    		}

    		this[INTERNALS$2] = {
    			method,
    			redirect: init.redirect || input.redirect || 'follow',
    			headers,
    			parsedURL
    		};

    		// node-fetch-only options
    		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
    		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
    		this.counter = init.counter || input.counter || 0;
    		this.agent = init.agent || input.agent;
    	}

    	get method() {
    		return this[INTERNALS$2].method;
    	}

    	get url() {
    		return format_url(this[INTERNALS$2].parsedURL);
    	}

    	get headers() {
    		return this[INTERNALS$2].headers;
    	}

    	get redirect() {
    		return this[INTERNALS$2].redirect;
    	}

    	/**
      * Clone this request
      *
      * @return  Request
      */
    	clone() {
    		return new Request(this);
    	}
    }

    Body.mixIn(Request.prototype);

    Object.defineProperty(Request.prototype, Symbol.toStringTag, {
    	value: 'Request',
    	writable: false,
    	enumerable: false,
    	configurable: true
    });

    Object.defineProperties(Request.prototype, {
    	method: { enumerable: true },
    	url: { enumerable: true },
    	headers: { enumerable: true },
    	redirect: { enumerable: true },
    	clone: { enumerable: true }
    });

    /**
     * Convert a Request to Node.js http request options.
     *
     * @param   Request  A Request instance
     * @return  Object   The options object to be passed to http.request
     */
    function getNodeRequestOptions(request) {
    	const parsedURL = request[INTERNALS$2].parsedURL;
    	const headers = new Headers(request[INTERNALS$2].headers);

    	// fetch step 1.3
    	if (!headers.has('Accept')) {
    		headers.set('Accept', '*/*');
    	}

    	// Basic fetch
    	if (!parsedURL.protocol || !parsedURL.hostname) {
    		throw new TypeError('Only absolute URLs are supported');
    	}

    	if (!/^https?:$/.test(parsedURL.protocol)) {
    		throw new TypeError('Only HTTP(S) protocols are supported');
    	}

    	// HTTP-network-or-cache fetch steps 2.4-2.7
    	let contentLengthValue = null;
    	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
    		contentLengthValue = '0';
    	}
    	if (request.body != null) {
    		const totalBytes = getTotalBytes(request);
    		if (typeof totalBytes === 'number') {
    			contentLengthValue = String(totalBytes);
    		}
    	}
    	if (contentLengthValue) {
    		headers.set('Content-Length', contentLengthValue);
    	}

    	// HTTP-network-or-cache fetch step 2.11
    	if (!headers.has('User-Agent')) {
    		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
    	}

    	// HTTP-network-or-cache fetch step 2.15
    	if (request.compress) {
    		headers.set('Accept-Encoding', 'gzip,deflate');
    	}
    	if (!headers.has('Connection') && !request.agent) {
    		headers.set('Connection', 'close');
    	}

    	// HTTP-network fetch step 4.2
    	// chunked encoding is handled by Node.js

    	return Object.assign({}, parsedURL, {
    		method: request.method,
    		headers: exportNodeCompatibleHeaders(headers),
    		agent: request.agent
    	});
    }

    /**
     * index.js
     *
     * a request API compatible with window.fetch
     *
     * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
     */

    const http = require('http');
    const https = require('https');

    var _require$3 = require('stream');

    const PassThrough$1 = _require$3.PassThrough;

    var _require2 = require('url');

    const resolve_url = _require2.resolve;

    const zlib = require('zlib');

    /**
     * Fetch function
     *
     * @param   Mixed    url   Absolute url or Request instance
     * @param   Object   opts  Fetch options
     * @return  Promise
     */
    function fetch(url, opts) {

    	// allow custom promise
    	if (!fetch.Promise) {
    		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
    	}

    	Body.Promise = fetch.Promise;

    	// wrap http.request into fetch
    	return new fetch.Promise(function (resolve, reject) {
    		// build request object
    		const request = new Request(url, opts);
    		const options = getNodeRequestOptions(request);

    		const send = (options.protocol === 'https:' ? https : http).request;

    		// send request
    		const req = send(options);
    		let reqTimeout;

    		function finalize() {
    			req.abort();
    			clearTimeout(reqTimeout);
    		}

    		if (request.timeout) {
    			req.once('socket', function (socket) {
    				reqTimeout = setTimeout(function () {
    					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
    					finalize();
    				}, request.timeout);
    			});
    		}

    		req.on('error', function (err) {
    			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
    			finalize();
    		});

    		req.on('response', function (res) {
    			clearTimeout(reqTimeout);

    			const headers = createHeadersLenient(res.headers);

    			// HTTP fetch step 5
    			if (fetch.isRedirect(res.statusCode)) {
    				// HTTP fetch step 5.2
    				const location = headers.get('Location');

    				// HTTP fetch step 5.3
    				const locationURL = location === null ? null : resolve_url(request.url, location);

    				// HTTP fetch step 5.5
    				switch (request.redirect) {
    					case 'error':
    						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
    						finalize();
    						return;
    					case 'manual':
    						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
    						if (locationURL !== null) {
    							headers.set('Location', locationURL);
    						}
    						break;
    					case 'follow':
    						// HTTP-redirect fetch step 2
    						if (locationURL === null) {
    							break;
    						}

    						// HTTP-redirect fetch step 5
    						if (request.counter >= request.follow) {
    							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
    							finalize();
    							return;
    						}

    						// HTTP-redirect fetch step 6 (counter increment)
    						// Create a new Request object.
    						const requestOpts = {
    							headers: new Headers(request.headers),
    							follow: request.follow,
    							counter: request.counter + 1,
    							agent: request.agent,
    							compress: request.compress,
    							method: request.method,
    							body: request.body
    						};

    						// HTTP-redirect fetch step 9
    						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
    							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
    							finalize();
    							return;
    						}

    						// HTTP-redirect fetch step 11
    						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
    							requestOpts.method = 'GET';
    							requestOpts.body = undefined;
    							requestOpts.headers.delete('content-length');
    						}

    						// HTTP-redirect fetch step 15
    						resolve(fetch(new Request(locationURL, requestOpts)));
    						finalize();
    						return;
    				}
    			}

    			// prepare response
    			let body = res.pipe(new PassThrough$1());
    			const response_options = {
    				url: request.url,
    				status: res.statusCode,
    				statusText: res.statusMessage,
    				headers: headers,
    				size: request.size,
    				timeout: request.timeout
    			};

    			// HTTP-network fetch step 12.1.1.3
    			const codings = headers.get('Content-Encoding');

    			// HTTP-network fetch step 12.1.1.4: handle content codings

    			// in following scenarios we ignore compression support
    			// 1. compression support is disabled
    			// 2. HEAD request
    			// 3. no Content-Encoding header
    			// 4. no content response (204)
    			// 5. content not modified response (304)
    			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
    				resolve(new Response(body, response_options));
    				return;
    			}

    			// For Node v6+
    			// Be less strict when decoding compressed responses, since sometimes
    			// servers send slightly invalid responses that are still accepted
    			// by common browsers.
    			// Always using Z_SYNC_FLUSH is what cURL does.
    			const zlibOptions = {
    				flush: zlib.Z_SYNC_FLUSH,
    				finishFlush: zlib.Z_SYNC_FLUSH
    			};

    			// for gzip
    			if (codings == 'gzip' || codings == 'x-gzip') {
    				body = body.pipe(zlib.createGunzip(zlibOptions));
    				resolve(new Response(body, response_options));
    				return;
    			}

    			// for deflate
    			if (codings == 'deflate' || codings == 'x-deflate') {
    				// handle the infamous raw deflate response from old servers
    				// a hack for old IIS and Apache servers
    				const raw = res.pipe(new PassThrough$1());
    				raw.once('data', function (chunk) {
    					// see http://stackoverflow.com/questions/37519828
    					if ((chunk[0] & 0x0F) === 0x08) {
    						body = body.pipe(zlib.createInflate());
    					} else {
    						body = body.pipe(zlib.createInflateRaw());
    					}
    					resolve(new Response(body, response_options));
    				});
    				return;
    			}

    			// otherwise, use response as-is
    			resolve(new Response(body, response_options));
    		});

    		writeToStream(req, request);
    	});
    }

    /**
     * Redirect code matching
     *
     * @param   Number   code  Status code
     * @return  Boolean
     */
    fetch.isRedirect = function (code) {
    	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
    };

    // Needed for TypeScript.
    fetch.default = fetch;

    // expose Promise
    fetch.Promise = global.Promise;

    var index_es = /*#__PURE__*/Object.freeze({
        default: fetch,
        Headers: Headers,
        Request: Request,
        Response: Response,
        FetchError: FetchError
    });

    var nodeFetch = ( index_es && fetch ) || index_es;

    var nodePonyfill = createCommonjsModule(function (module, exports) {
    var realFetch = nodeFetch.default || nodeFetch;

    var fetch = function (url, options) {
      // Support schemaless URIs on the server for parity with the browser.
      // Ex: //github.com/ -> https://github.com/
      if (/^\/\//.test(url)) {
        url = 'https:' + url;
      }
      return realFetch.call(this, url, options);
    };

    fetch.polyfill = false;

    module.exports = exports = fetch;
    exports.fetch = fetch;
    exports.Headers = nodeFetch.Headers;
    exports.Request = nodeFetch.Request;
    exports.Response = nodeFetch.Response;

    // Needed for TypeScript.
    exports.default = fetch;
    });
    var nodePonyfill_1 = nodePonyfill.fetch;
    var nodePonyfill_2 = nodePonyfill.Headers;
    var nodePonyfill_3 = nodePonyfill.Request;
    var nodePonyfill_4 = nodePonyfill.Response;

    /**
     * To perform fetch request
     * @param {Object} args
     * @param {String} args.method
     * @param {String} args.path
     * @param {Object} args.params
     * @param {Object} args.body
     */
    function fetchRequest(args) {
      return new Promise((resolve, reject) => {
        const parsedArgs = removeUndefined(args);
        try {
          const {
     method, path, params, body,
    } = parsedArgs;
          let bodyCopy = body;
          const contentType = path.endsWith('msearch') || path.endsWith('bulk')
              ? 'application/x-ndjson'
              : 'application/json';
          const headers = Object.assign(
            {},
            {
              Accept: 'application/json',
              'Content-Type': contentType,
            },
            this.headers,
          );
          const timestamp = Date.now();
          if (this.credentials) {
            headers.Authorization = `Basic ${btoa(this.credentials)}`;
          }
          const requestOptions = {
            method,
            headers,
          };
          if (Array.isArray(bodyCopy)) {
            let arrayBody = '';
            bodyCopy.forEach((item) => {
              arrayBody += JSON.stringify(item);
              arrayBody += '\n';
            });

            bodyCopy = arrayBody;
          } else {
            bodyCopy = JSON.stringify(bodyCopy) || {};
          }

          if (Object.keys(bodyCopy).length !== 0) {
            requestOptions.body = bodyCopy;
          }

          let finalRequest = requestOptions;
          if (this.transformRequest) {
            finalRequest = this.transformRequest(requestOptions);
          }
          let responseHeaders = {};
          return nodePonyfill(
            `${this.protocol}://${this.url}/${this.app}/${path}?${querystring.stringify(params)}`,
            finalRequest,
          ).then((res) => {
            if (res.status >= 500) {
              return reject(res);
            }
            responseHeaders = res.headers;
            return res.json().then((data) => {
              if (res.status >= 400) {
                return reject(res);
              }
              const response = Object.assign({}, data, {
                _timestamp: timestamp,
                _headers: responseHeaders,
              });
              return resolve(response);
            });
          });
        } catch (e) {
          return reject(e);
        }
      });
    }

    const WebSocket = typeof window !== 'undefined' ? window.WebSocket : require('ws');

    /**
     * To connect a web socket
     * @param {Object} args
     * @param {String} args.method
     * @param {String} args.path
     * @param {Object} args.params
     * @param {Object} args.body
     */
    function wsRequest(args, onData, onError, onClose) {
      try {
        const parsedArgs = removeUndefined(args);
        const { method, path, params } = parsedArgs;
        let bodyCopy = args.body;
        if (!bodyCopy || typeof bodyCopy !== 'object') {
          bodyCopy = {};
        }
        const init = () => {
          this.ws = new WebSocket(`wss://${this.url}/${this.app}`);
          this.id = uuidv4();

          this.request = {
            id: this.id,
            path: `${this.app}/${path}?${querystring.stringify(params)}`,
            method,
            body: bodyCopy,
          };
          if (this.credentials) {
            this.request.authorization = `Basic ${btoa(this.credentials)}`;
          }
          this.result = {};
          this.closeHandler = () => {
            this.wsClosed();
          };
          this.errorHandler = (err) => {
            this.processError(...[err]);
          };
          this.messageHandler = (message) => {
            const dataObj = JSON.parse(message.data);
            if (dataObj.body && dataObj.body.status >= 400) {
              this.processError(...[dataObj]);
            } else {
              this.processMessage(...[dataObj]);
            }
          };
          this.send = (request) => {
            waitForSocketConnection(this.ws, () => {
              try {
                this.ws.send(JSON.stringify(request));
              } catch (e) {
                console.warn(e);
              }
            });
          };
          this.ws.onmessage = this.messageHandler;
          this.ws.onerror = this.errorHandler;
          this.ws.onclose = this.closeHandler;
          this.send(this.request);
          this.result.stop = this.stop;
          this.result.reconnect = this.reconnect;

          return this.result;
        };
        this.wsClosed = () => {
          if (onClose) {
            onClose();
          }
        };
        this.stop = () => {
          this.ws.onmessage = undefined;
          this.ws.onclose = undefined;
          this.ws.onerror = undefined;
          this.wsClosed();
          const unsubRequest = JSON.parse(JSON.stringify(this.request));
          unsubRequest.unsubscribe = true;

          if (this.unsubscribed !== true) {
            this.send(unsubRequest);
          }

          this.unsubscribed = true;
        };
        this.reconnect = () => {
          this.stop();
          return wsRequest(args, onData, onError, onClose);
        };
        this.processError = (err) => {
          if (onError) {
            onError(err);
          } else {
            console.warn(err);
          }
        };

        this.processMessage = (origDataObj) => {
          const dataObj = JSON.parse(JSON.stringify(origDataObj));
          if (!dataObj.id && dataObj.message) {
            if (onError) {
              onError(dataObj);
            }
            return;
          }

          if (dataObj.id === this.id) {
            if (dataObj.message) {
              delete dataObj.id;
              if (onError) {
                onError(dataObj);
              }
              return;
            }

            if (dataObj.query_id) {
              this.query_id = dataObj.query_id;
            }

            if (dataObj.channel) {
              this.channel = dataObj.channel;
            }

            if (dataObj.body && dataObj.body !== '') {
              if (onData) {
                onData(dataObj.body);
              }
            }

            return;
          }

          if (!dataObj.id && dataObj.channel && dataObj.channel === this.channel) {
            if (onData) {
              onData(dataObj.event);
            }
          }
        };
        return init();
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          console.warn(e);
        }
        return null;
      }
    }

    /**
     * Index Service
     * @param {Object} args
     * @param {String} args.type
     * @param {Object} args.body
     * @param {String} args.id
     */
    function indexApi(args) {
      const parsedArgs = removeUndefined(args);
      // Validate arguments
      const valid = validate(parsedArgs, {
        type: 'string',
        body: 'object',
      });
      if (valid !== true) {
        throw valid;
      }
      const { type, id, body } = parsedArgs;

      delete parsedArgs.type;
      delete parsedArgs.body;
      delete parsedArgs.id;

      let path;
      if (id) {
        path = `${type}/${encodeURIComponent(id)}`;
      } else {
        path = type;
      }
      return this.performFetchRequest({
        method: 'POST',
        path,
        params: parsedArgs,
        body,
      });
    }

    /**
     * Get Service
     * @param {Object} args
     * @param {String} args.type
     * @param {String} args.id
     */
    function getApi(args) {
      const parsedArgs = removeUndefined(args);
      // Validate arguments
      const valid = validate(parsedArgs, {
        type: 'string',
        id: 'string',
      });

      if (valid !== true) {
        throw valid;
      }

      const { type, id } = parsedArgs;

      delete parsedArgs.type;
      delete parsedArgs.id;

      const path = `${type}/${encodeURIComponent(id)}`;

      return this.performFetchRequest({
        method: 'GET',
        path,
        params: parsedArgs,
      });
    }

    /**
     * Update Service
     * @param {Object} args
     * @param {String} args.type
     * @param {Object} args.body
     * @param {String} args.id
     */
    function updateApi(args) {
      const parsedArgs = removeUndefined(args);
      // Validate arguments
      const valid = validate(parsedArgs, {
        type: 'string',
        id: 'string',
        body: 'object',
      });
      if (valid !== true) {
        throw valid;
      }

      const { type, id, body } = parsedArgs;
      delete parsedArgs.type;
      delete parsedArgs.id;
      delete parsedArgs.body;
      const path = `${type}/${encodeURIComponent(id)}/_update`;

      return this.performFetchRequest({
        method: 'POST',
        path,
        params: parsedArgs,
        body,
      });
    }

    /**
     * Delete Service
     * @param {Object} args
     * @param {String} args.type
     * @param {String} args.id
     */
    function deleteApi(args) {
      const parsedArgs = removeUndefined(args);
      // Validate arguments
      const valid = validate(parsedArgs, {
        type: 'string',
        id: 'string',
      });
      if (valid !== true) {
        throw valid;
      }

      const { type, id } = parsedArgs;
      delete parsedArgs.type;
      delete parsedArgs.id;

      const path = `${type}/${encodeURIComponent(id)}`;

      return this.performFetchRequest({
        method: 'DELETE',
        path,
        params: parsedArgs,
      });
    }

    /**
     * Bulk Service
     * @param {Object} args
     * @param {String} args.type
     * @param {Object} args.body
     */
    function bulkApi(args) {
      const parsedArgs = removeUndefined(args);
      // Validate arguments
      const valid = validate(parsedArgs, {
        body: 'object',
      });
      if (valid !== true) {
        throw valid;
      }

      const { type, body } = parsedArgs;

      delete parsedArgs.type;
      delete parsedArgs.body;

      let path;
      if (type) {
        path = `${type}/_bulk`;
      } else {
        path = '/_bulk';
      }

      return this.performFetchRequest({
        method: 'POST',
        path,
        params: parsedArgs,
        body,
      });
    }

    /**
     * Search Service
     * @param {Object} args
     * @param {String} args.type
     * @param {Object} args.body
     */
    function searchApi(args) {
      const parsedArgs = removeUndefined(args);
      // Validate arguments
      const valid = validate(parsedArgs, {
        body: 'object',
      });
      if (valid !== true) {
        throw valid;
      }

      let type;
      if (Array.isArray(parsedArgs.type)) {
        type = parsedArgs.type.join();
      } else {
        // eslint-disable-next-line
        type = parsedArgs.type;
      }

      const { body } = parsedArgs;

      delete parsedArgs.type;
      delete parsedArgs.body;

      let path;
      if (type) {
        path = `${type}/_search`;
      } else {
        path = '_search';
      }

      return this.performFetchRequest({
        method: 'POST',
        path,
        params: parsedArgs,
        body,
      });
    }

    /**
     * Msearch Service
     * @param {Object} args
     * @param {String} args.type
     * @param {Object} args.body
     */
    function msearchApi(args) {
      const parsedArgs = removeUndefined(args);
      // Validate arguments
      const valid = validate(parsedArgs, {
        body: 'object',
      });
      if (valid !== true) {
        throw valid;
      }

      let type;
      if (Array.isArray(parsedArgs.type)) {
        type = parsedArgs.type.join();
      } else {
        ({ type } = parsedArgs);
      }

      const { body } = parsedArgs;

      delete parsedArgs.type;
      delete parsedArgs.body;

      let path;
      if (type) {
        path = `${type}/_msearch`;
      } else {
        path = '_msearch';
      }

      return this.performFetchRequest({
        method: 'POST',
        path,
        params: parsedArgs,
        body,
      });
    }

    /**
     * Stream Service
     * @param {Object} args
     * @param {String} args.type
     * @param {Boolean} args.stream
     * @param {String} args.id
     * @param {Function} onData
     * @param {Function} onError
     * @param {Function} onClose
     */
    function getStream(args, ...rest) {
      const parsedArgs = removeUndefined(args);
      // Validate arguments
      const valid = validate(parsedArgs, {
        type: 'string',
        id: 'string',
      });
      if (valid !== true) {
        throw valid;
      }

      const { type, id } = parsedArgs;

      delete parsedArgs.type;
      delete parsedArgs.id;
      delete parsedArgs.stream;

      if (parsedArgs.stream === true) {
        parsedArgs.stream = 'true';
      } else {
        delete parsedArgs.stream;
        parsedArgs.streamonly = 'true';
      }

      return this.performWsRequest(
        {
          method: 'GET',
          path: `${type}/${encodeURIComponent(id)}`,
          params: parsedArgs,
        },
        ...rest,
      );
    }

    /**
     * Search Stream
     * @param {Object} args
     * @param {String} args.type
     * @param {Object} args.body
     * @param {Boolean} args.stream
     * @param {Function} onData
     * @param {Function} onError
     * @param {Function} onClose
     */
    function searchStreamApi(args, ...rest) {
      const parsedArgs = removeUndefined(args);
      // Validate arguments
      const valid = validate(parsedArgs, {
        body: 'object',
      });
      if (valid !== true) {
        throw valid;
      }

      if (
        parsedArgs.type === undefined
        || (Array.isArray(parsedArgs.type) && parsedArgs.type.length === 0)
      ) {
        throw new Error('Missing fields: type');
      }

      let type;
      if (Array.isArray(parsedArgs.type)) {
        type = parsedArgs.type.join();
      } else {
        ({ type } = parsedArgs);
      }

      const { body } = parsedArgs;
      delete parsedArgs.type;
      delete parsedArgs.body;
      delete parsedArgs.stream;

      parsedArgs.streamonly = 'true';

      return this.performWsRequest(
        {
          method: 'POST',
          path: `${type}/_search`,
          params: parsedArgs,
          body,
        },
        ...rest,
      );
    }

    var at, // The index of the current character
        ch, // The current character
        escapee = {
            '"':  '"',
            '\\': '\\',
            '/':  '/',
            b:    '\b',
            f:    '\f',
            n:    '\n',
            r:    '\r',
            t:    '\t'
        },
        text,

        error = function (m) {
            // Call error when something is wrong.
            throw {
                name:    'SyntaxError',
                message: m,
                at:      at,
                text:    text
            };
        },
        
        next = function (c) {
            // If a c parameter is provided, verify that it matches the current character.
            if (c && c !== ch) {
                error("Expected '" + c + "' instead of '" + ch + "'");
            }
            
            // Get the next character. When there are no more characters,
            // return the empty string.
            
            ch = text.charAt(at);
            at += 1;
            return ch;
        },
        
        number = function () {
            // Parse a number value.
            var number,
                string = '';
            
            if (ch === '-') {
                string = '-';
                next('-');
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
            if (ch === '.') {
                string += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    string += ch;
                }
            }
            if (ch === 'e' || ch === 'E') {
                string += ch;
                next();
                if (ch === '-' || ch === '+') {
                    string += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    string += ch;
                    next();
                }
            }
            number = +string;
            if (!isFinite(number)) {
                error("Bad number");
            } else {
                return number;
            }
        },
        
        string = function () {
            // Parse a string value.
            var hex,
                i,
                string = '',
                uffff;
            
            // When parsing for string values, we must look for " and \ characters.
            if (ch === '"') {
                while (next()) {
                    if (ch === '"') {
                        next();
                        return string;
                    } else if (ch === '\\') {
                        next();
                        if (ch === 'u') {
                            uffff = 0;
                            for (i = 0; i < 4; i += 1) {
                                hex = parseInt(next(), 16);
                                if (!isFinite(hex)) {
                                    break;
                                }
                                uffff = uffff * 16 + hex;
                            }
                            string += String.fromCharCode(uffff);
                        } else if (typeof escapee[ch] === 'string') {
                            string += escapee[ch];
                        } else {
                            break;
                        }
                    } else {
                        string += ch;
                    }
                }
            }
            error("Bad string");
        },

        white = function () {

    // Skip whitespace.

            while (ch && ch <= ' ') {
                next();
            }
        },

        word = function () {

    // true, false, or null.

            switch (ch) {
            case 't':
                next('t');
                next('r');
                next('u');
                next('e');
                return true;
            case 'f':
                next('f');
                next('a');
                next('l');
                next('s');
                next('e');
                return false;
            case 'n':
                next('n');
                next('u');
                next('l');
                next('l');
                return null;
            }
            error("Unexpected '" + ch + "'");
        },

        value,  // Place holder for the value function.

        array = function () {

    // Parse an array value.

            var array = [];

            if (ch === '[') {
                next('[');
                white();
                if (ch === ']') {
                    next(']');
                    return array;   // empty array
                }
                while (ch) {
                    array.push(value());
                    white();
                    if (ch === ']') {
                        next(']');
                        return array;
                    }
                    next(',');
                    white();
                }
            }
            error("Bad array");
        },

        object = function () {

    // Parse an object value.

            var key,
                object = {};

            if (ch === '{') {
                next('{');
                white();
                if (ch === '}') {
                    next('}');
                    return object;   // empty object
                }
                while (ch) {
                    key = string();
                    white();
                    next(':');
                    if (Object.hasOwnProperty.call(object, key)) {
                        error('Duplicate key "' + key + '"');
                    }
                    object[key] = value();
                    white();
                    if (ch === '}') {
                        next('}');
                        return object;
                    }
                    next(',');
                    white();
                }
            }
            error("Bad object");
        };

    value = function () {

    // Parse a JSON value. It could be an object, an array, a string, a number,
    // or a word.

        white();
        switch (ch) {
        case '{':
            return object();
        case '[':
            return array();
        case '"':
            return string();
        case '-':
            return number();
        default:
            return ch >= '0' && ch <= '9' ? number() : word();
        }
    };

    // Return the json_parse function. It will have access to all of the above
    // functions and variables.

    var parse = function (source, reviver) {
        var result;
        
        text = source;
        at = 0;
        ch = ' ';
        result = value();
        white();
        if (ch) {
            error("Syntax error");
        }

        // If there is a reviver function, we recursively walk the new structure,
        // passing each name/value pair to the reviver function for possible
        // transformation, starting with a temporary root object that holds the result
        // in an empty key. If there is not a reviver function, we simply return the
        // result.

        return typeof reviver === 'function' ? (function walk(holder, key) {
            var k, v, value = holder[key];
            if (value && typeof value === 'object') {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = walk(value, k);
                        if (v !== undefined) {
                            value[k] = v;
                        } else {
                            delete value[k];
                        }
                    }
                }
            }
            return reviver.call(holder, key, value);
        }({'': result}, '')) : result;
    };

    var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;

    function quote(string) {
        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.
        
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        // Produce a string from holder[key].
        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];
        
        // If the value has a toJSON method, call it to obtain a replacement value.
        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        
        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        
        // What happens next depends on the value's type.
        switch (typeof value) {
            case 'string':
                return quote(value);
            
            case 'number':
                // JSON numbers must be finite. Encode non-finite numbers as null.
                return isFinite(value) ? String(value) : 'null';
            
            case 'boolean':
            case 'null':
                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce 'null'. The case is included here in
                // the remote chance that this gets fixed someday.
                return String(value);
                
            case 'object':
                if (!value) return 'null';
                gap += indent;
                partial = [];
                
                // Array.isArray
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    
                    // Join all of the elements together, separated with commas, and
                    // wrap them in brackets.
                    v = partial.length === 0 ? '[]' : gap ?
                        '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                        '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                
                // If the replacer is an array, use it to select the members to be
                // stringified.
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                else {
                    // Otherwise, iterate through all of the keys in the object.
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                
            // Join all of the member texts together, separated with commas,
            // and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

    var stringify = function (value, replacer, space) {
        var i;
        gap = '';
        indent = '';
        
        // If the space parameter is a number, make an indent string containing that
        // many spaces.
        if (typeof space === 'number') {
            for (i = 0; i < space; i += 1) {
                indent += ' ';
            }
        }
        // If the space parameter is a string, it will be used as the indent string.
        else if (typeof space === 'string') {
            indent = space;
        }

        // If there is a replacer, it must be a function or an array.
        // Otherwise, throw an error.
        rep = replacer;
        if (replacer && typeof replacer !== 'function'
        && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
            throw new Error('JSON.stringify');
        }
        
        // Make a fake root object containing our value under the key of ''.
        // Return the result of stringifying the value.
        return str('', {'': value});
    };

    var parse$1 = parse;
    var stringify$1 = stringify;

    var jsonify = {
    	parse: parse$1,
    	stringify: stringify$1
    };

    var json = typeof JSON !== 'undefined' ? JSON : jsonify;

    var jsonStableStringify = function (obj, opts) {
        if (!opts) opts = {};
        if (typeof opts === 'function') opts = { cmp: opts };
        var space = opts.space || '';
        if (typeof space === 'number') space = Array(space+1).join(' ');
        var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;
        var replacer = opts.replacer || function(key, value) { return value; };

        var cmp = opts.cmp && (function (f) {
            return function (node) {
                return function (a, b) {
                    var aobj = { key: a, value: node[a] };
                    var bobj = { key: b, value: node[b] };
                    return f(aobj, bobj);
                };
            };
        })(opts.cmp);

        var seen = [];
        return (function stringify (parent, key, node, level) {
            var indent = space ? ('\n' + new Array(level + 1).join(space)) : '';
            var colonSeparator = space ? ': ' : ':';

            if (node && node.toJSON && typeof node.toJSON === 'function') {
                node = node.toJSON();
            }

            node = replacer.call(parent, key, node);

            if (node === undefined) {
                return;
            }
            if (typeof node !== 'object' || node === null) {
                return json.stringify(node);
            }
            if (isArray(node)) {
                var out = [];
                for (var i = 0; i < node.length; i++) {
                    var item = stringify(node, i, node[i], level+1) || json.stringify(null);
                    out.push(indent + space + item);
                }
                return '[' + out.join(',') + indent + ']';
            }
            else {
                if (seen.indexOf(node) !== -1) {
                    if (cycles) return json.stringify('__cycle__');
                    throw new TypeError('Converting circular structure to JSON');
                }
                else seen.push(node);

                var keys = objectKeys(node).sort(cmp && cmp(node));
                var out = [];
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var value = stringify(node, key, node[key], level+1);

                    if(!value) continue;

                    var keyValue = json.stringify(key)
                        + colonSeparator
                        + value;
                    out.push(indent + space + keyValue);
                }
                seen.splice(seen.indexOf(node), 1);
                return '{' + out.join(',') + indent + '}';
            }
        })({ '': obj }, '', obj, 0);
    };

    var isArray = Array.isArray || function (x) {
        return {}.toString.call(x) === '[object Array]';
    };

    var objectKeys = Object.keys || function (obj) {
        var has = Object.prototype.hasOwnProperty || function () { return true };
        var keys = [];
        for (var key in obj) {
            if (has.call(obj, key)) keys.push(key);
        }
        return keys;
    };

    /**
     * Webhook Service
     * @param {Object} args
     * @param {String} args.type
     * @param {Object} args.body
     * @param {Object} webhook
     * @param {Function} onData
     * @param {Function} onError
     * @param {Function} onClose
     */
    function searchStreamToURLApi(args, webhook, ...rest) {
      const parsedArgs = removeUndefined(args);
      let bodyCopy = parsedArgs.body;
      let type;
      let typeString;
      // Validate arguments
      let valid = validate(parsedArgs, {
        body: 'object',
      });
      if (valid !== true) {
        throw valid;
      }

      if (
        parsedArgs.type === undefined
        || !(typeof parsedArgs.type === 'string' || Array.isArray(parsedArgs.type))
        || (parsedArgs.type === '' || parsedArgs.type.length === 0)
      ) {
        throw new Error('fields missing: type');
      }

      valid = validate(parsedArgs.body, {
        query: 'object',
      });
      if (valid !== true) {
        throw valid;
      }

      if (Array.isArray(parsedArgs.type)) {
        ({ type } = parsedArgs);
        typeString = parsedArgs.type.join();
      } else {
        type = [parsedArgs.type];
        typeString = parsedArgs.type;
      }

      let webhooks = [];
      const { query } = bodyCopy;

      if (typeof webhook === 'string') {
        const webHookObj = {};
        webHookObj.url = webhook;
        webHookObj.method = 'GET';
        webhooks.push(webHookObj);
      } else if (webhook.constructor === Array) {
        webhooks = webhook;
      } else if (webhook === Object(webhook)) {
        webhooks.push(webhook);
      } else {
        throw new Error('fields missing: second argument(webhook) is necessary');
      }

      const populateBody = () => {
        bodyCopy = {};
        bodyCopy.webhooks = webhooks;
        bodyCopy.query = query;
        bodyCopy.type = type;
      };

      populateBody();

      const encode64 = btoa(jsonStableStringify(query));
      const path = `.percolator/webhooks-0-${typeString}-0-${encode64}`;

      this.change = () => {
        webhooks = [];

        if (typeof parsedArgs === 'string') {
          const webhook2 = {};
          webhook2.url = parsedArgs;
          webhook2.method = 'POST';
          webhooks.push(webhook2);
        } else if (parsedArgs.constructor === Array) {
          webhooks = parsedArgs;
        } else if (parsedArgs === Object(parsedArgs)) {
          webhooks.push(parsedArgs);
        } else {
          throw new Error('fields missing: one of webhook or url fields is required');
        }

        populateBody();

        return this.performRequest('POST');
      };
      this.stop = () => {
        bodyCopy = undefined;
        return this.performRequest('DELETE');
      };
      this.performRequest = (method) => {
        const res = this.performWsRequest(
          {
            method,
            path,
            body: bodyCopy,
          },
          ...rest,
        );

        res.change = this.change;
        res.stop = this.stop;

        return res;
      };
      return this.performRequest('POST');
    }

    /**
     * To get types
     */
    function getTypesService() {
      return new Promise((resolve, reject) => {
        try {
          return this.performFetchRequest({
            method: 'GET',
            path: '_mapping',
          }).then((data) => {
            const types = Object.keys(data[this.app].mappings).filter(type => type !== '_default_');
            return resolve(types);
          });
        } catch (e) {
          return reject(e);
        }
      });
    }

    /**
     * To get mappings
     */
    function getMappings() {
      return this.performFetchRequest({
        method: 'GET',
        path: '_mapping',
      });
    }

    function index (config) {
      const client = new AppBase(config);

      AppBase.prototype.performFetchRequest = fetchRequest;

      AppBase.prototype.performWsRequest = wsRequest;

      AppBase.prototype.index = indexApi;

      AppBase.prototype.get = getApi;

      AppBase.prototype.update = updateApi;

      AppBase.prototype.delete = deleteApi;

      AppBase.prototype.bulk = bulkApi;

      AppBase.prototype.search = searchApi;

      AppBase.prototype.msearch = msearchApi;

      AppBase.prototype.getStream = getStream;

      AppBase.prototype.searchStream = searchStreamApi;

      AppBase.prototype.searchStreamToURL = searchStreamToURLApi;

      AppBase.prototype.getTypes = getTypesService;

      AppBase.prototype.getMappings = getMappings;

      AppBase.prototype.setHeaders = function (headers) {
        this.headers = headers;
      };

      if (typeof window !== 'undefined') {
        window.Appbase = client;
      }
      return client;
    }

    return index;

})));
//# sourceMappingURL=appbase-js.umd.js.map
