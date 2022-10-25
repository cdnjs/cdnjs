(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Appbase = factory());
}(this, (function () { 'use strict';

    function URL$1(url) {
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

    var urlParserLite = URL$1;

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
    function getMongoRequest(app, mongo) {
      var mongodb = {};
      if (app) {
        mongodb.index = app;
      }
      if (mongo) {
        if (mongo.db) {
          mongodb.db = mongo.db;
        }
        if (mongo.collection) {
          mongodb.collection = mongo.collection;
        }
      }
      return mongodb;
    }

    function getTelemetryHeaders(enableTelemetry, shouldSetHeaders) {
      var headers = {};
      if (!shouldSetHeaders) {
        return headers;
      }
      Object.assign(headers, {
        'X-Search-Client': 'Appbase JS'
      });

      if (enableTelemetry === false) {
        Object.assign(headers, {
          'X-Enable-Telemetry': enableTelemetry
        });
      }

      return headers;
    }

    var backendAlias = {
      MONGODB: 'mongodb', // mongodb
      ELASTICSEARCH: 'elasticsearch' // elasticsearch
    };
    var dataTypes = {
      ARRAY: 'array',
      FUNCTION: 'function',
      OBJECT: 'object',
      NUMBER: 'number',
      BOOLEAN: 'boolean',
      STRING: 'string'
    };
    var checkDataType = function checkDataType(temp) {
      // eslint-disable-next-line
      if ((typeof temp === 'undefined' ? 'undefined' : _typeof(temp)) === dataTypes.OBJECT) {
        if (Array.isArray(temp)) {
          return dataTypes.ARRAY;
        }

        return dataTypes.OBJECT;
      }
      return typeof temp === 'undefined' ? 'undefined' : _typeof(temp);
    };

    function validateSchema() {
      var passedProperties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var backendName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var passedPropertiesKeys = Object.keys(passedProperties).filter(function (propertyKey) {
        return !!passedProperties[propertyKey];
      });
      var acceptedProperties = Object.keys(schema);
      var requiredProperties = [];
      // fetch required properties
      acceptedProperties.forEach(function (propName) {
        var currentProperty = schema[propName];
        if (currentProperty.required) {
          requiredProperties.push(propName);
        }
      });
      // check for required properties
      requiredProperties.forEach(function (requiredProperty) {
        if (!passedPropertiesKeys.includes(requiredProperty)) {
          throw new Error(requiredProperty + ' is required when using the ' + backendName + ' Search backend.');
        }
      });

      // check for accepted properties
      passedPropertiesKeys.forEach(function (passedPropertyKey) {
        if (!acceptedProperties.includes(passedPropertyKey)) {
          throw new Error(passedPropertyKey + ' property isn\'t accepted property by ' + backendName + ' backend.');
        }

        var acceptedTypes = Array.isArray(schema[passedPropertyKey].type) ? schema[passedPropertyKey].type : [].concat(schema[passedPropertyKey].type);
        var receivedPropertyType = checkDataType(passedProperties[passedPropertyKey]);
        if (!acceptedTypes.includes(receivedPropertyType)) {
          throw new Error('The property ' + passedPropertyKey + ' is expected with type(s) [' + acceptedTypes.join(', ') + '], but type was set as ' + receivedPropertyType + '.');
        }
      });
    }

    function isValidHttpUrl(string) {
      var url = void 0;

      try {
        url = new URL(string);
      } catch (_) {
        return false;
      }

      return url.protocol === 'http:' || url.protocol === 'https:';
    }

    var mongodb = {
      url: {
        type: dataTypes.STRING,
        required: true
      },
      app: {
        type: dataTypes.STRING,
        required: false
      },
      credentials: {
        type: dataTypes.STRING,
        required: false
      },
      enableTelemetry: {
        type: dataTypes.BOOLEAN,
        required: false
      },
      mongodb: {
        type: dataTypes.OBJECT,
        required: true
      },
      username: {
        type: dataTypes.STRING,
        required: false
      },
      password: {
        type: dataTypes.STRING,
        required: false
      }
    };

    var elasticsearch = {
      url: {
        type: dataTypes.STRING,
        required: true
      },
      app: {
        type: dataTypes.STRING,
        required: true
      },
      credentials: {
        type: dataTypes.STRING,
        required: false
      },
      enableTelemetry: {
        type: dataTypes.BOOLEAN,
        required: false
      },
      username: {
        type: dataTypes.STRING,
        required: false
      },
      password: {
        type: dataTypes.STRING,
        required: false
      }
    };

    var SCHEMA = { mongodb: mongodb, elasticsearch: elasticsearch };

    /**
     * Returns an instance of Appbase client
     * @param {Object} config To configure properties
     * @param {String} config.url
     * @param {String} config.app
     * @param {String} config.credentials
     * @param {String} config.username
     * @param {String} config.password
     * @param {Boolean} config.enableTelemetry
     * @param {Object} config.mongodb
     * @param {Object} config.endpoint
     * A callback function which will be invoked before a fetch request made
     */
    function AppBase(config) {
      var _URL = urlParserLite((config.endpoint ? config.endpoint.url : config.url) || ''),
          _URL$auth = _URL.auth,
          auth = _URL$auth === undefined ? null : _URL$auth,
          _URL$host = _URL.host,
          host = _URL$host === undefined ? '' : _URL$host,
          _URL$path = _URL.path,
          path = _URL$path === undefined ? '' : _URL$path,
          _URL$protocol = _URL.protocol,
          protocol = _URL$protocol === undefined ? '' : _URL$protocol;

      var url = config.url;

      url = host + path;
      // Parse url
      if (url.slice(-1) === '/') {
        url = url.slice(0, -1);
      }
      var backendName = backendAlias[config.mongodb ? 'MONGODB' : 'ELASTICSEARCH'];
      // eslint-disable-next-line
      var schema = SCHEMA[backendName];

      if (config.endpoint && isValidHttpUrl(config.endpoint.url)) {
        schema.url.required = false;
        schema.app.required = false;
        schema.credentials.required = false;
      }

      validateSchema({
        url: config.url,
        app: config.app,
        credentials: config.credentials,
        username: config.username,
        password: config.password,
        enableTelemetry: config.enableTelemetry,
        mongodb: config.mongodb
      }, schema, backendName);

      if (typeof protocol !== 'string' || protocol === '') {
        throw new Error('Protocol is not present in url. URL should be of the form https://appbase-demo-ansible-abxiydt-arc.searchbase.io');
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
      if (!config.mongodb) {
        if (isAppbase(url) && credentials === null) {
          throw new Error('Authentication information is not present. Did you add credentials?');
        }
      }

      this.url = url;
      this.protocol = protocol;
      this.app = config.app;
      this.credentials = credentials;
      if (config.mongodb) {
        this.mongodb = config.mongodb;
      }

      if (typeof config.enableTelemetry === 'boolean') {
        this.enableTelemetry = config.enableTelemetry;
      }
    }

    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.


    // If obj.hasOwnProperty has been overridden, then calling
    // obj.hasOwnProperty(prop) will break.
    // See: https://github.com/joyent/node/issues/1707
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    var isArray = Array.isArray || function (xs) {
      return Object.prototype.toString.call(xs) === '[object Array]';
    };
    function stringifyPrimitive(v) {
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
    }

    function stringify (obj, sep, eq, name) {
      sep = sep || '&';
      eq = eq || '=';
      if (obj === null) {
        obj = undefined;
      }

      if (typeof obj === 'object') {
        return map(objectKeys(obj), function(k) {
          var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
          if (isArray(obj[k])) {
            return map(obj[k], function(v) {
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
    }
    function map (xs, f) {
      if (xs.map) return xs.map(f);
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        res.push(f(xs[i], i));
      }
      return res;
    }

    var objectKeys = Object.keys || function (obj) {
      var res = [];
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
      }
      return res;
    };

    function parse(qs, sep, eq, options) {
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
        } else if (isArray(obj[k])) {
          obj[k].push(v);
        } else {
          obj[k] = [obj[k], v];
        }
      }

      return obj;
    }var querystring = {
      encode: stringify,
      stringify: stringify,
      decode: parse,
      parse: parse
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var browserPonyfill = createCommonjsModule(function (module, exports) {
    var global = typeof self !== 'undefined' ? self : commonjsGlobal;
    var __self__ = (function () {
    function F() {
    this.fetch = false;
    this.DOMException = global.DOMException;
    }
    F.prototype = global;
    return new F();
    })();
    (function(self) {

    var irrelevant = (function (exports) {

      var support = {
        searchParams: 'URLSearchParams' in self,
        iterable: 'Symbol' in self && 'iterator' in Symbol,
        blob:
          'FileReader' in self &&
          'Blob' in self &&
          (function() {
            try {
              new Blob();
              return true
            } catch (e) {
              return false
            }
          })(),
        formData: 'FormData' in self,
        arrayBuffer: 'ArrayBuffer' in self
      };

      function isDataView(obj) {
        return obj && DataView.prototype.isPrototypeOf(obj)
      }

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

        var isArrayBufferView =
          ArrayBuffer.isView ||
          function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
          };
      }

      function normalizeName(name) {
        if (typeof name !== 'string') {
          name = String(name);
        }
        if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
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
        this.map[name] = oldValue ? oldValue + ', ' + value : value;
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
        this.forEach(function(value, name) {
          items.push(name);
        });
        return iteratorFor(items)
      };

      Headers.prototype.values = function() {
        var items = [];
        this.forEach(function(value) {
          items.push(value);
        });
        return iteratorFor(items)
      };

      Headers.prototype.entries = function() {
        var items = [];
        this.forEach(function(value, name) {
          items.push([name, value]);
        });
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
            this._bodyText = body = Object.prototype.toString.call(body);
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
        return methods.indexOf(upcased) > -1 ? upcased : method
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
          this.signal = input.signal;
          if (!body && input._bodyInit != null) {
            body = input._bodyInit;
            input.bodyUsed = true;
          }
        } else {
          this.url = String(input);
        }

        this.credentials = options.credentials || this.credentials || 'same-origin';
        if (options.headers || !this.headers) {
          this.headers = new Headers(options.headers);
        }
        this.method = normalizeMethod(options.method || this.method || 'GET');
        this.mode = options.mode || this.mode || null;
        this.signal = options.signal || this.signal;
        this.referrer = null;

        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
          throw new TypeError('Body not allowed for GET or HEAD requests')
        }
        this._initBody(body);
      }

      Request.prototype.clone = function() {
        return new Request(this, {body: this._bodyInit})
      };

      function decode(body) {
        var form = new FormData();
        body
          .trim()
          .split('&')
          .forEach(function(bytes) {
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

      exports.DOMException = self.DOMException;
      try {
        new exports.DOMException();
      } catch (err) {
        exports.DOMException = function(message, name) {
          this.message = message;
          this.name = name;
          var error = Error(message);
          this.stack = error.stack;
        };
        exports.DOMException.prototype = Object.create(Error.prototype);
        exports.DOMException.prototype.constructor = exports.DOMException;
      }

      function fetch(input, init) {
        return new Promise(function(resolve, reject) {
          var request = new Request(input, init);

          if (request.signal && request.signal.aborted) {
            return reject(new exports.DOMException('Aborted', 'AbortError'))
          }

          var xhr = new XMLHttpRequest();

          function abortXhr() {
            xhr.abort();
          }

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

          xhr.onabort = function() {
            reject(new exports.DOMException('Aborted', 'AbortError'));
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

          if (request.signal) {
            request.signal.addEventListener('abort', abortXhr);

            xhr.onreadystatechange = function() {
              // DONE (success or failure)
              if (xhr.readyState === 4) {
                request.signal.removeEventListener('abort', abortXhr);
              }
            };
          }

          xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
        })
      }

      fetch.polyfill = true;

      if (!self.fetch) {
        self.fetch = fetch;
        self.Headers = Headers;
        self.Request = Request;
        self.Response = Response;
      }

      exports.Headers = Headers;
      exports.Request = Request;
      exports.Response = Response;
      exports.fetch = fetch;

      Object.defineProperty(exports, '__esModule', { value: true });

      return exports;

    })({});
    })(__self__);
    __self__.fetch.ponyfill = true;
    // Remove "polyfill" property added by whatwg-fetch
    delete __self__.fetch.polyfill;
    // Choose between native implementation (global) or custom implementation (__self__)
    // var ctx = global.fetch ? global : __self__;
    var ctx = __self__; // this line disable service worker support temporarily
    exports = ctx.fetch; // To enable: import fetch from 'cross-fetch'
    exports.default = ctx.fetch; // For TypeScript consumers without esModuleInterop.
    exports.fetch = ctx.fetch; // To enable: import {fetch} from 'cross-fetch'
    exports.Headers = ctx.Headers;
    exports.Request = ctx.Request;
    exports.Response = ctx.Response;
    module.exports = exports;
    });

    var fetch = unwrapExports(browserPonyfill);
    var browserPonyfill_1 = browserPonyfill.fetch;
    var browserPonyfill_2 = browserPonyfill.Headers;
    var browserPonyfill_3 = browserPonyfill.Request;
    var browserPonyfill_4 = browserPonyfill.Response;

    /**
     * To perform fetch request
     * @param {Object} args
     * @param {String} args.method
     * @param {String} args.path
     * @param {Object} args.params
     * @param {Object} args.body
     * @param {Object} args.headers
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
              isSuggestionsAPI = parsedArgs.isSuggestionsAPI,
              _parsedArgs$isMongoRe = parsedArgs.isMongoRequest,
              isMongoRequest = _parsedArgs$isMongoRe === undefined ? false : _parsedArgs$isMongoRe;

          var app = isSuggestionsAPI ? '.suggestions' : _this.app;
          var bodyCopy = body;
          var contentType = path.endsWith('msearch') || path.endsWith('bulk') ? 'application/x-ndjson' : 'application/json';
          var headers = Object.assign({}, {
            Accept: 'application/json',
            'Content-Type': contentType
          }, args.headers, _this.headers);
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
          var finalURL = isMongoRequest ? _this.protocol + '://' + _this.url : _this.protocol + '://' + _this.url + '/' + app + '/' + path + paramsString;

          return handleTransformRequest(Object.assign({}, {
            url: finalURL
          }, requestOptions)).then(function (ts) {
            var transformedRequest = Object.assign({}, ts);
            var url = transformedRequest.url;

            delete transformedRequest.url;
            return fetch(url || finalURL, Object.assign({}, transformedRequest, {
              // apply timestamp header for RS API
              headers: isRSAPI && !isMongoRequest ? Object.assign({}, transformedRequest.headers, {
                'x-timestamp': new Date().getTime()
              }) : transformedRequest.headers
            })).then(function (res) {
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
                        if (data[key] && Object.prototype.hasOwnProperty.call(data[key], 'error') && !!data[key].error) {
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
    function reactiveSearchApi(query, settings, params) {
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

      if (this.mongodb) {
        Object.assign(body, { mongodb: getMongoRequest(this.app, this.mongodb) });
      }
      return this.performFetchRequest({
        method: 'POST',
        path: '_reactivesearch',
        body: body,
        headers: getTelemetryHeaders(this.enableTelemetry, !this.mongodb),
        isRSAPI: true,
        isMongoRequest: !!this.mongodb,
        params: params
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
    function reactiveSearchv3Api(query, settings, params) {
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
      if (this.mongodb) {
        Object.assign(body, { mongodb: getMongoRequest(this.app, this.mongodb) });
      }
      return this.performFetchRequest({
        method: 'POST',
        path: '_reactivesearch.v3',
        body: body,
        headers: getTelemetryHeaders(this.enableTelemetry, !this.mongodb),
        isRSAPI: true,
        isMongoRequest: !!this.mongodb,
        params: params
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

      if (this.mongodb) {
        Object.assign(body, { mongodb: getMongoRequest(this.app, this.mongodb) });
      }
      return this.performFetchRequest({
        method: 'POST',
        path: '_reactivesearch.v3',
        body: body,
        headers: getTelemetryHeaders(this.enableTelemetry),
        isRSAPI: true,
        isSuggestionsAPI: true,
        isMongoRequest: !!this.mongodb
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

      AppBase.prototype.reactiveSearch = reactiveSearchApi;

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
