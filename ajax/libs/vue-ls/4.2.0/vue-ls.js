(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueStorage = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /* eslint class-methods-use-this: off */
  var ls = {};

  var MemoryStorageInterface =
  /*#__PURE__*/
  function () {
    function MemoryStorageInterface() {
      _classCallCheck(this, MemoryStorageInterface);

      Object.defineProperty(this, 'length', {
        /**
         * Define length property
         *
         * @return {number}
         */
        get: function get() {
          return Object.keys(ls).length;
        }
      });
    }
    /**
     * Get item
     *
     * @param {string} name
     * @returns {*}
     */


    _createClass(MemoryStorageInterface, [{
      key: "getItem",
      value: function getItem(name) {
        return name in ls ? ls[name] : null;
      }
      /**
       * Set item
       *
       * @param {string} name
       * @param {*} value
       * @returns {boolean}
       */

    }, {
      key: "setItem",
      value: function setItem(name, value) {
        ls[name] = value;
        return true;
      }
      /**
       * Remove item
       *
       * @param {string} name
       * @returns {boolean}
       */

    }, {
      key: "removeItem",
      value: function removeItem(name) {
        var found = name in ls;

        if (found) {
          return delete ls[name];
        }

        return false;
      }
      /**
       * Clear storage
       *
       * @returns {boolean}
       */

    }, {
      key: "clear",
      value: function clear() {
        ls = {};
        return true;
      }
      /**
       * Get item by key
       *
       * @param {number} index
       * @returns {*}
       */

    }, {
      key: "key",
      value: function key(index) {
        var keys = Object.keys(ls);
        return typeof keys[index] !== 'undefined' ? keys[index] : null;
      }
    }]);

    return MemoryStorageInterface;
  }();

  var MemoryStorage = new MemoryStorageInterface();

  var listeners = {};
  /**
   * Event class
   */

  var WebStorageEvent =
  /*#__PURE__*/
  function () {
    function WebStorageEvent() {
      _classCallCheck(this, WebStorageEvent);
    }

    _createClass(WebStorageEvent, null, [{
      key: "on",

      /**
       * Add storage change event
       *
       * @param {string} name
       * @param {Function} callback
       */
      value: function on(name, callback) {
        if (typeof listeners[name] === 'undefined') {
          listeners[name] = [];
        }

        listeners[name].push(callback);
      }
      /**
       * Remove storage change event
       *
       * @param {string} name
       * @param {Function} callback
       */

    }, {
      key: "off",
      value: function off(name, callback) {
        if (listeners[name].length) {
          listeners[name].splice(listeners[name].indexOf(callback), 1);
        } else {
          listeners[name] = [];
        }
      }
      /**
       * Emit event
       *
       * @param {Object} event
       */

    }, {
      key: "emit",
      value: function emit(event) {
        var e = event || window.event;

        var getValue = function getValue(data) {
          try {
            return JSON.parse(data).value;
          } catch (err) {
            return data;
          }
        };

        var fire = function fire(listener) {
          var newValue = getValue(e.newValue);
          var oldValue = getValue(e.oldValue);
          listener(newValue, oldValue, e.url || e.uri);
        };

        if (typeof e === 'undefined' || typeof e.key === 'undefined') {
          return;
        }

        var all = listeners[e.key];

        if (typeof all !== 'undefined') {
          all.forEach(fire);
        }
      }
    }]);

    return WebStorageEvent;
  }();

  /**
   * Storage Bridge
   */

  var WebStorage =
  /*#__PURE__*/
  function () {
    /**
     * @param {Object} storage
     */
    function WebStorage(storage) {
      _classCallCheck(this, WebStorage);

      this.storage = storage;
      this.options = {
        namespace: '',
        events: ['storage']
      };
      Object.defineProperty(this, 'length', {
        /**
         * Define length property
         *
         * @return {number}
         */
        get: function get() {
          return this.storage.length;
        }
      });

      if (typeof window !== 'undefined') {
        for (var i in this.options.events) {
          if (window.addEventListener) {
            window.addEventListener(this.options.events[i], WebStorageEvent.emit, false);
          } else if (window.attachEvent) {
            window.attachEvent("on".concat(this.options.events[i]), WebStorageEvent.emit);
          } else {
            window["on".concat(this.options.events[i])] = WebStorageEvent.emit;
          }
        }
      }
    }
    /**
     * Set Options
     *
     * @param {Object} options
     */


    _createClass(WebStorage, [{
      key: "setOptions",
      value: function setOptions() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.options = Object.assign(this.options, options);
      }
      /**
       * Set item
       *
       * @param {string} name
       * @param {*} value
       * @param {number} expire - seconds
       */

    }, {
      key: "set",
      value: function set(name, value) {
        var expire = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var stringifyValue = JSON.stringify({
          value: value,
          expire: expire !== null ? new Date().getTime() + expire : null
        });
        this.storage.setItem(this.options.namespace + name, stringifyValue);
      }
      /**
       * Get item
       *
       * @param {string} name
       * @param {*} def - default value
       * @returns {*}
       */

    }, {
      key: "get",
      value: function get(name) {
        var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var item = this.storage.getItem(this.options.namespace + name);

        if (item !== null) {
          try {
            var data = JSON.parse(item);

            if (data.expire === null) {
              return data.value;
            }

            if (data.expire >= new Date().getTime()) {
              return data.value;
            }

            this.remove(name);
          } catch (err) {
            return def;
          }
        }

        return def;
      }
      /**
       * Get item by key
       *
       * @param {number} index
       * @return {*}
       */

    }, {
      key: "key",
      value: function key(index) {
        return this.storage.key(index);
      }
      /**
       * Remove item
       *
       * @param {string} name
       * @return {boolean}
       */

    }, {
      key: "remove",
      value: function remove(name) {
        return this.storage.removeItem(this.options.namespace + name);
      }
      /**
       * Clear storage
       */

    }, {
      key: "clear",
      value: function clear() {
        if (this.length === 0) {
          return;
        }

        var removedKeys = [];

        for (var i = 0; i < this.length; i++) {
          var key = this.storage.key(i);
          var regexp = new RegExp("^".concat(this.options.namespace, ".+"), 'i');

          if (regexp.test(key) === false) {
            continue;
          }

          removedKeys.push(key);
        }

        for (var _key in removedKeys) {
          this.storage.removeItem(removedKeys[_key]);
        }
      }
      /**
       * Add storage change event
       *
       * @param {string} name
       * @param {Function} callback
       */

    }, {
      key: "on",
      value: function on(name, callback) {
        WebStorageEvent.on(this.options.namespace + name, callback);
      }
      /**
       * Remove storage change event
       *
       * @param {string} name
       * @param {Function} callback
       */

    }, {
      key: "off",
      value: function off(name, callback) {
        WebStorageEvent.off(this.options.namespace + name, callback);
      }
    }]);

    return WebStorage;
  }();

  var _global = typeof window !== 'undefined' ? window : global || {};
  /**
   * @type {{install: (function(Object, Object): WebStorage)}}
   */


  var VueStorage = {
    /**
     * use storage
     *
     * @param {Object} options
     * @returns {WebStorage}
     */
    useStorage: function useStorage(options) {
      var _options = _objectSpread2(_objectSpread2({}, options), {}, {
        storage: options.storage || 'local',
        name: options.name || 'ls'
      });

      if (_options.storage && ['memory', 'local', 'session'].indexOf(_options.storage) === -1) {
        throw new Error("Vue-ls: Storage \"".concat(_options.storage, "\" is not supported"));
      }

      var store = null;

      switch (_options.storage) {
        // eslint-disable-line
        case 'local':
          try {
            store = 'localStorage' in _global ? _global.localStorage : null;
          } catch (e) {// In some situations the browser will throw a security exception when attempting to access
          }

          break;

        case 'session':
          try {
            store = 'sessionStorage' in _global ? _global.sessionStorage : null;
          } catch (e) {// In some situations the browser will throw a security exception when attempting to access
          }

          break;

        case 'memory':
          store = MemoryStorage;
          break;
      }

      if (!store) {
        store = MemoryStorage; // eslint-disable-next-line

        console.error("Vue-ls: Storage \"".concat(_options.storage, "\" is not supported your system, use memory storage"));
      }

      var ls = new WebStorage(store);
      ls.setOptions(Object.assign(ls.options, {
        namespace: ''
      }, _options || {}));
      return {
        ls: ls,
        _options: _options
      };
    },

    /**
     * Install plugin
     *
     * @param {Object} Vue
     * @param {Object} options
     * @returns {WebStorage}
     */
    install: function install(Vue) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _this$useStorage = this.useStorage(options),
          ls = _this$useStorage.ls,
          _options = _this$useStorage._options;

      Vue[_options.name] = ls; // eslint-disable-line

      Object.defineProperty(Vue.prototype || Vue.config.globalProperties, "$".concat(_options.name), {
        /**
         * Define $ls property
         *
         * @return {WebStorage}
         */
        get: function get() {
          return ls;
        }
      });
    }
  }; // eslint-disable-next-line

  _global.VueStorage = VueStorage;

  return VueStorage;

})));
