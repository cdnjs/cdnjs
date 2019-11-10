/*!
 * vue-ls.js 1.0.6
 * (c) 2017 Igor Ognichenko <igor.ognichenko@gmail.com>
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vueLS = factory());
}(this, (function () { 'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var listeners = {};

try {
  var storage = window.localStorage;
  var x = '__storage_test__';

  storage.setItem(x, x);
  storage.removeItem(x);
} catch (e) {
  throw new Error('Local storage not supported by this browser');
}

function change(e) {
  if (!e) {
    e = window.event;
  }

  var all = listeners[e.key];

  if (all) {
    all.forEach(emit);
  }

  function emit(listener) {
    var item = JSON.parse(e.newValue);
    var oldItem = JSON.parse(e.oldValue);
    var val = (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' ? item.value : oldItem;
    var oldVal = oldItem && (typeof oldItem === 'undefined' ? 'undefined' : _typeof(oldItem)) === 'object' ? oldItem.value : oldItem;

    listener(val, oldVal, e.url || e.uri);
  }
}

var VueLocalStorage = function () {
  function VueLocalStorage() {
    _classCallCheck(this, VueLocalStorage);

    this.storage = window.localStorage;

    if (window.addEventListener) {
      window.addEventListener('storage', change, false);
    } else if (window.attachEvent) {
      window.attachEvent('onstorage', change);
    } else {
      window.onstorage = change;
    }

    Object.defineProperty(this, 'length', {
      get: function get() {
        return this.storage.length;
      }
    });
  }

  _createClass(VueLocalStorage, [{
    key: 'install',
    value: function install(Vue, options) {
      this.options = Object.assign({
        namespace: ''
      }, options || {});

      var _this = this;
      Vue.localStorage = _this;
      Object.defineProperty(Vue.prototype, '$localStorage', {
        get: function get() {
          return _this;
        }
      });
    }
  }, {
    key: 'set',
    value: function set(name, value) {
      var expire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this.storage.setItem(this.options.namespace + name, JSON.stringify({ value: value, expire: expire !== null ? new Date().getTime() + expire : null }));
    }
  }, {
    key: 'get',
    value: function get(name) {
      var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var item = this.storage.getItem(this.options.namespace + name);

      if (item !== null) {
        var data = JSON.parse(item);

        if (data.expire === null) {
          return data.value;
        }

        if (data.expire >= new Date().getTime()) {
          return data.value;
        }

        this.remove(name);
      }

      return def;
    }
  }, {
    key: 'key',
    value: function key(index) {
      return this.storage.key(index);
    }
  }, {
    key: 'remove',
    value: function remove(name) {
      return this.storage.removeItem(this.options.namespace + name);
    }
  }, {
    key: 'clear',
    value: function clear() {
      if (this.length === 0) {
        return;
      }

      for (var i = 0; i < this.length; i++) {
        var key = this.storage.key(i);
        var regexp = new RegExp('^' + this.options.namespace + '.+', 'i');

        if (regexp.test(key) === false) {
          continue;
        }

        this.storage.removeItem(key);
      }
    }
  }, {
    key: 'on',
    value: function on(name, callback) {
      if (listeners[name]) {
        listeners[name].push(callback);
      } else {
        listeners[name] = [callback];
      }
    }
  }, {
    key: 'off',
    value: function off(name, callback) {
      var ns = listeners[name];

      if (ns.length > 1) {
        ns.splice(ns.indexOf(callback), 1);
      } else {
        listeners[name] = [];
      }
    }
  }]);

  return VueLocalStorage;
}();

if (typeof window !== 'undefined' && typeof window.Vue !== 'undefined') {
  window.Vue.use(new VueLocalStorage());
}

return VueLocalStorage;

})));
