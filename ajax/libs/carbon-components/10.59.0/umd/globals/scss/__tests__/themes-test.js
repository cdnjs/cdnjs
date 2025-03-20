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
    global.themesTest = mod.exports;
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

  var classic = ['brand-01', 'brand-02', 'brand-03', 'inverse-01', 'inverse-02', 'ui-01', 'ui-02', 'ui-03', 'ui-04', 'ui-05', 'text-01', 'text-02', 'text-03', 'field-01', 'field-02', 'support-01', 'support-02', 'support-03', 'support-04', 'hover-primary', 'hover-primary-text', 'hover-danger', 'hover-secondary', 'hover-row', // Global
  'input-border', 'input-label-weight', 'focus', // Button
  'button-font-weight', 'button-font-size', 'button-border-radius', 'button-height', 'button-padding', 'button-padding-sm', 'button-border-width', 'button-outline-width', // Accordion (Reverse)
  'accordion-flex-direction', 'accordion-justify-content', 'accordion-arrow-margin', 'accordion-title-margin', 'accordion-content-padding', // Checkbox
  'checkbox-border-width', // Code Snippet
  'snippet-background-color', 'snippet-border-color', // Content Switcher
  'content-switcher-border-radius', 'content-switcher-option-border', // Data Table
  'data-table-heading-transform', 'data-table-heading-border-bottom', 'data-table-row-height', // Modal
  'modal-border-top', // Progress Indicator
  'progress-indicator-bar-width', 'progress-indicator-stroke-width', 'progress-indicator-line-offset', // Radio Button
  'radio-border-width', // Structured Theme Variables
  'structured-list-padding', 'structured-list-text-transform', // Skeleton Loading
  'skeleton'];
  var render = createSassRenderer(__dirname);
  describe('_theme.scss', function () {
    it('should allow custom overrides of tokens', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var testColor, _yield$render, calls;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              testColor = '#000000';
              _context.next = 3;
              return render("\n      $brand-01: ".concat(testColor, " !global;\n      @import '../theme';\n      $c: test($brand-01);\n    "));

            case 3:
              _yield$render = _context.sent;
              calls = _yield$render.calls;
              expect(convert(calls[0][0])).toEqual(testColor);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should allow custom overrides of tokens in v10', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var testColor, _yield$render2, calls;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              testColor = '#000000';
              _context2.next = 3;
              return render("\n      $interactive-01: ".concat(testColor, ";\n      @import '../theme';\n      $c: test($interactive-01);\n    "));

            case 3:
              _yield$render2 = _context2.sent;
              calls = _yield$render2.calls;
              expect(convert(calls[0][0])).toEqual(testColor);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should allow custom theme overrides', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var testColor, _yield$render3, calls;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              testColor = '#000000';
              _context3.next = 3;
              return render("\n      $carbon--theme: (\n        interactive-01: ".concat(testColor, ",\n      ) !global;\n\n      @import '../theme';\n\n      $c: test(map-get($carbon--theme, interactive-01));\n    "));

            case 3:
              _yield$render3 = _context3.sent;
              calls = _yield$render3.calls;
              expect(convert(calls[0][0])).toBe(testColor);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should allow inline theming', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var testColor, inlineColor, _yield$render4, calls;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              testColor = '#000000';
              inlineColor = '#ffffff';
              _context4.next = 4;
              return render("\n      $carbon--theme: (\n        interactive-01: ".concat(testColor, ",\n      ) !global;\n      $carbon--inline--theme: (\n        interactive-01: ").concat(inlineColor, ",\n      );\n\n      @import '../theme';\n\n      $c: test(map-get($carbon--theme, interactive-01));\n\n      @mixin my-selector {\n        $c: test($interactive-01);\n        .my-selector {\n          color: $interactive-01;\n        }\n      }\n\n      @include my-selector();\n\n      @include carbon--theme($carbon--inline--theme) {\n        @include my-selector();\n      }\n\n      @include my-selector();\n    "));

            case 4:
              _yield$render4 = _context4.sent;
              calls = _yield$render4.calls;
              expect(convert(calls[0][0])).toBe(testColor);
              expect(convert(calls[1][0])).toBe(testColor);
              expect(convert(calls[2][0])).toBe(inlineColor);
              expect(convert(calls[3][0])).toBe(testColor);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it.each(classic)('$%s should be exported', /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(name) {
        var _yield$render5, calls;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return render("\n      @import '../theme';\n      $c: test(global-variable-exists(".concat(name, "));\n    "));

              case 2:
                _yield$render5 = _context5.sent;
                calls = _yield$render5.calls; // Check that global-variable-exists returned true

                expect(convert(calls[0][0])).toBe(true);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }());
  });
});