/**!
 * 
 * MinDB
 *
 * Database on JavaScript
 *
 *  Copyright (c) 2012-2013 Will Wen Gunn(willwengunn@gmail.com)
 *  All rights reserved.
 *
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining
 *  a copy of this software and associated documentation files (the
 *  "Software"), to deal in the Software without restriction, including
 *  without limitation the rights to use, copy, modify, merge, publish,
 *  distribute, sublicense, and/or sell copies of the Software, and to
 *  permit persons to whom the Software is furnished to do so, subject to
 *  the following conditions:
 *
 *  The above copyright notice and this permission notice shall be
 *  included in all copies or substantial portions of the Software.
 * 
 */

// Shims
(function(window, document) {

  if (window && document) {
    function createScript() {
      return document.createElement("script");
    }
    // JSON
    var s = document.getElementsByTagName("script")[0];
    var head = s.parentNode;

    if (!window.JSON) {
      var jsonSrc = createScript();
      jsonSrc.src = "//cdn.staticfile.org/json2/20121008/json2.min.js";
      head.insertBefore(jsonSrc, s);
    }

    if (!Function.prototype.bind || !Array.isArray) {
      // ECMAScript 5
      var shimSrc = createScript();
      shimSrc.src = "//cdn.staticfile.org/es5-shim/2.1.0/es5-shim.min.js";
      head.insertBefore(shimSrc, s);
      var shamSrc = createScript();
      shamSrc.src = "//cdn.staticfile.org/es5-shim/2.1.0/es5-sham.min.js";
      head.insertBefore(shamSrc, s);
    }
  }

})((typeof(window) !== 'undefined' ? window : this), (typeof(document) !== 'undefined' ? document : null));

// MinDB
!(function(name, def) {
  var hasDefine  = 'undefined' !== typeof define;
  var hasExports = 'undefined' !== typeof exports;

  if (hasDefine) {
    // CommonJS: SeaJS, RequireJS etc.
    define(name, [], def);
  } else if (hasExports) {
    // Node.js Module
    exports = def(require, exports, module);
  } else {
    // Normal
    this[name] = def();
  }
})('min', function(require, exports, module, undefined) {
  // Strict Mode Enabled
  'use strict';

  // MinDB
  var min = exports || {};

  // Utils
  var utils = {
    noop: function() {
      return false;
    },
    // Class Inherits
    inherits: function (ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    },
    // Object Extend
    extend: function() {
      var target = arguments[0];

      var objs = [].slice.call(arguments, 1);

      for (var i = 0, l = objs.length; i < l; i++) {
        for (var key in objs[i]) {
          target[key] = objs[i][key];
        }
      }

      return target;
    },
    arrayUnique: function(array) {
      var u = {};
      var ret = [];
      for (var i = 0, l = array.length; i < l; ++i) {
        if(u.hasOwnProperty(array[i])) {
           continue;
        }
        ret.push(array[i]);
        u[array[i]] = 1;
      }
      return ret;
    },
    arrayInter: function(array) {
      var rest = [].slice.call(arguments, 1);
      return utils.arrayUnique(array).filter(function(item) {
        var ret = true;

        for (var i = 0; i < rest.length; i++) {
          (function(index) {
            var other = rest[index];

            if (other.indexOf(item) < 0) {
              ret = false;
            }
          })(i);
        }

        return ret;
      });
    },
    arrayDiff: function(array) {
      var rest = [].slice.call(arguments, 1);
      return array.filter(function(item) {
        var ret = true;

        for (var i = 0; i < rest.length; i++) {
          (function(index) {
            var other = rest[index];

            if (other.indexOf(item) >= 0) {
              ret = false;
            }
          })(i);
        }

        return ret;
      });
    }
  };

  // Navite Store Interfaces
  function memStore () {}
  memStore.prototype.get = function(key) {
    if (sessionStorage) {
      return sessionStorage.getItem(key);
    } else {
      return false;
    }
  };
  memStore.prototype.set = function(key, value) {
    if (sessionStorage) {
      return sessionStorage.setItem(key, value);
    } else {
      return false;
    }
  };
  memStore.prototype.remove = function(key) {
    if (sessionStorage) {
      return sessionStorage.removeItem(key);
    } else {
      return false;
    }
  };

  function localStore () {}
  localStore.prototype.get = function(key) {
    if (localStorage) {
      return localStorage.getItem(key);
    } else {
      return false;
    }
  };
  localStore.prototype.set = function(key, value) {
    if (localStorage) {
      return localStorage.setItem(key, value);
    } else {
      return false;
    }
  };
  localStore.prototype.remove = function(key) {
    if (localStorage) {
      return localStorage.removeItem(key);
    } else {
      return false;
    }
  };

  min.memStore = memStore;
  min.localStore = localStore;

  // EventEmitter(without `domain` module) From Node.js
  function EventEmitter() {
    this._events = this._events || {};
    this._maxListeners = this._maxListeners || defaultMaxListeners;
  }
  var defaultMaxListeners = 10;
  EventEmitter.prototype.setMaxListeners = function(n) {
    if (typeof n !== 'number' || n < 0)
      throw TypeError('n must be a positive number');
    this._maxListeners = n;
  };
  EventEmitter.prototype.emit = function(type) {
    var er, handler, len, args, i, listeners;

    if (!this._events)
      this._events = {};

    // If there is no 'error' event listener then throw.
    if (type === 'error') {
      if (!this._events.error ||
          (typeof this._events.error === 'object' &&
           !this._events.error.length)) {
        er = arguments[1];
        if (this.domain) {
          if (!er) er = new TypeError('Uncaught, unspecified "error" event.');
        } else if (er instanceof Error) {
          throw er; // Unhandled 'error' event
        } else {
          throw TypeError('Uncaught, unspecified "error" event.');
        }
        return false;
      }
    }

    handler = this._events[type];

    if (typeof handler === 'undefined')
      return false;

    if (typeof handler === 'function') {
      switch (arguments.length) {
        // fast cases
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        // slower
        default:
          len = arguments.length;
          args = new Array(len - 1);
          for (i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          handler.apply(this, args);
      }
    } else if (typeof handler === 'object') {
      len = arguments.length;
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];

      listeners = handler.slice();
      len = listeners.length;
      for (i = 0; i < len; i++)
        listeners[i].apply(this, args);
    }

    return true;
  };
  EventEmitter.prototype.addListener = function(type, listener) {
    var m;

    if (typeof listener !== 'function')
      throw TypeError('listener must be a function');

    if (!this._events)
      this._events = {};

    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (this._events.newListener)
      this.emit('newListener', type, typeof listener.listener === 'function' ?
                listener.listener : listener);

    if (!this._events[type])
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    else if (typeof this._events[type] === 'object')
      // If we've already got an array, just append.
      this._events[type].push(listener);
    else
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];

    // Check for listener leak
    if (typeof this._events[type] === 'object' && !this._events[type].warned) {
      m = this._maxListeners;
      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        console.trace();
      }
    }

    return this;
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.once = function(type, listener) {
    if (typeof listener !== 'function')
      throw TypeError('listener must be a function');

    function g() {
      this.removeListener(type, g);
      listener.apply(this, arguments);
    }

    g.listener = listener;
    this.on(type, g);

    return this;
  };
  // emits a 'removeListener' event iff the listener was removed
  EventEmitter.prototype.removeListener = function(type, listener) {
    var list, position, length, i;

    if (typeof listener !== 'function')
      throw TypeError('listener must be a function');

    if (!this._events || !this._events[type])
      return this;

    list = this._events[type];
    length = list.length;
    position = -1;

    if (list === listener ||
        (typeof list.listener === 'function' && list.listener === listener)) {
      this._events[type] = undefined;
      if (this._events.removeListener)
        this.emit('removeListener', type, listener);

    } else if (typeof list === 'object') {
      for (i = length; i-- > 0;) {
        if (list[i] === listener ||
            (list[i].listener && list[i].listener === listener)) {
          position = i;
          break;
        }
      }

      if (position < 0)
        return this;

      if (list.length === 1) {
        list.length = 0;
        this._events[type] = undefined;
      } else {
        list.splice(position, 1);
      }

      if (this._events.removeListener)
        this.emit('removeListener', type, listener);
    }

    return this;
  };
  EventEmitter.prototype.removeAllListeners = function(type) {
    var key, listeners;

    if (!this._events)
      return this;

    // not listening for removeListener, no need to emit
    if (!this._events.removeListener) {
      if (arguments.length === 0)
        this._events = {};
      else if (this._events[type])
        this._events[type] = undefined;
      return this;
    }

    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
      for (key in this._events) {
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = {};
      return this;
    }

    listeners = this._events[type];

    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else {
      // LIFO order
      while (listeners.length)
        this.removeListener(type, listeners[listeners.length - 1]);
    }
    this._events[type] = undefined;

    return this;
  };
  EventEmitter.prototype.listeners = function(type) {
    var ret;
    if (!this._events || !this._events[type])
      ret = [];
    else if (typeof this._events[type] === 'function')
      ret = [this._events[type]];
    else
      ret = this._events[type].slice();
    return ret;
  };
  EventEmitter.listenerCount = function(emitter, type) {
    var ret;
    if (!emitter._events || !emitter._events[type])
      ret = 0;
    else if (typeof emitter._events[type] === 'function')
      ret = 1;
    else
      ret = emitter._events[type].length;
    return ret;
  };
  min.EventEmitter = EventEmitter;
  utils.extend(min, new EventEmitter());

  function Promise(done) {
    this.results = null;
    this.errors  = null;
    this.ended   = false;

    // Done Callback
    if ('function' === typeof done) {
      this.done(done);
    }
  }
  utils.inherits(Promise, EventEmitter);
  Promise.prototype.resolve = function() {
    // Arguments processing
    var args = slice(arguments);

    // Done
    this.emit('resolve', args);
    this.ended   = true;
    this.results = args;

    return this;
  };
  Promise.prototype.reject = function() {
    // Arguments processing
    var args = slice(arguments);

    // Error!
    this.emit('reject', args);
    this.ended  = true;
    this.errors = args;

    return this;
  };
  Promise.prototype.then = function(onResolve, onReject) {
    var promise = new Promise();
    var self = this;

    onResolve = onResolve || utils.noop;
    onReject  = onReject  || utils.noop;

    self
      .done(function() {
        var ret = onResolve.apply(self, arguments);

        if (ret instanceof Promise) {
          ret.then(
            function() {
              promise.resolve.apply(promise, arguments);
            },
            function(err) {
              promise.reject(err);
            }
          );
        } else if (ret instanceof Error) {
          promise.reject(ret);
        }
      })
      .fail(function(err) {
        onReject.call(self, err);

        promise.reject(err);
      });

    return promise;
  };
  Promise.prototype.done = function(callback) {
    var self = this;

    if (self.ended) {
      // Done before
      if (self.results !== null) {
        callback.apply(self, self.results);
      }
    } else {
      // Event listening
      self.on('resolve', function(args) {
        var ret = callback.apply(self, args);

        if (ret instanceof Promise) {
          ret.fail(self.reject.bind(self));
        }
      });
    }

    return self;
  };
  Promise.prototype.fail = function(callback) {
    var self = this;

    if (self.ended) {
      // Reject Before
      if (self.errors !== null) {
        callback.apply(self, self.errors);
      }
    } else {
      // Event listening
      self.on('reject', function(args) {
        callback.apply(self, args);
      });
    }

    return self;
  };
  function slice(argv) {
    var args = [];

    for (var i = 0; i < argv.length; i++) {
      args[i] = argv[i];
    }

    return args;
  }
  min.Promise = Promise;

  // Default Store
  min.store = new min.localStore();

  // Default variables
  var _keys  = {};
  var _keysTimer = null;
  var _types = {
    0 : 'mix',
    1 : 'hash',
    2 : 'list',
    3 : 'set',
    4 : 'zset'  // Sorted Set
  };

  /**
   * Fork a new MinDB object
   * @return {Object} new min object
   */
  min.fork = function() {
    var rtn = {};
    var self = this;

    for (var prop in this) {
      if (this.hasOwnProperty(prop)) {
        rtn[prop] = this[prop];
      }
    }

    return rtn;
  };

  /*********
  ** Keys **
  *********/

  /**
   * Delete a key
   * @param  {String}   key      Key
   * @param  {Function} callback Callback
   * @return {Promise}           Promise Object
   */
  min.del = function(key, callback) {
    var self = this;

    // Promise Object
    var promise = new Promise(function() {
      self.emit('del', key);
      if (_keysTimer) {
        clearTimeout(_keysTimer);
      }

      _keysTimer = setTimeout(self.save.bind(self), 5 * 1000);
    });

    // Store
    var store = this.store;

    // Callback and Promise's shim
    if ('undefined' == typeof callback) {
      callback = utils.noop;
    }

    // Key prefix
    var $key = 'min-' + key;

    if (store.async) {
      // Async Store Operating
      
      // Value processing
      store.remove($key, function(err) {
        if (err) {
          // Error!
          promise.reject(err);
          return callback(err);
        }

        delete _keys[key];

        // Done
        promise.resolve(key);
        callback(null, key);
      });
    } else {
      try {
        store.remove($key);

        delete _keys[key];

        // Done
        promise.resolve(key);
        callback(null, key);
      } catch(err) {
        // Error!
        promise.reject(err);
        callback(err);
      }
    }

    // Event emitting
    this.emit('del', key);

    return promise;
  };

  /**
   * Check a key is exists or not
   * @param  {String}   key      Key
   * @param  {Function} callback Callback
   * @return {Promise}           Promise Object
   */
  min.exists = function(key, callback) {
    // Promise Object
    var promise = new Promise();

    callback = callback || utils.noop;

    try {
      this.get(key, function(err, value) {
        if (err) {
          promise.resolve(false);
          callback(null, false);
        }

        if ('undefined' == typeof value) {
          promise.resolve(false);
          return callback(null, false);
        } else {
          promise.resolve(true);
          return callback(null, true);
        }
      });
    } catch(err) {
      promise.reject(err);
      return callback(err);
    }

    return promise;
  };

  /**
   * Rename a old key
   * @param  {String}   key      the old key
   * @param  {String}   newKey   the new key
   * @param  {Function} callback Callback
   * @return {Promise}           Promise Object
   */
  min.renamenx = function(key, newKey, callback) {
    var self = this;

    // Promise object
    var promise = new Promise(function() {
      if (_keysTimer) {
        clearTimeout(_keysTimer);
      }

      _keysTimer = setTimeout(self.save.bind(self), 5 * 1000);
    });

    // Callback and Promise's shim
    if ('undefined' == typeof callback) {
      callback = utils.noop;
    }

    try {
      // Error handle
      var reject = function(err) {
        promise.reject(err);
        callback(err);
      };

      var type = null;
      var value = null;

      min.exists(key)
        .then(function(exists) {
          if (!exists) {
            var err = new Error('no such key');

            reject(err);
          } else {
            return min.get(key);
          }
        })
        .then(function(_value) {
          type = _keys[key];
          value = _value;

          return min.del(key);
        })
        .then(function() {
          return min.set(newKey, value, callback);
        })
        .then(function() {
          _keys[newKey] = type;
          promise.resolve('OK');
          callback(null, 'OK');
        })
        .fail(reject);

    } catch(err) {
      reject(err);
    }

    return promise;
  };

  /**
   * Rename a old key when the old key is not equal to the new key
   * and the old key is exiest.
   * @param  {String}   key      the old key
   * @param  {String}   newKey   the new key
   * @param  {Function} callback Callback
   * @return {Promise}           Promise Object
   */
  min.rename = function(key, newKey, callback) {
    var self = this;
    // Promise object
    var promise = new Promise(function() {
      if (_keysTimer) {
        clearTimeout(_keysTimer);
      }

      _keysTimer = setTimeout(self.save.bind(self), 5 * 1000);
    });

    // Error handle
    var reject = function(err) {
      promise.reject(err);
      callback(err);
    };
    
    // Callback and Promise's shim
    if ('undefined' == typeof callback) {
      callback = utils.noop;
    }

    if (key == newKey) {
      // The origin key is equal to the new key
      reject(new Error('The key is equal to the new key.'));
    } else {
      self.renamenx.apply(self, arguments)
        .done(promise.resolve.bind(promise))
        .fail(promise.reject.bind(promise));
    }
    return promise;
  };

  /**
   * Return the keys which match by the pattern
   * @param  {String}   pattern  Pattern
   * @param  {Function} callback Callback
   * @return {Promise}           Promise Object
   */
  min.keys = function(pattern, callback) {

    // Promise object
    var promise = new Promise();

    // Stored keys
    var keys = Object.keys(_keys);

    // Callback and Promise's shim
    callback = callback || utils.noop;

    // Filter
    var filter = pattern
      .replace('?', '(.)')
      .replace('*', '(.*)');
    filter = new RegExp(filter);

    var ret = [];

    for (var i = 0; i < keys.length; i++) {
      if (keys[i].match(filter)) {
        ret.push(keys[i]);
      }
    }

    // Done
    promise.resolve(ret);
    callback(null, ret);

    return promise;
  };

  /**
   * Return a key randomly
   * @param  {Function} callback Callback
   * @return {Promise}           Promise Object
   */
  min.randomkey = function(callback) {
    
    // Promise Object
    var promise = new Promise();

    // Stored keys
    var keys = Object.keys(_keys);

    // Callback and Promise's shim
    if ('undefined' == typeof callback) {
      callback = utils.noop;
    }

    // Random Key
    var index = Math.round(Math.random() * (keys.length - 1));

    // Done
    var $key = keys[index];
    promise.resolve($key);
    callback(null, $key);

    return promise;
  };

  /**
   * Return the value's type of the key
   * @param  {String}   key      the key
   * @param  {Function} callback Callback
   * @return {Promise}           Promise Object
   */
  min.type = function(key, callback) {

    // Promise Object
    var promise = new Promise();

    // Callback and Promise's shim
    callback = callback || utils.noop;

    if (_keys.hasOwnProperty(key)) {
      promise.resolve(_types[_keys[key]]);
      callback(null, callback);
    } else {
      promise.resolve(null);
      callback(null, null);
    }

    return promise;
  };

  /**
   * Remove all keys in the db
   * @param  {Function} callback Callback
   * @return {Object}            min
   */
  min.empty = function(callback) {
    var self = this;
    var promise = new Promise(function(len) {
      self.emit('empty', len);
      if (_keysTimer) {
        clearTimeout(_keysTimer);
      }

      _keysTimer = setTimeout(self.save.bind(self), 5 * 1000);
    });
    var keys = Object.keys(_keys);
    var last = null;
    var removeds = 0;
    callback = callback || utils.noop;

    (function loop(key) {
      if (key) {
        self.del(key, function(err) {
          if (!err) {
            removeds++;
          }

          loop(keys.shift());
        });
      } else {
        promise.resolve(removeds);
        callback(null, removeds);
      }
    })(keys.shift());

    return promise;
  };

  /**
   * Save the dataset to the Store Interface manually
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.save = function(callback) {
    var self = this;
    var promise = new Promise(function(dump, strResult) {
      self.emit('save', dump, strResult);
    });
    callback = callback || utils.noop;

    self.set('min_keys', JSON.stringify(_keys))
      .then(function() {
        return self.dump();
      })
      .then(function(dump, strResult) {
        promise.resolve(dump, strResult);
        callback(dump, strResult);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  /**
   * Return the dataset of MinDB
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.dump = function(callback) {
    var self = this;
    var promise = new Promise();
    callback = callback || utils.noop;

    var rtn = {};

    self.keys('*')
      .then(function(keys) {
        (function loop(key) {
          if (key) {
            self.get(key)
              .then(function(value) {
                rtn[key] = value;
                loop(keys.shift());
              })
              .fail(function(err) {
                promise.reject(err);
                callback(err);
              });
          } else {
            var strResult = JSON.stringify(rtn);
            promise.resolve(rtn, strResult);
            callback(null, rtn, strResult);
          }
        })(keys.shift());
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  /**
   * Restore the dataset to MinDB
   * @param  {Object}   dump     dump object
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.restore = function(dump, callback) {
    var self = this;
    var promise = new Promise(function() {
      self.emit('restore');
    });
    callback = callback || utils.noop;

    var keys = Object.keys(dump);

    (function loop(key, done) {
      if (key) {
        self.set(key, dump[key])
          .then(function() {
            loop(keys.shift(), done);
          })
          .fail(function(err) {
            promise.reject(err);
            callback(err);
          });
      } else {
        done();
      }
    })(keys.shift(), function() {
      self
        .exists('min_keys')
        .then(function(exists) {
          if (exists) {
            return self.get('min_keys');
          } else {
            promise.resolve();
            callback();
          }
        })
        .then(function(keys) {
          _keys = JSON.parse(keys);

          promise.resolve();
          callback();
        });
    });

    return promise;
  };

  /******************************
  ** Mix(String/Number/Object) **
  ******************************/

  /**
   * Set the value of a key
   * @param  {String}   key      Key
   * @param  {Mix}      value    Value
   * @param  {Function} callback Callback
   * @return {Promise}           Promise Object
   */
  min.set = function(key, value, callback) {
    var self = this;

    // Promise Object
    var promise = new Promise(function() {
      if (_keysTimer) {
        clearTimeout(_keysTimer);
      }

      _keysTimer = setTimeout(self.save.bind(self), 5 * 1000);
    });

    // Store
    var store = this.store;

    // Callback and Promise's shim
    callback = callback || utils.noop;

    // Key prefix
    var $key = 'min-' + key;

    if (store.async) {
      // Async Store Operating
      
      // Value processing
      var $value = JSON.stringify(value);
      store.set($key, $value, function(err) {
        if (err) {
          // Error!
          promise.reject(err);
          return callback(err);
        }

        _keys[key] = 0;

        // Done
        promise.resolve(key, value);
        callback(null, key, value);
      });
    } else {
      try {
        // Value processing
        var $value = JSON.stringify(value);
        store.set($key, $value);
        _keys[key] = 0;

        // Done
        promise.resolve(key, value);
        callback(null, key, value);
      } catch(err) {
        // Error!
        promise.reject(err);
        callback(err);
      }
    }

    // Event emitting
    this.emit('set', key, value);

    return promise;
  };

  /**
   * Set the value of a key, only if the key does not exist
   * @param  {String}   key      the key
   * @param  {Mix}      value    Value
   * @param  {Function} callback Callback
   * @return {Promise}           Promise Object
   */
  min.setnx = function(key, value, callback) {

    // Promise Object
    var promise = new Promise();

    var self = this;

    // Callback and Promise's shim
    callback = callback || utils.noop;

    self.exists(key, function(err, exists) {
      if (err) {
        callback(err);
        promise.reject(err);
      }

      if (exists) {
        // The key is exists
        return promise.reject(new Error('The key is exists.'));
      } else {
        self.set(key, value, callback)
          .done(function(key, value) {
            // Done
            callback(null, key, value);
            promise.resolve(key, value);
          })
          .fail(function(err) {
            callback(err);
            promise.reject(err);
          });          
      }
    });

    return promise;
  };

  /**
   * Set the value and expiration of a key
   * @param  {String}   key      key
   * @param  {Number}   seconds  TTL
   * @param  {Mix}      value    value
   * @param  {Function} callback Callback
   * @return {Promise}           promise object
   */
  min.setex = function(key, seconds, value, callback) {

    // Promise Object
    var promise = new Promise();

    var self = this;

    // TTL
    function timeout() {
      self.del(key, utils.noop);
    }

    // Callback and Promise's shim
    callback = callback || utils.noop;

    // Set
    self.set(key, value, function(err, result) {
      // Done
      setTimeout(timeout, seconds * 1000);
      callback(err, result);
    })
      .done(function(key, value) {
        // Done
        setTimeout(timeout, seconds * 1000);
        promise.resolve(key, value);
        callback(null, key, value);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  /**
   * Set the value and expiration in milliseconds of a key
   * @param  {String}   key      key
   * @param  {Number}   millionseconds  TTL
   * @param  {Mix}      value    value
   * @param  {Function} callback Callback
   * @return {Promise}           promise object
   */
  min.psetex = function(key, milliseconds, value, callback) {

    // Promise Object
    var promise = new Promise();

    var self = this;

    // TTL
    function timeout() {
      self.del(key, utils.noop);
    }

    // Callback and Promise's shim
    callback = callback || utils.noop;

    // Set
    self.set(key, value, function(err, result) {
      // Done
      setTimeout(timeout, milliseconds);
      callback(err, result);
    })
      .done(function() {
      // Done
        setTimeout(timeout, milliseconds);
        promise.resolve.apply(promise, arguments);
      })
      .fail(promise.reject.bind(promise));

    return promise;
  };

  /**
   * Set multiple keys to multiple values
   * @param  {Object}   plainObject      Object to set
   * @param  {Function} callback Callback
   * @return {Promise}           promise object
   */
  min.mset = function(plainObject, callback) {
    var promise = new Promise();

    var self = this;

    // keys
    var keys = Object.keys(plainObject);
    // counter
    var i = 0;

    // the results and errors to return
    var results = [];
    var errors = [];

    // Callback and Promise's shim
    callback = callback || utils.noop;

    // Loop
    function next(key, index) {
      // remove the current element of the plainObject
      delete keys[index];

      self.set(key, plainObject[key])
        .then(function() {
          results.push(arguments);

          i++;
          if (keys[i]) {
            next(keys[i], i);
          } else {
            out();
          }
        })
        .fail(function(err) {
          errors.push(err);

          i++;
          if (keys[i]) {
            return next(keys[i], i);
          } else {
            return out();
          }
        });
    }

    function out() {
      if (errors.length) {
        callback(errors);
        promise.reject(errors);
      } else {
        callback(null, results);
        promise.resolve(results);
      }
    }

    next(keys[i], i);

    return promise;
  };

  /**
   * Set multiple keys to multiple values, only if none of the keys exist
   * @param  {Object}   plainObject      Object to set
   * @param  {Function} callback Callback
   * @return {Promise}           promise object
   */
  min.msetnx = function(plainObject, callback) {
    var promise = new Promise();

    var self = this;

    var keys = Object.keys(plainObject);
    var i = 0;

    var results = [];
    var errors = [];

    // Callback and Promise's shim
    callback = callback || utils.noop;

    function next(key, index) {
      delete keys[index];

      self.setnx(key, plainObject[key])
        .then(function() {
          results.push(arguments);

          i++;
          if (keys[i]) {
            next(keys[i], i);
          } else {
            out();
          }
        })
        .fail(function(err) {
          errors.push(err);
          out();
        });
    }

    function out() {
      if (errors.length) {
        callback(errors);
        return promise.reject(errors);
      } else {
        callback(null, results);
        promise.resolve(results);
      }
    }

    next(keys[i], i);

    return promise;
  };

  /**
   * Append a value to a key
   * @param  {String}   key      key
   * @param  {String}   value    value
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.append = function(key, value, callback) {
    var self = this;
    var promise = new Promise();
    callback = callback || utils.noop;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          var p = new Promise();

          p.resolve('');

          return p;
        }
      })
      .then(function(currVal) {
        return self.set(key, currVal + value);
      })
      .then(function(key, value) {
        return self.strlen(key);
      })
      .done(function(len) {
        promise.resolve(len);
        callback(null, len);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  /**
   * Get the value of a key
   * @param  {String}   key      Key
   * @param  {Function} callback Callback
   * @return {Promise}           Promise Object
   */
  min.get = function(key, callback) {
    var self = this;

    // Promise Object
    var promise = new Promise(function(value) {
      self.emit('get', key, value);
    });

    // Store
    var store = this.store;

    // Callback and Promise's shim
    callback = callback || utils.noop;
    // Key prefix
    var $key = 'min-' + key;

    if (store.async) {
      // Async Store Operating
      
      // Value processing
      this.store.get($key, function(err, value) {
        if (err) {
          var _err = new Error('no such key');
          // Error!
          promise.reject(_err);
          return callback(_err);
        }

        if (value) {
          // Done
          var ret = JSON.parse(value);
          promise.resolve(ret);
          callback(null, ret);
        } else {
          var err = new Error('no such key');

          promise.resolve(err);
          callback(err);
        }

      });
    } else {
      try {
        // Value processing
        var _value = this.store.get($key);

        if (_value) {
          var value = JSON.parse(_value);
          // Done
          promise.resolve(value);
          callback(null, value);
        } else {
          var err = new Error('no such key');

          promise.reject(err);
          callback(err);
        }
      } catch(err) {
        // Error!
        promise.reject(err);
        callback(err);
      }
    }

    return promise;
  };

  /**
   * Get the values of a set of keys
   * @param  {Array}   keys      the keys
   * @param  {Function} callback Callback
   * @return {Promise}           promise object
   */
  min.mget = function(keys, callback) {

    // Promise Object
    var promise = new Promise();

    var self = this;

    var i = 0;
    var results = [];
    var errors = [];

    // Callback and Promise's shim
    callback = callback || utils.noop;

    function next(key, index) {
      delete keys[index];

      self.get(key, function(err, value) {
        if (err) {
          errors.push(err);
          results.push(null);

          i++;
          if (keys[i]) {
            return next(keys[i], i);
          } else {
            return out();
          }
        }

        results.push(value);

        i++;
        if (keys[i]) {
          next(keys[i], i);
        } else {
          out();
        }
      });
    }

    function out() {
      if (errors.length) {
        promise.reject(errors);
      } else {
        promise.resolve(results);
      }
    }

    next(keys[i], i);

    return promise;
  };

  /**
   * Set the value of a key and return its old value
   * @param  {String}   key      key
   * @param  {Mix}   value       value
   * @param  {Function} callback Callback
   * @return {Promise}           promise object
   */
  min.getset = function(key, value, callback) {
    var self = this;
    var promise = new Promise(function(old) {
      self.emit('getset', key, value, old);
    });

    // Callback and Promise's shim
    if ('undefined' == typeof callback) {
      callback = utils.noop;
    }

    var _value = null;

    self.get(key)
      .then(function($value) {
        _value = $value;

        return self.set(key, value);
      })
      .then(function() {
        promise.resolve(_value);
        callback(null, _value);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  /**
   * Get the length of a key
   * @param  {String}   key      Key
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.strlen = function(key, callback) {
    var self = this;
    var promise = new Promise();
    callback = callback || utils.noop;

    self.get(key)
      .then(function(value) {
        if ('string' === typeof value) {
          var len = value.length;

          promise.resolve(len);
          callback(null, len);
        } else {
          var err = new TypeError();

          promise.reject(err);
          callback(err);
        }
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  /**
   * Increment the integer value of a key by one
   * @param  {String}   key      key
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.incr = function(key, callback) {
    var self = this;

    var promise = new Promise(function(value) {
      self.emit('incr', key, value);
    });
    callback = callback || utils.noop;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          var p = new Promise();

          p.resolve(0);

          return p;
        }
      })
      .then(function(curr) {
        if (isNaN(parseInt(curr))) {
          promise.reject('value wrong');
          return callback('value wrong');
        }

        curr = parseInt(curr);

        return self.set(key, ++curr);
      })
      .done(function(key, value) {
        promise.resolve(value);
        callback(null, value);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  /**
   * Increment the integer value of a key by the given amount
   * @param  {String}   key      key
   * @param  {Number}   increment increment
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.incrby = function(key, increment, callback) {
    var self = this;
    var promise = new Promise(function(value) {
      self.emit('incrby', key, value);
    });
    callback = callback || utils.noop;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          var p = new Promise();

          p.resolve(0);

          return p;
        }
      })
      .then(function(curr) {
        if (isNaN(parseInt(curr))) {
          promise.reject('value wrong');
          return callback('value wrong');
        }

        curr = parseInt(curr);

        return self.set(key, curr + increment);
      })
      .done(function(key, value) {
        promise.resolve(value);
        callback(null, value);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.incrbyfloat = min.incrby;

  /******************************
  **           Hash            **
  ******************************/

  /**
   * Set the field in the hash on the key with the value
   * @param  {String}   key      Hash key
   * @param  {String}   field    field to set
   * @param  {Mix}   value       value
   * @param  {Function} callback Callback
   * @return {Promise}           promise object
   */
  min.hset = function(key, field, value, callback) {
    var self = this;
    var promise = new Promise(function() {
      self.emit('hset', key, field, value);
    });

    callback = callback || utils.noop;

    // check the key status
    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        // fetch the value
        self.get(key, function(err, body) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          // update the hash
          body[field] = value;

          self.set(key, body, function(err, _key, _value) {
            if (err) {
              promise.reject(err);
              return callback(err);
            }

            promise.resolve(key, field, value);
            callback(null, key, field, value);
          });
        });
      } else {
        // create a hash
        var body = {};

        body[field] = value;

        self.set(key, body, function(err, _key, _value) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          _keys[key] = 1;

          promise.resolve(key, field, value);
          callback(null, key, field, value);
        });
      }

    });

    return promise;
  };

  /**
   * Set the value of a hash field, only if the field does not exist
   * @param  {String}   key      key
   * @param  {String}   field    hash field
   * @param  {Mix}   value       value
   * @param  {Function} callback Callback
   * @return {Promise}            promise
   */
  min.hsetnx = function(key, field, value, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    self.hexists(key, field, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (!exists) {
        self.hset(key, field, value, function(err) {
          if (err) {
            promise.reject(err);
            callback(err);
          }

          promise.resolve('OK');
          callback(null, 'OK');
        });
      } else {
        var err = new Error('The field of the hash is exists');

        promise.reject(err);
        return callback(err);
      }
    });

    return promise;
  };

  /**
   * Set multiple hash fields to multiple values
   * @param  {String}   key      key
   * @param  {Object}   docs     values
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.hmset = function(key, docs, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    var keys = Object.keys(docs);
    var replies = [];

    (function loop(index) {
      var currField = keys[index];

      if (currField) {
        self.hset(key, currField, docs[currField], function(err, reply) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          replies.push(reply);

          loop(++index);
        });
      } else {
        callback(null, replies);
        promise.resolve(replies);
      }
    })(0);

    return promise;
  };

  /**
   * Get the value of a hash field
   * @param  {String}   key      key
   * @param  {String}   field    hash field
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.hget = function(key, field, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    self.hexists(key, field, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key)
          .done(function(value) {
            var data = value[field];
            promise.resolve(data);
            callback(null, data);
          })
          .fail(function(err) {
            promise.reject(err);
            callback(err);
          });
      } else {
        var err = new Error('no such field');

        promise.reject(err);
        callback(err);
      }
    });

    return promise;
  };

  /**
   * Get the values of all the given hash fields
   * @param  {String}   key      key
   * @param  {Array}   fields    hash fields
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.hmget = function(key, fields, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    var values = [];

    (function loop(index) {
      var currField = fields[index];

      if (currField) {
        self.hget(key, currField, function(err, value) {
          if (err) {
            callback(err);
            return promise.reject(err);
          }

          values.push(values);

          loop(++index);
        });
      } else {
        promise.resolve(values);
        callback(null, values);
      }

    })(0);

    return promise;
  };

  /**
   * Get all the fields and values in a hash
   * @param  {String}   key      key
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.hgetall = function(key, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    self.exists(key, function(err, exists) {
      if (err) {
        callback(err);
        return promise.reject(err);
      }

      if (exists) {
        self.get(key)
          .done(function(data) {
            promise.resolve(data);
            callback(null, data);
          })
          .fail(function(err) {
          });
      } else {
        var err = new Error('no such key');

        callback(err);
        return promise.reject(err);
      }
    });

    return promise;
  };

  /**
   * Delete one hash field
   * @param  {String}   key      key
   * @param  {String}   field    hash field
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.hdel = function(key, field, callback) {
    var self = this;
    var promise = new Promise(function(key, field, value) {
      self.emit('hdel', key, field, value);
    });
    callback = callback || utils.noop;

    self.hexists(key. field, function(err, exists) {
      if (err) {
        callback(err);
        return promise.reject(err);
      }

      if (exists) {
        self.get(key)
          .done(function(data) {
            var removed = data[field];
            delete data[field];

            self.set(key, data)
              .done(function() {
                promise.resolve(key, field, removed);
                callback(null, key, field, removed);
              })
              .fail(function(err) {
                promise.reject(err);
                callback(err);
              });
          })
          .fail(function(err) {
            callback(err);
          })
      } else {
        var err = new Error('no such key');

        callback(err);
        return promise.reject(err);
      }
    });

    return promise;
  };

  /**
   * Get the number of fields in a hash
   * @param  {String}   key      key
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.hlen = function(key, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key)
          .done(function(data) {
            var length = Object.keys(data).length;

            promise.resolve(length);
            callback(null, length);
          })
          .fail(function(err) {
            promise.reject(err);
            callback(err);
          });
      } else {
        promise.resolve(0);
        callback(null, 0);
      }
    });

    return promise;
  };

  /**
   * Get all the fields in a hash
   * @param  {String}   key      key
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.hkeys = function(key, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key)
          .done(function(data) {
            var keys = Object.keys(data);

            promise.resolve(keys);
            callback(null, keys);
          })
          .fail(function(err) {
            promise.reject(err);
            callback(err);
          });
      } else {
        promise.resolve(0);
        callback(null, 0);
      }
    });

    return promise;
  };

  /**
   * Determine if a hash field exists
   * @param  {String}   key      key of the hash
   * @param  {String}   field    the field
   * @param  {Function} callback Callback
   * @return {Promise}           promise object
   */
  min.hexists = function(key, field, callback) {
    var promise = new Promise();
    var self = this;

    // Callback and Promise's shim
    callback = callback || utils.noop;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          promise.resolve(false);
          callback(null, false);
        }
      })
      .then(function(value) {
        if (value.hasOwnProperty(field)) {
          promise.resolve(true);
          callback(null, true);
        } else {
          promise.resolve(false);
          callback(null, false);
        }
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  /******************************
  **           List            **
  ******************************/

  /**
   * Prepend one or multiple values to a list
   * @param  {String}   key      key
   * @param  {Mix}   value       value
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.lpush = function(key, value, callback) {
    var self = this;
    var promise = new Promise(function(len) {
      self.emit('lpush', key, len);
    });
    callback = callback || utils.noop;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key, function(err, data) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          data.unshift(value);

          self.set(key, data, function(err) {
            if (err) {
              promise.reject(err);
              return callback(err);
            }

            var length = data.length;

            promise.resolve(length);
            callback(null, length);
          });
        });
      } else {
        var data = [ value ];

        self.set(key, data, function(err) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          _keys[key] = 2;

          promise.resolve(1);
          callback(null, 1);
        });
      }
    });

    return promise;
  };

  /**
   * Prepend a value to a list, only if the list exists
   * @param  {String}   key      key
   * @param  {Mix}   value       value
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.lpushx = function(key, value, callback) {
    var promise = new Promise();
    callback = callback || utils.noop;
    var self = this;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key, function(err, data) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          if (!data.length) {
            var err = new Error('The list is empty.');

            callback(err);
            return promise.reject(err);
          }

          data.unshift(value);

          self.set(key, data, function(err) {
            if (err) {
              promise.reject(err);
              return callback(err);
            }

            var length = data.length;

            promise.resolve(length);
            callback(null, length);
          });
        });
      } else {
        var err = new Error('no such key');

        callback(err);
        return promise.reject(err);
      }
    });

    return promise;
  };

  /**
   * Append one or multiple values to a list
   * @param  {String}   key      key
   * @param  {Mix}   value       value
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.rpush = function(key, value, callback) {
    var self = this;
    var promise = new Promise(function(len) {
      self.emit('rpush', key, len);
    });
    callback = callback || utils.noop;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key, function(err, data) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          data.push(value);

          self.set(key, data, function(err) {
            if (err) {
              promise.reject(err);
              return callback(err);
            }

            var length = data.length;

            promise.resolve(length);
            callback(null, length);
          });
        });
      } else {
        var data = [ value ];

        self.set(key, data, function(err) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          promise.resolve(1);
          callback(null, 1);
        });
      }
    });

    return promise;
  };

  /**
   * Prepend a value to a list, only if the list exists
   * @param  {String}   key      key
   * @param  {Mix}   value       value
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.lpushx = function(key, value, callback) {
    var promise = new Promise();
    callback = callback || utils.noop;
    var self = this;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key, function(err, data) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          if (!data.length) {
            var err = new Error('The list is empty.');

            callback(err);
            return promise.reject(err);
          }

          data.push(value);

          self.set(key, data, function(err) {
            if (err) {
              promise.reject(err);
              return callback(err);
            }

            var length = data.length;

            promise.resolve(length);
            callback(null, length);
          });
        });
      } else {
        var err = new Error('no such key');

        callback(err);
        return promise.reject(err);
      }
    });

    return promise;
  };

  /**
   * Remove and get the first element in a list
   * @param  {String}   key      key
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.lpop = function(key, callback) {
    var self = this;
    var promise = new Promise(function(value) {
      self.emit('lpop', key, value);
    });
    callback = callback || utils.noop;
    var val = null;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          promise.resolve(null);
          callback(null, null);
        }
      })
      .then(function(data) {
        val = data.shift();

        return self.set(key,data);
      })
      .then(function() {
        promise.resolve(val);
        callback(null, val);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  /**
   * Remove and get the last element in a list
   * @param  {String}   key      key
   * @param  {Function} callback Callback
   * @return {Promise}           promise
   */
  min.rpop = function(key, callback) {
    var self = this;
    var promise = new Promise(function(value) {
      self.emit('rpop', key, value);
    });
    callback = callback || utils.noop;

    var value = null;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          promise.resolve(null);
          callback(null, null);
        }
      })
      .then(function(data) {
        value = data.pop();

        return self.set(key, data);
      })
      .then(function() {
        promise.resolve(value);
        callback(null, value);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  /**
   * Get the length of a list
   * @param  {String}   key      key
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.llen = function(key, callback) {
    var promise = new Promise();
    callback = callback || utils.noop;
    var self = this;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key, function(err, data) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          var length = data.length;

          promise.resolve(length);
          callback(null, length);
        });
      } else {
        promise.resolve(0);
        callback(null, 0);
      }
    });

    return promise;
  };

  /**
   * Get a range of elements from a list
   * @param  {String}   key      key
   * @param  {Number}   start    min score
   * @param  {Number}   stop     max score
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.lrange = function(key, start, stop, callback) {
    var promise = new Promise();
    callback = callback || utils.noop;
    var self = this;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key, function(err, data) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          var values = data.slice(start, stop + 1);

          promise.resolve(values);
          callback(null, values);
        });
      } else {
        promise.resolve(null);
        callback(null, null);
      }
    });

    return promise;
  };

  /**
   * Remove elements from a list
   * @param  {String}   key      key
   * @param  {Number}   count    count to remove
   * @param  {Mix}      value    value
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.lrem = function(key, count, value, callback) {
    var self = this;
    var promise = new Promise(function(removeds) {
      self.emit('lrem', key, removeds);
    });
    callback = callback || utils.noop;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key, function(err, data) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          var removeds = 0;

          switch (true) {
            case count > 0:
              for (var i = 0; i < data.length && removeds < count; i++) {
                if (data[i] === value) {
                  var removed = data.splice(i, 1)[0];

                  removeds++;
                }
              }
              break;
            case count < 0:
              for (var i = data.length - 1; i >= 0 && removeds < count; i--) {
                if (data[i] === value) {
                  var removed = data.splice(i, 1)[0];

                  removeds++;
                }
              }
              break;
            case count = 0:
              for (var i = data.length - 1; i >= 0; i--) {
                if (data[i] === value) {
                  var removed = data.splice(i, 1)[0];

                  removeds++;
                }
              }
              break;
          }

          promise.resolve(removeds);
          callback(null, removeds);
        });
      } else {
        promise.resolve(null);
        callback(null, null);
      }
    });

    return promise;
  };

  /**
   * Remove elements from a list
   * @param  {String}   key      key
   * @param  {Number}   index    position to set
   * @param  {Mix}      value    value
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.lset = function(key, index, value, callback) {
    var self = this;
    var promise = new Promise(function(len) {
      self.emit('lset', key, len);
    });
    callback = callback || utils.noop;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key, function(err, data) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          if (!data[index] || !data.length) {
            var err = new Error('no such key');

            promise.reject(err);
            return callback(err);
          }

          data[index] = value;

          self.set(key, data, function(err) {
            if (err) {
              promise.reject(err);
              return callback(err);
            }

            var length = data.length;

            promise.resolve(length);
            callback(null, length);
          });
        });
      } else {
        var err = new Error('no such key');

        promise.reject(err);
        return callback(err);
      }
    });

    return promise;
  };

  /**
   * Trim a list to the specified range
   * @param  {String}   key      key
   * @param  {Number}   start    start
   * @param  {Number}   stop     stop
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.ltrim = function(key, start, stop, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key, function(err, data) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          var values = data.splice(start, stop + 1);

          promise.resolve(values);
          callback(null, values);
        });
      } else {
        promise.resolve(null);
        callback(null, null);
      }
    });

    return promise;
  };

  /**
   * Get an element from a list by its index
   * @param  {String}   key      key
   * @param  {Number}   index    index
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.lindex = function(key, index, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key, function(err, data) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          var value = data[index];

          promise.resolve(value);
          callback(null, value);
        });
      } else {
        promise.resolve(null);
        callback(null, null);
      }
    });

    return promise;
  };

  /**
   * Insert an element before another element in a list
   * @param  {String}   key      key
   * @param  {Mix}   pivot       pivot
   * @param  {Mix}   value       value
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.linsertBefore = function(key, pivot, value, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key, function(err, data) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          var index = data.indexOf(pivot);

          if (index < 0) {
            promise.resolve(null);
            return callback(null, null);
          }

          data.splice(index, 1, value, pivot);

          self.set(key, data, function(err) {
            if (err) {
              promise.reject(err);
              return callback(err);
            }

            var length = data.length;

            promise.resolve(length);
            callback(null, length);
          });
        });
      } else {
        promise.resolve(null);
        callback(null, null);
      }
    });

    return promise;
  };

  /**
   * Insert an element after another element in a list
   * @param  {String}   key      key
   * @param  {Mix}   pivot       pivot
   * @param  {Mix}   value       value
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.linsertAfter = function(key, pivot, value, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    self.exists(key, function(err, exists) {
      if (err) {
        promise.reject(err);
        return callback(err);
      }

      if (exists) {
        self.get(key, function(err, data) {
          if (err) {
            promise.reject(err);
            return callback(err);
          }

          var index = data.indexOf(pivot);

          if (index < 0) {
            promise.resolve(null);
            return callback(null, null);
          }

          data.splice(index, 0, value);

          self.set(key, data, function(err) {
            if (err) {
              promise.reject(err);
              return callback(err);
            }

            var length = data.length;

            promise.resolve(length);
            callback(null, length);
          });
        });
      } else {
        promise.resolve(null);
        callback(null, null);
      }
    });

    return promise;
  };

  /**
   * Remove the last element in a list, append it to another list and return it
   * @param  {String}   src      source
   * @param  {String}   dest     destination
   * @param  {Function} callback callback
   * @return {Promise}           promise
   */
  min.rpoplpush = function(src, dest, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    self.rpop(src)
      .then(function(value) {
        return self.lpush(dest, value)
      })
      .then(function(length) {
        promise.resolve(value, length);
        callback(null, value, length);
      })
      .fail(function(err) {
        callback(err);
        promise.reject(err);
      });

    return promise;
  };

  /******************************
  **           Set             **
  ******************************/
  min.sadd = function(key, members) {
    var self = this;
    var promise = new Promise(function(len) {
      self.emit('sadd', key, len);
    });

    members = [].slice.call(arguments, 1);
    var added = 0;

    if (!(members[members.length - 1] instanceof Function)) {
      var callback = utils.noop;
    } else {
      var callback = members.splice(members.length - 1, 1)[0];
    }

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          var data = utils.arrayUnique(members);

          return self.set(key, data);
        }
      })
      .then(function() {
        if (Array.isArray(arguments[0])) {
          var data = arguments[0];

          for (var i = 0; i < members.length; i++) {
            (function(index) {
              var curr = members[index];

              if (data.indexOf(curr) >= 0) {
                return;
              } else {
                data.push(curr);
                added++;
              }
            })(i);
          }

          return self.set(key, data);
        } else if (typeof arguments[0] === 'string') {
          added += members.length;

          _keys[key] = 3;

          promise.resolve(added);
          callback(null, added);
        }
      })
      .then(function() {

        _keys[key] = 3;

        promise.resolve(added);
        callback(null, added);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.srem = function(key, members, callback) {
    var self = this;
    var promise = new Promise(function(len) {
      self.emit('srem', key, len);
    });

    members = [].slice.call(arguments, 1);
    var removeds = 0;

    if (!(members[members.length - 1] instanceof Function)) {
      callback = utils.noop;
    }

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          return new Error('no such key');
        }
      })
      .then(function(data) {
        for (var i = 0; i < members.length; i++) {
          (function(index) {
            var curr = members[index];

            var i = data.indexOf(curr);
            if (i >= 0) {
              data.splice(i, 1);
              removeds++;
            }
          })(i);
        }

        return self.set(key, data);
      })
      .then(function() {

        _keys[key] = 3;

        promise.resolve(removeds);
        callback(null, removeds);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.smembers = function(key, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          return new Error('no such key');
        }
      })
      .then(function(members) {
        promise.resolve(members);
        callback(null, members);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.sismember = function(key, value, callback) {
    var self = this;
    var promise = new Promise();

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          return new Error('no such key');
        }
      })
      .then(function(members) {
        var res = members.indexOf(value) >= 0 ? 1 : 0;

        promise.resolve(res);
        callback(null, res);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.scard = function(key, callback) {
    var promise = new Promise();
    callback = callback || utils.noop;
    var self = this;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          return new Error('no such key');
        }
      })
      .then(function(data) {
        var length = data.length;

        promise.resolve(length);
        callback(null, length);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.smove = function(src, dest, member, callback) {
    var self = this;
    var promise = new Promise(function(ok) {
      self.emit('smove', src, dest, member, ok);
    });

    members = [].slice.call(arguments, 1);

    if (!(members[members.length - 1] instanceof Function)) {
      callback = utils.noop;
    }

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.sismember(src, member);
        } else {
          return new Error('no such key');
        }
      })
      .then(function(isMember) {
        if (isMember) {
          return self.srem(src, member);
        } else {
          return new Error('no such member');
        }
      })
      .then(function() {
        return self.sismember(dest, member);
      })
      .then(function(isMember) {
        if (!isMember) {
          return self.sadd(dest, member);
        } else {

          _keys[key] = 3;

          promise.resolve(0);
          callback(null, 0);
        }
      })
      .then(function() {
        _keys[key] = 3;
        promise.resolve(1);
        callback(null, 1);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.srandmember = function(key, callback) {
    var promise = new Promise();
    var self = this;
    callback = callback || utils.noop;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          promise.resolve(null);
          callback(null, null);
        }
      })
      .then(function(members) {
        var index = Math.random() * members.length | 0;

        var member = members[index];

        promise.resolve(member);
        callback(null, member);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.spop = function(key, callback) {
    var self = this;
    var promise = new Promise(function(value) {
      self.emit('spop', key, value);
    });
    callback = callback || utils.noop;

    var member = null;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.srandmember(key);
        } else {
          promise.resolve(null);
          callback(null, null);
        }
      })
      .then(function(_member) {
        member = _member;

        return self.srem(key, member);
      })
      .then(function() {
        promise.resolve(member);
        callback(null, member);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.sunion = function(keys, callback) {
    var promise = new Promise();
    var self = this;

    keys = [].slice.call(arguments);

    if (!(keys[keys.length - 1] instanceof Function)) {
      callback = utils.noop;
    }

    var members = [];

    (function loop(index) {
      var curr = keys[index];

      if (curr) {
        self.exists(curr)
          .then(function(exists) {
            if (exists) {
              return self.get(curr);
            } else {
              loop(++index);
            }
          })
          .then(function(data) {
            if (Array.isArray(data)) {
              members = members.concat(data);
            }

            loop(++index);
          })
          .fail(function(err) {
            promise.reject(err);
            return callback(err);
          });
      } else {
        members = utils.arrayUnique(members);
        promise.resolve(members);
        callback(null, members);
      }
    })(0);

    return promise;
  };

  min.sunionstore = function(dest, keys, callback) {
    var promise = new Promise();
    var self = this;

    keys = [].slice.call(arguments, 2);

    if (!(keys[keys.length - 1] instanceof Function)) {
      callback = utils.noop;
    }

    var members = null;

    self.sunion(keys)
      .then(function(_members) {
        members = _members;

        return self.exists(dest);
      })
      .then(function(exists) {
        if (exists) {
          return self.del(dest);
        } else {
          return self.sadd(dest, members);
        }
      })
      .then(function(length) {
        if (typeof length == 'number') {
          promise.resolve(length, members);
          callback(null, length, members);
        } else {
          return self.sadd(dest, members);
        }
      })
      .then(function(length) {
        promise.resolve(length, members);
        callback(null, length, members);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.sinter = function(keys, callback) {
    var promise = new Promise();
    var self = this;

    keys = [].slice.call(arguments);

    if (!(keys[keys.length - 1] instanceof Function)) {
      callback = utils.noop;
    }

    var memberRows = [];

    (function loop(index) {
      var curr = keys[index];

      if (curr) {
        self.exists(curr)
          .then(function(exists) {
            if (exists) {
              return self.get(curr);
            } else {
              loop(++index);
            }
          })
          .then(function(data) {
            if (Array.isArray(data)) {
              memberRows.push(data);
            }

            loop(++index);
          })
          .fail(function(err) {
            promise.reject(err);
            return callback(err);
          });
      } else {
        var members = utils.arrayInter.apply(utils, memberRows);

        promise.resolve(members);
        callback(null, members);
      }
    })(0);

    return promise;
  };

  min.sinterstore = function(dest, keys, callback) {
    var promise = new Promise();
    var self = this;

    keys = [].slice.call(arguments, 1);

    if (!(keys[keys.length - 1] instanceof Function)) {
      callback = utils.noop;
    }

    var members = null;

    self.sinter.apply(self, keys)
      .then(function(_members) {
        members = _members;

        return self.exists(dest);
      })
      .then(function(exists) {
        if (exists) {
          return self.del(dest);
        } else {
          members.unshift(dest);
          return self.sadd.apply(self, members);
        }
      })
      .then(function(key) {
        if (typeof key == 'string') {
          promise.resolve(members.length, members);
          callback(null, members.length, members);
        } else {
          return self.sadd(dest, members);
        }
      })
      .then(function() {
        promise.resolve(members.length, members);
        callback(null, members.length, members);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.sdiff = function(keys, callback) {
    var promise = new Promise();
    var self = this;

    keys = [].slice.call(arguments, 1);

    if (!(keys[keys.length - 1] instanceof Function)) {
      callback = utils.noop;
    }

    var memberRows = [];

    (function loop(index) {
      var curr = keys[index];

      if (curr) {
        self.exists(curr)
          .then(function(exists) {
            if (exists) {
              return self.get(curr);
            } else {
              loop(++index);
            }
          })
          .then(function(data) {
            if (Array.isArray(data)) {
              memberRows.push(data);
            }

            loop(++index);
          })
          .fail(function(err) {
            promise.reject(err);
            return callback(err);
          });
      } else {
        var members = utils.arrayDiff.apply(utils, memberRows);

        promise.resolve(members);
        callback(null, members);
      }
    })(0);

    return promise;
  };

  min.sdiffstore = function(dest, keys, callback) {
    var promise = new Promise();
    var self = this;

    keys = [].slice.call(arguments, 2);

    if (!(keys[keys.length - 1] instanceof Function)) {
      callback = utils.noop;
    }

    var members = null;

    self.sdiff(keys)
      .then(function(_members) {
        members = _members;

        return self.exists(dest);
      })
      .then(function(exists) {
        if (exists) {
          return self.del(dest);
        } else {
          return self.sadd(dest, members);
        }
      })
      .then(function(length) {
        if (typeof length == 'number') {
          promise.resolve(length, members);
          callback(null, length, members);
        } else {
          return self.sadd(dest, members);
        }
      })
      .then(function(length) {
        promise.resolve(length, members);
        callback(null, length, members);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  /**
   * TODO: Sorted Set
   */

  /******************************
  **         Sorted Set        **
  ******************************/
  min.zadd = function(key, score, member, callback) {
    var self = this;
    var promise = new Promise(function(len) {
      self.emit('zadd', len);
    });
    callback = callback || utils.noop;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          var score2HashsMap = {};
          score2HashsMap[score] = [ 0 ];

          return self.set(key, {
            // members
            ms: [ member ],
            // mapping hash to score
            hsm: { 0: score },
            // mapping score to hash
            shm: score2HashsMap
          });
        }
      })
      .then(function(_key) {
        if ('string' === typeof _key) {
          _keys[key] = 4;

          promise.resolve(1, 1);
          callback(null, 1, 1);
        } else if ('object' === typeof _key) {
          var data = _key;

          if (data.ms.indexOf(member) >= 0) {
            var len = data.ms.length;

            promise.resolve(0, len);
            return callback(null, 0, len);
          }

          // new hash
          var hash = data.ms.length;
          // append the new member
          data.ms.push(member);

          // mapping hash to score
          data.hsm[hash] = score;

          // mapping score to hash
          if (Array.isArray(data.shm[score])) {
            data.shm[score].push(hash);
          } else {
            data.shm[score] = [ hash ];
          }

          return self.set(key, data);
        }
      })
      .then(function(key, data) {
        _keys[key] = 4;

        var len = data.ms.length;

        promise.resolve(1, len);
        callback(null, 1, len);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.zcard = function(key, callback) {
    var self = this;
    var promise = new Promise();
    callback = callback || utils.noop;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          var err = new Error('no such key');

          promise.reject(err);
          callback(err);
        }
      })
      .then(function(data) {
        var len = data.ms.filter(Boolean).length;

        promise.resolve(len);
        callback(null, len);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.zcount = function(key, min, max, callback) {
    var self = this;
    var promise = new Promise(function(len) {
      self.emit(len);
    });
    callback = callback || utils.noop;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          var err = new Error('no such key');

          promise.reject(err);
          callback(err);
        }
      })
      .then(function(data) {
        var hashs = Object
          .keys(data.shm)
          .filter(function(score) {
            return (min <= score && score <= max);
          })
          .map(function(score) {
            return data.shm[score];
          });

        var len = 0;

        hashs.forEach(function(hash) {
          len += hash.length;
        });

        promise.resolve(len);
        callback(null, len);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.zrem = function(key) {
    var self = this;
    var promise = new Promise(function(len) {
      self.emit('zrem', len);
    });
    var callback = arguments[arguments.length - 1];

    var members = [].slice.call(arguments, 1);

    if ('function' !== typeof callback) {
      callback = utils.noop;
    } else {
      members.pop();
    }

    var removeds = 0;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          var err = new Error('no such key');

          promise.reject(err);
          callback(err);
        }
      })
      .then(function(data) {
        var n = members.length;

        var p = new Promise();

        for (var i = 0; i < members.length; i++) {
          (function(index) {
            var hash = data.ms.indexOf(members[index]);

            if (hash >= 0) {
              data.ms[hash] = 0;
              var score = data.hsm[hash]
              delete data.hsm[hash];

              var ii = data.shm[score].indexOf(hash);
              if (ii >= 0) {
                data.shm[score].splice(ii, 1);
              }

              removeds++;

              --n || p.resolve(data);
            } else {
              n--;
            }
          })(i);
        }

        return p;
      })
      .then(function(data) {
        return self.set(key, data);
      })
      .then(function() {
        promise.resolve(removeds);
        callback(null, removeds);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(null, err);
      });

    return promise;
  };

  min.zscore = function(key, member, callback) {
    var self = this;
    var promise = new Promise();
    callback = callback || utils.noop;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          var err = new Error('no such key');

          promise.reject(err);
          callback(err);
        }
      })
      .then(function(data) {
        var hash = data.ms.indexOf(member);

        if (hash >= 0) {
          var score = data.hsm[hash];

          promise.resolve(score);
          callback(null, score);
        } else {
          var err = new Error('This member does not be in the set');

          promise.reject(err);
          callback(err);
        }
      })

    return promise;
  };

  min.zrange = function(key, min, max, callback) {
    var self = this;
    var promise = new Promise(function(len) {
      self.emit(len);
    });
    callback = callback || utils.noop;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          var err = new Error('no such key');

          promise.reject(err);
          callback(err);
        }
      })
      .then(function(data) {
        var hashs = Object
          .keys(data.shm)
          .filter(function(score) {
            return (min <= score && score <= max);
          })
          .map(function(score) {
            return data.shm[score];
          });

        var members = [];

        hashs.forEach(function(hash) {
          members = members.concat(hash.map(function(row) {
            return data.ms[row];
          }));;
        });

        promise.resolve(members);
        callback(null, members);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  min.zrevrange = function(key, min, max, callback) {
    var self = this;
    var promise = new Promise(function(len) {
      self.emit(len);
    });
    callback = callback || utils.noop;

    self.exists(key)
      .then(function(exists) {
        if (exists) {
          return self.get(key);
        } else {
          var err = new Error('no such key');

          promise.reject(err);
          callback(err);
        }
      })
      .then(function(data) {
        var hashs = Object
          .keys(data.shm)
          .reverse()
          .filter(function(score) {
            return (min <= score && score <= max);
          })
          .map(function(score) {
            return data.shm[score];
          });

        var members = [];

        hashs.forEach(function(hash) {
          members = members.concat(hash.map(function(row) {
            return data.ms[row];
          }));;
        });

        promise.resolve(members);
        callback(null, members);
      })
      .fail(function(err) {
        promise.reject(err);
        callback(err);
      });

    return promise;
  };

  function Multi(_nano) {
    var self = this;
    this.queue = [];
    this.last = null;
    this.state = 0;
    this.min = _nano;

    for (var prop in _nano) {
      if (_nano.hasOwnProperty(prop) && 'function' === typeof _nano[prop]) {
        (function(method) {
          self[method] = function() {
            self.queue.push({
              method: method,
              args: arguments
            });

            return self;
          };
        })(prop);
      }
    }
  }
  Multi.prototype.exec = function(callback) {
    var self = this;
    var results = [];

    (function loop(task) {
      if (task) {
        self.min[task.method].apply(self.min, task.args)
          .then(function() {
            results.push(arguments);
            loop(self.queue.shift());
          })
          .fail(function(err) {
            callback(err, results);
          });
      } else {
        callback(null, results);
      }
    })(self.queue.shift());
  };

  min.multi = function() {
    return new Multi(this);
  };

  // Apply
  min.exists('min_keys')
    .then(function(exists) {
      if (exists) {
        return min.get('min_keys');
      }
    })
    .then(function(keys) {
      _keys = JSON.parse(keys);
    });

  return min;
});