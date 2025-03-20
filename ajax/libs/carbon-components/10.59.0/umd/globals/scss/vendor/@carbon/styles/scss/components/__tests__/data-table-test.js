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
    global.dataTableTest = mod.exports;
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

  describe('scss/components/data-table', function () {
    test('Public API', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$render, unwrap;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return render("\n       @use 'sass:map';\n       @use 'sass:meta';\n       @use '../data-table';\n \n       $_: get('mixin', meta.mixin-exists('data-table', 'data-table'));\n       $_: get('variables', map.keys(meta.module-variables('data-table')));\n     ");

            case 2:
              _yield$render = _context.sent;
              unwrap = _yield$render.unwrap;
              expect(unwrap('mixin')).toBe(true);
              expect(unwrap('variables')).toMatchInlineSnapshot("\n      Array [\n        \"data-table-column-hover\",\n      ]\n    ");

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('scss/components/data-table/action', function () {
    test('Public API', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _yield$render2, unwrap;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return render("\n         @use 'sass:map';\n         @use 'sass:meta';\n         @use '../data-table/action';\n   \n         $_: get('mixin', meta.mixin-exists('data-table-action', 'action'));\n       ");

            case 2:
              _yield$render2 = _context2.sent;
              unwrap = _yield$render2.unwrap;
              expect(unwrap('mixin')).toBe(true);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
  });
  describe('scss/components/data-table/expandable', function () {
    test('Public API', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _yield$render3, unwrap;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return render("\n         @use 'sass:map';\n         @use 'sass:meta';\n         @use '../data-table/expandable';\n   \n         $_: get('mixin', meta.mixin-exists('data-table-expandable', 'expandable'));\n       ");

            case 2:
              _yield$render3 = _context3.sent;
              unwrap = _yield$render3.unwrap;
              expect(unwrap('mixin')).toBe(true);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('scss/components/data-table/skeleton', function () {
    test('Public API', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _yield$render4, unwrap;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return render("\n         @use 'sass:map';\n         @use 'sass:meta';\n         @use '../data-table/skeleton';\n   \n         $_: get('mixin', meta.mixin-exists('data-table-skeleton', 'skeleton'));\n       ");

            case 2:
              _yield$render4 = _context4.sent;
              unwrap = _yield$render4.unwrap;
              expect(unwrap('mixin')).toBe(true);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
  });
  describe('scss/components/data-table/sort', function () {
    test('Public API', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var _yield$render5, unwrap;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return render("\n         @use 'sass:map';\n         @use 'sass:meta';\n         @use '../data-table/sort';\n   \n         $_: get('mixin', meta.mixin-exists('data-table-sort', 'sort'));\n       ");

            case 2:
              _yield$render5 = _context5.sent;
              unwrap = _yield$render5.unwrap;
              expect(unwrap('mixin')).toBe(true);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
});