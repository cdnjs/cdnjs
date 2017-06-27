if (typeof Map === "undefined") {
  Map = function() { this.clear(); };
  Map.prototype = {
    set: function(k, v) { this._[k] = v; return this; },
    get: function(k) { return this._[k]; },
    has: function(k) { return k in this._; },
    delete: function(k) { return k in this._ && delete this._[k]; },
    clear: function() { this._ = Object.create(null); },
    get size() { var n = 0; for (var k in this._) ++n; return n; },
    forEach: function(c) { for (var k in this._) c(this._[k], k, this); }
  };
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.dispatch = factory();
}(this, function () { 'use strict';

  function Type() {
    this.callbacks = [];
    this.callbackByName = new Map;
  }

  Type.prototype = {
    apply: function(that, args) {
      var z = this.callbacks, // Defensive reference; copy-on-remove.
          i = -1,
          n = z.length,
          l;
      while (++i < n) {
        if (l = z[i].value) {
          l.apply(that, args);
        }
      }
    },
    on: function(name, callback) {
      var callback0 = this.callbackByName.get(name += ""), i;

      // Return the current callback, if any.
      if (arguments.length < 2) return callback0 && callback0.value;

      // Remove the current callback, if any, using copy-on-remove.
      if (callback0) {
        callback0.value = null;
        i = this.callbacks.indexOf(callback0);
        this.callbacks = this.callbacks.slice(0, i).concat(this.callbacks.slice(i + 1));
        this.callbackByName.delete(name);
      }

      // Add the new callback, if any.
      if (callback) {
        callback = {value: callback};
        this.callbackByName.set(name, callback);
        this.callbacks.push(callback);
      }
    }
  };

  function Dispatch(types) {
    var i = -1,
        n = types.length,
        typeByName = new Map,
        type,
        typeName,
        that = this;

    that.on = function(type, callback) {
      var i = (type += "").indexOf("."), name = "";

      // Extract optional name, e.g., "foo" in "click.foo".
      if (i >= 0) name = type.slice(i + 1), type = type.slice(0, i);

      // If a type was specified, set or get the callback as appropriate.
      if (type) return type = typeByName.get(type), arguments.length < 2 ? type.on(name) : (type.on(name, callback), that);

      // Otherwise, if a null callback was specified, remove all callbacks with the given name.
      // Otherwise, ignore! Can’t add or return untyped callbacks.
      if (arguments.length === 2) {
        if (callback == null) typeByName.forEach(function(type) { type.on(name, null); });
        return that;
      }
    };

    while (++i < n) {
      typeName = types[i] + "";
      if (typeName in that) throw new Error("illegal or duplicate type: " + typeName);
      type = new Type;
      typeByName.set(typeName, type);
      that[typeName] = applyOf(type);
    }

    function applyOf(type) {
      return function() {
        type.apply(this, arguments);
        return that;
      };
    }
  }

  var dispatch = function() {
    return new Dispatch(arguments);
  }

  var index = dispatch;

  return index;

}));