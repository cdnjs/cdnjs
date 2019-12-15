/*
The MIT License (MIT)

Copyright (c) 2016 Shopify Inc.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


/* version: v0.2.2-a8212a */
;(function () {
var loader, define, requireModule, require, requirejs;
var global = this;

(function() {
  'use strict';

  // Save off the original values of these globals, so we can restore them if someone asks us to
  var oldGlobals = {
    loader: loader,
    define: define,
    requireModule: requireModule,
    require: require,
    requirejs: requirejs
  };

  loader = {
    noConflict: function(aliases) {
      var oldName, newName;

      for (oldName in aliases) {
        if (aliases.hasOwnProperty(oldName)) {
          if (oldGlobals.hasOwnProperty(oldName)) {
            newName = aliases[oldName];

            global[newName] = global[oldName];
            global[oldName] = oldGlobals[oldName];
          }
        }
      }
    }
  };

  var _isArray;
  if (!Array.isArray) {
    _isArray = function (x) {
      return Object.prototype.toString.call(x) === '[object Array]';
    };
  } else {
    _isArray = Array.isArray;
  }

  var registry = {};
  var seen = {};
  var FAILED = false;
  var LOADED = true;

  var uuid = 0;

  function unsupportedModule(length) {
    throw new Error('an unsupported module was defined, expected `define(name, deps, module)` instead got: `' +
                    length + '` arguments to define`');
  }

  var defaultDeps = ['require', 'exports', 'module'];

  function Module(name, deps, callback) {
    this.id        = uuid++;
    this.name      = name;
    this.deps      = !deps.length && callback.length ? defaultDeps : deps;
    this.module    = { exports: {} };
    this.callback  = callback;
    this.state     = undefined;
    this._require  = undefined;
    this.finalized = false;
    this.hasExportsAsDep = false;
  }

  Module.prototype.makeDefaultExport = function() {
    var exports = this.module.exports;
    if (exports !== null &&
        (typeof exports === 'object' || typeof exports === 'function') &&
          exports['default'] === undefined) {
      exports['default'] = exports;
    }
  };

  Module.prototype.exports = function(reifiedDeps) {
    if (this.finalized) {
      return this.module.exports;
    } else {
      var result = this.callback.apply(this, reifiedDeps);
      if (!(this.hasExportsAsDep && result === undefined)) {
        this.module.exports = result;
      }
      this.makeDefaultExport();
      this.finalized = true;
      return this.module.exports;
    }
  };

  Module.prototype.unsee = function() {
    this.finalized = false;
    this.state = undefined;
    this.module = { exports: {}};
  };

  Module.prototype.reify = function() {
    var deps = this.deps;
    var length = deps.length;
    var reified = new Array(length);
    var dep;

    for (var i = 0, l = length; i < l; i++) {
      dep = deps[i];
      if (dep === 'exports') {
        this.hasExportsAsDep = true;
        reified[i] = this.module.exports;
      } else if (dep === 'require') {
        reified[i] = this.makeRequire();
      } else if (dep === 'module') {
        reified[i] = this.module;
      } else {
        reified[i] = findModule(resolve(dep, this.name), this.name).module.exports;
      }
    }

    return reified;
  };

  Module.prototype.makeRequire = function() {
    var name = this.name;

    return this._require || (this._require = function(dep) {
      return require(resolve(dep, name));
    });
  };

  Module.prototype.build = function() {
    if (this.state === FAILED) { return; }
    this.state = FAILED;
    this.exports(this.reify());
    this.state = LOADED;
  };

  define = function(name, deps, callback) {
    if (arguments.length < 2) {
      unsupportedModule(arguments.length);
    }

    if (!_isArray(deps)) {
      callback = deps;
      deps     =  [];
    }

    registry[name] = new Module(name, deps, callback);
  };

  // we don't support all of AMD
  // define.amd = {};
  // we will support petals...
  define.petal = { };

  function Alias(path) {
    this.name = path;
  }

  define.alias = function(path) {
    return new Alias(path);
  };

  function missingModule(name, referrer) {
    throw new Error('Could not find module `' + name + '` imported from `' + referrer + '`');
  }

  requirejs = require = requireModule = function(name) {
    return findModule(name, '(require)').module.exports;
  };

  function findModule(name, referrer) {
    var mod = registry[name] || registry[name + '/index'];

    while (mod && mod.callback instanceof Alias) {
      name = mod.callback.name;
      mod = registry[name];
    }

    if (!mod) { missingModule(name, referrer); }

    mod.build();
    return mod;
  }

  function resolve(child, name) {
    if (child.charAt(0) !== '.') { return child; }

    var parts = child.split('/');
    var nameParts = name.split('/');
    var parentBase = nameParts.slice(0, -1);

    for (var i = 0, l = parts.length; i < l; i++) {
      var part = parts[i];

      if (part === '..') {
        if (parentBase.length === 0) {
          throw new Error('Cannot access parent module of root');
        }
        parentBase.pop();
      } else if (part === '.') {
        continue;
      } else { parentBase.push(part); }
    }

    return parentBase.join('/');
  }

  requirejs.entries = requirejs._eak_seen = registry;
  requirejs.unsee = function(moduleName) {
    findModule(moduleName, '(unsee)').unsee();
  };

  requirejs.clear = function() {
    requirejs.entries = requirejs._eak_seen = registry = {};
    seen = {};
  };
})();

define('shopify-buy/adapters/listings-adapter', ['exports', '../ajax', '../metal/core-object', '../version'], function (exports, _ajax, _coreObject, _version) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ajax2 = _interopRequireDefault(_ajax);

  var _coreObject2 = _interopRequireDefault(_coreObject);

  var _version2 = _interopRequireDefault(_version);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ListingsAdapter = _coreObject2.default.extend({
    ajax: _ajax2.default,

    constructor: function constructor(config) {
      this.config = config;
    },


    get base64ApiKey() {
      return btoa(this.config.apiKey);
    },

    get baseUrl() {
      var _config = this.config;
      var domain = _config.domain;
      var appId = _config.appId;


      return 'https://' + domain + '/api/apps/' + appId;
    },

    get headers() {
      return {
        Authorization: 'Basic ' + this.base64ApiKey,
        'Content-Type': 'application/json',
        'X-SDK-Variant': 'javascript',
        'X-SDK-Version': _version2.default

      };
    },

    pathForType: function pathForType(type) {
      return '/' + type.slice(0, -1) + '_listings';
    },
    buildUrl: function buildUrl(singleOrMultiple, type, idOrQuery) {
      switch (singleOrMultiple) {
        case 'multiple':
          return this.buildMultipleUrl(type, idOrQuery);
        case 'single':
          return this.buildSingleUrl(type, idOrQuery);
        default:
          return '';
      }
    },
    buildMultipleUrl: function buildMultipleUrl(type) {
      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var url = '' + this.baseUrl + this.pathForType(type);
      var paramNames = Object.keys(query);

      if (paramNames.length > 0) {
        var queryString = paramNames.map(function (key) {
          var value = void 0;

          if (Array.isArray(query[key])) {
            value = query[key].join(',');
          } else {
            value = query[key];
          }

          return key + '=' + encodeURIComponent(value);
        }).join('&');

        return url + '?' + queryString;
      }

      return url;
    },
    buildSingleUrl: function buildSingleUrl(type, id) {
      return '' + this.baseUrl + this.pathForType(type) + '/' + id;
    },
    fetchMultiple: function fetchMultiple() /* type, [query] */{
      var url = this.buildUrl.apply(this, ['multiple'].concat(Array.prototype.slice.call(arguments)));

      return this.ajax('GET', url, { headers: this.headers }).then(function (response) {
        return response.json;
      });
    },
    fetchSingle: function fetchSingle() /* type, id */{
      var url = this.buildUrl.apply(this, ['single'].concat(Array.prototype.slice.call(arguments)));

      return this.ajax('GET', url, { headers: this.headers }).then(function (response) {
        return response.json;
      });
    }
  });

  exports.default = ListingsAdapter;
});
define('shopify-buy/adapters/local-storage-adapter', ['exports', '../metal/core-object', '../metal/set-guid-for', '../store'], function (exports, _coreObject, _setGuidFor, _store) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _coreObject2 = _interopRequireDefault(_coreObject);

  var _setGuidFor2 = _interopRequireDefault(_setGuidFor);

  var _store2 = _interopRequireDefault(_store);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  var LocalStorageAdapter = _coreObject2.default.extend({
    constructor: function constructor() {
      this.store = new _store2.default();
    },
    idKeyForType: function idKeyForType() /* type */{
      return _setGuidFor.GUID_KEY;
    },
    fetchSingle: function fetchSingle(type, id) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var value = _this.store.getItem(_this.storageKey(type, id));

        if (value === null) {
          reject(new Error(type + '#' + id + ' not found'));

          return;
        }

        resolve(value);
      });
    },
    create: function create(type, payload) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var id = _this2.identify(payload);

        _this2.store.setItem(_this2.storageKey(type, id), payload);
        resolve(payload);
      });
    },
    update: function update(type, id, payload) {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.store.setItem(_this3.storageKey(type, id), payload);
        resolve(payload);
      });
    },
    storageKey: function storageKey(type, id) {
      return type + '.' + id;
    },
    identify: function identify(payload) {
      var keys = Object.keys(payload);

      if (keys.length === 1 && _typeof(payload[keys[0]]) === 'object') {
        return (0, _setGuidFor2.default)(payload[keys[0]]);
      }

      return (0, _setGuidFor2.default)(payload);
    }
  });

  exports.default = LocalStorageAdapter;
});
define('shopify-buy/ajax', ['exports', './ie9-ajax', './metal/global'], function (exports, _ie9Ajax, _global) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ajax;

  var _ie9Ajax2 = _interopRequireDefault(_ie9Ajax);

  var _global2 = _interopRequireDefault(_global);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    var error = new Error(response.statusText);

    error.status = response.status;
    error.response = response;
    throw error;
  }

  function parseResponse(response) {
    return response.json().then(function (json) {
      return { json: json, originalResponse: response, isJSON: true };
    }).catch(function () {
      var responseClone = response.clone();

      return responseClone.text().then(function (text) {
        return { text: text, originalResponse: responseClone, isText: true };
      });
    });
  }

  function ajax(method, url) {
    var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    if (_global2.default.XDomainRequest) {
      return _ie9Ajax2.default.apply(undefined, arguments);
    }

    opts.method = method;
    opts.mode = 'cors';

    return fetch(url, opts).then(checkStatus).then(parseResponse);
  }
});
define('shopify-buy/config', ['exports', './metal/core-object', './logger'], function (exports, _coreObject, _logger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _coreObject2 = _interopRequireDefault(_coreObject);

  var _logger2 = _interopRequireDefault(_logger);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @module shopify-buy
   * @submodule config
   */

  var Config = _coreObject2.default.extend({
    constructor: function constructor(attrs) {
      var _this = this;

      Object.keys(this.deprecatedProperties).forEach(function (key) {
        if (attrs.hasOwnProperty(key)) {
          var transformName = _this.deprecatedProperties[key];
          var transform = _this[transformName];

          transform(attrs[key], attrs);
        }
      });
      this.requiredProperties.forEach(function (key) {
        if (!attrs.hasOwnProperty(key)) {
          throw new Error('new Config() requires the option \'' + key + '\'');
        } else {
          _this[key] = attrs[key];
        }
      });
    },


    /**
     * An object with keys for deprecated properties and values as functions that
     * will transform the value into a usable value. A depracation transform should
     * have the value signature function(deprecated_value, config_to_be_transformed)
     * @attribute deprecatedProperties
     * @default { myShopifyDomain: this.transformMyShopifyDomain }
     * @type Object
     * @private
     */
    deprecatedProperties: {
      myShopifyDomain: 'transformMyShopifyDomain'
    },

    transformMyShopifyDomain: function transformMyShopifyDomain(subdomain, attrs) {
      _logger2.default.warn('Config - ', 'myShopifyDomain is deprecated, please use domain and provide the full shop domain.');
      attrs.domain = subdomain + '.myshopify.com';
    },


    /**
     * Properties that must be set on initializations
     * @attribute requiredProperties
     * @default ['apiKey', 'appId', 'myShopifyDomain']
     * @type Array
     * @private
     */
    requiredProperties: ['apiKey', 'appId', 'domain'],

    /**
     * The apiKey for authenticating against shopify. This is your api client's
     * public api token. Not the shared secret. Set during initialation.
     * @attribute apiKey
     * @default ''
     * @type String
     * @public
     */
    apiKey: '',

    /**
     * @attribute appId
     * @default ''
     * @type String
     * @public
     */
    appId: '',

    /**
     * The domain that all the api requests will go to
     * @attribute domain
     * @default ''
     * @type String
     * @public
     */
    domain: '',

    /**
     * The subdomain of myshopify.io that all the api requests will go to
     * @attribute myShopifyDomain
     * @default ''
     * @type String
     * @public
     * @deprecated Use `config.domain` instead.
     */
    myShopifyDomain: ''
  });

  exports.default = Config;
});
define('shopify-buy/ie9-ajax', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function authToUrl(url, opts) {
    var authorization = void 0;

    if (opts.headers) {
      Object.keys(opts.headers).forEach(function (key) {
        if (key.toLowerCase() === 'authorization') {
          authorization = opts.headers[key];
        }
      });
    }

    if (authorization) {
      var hashedKey = authorization.split(' ').slice(-1)[0];

      try {
        var plainKey = atob(hashedKey);

        var newUrl = void 0;

        if (url.indexOf('?') > -1) {
          newUrl = url + '&_x_http_authorization=' + plainKey;
        } else {
          newUrl = url + '?_x_http_authorization=' + plainKey;
        }

        return newUrl;
      } catch (e) {
        // atob choked on non-encoded data. Therefore, not a form of auth we
        // support.
        //
        // NOOP
        //
      }
    }

    /* eslint newline-before-return: 0 */
    return url;
  }

  function ie9Ajax(method, url, opts) {
    return new Promise(function (resolve, reject) {
      var xdr = new XDomainRequest();

      xdr.onload = function () {
        try {
          var json = JSON.parse(xdr.responseText);

          resolve({ json: json, originalResponse: xdr, isJSON: true });
        } catch (e) {
          resolve({ text: xdr.responseText, originalResponse: xdr, isText: true });
        }
      };

      function handleError() {
        reject(new Error('There was an error with the XDR'));
      }

      xdr.onerror = handleError;
      xdr.ontimeout = handleError;

      xdr.open(method, authToUrl(url, opts));
      xdr.send(opts.data);
    });
  }

  exports.default = ie9Ajax;
});
define('shopify-buy/isomorphic-btoa', ['./metal/global', './metal/is-node-like-environment'], function (_global, _isNodeLikeEnvironment) {
  'use strict';

  var _global2 = _interopRequireDefault(_global);

  var _isNodeLikeEnvironment2 = _interopRequireDefault(_isNodeLikeEnvironment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* global Buffer */

  var btoa = _global2.default.btoa;

  if (!btoa && (0, _isNodeLikeEnvironment2.default)()) {
    _global2.default.btoa = function (string) {
      return new Buffer(string).toString('base64');
    };
  }
});
define('shopify-buy/isomorphic-fetch', ['./metal/global', './metal/is-node-like-environment'], function (_global, _isNodeLikeEnvironment) {
  'use strict';

  var _global2 = _interopRequireDefault(_global);

  var _isNodeLikeEnvironment2 = _interopRequireDefault(_isNodeLikeEnvironment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* globals require */

  var fetch = _global2.default.fetch;

  if (!fetch && (0, _isNodeLikeEnvironment2.default)()) {
    /* this indirection is needed because babel throws errors when
     * transpiling require('node-fetch') using `amd` plugin with babel6
     */
    var localRequire = require;

    _global2.default.fetch = localRequire('node-fetch');
    _global2.default.Response = _global2.default.fetch.Response;
  }
});
define('shopify-buy/logger', ['exports', './metal/core-object'], function (exports, _coreObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.wrapConsole = undefined;

  var _coreObject2 = _interopRequireDefault(_coreObject);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function wrapConsole(logCommand) {
    var logMethod = function logMethod() {
      /* eslint-disable no-console */
      if (console[logCommand]) {
        var _console;

        (_console = console)[logCommand].apply(_console, arguments);
      } else {
        var _console2;

        (_console2 = console).log.apply(_console2, arguments);
      }
      /* eslint-enable no-console */
    };

    return function () {
      var args = [].concat(Array.prototype.slice.call(arguments));

      args.unshift('[JS-BUY-SDK]: ');
      logMethod.apply(undefined, _toConsumableArray(args));
    };
  }

  var Logger = _coreObject2.default.extend({
    constructor: function constructor() {},

    debug: wrapConsole('debug'),
    info: wrapConsole('info'),
    warn: wrapConsole('warn'),
    error: wrapConsole('error')
  });

  exports.wrapConsole = wrapConsole;
  exports.default = new Logger();
});
define('shopify-buy/metal/assign', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* eslint no-undefined: 0 */

  var assign = void 0;

  if (typeof Object.assign === 'function') {
    assign = Object.assign;
  } else {
    assign = function assign(target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);

      var propertyObjects = [].slice.call(arguments, 1);

      if (propertyObjects.length > 0) {
        propertyObjects.forEach(function (source) {
          if (source !== undefined && source !== null) {
            var nextKey = void 0;

            for (nextKey in source) {
              if (source.hasOwnProperty(nextKey)) {
                output[nextKey] = source[nextKey];
              }
            }
          }
        });
      }

      return output;
    };
  }

  exports.default = assign;
});
define('shopify-buy/metal/core-object', ['exports', './create-class'], function (exports, _createClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass2 = _interopRequireDefault(_createClass);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var CoreObject = (0, _createClass2.default)({
    constructor: function constructor() {},


    static: {
      extend: function extend(subClassProps) {
        return (0, _createClass2.default)(subClassProps, this);
      }
    }
  });

  exports.default = CoreObject;
});
define('shopify-buy/metal/create-class', ['exports', './assign', './includes'], function (exports, _assign, _includes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assign2 = _interopRequireDefault(_assign);

  var _includes2 = _interopRequireDefault(_includes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function wrap(func, superFunc) {
    function superWrapper() {
      var originalSuper = this.super;

      this.super = function () {
        return superFunc.apply(this, arguments);
      };

      var ret = func.apply(this, arguments);

      this.super = originalSuper;

      return ret;
    }

    superWrapper.wrappedFunction = func;

    return superWrapper;
  }

  function defineProperties(names, proto, destination) {
    var parentProto = Object.getPrototypeOf(destination);

    names.forEach(function (name) {
      var descriptor = Object.getOwnPropertyDescriptor(proto, name);
      var parentDescriptor = parentProto.hasOwnProperty(name) && Object.getOwnPropertyDescriptor(parentProto, name);

      if (typeof parentDescriptor.value === 'function' && typeof descriptor.value === 'function') {
        var wrappedFunction = wrap(descriptor.value, parentDescriptor.value);

        Object.defineProperty(destination, name, { value: wrappedFunction });
      } else {
        Object.defineProperty(destination, name, descriptor);
      }
    });
  }

  function createClass(props) {
    var parent = arguments.length <= 1 || arguments[1] === undefined ? Object : arguments[1];

    var Constructor = wrap(props.constructor, parent);
    var instancePropertyNames = Object.getOwnPropertyNames(props).filter(function (key) {
      return !(0, _includes2.default)(['constructor', 'static'], key);
    });

    (0, _assign2.default)(Constructor, parent);

    Constructor.prototype = Object.create(parent.prototype);
    defineProperties(instancePropertyNames, props, Constructor.prototype);
    Constructor.prototype.constructor = Constructor;

    var staticProps = props.static;

    if (staticProps) {
      var staticPropertyNames = Object.getOwnPropertyNames(staticProps);

      defineProperties(staticPropertyNames, staticProps, Constructor);
    }

    return Constructor;
  }

  exports.default = createClass;
});
define('shopify-buy/metal/global', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /* global global */

  var globalNamespace = void 0;

  if (typeof global === 'undefined') {
    globalNamespace = window;
  } else {
    globalNamespace = global;
  }

  exports.default = globalNamespace;
});
define("shopify-buy/metal/includes", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var includes = void 0;

  if (!Array.prototype.includes) {
    includes = function includes(array, searchElement) {
      var ObjectifiedArray = Object(array);
      var length = parseInt(ObjectifiedArray.length, 10) || 0;

      if (length === 0) {
        return false;
      }

      var startIndex = parseInt(arguments[1], 10) || 0;
      var index = void 0;

      if (startIndex >= 0) {
        index = startIndex;
      } else {
        index = length + startIndex;

        if (index < 0) {
          index = 0;
        }
      }

      while (index < length) {
        var currentElement = ObjectifiedArray[index];

        /* eslint no-self-compare:0 */
        if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
          // NaN !== NaN
          return true;
        }
        index++;
      }

      return false;
    };
  } else {
    includes = function includes(array) {
      var args = [].slice.call(arguments, 1);

      return Array.prototype.includes.apply(array, args);
    };
  }

  exports.default = includes;
});
define('shopify-buy/metal/is-node-like-environment', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isNodeLikeEnvironment;
  function isNodeLikeEnvironment() {
    var windowAbsent = typeof window === 'undefined';
    var requirePresent = typeof require === 'function';

    return windowAbsent && requirePresent;
  }
});
define('shopify-buy/metal/set-guid-for', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  /* eslint no-undefined: 0 complexity: 0 */

  var GUID_KEY = 'shopify-buy-uuid';

  var GUID_PREFIX = 'shopify-buy.' + Date.now();

  var GUID_DESC = {
    writable: true,
    configurable: true,
    enumerable: true,
    value: null
  };

  var uuidSeed = 0;

  function uuid() {
    return ++uuidSeed;
  }

  var numberCache = {};
  var stringCache = {};

  function setGuidFor(obj) {
    if (obj && obj[GUID_KEY]) {
      return obj[GUID_KEY];
    }

    if (obj === undefined) {
      return '(undefined)';
    }

    if (obj === null) {
      return '(null)';
    }

    var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    var id = void 0;

    switch (type) {
      case 'number':
        id = numberCache[obj];

        if (!id) {
          id = numberCache[obj] = 'nu' + obj;
        }

        break;

      case 'string':
        id = stringCache[obj];

        if (!id) {
          id = stringCache[obj] = 'st' + uuid();
        }

        break;

      case 'boolean':
        if (obj) {
          id = '(true)';
        } else {
          id = '(false)';
        }

        break;

      default:
        if (obj === Object) {
          id = '(Object)';
          break;
        }

        if (obj === Array) {
          id = '(Array)';
          break;
        }

        id = GUID_PREFIX + '.' + uuid();

        if (obj[GUID_KEY] === null) {
          obj[GUID_KEY] = id;
        } else {
          GUID_DESC.value = id;
          Object.defineProperty(obj, GUID_KEY, GUID_DESC);
        }
    }

    return id;
  }

  exports.default = setGuidFor;
  exports.GUID_KEY = GUID_KEY;
});
define("shopify-buy/metal/uniq", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (array) {
    return array.reduce(function (uniqueArray, item) {
      if (uniqueArray.indexOf(item) < 0) {
        uniqueArray.push(item);
      }

      return uniqueArray;
    }, []);
  };
});
define('shopify-buy/models/base-model', ['exports', '../metal/core-object', '../metal/assign'], function (exports, _coreObject, _assign) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _coreObject2 = _interopRequireDefault(_coreObject);

  var _assign2 = _interopRequireDefault(_assign);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var BaseModel = _coreObject2.default.extend({
    constructor: function constructor() {
      var attrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var metaAttrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      this.attrs = attrs;

      (0, _assign2.default)(this, metaAttrs);
    },

    attrs: null,
    serializer: null,
    adapter: null,
    shopClient: null
  });

  exports.default = BaseModel;
});
define('shopify-buy/models/cart-line-item-model', ['exports', './base-model', '../metal/set-guid-for'], function (exports, _baseModel, _setGuidFor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseModel2 = _interopRequireDefault(_baseModel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var CartLineItem = _baseModel2.default.extend({
    constructor: function constructor() {
      this.super.apply(this, arguments);
    },


    get id() {
      return this.attrs[_setGuidFor.GUID_KEY];
    },

    get variant_id() {
      return this.attrs.variant_id;
    },

    get product_id() {
      return this.attrs.product_id;
    },

    get image() {
      return this.attrs.image;
    },

    get title() {
      return this.attrs.title;
    },

    get quantity() {
      return this.attrs.quantity;
    },

    set quantity(value) {
      var parsedValue = parseInt(value, 10);

      if (parsedValue < 0) {
        throw new Error('Quantities must be positive');
      } else if (parsedValue !== parseFloat(value)) {
        /* incidentally, this covers all NaN values, because NaN !== Nan */
        throw new Error('Quantities must be whole numbers');
      }

      this.attrs.quantity = parsedValue;

      return this.attrs.quantity;
    },

    get properties() {
      return this.attrs.properties || {};
    },

    set properties(value) {
      this.attrs.properties = value || {};

      return value;
    },

    get variant_title() {
      return this.attrs.variant_title;
    },

    get price() {
      return this.attrs.price;
    },

    get compare_at_price() {
      return this.attrs.compare_at_price;
    },

    get line_price() {
      return (this.quantity * parseFloat(this.price)).toFixed(2);
    },

    get grams() {
      return this.attrs.grams;
    }
  });

  exports.default = CartLineItem;
});
define('shopify-buy/models/cart-model', ['exports', './base-model', './cart-line-item-model', '../metal/assign', '../metal/set-guid-for', '../metal/global'], function (exports, _baseModel, _cartLineItemModel, _assign, _setGuidFor, _global) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseModel2 = _interopRequireDefault(_baseModel);

  var _cartLineItemModel2 = _interopRequireDefault(_cartLineItemModel);

  var _assign2 = _interopRequireDefault(_assign);

  var _setGuidFor2 = _interopRequireDefault(_setGuidFor);

  var _global2 = _interopRequireDefault(_global);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  function objectsEqual(one, two) {
    if (one === two) {
      return true;
    }

    return Object.keys(one).every(function (key) {
      if (one[key] instanceof Date) {
        return one[key].toString() === two[key].toString();
      } else if (_typeof(one[key]) === 'object') {
        return objectsEqual(one[key], two[key]);
      }

      return one[key] === two[key];
    });
  }

  var CartModel = _baseModel2.default.extend({
    constructor: function constructor() {
      this.super.apply(this, arguments);
    },


    /**
      * get ID for current cart
      * @property id
      * @type {String}
    */
    get id() {
      return this.attrs[_setGuidFor.GUID_KEY];
    },

    /**
      * Get current line items for cart
      * @property lineItems
      * @type {Array}
    */
    get lineItems() {
      return (this.attrs.line_items || []).map(function (item) {
        return new _cartLineItemModel2.default(item);
      });
    },

    /**
      * Gets the sum quantity of each line item
      * @property lineItemCount
      * @type {Number}
    */
    get lineItemCount() {
      return this.lineItems.reduce(function (total, item) {
        return total + item.quantity;
      }, 0);
    },

    /**
      * Get current subtotal price for all line items
      * @property subtotal
      * @type {String}
    */
    get subtotal() {
      var subtotal = this.lineItems.reduce(function (runningTotal, lineItem) {
        return runningTotal + parseFloat(lineItem.line_price);
      }, 0);

      return subtotal.toFixed(2);
    },

    /**
      * Get checkout URL for current cart
      * @property checkoutUrl
      * @type {String}
    */
    get checkoutUrl() {
      var config = this.config;
      var baseUrl = 'https://' + config.domain + '/cart';

      var variantPath = this.lineItems.map(function (item) {
        return item.variant_id + ':' + item.quantity;
      });

      var query = 'api_key=' + config.apiKey;

      if (typeof _global2.default.ga === 'function') {
        var linkerParam = void 0;

        _global2.default.ga(function (tracker) {
          linkerParam = tracker.get('linkerParam');
        });

        if (linkerParam) {
          query += '&' + linkerParam;
        }
      }

      return baseUrl + '/' + variantPath + '?' + query;
    },

    addVariants: function addVariants() {
      var newLineItems = [].concat(Array.prototype.slice.call(arguments)).map(function (item) {
        var lineItem = {
          image: item.variant.image,
          variant_id: item.variant.id,
          product_id: item.variant.productId,
          title: item.variant.productTitle,
          quantity: parseInt(item.quantity, 10),
          properties: item.properties || {},
          variant_title: item.variant.title,
          price: item.variant.price,
          compare_at_price: item.variant.compareAtPrice,
          grams: item.variant.grams
        };

        (0, _setGuidFor2.default)(lineItem);

        return lineItem;
      });
      var existingLineItems = this.attrs.line_items;

      existingLineItems.push.apply(existingLineItems, _toConsumableArray(newLineItems));

      var dedupedLineItems = existingLineItems.reduce(function (itemAcc, item) {
        var matchingItem = itemAcc.filter(function (existingItem) {
          return existingItem.variant_id === item.variant_id && objectsEqual(existingItem.properties, item.properties);
        })[0];

        if (matchingItem) {
          matchingItem.quantity = matchingItem.quantity + item.quantity;
        } else {
          itemAcc.push(item);
        }

        return itemAcc;
      }, []);

      // Users may pass negative numbers and remove items. This ensures there's no
      // item with a quantity of zero or less.
      this.attrs.line_items = dedupedLineItems.reduce(function (itemAcc, item) {
        if (item.quantity >= 1) {
          itemAcc.push(item);
        }

        return itemAcc;
      }, []);

      return this.updateModel();
    },
    updateLineItem: function updateLineItem(id, quantity) {
      if (quantity < 1) {
        return this.removeLineItem(id);
      }

      var lineItem = this.lineItems.filter(function (item) {
        return item.id === id;
      })[0];

      if (lineItem) {
        lineItem.quantity = quantity;

        return this.updateModel();
      }

      return new Promise(function (resolve, reject) {
        reject(new Error('line item with id: ' + id + ' not found in cart#' + this.id));
      });
    },
    removeLineItem: function removeLineItem(id) {
      var oldLength = this.lineItems.length;
      var newLineItems = this.lineItems.filter(function (item) {
        return item.id !== id;
      });
      var newLength = newLineItems.length;

      if (newLength < oldLength) {
        this.attrs.line_items = newLineItems.map(function (item) {
          return item.attrs;
        });

        return this.updateModel();
      }

      return new Promise(function (resolve, reject) {
        reject(new Error('line item with id: ' + id + ' not found in cart#' + this.id));
      });
    },
    clearLineItems: function clearLineItems() {
      this.attrs.line_items = [];

      return this.updateModel();
    },
    updateModel: function updateModel() {
      var _this = this;

      return this.shopClient.update('carts', this).then(function (updateCart) {
        (0, _assign2.default)(_this.attrs, updateCart.attrs);

        return _this;
      });
    }
  });

  exports.default = CartModel;
});
define('shopify-buy/models/product-model', ['exports', './base-model', './product-option-model', './product-variant-model', '../metal/uniq'], function (exports, _baseModel, _productOptionModel, _productVariantModel, _uniq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NO_IMAGE_URI = undefined;

  var _baseModel2 = _interopRequireDefault(_baseModel);

  var _productOptionModel2 = _interopRequireDefault(_productOptionModel);

  var _productVariantModel2 = _interopRequireDefault(_productVariantModel);

  var _uniq2 = _interopRequireDefault(_uniq);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var NO_IMAGE_URI = 'https://widgets.shopifyapps.com/assets/no-image.svg';

  /**
     * Class for products returned by fetch('product')
     * @class ProductModel
     * @constructor
   */
  var ProductModel = _baseModel2.default.extend({
    constructor: function constructor() {
      this.super.apply(this, arguments);
    },


    /**
      * Product unique ID
      * @property id
      * @type {String}
    */
    get id() {
      return this.attrs.product_id;
    },

    /**
      * Product title
      * @property title
      * @type {String}
    */
    get title() {
      return this.attrs.title;
    },

    /**
      * Product description. The exposes the `body_html` property on the listings API
      * @property description
      * @type {String}
    */
    get description() {
      return this.attrs.body_html;
    },

    /**
      * All images associated with product.
      * @property images
      * @type {Array} array of image objects.
    */
    get images() {
      return this.attrs.images;
    },

    get memoized() {
      this._memoized = this._memoized || {};

      return this._memoized;
    },

    /**
       *  Get array of options with nested values. Useful for creating UI for selecting options.
       *
       * ```javascript
       *  var elements = product.options.map(function(option) {
       *    return '<select name="' + option.name + '">' + option.values.map(function(value) {
       *      return '<option value="' + value + '">' + value + '</option>';
       *    }) + '</select>';
       *  });
       * ```
       *
       * @attribute options
       * @type {Array|Option}
     */
    get options() {
      if (this.memoized.options) {
        return this.memoized.options;
      }

      var baseOptions = this.attrs.options;
      var variants = this.variants;

      this.memoized.options = baseOptions.map(function (option) {
        var name = option.name;

        var dupedValues = variants.reduce(function (valueList, variant) {
          var optionValueForOption = variant.optionValues.filter(function (optionValue) {
            return optionValue.name === option.name;
          })[0];

          valueList.push(optionValueForOption.value);

          return valueList;
        }, []);

        var values = (0, _uniq2.default)(dupedValues);

        return new _productOptionModel2.default({ name: name, values: values });
      });

      return this.memoized.options;
    },

    /**
      * All variants of a product.
      * @property variants
      * @type {Array|ProductVariantModel} array of ProductVariantModel instances.
    */
    get variants() {
      var _this = this;

      return this.attrs.variants.map(function (variant) {
        return new _productVariantModel2.default({ variant: variant, product: _this }, { config: _this.config });
      });
    },

    /**
      * Retrieve currently selected option values.
      * @attribute selections
      * @type {Option}
    */
    get selections() {
      return this.options.map(function (option) {
        return option.selected;
      });
    },

    /**
      * Retrieve variant for currently selected options
      * @attribute selectedVariant
      * @type {Object}
    */
    get selectedVariant() {
      var variantTitle = this.selections.join(' / ');

      return this.variants.filter(function (variant) {
        return variant.title === variantTitle;
      })[0] || null;
    },

    /**
      * Retrieve image for currently selected variantImage
      * @attribute selectedVariantImage
      * @type {Object}
    */
    get selectedVariantImage() {
      if (!this.selectedVariant) {
        return null;
      }

      return this.selectedVariant.image;
    }
  });

  exports.default = ProductModel;
  exports.NO_IMAGE_URI = NO_IMAGE_URI;
});
define('shopify-buy/models/product-option-model', ['exports', './base-model', '../metal/includes'], function (exports, _baseModel, _includes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseModel2 = _interopRequireDefault(_baseModel);

  var _includes2 = _interopRequireDefault(_includes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
    * Class for product option
    * @class Option
    * @constructor
  */
  var ProductOptionModel = _baseModel2.default.extend({
    constructor: function constructor() {
      this.super.apply(this, arguments);

      this.selected = this.values[0];
    },


    /**
      * name of option (ex. "Size", "Color")
      * @property name
      * @type String
    */
    get name() {
      return this.attrs.name;
    },

    /**
      * possible values for selection
      * @property values
      * @type Array
    */
    get values() {
      return this.attrs.values;
    },

    /**
      * get/set selected option value (ex. "Large"). Setting this will update the
      * selected value on the model. Throws {Error} if setting selected to value that does not exist for option
      * @property selected
      * @type String
    */
    get selected() {
      return this._selected;
    },

    set selected(value) {
      if ((0, _includes2.default)(this.values, value)) {
        this._selected = value;
      } else {
        throw new Error('Invalid option selection for ' + this.name + '.');
      }

      return value;
    }
  });

  exports.default = ProductOptionModel;
});
define('shopify-buy/models/product-variant-model', ['exports', './base-model'], function (exports, _baseModel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseModel2 = _interopRequireDefault(_baseModel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
    * Model for product variant
    * @class ProductVariantModel
    * @constructor
  */
  var ProductVariantModel = _baseModel2.default.extend({
    constructor: function constructor() {
      this.super.apply(this, arguments);
    },


    /**
      * Variant unique ID
      * @property id
      * @type {String}
    */
    get id() {
      return this.attrs.variant.id;
    },

    /**
      * ID of product variant belongs to
      * @property productId
      * @type {String}
    */
    get productId() {
      return this.attrs.product.id;
    },

    /**
      * Title of variant
      * @property title
      * @type {String}
    */
    get title() {
      return this.attrs.variant.title;
    },

    /**
      * Title of product variant belongs to
      * @property productTitle
      * @type {String}
    */
    get productTitle() {
      return this.attrs.product.title;
    },

    /**
      * <a href="https://docs.shopify.com/manual/products/promoting-marketing/sales">
      * Compare at</a> price for variant formatted as currency.
      * @property compareAtPrice
      * @type {String}
    */
    get compareAtPrice() {
      return this.attrs.variant.compare_at_price;
    },

    /**
      * Price of variant, formatted as currency
      * @property price
      * @type {String}
    */
    get price() {
      return this.attrs.variant.price;
    },

    /**
      * Variant weight in grams
      * @property grams
      * @type {Number}
    */
    get grams() {
      return this.attrs.variant.grams;
    },

    /**
      * Option values associated with this variant, ex {name: "color", value: "Blue"}
      * @property optionValues
      * @type {Array|Object}
    */
    get optionValues() {
      return this.attrs.variant.option_values;
    },

    /**
      * Variant in stock (always true if inventory tracking is disabled)
      * @property available
      * @type {Boolean}
    */
    get available() {
      return this.attrs.variant.available;
    },

    /**
      * Image for variant
      * @property image
      * @type {Object}
    */
    get image() {
      var id = this.id;
      var images = this.attrs.product.images;

      var primaryImage = images[0];
      var variantImage = images.filter(function (image) {
        return image.variant_ids.indexOf(id) !== -1;
      })[0];

      return variantImage || primaryImage;
    },

    /**
      * Image variants available for a variant, ex [ {"name":"pico","dimension":"16x16","src":"https://cdn.shopify.com/image-two_pico.jpg"} ]
      * See <a href="https://help.shopify.com/themes/liquid/filters/url-filters#size-parameters"> for list of available variants.</a>
      * @property imageVariant
      * @type {Array}
    */
    get imageVariants() {
      var image = this.image;

      if (!image) {
        return [];
      }

      var src = this.image.src;
      var extensionIndex = src.lastIndexOf('.');
      var pathAndBasename = src.slice(0, extensionIndex);
      var extension = src.slice(extensionIndex);
      var variants = [{ name: 'pico', dimension: '16x16' }, { name: 'icon', dimension: '32x32' }, { name: 'thumb', dimension: '50x50' }, { name: 'small', dimension: '100x100' }, { name: 'compact', dimension: '160x160' }, { name: 'medium', dimension: '240x240' }, { name: 'large', dimension: '480x480' }, { name: 'grande', dimension: '600x600' }, { name: '1024x1024', dimension: '1024x1024' }, { name: '2048x2048', dimension: '2048x2048' }];

      variants.forEach(function (variant) {
        variant.src = pathAndBasename + '_' + variant.name + extension;
      });

      return variants;
    },

    checkoutUrl: function checkoutUrl() {
      var quantity = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      var config = this.config;
      var baseUrl = 'https://' + config.domain + '/cart';

      var variantPath = this.id + ':' + parseInt(quantity, 10);

      var query = 'api_key=' + config.apiKey;

      return baseUrl + '/' + variantPath + '?' + query;
    }
  });

  exports.default = ProductVariantModel;
});
define('shopify-buy/models/reference-model', ['exports', './base-model', '../metal/set-guid-for'], function (exports, _baseModel, _setGuidFor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _baseModel2 = _interopRequireDefault(_baseModel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ReferenceModel = _baseModel2.default.extend({
    constructor: function constructor(attrs) {
      if (Object.keys(attrs).indexOf('referenceId') < 0) {
        throw new Error('Missing key referenceId of reference. References to null are not allowed');
      }

      this.super.apply(this, arguments);
    },


    /**
      * get the ID for current reference (not what it refers to, but its own unique identifier)
      * @property id
      * @type {String}
    */
    get id() {
      return this.attrs[_setGuidFor.GUID_KEY];
    },

    get referenceId() {
      return this.attrs.referenceId;
    },
    set referenceId(value) {
      this.attrs.referenceId = value;

      return value;
    }

  });

  exports.default = ReferenceModel;
});
define('shopify-buy/serializers/cart-serializer', ['exports', '../metal/core-object', '../metal/assign', '../models/cart-model'], function (exports, _coreObject, _assign, _cartModel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _coreObject2 = _interopRequireDefault(_coreObject);

  var _assign2 = _interopRequireDefault(_assign);

  var _cartModel2 = _interopRequireDefault(_cartModel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var CartSerializer = _coreObject2.default.extend({
    constructor: function constructor(config) {
      this.config = config;
    },
    rootKeyForType: function rootKeyForType(type) {
      return type.slice(0, -1);
    },
    modelForType: function modelForType() /* type */{
      return _cartModel2.default;
    },
    deserializeSingle: function deserializeSingle(type) {
      var singlePayload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var metaAttrs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var modelAttrs = singlePayload[this.rootKeyForType(type)];
      var model = this.modelFromAttrs(type, modelAttrs, metaAttrs);

      return model;
    },
    modelFromAttrs: function modelFromAttrs(type, attrs, metaAttrs) {
      var Model = this.modelForType(type);

      metaAttrs.config = this.config;

      return new Model(attrs, metaAttrs);
    },
    serialize: function serialize(type, model) {
      var root = this.rootKeyForType(type);
      var payload = {};
      var attrs = (0, _assign2.default)({}, model.attrs);

      payload[root] = attrs;

      delete attrs.attributes;

      Object.keys(attrs).forEach(function (key) {
        var value = attrs[key];

        if (value === null || typeof value === 'string' && value.length === 0) {
          delete attrs[key];
        }
      });

      return payload;
    }
  });

  exports.default = CartSerializer;
});
define('shopify-buy/serializers/listings-serializer', ['exports', '../metal/core-object', '../models/base-model', '../models/product-model'], function (exports, _coreObject, _baseModel, _productModel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _coreObject2 = _interopRequireDefault(_coreObject);

  var _baseModel2 = _interopRequireDefault(_baseModel);

  var _productModel2 = _interopRequireDefault(_productModel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ListingsSerializer = _coreObject2.default.extend({
    constructor: function constructor(config) {
      this.config = config;
    },
    rootKeyForType: function rootKeyForType(type) {
      return type.slice(0, -1) + '_listing';
    },


    models: {
      collections: _baseModel2.default,
      products: _productModel2.default
    },

    modelForType: function modelForType(type) {
      return this.models[type];
    },
    deserializeSingle: function deserializeSingle(type) {
      var singlePayload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var metaAttrs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var modelAttrs = singlePayload[this.rootKeyForType(type)];
      var model = this.modelFromAttrs(type, modelAttrs, metaAttrs);

      return model;
    },
    deserializeMultiple: function deserializeMultiple(type) {
      var _this = this;

      var collectionPayload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var metaAttrs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var models = collectionPayload[this.rootKeyForType(type) + 's'];

      return models.map(function (attrs) {
        var model = _this.modelFromAttrs(type, attrs, metaAttrs);

        return model;
      });
    },
    modelFromAttrs: function modelFromAttrs(type, attrs, metaAttrs) {
      var Model = this.modelForType(type);

      metaAttrs.config = this.config;

      return new Model(attrs, metaAttrs);
    }
  });

  exports.default = ListingsSerializer;
});
define('shopify-buy/serializers/reference-serializer', ['exports', '../metal/core-object', '../metal/assign', '../models/reference-model'], function (exports, _coreObject, _assign, _referenceModel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _coreObject2 = _interopRequireDefault(_coreObject);

  var _assign2 = _interopRequireDefault(_assign);

  var _referenceModel2 = _interopRequireDefault(_referenceModel);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ReferenceSerializer = _coreObject2.default.extend({
    constructor: function constructor(config) {
      this.config = config;
    },
    modelForType: function modelForType() /* type */{
      return _referenceModel2.default;
    },
    deserializeSingle: function deserializeSingle(type) {
      var singlePayload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var metaAttrs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var Model = this.modelForType(type);

      return new Model(singlePayload, metaAttrs);
    },
    serialize: function serialize(type, model) {
      var attrs = (0, _assign2.default)({}, model.attrs);

      return attrs;
    }
  });

  exports.default = ReferenceSerializer;
});
define('shopify-buy/shop-client', ['exports', './serializers/listings-serializer', './adapters/listings-adapter', './serializers/cart-serializer', './serializers/reference-serializer', './adapters/local-storage-adapter', './metal/core-object', './metal/assign', './metal/set-guid-for'], function (exports, _listingsSerializer, _listingsAdapter, _cartSerializer, _referenceSerializer, _localStorageAdapter, _coreObject, _assign, _setGuidFor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _listingsSerializer2 = _interopRequireDefault(_listingsSerializer);

  var _listingsAdapter2 = _interopRequireDefault(_listingsAdapter);

  var _cartSerializer2 = _interopRequireDefault(_cartSerializer);

  var _referenceSerializer2 = _interopRequireDefault(_referenceSerializer);

  var _localStorageAdapter2 = _interopRequireDefault(_localStorageAdapter);

  var _coreObject2 = _interopRequireDefault(_coreObject);

  var _assign2 = _interopRequireDefault(_assign);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @module shopify-buy
   * @submodule shop-client
   */

  function fetchFactory(fetchType, type) {
    var func = void 0;

    switch (fetchType) {
      case 'all':
        func = function func() {
          return this.fetchAll(type);
        };
        break;
      case 'one':
        func = function func() {
          return this.fetch.apply(this, [type].concat(Array.prototype.slice.call(arguments)));
        };
        break;
      case 'query':
        func = function func() {
          return this.fetchQuery.apply(this, [type].concat(Array.prototype.slice.call(arguments)));
        };
        break;
    }

    return func;
  }

  var ShopClient = _coreObject2.default.extend({
    constructor: function constructor(config) {
      this.config = config;

      this.serializers = {
        products: _listingsSerializer2.default,
        collections: _listingsSerializer2.default,
        carts: _cartSerializer2.default,
        references: _referenceSerializer2.default
      };

      this.adapters = {
        products: _listingsAdapter2.default,
        collections: _listingsAdapter2.default,
        carts: _localStorageAdapter2.default,
        references: _localStorageAdapter2.default
      };
    },


    config: null,

    /**
     * @attribute
     * @default {
     *  products: ListingsAdapter,
     *  collections: ListingsAdapter,
     *  carts: CartAdapter
     * }
     * @type Object
     * @protected
     */
    // Prevent leaky state
    get serializers() {
      return (0, _assign2.default)({}, this.shadowedSerializers);
    },

    set serializers(values) {
      this.shadowedSerializers = (0, _assign2.default)({}, values);
    },

    get adapters() {
      return (0, _assign2.default)({}, this.shadowedAdapters);
    },

    set adapters(values) {
      this.shadowedAdapters = (0, _assign2.default)({}, values);
    },

    fetchAll: function fetchAll(type) {
      var _this = this;

      var adapter = new this.adapters[type](this.config);

      return adapter.fetchMultiple(type).then(function (payload) {
        return _this.deserialize(type, payload, adapter, null, { multiple: true });
      });
    },
    fetch: function fetch(type, id) {
      var _this2 = this;

      var adapter = new this.adapters[type](this.config);

      return adapter.fetchSingle(type, id).then(function (payload) {
        return _this2.deserialize(type, payload, adapter, null, { single: true });
      });
    },
    fetchQuery: function fetchQuery(type, query) {
      var _this3 = this;

      var adapter = new this.adapters[type](this.config);

      return adapter.fetchMultiple(type, query).then(function (payload) {
        return _this3.deserialize(type, payload, adapter, null, { multiple: true });
      });
    },
    create: function create(type) {
      var _this4 = this;

      var modelAttrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var adapter = new this.adapters[type](this.config);
      var serializer = new this.serializers[type](this.config);
      var Model = serializer.modelForType(type);
      var model = new Model(modelAttrs, { shopClient: this });
      var attrs = serializer.serialize(type, model);

      return adapter.create(type, attrs).then(function (payload) {
        return _this4.deserialize(type, payload, adapter, serializer, { single: true });
      });
    },
    update: function update(type, updatedModel) {
      var _this5 = this;

      var adapter = updatedModel.adapter;
      var serializer = updatedModel.serializer;
      var serializedModel = serializer.serialize(type, updatedModel);
      var id = updatedModel.attrs[adapter.idKeyForType(type)];

      return adapter.update(type, id, serializedModel).then(function (payload) {
        return _this5.deserialize(type, payload, adapter, serializer, { single: true });
      });
    },
    deserialize: function deserialize(type, payload, adapter, existingSerializer) {
      var opts = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];

      var serializer = existingSerializer || new this.serializers[type](this.config);
      var meta = { shopClient: this, adapter: adapter, serializer: serializer, type: type };
      var serializedPayload = void 0;

      if (opts.multiple) {
        serializedPayload = serializer.deserializeMultiple(type, payload, meta);
      } else {
        serializedPayload = serializer.deserializeSingle(type, payload, meta);
      }

      return serializedPayload;
    },
    createCart: function createCart() {
      var userAttrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var baseAttrs = {
        line_items: []
      };
      var attrs = {};

      (0, _assign2.default)(attrs, baseAttrs);
      (0, _assign2.default)(attrs, userAttrs);

      return this.create('carts', attrs);
    },
    updateCart: function updateCart(updatedCart) {
      return this.update('carts', updatedCart);
    },


    /**
     * Retrieve a previously created cart by its key.
     *
     * ```javascript
     * client.fetchCart('shopify-buy.1459804699118.2').then(cart => {
     *   console.log(cart); // The retrieved cart
     * });
     *
     * @method fetchCart
     * @public
     * @param {String} id The cart's unique identifier
     * @return {Promise|CartModel} The cart model.
     *
     */
    fetchCart: fetchFactory('one', 'carts'),

    /**
     * Convenience wrapper for {{#crossLink "ShopClient/fetchAll:method"}}
     * {{/crossLink}}. Equivalent to:
     *
     * ```javascript
     * client.fetchAll('products');
     * ```
     *
     * @method fetchAllProducts
     * @private
     * @return {Promise|Array} The product models.
     */
    fetchAllProducts: fetchFactory('all', 'products'),

    /**
     * Convenience wrapper for {{#crossLink "ShopClient/fetchAll:method"}}
     * {{/crossLink}}. Equivalent to:
     *
     * ```javascript
     * client.fetchAll('collections');
     * ```
     *
     * @method fetchAllCollections
     * @private
     * @return {Promise|Array} The collection models.
     */
    fetchAllCollections: fetchFactory('all', 'collections'),

    /**
     * Fetch one product by its ID.
     *
     * ```javascript
     * client.fetchProduct(123).then(product => {
     *   console.log(product); // The product with an ID of 123
     * });
     * ```
     *
     * @method fetchProduct
     * @public
     * @param {String|Number} id a unique identifier
     * @return {Promise|BaseModel} The product model with the specified ID.
     */
    fetchProduct: fetchFactory('one', 'products'),

    /**
     * Fetch one collection by its ID.
     *
     * ```javascript
     * client.fetchCollection(123).then(collection => {
     *   console.log(collection); // The collection with an ID of 123
     * });
     * ```
     *
     * @method fetchCollection
     * @public
     * @param {String|Number} id a unique identifier
     * @return {Promise|BaseModel} The collection model with the specified ID.
     */
    fetchCollection: fetchFactory('one', 'collections'),

    /**
     * Fetches a list of products matching a specified query.
     *
     * ```javascript
     * client.fetchQueryProducts({ collection_id: 123, tag: ['hats'] }).then(products => {
     *   console.log(products); // An array of products in collection `123` having the tag `hats`
     * });
     * ```
     * @method fetchQueryProducts
     * @public
     * @param {Object} query A query sent to the api server containing one or more of:
     *   @param {String|Number} [query.collection_id] The ID of a collection to retrieve products from
     *   @param {Array} [query.tag] A list of tags to filter the products by. Accepts up to 10 tags.
     *   @param {Array} [query.product_ids] A list of product IDs to retrieve
     *   @param {String|Number} [query.page=1] The page offset number of the current lookup (based on the `limit`)
     *   @param {String|Number} [query.limit=50] The number of products to retrieve per page
     *   @param {String} [query.handle] The handle of the product to look up
     *   @param {String} [query.updated_at_min] Products updated since the supplied timestamp (format: 2008-12-31 03:00)
     * @return {Promise|Array} The product models.
     */
    fetchQueryProducts: fetchFactory('query', 'products'),

    /**
     * Fetches a list of collections matching a specified query.
     *
     * ```javascript
     * client.fetchQueryCollections({page: 2, limit: 20}).then(collections => {
     *   console.log(collections); // An array of collection resources
     * });
     * ```
     *
     * @method fetchQueryCollections
     * @public
     * @param {Object} query a query sent to the api server.
     *   @param {String|Number} [query.page=1] the page offset number of the current lookup (based on the `limit`)
     *   @param {String|Number} [query.limit=50] the number of collections to retrieve per page
     * @return {Promise|Array} The collection models.
     */
    fetchQueryCollections: fetchFactory('query', 'collections'),

    fetchRecentCart: function fetchRecentCart() {
      var _this6 = this;

      return this.fetch('references', this.config.domain + '.recent-cart').then(function (reference) {
        var cartId = reference.referenceId;

        return _this6.fetchCart(cartId);
      }).catch(function () {
        return _this6.createCart().then(function (cart) {
          var refAttrs = {
            referenceId: cart.id
          };

          refAttrs[_setGuidFor.GUID_KEY] = _this6.config.domain + '.recent-cart';

          _this6.create('references', refAttrs);

          return cart;
        });
      });
    }
  });

  exports.default = ShopClient;
});
define('shopify-buy/shopify', ['exports', './config', './version', './shop-client', './models/product-model', './isomorphic-fetch', './isomorphic-btoa'], function (exports, _config, _version, _shopClient, _productModel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _config2 = _interopRequireDefault(_config);

  var _version2 = _interopRequireDefault(_version);

  var _shopClient2 = _interopRequireDefault(_shopClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @module shopify-buy
   * @submodule shopify
   */

  /**
   * This namespace contains all globally accessible classes
   * @class ShopifyBuy
   * @static
   */
  var Shopify = {
    ShopClient: _shopClient2.default,
    Config: _config2.default,
    version: _version2.default,
    NO_IMAGE_URI: _productModel.NO_IMAGE_URI,

    buildClient: function buildClient() {
      var configAttrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var config = new this.Config(configAttrs);

      return new this.ShopClient(config);
    }
  };

  exports.default = Shopify;
});
define('shopify-buy/store', ['exports', './metal/global', './metal/core-object'], function (exports, _global, _coreObject) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _global2 = _interopRequireDefault(_global);

  var _coreObject2 = _interopRequireDefault(_coreObject);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Store = _coreObject2.default.extend({
    constructor: function constructor() {
      this.localStorageAvailable = this.storageAvailable('localStorage');
      this.cache = {};
    },
    setItem: function setItem(key, value) {
      if (this.localStorageAvailable) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        this.cache[key] = value;
      }

      return value;
    },
    getItem: function getItem(key) {
      if (this.localStorageAvailable) {
        var stringValue = localStorage.getItem(key);

        try {
          return JSON.parse(stringValue);
        } catch (e) {
          return null;
        }
      } else {
        return this.cache[key] || null;
      }
    },
    storageAvailable: function storageAvailable(type) {
      try {
        var storage = _global2.default[type];
        var x = '__storage_test__';

        storage.setItem(x, x);
        storage.removeItem(x);

        return true;
      } catch (e) {
        return false;
      }
    }
  });

  exports.default = Store;
});
define('shopify-buy/version', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var version = 'v0.2.2-a8212a';

  /**
   * @module shopify-buy
   * @submodule version
   */

  exports.default = version;
});

        window.ShopifyBuy = require('shopify-buy/shopify').default;
        })();
      
//# sourceMappingURL=shopify-buy.globals.map