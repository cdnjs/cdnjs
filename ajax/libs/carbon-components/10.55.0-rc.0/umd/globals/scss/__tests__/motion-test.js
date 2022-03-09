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
    global.motionTest = mod.exports;
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

  var variables = ['carbon--ease-in', 'carbon--ease-out', 'carbon--standard-easing', 'transition--base', 'transition--expansion'];
  var render = createSassRenderer(__dirname);
  describe('motion', function () {
    describe.each(variables)('$%s', function (name) {
      // Temporarily test for regression since these variables were initially
      // under _vars.scss
      it('should be exported through _vars.scss', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _yield$render, calls;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return render("\n@import '../vars';\n\n$c: test(global-variable-exists(".concat(name, "));\n"));

              case 2:
                _yield$render = _context.sent;
                calls = _yield$render.calls; // Check that global-variable-exists returned true

                expect(calls[0][0].getValue()).toBe(true);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))); // New location

      it('should be exported through _motion.scss', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _yield$render2, calls;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return render("\n@import '../motion';\n\n$c: test(global-variable-exists(".concat(name, "));\n"));

              case 2:
                _yield$render2 = _context2.sent;
                calls = _yield$render2.calls; // Check that global-variable-exists returned true

                expect(calls[0][0].getValue()).toBe(true);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
    });
    describe('motion function', function () {
      it('should be exported', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _yield$render3, calls;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return render("\n@import '../motion';\n\n$c: test(function-exists(motion));\n$c: test(function-exists(carbon--motion));\n");

              case 2:
                _yield$render3 = _context3.sent;
                calls = _yield$render3.calls; // Check that global-variable-exists returned true

                expect(calls[0][0].getValue()).toBe(true);
                expect(calls[1][0].getValue()).toBe(true);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      })));
    });
    describe('motion mixin', function () {
      it('should be exported', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var _yield$render4, calls;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return render("\n@import '../motion';\n\n$c: test(mixin-exists(motion));\n$c: test(mixin-exists(carbon--motion));\n");

              case 2:
                _yield$render4 = _context4.sent;
                calls = _yield$render4.calls; // Check that global-variable-exists returned true

                expect(calls[0][0].getValue()).toBe(true);
                expect(calls[1][0].getValue()).toBe(true);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
    });
  });
});