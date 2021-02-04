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
    define(["exports", "./components"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./components"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.components);
    global.watch = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, components) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  components = _interopRequireWildcard(components);

  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();

    _getRequireWildcardCache = function _getRequireWildcardCache() {
      return cache;
    };

    return cache;
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return {
        default: obj
      };
    }

    var cache = _getRequireWildcardCache();

    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
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
  /**
   * Copyright IBM Corp. 2016, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */


  var forEach = Array.prototype.forEach;

  var createAndReleaseComponentsUponDOMMutation = function createAndReleaseComponentsUponDOMMutation(records, componentClasses, componentClassesForWatchInit, options) {
    records.forEach(function (record) {
      forEach.call(record.addedNodes, function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          componentClassesForWatchInit.forEach(function (Clz) {
            Clz.init(node, options);
          });
        }
      });
      forEach.call(record.removedNodes, function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          componentClasses.forEach(function (Clz) {
            if (node.matches(Clz.options.selectorInit)) {
              var instance = Clz.components.get(node);

              if (instance) {
                instance.release();
              }
            } else {
              forEach.call(node.querySelectorAll(Clz.options.selectorInit), function (element) {
                var instance = Clz.components.get(element);

                if (instance) {
                  instance.release();
                }
              });
            }
          });
        }
      });
    });
  };
  /**
   * Automatically instantiates/destroys components in the given element, by watching for DOM additions/removals.
   * @param {Node} target The DOM node to instantiate components in. Should be a document or an element.
   * @param {object} [options] The component options.
   * @returns {Handle} The handle to stop watching.
   */


  function _default() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
      throw new TypeError('DOM document or DOM element should be given to watch for DOM node to create/release components.');
    }

    var componentClasses = Object.keys(components).map(function (key) {
      return components[key];
    }).filter(function (component) {
      return typeof component.init === 'function';
    });
    var handles = componentClasses.map(function (Clz) {
      return Clz.init(target, options);
    }).filter(Boolean);
    var componentClassesForWatchInit = componentClasses.filter(function (Clz) {
      return !Clz.forLazyInit;
    });
    var observer = new MutationObserver(function (records) {
      createAndReleaseComponentsUponDOMMutation(records, componentClasses, componentClassesForWatchInit, options);
    });
    observer.observe(target, {
      childList: true,
      subtree: true
    });
    return {
      release: function release() {
        for (var handle = handles.pop(); handle; handle = handles.pop()) {
          handle.release();
        }

        if (observer) {
          observer.disconnect();
          observer = null;
        }
      }
    };
  }
});