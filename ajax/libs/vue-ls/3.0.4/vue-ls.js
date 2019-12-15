(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueStorage = factory());
}(this, (function () { 'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint class-methods-use-this: off */

var ls = {};

var MemoryStorageInterface = function () {
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
    key: 'getItem',
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
    key: 'setItem',
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
    key: 'removeItem',
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
    key: 'clear',
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
    key: 'key',
    value: function key(index) {
      var keys = Object.keys(ls);

      return typeof keys[index] !== 'undefined' ? keys[index] : null;
    }
  }]);

  return MemoryStorageInterface;
}();

var MemoryStorage = new MemoryStorageInterface();

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Storage Bridge
 */
var WebStorage$$1 = function () {
  /**
   * @param {Object} storage
   */
  function WebStorage$$1(storage) {
    _classCallCheck$1(this, WebStorage$$1);

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
          window.attachEvent('on' + this.options.events[i], WebStorageEvent.emit);
        } else {
          window['on' + this.options.events[i]] = WebStorageEvent.emit;
        }
      }
    }
  }

  /**
   * Set Options
   *
   * @param {Object} options
   */


  _createClass$1(WebStorage$$1, [{
    key: 'setOptions',
    value: function setOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.options = _extends$1(this.options, options);
    }

    /**
     * Set item
     *
     * @param {string} name
     * @param {*} value
     * @param {number} expire - seconds
     */

  }, {
    key: 'set',
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
    key: 'get',
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
    key: 'key',
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
    key: 'remove',
    value: function remove(name) {
      return this.storage.removeItem(this.options.namespace + name);
    }

    /**
     * Clear storage
     */

  }, {
    key: 'clear',
    value: function clear() {
      if (this.length === 0) {
        return;
      }

      var removedKeys = [];

      for (var i = 0; i < this.length; i++) {
        var key = this.storage.key(i);
        var regexp = new RegExp('^' + this.options.namespace + '.+', 'i');

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
    key: 'on',
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
    key: 'off',
    value: function off(name, callback) {
      WebStorageEvent.off(this.options.namespace + name, callback);
    }
  }]);

  return WebStorage$$1;
}();

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var listeners = {};

/**
 * Event class
 */
var WebStorageEvent = function () {
  function WebStorageEvent() {
    _classCallCheck$2(this, WebStorageEvent);
  }

  _createClass$2(WebStorageEvent, null, [{
    key: 'on',

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
    key: 'off',
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
    key: 'emit',
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// eslint-disable-next-line
var _global = typeof window !== 'undefined' ? window : global || {};

/**
 * @type {{install: (function(Object, Object): WebStorage)}}
 */
var VueStorage = {
  /**
   * Install plugin
   *
   * @param {Object} Vue
   * @param {Object} options
   * @returns {WebStorage}
   */
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _options = _extends({}, options, {
      storage: options.storage || 'local',
      name: options.name || 'ls'
    });

    if (_options.storage && ['memory', 'local', 'session'].indexOf(_options.storage) === -1) {
      throw new Error('Vue-ls: Storage "' + _options.storage + '" is not supported');
    }

    var store = null;

    switch (_options.storage) {// eslint-disable-line
      case 'local':
        store = 'localStorage' in _global ? _global.localStorage : null;
        break;

      case 'session':
        store = 'sessionStorage' in _global ? _global.sessionStorage : null;
        break;
      case 'memory':
        store = MemoryStorage;
        break;
    }

    if (!store) {
      store = MemoryStorage;
      // eslint-disable-next-line
      console.error('Vue-ls: Storage "' + _options.storage + '" is not supported your system, use memory storage');
    }

    var ls = new WebStorage$$1(store);

    ls.setOptions(_extends(ls.options, {
      namespace: ''
    }, _options || {}));

    Vue[_options.name] = ls; // eslint-disable-line
    Object.defineProperty(Vue.prototype, '$' + _options.name, {
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
};

_global.VueStorage = VueStorage;

return VueStorage;

})));
