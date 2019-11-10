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

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _slice = Array.prototype.slice;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ajax = require('../ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _metalCoreObject = require('../metal/core-object');

var _metalCoreObject2 = _interopRequireDefault(_metalCoreObject);

var ListingsAdapter = _metalCoreObject2['default'].extend(Object.defineProperties({
  ajax: _ajax2['default'],

  constructor: function constructor(config) {
    this.config = config;
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
        var value = undefined;

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
    var url = this.buildUrl.apply(this, ['multiple'].concat(_slice.call(arguments)));

    return this.ajax('GET', url, { headers: this.headers }).then(function (response) {
      return response.json;
    });
  },

  fetchSingle: function fetchSingle() /* type, id */{
    var url = this.buildUrl.apply(this, ['single'].concat(_slice.call(arguments)));

    return this.ajax('GET', url, { headers: this.headers }).then(function (response) {
      return response.json;
    });
  }
}, {
  base64ApiKey: {
    get: function get() {
      return btoa(this.config.apiKey);
    },
    configurable: true,
    enumerable: true
  },
  baseUrl: {
    get: function get() {
      var _config = this.config;
      var myShopifyDomain = _config.myShopifyDomain;
      var appId = _config.appId;

      return 'https://' + myShopifyDomain + '.myshopify.com/api/apps/' + appId;
    },
    configurable: true,
    enumerable: true
  },
  headers: {
    get: function get() {
      return {
        Authorization: 'Basic ' + this.base64ApiKey,
        'Content-Type': 'application/json'
      };
    },
    configurable: true,
    enumerable: true
  }
}));

exports['default'] = ListingsAdapter;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _metalCoreObject = require('../metal/core-object');

var _metalCoreObject2 = _interopRequireDefault(_metalCoreObject);

var _metalSetGuidFor = require('../metal/set-guid-for');

var _metalSetGuidFor2 = _interopRequireDefault(_metalSetGuidFor);

var LocalStorageAdapter = _metalCoreObject2['default'].extend({
  constructor: function constructor() {},

  idKeyForType: function idKeyForType() /* type */{
    return _metalSetGuidFor.GUID_KEY;
  },

  fetchSingle: function fetchSingle(type, id) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var stringifiedValue = localStorage.getItem(_this.localStorageKey(type, id));

      if (stringifiedValue === null) {
        reject(new Error(type + '#' + id + ' not found'));

        return;
      }

      try {
        var value = JSON.parse(stringifiedValue);

        resolve(value);
      } catch (e) {
        reject(e);
      }
    });
  },

  create: function create(type, payload) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      var id = _this2.identify(payload);

      try {
        localStorage.setItem(_this2.localStorageKey(type, id), JSON.stringify(payload));
      } catch (e) {
        reject(e);
      }

      resolve(payload);
    });
  },

  update: function update(type, id, payload) {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      try {
        localStorage.setItem(_this3.localStorageKey(type, id), JSON.stringify(payload));
      } catch (e) {
        reject(e);
      }

      resolve(payload);
    });
  },

  localStorageKey: function localStorageKey(type, id) {
    return type + '.' + id;
  },

  identify: function identify(payload) {
    var keys = Object.keys(payload);

    if (keys.length === 1 && typeof payload[keys[0]] === 'object') {
      return (0, _metalSetGuidFor2['default'])(payload[keys[0]]);
    }

    return (0, _metalSetGuidFor2['default'])(payload);
  }
});

exports['default'] = LocalStorageAdapter;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ajax;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ie9Ajax = require('./ie9-ajax');

var _ie9Ajax2 = _interopRequireDefault(_ie9Ajax);

var _metalGlobal = require('./metal/global');

var _metalGlobal2 = _interopRequireDefault(_metalGlobal);

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
  })['catch'](function () {
    var responseClone = response.clone();

    return responseClone.text().then(function (text) {
      return { text: text, originalResponse: responseClone, isText: true };
    });
  });
}

function ajax(method, url) {
  var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  if (_metalGlobal2['default'].XDomainRequest) {
    return _ie9Ajax2['default'].apply(undefined, arguments);
  }

  opts.method = method;
  opts.mode = 'cors';

  return fetch(url, opts).then(checkStatus).then(parseResponse);
}

module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _metalCoreObject = require('./metal/core-object');

var _metalCoreObject2 = _interopRequireDefault(_metalCoreObject);

/**
 * @module shopify-buy
 * @submodule config
 */

var Config = _metalCoreObject2['default'].extend({
  /**
   * @class Config
   * @constructor
   * @param {Object} attrs An object of required config data.
   * @param {String} attrs.apiKey Your api client's public token
   * @param {String} attrs.appId The app whose listings the client will be
   * using. If you are just modifying a buy button, the buy-button's app id is
   * 6. Otherwise, obtain the app id of the app you're modifying or extending.
   * @param {String} attrs.myShopifyDomain You shop's `myshopify.com` domain.
   */
  constructor: function constructor(attrs) {
    var _this = this;

    this.requiredProperties.forEach(function (key) {
      if (!attrs.hasOwnProperty(key)) {
        throw new Error('new Config() requires the option \'' + key + '\'');
      } else {
        _this[key] = attrs[key];
      }
    });
  },

  /**
   * The apiKey for authenticating against shopify. This is your api client's
   * public api token. Not the shared secret. Set during initialation.
   * @attribute requiredProperties
   * @default ['apiKey', 'appId', 'myShopifyDomain']
   * @type Array
   * @private
   */
  requiredProperties: ['apiKey', 'appId', 'myShopifyDomain'],

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
   * @attribute myShopifyDomain
   * @default ''
   * @type String
   * @public
   */
  myShopifyDomain: ''
});

exports['default'] = Config;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function authToUrl(url, opts) {
  var authorization = undefined;

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

      var newUrl = undefined;

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

exports['default'] = ie9Ajax;
module.exports = exports['default'];
/* global Buffer */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _metalGlobal = require('./metal/global');

var _metalGlobal2 = _interopRequireDefault(_metalGlobal);

var _metalIsNodeLikeEnvironment = require('./metal/is-node-like-environment');

var _metalIsNodeLikeEnvironment2 = _interopRequireDefault(_metalIsNodeLikeEnvironment);

var btoa = _metalGlobal2['default'].btoa;

if (!btoa && (0, _metalIsNodeLikeEnvironment2['default'])()) {
  _metalGlobal2['default'].btoa = function (string) {
    return new Buffer(string).toString('base64');
  };
}
/* global require */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _metalGlobal = require('./metal/global');

var _metalGlobal2 = _interopRequireDefault(_metalGlobal);

var _metalIsNodeLikeEnvironment = require('./metal/is-node-like-environment');

var _metalIsNodeLikeEnvironment2 = _interopRequireDefault(_metalIsNodeLikeEnvironment);

var fetch = _metalGlobal2['default'].fetch;

if (!fetch && (0, _metalIsNodeLikeEnvironment2['default'])()) {
  _metalGlobal2['default'].fetch = require('node-fetch');
  _metalGlobal2['default'].Response = _metalGlobal2['default'].fetch.Response;
}
/* eslint no-undefined: 0 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var assign = undefined;

if (typeof Object.assign === 'function') {
  assign = Object.assign;
} else {
  assign = function (target) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var output = Object(target);

    var propertyObjects = [].slice.call(arguments, 1);

    if (propertyObjects.length > 0) {
      propertyObjects.forEach(function (source) {
        if (source !== undefined && source !== null) {
          var nextKey = undefined;

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

exports['default'] = assign;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createClass = require('./create-class');

var _createClass2 = _interopRequireDefault(_createClass);

var CoreObject = (0, _createClass2['default'])({
  constructor: function constructor() {},

  'static': {
    extend: function extend(subClassProps) {
      return (0, _createClass2['default'])(subClassProps, this);
    }
  }
});

exports['default'] = CoreObject;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assign = require('./assign');

var _assign2 = _interopRequireDefault(_assign);

var _includes = require('./includes');

var _includes2 = _interopRequireDefault(_includes);

function wrap(func, superFunc) {
  function superWrapper() {
    var originalSuper = this['super'];

    this['super'] = function () {
      return superFunc.apply(this, arguments);
    };

    var ret = func.apply(this, arguments);

    this['super'] = originalSuper;

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
    return !(0, _includes2['default'])(['constructor', 'static'], key);
  });

  (0, _assign2['default'])(Constructor, parent);

  Constructor.prototype = Object.create(parent.prototype);
  defineProperties(instancePropertyNames, props, Constructor.prototype);
  Constructor.prototype.constructor = Constructor;

  var staticProps = props['static'];

  if (staticProps) {
    var staticPropertyNames = Object.getOwnPropertyNames(staticProps);

    defineProperties(staticPropertyNames, staticProps, Constructor);
  }

  return Constructor;
}

exports['default'] = createClass;
module.exports = exports['default'];
/* global global */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var globalNamespace = undefined;

if (typeof global === 'undefined') {
  globalNamespace = window;
} else {
  globalNamespace = global;
}

exports['default'] = globalNamespace;
module.exports = exports['default'];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var includes = undefined;

if (!Array.prototype.includes) {
  includes = function (array, searchElement) {
    var ObjectifiedArray = Object(array);
    var length = parseInt(ObjectifiedArray.length, 10) || 0;

    if (length === 0) {
      return false;
    }

    var startIndex = parseInt(arguments[1], 10) || 0;
    var index = undefined;

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
  includes = function (array) {
    var args = [].slice.call(arguments, 1);

    return Array.prototype.includes.apply(array, args);
  };
}

exports["default"] = includes;
module.exports = exports["default"];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isNodeLikeEnvironment;

function isNodeLikeEnvironment() {
  var windowAbsent = typeof window === 'undefined';
  var requirePresent = typeof require === 'function';

  return windowAbsent && requirePresent;
}

module.exports = exports['default'];
/* eslint no-undefined: 0 complexity: 0 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
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

  var type = typeof obj;
  var id = undefined;

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
        id = numberCache[obj] = 'st' + uuid();
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

exports['default'] = setGuidFor;
exports.GUID_KEY = GUID_KEY;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (array) {
  return array.reduce(function (uniqueArray, item) {
    if (uniqueArray.indexOf(item) < 0) {
      uniqueArray.push(item);
    }

    return uniqueArray;
  }, []);
};

module.exports = exports["default"];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _metalCoreObject = require('../metal/core-object');

var _metalCoreObject2 = _interopRequireDefault(_metalCoreObject);

var _metalAssign = require('../metal/assign');

var _metalAssign2 = _interopRequireDefault(_metalAssign);

var BaseModel = _metalCoreObject2['default'].extend({
  constructor: function constructor() {
    var attrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var metaAttrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    this.attrs = attrs;

    (0, _metalAssign2['default'])(this, metaAttrs);
  },
  attrs: null,
  serializer: null,
  adapter: null,
  shopClient: null
});

exports['default'] = BaseModel;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _slice = Array.prototype.slice;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _baseModel = require('./base-model');

var _baseModel2 = _interopRequireDefault(_baseModel);

var _metalAssign = require('../metal/assign');

var _metalAssign2 = _interopRequireDefault(_metalAssign);

var _metalSetGuidFor = require('../metal/set-guid-for');

var _metalSetGuidFor2 = _interopRequireDefault(_metalSetGuidFor);

function objectsEqual(one, two) {
  if (one === two) {
    return true;
  }

  return Object.keys(one).every(function (key) {
    if (one[key] instanceof Date) {
      return one[key].toString() === two[key].toString();
    } else if (typeof one[key] === 'object') {
      return objectsEqual(one[key], two[key]);
    }

    return one[key] === two[key];
  });
}

var CartModel = _baseModel2['default'].extend(Object.defineProperties({

  /**
    * Class for cart model
    * @class CartModel
    * @constructor
  */
  constructor: function constructor() {
    this['super'].apply(this, arguments);
  },

  /**
    * Add items to cart. Updates cart's `lineItems`
    * ```javascript
    * cart.addVariants({id: 123, quantity: 1}).then(cart => {
    *   // do things with the updated cart.
    * });
    * ```
    * @method addVariants
    * @param {Object} item - One or more variants
    * @param {Object} item.variant - variant object
    * @param {Number} item.quantity - quantity
    * @param {Object} [nextItem...] - further lineItems may be passed
    * @public
    * @return {Promise|CartModel} - updated cart instance.
  */
  addVariants: function addVariants() {
    var newLineItems = [].concat(_slice.call(arguments)).map(function (item) {
      var lineItem = Object.defineProperties({
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
      }, {
        id: {
          get: function get() {
            return this[_metalSetGuidFor.GUID_KEY];
          },
          configurable: true,
          enumerable: true
        },
        line_price: {
          get: function get() {
            return (this.quantity * parseFloat(this.price)).toFixed(2);
          },
          configurable: true,
          enumerable: true
        }
      });

      (0, _metalSetGuidFor2['default'])(lineItem);

      return lineItem;
    });
    var existingLineItems = this.lineItems;

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

  /**
    * Update line item quantity
    * ```javascript
    * cart.updateLineItem(123, 2}).then(cart => {
    *   // do things with the updated cart.
    * });
    * ```
    * @method updateLineItem
    * @param {Number} id - line item ID
    * @param {Number} quantity - new quantity for line item
    * @throws {Error} if line item with ID is not in cart.
    * @public
    * @return {Promise|CartModel} - updated cart instance
  */
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

  /**
    * Remove line item from cart
    * @method removeLineItem
    * @param {Number} id - line item ID
    * @throws {Error} if line item with ID is not in cart.
    * @public
    * @return {Promise|CartModel} - updated cart instance
  */
  removeLineItem: function removeLineItem(id) {
    var oldLength = this.lineItems.length;
    var newLineItems = this.lineItems.filter(function (item) {
      return item.id !== id;
    });
    var newLength = newLineItems.length;

    if (newLength < oldLength) {
      this.attrs.line_items = newLineItems;

      return this.updateModel();
    }

    return new Promise(function (resolve, reject) {
      reject(new Error('line item with id: ' + id + ' not found in cart#' + this.id));
    });
  },

  /**
    * Remove all line items from cart
    * @method clearLineItems
    * @public
    * @return {Promise|CartModel} - updated cart instance
  */
  clearLineItems: function clearLineItems() {
    this.attrs.line_items = [];

    return this.updateModel();
  },

  /**
    * force update of cart model on server
    * @method updateModel
    * @public
    * @return {Promise|CartModel} - updated cart instance
  */
  updateModel: function updateModel() {
    var _this = this;

    return this.shopClient.update('carts', this).then(function (updateCart) {
      (0, _metalAssign2['default'])(_this.attrs, updateCart.attrs);

      return _this;
    });
  }
}, {
  id: { /**
          * get ID for current cart
          * @property id
          * @type {String}
        */

    get: function get() {
      return this.attrs[_metalSetGuidFor.GUID_KEY];
    },
    configurable: true,
    enumerable: true
  },
  lineItems: {

    /**
      * Get current line items for cart
      * @property lineItems
      * @type {Array}
    */

    get: function get() {
      return this.attrs.line_items || [];
    },
    configurable: true,
    enumerable: true
  },
  subtotal: {

    /**
      * Get current subtotal price for all line items
      * @property subtotal
      * @type {String}
    */

    get: function get() {
      var subtotal = this.lineItems.reduce(function (runningTotal, lineItem) {
        return runningTotal + parseFloat(lineItem.line_price);
      }, 0);

      return subtotal.toFixed(2);
    },
    configurable: true,
    enumerable: true
  },
  checkoutUrl: {

    /**
      * Get checkout URL for current cart
      * @property checkoutUrl
      * @type {String}
    */

    get: function get() {
      var config = this.config;
      var baseUrl = 'https://' + config.myShopifyDomain + '.myshopify.com/cart';

      var variantPath = this.lineItems.map(function (item) {
        return item.variant_id + ':' + item.quantity;
      });

      var query = 'api_key=' + config.apiKey;

      /* globals ga:true */
      if (typeof ga === 'function') {
        var linkerParam = undefined;

        window.ga(function (tracker) {
          linkerParam = tracker.get('linkerParam');
        });

        if (linkerParam) {
          query += '&' + linkerParam;
        }
      }

      return baseUrl + '/' + variantPath + '?' + query;
    },
    configurable: true,
    enumerable: true
  }
}));

exports['default'] = CartModel;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _baseModel = require('./base-model');

var _baseModel2 = _interopRequireDefault(_baseModel);

var _productOptionModel = require('./product-option-model');

var _productOptionModel2 = _interopRequireDefault(_productOptionModel);

var _productVariantModel = require('./product-variant-model');

var _productVariantModel2 = _interopRequireDefault(_productVariantModel);

var _metalUniq = require('../metal/uniq');

var _metalUniq2 = _interopRequireDefault(_metalUniq);

/**
   * Class for products returned by fetch('product')
   * @class ProductModel
   * @constructor
 */
var ProductModel = _baseModel2['default'].extend(Object.defineProperties({
  constructor: function constructor() {
    this['super'].apply(this, arguments);
  }

}, {
  id: { /**
          * Product unique ID
          * @property id
          * @type {String}
        */

    get: function get() {
      return this.attrs.product_id;
    },
    configurable: true,
    enumerable: true
  },
  title: {

    /**
      * Product title
      * @property title
      * @type {String}
    */

    get: function get() {
      return this.attrs.title;
    },
    configurable: true,
    enumerable: true
  },
  images: {

    /**
      * All images associated with product.
      * @property images
      * @type {Array} array of image objects.
    */

    get: function get() {
      return this.attrs.images;
    },
    configurable: true,
    enumerable: true
  },
  memoized: {
    get: function get() {
      this._memoized = this._memoized || {};

      return this._memoized;
    },
    configurable: true,
    enumerable: true
  },
  options: {

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

    get: function get() {
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

        var values = (0, _metalUniq2['default'])(dupedValues);

        return new _productOptionModel2['default']({ name: name, values: values });
      });

      return this.memoized.options;
    },
    configurable: true,
    enumerable: true
  },
  variants: {

    /**
      * All variants of a product.
      * @property variants
      * @type {Array|ProductVariantModel} array of ProductVariantModel instances.
    */

    get: function get() {
      var _this = this;

      return this.attrs.variants.map(function (variant) {
        return new _productVariantModel2['default']({ variant: variant, product: _this }, { config: _this.config });
      });
    },
    configurable: true,
    enumerable: true
  },
  selections: {

    /**
      * Retrieve currently selected option values.
      * @attribute selections
      * @type {Option}
    */

    get: function get() {
      return this.options.map(function (option) {
        return option.selected;
      });
    },
    configurable: true,
    enumerable: true
  },
  selectedVariant: {

    /**
      * Retrieve variant for currently selected options
      * @attribute selectedVariant
      * @type {Object}
    */

    get: function get() {
      var variantTitle = this.selections.join(' / ');

      return this.variants.filter(function (variant) {
        return variant.title === variantTitle;
      })[0];
    },
    configurable: true,
    enumerable: true
  },
  selectedVariantImage: {

    /**
      * Retrieve image for currently selected variantImage
      * @attribute selectedVariantImage
      * @type {Object}
    */

    get: function get() {
      return this.selectedVariant.image;
    },
    configurable: true,
    enumerable: true
  }
}));

exports['default'] = ProductModel;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _baseModel = require('./base-model');

var _baseModel2 = _interopRequireDefault(_baseModel);

var _metalIncludes = require('../metal/includes');

var _metalIncludes2 = _interopRequireDefault(_metalIncludes);

/**
  * Class for product option
  * @class Option
  * @constructor
*/
var ProductOptionModel = _baseModel2['default'].extend(Object.defineProperties({
  constructor: function constructor() {
    this['super'].apply(this, arguments);

    this.selected = this.values[0];
  }

}, {
  name: { /**
            * name of option (ex. "Size", "Color")
            * @property name
            * @type String
          */

    get: function get() {
      return this.attrs.name;
    },
    configurable: true,
    enumerable: true
  },
  values: {

    /**
      * possible values for selection
      * @property values
      * @type Array
    */

    get: function get() {
      return this.attrs.values;
    },
    configurable: true,
    enumerable: true
  },
  selected: {

    /**
      * get/set selected option value (ex. "Large"). Setting this will update the
      * selected value on the model. Throws {Error} if setting selected to value that does not exist for option
      * @property selected
      * @type String
    */

    get: function get() {
      return this._selected;
    },
    set: function set(value) {
      if ((0, _metalIncludes2['default'])(this.values, value)) {
        this._selected = value;
      } else {
        throw new Error('Invalid option selection for ' + this.name + '.');
      }

      return value;
    },
    configurable: true,
    enumerable: true
  }
}));

exports['default'] = ProductOptionModel;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _baseModel = require('./base-model');

var _baseModel2 = _interopRequireDefault(_baseModel);

/**
  * Model for product variant
  * @class ProductVariantModel
  * @constructor
*/
var ProductVariantModel = _baseModel2['default'].extend(Object.defineProperties({
  constructor: function constructor() {
    this['super'].apply(this, arguments);
  },

  /**
    * Checkout URL for purchasing variant with quantity.
    * @method checkoutUrl
    * @param {Number} [quantity = 1] quantity of variant
    * @public
    * @return {String} Checkout URL
  */
  checkoutUrl: function checkoutUrl() {
    var quantity = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

    var config = this.config;
    var baseUrl = 'https://' + config.myShopifyDomain + '.myshopify.com/cart';

    var variantPath = this.id + ':' + parseInt(quantity, 10);

    var query = 'api_key=' + config.apiKey;

    return baseUrl + '/' + variantPath + '?' + query;
  }
}, {
  id: { /**
          * Variant unique ID
          * @property id
          * @type {String}
        */

    get: function get() {
      return this.attrs.variant.id;
    },
    configurable: true,
    enumerable: true
  },
  productId: {

    /**
      * ID of product variant belongs to
      * @property productId
      * @type {String}
    */

    get: function get() {
      return this.attrs.product.id;
    },
    configurable: true,
    enumerable: true
  },
  title: {

    /**
      * Title of variant
      * @property title
      * @type {String}
    */

    get: function get() {
      return this.attrs.variant.title;
    },
    configurable: true,
    enumerable: true
  },
  productTitle: {

    /**
      * Title of product variant belongs to
      * @property productTitle
      * @type {String}
    */

    get: function get() {
      return this.attrs.product.title;
    },
    configurable: true,
    enumerable: true
  },
  compareAtPrice: {

    /**
      * <a href="https://docs.shopify.com/manual/products/promoting-marketing/sales">
      * Compare at</a> price for variant formatted as currency.
      * @property compareAtPrice
      * @type {String}
    */

    get: function get() {
      return this.attrs.variant.compare_at_price;
    },
    configurable: true,
    enumerable: true
  },
  price: {

    /**
      * Price of variant, formatted as currency
      * @property price
      * @type {String}
    */

    get: function get() {
      return this.attrs.variant.price;
    },
    configurable: true,
    enumerable: true
  },
  grams: {

    /**
      * Variant weight in grams
      * @property grams
      * @type {Number}
    */

    get: function get() {
      return this.attrs.variant.grams;
    },
    configurable: true,
    enumerable: true
  },
  optionValues: {

    /**
      * Option values associated with this variant, ex {name: "color", value: "Blue"}
      * @property optionValues
      * @type {Array|Object}
    */

    get: function get() {
      return this.attrs.variant.option_values;
    },
    configurable: true,
    enumerable: true
  },
  image: {

    /**
      * Image for variant
      * @property image
      * @type {Object}
    */

    get: function get() {
      var id = this.id;
      var images = this.attrs.product.images;

      var primaryImage = images[0];
      var variantImage = images.filter(function (image) {
        return image.variant_ids.indexOf(id) !== -1;
      })[0];

      return variantImage || primaryImage;
    },
    configurable: true,
    enumerable: true
  }
}));

exports['default'] = ProductVariantModel;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _baseModel = require('./base-model');

var _baseModel2 = _interopRequireDefault(_baseModel);

var _metalSetGuidFor = require('../metal/set-guid-for');

var ReferenceModel = _baseModel2['default'].extend(Object.defineProperties({

  /**
    * Class for reference model
    * @class ReferenceModel
    * @constructor
  */
  constructor: function constructor(attrs) {
    if (Object.keys(attrs).indexOf('referenceId') < 0) {
      throw new Error('Missing key referenceId of reference. References to null are not allowed');
    }

    this['super'].apply(this, arguments);
  }

}, {
  id: { /**
          * get the ID for current reference (not what it refers to, but its own unique identifier)
          * @property id
          * @type {String}
        */

    get: function get() {
      return this.attrs[_metalSetGuidFor.GUID_KEY];
    },
    configurable: true,
    enumerable: true
  },
  referenceId: {
    get: function get() {
      return this.attrs.referenceId;
    },
    set: function set(value) {
      this.attrs.referenceId = value;

      return value;
    },
    configurable: true,
    enumerable: true
  }
}));

exports['default'] = ReferenceModel;
module.exports = exports['default'];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RSVP = window.RSVP;
var Promise = RSVP.Promise;

exports.RSVP = RSVP;
exports.Promise = Promise;
exports["default"] = Promise;
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _metalCoreObject = require('../metal/core-object');

var _metalCoreObject2 = _interopRequireDefault(_metalCoreObject);

var _metalAssign = require('../metal/assign');

var _metalAssign2 = _interopRequireDefault(_metalAssign);

var _modelsCartModel = require('../models/cart-model');

var _modelsCartModel2 = _interopRequireDefault(_modelsCartModel);

var CartSerializer = _metalCoreObject2['default'].extend({
  constructor: function constructor(config) {
    this.config = config;
  },

  rootKeyForType: function rootKeyForType(type) {
    return type.slice(0, -1);
  },

  modelForType: function modelForType() /* type */{
    return _modelsCartModel2['default'];
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
    var attrs = (0, _metalAssign2['default'])({}, model.attrs);

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

exports['default'] = CartSerializer;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _metalCoreObject = require('../metal/core-object');

var _metalCoreObject2 = _interopRequireDefault(_metalCoreObject);

var _modelsBaseModel = require('../models/base-model');

var _modelsBaseModel2 = _interopRequireDefault(_modelsBaseModel);

var _modelsProductModel = require('../models/product-model');

var _modelsProductModel2 = _interopRequireDefault(_modelsProductModel);

var ListingsSerializer = _metalCoreObject2['default'].extend({
  constructor: function constructor(config) {
    this.config = config;
  },

  rootKeyForType: function rootKeyForType(type) {
    return type.slice(0, -1) + '_listing';
  },

  models: {
    collections: _modelsBaseModel2['default'],
    products: _modelsProductModel2['default']
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

exports['default'] = ListingsSerializer;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _metalCoreObject = require('../metal/core-object');

var _metalCoreObject2 = _interopRequireDefault(_metalCoreObject);

var _metalAssign = require('../metal/assign');

var _metalAssign2 = _interopRequireDefault(_metalAssign);

var _modelsReferenceModel = require('../models/reference-model');

var _modelsReferenceModel2 = _interopRequireDefault(_modelsReferenceModel);

var ReferenceSerializer = _metalCoreObject2['default'].extend({
  constructor: function constructor(config) {
    this.config = config;
  },

  modelForType: function modelForType() /* type */{
    return _modelsReferenceModel2['default'];
  },

  deserializeSingle: function deserializeSingle(type) {
    var singlePayload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var metaAttrs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var Model = this.modelForType(type);

    return new Model(singlePayload, metaAttrs);
  },

  serialize: function serialize(type, model) {
    var attrs = (0, _metalAssign2['default'])({}, model.attrs);

    return attrs;
  }
});

exports['default'] = ReferenceSerializer;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _slice = Array.prototype.slice;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _serializersListingsSerializer = require('./serializers/listings-serializer');

var _serializersListingsSerializer2 = _interopRequireDefault(_serializersListingsSerializer);

var _adaptersListingsAdapter = require('./adapters/listings-adapter');

var _adaptersListingsAdapter2 = _interopRequireDefault(_adaptersListingsAdapter);

var _serializersCartSerializer = require('./serializers/cart-serializer');

var _serializersCartSerializer2 = _interopRequireDefault(_serializersCartSerializer);

var _serializersReferenceSerializer = require('./serializers/reference-serializer');

var _serializersReferenceSerializer2 = _interopRequireDefault(_serializersReferenceSerializer);

var _adaptersLocalStorageAdapter = require('./adapters/local-storage-adapter');

var _adaptersLocalStorageAdapter2 = _interopRequireDefault(_adaptersLocalStorageAdapter);

var _metalCoreObject = require('./metal/core-object');

var _metalCoreObject2 = _interopRequireDefault(_metalCoreObject);

var _metalAssign = require('./metal/assign');

var _metalAssign2 = _interopRequireDefault(_metalAssign);

var _metalSetGuidFor = require('./metal/set-guid-for');

/**
 * @module shopify-buy
 * @submodule shop-client
 */

function fetchFactory(fetchType, type) {
  var func = undefined;

  switch (fetchType) {
    case 'all':
      func = function () {
        return this.fetchAll(type);
      };
      break;
    case 'one':
      func = function () {
        return this.fetch.apply(this, [type].concat(_slice.call(arguments)));
      };
      break;
    case 'query':
      func = function () {
        return this.fetchQuery.apply(this, [type].concat(_slice.call(arguments)));
      };
      break;
  }

  return func;
}

var ShopClient = _metalCoreObject2['default'].extend(Object.defineProperties({
  /**
   * @class ShopClient
   * @constructor
   * @param {Config} [config] Config data to be used throughout all API
   * interaction
   */
  constructor: function constructor(config) {
    this.config = config;

    this.serializers = {
      products: _serializersListingsSerializer2['default'],
      collections: _serializersListingsSerializer2['default'],
      carts: _serializersCartSerializer2['default'],
      references: _serializersReferenceSerializer2['default']
    };

    this.adapters = {
      products: _adaptersListingsAdapter2['default'],
      collections: _adaptersListingsAdapter2['default'],
      carts: _adaptersLocalStorageAdapter2['default'],
      references: _adaptersLocalStorageAdapter2['default']
    };
  },

  config: null,

  /**
   * Fetch all of a `type`, returning a promise.
   *
   * ```javascript
   * client.fetchAll('products').then(products => {
   *   // do things with products
   * });
   * ```
   *
   * @method fetchAll
   * @private
   * @param {String} type The pluralized name of the type, in lower case.
   * @return {Promise|Array} a promise resolving with an array of `type`
   */
  fetchAll: function fetchAll(type) {
    var _this = this;

    var adapter = new this.adapters[type](this.config);

    return adapter.fetchMultiple(type).then(function (payload) {
      return _this.deserialize(type, payload, adapter, null, { multiple: true });
    });
  },

  /**
   * Fetch one of a `type`, returning a promise.
   *
   * ```javascript
   * client.fetch('products', 123).then(product => {
   *   // do things with the product
   * });
   * ```
   *
   * @method fetch
   * @private
   * @param {String} type The pluralized name of the type, in lower case.
   * @param {String|Number} id a unique identifier
   * @return {Promise|BaseModel} a promise resolving with a single instance of
   * `type` expressed as a `BaseModel`.
   */
  fetch: function fetch(type, id) {
    var _this2 = this;

    var adapter = new this.adapters[type](this.config);

    return adapter.fetchSingle(type, id).then(function (payload) {
      return _this2.deserialize(type, payload, adapter, null, { single: true });
    });
  },

  /**
   * Fetch many of a `type`, that match `query`
   *
   * ```javascript
   * client.fetchQuery('products', { collection_id: 456 }).then(products => {
   *   // do things with the products
   * });
   * ```
   *
   * @method fetchQuery
   * @private
   * @param {String} type The pluralized name of the type, in lower case.
   * @param {Object} query a query sent to the api server.
   * @return {Promise|Array} a promise resolving with an array of `type`.
   */
  fetchQuery: function fetchQuery(type, query) {
    var _this3 = this;

    var adapter = new this.adapters[type](this.config);

    return adapter.fetchMultiple(type, query).then(function (payload) {
      return _this3.deserialize(type, payload, adapter, null, { multiple: true });
    });
  },

  /**
   * Create an instance of `type`, optionally including `modelAttrs`.
   *
   * ```javascript
   * client.create('carts', { line_items: [ ... ] }).then(cart => {
   *   // do things with the cart.
   * });
   * ```
   *
   * @method create
   * @private
   * @param {String} type The pluralized name of the type, in lower case.
   * @param {Object} [modelAttrs={}] attributes representing the internal state
   * of the model to be persisted.
   * @return {Promise|CartModel} a promise resolving with a single instance of
   * `type`
   */
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

  /**
   * Create an instance of `type`, optionally including `attrs`.
   *
   * ```javascript
   * client.create('carts', { line_items: [ ... ] }).then(cart => {
   *   // do things with the cart.
   * });
   * ```
   *
   * @method update
   * @private
   * @param {String} type The pluralized name of the type, in lower case.
   * @param {BaseModel} updatedModel The model that represents new state to
   * to persist.
   * @return {Promise|CartModel} a promise resolving with a single instance of
   * `type`
   */
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

  /**
   * Proxy to serializer's deserialize.
   *
   * @method deserialize
   * @private
   * @param {String} type The pluralized name of the type, in lower case.
   * @param {Object} payload The raw payload returned by the adapter.
   * @param {BaseAdapter} adapter The adapter that yielded the payload.
   * @param {BaseSerializer} existingSerializer The serializer to attach. If
   * none is passed, then `this.deserialize` will create one for the type.
   * @param {Object} opts Options that determine which deserialization method to
   * use.
   * @param {Boolean} opts.multiple true when the payload represents multiple
   * models
   * @param {Boolean} opts.single true when the payload represents one model.
   * @return {BaseModel} an instance of `type` reified into a model.
   */
  deserialize: function deserialize(type, payload, adapter, existingSerializer) {
    var opts = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];

    var serializer = existingSerializer || new this.serializers[type](this.config);
    var meta = { shopClient: this, adapter: adapter, serializer: serializer, type: type };
    var serializedPayload = undefined;

    if (opts.multiple) {
      serializedPayload = serializer.deserializeMultiple(type, payload, meta);
    } else {
      serializedPayload = serializer.deserializeSingle(type, payload, meta);
    }

    return serializedPayload;
  },

  /**
    * Creates a {{#crossLink "CartModel"}}CartModel{{/crossLink}} instance, optionally including `attrs`.
    *
    * ```javascript
    * client.createCart().then(cart => {
    *   // do something with cart
    * });
    * ```
    *
    * @param {Object}[attrs={}] attributes representing the internal state of the cart to be persisted to localStorage.
    * @method createCart
    * @public
    * @return {Promise|CartModel} - new cart instance.
  */
  createCart: function createCart() {
    var userAttrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var baseAttrs = {
      line_items: []
    };
    var attrs = {};

    (0, _metalAssign2['default'])(attrs, baseAttrs);
    (0, _metalAssign2['default'])(attrs, userAttrs);

    return this.create('carts', attrs);
  },

  /**
    * Updates an existing {{#crossLink "CartModel"}}CartModel{{/crossLink}} instance and persists it to localStorage.
    *
    * ```javascript
    * client.createCart().then(cart => {
    *   cart.lineItems = [
    *     // ...
    *   ];
    *   client.updateCart(cart);
    * });
    * ```
    *
    * @param {Object}[attrs={}] attributes representing the internal state of the cart to be persisted to localStorage.
    * @method updateCart
    * @public
    * @return {Promise|CartModel} - updated cart instance.
  */
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
   * client.fetchQueryProducts({ collection_id: 123}).then(products => {
   *   console.log(products); // An array of products in collection 123
   * });
   * ```
   * @method fetchQueryProducts
   * @public
   * @param {Object} query a query sent to the api server containing one or more of:
   *   @param {String|Number} [query.collection_id] the ID of a collection to retrieve products from
   *   @param {Array} [query.product_ids] a list of product IDs to retrieve
   *   @param {String|Number} [query.page=1] the page offset number of the current lookup (based on the `limit`)
   *   @param {String|Number} [query.limit=50] the number of products to retrieve per page
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

  /**
   * This method looks up a reference in localStorage to the most recent cart.
   * If one is not found, creates one. If the cart the reference points to
   * doesn't exist, create one and store the new reference.
   *
   * ```javascript
   * client.fetchRecentCart().then(cart => {
   *  // do stuff with the cart
   * });
   * ```
   *
   * @method fetchRecentCart
   * @public
   * @return {Promise|CartModel} The cart.
   */
  fetchRecentCart: function fetchRecentCart() {
    var _this6 = this;

    return this.fetch('references', this.config.myShopifyDomain + '.recent-cart').then(function (reference) {
      var cartId = reference.referenceId;

      return _this6.fetchCart(cartId);
    })['catch'](function () {
      return _this6.createCart().then(function (cart) {
        var refAttrs = {
          referenceId: cart.id
        };

        refAttrs[_metalSetGuidFor.GUID_KEY] = _this6.config.myShopifyDomain + '.recent-cart';

        _this6.create('references', refAttrs);

        return cart;
      });
    });
  }
}, {
  serializers: { /**
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

    get: function get() {
      return (0, _metalAssign2['default'])({}, this.shadowedSerializers);
    },
    set: function set(values) {
      this.shadowedSerializers = (0, _metalAssign2['default'])({}, values);
    },
    configurable: true,
    enumerable: true
  },
  adapters: {
    get: function get() {
      return (0, _metalAssign2['default'])({}, this.shadowedAdapters);
    },
    set: function set(values) {
      this.shadowedAdapters = (0, _metalAssign2['default'])({}, values);
    },
    configurable: true,
    enumerable: true
  }
}));

exports['default'] = ShopClient;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _shopClient = require('./shop-client');

var _shopClient2 = _interopRequireDefault(_shopClient);

require('./isomorphic-fetch');

require('./isomorphic-btoa');

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
  ShopClient: _shopClient2['default'],
  Config: _config2['default'],

  /**
   * Create a ShopClient. This is the main entry point to the SDK.
   *
   * ```javascript
   * const client = ShopifyBuy.buildClient({
   *   apiKey: 'abc123',
   *   appId: 123456,
   *   myShopifyDomain: 'myshop'
   * });
   * ```
   *
   * @method buildClient
   * @for ShopifyBuy
   * @static
   * @public
   * @param {Object} configAttrs An object of required config data.
   * @param {String} configAttrs.apiKey Your api client's public token.
   * @param {String} configAttrs.appId The app whose listings the client will be
   * using. If you are just modifying a buy button, the buy-button's app id is
   * 6. Otherwise, obtain the app id of the app you're modifying or extending.
   * @param {String} configAttrs.myShopifyDomain You shop's `myshopify.com`
   * domain.
   * @return {ShopClient} a client for the shop using your api credentials.
   */
  buildClient: function buildClient() {
    var configAttrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var config = new this.Config(configAttrs);

    return new this.ShopClient(config);
  }
};

exports['default'] = Shopify;
module.exports = exports['default'];