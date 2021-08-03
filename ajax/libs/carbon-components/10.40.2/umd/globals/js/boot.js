function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./settings", "./components"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./settings"), require("./components"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.settings, global.components);
    global.boot = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _settings, defaultComponents) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.setComponents = void 0;
  _settings = _interopRequireDefault(_settings);
  defaultComponents = _interopRequireWildcard(defaultComponents);

  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }

  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return {
        default: obj
      };
    }

    var cache = _getRequireWildcardCache(nodeInterop);

    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }

    newObj.default = obj;

    if (cache) {
      cache.set(obj, newObj);
    }

    return newObj;
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  /**
   * Copyright IBM Corp. 2016, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */


  var components = defaultComponents;
  /**
   * The handles for event handlers to lazily instantiate components.
   * @type {Handle[]}
   */

  var lazyInitHandles = [];
  /**
   * Instantiates components automatically
   * by searching for elements with `data-component-name` (e.g. `data-loading`) attribute
   * or upon DOM events (e.g. clicking) on such elements.
   * See each components' static `.init()` methods for details.
   * @private
   */

  var init = function init() {
    var componentClasses = Object.keys(components).map(function (key) {
      return components[key];
    }).filter(function (component) {
      return typeof component.init === 'function';
    });

    if (!_settings.default.disableAutoInit) {
      componentClasses.forEach(function (Clz) {
        var h = Clz.init();

        if (h) {
          lazyInitHandles.push(h);
        }
      });
    }
  };
  /**
   * Replaces the list of components to initialize.
   * @param {object} componentsToReplaceWith The new list of components.
   */


  var setComponents = function setComponents(componentsToReplaceWith) {
    components = componentsToReplaceWith;
  };

  _exports.setComponents = setComponents;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOMContentLoaded has been fired already
    // Let consumer have chance to see if it wants automatic instantiation disabled, and then run automatic instantiation otherwise
    setTimeout(init, 0);
  }

  var _default = lazyInitHandles;
  _exports.default = _default;
});