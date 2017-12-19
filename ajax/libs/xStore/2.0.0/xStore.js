// Copyright (c) 2012-2016 Florian Hartmann, https://github.com/florian https://github.com/florian/lostorage.js
!function (window, undefined) {

  var utils = {

    isArray: Array.isArray || function (value) {
      return Object.prototype.toString.call(value) === '[object Array]';
    },

    isPlainObj: function (value) {
      return value === Object(value);
    },

    toArray: function (value) {
      return Array.prototype.slice.call(value);
    },

    // Convert arguments to an Array (`utils.toArray`) and prepend `element`.
    prepareArgs: function (args, element) {
      args = utils.toArray(args);
      args.unshift(element);
      return args;
    },

    getObjKeyByValue: function (obj, value) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] === value) return key;
        }
      }
    },

    // Returns fallback if the value is undefined, otherwise value.
    retrieve: function (value, fallback) {
      return value == null ? fallback : value;
    },

    serialize: function (data) {
      return JSON.stringify(data);
    },

    unserialize: function (data) {
      if (data == null) return undefined;
      return JSON.parse(data);
    }

  };

  var xStore = function (prefix, store) {
    this.prefix = prefix;
    this.store = store;
  };

  xStore.prototype.get = function (keys, fallback) {

    fallback = fallback || undefined;

    if (utils.isArray(keys)) {
      var result = {};

      for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        result[key] = this.get(key, fallback);
      }

      return result;
    } else {
      return utils.retrieve(utils.unserialize(this.store.getItem(keys)), fallback);
    }

  };

  xStore.prototype.set = function (key, value) {

    if (utils.isPlainObj(key)) {

      for (var k in key) {
        if (key.hasOwnProperty(k)) this.set(k, key[k]);
      }

    } else {
      key = this.prefix + key;
      this.store.setItem(key, utils.serialize(value));
    }

    return this;

  };

  xStore.prototype.invert = function (key) {
    return this.set(key, !(this.get(key)));
  };

  xStore.prototype.add = function (key, value) {
    return this.set(key, this.get(key) + parseInt(value, 10));
  };

  xStore.prototype.increase = function (key, value) {
    return this.add(key, utils.retrieve(value, 1));
  };

  xStore.prototype.decrease = function (key, value) {
    return this.add(key, -utils.retrieve(value, 1));
  };

  xStore.prototype.concat = function (key, string) {
    return this.set(key, this.get(key) + string);
  };

  xStore.prototype.push = function (key, value) {

    var args = utils.toArray(arguments),
      arr = this.get(key, []);

    args.splice(0, 1);
    arr.push.apply(arr, args);

    return this.set(key, arr);

  };

  xStore.prototype.extend = function (key, k, v) { // variables?

    var value = this.get(key, {});

    if (utils.isPlainObj(k)) {

      for (var _k in k) {
        if (k.hasOwnProperty(_k)) value[_k] = k[_k];
      }

    } else value[k] = v;

    return this.set(key, value);

  };

  xStore.prototype.remove = function (keys) {

    keys = utils.isArray(keys) ? keys : utils.toArray(arguments);

    for (var i = 0, l = keys.length; i < l; i++) {
      delete this.store[keys[i]];
    }

    return this;

  };

  xStore.prototype.empty = function () {
    this.store.clear();
    return this;
  };

  xStore.prototype.all = function () {

    var obj = {};

    for (var i = 0, l = this.store.length; i < l; i++) {
      var key = this.store.key(i);
      obj[key] = utils.unserialize(this.store.getItem(key));
    }

    return obj;
  };

  // AMD, CommonJS or global.
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return xStore;
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = xStore;
  } else {
    window.xStore = xStore;
  }

}(window);
