(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueLocalStorage = factory());
}(this, (function () { 'use strict';

var ls = {};

var memoryStorage = {
  /**
   * Get item
   *
   * @param {string} name
   * @returns {*}
   */
  getItem: function getItem(name) {
    return name in ls ? ls[name] : null;
  },


  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @returns {boolean}
   */
  setItem: function setItem(name, value) {
    ls[name] = value;

    return true;
  },


  /**
   * Remove item
   *
   * @param {string} name
   * @returns {boolean}
   */
  removeItem: function removeItem(name) {
    var found = name in ls;

    if (found) {
      return delete ls[name];
    }

    return false;
  },


  /**
   * Clear storage
   *
   * @returns {boolean}
   */
  clear: function clear() {
    ls = {};

    return true;
  },


  /**
   * Get item by key
   *
   * @param {number} index
   * @returns {*}
   */
  key: function key(index) {
    var keys = Object.keys(ls);

    return typeof keys[index] !== 'undefined' ? keys[index] : null;
  }
};

Object.defineProperty(memoryStorage, 'length', {
  /**
   * Define length property
   *
   * @return {number}
   */
  get: function get() {
    return Object.keys(ls).length;
  }
});

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var listeners = {};

/**
 * Event class
 */

var _class$1 = function () {
  function _class() {
    _classCallCheck$1(this, _class);
  }

  _createClass$1(_class, null, [{
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

  return _class;
}();

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Storage Bridge
 */

var _class = function () {
  /**
   * @param {Object} storage
   */
  function _class(storage) {
    _classCallCheck(this, _class);

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
          window.addEventListener(this.options.events[i], _class$1.emit, false);
        } else if (window.attachEvent) {
          window.attachEvent('on' + this.options.events[i], _class$1.emit);
        } else {
          window['on' + this.options.events[i]] = _class$1.emit;
        }
      }
    }
  }

  /**
   * Set Options
   *
   * @param {Object} options
   */


  _createClass(_class, [{
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
      _class$1.on(this.options.namespace + name, callback);
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
      _class$1.off(this.options.namespace + name, callback);
    }
  }]);

  return _class;
}();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * @type {{install: (function(Object, Object): Storage)}}
 */
var VueLocalStorage = {
  /**
   * Install plugin
   *
   * @param {Object} Vue
   * @param {Object} options
   * @returns {Storage}
   */
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _options = _extends({}, options, {
      storage: !!options.storage ? options.storage : 'local',
      name: options.name || 'ls'
    });

    if (_options.storage && ['memory', 'local', 'session'].indexOf(_options.storage) === -1) {
      throw new Error('Vue-ls: Storage "' + _options.storage + '" is not supported');
    }

    var store = null;

    switch (_options.storage) {// eslint-disable-line
      case 'local':
        store = typeof window !== 'undefined' && 'localStorage' in window ? window.localStorage : null;
        break;

      case 'session':
        store = typeof window !== 'undefined' && 'sessionStorage' in window ? window.sessionStorage : null;
        break;
      case 'memory':
        store = memoryStorage;
        break;
    }

    if (!store) {
      store = memoryStorage;
      // eslint-disable-next-line
      console.error('Vue-ls: Storage "' + _options.storage + '" is not supported your system, use memory storage');
    }

    var ls = new _class(store);

    ls.setOptions(_extends(ls.options, {
      namespace: ''
    }, _options || {}));

    Vue[_options.name] = ls; // eslint-disable-line
    Object.defineProperty(Vue.prototype, '$' + _options.name, {
      /**
       * Define $ls property
       *
       * @return {Storage}
       */
      get: function get() {
        return ls;
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.VueLocalStorage = VueLocalStorage;
}

return VueLocalStorage;

})));
