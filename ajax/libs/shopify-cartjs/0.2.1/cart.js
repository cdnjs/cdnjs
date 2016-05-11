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
      dataAPI: true,
      requestBodyClass: null,
      rivetsModels: {},
      moneyFormat: null,
      moneyWithCurrencyFormat: null
    },
    cart: new Cart()
  };

  CartJS.init = function(cart, settings) {
    if (settings == null) {
      settings = {};
    }
    CartJS.configure(settings);
    CartJS.cart.update(cart);
    if (CartJS.settings.dataAPI) {
      CartJS.Data.init();
    }
    if (CartJS.settings.requestBodyClass) {
      $(document).on('cart.requestStarted', function() {
        return $('body').addClass(CartJS.settings.requestBodyClass);
      });
      $(document).on('cart.requestComplete', function() {
        return $('body').removeClass(CartJS.settings.requestBodyClass);
      });
    }
    return CartJS.Rivets.init();
  };

  CartJS.configure = function(settings) {
    if (settings == null) {
      settings = {};
    }
    return CartJS.Utils.extend(CartJS.settings, settings);
  };

  CartJS.Utils = {
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
    formatMoney: function(value, format) {
      var _ref;
      if (((_ref = window.Shopify) != null ? _ref.formatMoney : void 0) != null) {
        return Shopify.formatMoney(value, format);
      } else {
        return value;
      }
    },
    getSizedImageUrl: function(src, size) {
      var _ref, _ref1;
      if (((_ref = window.Shopify) != null ? (_ref1 = _ref.Image) != null ? _ref1.getSizedImageUrl : void 0 : void 0) != null) {
        return Shopify.Image.getSizedImageUrl(src, size);
      } else {
        return src;
      }
    }
  };

  queue = [];

  processing = false;

  CartJS.Queue = {
    add: function(url, data, callback, type, dataType) {
      if (type == null) {
        type = 'POST';
      }
      if (dataType == null) {
        dataType = 'json';
      }
      queue.push({
        url: url,
        data: data,
        success: callback,
        type: type,
        dataType: dataType
      });
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
    getCart: function() {
      return CartJS.Queue.add('/cart.js', {}, CartJS.cart.update, 'GET');
    },
    addItem: function(id, quantity, properties) {
      var data;
      if (quantity == null) {
        quantity = 1;
      }
      if (properties == null) {
        properties = {};
      }
      data = CartJS.Utils.wrapKeys(properties);
      data.id = id;
      data.quantity = quantity;
      CartJS.Queue.add('/cart/add.js', data);
      return CartJS.Core.getCart();
    },
    updateItem: function(line, quantity, properties) {
      var data;
      if (properties == null) {
        properties = {};
      }
      data = CartJS.Utils.wrapKeys(properties);
      data.line = line;
      if (quantity != null) {
        data.quantity = quantity;
      }
      return CartJS.Queue.add('/cart/change.js', data, CartJS.cart.update);
    },
    removeItem: function(line) {
      return CartJS.Core.updateItem(line, 0);
    },
    updateItemById: function(id, quantity, properties) {
      var data;
      if (properties == null) {
        properties = {};
      }
      data = CartJS.Utils.wrapKeys(properties);
      data.id = id;
      if (quantity != null) {
        data.quantity = quantity;
      }
      return CartJS.Queue.add('/cart/change.js', data, CartJS.cart.update);
    },
    removeItemById: function(id) {
      var data;
      data = {
        id: id,
        quantity: 0
      };
      return CartJS.Queue.add('/cart/change.js', data, CartJS.cart.update);
    },
    clear: function() {
      return CartJS.Queue.add('/cart/clear.js', {}, CartJS.cart.update);
    },
    getAttribute: function(attributeName, defaultValue) {
      if (attributeName in CartJS.cart.attributes) {
        return CartJS.cart.attributes[attributeName];
      } else {
        return defaultValue;
      }
    },
    setAttribute: function(attributeName, value) {
      var attributes;
      attributes = {};
      attributes[attributeName] = value;
      return CartJS.Core.setAttributes(attributes);
    },
    getAttributes: function() {
      return CartJS.cart.attributes;
    },
    setAttributes: function(attributes) {
      if (attributes == null) {
        attributes = {};
      }
      return CartJS.Queue.add('/cart/update.js', CartJS.Utils.wrapKeys(attributes, 'attributes'), CartJS.cart.update);
    },
    clearAttributes: function() {
      return CartJS.Queue.add('/cart/update.js', CartJS.Utils.wrapKeys(CartJS.Core.getAttributes(), 'attributes', ''), CartJS.cart.update);
    },
    getNote: function() {
      return CartJS.cart.note;
    },
    setNote: function(note) {
      return CartJS.Queue.add('/cart/update.js', {
        note: note
      }, CartJS.cart.update);
    }
  };

  $document = jQuery(document);

  CartJS.Data = {
    init: function() {
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
      return CartJS.Core.addItem($this.data('cartAdd'), $this.data('cartQuantity'));
    },
    remove: function(e) {
      var $this;
      e.preventDefault();
      $this = jQuery(this);
      return CartJS.Core.removeItem($this.data('cartRemove'));
    },
    removeById: function(e) {
      var $this;
      e.preventDefault();
      $this = jQuery(this);
      return CartJS.Core.removeItemById($this.data('cartRemoveId'));
    },
    update: function(e) {
      var $this;
      e.preventDefault();
      $this = jQuery(this);
      return CartJS.Core.updateItem($this.data('cartUpdate'), $this.data('cartQuantity'));
    },
    updateById: function(e) {
      var $this;
      e.preventDefault();
      $this = jQuery(this);
      return CartJS.Core.updateItemById($this.data('cartUpdateId'), $this.data('cartQuantity'));
    },
    clear: function(e) {
      e.preventDefault();
      return CartJS.Core.clear();
    },
    toggle: function(e) {
      var $input, id;
      $input = jQuery(this);
      id = $input.data('cartToggle');
      if ($input.is(':checked')) {
        return CartJS.Core.addItem(id);
      } else {
        return CartJS.Core.removeAll(id);
      }
    },
    toggleAttribute: function(e) {
      var $input, attribute;
      $input = jQuery(this);
      attribute = $input.data('cartToggleAttribute');
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
        'total_price_money': CartJS.Utils.formatMoney(cart.total_price, CartJS.settings.moneyFormat),
        'total_price_money_with_currency': CartJS.Utils.formatMoney(cart.total_price, CartJS.settings.moneyWithCurrencyFormat)
      };
      return jQuery('[data-cart-render]').each(function() {
        var $this;
        $this = jQuery(this);
        return $this.text(context[$this.data('cartRender')]);
      });
    }
  };

  if ('rivets' in window) {
    CartJS.Rivets = {
      views: [],
      init: function() {
        return CartJS.Rivets.bindViews();
      },
      destroy: function() {
        return CartJS.Rivets.unbindViews();
      },
      bindViews: function() {
        var models;
        CartJS.Rivets.unbindViews();
        models = CartJS.Utils.extend({
          cart: CartJS.cart
        }, CartJS.settings.rivetsModels);
        return jQuery('[data-cart-view]').each(function() {
          return CartJS.Rivets.views.push(rivets.bind(this, models));
        });
      },
      unbindViews: function() {
        var view, _i, _len, _ref;
        _ref = CartJS.Rivets.views;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          view.unbind();
        }
        return CartJS.Rivets.views = [];
      }
    };
    rivets.formatters.eq = function(a, b) {
      return a === b;
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
    rivets.formatters.money = function(value) {
      return CartJS.Utils.formatMoney(value, CartJS.settings.moneyFormat);
    };
    rivets.formatters.money_with_currency = function(value) {
      return CartJS.Utils.formatMoney(value, CartJS.settings.moneyWithCurrencyFormat);
    };
    rivets.formatters.productImageSize = function(src, size) {
      return CartJS.Utils.getSizedImageUrl(src, size);
    };
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
    exports.addItem = CartJS.Core.addItem;
    exports.updateItem = CartJS.Core.updateItem;
    exports.updateItemById = CartJS.Core.updateItemById;
    exports.removeItem = CartJS.Core.removeItem;
    exports.removeAll = CartJS.Core.removeAll;
    exports.clear = CartJS.Core.clear;
    exports.getAttribute = CartJS.Core.getAttribute;
    exports.setAttribute = CartJS.Core.setAttribute;
    exports.getAttributes = CartJS.Core.getAttributes;
    exports.setAttributes = CartJS.Core.setAttributes;
    exports.clearAttributes = CartJS.Core.clearAttributes;
    exports.getNote = CartJS.Core.getNote;
    return exports.setNote = CartJS.Core.setNote;
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
