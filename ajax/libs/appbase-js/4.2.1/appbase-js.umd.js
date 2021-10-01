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

    function validateRSQuery(query) {
      if (query && Object.prototype.toString.call(query) === '[object Array]') {
        for (var i = 0; i < query.length; i += 1) {
          var q = query[i];
          if (q) {
            if (!q.id) {
              return new Error("'id' field must be present in query object");
            }
          } else {
            return new Error('query object can not have an empty value');
          }
        }
        return true;
      }
      return new Error("invalid query value, 'query' value must be an array");
    }

    function validate(object, fields) {
      var invalid = [];
      var emptyFor = {
        object: null,
        string: '',
        number: 0
      };
      var keys = Object.keys(fields);
      keys.forEach(function (key) {
        var types = fields[key].split('|');
        var matchedType = types.find(function (type) {
          return (
            // eslint-disable-next-line
            _typeof(object[key]) === type
          );
        });
        if (!matchedType || object[key] === emptyFor[matchedType]) {
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

    function removeUndefined() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (value || !(Object.keys(value).length === 0 && value.constructor === Object)) {
        return JSON.parse(JSON.stringify(value));
      }
      return null;
    }

    function encodeHeaders() {
      var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var shouldEncode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // Encode headers
      var encodedHeaders = {};
      if (shouldEncode) {
        Object.keys(headers).forEach(function (header) {
          encodedHeaders[header] = encodeURI(headers[header]);
        });
      } else {
        encodedHeaders = headers;
      }
      return encodedHeaders;
    }

    /**
     * Returns an instance of Appbase client
     * @param {Object} config To configure properties
     * @param {String} config.url
     * @param {String} config.app
     * @param {String} config.credentials
     * @param {String} config.username
     * @param {String} config.password
     * @param {Boolean} config.enableTelemetry
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
      this.headers = {
        'X-Search-Client': 'Appbase JS'
      };
      if (config.enableTelemetry === false) {
        Object.assign(this.headers, {
          'X-Enable-Telemetry': config.enableTelemetry
        });
      }
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
    // Needed for TypeScript consumers without esModuleInterop.
    module.exports.default = fetch;
    }
    });

    /**
     * To perform fetch request
     * @param {Object} args
     * @param {String} args.method
     * @param {String} args.path
     * @param {Object} args.params
     * @param {Object} args.body
     * @param {boolean} args.isSuggestionsAPI
     */
    function fetchRequest(args) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var parsedArgs = removeUndefined(args);
        try {
          var method = parsedArgs.method,
              path = parsedArgs.path,
              params = parsedArgs.params,
              body = parsedArgs.body,
              isRSAPI = parsedArgs.isRSAPI,
              isSuggestionsAPI = parsedArgs.isSuggestionsAPI;

          var app = isSuggestionsAPI ? '.suggestions' : _this.app;
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

          var handleTransformRequest = function handleTransformRequest(res) {
            if (_this.transformRequest && typeof _this.transformRequest === 'function') {
              var tarnsformRequestPromise = _this.transformRequest(res);
              return tarnsformRequestPromise instanceof Promise ? tarnsformRequestPromise : Promise.resolve(tarnsformRequestPromise);
            }
            return Promise.resolve(res);
          };

          var responseHeaders = {};

          var paramsString = '';
          if (params) {
            paramsString = '?' + querystring.stringify(params);
          }
          var finalURL = _this.protocol + '://' + _this.url + '/' + app + '/' + path + paramsString;
          return handleTransformRequest(Object.assign({}, {
            url: finalURL
          }, requestOptions)).then(function (ts) {
            var transformedRequest = Object.assign({}, ts);
            var url = transformedRequest.url;

            delete transformedRequest.url;
            return browserPonyfill(url || finalURL, transformedRequest).then(function (res) {
              if (res.status >= 500) {
                return reject(res);
              }
              responseHeaders = res.headers;
              return res.json().then(function (data) {
                if (res.status >= 400) {
                  return reject(res);
                }
                if (data && data.error) {
                  return reject(data);
                }
                // Handle error from RS API RESPONSE
                if (isRSAPI && data && Object.prototype.toString.call(data) === '[object Object]') {
                  if (body && body.query && body.query instanceof Array) {
                    var errorResponses = 0;
                    var allResponses = body.query.filter(function (q) {
                      return q.execute || q.execute === undefined;
                    }).length;
                    if (data) {
                      Object.keys(data).forEach(function (key) {
                        if (data[key] && Object.prototype.hasOwnProperty.call(data[key], 'error')) {
                          errorResponses += 1;
                        }
                      });
                    }
                    // reject only when all responses has error
                    if (errorResponses > 0 && allResponses === errorResponses) {
                      return reject(data);
                    }
                  }
                }

                // Handle error from _msearch response
                if (data && data.responses instanceof Array) {
                  var _allResponses = data.responses.length;
                  var _errorResponses = data.responses.filter(function (entry) {
                    return Object.prototype.hasOwnProperty.call(entry, 'error');
                  }).length;
                  // reject only when all responses has error
                  if (_allResponses === _errorResponses) {
                    return reject(data);
                  }
                }
                var response = Object.assign({}, data, {
                  _timestamp: timestamp,
                  _headers: responseHeaders
                });
                return resolve(response);
              }).catch(function (e) {
                return reject(e);
              });
            }).catch(function (e) {
              return reject(e);
            });
          }).catch(function (err) {
            return reject(err);
          });
        } catch (e) {
          return reject(e);
        }
      });
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
        body: 'object'
      });
      if (valid !== true) {
        throw valid;
      }
      var _parsedArgs$type = parsedArgs.type,
          type = _parsedArgs$type === undefined ? '_doc' : _parsedArgs$type,
          id = parsedArgs.id,
          body = parsedArgs.body;


      delete parsedArgs.type;
      delete parsedArgs.body;
      delete parsedArgs.id;

      var path = void 0;
      if (id) {
        path = type ? type + '/' + encodeURIComponent(id) : encodeURIComponent(id);
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
        id: 'string|number'
      });

      if (valid !== true) {
        throw valid;
      }

      var _parsedArgs$type = parsedArgs.type,
          type = _parsedArgs$type === undefined ? '_doc' : _parsedArgs$type,
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
        id: 'string|number',
        body: 'object'
      });
      if (valid !== true) {
        throw valid;
      }

      var _parsedArgs$type = parsedArgs.type,
          type = _parsedArgs$type === undefined ? '_doc' : _parsedArgs$type,
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
        id: 'string|number'
      });
      if (valid !== true) {
        throw valid;
      }

      var _parsedArgs$type = parsedArgs.type,
          type = _parsedArgs$type === undefined ? '_doc' : _parsedArgs$type,
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
        path = '_bulk';
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
     * ReactiveSearch API Service for v3
     * @param {Array<Object>} query
     * @param {Object} settings
     * @param {boolean} settings.recordAnalytics
     * @param {boolean} settings.userId
     * @param {boolean} settings.enableQueryRules
     * @param {boolean} settings.customEvents
     */
    function reactiveSearchv3Api(query, settings) {
      var parsedSettings = removeUndefined(settings);

      // Validate query
      var valid = validateRSQuery(query);

      if (valid !== true) {
        throw valid;
      }

      var body = {
        settings: parsedSettings,
        query: query
      };

      return this.performFetchRequest({
        method: 'POST',
        path: '_reactivesearch.v3',
        body: body,
        isRSAPI: true
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

    /**
     * ReactiveSearch suggestions API for v3
     * @param {Array<Object>} query
     * @param {Object} settings
     * @param {boolean} settings.recordAnalytics
     * @param {boolean} settings.userId
     * @param {boolean} settings.enableQueryRules
     * @param {boolean} settings.customEvents
     */
    function getSuggestionsv3Api(query, settings) {
      var parsedSettings = removeUndefined(settings);

      // Validate query
      var valid = validateRSQuery(query);

      if (valid !== true) {
        throw valid;
      }

      var body = {
        settings: parsedSettings,
        query: query
      };

      return this.performFetchRequest({
        method: 'POST',
        path: '_reactivesearch.v3',
        body: body,
        isRSAPI: true,
        isSuggestionsAPI: true
      });
    }

    function appbasejs(config) {
    	var client = new AppBase(config);

    	AppBase.prototype.performFetchRequest = fetchRequest;

    	AppBase.prototype.index = indexApi;

    	AppBase.prototype.get = getApi;

    	AppBase.prototype.update = updateApi;

    	AppBase.prototype.delete = deleteApi;

    	AppBase.prototype.bulk = bulkApi;

    	AppBase.prototype.search = searchApi;

    	AppBase.prototype.msearch = msearchApi;

    	AppBase.prototype.reactiveSearchv3 = reactiveSearchv3Api;

    	AppBase.prototype.getQuerySuggestions = getSuggestionsv3Api;

    	AppBase.prototype.getMappings = getMappings;

    	AppBase.prototype.setHeaders = function setHeaders() {
    		var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    		var shouldEncode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    		// Encode headers
    		if (shouldEncode) {
    			this.headers = encodeHeaders(headers);
    		} else {
    			this.headers = headers;
    		}
    	};

    	if (typeof window !== 'undefined') {
    		window.Appbase = client;
    	}
    	return client;
    }

    return appbasejs;

})));
//# sourceMappingURL=appbase-js.umd.js.map
