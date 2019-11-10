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
    this.listeners = [];
    this.listenerByName = new Map;
  }

  Type.prototype = {
    dispatch: function(target, args) {
      var z = this.listeners, // Defensive reference; copy-on-remove.
          i = -1,
          n = z.length,
          l;
      while (++i < n) {
        if (l = z[i].value) {
          l.apply(target, args);
        }
      }
    },
    on: function(name, listener) {
      var listeners = this.listeners,
          listenerByName = this.listenerByName,
          l = listenerByName.get(name += ""),
          i;

      // return the current listener, if any
      if (arguments.length < 2) return l && l.value;

      // Remove the old listener, if any, using copy-on-remove.
      if (l) {
        l.value = null;
        this.listeners = listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
        listenerByName.delete(name);
      }

      // Add the new listener, if any.
      if (listener) {
        listener = {value: listener};
        listenerByName.set(name, listener);
        listeners.push(listener);
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

    that.on = function(type, listener) {
      var i = (type += "").indexOf("."), name = "";

      // Extract optional name, e.g., "foo" in "click.foo".
      if (i >= 0) name = type.slice(i + 1), type = type.slice(0, i);

      // If a type was specified, set or get the listener as appropriate.
      if (type) return type = typeByName.get(type), arguments.length < 2 ? type.on(name) : (type.on(name, listener), that);

      // Otherwise, if a null listener was specified, remove all listeners with the given name.
      // Otherwise, ignore! Can’t add or return untyped listeners.
      if (arguments.length === 2) {
        if (listener == null) typeByName.forEach(function(type) { type.on(name, null) });
        return that;
      }
    };

    while (++i < n) {
      typeName = types[i] + "";
      if (typeName in that) throw new Error("illegal or duplicate type: " + typeName);
      type = new Type;
      typeByName.set(typeName, type);
      that[typeName] = dispatchOf(type);
    }

    function dispatchOf(type) {
      return function() {
        type.dispatch(this, arguments);
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