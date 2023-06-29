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
    global.componentTokensTest = mod.exports;
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
      createSassRenderer = _require.createSassRenderer,
      convert = _require.convert;

  var render = createSassRenderer(__dirname);
  describe('_component-tokens.scss', function () {
    it('should emit the correct value for a token in a given theme', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$render, calls, values;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return render("\n      @import '../component-tokens';\n      $tokens: (\n        component-token-01: (\n          fallback: #fafafa,\n          values: (\n            (\n              theme: $carbon--theme--white,\n              value: #ffffff,\n            ),\n            (\n              theme: $carbon--theme--g10,\n              value: #000000,\n            ),\n          ),\n        ),\n      );\n\n      // Default, intended usage with our stock themes\n      @include carbon--theme($carbon--theme--white) {\n        $t: test(get-token-value($tokens, 'component-token-01'));\n      }\n\n      @include carbon--theme($carbon--theme--g10) {\n        $t: test(get-token-value($tokens, 'component-token-01'));\n      }\n\n      // Custom theme that is built on top of the white theme. This\n      // custom should still apply as long as it does not override\n      // any values of the base theme\n      $derived-theme: map-merge($carbon--theme--white, (\n        token-01: #ededed,\n      ));\n\n      @include carbon--theme($derived-theme) {\n        $t: test(get-token-value($tokens, 'component-token-01'));\n      }\n\n      // Fallback value should be used if the theme is completely custom\n      $custom-theme: (\n        token-01: #efefef,\n        token-02: #efefef,\n        token-03: #efefef,\n      );\n      @include carbon--theme($custom-theme) {\n        $t: test(get-token-value($tokens, 'component-token-01'));\n      }\n    ");

            case 2:
              _yield$render = _context.sent;
              calls = _yield$render.calls;
              values = calls.map(function (call) {
                return convert(call[0]);
              });
              expect(values[0]).toBe('#ffffff');
              expect(values[1]).toBe('#000000');
              expect(values[2]).toBe('#ffffff');
              expect(values[3]).toBe('#fafafa');

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should error if unable to find the given token in the token map', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _yield$render2, output;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return render("\n      @import '../component-tokens';\n      $tokens: (\n        component-token-01: (\n          fallback: #000000,\n          values: (),\n        ),\n      );\n      $t: test(get-token-value($tokens, 'component-token-02'));\n    ");

            case 2:
              _yield$render2 = _context2.sent;
              output = _yield$render2.output;
              expect(output.error).toHaveBeenCalledTimes(1);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should emit a CSS Custom Property if the feature flag is set', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _yield$render3, calls;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return render("\n      $feature-flags: (enable-css-custom-properties: true);\n      @import '../component-tokens';\n      $theme: (token-01: #000000);\n      $tokens: (\n        component-token-01: (\n          fallback: #000000,\n          values: (\n            (\n              theme: $theme,\n              value: #ffffff,\n            ),\n          ),\n        ),\n      );\n      $t: test(get-token-value($tokens, 'component-token-01'));\n\n      @include carbon--theme($theme) {\n        $t: test(get-token-value($tokens, 'component-token-01'));\n      }\n    ");

            case 2:
              _yield$render3 = _context3.sent;
              calls = _yield$render3.calls;
              expect(convert(calls[0][0])).toBe('var(--cds-component-token-01, #000000)');
              expect(convert(calls[1][0])).toBe('var(--cds-component-token-01, #ffffff)');

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    describe('is-subset-of-theme', function () {
      it('should return true if a theme is a subset of a given theme map', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _yield$render4, calls;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return render("\n        @import '../component-tokens';\n        $theme-a: (\n          token-01: #000000,\n          token-02: #ffffff,\n          token-03: #ededed,\n        );\n        $theme-b: map-merge($theme-a, (\n          token-04: #efefef,\n        ));\n        $t: test(is-subset-of-theme($theme-b, $theme-a));\n      ");

              case 2:
                _yield$render4 = _context4.sent;
                calls = _yield$render4.calls;
                expect(convert(calls[0][0])).toBe(true);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
      it('should return false if a theme is not a subset of a given theme map', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _yield$render5, calls;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return render("\n        @import '../component-tokens';\n        $theme-a: (\n          token-01: #000000,\n          token-02: #ffffff,\n          token-03: #ededed,\n        );\n        $theme-b: (\n          token-01: #ffffff,\n          token-02: #000000,\n          token-03: #ededed,\n          token-04: #efefef,\n        );\n        $t: test(is-subset-of-theme($theme-b, $theme-a));\n      ");

              case 2:
                _yield$render5 = _context5.sent;
                calls = _yield$render5.calls;
                expect(convert(calls[0][0])).toBe(false);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      })));
    });
  });
});