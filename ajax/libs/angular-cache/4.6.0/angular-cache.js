/**
 * angular-cache
 * @version 4.6.0 - Homepage <https://github.com/jmdobry/angular-cache>
 * @copyright (c) 2013-2016 angular-cache project authors
 * @license MIT <https://github.com/jmdobry/angular-cache/blob/master/LICENSE>
 * @overview angular-cache is a very useful replacement for Angular's $cacheFactory.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(typeof angular === 'undefined' ? require('angular') : angular) :
  typeof define === 'function' && define.amd ? define('angular-cache', ['angular'], factory) :
  (global.angularCacheModuleName = factory(global.angular));
}(this, function (angular) { 'use strict';

  angular = 'default' in angular ? angular['default'] : angular;

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  
  /**
   * @method bubbleUp
   * @param {array} heap The heap.
   * @param {function} weightFunc The weight function.
   * @param {number} n The index of the element to bubble up.
   */
  var bubbleUp = function bubbleUp(heap, weightFunc, n) {
    var element = heap[n];
    var weight = weightFunc(element);
    // When at 0, an element can not go up any further.
    while (n > 0) {
      // Compute the parent element's index, and fetch it.
      var parentN = Math.floor((n + 1) / 2) - 1;
      var parent = heap[parentN];
      // If the parent has a lesser weight, things are in order and we
      // are done.
      if (weight >= weightFunc(parent)) {
        break;
      } else {
        heap[parentN] = element;
        heap[n] = parent;
        n = parentN;
      }
    }
  };

  /**
   * @method bubbleDown
   * @param {array} heap The heap.
   * @param {function} weightFunc The weight function.
   * @param {number} n The index of the element to sink down.
   */
  var bubbleDown = function bubbleDown(heap, weightFunc, n) {
    var length = heap.length;
    var node = heap[n];
    var nodeWeight = weightFunc(node);

    while (true) {
      var child2N = (n + 1) * 2;
      var child1N = child2N - 1;
      var swap = null;
      if (child1N < length) {
        var child1 = heap[child1N];
        var child1Weight = weightFunc(child1);
        // If the score is less than our node's, we need to swap.
        if (child1Weight < nodeWeight) {
          swap = child1N;
        }
      }
      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = heap[child2N];
        var child2Weight = weightFunc(child2);
        if (child2Weight < (swap === null ? nodeWeight : weightFunc(heap[child1N]))) {
          swap = child2N;
        }
      }

      if (swap === null) {
        break;
      } else {
        heap[n] = heap[swap];
        heap[swap] = node;
        n = swap;
      }
    }
  };

  function BinaryHeap(weightFunc, compareFunc) {
    if (!weightFunc) {
      weightFunc = function weightFunc(x) {
        return x;
      };
    }
    if (!compareFunc) {
      compareFunc = function compareFunc(x, y) {
        return x === y;
      };
    }
    if (typeof weightFunc !== 'function') {
      throw new Error('BinaryHeap([weightFunc][, compareFunc]): "weightFunc" must be a function!');
    }
    if (typeof compareFunc !== 'function') {
      throw new Error('BinaryHeap([weightFunc][, compareFunc]): "compareFunc" must be a function!');
    }
    this.weightFunc = weightFunc;
    this.compareFunc = compareFunc;
    this.heap = [];
  }

  var BHProto = BinaryHeap.prototype;

  BHProto.push = function (node) {
    this.heap.push(node);
    bubbleUp(this.heap, this.weightFunc, this.heap.length - 1);
  };

  BHProto.peek = function () {
    return this.heap[0];
  };

  BHProto.pop = function () {
    var front = this.heap[0];
    var end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      bubbleDown(this.heap, this.weightFunc, 0);
    }
    return front;
  };

  BHProto.remove = function (node) {
    var length = this.heap.length;
    for (var i = 0; i < length; i++) {
      if (this.compareFunc(this.heap[i], node)) {
        var removed = this.heap[i];
        var end = this.heap.pop();
        if (i !== length - 1) {
          this.heap[i] = end;
          bubbleUp(this.heap, this.weightFunc, i);
          bubbleDown(this.heap, this.weightFunc, i);
        }
        return removed;
      }
    }
    return null;
  };

  BHProto.removeAll = function () {
    this.heap = [];
  };

  BHProto.size = function () {
    return this.heap.length;
  };

  var _Promise = null;
  try {
    _Promise = window.Promise;
  } catch (e) {}

  var utils = {
    isNumber: function isNumber(value) {
      return typeof value === 'number';
    },
    isString: function isString(value) {
      return typeof value === 'string';
    },
    isObject: function isObject(value) {
      return value !== null && (typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object';
    },
    isFunction: function isFunction(value) {
      return typeof value === 'function';
    },
    fromJson: function fromJson(value) {
      return JSON.parse(value);
    },
    equals: function equals(a, b) {
      return a === b;
    },

    Promise: _Promise
  };

  function _keys(collection) {
    var keys = [];
    var key = void 0;
    if (!utils.isObject(collection)) {
      return keys;
    }
    for (key in collection) {
      if (collection.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  }

  function _isPromiseLike(value) {
    return value && typeof value.then === 'function';
  }

  function _stringifyNumber(number) {
    if (utils.isNumber(number)) {
      return number.toString();
    }
    return number;
  }

  function _keySet(collection) {
    var keySet = {};
    var key = void 0;
    if (!utils.isObject(collection)) {
      return keySet;
    }
    for (key in collection) {
      if (collection.hasOwnProperty(key)) {
        keySet[key] = key;
      }
    }
    return keySet;
  }

  var defaults = {
    capacity: Number.MAX_VALUE,
    maxAge: Number.MAX_VALUE,
    deleteOnExpire: 'none',
    onExpire: null,
    cacheFlushInterval: null,
    recycleFreq: 1000,
    storageMode: 'memory',
    storageImpl: null,
    disabled: false,
    storagePrefix: 'cachefactory.caches.',
    storeOnResolve: false,
    storeOnReject: false
  };

  var caches = {};

  function createCache(cacheId, options) {
    if (cacheId in caches) {
      throw new Error(cacheId + ' already exists!');
    } else if (!utils.isString(cacheId)) {
      throw new Error('cacheId must be a string!');
    }

    var $$data = {};
    var $$promises = {};
    var $$storage = null;
    var $$expiresHeap = new BinaryHeap(function (x) {
      return x.expires;
    }, utils.equals);
    var $$lruHeap = new BinaryHeap(function (x) {
      return x.accessed;
    }, utils.equals);

    var cache = caches[cacheId] = {

      $$id: cacheId,

      destroy: function destroy() {
        clearInterval(this.$$cacheFlushIntervalId);
        clearInterval(this.$$recycleFreqId);
        this.removeAll();
        if ($$storage) {
          $$storage().removeItem(this.$$prefix + '.keys');
          $$storage().removeItem(this.$$prefix);
        }
        $$storage = null;
        $$data = null;
        $$lruHeap = null;
        $$expiresHeap = null;
        this.$$prefix = null;
        delete caches[this.$$id];
      },
      disable: function disable() {
        this.$$disabled = true;
      },
      enable: function enable() {
        delete this.$$disabled;
      },
      get: function get(key, options) {
        var _this2 = this;

        if (Array.isArray(key)) {
          var _ret = function () {
            var keys = key;
            var values = [];

            keys.forEach(function (key) {
              var value = _this2.get(key, options);
              if (value !== null && value !== undefined) {
                values.push(value);
              }
            });

            return {
              v: values
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
        } else {
          key = _stringifyNumber(key);

          if (this.$$disabled) {
            return;
          }
        }

        options = options || {};
        if (!utils.isString(key)) {
          throw new Error('key must be a string!');
        } else if (options && !utils.isObject(options)) {
          throw new Error('options must be an object!');
        } else if (options.onExpire && !utils.isFunction(options.onExpire)) {
          throw new Error('options.onExpire must be a function!');
        }

        var item = void 0;

        if ($$storage) {
          if ($$promises[key]) {
            return $$promises[key];
          }

          var itemJson = $$storage().getItem(this.$$prefix + '.data.' + key);

          if (itemJson) {
            item = utils.fromJson(itemJson);
          } else {
            return;
          }
        } else if (utils.isObject($$data)) {
          if (!(key in $$data)) {
            return;
          }

          item = $$data[key];
        }

        var value = item.value;
        var now = new Date().getTime();

        if ($$storage) {
          $$lruHeap.remove({
            key: key,
            accessed: item.accessed
          });
          item.accessed = now;
          $$lruHeap.push({
            key: key,
            accessed: now
          });
        } else {
          $$lruHeap.remove(item);
          item.accessed = now;
          $$lruHeap.push(item);
        }

        if (this.$$deleteOnExpire === 'passive' && 'expires' in item && item.expires < now) {
          this.remove(key);

          if (this.$$onExpire) {
            this.$$onExpire(key, item.value, options.onExpire);
          } else if (options.onExpire) {
            options.onExpire.call(this, key, item.value);
          }
          value = undefined;
        } else if ($$storage) {
          $$storage().setItem(this.$$prefix + '.data.' + key, JSON.stringify(item));
        }

        return value;
      },
      info: function info(key) {
        if (key) {
          var item = void 0;
          if ($$storage) {
            var itemJson = $$storage().getItem(this.$$prefix + '.data.' + key);

            if (itemJson) {
              item = utils.fromJson(itemJson);
              return {
                created: item.created,
                accessed: item.accessed,
                expires: item.expires,
                isExpired: new Date().getTime() - item.created > (item.maxAge || this.$$maxAge)
              };
            } else {
              return undefined;
            }
          } else if (utils.isObject($$data) && key in $$data) {
            item = $$data[key];

            return {
              created: item.created,
              accessed: item.accessed,
              expires: item.expires,
              isExpired: new Date().getTime() - item.created > (item.maxAge || this.$$maxAge)
            };
          } else {
            return undefined;
          }
        } else {
          return {
            id: this.$$id,
            capacity: this.$$capacity,
            maxAge: this.$$maxAge,
            deleteOnExpire: this.$$deleteOnExpire,
            onExpire: this.$$onExpire,
            cacheFlushInterval: this.$$cacheFlushInterval,
            recycleFreq: this.$$recycleFreq,
            storageMode: this.$$storageMode,
            storageImpl: $$storage ? $$storage() : undefined,
            disabled: !!this.$$disabled,
            size: $$lruHeap && $$lruHeap.size() || 0
          };
        }
      },
      keys: function keys() {
        if ($$storage) {
          var keysJson = $$storage().getItem(this.$$prefix + '.keys');

          if (keysJson) {
            return utils.fromJson(keysJson);
          } else {
            return [];
          }
        } else {
          return _keys($$data);
        }
      },
      keySet: function keySet() {
        if ($$storage) {
          var keysJson = $$storage().getItem(this.$$prefix + '.keys');
          var kSet = {};

          if (keysJson) {
            var keys = utils.fromJson(keysJson);

            for (var i = 0; i < keys.length; i++) {
              kSet[keys[i]] = keys[i];
            }
          }
          return kSet;
        } else {
          return _keySet($$data);
        }
      },
      put: function put(key, value, options) {
        var _this3 = this;

        options || (options = {});

        var storeOnResolve = 'storeOnResolve' in options ? !!options.storeOnResolve : this.$$storeOnResolve;
        var storeOnReject = 'storeOnReject' in options ? !!options.storeOnReject : this.$$storeOnReject;

        var getHandler = function getHandler(store, isError) {
          return function (v) {
            if (store) {
              delete $$promises[key];
              if (utils.isObject(v) && 'status' in v && 'data' in v) {
                v = [v.status, v.data, v.headers(), v.statusText];
                _this3.put(key, v);
              } else {
                _this3.put(key, v);
              }
            }
            if (isError) {
              if (utils.Promise) {
                return utils.Promise.reject(v);
              } else {
                throw v;
              }
            } else {
              return v;
            }
          };
        };

        if (this.$$disabled || !utils.isObject($$data) || value === null || value === undefined) {
          return;
        }
        key = _stringifyNumber(key);

        if (!utils.isString(key)) {
          throw new Error('key must be a string!');
        }

        var now = new Date().getTime();
        var item = {
          key: key,
          value: _isPromiseLike(value) ? value.then(getHandler(storeOnResolve, false), getHandler(storeOnReject, true)) : value,
          created: options.created === undefined ? now : options.created,
          accessed: options.accessed === undefined ? now : options.accessed
        };
        if (options.maxAge) {
          item.maxAge = options.maxAge;
        }

        if (options.expires === undefined) {
          item.expires = item.created + (item.maxAge || this.$$maxAge);
        } else {
          item.expires = options.expires;
        }

        if ($$storage) {
          if (_isPromiseLike(item.value)) {
            $$promises[key] = item.value;
            return $$promises[key];
          }
          var keysJson = $$storage().getItem(this.$$prefix + '.keys');
          var keys = keysJson ? utils.fromJson(keysJson) : [];
          var itemJson = $$storage().getItem(this.$$prefix + '.data.' + key);

          // Remove existing
          if (itemJson) {
            this.remove(key);
          }
          // Add to expires heap
          $$expiresHeap.push({
            key: key,
            expires: item.expires
          });
          // Add to lru heap
          $$lruHeap.push({
            key: key,
            accessed: item.accessed
          });
          // Set item
          $$storage().setItem(this.$$prefix + '.data.' + key, JSON.stringify(item));
          var exists = false;
          for (var i = 0; i < keys.length; i++) {
            if (keys[i] === key) {
              exists = true;
              break;
            }
          }
          if (!exists) {
            keys.push(key);
          }
          $$storage().setItem(this.$$prefix + '.keys', JSON.stringify(keys));
        } else {
          // Remove existing
          if ($$data[key]) {
            this.remove(key);
          }
          // Add to expires heap
          $$expiresHeap.push(item);
          // Add to lru heap
          $$lruHeap.push(item);
          // Set item
          $$data[key] = item;
          delete $$promises[key];
        }

        // Handle exceeded capacity
        if ($$lruHeap.size() > this.$$capacity) {
          this.remove($$lruHeap.peek().key);
        }

        return value;
      },
      remove: function remove(key) {
        key += '';
        delete $$promises[key];
        if ($$storage) {
          var itemJson = $$storage().getItem(this.$$prefix + '.data.' + key);

          if (itemJson) {
            var item = utils.fromJson(itemJson);
            $$lruHeap.remove({
              key: key,
              accessed: item.accessed
            });
            $$expiresHeap.remove({
              key: key,
              expires: item.expires
            });
            $$storage().removeItem(this.$$prefix + '.data.' + key);
            var keysJson = $$storage().getItem(this.$$prefix + '.keys');
            var keys = keysJson ? utils.fromJson(keysJson) : [];
            var index = keys.indexOf(key);

            if (index >= 0) {
              keys.splice(index, 1);
            }
            $$storage().setItem(this.$$prefix + '.keys', JSON.stringify(keys));
            return item.value;
          }
        } else if (utils.isObject($$data)) {
          var value = $$data[key] ? $$data[key].value : undefined;
          $$lruHeap.remove($$data[key]);
          $$expiresHeap.remove($$data[key]);
          $$data[key] = null;
          delete $$data[key];
          return value;
        }
      },
      removeAll: function removeAll() {
        if ($$storage) {
          $$lruHeap.removeAll();
          $$expiresHeap.removeAll();
          var keysJson = $$storage().getItem(this.$$prefix + '.keys');

          if (keysJson) {
            var keys = utils.fromJson(keysJson);

            for (var i = 0; i < keys.length; i++) {
              this.remove(keys[i]);
            }
          }
          $$storage().setItem(this.$$prefix + '.keys', JSON.stringify([]));
        } else if (utils.isObject($$data)) {
          $$lruHeap.removeAll();
          $$expiresHeap.removeAll();
          for (var key in $$data) {
            $$data[key] = null;
          }
          $$data = {};
        } else {
          $$lruHeap.removeAll();
          $$expiresHeap.removeAll();
          $$data = {};
        }
        $$promises = {};
      },
      removeExpired: function removeExpired() {
        var now = new Date().getTime();
        var expired = {};
        var key = void 0;
        var expiredItem = void 0;

        while ((expiredItem = $$expiresHeap.peek()) && expiredItem.expires <= now) {
          expired[expiredItem.key] = expiredItem.value ? expiredItem.value : null;
          $$expiresHeap.pop();
        }

        if ($$storage) {
          for (key in expired) {
            var itemJson = $$storage().getItem(this.$$prefix + '.data.' + key);
            if (itemJson) {
              expired[key] = utils.fromJson(itemJson).value;
              this.remove(key);
            }
          }
        } else {
          for (key in expired) {
            this.remove(key);
          }
        }

        if (this.$$onExpire) {
          for (key in expired) {
            this.$$onExpire(key, expired[key]);
          }
        }

        return expired;
      },
      setCacheFlushInterval: function setCacheFlushInterval(cacheFlushInterval) {
        var _this = this;
        if (cacheFlushInterval === null) {
          delete _this.$$cacheFlushInterval;
        } else if (!utils.isNumber(cacheFlushInterval)) {
          throw new Error('cacheFlushInterval must be a number!');
        } else if (cacheFlushInterval < 0) {
          throw new Error('cacheFlushInterval must be greater than zero!');
        } else if (cacheFlushInterval !== _this.$$cacheFlushInterval) {
          _this.$$cacheFlushInterval = cacheFlushInterval;

          clearInterval(_this.$$cacheFlushIntervalId); // eslint-disable-line

          _this.$$cacheFlushIntervalId = setInterval(function () {
            _this.removeAll();
          }, _this.$$cacheFlushInterval);
        }
      },
      setCapacity: function setCapacity(capacity) {
        if (capacity === null) {
          delete this.$$capacity;
        } else if (!utils.isNumber(capacity)) {
          throw new Error('capacity must be a number!');
        } else if (capacity < 0) {
          throw new Error('capacity must be greater than zero!');
        } else {
          this.$$capacity = capacity;
        }
        var removed = {};
        while ($$lruHeap.size() > this.$$capacity) {
          removed[$$lruHeap.peek().key] = this.remove($$lruHeap.peek().key);
        }
        return removed;
      },
      setDeleteOnExpire: function setDeleteOnExpire(deleteOnExpire, setRecycleFreq) {
        if (deleteOnExpire === null) {
          delete this.$$deleteOnExpire;
        } else if (!utils.isString(deleteOnExpire)) {
          throw new Error('deleteOnExpire must be a string!');
        } else if (deleteOnExpire !== 'none' && deleteOnExpire !== 'passive' && deleteOnExpire !== 'aggressive') {
          throw new Error('deleteOnExpire must be "none", "passive" or "aggressive"!');
        } else {
          this.$$deleteOnExpire = deleteOnExpire;
        }
        if (setRecycleFreq !== false) {
          this.setRecycleFreq(this.$$recycleFreq);
        }
      },
      setMaxAge: function setMaxAge(maxAge) {
        if (maxAge === null) {
          this.$$maxAge = Number.MAX_VALUE;
        } else if (!utils.isNumber(maxAge)) {
          throw new Error('maxAge must be a number!');
        } else if (maxAge < 0) {
          throw new Error('maxAge must be greater than zero!');
        } else {
          this.$$maxAge = maxAge;
        }
        var i = void 0,
            keys = void 0,
            key = void 0;

        $$expiresHeap.removeAll();

        if ($$storage) {
          var keysJson = $$storage().getItem(this.$$prefix + '.keys');

          keys = keysJson ? utils.fromJson(keysJson) : [];

          for (i = 0; i < keys.length; i++) {
            key = keys[i];
            var itemJson = $$storage().getItem(this.$$prefix + '.data.' + key);

            if (itemJson) {
              var item = utils.fromJson(itemJson);
              if (this.$$maxAge === Number.MAX_VALUE) {
                item.expires = Number.MAX_VALUE;
              } else {
                item.expires = item.created + (item.maxAge || this.$$maxAge);
              }
              $$expiresHeap.push({
                key: key,
                expires: item.expires
              });
            }
          }
        } else {
          keys = _keys($$data);

          for (i = 0; i < keys.length; i++) {
            key = keys[i];
            if (this.$$maxAge === Number.MAX_VALUE) {
              $$data[key].expires = Number.MAX_VALUE;
            } else {
              $$data[key].expires = $$data[key].created + ($$data[key].maxAge || this.$$maxAge);
            }
            $$expiresHeap.push($$data[key]);
          }
        }
        if (this.$$deleteOnExpire === 'aggressive') {
          return this.removeExpired();
        } else {
          return {};
        }
      },
      setOnExpire: function setOnExpire(onExpire) {
        if (onExpire === null) {
          delete this.$$onExpire;
        } else if (!utils.isFunction(onExpire)) {
          throw new Error('onExpire must be a function!');
        } else {
          this.$$onExpire = onExpire;
        }
      },
      setOptions: function setOptions(cacheOptions, strict) {
        cacheOptions = cacheOptions || {};
        strict = !!strict;
        if (!utils.isObject(cacheOptions)) {
          throw new Error('cacheOptions must be an object!');
        }

        if ('storagePrefix' in cacheOptions) {
          this.$$storagePrefix = cacheOptions.storagePrefix;
        } else if (strict) {
          this.$$storagePrefix = defaults.storagePrefix;
        }

        this.$$prefix = this.$$storagePrefix + this.$$id;

        if ('disabled' in cacheOptions) {
          this.$$disabled = !!cacheOptions.disabled;
        } else if (strict) {
          this.$$disabled = defaults.disabled;
        }

        if ('deleteOnExpire' in cacheOptions) {
          this.setDeleteOnExpire(cacheOptions.deleteOnExpire, false);
        } else if (strict) {
          this.setDeleteOnExpire(defaults.deleteOnExpire, false);
        }

        if ('recycleFreq' in cacheOptions) {
          this.setRecycleFreq(cacheOptions.recycleFreq);
        } else if (strict) {
          this.setRecycleFreq(defaults.recycleFreq);
        }

        if ('maxAge' in cacheOptions) {
          this.setMaxAge(cacheOptions.maxAge);
        } else if (strict) {
          this.setMaxAge(defaults.maxAge);
        }

        if ('storeOnResolve' in cacheOptions) {
          this.$$storeOnResolve = !!cacheOptions.storeOnResolve;
        } else if (strict) {
          this.$$storeOnResolve = defaults.storeOnResolve;
        }

        if ('storeOnReject' in cacheOptions) {
          this.$$storeOnReject = !!cacheOptions.storeOnReject;
        } else if (strict) {
          this.$$storeOnReject = defaults.storeOnReject;
        }

        if ('capacity' in cacheOptions) {
          this.setCapacity(cacheOptions.capacity);
        } else if (strict) {
          this.setCapacity(defaults.capacity);
        }

        if ('cacheFlushInterval' in cacheOptions) {
          this.setCacheFlushInterval(cacheOptions.cacheFlushInterval);
        } else if (strict) {
          this.setCacheFlushInterval(defaults.cacheFlushInterval);
        }

        if ('onExpire' in cacheOptions) {
          this.setOnExpire(cacheOptions.onExpire);
        } else if (strict) {
          this.setOnExpire(defaults.onExpire);
        }

        if ('storageMode' in cacheOptions || 'storageImpl' in cacheOptions) {
          this.setStorageMode(cacheOptions.storageMode || defaults.storageMode, cacheOptions.storageImpl || defaults.storageImpl);
        } else if (strict) {
          this.setStorageMode(defaults.storageMode, defaults.storageImpl);
        }
      },
      setRecycleFreq: function setRecycleFreq(recycleFreq) {
        if (recycleFreq === null) {
          delete this.$$recycleFreq;
        } else if (!utils.isNumber(recycleFreq)) {
          throw new Error('recycleFreq must be a number!');
        } else if (recycleFreq < 0) {
          throw new Error('recycleFreq must be greater than zero!');
        } else {
          this.$$recycleFreq = recycleFreq;
        }
        clearInterval(this.$$recycleFreqId);
        if (this.$$deleteOnExpire === 'aggressive') {
          (function (self) {
            self.$$recycleFreqId = setInterval(function () {
              self.removeExpired();
            }, self.$$recycleFreq);
          })(this);
        } else {
          delete this.$$recycleFreqId;
        }
      },
      setStorageMode: function setStorageMode(storageMode, storageImpl) {
        if (!utils.isString(storageMode)) {
          throw new Error('storageMode must be a string!');
        } else if (storageMode !== 'memory' && storageMode !== 'localStorage' && storageMode !== 'sessionStorage') {
          throw new Error('storageMode must be "memory", "localStorage" or "sessionStorage"!');
        }

        var prevStorage = $$storage;
        var prevData = $$data;
        var shouldReInsert = false;
        var items = {};

        function load(prevStorage, prevData) {
          var keys = this.keys();
          var length = keys.length;
          if (length) {
            var _key = void 0;
            var prevDataIsObject = utils.isObject(prevData);
            for (var i = 0; i < length; i++) {
              _key = keys[i];
              if (prevStorage) {
                var itemJson = prevStorage().getItem(this.$$prefix + '.data.' + _key);
                if (itemJson) {
                  items[_key] = utils.fromJson(itemJson);
                }
              } else if (prevDataIsObject) {
                items[_key] = prevData[_key];
              }
              this.remove(_key);
            }
            shouldReInsert = true;
          }
        }

        if (!this.$$initializing) {
          load.call(this, prevStorage, prevData);
        }

        this.$$storageMode = storageMode;

        if (storageImpl) {
          if (!utils.isObject(storageImpl)) {
            throw new Error('storageImpl must be an object!');
          } else if (!('setItem' in storageImpl) || typeof storageImpl.setItem !== 'function') {
            throw new Error('storageImpl must implement "setItem(key, value)"!');
          } else if (!('getItem' in storageImpl) || typeof storageImpl.getItem !== 'function') {
            throw new Error('storageImpl must implement "getItem(key)"!');
          } else if (!('removeItem' in storageImpl) || typeof storageImpl.removeItem !== 'function') {
            throw new Error('storageImpl must implement "removeItem(key)"!');
          }
          $$storage = function $$storage() {
            return storageImpl;
          };
        } else if (this.$$storageMode === 'localStorage') {
          try {
            localStorage.setItem('cachefactory', 'cachefactory');
            localStorage.removeItem('cachefactory');
            $$storage = function $$storage() {
              return localStorage;
            };
          } catch (e) {
            $$storage = null;
            this.$$storageMode = 'memory';
          }
        } else if (this.$$storageMode === 'sessionStorage') {
          try {
            sessionStorage.setItem('cachefactory', 'cachefactory');
            sessionStorage.removeItem('cachefactory');
            $$storage = function $$storage() {
              return sessionStorage;
            };
          } catch (e) {
            $$storage = null;
            this.$$storageMode = 'memory';
          }
        } else {
          $$storage = null;
          this.$$storageMode = 'memory';
        }

        if (this.$$initializing) {
          load.call(this, $$storage, $$data);
        }

        if (shouldReInsert) {
          var item = void 0;
          for (var key in items) {
            item = items[key];
            this.put(key, item.value, {
              created: item.created,
              accessed: item.accessed,
              expires: item.expires
            });
          }
        }
      },
      touch: function touch(key, options) {
        var _this4 = this;

        if (key) {
          var val = this.get(key, {
            onExpire: function onExpire(k, v) {
              return _this4.put(k, v);
            }
          });
          if (val) {
            this.put(key, val, options);
          }
        } else {
          var keys = this.keys();
          for (var i = 0; i < keys.length; i++) {
            this.touch(keys[i], options);
          }
        }
      },
      values: function values() {
        var keys = this.keys();
        var items = [];
        for (var i = 0; i < keys.length; i++) {
          items.push(this.get(keys[i]));
        }
        return items;
      }
    };

    cache.$$initializing = true;
    cache.setOptions(options, true);
    cache.$$initializing = false;

    return cache;
  }

  function CacheFactory(cacheId, options) {
    return createCache(cacheId, options);
  }

  CacheFactory.createCache = createCache;
  CacheFactory.defaults = defaults;

  CacheFactory.info = function () {
    var keys = _keys(caches);
    var info = {
      size: keys.length,
      caches: {}
    };
    for (var opt in defaults) {
      if (defaults.hasOwnProperty(opt)) {
        info[opt] = defaults[opt];
      }
    }
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      info.caches[key] = caches[key].info();
    }
    return info;
  };

  CacheFactory.get = function (cacheId) {
    return caches[cacheId];
  };
  CacheFactory.keySet = function () {
    return _keySet(caches);
  };
  CacheFactory.keys = function () {
    return _keys(caches);
  };
  CacheFactory.destroy = function (cacheId) {
    if (caches[cacheId]) {
      caches[cacheId].destroy();
      delete caches[cacheId];
    }
  };
  CacheFactory.destroyAll = function () {
    for (var cacheId in caches) {
      caches[cacheId].destroy();
    }
    caches = {};
  };
  CacheFactory.clearAll = function () {
    for (var cacheId in caches) {
      caches[cacheId].removeAll();
    }
  };
  CacheFactory.removeExpiredFromAll = function () {
    var expired = {};
    for (var cacheId in caches) {
      expired[cacheId] = caches[cacheId].removeExpired();
    }
    return expired;
  };
  CacheFactory.enableAll = function () {
    for (var cacheId in caches) {
      caches[cacheId].$$disabled = false;
    }
  };
  CacheFactory.disableAll = function () {
    for (var cacheId in caches) {
      caches[cacheId].$$disabled = true;
    }
  };
  CacheFactory.touchAll = function () {
    for (var cacheId in caches) {
      caches[cacheId].touch();
    }
  };

  CacheFactory.utils = utils;
  CacheFactory.BinaryHeap = BinaryHeap;

  CacheFactory.utils.equals = angular.equals;
  CacheFactory.utils.isObject = angular.isObject;
  CacheFactory.utils.fromJson = angular.fromJson;

  function BinaryHeapProvider() {
    this.$get = function () {
      return CacheFactory.BinaryHeap;
    };
  }

  function CacheFactoryProvider() {
    this.defaults = CacheFactory.defaults;
    this.defaults.storagePrefix = 'angular-cache.caches.';

    this.$get = ['$q', function ($q) {
      CacheFactory.utils.Promise = $q;
      return CacheFactory;
    }];
  }

  angular.module('angular-cache', []).provider('BinaryHeap', BinaryHeapProvider).provider('CacheFactory', CacheFactoryProvider);

  var index = 'angular-cache';

  return index;

}));
//# sourceMappingURL=angular-cache.js.map