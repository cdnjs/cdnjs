(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global['vue-ls'] = factory());
}(this, (function () { 'use strict';

var ls$1 = {};

var memoryStorage = {
  /**
   * Get item
   *
   * @param {string} name
   * @returns {*}
   */
  getItem: function getItem(name) {
    return name in ls$1 ? ls$1[name] : null;
  },


  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @returns {boolean}
   */
  setItem: function setItem(name, value) {
    ls$1[name] = value;

    return true;
  },


  /**
   * Remove item
   *
   * @param {string} name
   * @returns {boolean}
   */
  removeItem: function removeItem(name) {
    var found = name in ls$1;

    if (found) {
      return delete ls$1[name];
    }

    return false;
  },


  /**
   * Clear storage
   *
   * @returns {boolean}
   */
  clear: function clear() {
    ls$1 = {};

    return true;
  },


  /**
   * Get item by key
   *
   * @param {number} index
   * @returns {*}
   */
  key: function key(index) {
    var keys = Object.keys(ls$1);

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
    return Object.keys(ls$1).length;
  }
});

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var listeners = {};

/**
 * Event class
 */

var _class$1 = function () {
  function _class() {
    classCallCheck(this, _class);
  }

  createClass(_class, null, [{
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

/**
 * Storage Bridge
 */

var _class = function () {
  /**
   * @param {Object} storage
   */
  function _class(storage) {
    classCallCheck(this, _class);

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
      get: function get$$1() {
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


  createClass(_class, [{
    key: 'setOptions',
    value: function setOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.options = _extends(this.options, options);
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
    value: function set$$1(name, value) {
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
    value: function get$$1(name) {
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

var store = typeof window !== 'undefined' && 'localStorage' in window ? window.localStorage : memoryStorage;
var ls = new _class(store);

var VueLocalStorage = {
  /**
   * Install plugin
   *
   * @param {Object} Vue
   * @param {Object} options
   * @returns {Storage}
   */
  install: function install(Vue, options) {
    ls.setOptions(_extends(ls.options, {
      namespace: ''
    }, options || {}));

    Vue.ls = ls; // eslint-disable-line
    Object.defineProperty(Vue.prototype, '$ls', {
      /**
       * Define $ls property
       *
       * @return {Storage}
       */
      get: function get$$1() {
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
