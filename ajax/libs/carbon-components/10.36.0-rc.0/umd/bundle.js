(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./globals/js/boot", "./index", "./globals/js/watch"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./globals/js/boot"), require("./index"), require("./globals/js/watch"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.boot, global.index, global.watch);
    global.bundle = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _boot, _index, _watch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    watch: true
  };
  Object.defineProperty(_exports, "watch", {
    enumerable: true,
    get: function get() {
      return _watch.default;
    }
  });
  Object.keys(_index).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in _exports && _exports[key] === _index[key]) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _index[key];
      }
    });
  });
  _watch = _interopRequireDefault(_watch);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});