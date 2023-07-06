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
    global.codeSnippetTest = mod.exports;
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

  describe('scss/components/code-snippet', function () {
    test('Public API', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$render, unwrap;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return render("\n      @use 'sass:map';\n      @use 'sass:meta';\n      @use '../code-snippet';\n\n      $_: get('mixin', meta.mixin-exists('code-snippet', 'code-snippet'));\n      $_: get('variables', map.keys(meta.module-variables('code-snippet')));\n    ");

            case 2:
              _yield$render = _context.sent;
              unwrap = _yield$render.unwrap;
              expect(unwrap('mixin')).toBe(true);
              expect(unwrap('variables')).toMatchInlineSnapshot("\n      Array [\n        \"copy-active\",\n        \"copy-btn-feedback\",\n      ]\n    ");

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('configuration', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _yield$render2, unwrap;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return render("\n      @use '../code-snippet' with (\n        $copy-active: #000,\n      );\n      $_: get('background-color', code-snippet.$copy-active);\n    ");

            case 2:
              _yield$render2 = _context2.sent;
              unwrap = _yield$render2.unwrap;
              expect(unwrap('background-color')).toBe('#000');

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
});