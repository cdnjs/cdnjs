(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.breadcrumbConfig = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  /**
   * Copyright IBM Corp. 2016, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _require = require('../../globals/js/settings'),
      prefix = _require.prefix;

  var items = [{
    label: 'Breadcrumb 1'
  }, {
    label: 'Breadcrumb 2'
  }, {
    label: 'Breadcrumb 3'
  }];
  module.exports = {
    context: {
      prefix: prefix,
      items: items
    },
    variants: [{
      name: 'default',
      label: 'Breadcrumb',
      notes: "\n        Breadcrumb enables users to quickly see their location within a path of navigation\n        and move up to a parent level if desired.\n      "
    }, {
      name: 'current-page',
      label: 'with current page',
      context: {
        items: items.map(function (item, i) {
          if (i !== items.length - 1) {
            return item;
          }

          return _objectSpread(_objectSpread({}, item), {}, {
            current: true
          });
        })
      }
    }]
  };
});