(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Appbase = factory());
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

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function contains(string, substring) {
      return string.indexOf(substring) !== -1;
    }
    function isAppbase(url) {
      return contains(url, 'scalr.api.appbase.io');
    }
    function btoa() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var str = input;
      var output = '';

      // eslint-disable-next-line
      for (var block = 0, charCode, i = 0, map = chars; str.charAt(i | 0) || (map = '=', i % 1); // eslint-disable-line no-bitwise
      output += map.charAt(63 & block >> 8 - i % 1 * 8) // eslint-disable-line no-bitwise
      ) {
        charCode = str.charCodeAt(i += 3 / 4);

        if (charCode > 0xff) {
          throw new Error('"btoa" failed: The string to be encoded contains characters outside of the Latin1 range.');
        }

        block = block << 8 | charCode; // eslint-disable-line no-bitwise
      }

      return output;
    }
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0; // eslint-disable-line no-bitwise

        var v = c === 'x' ? r : r & 0x3 | 0x8; // eslint-disable-line no-bitwise
        return v.toString(16);
      });
    }
    function validate(object, fields) {
      var invalid = [];
      var emptyFor = {
        object: null,
        string: ''
      };
      var keys = Object.keys(fields);
      keys.forEach(function (key) {
        var type = fields[key];
        // eslint-disable-next-line
        if (_typeof(object[key]) !== type || object[key] === emptyFor[type]) {
          invalid.push(key);
        }
      });
      var missing = '';
      for (var i = 0; i < invalid.length; i += 1) {
        missing += invalid[i] + ', ';
      }
      if (invalid.length > 0) {
        return new Error('fields missing: ' + missing);
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
      setTimeout(function () {
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
      var _URL = urlParserLite(config.url || ''),
          _URL$auth = _URL.auth,
          auth = _URL$auth === undefined ? null : _URL$auth,
          _URL$host = _URL.host,
          host = _URL$host === undefined ? '' : _URL$host,
          _URL$path = _URL.path,
          path = _URL$path === undefined ? '' : _URL$path,
          _URL$protocol = _URL.protocol,
          protocol = _URL$protocol === undefined ? '' : _URL$protocol;

      var url = host + path;

      // Validate config and throw appropriate error
      if (typeof url !== 'string' || url === '') {
        throw new Error('URL not present in options.');
      }
      if (typeof config.app !== 'string' || config.app === '') {
        throw new Error('App name is not present in options.');
      }
      if (typeof protocol !== 'string' || protocol === '') {
        throw new Error('Protocol is not present in url. URL should be of the form https://scalr.api.appbase.io');
      }
      // Parse url
      if (url.slice(-1) === '/') {
        url = url.slice(0, -1);
      }
      var credentials = auth || null;
      /**
       * Credentials can be provided as a part of the URL,
       * as username, password args or as a credentials argument directly */
      if (typeof config.credentials === 'string' && config.credentials !== '') {
        // eslint-disable-next-line
        credentials = config.credentials;
      } else if (typeof config.username === 'string' && config.username !== '' && typeof config.password === 'string' && config.password !== '') {
        credentials = config.username + ':' + config.password;
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

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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

    var browserPonyfill = createCommonjsModule(function (module) {
    var __root__ = (function (root) {
    function F() { this.fetch = false; }
    F.prototype = root;
    return new F();
    })(typeof self !== 'undefined' ? self : commonjsGlobal);
    (function(self) {

    (function(self) {

      if (self.fetch) {
        return
      }

      var support = {
        searchParams: 'URLSearchParams' in self,
        iterable: 'Symbol' in self && 'iterator' in Symbol,
        blob: 'FileReader' in self && 'Blob' in self && (function() {
          try {
            new Blob();
            return true
          } catch(e) {
            return false
          }
        })(),
        formData: 'FormData' in self,
        arrayBuffer: 'ArrayBuffer' in self
      };

      if (support.arrayBuffer) {
        var viewClasses = [
          '[object Int8Array]',
          '[object Uint8Array]',
          '[object Uint8ClampedArray]',
          '[object Int16Array]',
          '[object Uint16Array]',
          '[object Int32Array]',
          '[object Uint32Array]',
          '[object Float32Array]',
          '[object Float64Array]'
        ];

        var isDataView = function(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj)
        };

        var isArrayBufferView = ArrayBuffer.isView || function(obj) {
          return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
        };
      }

      function normalizeName(name) {
        if (typeof name !== 'string') {
          name = String(name);
        }
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
          throw new TypeError('Invalid character in header field name')
        }
        return name.toLowerCase()
      }

      function normalizeValue(value) {
        if (typeof value !== 'string') {
          value = String(value);
        }
        return value
      }

      // Build a destructive iterator for the value list
      function iteratorFor(items) {
        var iterator = {
          next: function() {
            var value = items.shift();
            return {done: value === undefined, value: value}
          }
        };

        if (support.iterable) {
          iterator[Symbol.iterator] = function() {
            return iterator
          };
        }

        return iterator
      }

      function Headers(headers) {
        this.map = {};

        if (headers instanceof Headers) {
          headers.forEach(function(value, name) {
            this.append(name, value);
          }, this);
        } else if (Array.isArray(headers)) {
          headers.forEach(function(header) {
            this.append(header[0], header[1]);
          }, this);
        } else if (headers) {
          Object.getOwnPropertyNames(headers).forEach(function(name) {
            this.append(name, headers[name]);
          }, this);
        }
      }

      Headers.prototype.append = function(name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var oldValue = this.map[name];
        this.map[name] = oldValue ? oldValue+','+value : value;
      };

      Headers.prototype['delete'] = function(name) {
        delete this.map[normalizeName(name)];
      };

      Headers.prototype.get = function(name) {
        name = normalizeName(name);
        return this.has(name) ? this.map[name] : null
      };

      Headers.prototype.has = function(name) {
        return this.map.hasOwnProperty(normalizeName(name))
      };

      Headers.prototype.set = function(name, value) {
        this.map[normalizeName(name)] = normalizeValue(value);
      };

      Headers.prototype.forEach = function(callback, thisArg) {
        for (var name in this.map) {
          if (this.map.hasOwnProperty(name)) {
            callback.call(thisArg, this.map[name], name, this);
          }
        }
      };

      Headers.prototype.keys = function() {
        var items = [];
        this.forEach(function(value, name) { items.push(name); });
        return iteratorFor(items)
      };

      Headers.prototype.values = function() {
        var items = [];
        this.forEach(function(value) { items.push(value); });
        return iteratorFor(items)
      };

      Headers.prototype.entries = function() {
        var items = [];
        this.forEach(function(value, name) { items.push([name, value]); });
        return iteratorFor(items)
      };

      if (support.iterable) {
        Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
      }

      function consumed(body) {
        if (body.bodyUsed) {
          return Promise.reject(new TypeError('Already read'))
        }
        body.bodyUsed = true;
      }

      function fileReaderReady(reader) {
        return new Promise(function(resolve, reject) {
          reader.onload = function() {
            resolve(reader.result);
          };
          reader.onerror = function() {
            reject(reader.error);
          };
        })
      }

      function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsArrayBuffer(blob);
        return promise
      }

      function readBlobAsText(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsText(blob);
        return promise
      }

      function readArrayBufferAsText(buf) {
        var view = new Uint8Array(buf);
        var chars = new Array(view.length);

        for (var i = 0; i < view.length; i++) {
          chars[i] = String.fromCharCode(view[i]);
        }
        return chars.join('')
      }

      function bufferClone(buf) {
        if (buf.slice) {
          return buf.slice(0)
        } else {
          var view = new Uint8Array(buf.byteLength);
          view.set(new Uint8Array(buf));
          return view.buffer
        }
      }

      function Body() {
        this.bodyUsed = false;

        this._initBody = function(body) {
          this._bodyInit = body;
          if (!body) {
            this._bodyText = '';
          } else if (typeof body === 'string') {
            this._bodyText = body;
          } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body;
          } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body;
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this._bodyText = body.toString();
          } else if (support.arrayBuffer && support.blob && isDataView(body)) {
            this._bodyArrayBuffer = bufferClone(body.buffer);
            // IE 10-11 can't handle a DataView body.
            this._bodyInit = new Blob([this._bodyArrayBuffer]);
          } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
            this._bodyArrayBuffer = bufferClone(body);
          } else {
            throw new Error('unsupported BodyInit type')
          }

          if (!this.headers.get('content-type')) {
            if (typeof body === 'string') {
              this.headers.set('content-type', 'text/plain;charset=UTF-8');
            } else if (this._bodyBlob && this._bodyBlob.type) {
              this.headers.set('content-type', this._bodyBlob.type);
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }
          }
        };

        if (support.blob) {
          this.blob = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected
            }

            if (this._bodyBlob) {
              return Promise.resolve(this._bodyBlob)
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(new Blob([this._bodyArrayBuffer]))
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as blob')
            } else {
              return Promise.resolve(new Blob([this._bodyText]))
            }
          };

          this.arrayBuffer = function() {
            if (this._bodyArrayBuffer) {
              return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
            } else {
              return this.blob().then(readBlobAsArrayBuffer)
            }
          };
        }

        this.text = function() {
          var rejected = consumed(this);
          if (rejected) {
            return rejected
          }

          if (this._bodyBlob) {
            return readBlobAsText(this._bodyBlob)
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
          } else if (this._bodyFormData) {
            throw new Error('could not read FormData body as text')
          } else {
            return Promise.resolve(this._bodyText)
          }
        };

        if (support.formData) {
          this.formData = function() {
            return this.text().then(decode)
          };
        }

        this.json = function() {
          return this.text().then(JSON.parse)
        };

        return this
      }

      // HTTP methods whose capitalization should be normalized
      var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

      function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return (methods.indexOf(upcased) > -1) ? upcased : method
      }

      function Request(input, options) {
        options = options || {};
        var body = options.body;

        if (input instanceof Request) {
          if (input.bodyUsed) {
            throw new TypeError('Already read')
          }
          this.url = input.url;
          this.credentials = input.credentials;
          if (!options.headers) {
            this.headers = new Headers(input.headers);
          }
          this.method = input.method;
          this.mode = input.mode;
          if (!body && input._bodyInit != null) {
            body = input._bodyInit;
            input.bodyUsed = true;
          }
        } else {
          this.url = String(input);
        }

        this.credentials = options.credentials || this.credentials || 'omit';
        if (options.headers || !this.headers) {
          this.headers = new Headers(options.headers);
        }
        this.method = normalizeMethod(options.method || this.method || 'GET');
        this.mode = options.mode || this.mode || null;
        this.referrer = null;

        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
          throw new TypeError('Body not allowed for GET or HEAD requests')
        }
        this._initBody(body);
      }

      Request.prototype.clone = function() {
        return new Request(this, { body: this._bodyInit })
      };

      function decode(body) {
        var form = new FormData();
        body.trim().split('&').forEach(function(bytes) {
          if (bytes) {
            var split = bytes.split('=');
            var name = split.shift().replace(/\+/g, ' ');
            var value = split.join('=').replace(/\+/g, ' ');
            form.append(decodeURIComponent(name), decodeURIComponent(value));
          }
        });
        return form
      }

      function parseHeaders(rawHeaders) {
        var headers = new Headers();
        // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
        // https://tools.ietf.org/html/rfc7230#section-3.2
        var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
        preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
          var parts = line.split(':');
          var key = parts.shift().trim();
          if (key) {
            var value = parts.join(':').trim();
            headers.append(key, value);
          }
        });
        return headers
      }

      Body.call(Request.prototype);

      function Response(bodyInit, options) {
        if (!options) {
          options = {};
        }

        this.type = 'default';
        this.status = options.status === undefined ? 200 : options.status;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = 'statusText' in options ? options.statusText : 'OK';
        this.headers = new Headers(options.headers);
        this.url = options.url || '';
        this._initBody(bodyInit);
      }

      Body.call(Response.prototype);

      Response.prototype.clone = function() {
        return new Response(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Headers(this.headers),
          url: this.url
        })
      };

      Response.error = function() {
        var response = new Response(null, {status: 0, statusText: ''});
        response.type = 'error';
        return response
      };

      var redirectStatuses = [301, 302, 303, 307, 308];

      Response.redirect = function(url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
          throw new RangeError('Invalid status code')
        }

        return new Response(null, {status: status, headers: {location: url}})
      };

      self.Headers = Headers;
      self.Request = Request;
      self.Response = Response;

      self.fetch = function(input, init) {
        return new Promise(function(resolve, reject) {
          var request = new Request(input, init);
          var xhr = new XMLHttpRequest();

          xhr.onload = function() {
            var options = {
              status: xhr.status,
              statusText: xhr.statusText,
              headers: parseHeaders(xhr.getAllResponseHeaders() || '')
            };
            options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
            var body = 'response' in xhr ? xhr.response : xhr.responseText;
            resolve(new Response(body, options));
          };

          xhr.onerror = function() {
            reject(new TypeError('Network request failed'));
          };

          xhr.ontimeout = function() {
            reject(new TypeError('Network request failed'));
          };

          xhr.open(request.method, request.url, true);

          if (request.credentials === 'include') {
            xhr.withCredentials = true;
          } else if (request.credentials === 'omit') {
            xhr.withCredentials = false;
          }

          if ('responseType' in xhr && support.blob) {
            xhr.responseType = 'blob';
          }

          request.headers.forEach(function(value, name) {
            xhr.setRequestHeader(name, value);
          });

          xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
        })
      };
      self.fetch.polyfill = true;
    })(typeof self !== 'undefined' ? self : this);
    }).call(__root__, void(0));
    var fetch = __root__.fetch;
    var Response = fetch.Response = __root__.Response;
    var Request = fetch.Request = __root__.Request;
    var Headers = fetch.Headers = __root__.Headers;
    if (module.exports) {
    module.exports = fetch;
    }
    });

    /**
     * To perform fetch request
     * @param {Object} args
     * @param {String} args.method
     * @param {String} args.path
     * @param {Object} args.params
     * @param {Object} args.body
     */
    function fetchRequest(args) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var parsedArgs = removeUndefined(args);
        try {
          var method = parsedArgs.method,
              path = parsedArgs.path,
              params = parsedArgs.params,
              body = parsedArgs.body;

          var bodyCopy = body;
          var contentType = path.endsWith('msearch') || path.endsWith('bulk') ? 'application/x-ndjson' : 'application/json';
          var headers = Object.assign({}, {
            Accept: 'application/json',
            'Content-Type': contentType
          }, _this.headers);
          var timestamp = Date.now();
          if (_this.credentials) {
            headers.Authorization = 'Basic ' + btoa(_this.credentials);
          }
          var requestOptions = {
            method: method,
            headers: headers
          };
          if (Array.isArray(bodyCopy)) {
            var arrayBody = '';
            bodyCopy.forEach(function (item) {
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

          var finalRequest = requestOptions;
          if (_this.transformRequest) {
            finalRequest = _this.transformRequest(requestOptions);
          }
          var responseHeaders = {};
          return browserPonyfill(_this.protocol + '://' + _this.url + '/' + _this.app + '/' + path + '?' + querystring.stringify(params), finalRequest).then(function (res) {
            if (res.status >= 500) {
              return reject(res);
            }
            responseHeaders = res.headers;
            return res.json().then(function (data) {
              if (res.status >= 400) {
                return reject(res);
              }
              var response = Object.assign({}, data, {
                _timestamp: timestamp,
                _headers: responseHeaders
              });
              return resolve(response);
            });
          }).catch(function (e) {
            return reject(e);
          });
        } catch (e) {
          return reject(e);
        }
      });
    }

    var WebSocket = typeof window !== 'undefined' ? window.WebSocket : require('ws');

    /**
     * To connect a web socket
     * @param {Object} args
     * @param {String} args.method
     * @param {String} args.path
     * @param {Object} args.params
     * @param {Object} args.body
     */
    function wsRequest(args, onData, onError, onClose) {
      var _this = this;

      try {
        var parsedArgs = removeUndefined(args);
        var method = parsedArgs.method,
            path = parsedArgs.path,
            params = parsedArgs.params;

        var bodyCopy = args.body;
        if (!bodyCopy || (typeof bodyCopy === 'undefined' ? 'undefined' : _typeof(bodyCopy)) !== 'object') {
          bodyCopy = {};
        }
        var init = function init() {
          _this.ws = new WebSocket('wss://' + _this.url + '/' + _this.app);
          _this.id = uuidv4();

          _this.request = {
            id: _this.id,
            path: _this.app + '/' + path + '?' + querystring.stringify(params),
            method: method,
            body: bodyCopy
          };
          if (_this.credentials) {
            _this.request.authorization = 'Basic ' + btoa(_this.credentials);
          }
          _this.result = {};
          _this.closeHandler = function () {
            _this.wsClosed();
          };
          _this.errorHandler = function (err) {
            _this.processError.apply(_this, [err]);
          };
          _this.messageHandler = function (message) {
            var dataObj = JSON.parse(message.data);
            if (dataObj.body && dataObj.body.status >= 400) {
              _this.processError.apply(_this, [dataObj]);
            } else {
              _this.processMessage.apply(_this, [dataObj]);
            }
          };
          _this.send = function (request) {
            waitForSocketConnection(_this.ws, function () {
              try {
                _this.ws.send(JSON.stringify(request));
              } catch (e) {
                console.warn(e);
              }
            });
          };
          _this.ws.onmessage = _this.messageHandler;
          _this.ws.onerror = _this.errorHandler;
          _this.ws.onclose = _this.closeHandler;
          _this.send(_this.request);
          _this.result.stop = _this.stop;
          _this.result.reconnect = _this.reconnect;

          return _this.result;
        };
        this.wsClosed = function () {
          if (onClose) {
            onClose();
          }
        };
        this.stop = function () {
          _this.ws.onmessage = undefined;
          _this.ws.onclose = undefined;
          _this.ws.onerror = undefined;
          _this.wsClosed();
          var unsubRequest = JSON.parse(JSON.stringify(_this.request));
          unsubRequest.unsubscribe = true;

          if (_this.unsubscribed !== true) {
            _this.send(unsubRequest);
          }

          _this.unsubscribed = true;
        };
        this.reconnect = function () {
          _this.stop();
          return wsRequest(args, onData, onError, onClose);
        };
        this.processError = function (err) {
          if (onError) {
            onError(err);
          } else {
            console.warn(err);
          }
        };

        this.processMessage = function (origDataObj) {
          var dataObj = JSON.parse(JSON.stringify(origDataObj));
          if (!dataObj.id && dataObj.message) {
            if (onError) {
              onError(dataObj);
            }
            return;
          }

          if (dataObj.id === _this.id) {
            if (dataObj.message) {
              delete dataObj.id;
              if (onError) {
                onError(dataObj);
              }
              return;
            }

            if (dataObj.query_id) {
              _this.query_id = dataObj.query_id;
            }

            if (dataObj.channel) {
              _this.channel = dataObj.channel;
            }

            if (dataObj.body && dataObj.body !== '') {
              if (onData) {
                onData(dataObj.body);
              }
            }

            return;
          }

          if (!dataObj.id && dataObj.channel && dataObj.channel === _this.channel) {
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
      var parsedArgs = removeUndefined(args);
      // Validate arguments
      var valid = validate(parsedArgs, {
        type: 'string',
        body: 'object'
      });
      if (valid !== true) {
        throw valid;
      }
      var type = parsedArgs.type,
          id = parsedArgs.id,
          body = parsedArgs.body;


      delete parsedArgs.type;
      delete parsedArgs.body;
      delete parsedArgs.id;

      var path = void 0;
      if (id) {
        path = type + '/' + encodeURIComponent(id);
      } else {
        path = type;
      }
      return this.performFetchRequest({
        method: 'POST',
        path: path,
        params: parsedArgs,
        body: body
      });
    }

    /**
     * Get Service
     * @param {Object} args
     * @param {String} args.type
     * @param {String} args.id
     */
    function getApi(args) {
      var parsedArgs = removeUndefined(args);
      // Validate arguments
      var valid = validate(parsedArgs, {
        type: 'string',
        id: 'string'
      });

      if (valid !== true) {
        throw valid;
      }

      var type = parsedArgs.type,
          id = parsedArgs.id;


      delete parsedArgs.type;
      delete parsedArgs.id;

      var path = type + '/' + encodeURIComponent(id);

      return this.performFetchRequest({
        method: 'GET',
        path: path,
        params: parsedArgs
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
      var parsedArgs = removeUndefined(args);
      // Validate arguments
      var valid = validate(parsedArgs, {
        type: 'string',
        id: 'string',
        body: 'object'
      });
      if (valid !== true) {
        throw valid;
      }

      var type = parsedArgs.type,
          id = parsedArgs.id,
          body = parsedArgs.body;

      delete parsedArgs.type;
      delete parsedArgs.id;
      delete parsedArgs.body;
      var path = type + '/' + encodeURIComponent(id) + '/_update';

      return this.performFetchRequest({
        method: 'POST',
        path: path,
        params: parsedArgs,
        body: body
      });
    }

    /**
     * Delete Service
     * @param {Object} args
     * @param {String} args.type
     * @param {String} args.id
     */
    function deleteApi(args) {
      var parsedArgs = removeUndefined(args);
      // Validate arguments
      var valid = validate(parsedArgs, {
        type: 'string',
        id: 'string'
      });
      if (valid !== true) {
        throw valid;
      }

      var type = parsedArgs.type,
          id = parsedArgs.id;

      delete parsedArgs.type;
      delete parsedArgs.id;

      var path = type + '/' + encodeURIComponent(id);

      return this.performFetchRequest({
        method: 'DELETE',
        path: path,
        params: parsedArgs
      });
    }

    /**
     * Bulk Service
     * @param {Object} args
     * @param {String} args.type
     * @param {Object} args.body
     */
    function bulkApi(args) {
      var parsedArgs = removeUndefined(args);
      // Validate arguments
      var valid = validate(parsedArgs, {
        body: 'object'
      });
      if (valid !== true) {
        throw valid;
      }

      var type = parsedArgs.type,
          body = parsedArgs.body;


      delete parsedArgs.type;
      delete parsedArgs.body;

      var path = void 0;
      if (type) {
        path = type + '/_bulk';
      } else {
        path = '/_bulk';
      }

      return this.performFetchRequest({
        method: 'POST',
        path: path,
        params: parsedArgs,
        body: body
      });
    }

    /**
     * Search Service
     * @param {Object} args
     * @param {String} args.type
     * @param {Object} args.body
     */
    function searchApi(args) {
      var parsedArgs = removeUndefined(args);
      // Validate arguments
      var valid = validate(parsedArgs, {
        body: 'object'
      });
      if (valid !== true) {
        throw valid;
      }

      var type = void 0;
      if (Array.isArray(parsedArgs.type)) {
        type = parsedArgs.type.join();
      } else {
        // eslint-disable-next-line
        type = parsedArgs.type;
      }

      var body = parsedArgs.body;


      delete parsedArgs.type;
      delete parsedArgs.body;

      var path = void 0;
      if (type) {
        path = type + '/_search';
      } else {
        path = '_search';
      }

      return this.performFetchRequest({
        method: 'POST',
        path: path,
        params: parsedArgs,
        body: body
      });
    }

    /**
     * Msearch Service
     * @param {Object} args
     * @param {String} args.type
     * @param {Object} args.body
     */
    function msearchApi(args) {
      var parsedArgs = removeUndefined(args);
      // Validate arguments
      var valid = validate(parsedArgs, {
        body: 'object'
      });
      if (valid !== true) {
        throw valid;
      }

      var type = void 0;
      if (Array.isArray(parsedArgs.type)) {
        type = parsedArgs.type.join();
      } else {
        type = parsedArgs.type;
      }

      var body = parsedArgs.body;


      delete parsedArgs.type;
      delete parsedArgs.body;

      var path = void 0;
      if (type) {
        path = type + '/_msearch';
      } else {
        path = '_msearch';
      }

      return this.performFetchRequest({
        method: 'POST',
        path: path,
        params: parsedArgs,
        body: body
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
    function getStream(args) {
      var parsedArgs = removeUndefined(args);
      // Validate arguments
      var valid = validate(parsedArgs, {
        type: 'string',
        id: 'string'
      });
      if (valid !== true) {
        throw valid;
      }

      var type = parsedArgs.type,
          id = parsedArgs.id;


      delete parsedArgs.type;
      delete parsedArgs.id;
      delete parsedArgs.stream;

      if (parsedArgs.stream === true) {
        parsedArgs.stream = 'true';
      } else {
        delete parsedArgs.stream;
        parsedArgs.streamonly = 'true';
      }

      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      return this.performWsRequest.apply(this, [{
        method: 'GET',
        path: type + '/' + encodeURIComponent(id),
        params: parsedArgs
      }].concat(rest));
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
    function searchStreamApi(args) {
      var parsedArgs = removeUndefined(args);
      // Validate arguments
      var valid = validate(parsedArgs, {
        body: 'object'
      });
      if (valid !== true) {
        throw valid;
      }

      if (parsedArgs.type === undefined || Array.isArray(parsedArgs.type) && parsedArgs.type.length === 0) {
        throw new Error('Missing fields: type');
      }

      var type = void 0;
      if (Array.isArray(parsedArgs.type)) {
        type = parsedArgs.type.join();
      } else {
        type = parsedArgs.type;
      }

      var body = parsedArgs.body;

      delete parsedArgs.type;
      delete parsedArgs.body;
      delete parsedArgs.stream;

      parsedArgs.streamonly = 'true';

      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      return this.performWsRequest.apply(this, [{
        method: 'POST',
        path: type + '/_search',
        params: parsedArgs,
        body: body
      }].concat(rest));
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
    function searchStreamToURLApi(args, webhook) {
      for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rest[_key - 2] = arguments[_key];
      }

      var _this = this;

      var parsedArgs = removeUndefined(args);
      var bodyCopy = parsedArgs.body;
      var type = void 0;
      var typeString = void 0;
      // Validate arguments
      var valid = validate(parsedArgs, {
        body: 'object'
      });
      if (valid !== true) {
        throw valid;
      }

      if (parsedArgs.type === undefined || !(typeof parsedArgs.type === 'string' || Array.isArray(parsedArgs.type)) || parsedArgs.type === '' || parsedArgs.type.length === 0) {
        throw new Error('fields missing: type');
      }

      valid = validate(parsedArgs.body, {
        query: 'object'
      });
      if (valid !== true) {
        throw valid;
      }

      if (Array.isArray(parsedArgs.type)) {
        type = parsedArgs.type;

        typeString = parsedArgs.type.join();
      } else {
        type = [parsedArgs.type];
        typeString = parsedArgs.type;
      }

      var webhooks = [];
      var _bodyCopy = bodyCopy,
          query = _bodyCopy.query;


      if (typeof webhook === 'string') {
        var webHookObj = {};
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

      var populateBody = function populateBody() {
        bodyCopy = {};
        bodyCopy.webhooks = webhooks;
        bodyCopy.query = query;
        bodyCopy.type = type;
      };

      populateBody();

      var encode64 = btoa(jsonStableStringify(query));
      var path = '.percolator/webhooks-0-' + typeString + '-0-' + encode64;

      this.change = function () {
        webhooks = [];

        if (typeof parsedArgs === 'string') {
          var webhook2 = {};
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

        return _this.performRequest('POST');
      };
      this.stop = function () {
        bodyCopy = undefined;
        return _this.performRequest('DELETE');
      };
      this.performRequest = function (method) {
        var res = _this.performWsRequest.apply(_this, [{
          method: method,
          path: path,
          body: bodyCopy
        }].concat(rest));

        res.change = _this.change;
        res.stop = _this.stop;

        return res;
      };
      return this.performRequest('POST');
    }

    /**
     * To get types
     */
    function getTypesService() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        try {
          return _this.performFetchRequest({
            method: 'GET',
            path: '_mapping'
          }).then(function (data) {
            var types = Object.keys(data[_this.app].mappings).filter(function (type) {
              return type !== '_default_';
            });
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
        path: '_mapping'
      });
    }

    function index (config) {
      var client = new AppBase(config);

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
