(function() {
  var $document, Cart, CartJS, Item, processing, queue,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Cart = (function() {
    function Cart() {
      this.update = __bind(this.update, this);
    }

    Cart.prototype.update = function(cart) {
      var item, key, value;
      for (key in cart) {
        value = cart[key];
        if (key !== 'items') {
          this[key] = value;
        }
      }
      return this.items = (function() {
        var _i, _len, _ref, _results;
        _ref = cart.items;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(new Item(item));
        }
        return _results;
      })();
    };

    return Cart;

  })();

  Item = (function() {
    function Item(item) {
      this.propertyArray = __bind(this.propertyArray, this);
      this.update = __bind(this.update, this);
      this.update(item);
    }

    Item.prototype.update = function(item) {
      var key, value;
      for (key in item) {
        value = item[key];
        if (key !== 'properties') {
          this[key] = value;
        }
      }
      return this.properties = CartJS.Utils.extend({}, item.properties);
    };

    Item.prototype.propertyArray = function() {
      var name, value, _ref, _results;
      _ref = this.properties;
      _results = [];
      for (name in _ref) {
        value = _ref[name];
        _results.push({
          name: name,
          value: value
        });
      }
      return _results;
    };

    return Item;

  })();

  CartJS = {
    settings: {
      debug: false,
      dataAPI: true,
      requestBodyClass: null,
      rivetsModels: {},
      currency: null,
      moneyFormat: null,
      moneyWithCurrencyFormat: null,
      weightUnit: 'g',
      weightPrecision: 0
    },
    cart: new Cart()
  };

  CartJS.init = function(cart, settings) {
    if (settings == null) {
      settings = {};
    }
    CartJS.configure(settings);
    CartJS.Utils.log('Initialising CartJS.');
    CartJS.cart.update(cart);
    if (CartJS.settings.dataAPI) {
      CartJS.Utils.log('"dataAPI" setting is true, initialising Data API.');
      CartJS.Data.init();
    }
    if (CartJS.settings.requestBodyClass) {
      CartJS.Utils.log('"requestBodyClass" set, adding event listeners.');
      jQuery(document).on('cart.requestStarted', function() {
        return jQuery('body').addClass(CartJS.settings.requestBodyClass);
      });
      jQuery(document).on('cart.requestComplete', function() {
        return jQuery('body').removeClass(CartJS.settings.requestBodyClass);
      });
    }
    CartJS.Rivets.init();
    return jQuery(document).trigger('cart.ready', [CartJS.cart]);
  };

  CartJS.configure = function(settings) {
    if (settings == null) {
      settings = {};
    }
    return CartJS.Utils.extend(CartJS.settings, settings);
  };

  if (window.console == null) {
    window.console = {};
    window.console.log = function() {};
  }

  CartJS.Utils = {
    log: function() {
      return CartJS.Utils.console(console.log, arguments);
    },
    error: function() {
      return CartJS.Utils.console(console.error, arguments);
    },
    console: function(method, args) {
      if (CartJS.settings.debug && (typeof console !== "undefined" && console !== null)) {
        args = Array.prototype.slice.call(args);
        args.unshift('[CartJS]:');
        return method.apply(console, args);
      }
    },
    wrapKeys: function(obj, type, override) {
      var key, value, wrapped;
      if (type == null) {
        type = 'properties';
      }
      wrapped = {};
      for (key in obj) {
        value = obj[key];
        wrapped["" + type + "[" + key + "]"] = override != null ? override : value;
      }
      return wrapped;
    },
    unwrapKeys: function(obj, type, override) {
      var key, unwrapped, unwrappedKey, value;
      if (type == null) {
        type = 'properties';
      }
      unwrapped = {};
      for (key in obj) {
        value = obj[key];
        unwrappedKey = key.replace("" + type + "[", "").replace("]", "");
        unwrapped[unwrappedKey] = override != null ? override : value;
      }
      return unwrapped;
    },
    extend: function(object, properties) {
      var key, val;
      for (key in properties) {
        val = properties[key];
        object[key] = val;
      }
      return object;
    },
    clone: function(object) {
      var key, newInstance;
      if ((object == null) || typeof object !== 'object') {
        return object;
      }
      newInstance = new object.constructor();
      for (key in object) {
        newInstance[key] = clone(object[key]);
      }
      return newInstance;
    },
    isArray: Array.isArray || function(value) {
      return {}.toString.call(value) === '[object Array]';
    },
    ensureArray: function(value) {
      if (CartJS.Utils.isArray(value)) {
        return value;
      }
      if (value != null) {
        return [value];
      } else {
        return [];
      }
    },
    formatMoney: function(value, format, formatName, currency) {
      var _ref, _ref1;
      if (currency == null) {
        currency = '';
      }
      if (!currency) {
        currency = CartJS.settings.currency;
      }
      if ((window.Currency != null) && currency !== CartJS.settings.currency) {
        value = Currency.convert(value, CartJS.settings.currency, currency);
        if ((((_ref = window.Currency) != null ? _ref.moneyFormats : void 0) != null) && (currency in window.Currency.moneyFormats)) {
          format = window.Currency.moneyFormats[currency][formatName];
        }
      }
      if (((_ref1 = window.Shopify) != null ? _ref1.formatMoney : void 0) != null) {
        return Shopify.formatMoney(value, format);
      } else {
        return value;
      }
    },
    getSizedImageUrl: function(src, size) {
      var _ref, _ref1;
      if (((_ref = window.Shopify) != null ? (_ref1 = _ref.Image) != null ? _ref1.getSizedImageUrl : void 0 : void 0) != null) {
        if (src) {
          return Shopify.Image.getSizedImageUrl(src, size);
        } else {
          return Shopify.Image.getSizedImageUrl('https://cdn.shopify.com/s/images/admin/no-image-.gif', size).replace('-_', '-');
        }
      } else {
        if (src) {
          return src;
        } else {
          return 'https://cdn.shopify.com/s/images/admin/no-image-large.gif';
        }
      }
    }
  };

  queue = [];

  processing = false;

  CartJS.Queue = {
    add: function(url, data, options) {
      var request;
      if (options == null) {
        options = {};
      }
      request = {
        url: url,
        data: data,
        type: options.type || 'POST',
        dataType: options.dataType || 'json',
        success: CartJS.Utils.ensureArray(options.success),
        error: CartJS.Utils.ensureArray(options.error),
        complete: CartJS.Utils.ensureArray(options.complete)
      };
      if (options.updateCart) {
        request.success.push(CartJS.cart.update);
      }
      queue.push(request);
      if (processing) {
        return;
      }
      jQuery(document).trigger('cart.requestStarted', [CartJS.cart]);
      return CartJS.Queue.process();
    },
    process: function() {
      var params;
      if (!queue.length) {
        processing = false;
        jQuery(document).trigger('cart.requestComplete', [CartJS.cart]);
        return;
      }
      processing = true;
      params = queue.shift();
      params.complete = CartJS.Queue.process;
      return jQuery.ajax(params);
    }
  };

  CartJS.Core = {
    getCart: function(options) {
      if (options == null) {
        options = {};
      }
      options.type = 'GET';
      options.updateCart = true;
      return CartJS.Queue.add('/cart.js', {}, options);
    },
    addItem: function(id, quantity, properties, options) {
      var data;
      if (quantity == null) {
        quantity = 1;
      }
      if (properties == null) {
        properties = {};
      }
      if (options == null) {
        options = {};
      }
      data = CartJS.Utils.wrapKeys(properties);
      data.id = id;
      data.quantity = quantity;
      CartJS.Queue.add('/cart/add.js', data, options);
      return CartJS.Core.getCart();
    },
    updateItem: function(line, quantity, properties, options) {
      var data;
      if (properties == null) {
        properties = {};
      }
      if (options == null) {
        options = {};
      }
      data = CartJS.Utils.wrapKeys(properties);
      data.line = line;
      if (quantity != null) {
        data.quantity = quantity;
      }
      options.updateCart = true;
      return CartJS.Queue.add('/cart/change.js', data, options);
    },
    removeItem: function(line, options) {
      if (options == null) {
        options = {};
      }
      return CartJS.Core.updateItem(line, 0, {}, options);
    },
    updateItemById: function(id, quantity, properties, options) {
      var data;
      if (properties == null) {
        properties = {};
      }
      if (options == null) {
        options = {};
      }
      data = CartJS.Utils.wrapKeys(properties);
      data.id = id;
      if (quantity != null) {
        data.quantity = quantity;
      }
      options.updateCart = true;
      return CartJS.Queue.add('/cart/change.js', data, options);
    },
    updateItemQuantitiesById: function(updates, options) {
      if (updates == null) {
        updates = {};
      }
      if (options == null) {
        options = {};
      }
      options.updateCart = true;
      return CartJS.Queue.add('/cart/update.js', {
        updates: updates
      }, options);
    },
    removeItemById: function(id, options) {
      var data;
      if (options == null) {
        options = {};
      }
      data = {
        id: id,
        quantity: 0
      };
      options.updateCart = true;
      return CartJS.Queue.add('/cart/change.js', data, options);
    },
    clear: function(options) {
      if (options == null) {
        options = {};
      }
      options.updateCart = true;
      return CartJS.Queue.add('/cart/clear.js', {}, options);
    },
    getAttribute: function(attributeName, defaultValue) {
      if (attributeName in CartJS.cart.attributes) {
        return CartJS.cart.attributes[attributeName];
      } else {
        return defaultValue;
      }
    },
    setAttribute: function(attributeName, value, options) {
      var attributes;
      if (options == null) {
        options = {};
      }
      attributes = {};
      attributes[attributeName] = value;
      return CartJS.Core.setAttributes(attributes, options);
    },
    getAttributes: function() {
      return CartJS.cart.attributes;
    },
    setAttributes: function(attributes, options) {
      if (attributes == null) {
        attributes = {};
      }
      if (options == null) {
        options = {};
      }
      options.updateCart = true;
      return CartJS.Queue.add('/cart/update.js', CartJS.Utils.wrapKeys(attributes, 'attributes'), options);
    },
    clearAttributes: function(options) {
      if (options == null) {
        options = {};
      }
      options.updateCart = true;
      return CartJS.Queue.add('/cart/update.js', CartJS.Utils.wrapKeys(CartJS.Core.getAttributes(), 'attributes', ''), options);
    },
    getNote: function() {
      return CartJS.cart.note;
    },
    setNote: function(note, options) {
      if (options == null) {
        options = {};
      }
      options.updateCart = true;
      return CartJS.Queue.add('/cart/update.js', {
        note: note
      }, options);
    }
  };

  $document = null;

  CartJS.Data = {
    init: function() {
      $document = jQuery(document);
      CartJS.Data.setEventListeners('on');
      return CartJS.Data.render(null, CartJS.cart);
    },
    destroy: function() {
      return CartJS.Data.setEventListeners('off');
    },
    setEventListeners: function(method) {
      $document[method]('click', '[data-cart-add]', CartJS.Data.add);
      $document[method]('click', '[data-cart-remove]', CartJS.Data.remove);
      $document[method]('click', '[data-cart-remove-id]', CartJS.Data.removeById);
      $document[method]('click', '[data-cart-update]', CartJS.Data.update);
      $document[method]('click', '[data-cart-update-id]', CartJS.Data.updateById);
      $document[method]('click', '[data-cart-clear]', CartJS.Data.clear);
      $document[method]('change', '[data-cart-toggle]', CartJS.Data.toggle);
      $document[method]('change', '[data-cart-toggle-attribute]', CartJS.Data.toggleAttribute);
      $document[method]('submit', '[data-cart-submit]', CartJS.Data.submit);
      return $document[method]('cart.requestComplete', CartJS.Data.render);
    },
    add: function(e) {
      var $this;
      e.preventDefault();
      $this = jQuery(this);
      return CartJS.Core.addItem($this.attr('data-cart-add'), $this.attr('data-cart-quantity'));
    },
    remove: function(e) {
      var $this;
      e.preventDefault();
      $this = jQuery(this);
      return CartJS.Core.removeItem($this.attr('data-cart-remove'));
    },
    removeById: function(e) {
      var $this;
      e.preventDefault();
      $this = jQuery(this);
      return CartJS.Core.removeItemById($this.attr('data-cart-remove-id'));
    },
    update: function(e) {
      var $this;
      e.preventDefault();
      $this = jQuery(this);
      return CartJS.Core.updateItem($this.attr('data-cart-update'), $this.attr('data-cart-quantity'));
    },
    updateById: function(e) {
      var $this;
      e.preventDefault();
      $this = jQuery(this);
      return CartJS.Core.updateItemById($this.attr('data-cart-update-id'), $this.attr('data-cart-quantity'));
    },
    clear: function(e) {
      e.preventDefault();
      return CartJS.Core.clear();
    },
    toggle: function(e) {
      var $input, id;
      $input = jQuery(this);
      id = $input.attr('data-cart-toggle');
      if ($input.is(':checked')) {
        return CartJS.Core.addItem(id);
      } else {
        return CartJS.Core.removeItemById(id);
      }
    },
    toggleAttribute: function(e) {
      var $input, attribute;
      $input = jQuery(this);
      attribute = $input.attr('data-cart-toggle-attribute');
      return CartJS.Core.setAttribute(attribute, $input.is(':checked') ? 'Yes' : '');
    },
    submit: function(e) {
      var dataArray, id, properties, quantity;
      e.preventDefault();
      dataArray = jQuery(this).serializeArray();
      id = void 0;
      quantity = void 0;
      properties = {};
      jQuery.each(dataArray, function(i, item) {
        if (item.name === 'id') {
          return id = item.value;
        } else if (item.name === 'quantity') {
          return quantity = item.value;
        } else {
          return properties[item.name] = item.value;
        }
      });
      return CartJS.Core.addItem(id, quantity, CartJS.Utils.unwrapKeys(properties));
    },
    render: function(e, cart) {
      var context;
      context = {
        'item_count': cart.item_count,
        'total_price': cart.total_price,
        'total_price_money': CartJS.Utils.formatMoney(cart.total_price, CartJS.settings.moneyFormat, 'money_format', (typeof Currency !== "undefined" && Currency !== null ? Currency.currentCurrency : void 0) != null ? Currency.currentCurrency : void 0),
        'total_price_money_with_currency': CartJS.Utils.formatMoney(cart.total_price, CartJS.settings.moneyWithCurrencyFormat, 'money_with_currency_format', (typeof Currency !== "undefined" && Currency !== null ? Currency.currentCurrency : void 0) != null ? Currency.currentCurrency : void 0)
      };
      return jQuery('[data-cart-render]').each(function() {
        var $this;
        $this = jQuery(this);
        return $this.html(context[$this.attr('data-cart-render')]);
      });
    }
  };

  if ('rivets' in window) {
    CartJS.Rivets = {
      model: null,
      boundViews: [],
      init: function() {
        return CartJS.Rivets.bindViews();
      },
      destroy: function() {
        return CartJS.Rivets.unbindViews();
      },
      bindViews: function() {
        CartJS.Utils.log('Rivets.js is present, binding views.');
        CartJS.Rivets.unbindViews();
        CartJS.Rivets.model = CartJS.Utils.extend({
          cart: CartJS.cart
        }, CartJS.settings.rivetsModels);
        if (window.Currency != null) {
          CartJS.Rivets.model.Currency = window.Currency;
        }
        return jQuery('[data-cart-view]').each(function() {
          var view;
          view = rivets.bind(jQuery(this), CartJS.Rivets.model);
          return CartJS.Rivets.boundViews.push(view);
        });
      },
      unbindViews: function() {
        var view, _i, _len, _ref;
        _ref = CartJS.Rivets.boundViews;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          view.unbind();
        }
        return CartJS.Rivets.boundViews = [];
      }
    };
    rivets.formatters.eq = function(a, b) {
      return a === b;
    };
    rivets.formatters.includes = function(a, b) {
      return a.indexOf(b) >= 0;
    };
    rivets.formatters.match = function(a, regexp, flags) {
      return a.match(new RegExp(regexp, flags));
    };
    rivets.formatters.lt = function(a, b) {
      return a < b;
    };
    rivets.formatters.gt = function(a, b) {
      return a > b;
    };
    rivets.formatters.not = function(a) {
      return !a;
    };
    rivets.formatters.empty = function(a) {
      return !a.length;
    };
    rivets.formatters.plus = function(a, b) {
      return parseInt(a) + parseInt(b);
    };
    rivets.formatters.minus = function(a, b) {
      return parseInt(a) - parseInt(b);
    };
    rivets.formatters.prepend = function(a, b) {
      return b + a;
    };
    rivets.formatters.append = function(a, b) {
      return a + b;
    };
    rivets.formatters.slice = function(value, start, end) {
      return value.slice(start, end);
    };
    rivets.formatters.pluralize = function(input, singular, plural) {
      if (plural == null) {
        plural = singular + 's';
      }
      if (CartJS.Utils.isArray(input)) {
        input = input.length;
      }
      if (input === 1) {
        return singular;
      } else {
        return plural;
      }
    };
    rivets.formatters.array_element = function(array, index) {
      return array[index];
    };
    rivets.formatters.array_first = function(array) {
      return array[0];
    };
    rivets.formatters.array_last = function(array) {
      return array[array.length - 1];
    };
    rivets.formatters.money = function(value, currency) {
      return CartJS.Utils.formatMoney(value, CartJS.settings.moneyFormat, 'money_format', currency);
    };
    rivets.formatters.money_with_currency = function(value, currency) {
      return CartJS.Utils.formatMoney(value, CartJS.settings.moneyWithCurrencyFormat, 'money_with_currency_format', currency);
    };
    rivets.formatters.weight = function(grams) {
      switch (CartJS.settings.weightUnit) {
        case 'kg':
          return (grams / 1000).toFixed(CartJS.settings.weightPrecision);
        case 'oz':
          return (grams * 0.035274).toFixed(CartJS.settings.weightPrecision);
        case 'lb':
          return (grams * 0.00220462).toFixed(CartJS.settings.weightPrecision);
        default:
          return grams.toFixed(CartJS.settings.weightPrecision);
      }
    };
    rivets.formatters.weight_with_unit = function(grams) {
      return rivets.formatters.weight(grams) + CartJS.settings.weightUnit;
    };
    rivets.formatters.product_image_size = function(src, size) {
      return CartJS.Utils.getSizedImageUrl(src, size);
    };
    rivets.formatters.moneyWithCurrency = rivets.formatters.money_with_currency;
    rivets.formatters.weightWithUnit = rivets.formatters.weight_with_unit;
    rivets.formatters.productImageSize = rivets.formatters.product_image_size;
  } else {
    CartJS.Rivets = {
      init: function() {},
      destroy: function() {}
    };
  }

  CartJS.factory = function(exports) {
    exports.init = CartJS.init;
    exports.configure = CartJS.configure;
    exports.cart = CartJS.cart;
    exports.settings = CartJS.settings;
    exports.getCart = CartJS.Core.getCart;
    exports.addItem = CartJS.Core.addItem;
    exports.updateItem = CartJS.Core.updateItem;
    exports.updateItemById = CartJS.Core.updateItemById;
    exports.updateItemQuantitiesById = CartJS.Core.updateItemQuantitiesById;
    exports.removeItem = CartJS.Core.removeItem;
    exports.removeItemById = CartJS.Core.removeItemById;
    exports.clear = CartJS.Core.clear;
    exports.getAttribute = CartJS.Core.getAttribute;
    exports.setAttribute = CartJS.Core.setAttribute;
    exports.getAttributes = CartJS.Core.getAttributes;
    exports.setAttributes = CartJS.Core.setAttributes;
    exports.clearAttributes = CartJS.Core.clearAttributes;
    exports.getNote = CartJS.Core.getNote;
    exports.setNote = CartJS.Core.setNote;
    return exports.render = CartJS.Data.render;
  };

  if (typeof exports === 'object') {
    CartJS.factory(exports);
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      CartJS.factory(this.CartJS = exports);
      return exports;
    });
  } else {
    CartJS.factory(this.CartJS = {});
  }

}).call(this);
