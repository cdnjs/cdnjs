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
    global.breakpointTest = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  /**
   * Copyright IBM Corp. 2018, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * @jest-environment node
   */
  'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var _require = require('@carbon/test-utils/scss'),
      SassRenderer = _require.SassRenderer;

  var _SassRenderer$create = SassRenderer.create(__dirname),
      render = _SassRenderer$create.render;

  describe('@carbon/styles/scss/breakpoint', function () {
    test('Public API', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$render, get, _get, api;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return render("\n      @use 'sass:meta';\n      @use '../breakpoint';\n\n      $_: get('api', (\n        mixins: (\n          breakpoint: meta.mixin-exists('breakpoint', 'breakpoint'),\n          breakpoint-between: meta.mixin-exists('breakpoint-between', 'breakpoint'),\n          breakpoint-down: meta.mixin-exists('breakpoint-down', 'breakpoint'),\n          breakpoint-up: meta.mixin-exists('breakpoint-up', 'breakpoint'),\n        ),\n      ));\n    ");

            case 2:
              _yield$render = _context.sent;
              get = _yield$render.get;
              _get = get('api'), api = _get.value;
              expect(api).toEqual({
                mixins: {
                  breakpoint: true,
                  'breakpoint-between': true,
                  'breakpoint-down': true,
                  'breakpoint-up': true
                }
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
});