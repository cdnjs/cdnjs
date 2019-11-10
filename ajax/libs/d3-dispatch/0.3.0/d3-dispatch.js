(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3_dispatch = {})));
}(this, function (exports) { 'use strict';

  var slice = Array.prototype.slice;

  function dispatch() {
    return new Dispatch(arguments);
  }

  function Dispatch(typenames) {
    for (var i = 0, n = typenames.length, types = this._ = new Array(n), t; i < n; ++i) {
      if (!(t = typenames[i] + "") || (t in this)) throw new Error("illegal or duplicate type: " + t);
      this[types[i] = t] = new Type;
    }
  }

  dispatch.prototype = Dispatch.prototype = {
    on: function(typename, callback) {
      var t = typename + "", name = "", i = t.indexOf("."), n;
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !((t = this[t]) instanceof Type)) throw new Error("unknown type: " + typename);

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) return t ? t._get(name) : undefined;

      // If a type was specified, set the callback for the given type and name.
      if (t) t._set(name, callback);

      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      else if (callback == null) {
        for (t = this._, i = 0, n = t.length; i < n; ++i) {
          this[t[i]]._set(name, null);
        }
      }

      return this;
    }
  };

  function Type() {
    this._ = [];
  }

  Type.prototype = {
    _get: function(name) {
      for (var callbacks = this._, i = 0, n = callbacks.length, c; i < n; ++i) {
        if ((c = callbacks[i]).name === name) {
          return c.value;
        }
      }
    },
    _set: function(name, callback) {
      for (var callbacks = this._, i = 0, n = callbacks.length, c; i < n; ++i) {
        if ((c = callbacks[i]).name === name) {
          this._ = callbacks = callbacks.slice(0, i).concat(callbacks.slice(i + 1));
          c.value = null;
          break;
        }
      }
      if (callback != null) callbacks.push({name: name, value: callback});
    },
    call: function(that) {
      this.apply(that, slice.call(arguments, 1));
    },
    apply: function(that, args) {
      var callbacks = this._, // Defensive reference; copy-on-remove.
          callback,
          i = -1,
          n = callbacks.length;

      while (++i < n) {
        if (callback = callbacks[i].value) {
          callback.apply(that, args);
        }
      }
    }
  };

  var version = "0.3.0";

  exports.version = version;
  exports.dispatch = dispatch;

}));