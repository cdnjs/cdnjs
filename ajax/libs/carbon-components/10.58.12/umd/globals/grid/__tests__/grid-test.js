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
    global.gridTest = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

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
  /**
   * Copyright IBM Corp. 2015, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * @jest-environment node
   */


  var _require = require('@carbon/test-utils/scss'),
      createSassRenderer = _require.createSassRenderer;

  var render = createSassRenderer(__dirname, "\n$css--font-face: false;\n$css--helpers: false;\n$css--body: false;\n$css--use-layer: false;\n$css--reset: false;\n$css--plex: false;\n");
  describe('_grid.scss', function () {
    it('should generate grid code when the grid feature flag is on', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$render, result;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return render("\n@import '../grid';\n");

            case 2:
              _yield$render = _context.sent;
              result = _yield$render.result;
              expect(result.css.toString()).toMatchSnapshot();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should export a 12 column grid by default', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _yield$render2, result, output, breakpoints, _i, _breakpoints, breakpoint;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return render("\n@import '../grid';\n");

            case 2:
              _yield$render2 = _context2.sent;
              result = _yield$render2.result;
              output = result.css.toString();
              breakpoints = ['lg', 'xlg', 'max'];

              for (_i = 0, _breakpoints = breakpoints; _i < _breakpoints.length; _i++) {
                breakpoint = _breakpoints[_i];
                expect(output).toEqual(expect.stringContaining("col-".concat(breakpoint, "-12")));
                expect(output).not.toEqual(expect.stringContaining("col-".concat(breakpoint, "-13")));
                expect(output).toEqual(expect.stringContaining("--offset-".concat(breakpoint, "-11")));
                expect(output).not.toEqual(expect.stringContaining("--offset-".concat(breakpoint, "-12")));
              }

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should export a 16 column grid behind a flag', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _yield$render3, result, output, breakpoints, _i2, _breakpoints2, breakpoint;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return render("\n$feature-flags: (grid-columns-16: true);\n@import '../grid';\n");

            case 2:
              _yield$render3 = _context3.sent;
              result = _yield$render3.result;
              output = result.css.toString();
              breakpoints = ['lg', 'xlg', 'max'];

              for (_i2 = 0, _breakpoints2 = breakpoints; _i2 < _breakpoints2.length; _i2++) {
                breakpoint = _breakpoints2[_i2];
                expect(output).toEqual(expect.stringContaining("col-".concat(breakpoint, "-16")));
                expect(output).not.toEqual(expect.stringContaining("col-".concat(breakpoint, "-17")));
                expect(output).toEqual(expect.stringContaining("--offset-".concat(breakpoint, "-15")));
                expect(output).not.toEqual(expect.stringContaining("--offset-".concat(breakpoint, "-16")));
              }

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
});