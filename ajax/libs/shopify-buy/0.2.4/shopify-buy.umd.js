/**
* The MIT License (MIT)
* 
* Copyright (c) 2016 Shopify Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be included
* in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
* OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
* IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
* CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
* TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
* SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
* 
* Version: 0.2.4 Commit: 64cd590
**/
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('shopify-buy', ['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.ShopifyBuy = mod.exports;
  }
})(this, function (module) {
  'use strict';

  /* eslint no-undefined: 0 */

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

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

  var assign$1 = assign;

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

  var includes$1 = includes;

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
      return !includes$1(['constructor', 'static'], key);
    });

    assign$1(Constructor, parent);

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

  var CoreObject = createClass({
    constructor: function constructor() {},


    static: {
      extend: function extend(subClassProps) {
        return createClass(subClassProps, this);
      }
    }
  });

  function wrapConsole(logCommand) {
    var logMethod = function logMethod() {
      var log = void 0;

      /* eslint-disable no-console */
      if (console[logCommand]) {
        log = Function.prototype.bind.call(console[logCommand], console);
      } else {
        log = Function.prototype.bind.call(console.log, console);
      }
      log.apply(undefined, arguments);
      /* eslint-enable no-console */
    };

    return function () {
      var args = [].concat(Array.prototype.slice.call(arguments));

      args.unshift('[JS-BUY-SDK]: ');
      logMethod.apply(undefined, _toConsumableArray(args));
    };
  }

  var Logger = CoreObject.extend({
    constructor: function constructor() {},

    debug: wrapConsole('debug'),
    info: wrapConsole('info'),
    warn: wrapConsole('warn'),
    error: wrapConsole('error')
  });

  var logger = new Logger();

  /**
   * @module shopify-buy
   * @submodule config
   */

  var Config = CoreObject.extend({
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
      logger.warn('Config - ', 'myShopifyDomain is deprecated, please use domain and provide the full shop domain.');
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

  var version = undefined;

  var BaseModel = CoreObject.extend({
    constructor: function constructor() {
      var attrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var metaAttrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      this.attrs = attrs;

      assign$1(this, metaAttrs);
    },

    attrs: null,
    serializer: null,
    adapter: null,
    shopClient: null
  });

  /**
    * Class for product option
    * @class Option
    * @constructor
  */
  var ProductOptionModel = BaseModel.extend({
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
      if (includes$1(this.values, value)) {
        this._selected = value;
      } else {
        throw new Error('Invalid option selection for ' + this.name + '.');
      }

      return value;
    }
  });

  /**
    * Model for product variant
    * @class ProductVariantModel
    * @constructor
  */
  var ProductVariantModel = BaseModel.extend({
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

  function uniq(array) {
    return array.reduce(function (uniqueArray, item) {
      if (uniqueArray.indexOf(item) < 0) {
        uniqueArray.push(item);
      }

      return uniqueArray;
    }, []);
  }

  var NO_IMAGE_URI = 'https://widgets.shopifyapps.com/assets/no-image.svg';

  /**
     * Class for products returned by fetch('product')
     * @class ProductModel
     * @constructor
   */
  var ProductModel = BaseModel.extend({
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

        var values = uniq(dupedValues);

        return new ProductOptionModel({ name: name, values: values });
      });

      return this.memoized.options;
    },

    /**
      * All variants of a product.
      * @property variants
      * @type {Array|ProductVariantModel} array of ProductVariantModel instances.
    */
    get variants() {
      var _this2 = this;

      return this.attrs.variants.map(function (variant) {
        return new ProductVariantModel({ variant: variant, product: _this2 }, { config: _this2.config });
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

  var ListingsSerializer = CoreObject.extend({
    constructor: function constructor(config) {
      this.config = config;
    },
    rootKeyForType: function rootKeyForType(type) {
      return type.slice(0, -1) + '_listing';
    },


    models: {
      collections: BaseModel,
      products: ProductModel
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
      var _this3 = this;

      var collectionPayload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var metaAttrs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var models = collectionPayload[this.rootKeyForType(type) + 's'];

      return models.map(function (attrs) {
        var model = _this3.modelFromAttrs(type, attrs, metaAttrs);

        return model;
      });
    },
    modelFromAttrs: function modelFromAttrs(type, attrs, metaAttrs) {
      var Model = this.modelForType(type);

      metaAttrs.config = this.config;

      return new Model(attrs, metaAttrs);
    }
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

    var xhr = new XMLHttpRequest();

    if (!('withCredentials' in xhr)) {
      return ie9Ajax.apply(undefined, arguments);
    }

    opts.method = method;
    opts.mode = 'cors';

    return fetch(url, opts).then(checkStatus).then(parseResponse);
  }

  var ListingsAdapter = CoreObject.extend({
    ajax: ajax,

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
        'X-SDK-Version': version

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

  var CartLineItem = BaseModel.extend({
    constructor: function constructor() {
      this.super.apply(this, arguments);
    },


    get id() {
      return this.attrs[GUID_KEY];
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

  /* global global */

  var globalNamespace = void 0;

  if (typeof global === 'undefined') {
    globalNamespace = window;
  } else {
    globalNamespace = global;
  }

  var global$1 = globalNamespace;

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

  var CartModel = BaseModel.extend({
    constructor: function constructor() {
      this.super.apply(this, arguments);
    },


    /**
      * get ID for current cart
      * @property id
      * @type {String}
    */
    get id() {
      return this.attrs[GUID_KEY];
    },

    /**
      * Get current line items for cart
      * @property lineItems
      * @type {Array}
    */
    get lineItems() {
      return (this.attrs.line_items || []).map(function (item) {
        return new CartLineItem(item);
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

      if (typeof global$1.ga === 'function') {
        var linkerParam = void 0;

        global$1.ga(function (tracker) {
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

        setGuidFor(lineItem);

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
      var _this4 = this;

      return this.shopClient.update('carts', this).then(function (updateCart) {
        assign$1(_this4.attrs, updateCart.attrs);

        return _this4;
      });
    }
  });

  var CartSerializer = CoreObject.extend({
    constructor: function constructor(config) {
      this.config = config;
    },
    rootKeyForType: function rootKeyForType(type) {
      return type.slice(0, -1);
    },
    modelForType: function modelForType() /* type */{
      return CartModel;
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
      var attrs = assign$1({}, model.attrs);

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

  var ReferenceModel = BaseModel.extend({
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
      return this.attrs[GUID_KEY];
    },

    get referenceId() {
      return this.attrs.referenceId;
    },
    set referenceId(value) {
      this.attrs.referenceId = value;

      return value;
    }

  });

  var ReferenceSerializer = CoreObject.extend({
    constructor: function constructor(config) {
      this.config = config;
    },
    modelForType: function modelForType() /* type */{
      return ReferenceModel;
    },
    deserializeSingle: function deserializeSingle(type) {
      var singlePayload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var metaAttrs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var Model = this.modelForType(type);

      return new Model(singlePayload, metaAttrs);
    },
    serialize: function serialize(type, model) {
      var attrs = assign$1({}, model.attrs);

      return attrs;
    }
  });

  var Store = CoreObject.extend({
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
        var storage = global$1[type];
        var x = '__storage_test__';

        storage.setItem(x, x);
        storage.removeItem(x);

        return true;
      } catch (e) {
        return false;
      }
    }
  });

  var LocalStorageAdapter = CoreObject.extend({
    constructor: function constructor() {
      this.store = new Store();
    },
    idKeyForType: function idKeyForType() /* type */{
      return GUID_KEY;
    },
    fetchSingle: function fetchSingle(type, id) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        var value = _this5.store.getItem(_this5.storageKey(type, id));

        if (value === null) {
          reject(new Error(type + '#' + id + ' not found'));

          return;
        }

        resolve(value);
      });
    },
    create: function create(type, payload) {
      var _this6 = this;

      return new Promise(function (resolve) {
        var id = _this6.identify(payload);

        _this6.store.setItem(_this6.storageKey(type, id), payload);
        resolve(payload);
      });
    },
    update: function update(type, id, payload) {
      var _this7 = this;

      return new Promise(function (resolve) {
        _this7.store.setItem(_this7.storageKey(type, id), payload);
        resolve(payload);
      });
    },
    storageKey: function storageKey(type, id) {
      return type + '.' + id;
    },
    identify: function identify(payload) {
      var keys = Object.keys(payload);

      if (keys.length === 1 && _typeof(payload[keys[0]]) === 'object') {
        return setGuidFor(payload[keys[0]]);
      }

      return setGuidFor(payload);
    }
  });

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

  var ShopClient = CoreObject.extend({
    constructor: function constructor(config) {
      this.config = config;

      this.serializers = {
        products: ListingsSerializer,
        collections: ListingsSerializer,
        carts: CartSerializer,
        references: ReferenceSerializer
      };

      this.adapters = {
        products: ListingsAdapter,
        collections: ListingsAdapter,
        carts: LocalStorageAdapter,
        references: LocalStorageAdapter
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
      return assign$1({}, this.shadowedSerializers);
    },

    set serializers(values) {
      this.shadowedSerializers = assign$1({}, values);
    },

    get adapters() {
      return assign$1({}, this.shadowedAdapters);
    },

    set adapters(values) {
      this.shadowedAdapters = assign$1({}, values);
    },

    fetchAll: function fetchAll(type) {
      var _this8 = this;

      var adapter = new this.adapters[type](this.config);

      return adapter.fetchMultiple(type).then(function (payload) {
        return _this8.deserialize(type, payload, adapter, null, { multiple: true });
      });
    },
    fetch: function fetch(type, id) {
      var _this9 = this;

      var adapter = new this.adapters[type](this.config);

      return adapter.fetchSingle(type, id).then(function (payload) {
        return _this9.deserialize(type, payload, adapter, null, { single: true });
      });
    },
    fetchQuery: function fetchQuery(type, query) {
      var _this10 = this;

      var adapter = new this.adapters[type](this.config);

      return adapter.fetchMultiple(type, query).then(function (payload) {
        return _this10.deserialize(type, payload, adapter, null, { multiple: true });
      });
    },
    create: function create(type) {
      var _this11 = this;

      var modelAttrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var adapter = new this.adapters[type](this.config);
      var serializer = new this.serializers[type](this.config);
      var Model = serializer.modelForType(type);
      var model = new Model(modelAttrs, { shopClient: this });
      var attrs = serializer.serialize(type, model);

      return adapter.create(type, attrs).then(function (payload) {
        return _this11.deserialize(type, payload, adapter, serializer, { single: true });
      });
    },
    update: function update(type, updatedModel) {
      var _this12 = this;

      var adapter = updatedModel.adapter;
      var serializer = updatedModel.serializer;
      var serializedModel = serializer.serialize(type, updatedModel);
      var id = updatedModel.attrs[adapter.idKeyForType(type)];

      return adapter.update(type, id, serializedModel).then(function (payload) {
        return _this12.deserialize(type, payload, adapter, serializer, { single: true });
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

      assign$1(attrs, baseAttrs);
      assign$1(attrs, userAttrs);

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
      var _this13 = this;

      return this.fetch('references', this.config.domain + '.recent-cart').then(function (reference) {
        var cartId = reference.referenceId;

        return _this13.fetchCart(cartId);
      }).catch(function () {
        return _this13.createCart().then(function (cart) {
          var refAttrs = {
            referenceId: cart.id
          };

          refAttrs[GUID_KEY] = _this13.config.domain + '.recent-cart';

          _this13.create('references', refAttrs);

          return cart;
        });
      });
    }
  });

  function isNodeLikeEnvironment() {
    var windowAbsent = typeof window === 'undefined';
    var requirePresent = typeof require === 'function';

    return windowAbsent && requirePresent;
  }

  var fetch$1 = global$1.fetch;

  if (!fetch$1 && isNodeLikeEnvironment()) {
    /* this indirection is needed because babel throws errors when
     * transpiling require('node-fetch') using `amd` plugin with babel6
     */
    var localRequire = require;

    global$1.fetch = localRequire('node-fetch');
    global$1.Response = global$1.fetch.Response;
  }

  var btoa$1 = global$1.btoa;

  if (!btoa$1 && isNodeLikeEnvironment()) {
    global$1.btoa = function (string) {
      return new Buffer(string).toString('base64');
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
    ShopClient: ShopClient,
    Config: Config,
    version: version,
    NO_IMAGE_URI: NO_IMAGE_URI,

    buildClient: function buildClient() {
      var configAttrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var config = new this.Config(configAttrs);

      return new this.ShopClient(config);
    }
  };

  module.exports = Shopify;
});
