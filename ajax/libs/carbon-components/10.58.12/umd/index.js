(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./globals/js/components", "./globals/js/settings"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./globals/js/components"), require("./globals/js/settings"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.components, global.settings);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _components, _settings) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    settings: true
  };
  Object.defineProperty(_exports, "settings", {
    enumerable: true,
    get: function get() {
      return _settings.default;
    }
  });
  Object.keys(_components).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in _exports && _exports[key] === _components[key]) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _components[key];
      }
    });
  });
  _settings = _interopRequireDefault(_settings);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});