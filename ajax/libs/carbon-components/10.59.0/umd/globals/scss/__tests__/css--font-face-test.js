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
    global.cssFontFaceTest = mod.exports;
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

  var render = createSassRenderer(__dirname);
  describe('_css--font-face.scss', function () {
    it('should not output CSS if $css--font-face is false', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$render, result;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return render("\n$css--reset: false;\n$css--font-face: false;\n@import '../css--font-face';\n");

            case 2:
              _yield$render = _context.sent;
              result = _yield$render.result; // Should be an empty string, currently will output only @keyframes that are
              // not wrapped around a css flag

              expect(result.css.toString()).toMatchSnapshot();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    describe('experimental', function () {
      it('should output @font-face blocks from elements if components-x flag is enabled', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _yield$render2, result;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return render("\n$css--reset: false;\n$css--font-face: true;\n$css--plex: true;\n@import '../css--font-face';\n");

              case 2:
                _yield$render2 = _context2.sent;
                result = _yield$render2.result;
                expect(result.css.toString()).toMatchSnapshot();
                expect(result.css.toString()).toEqual(expect.stringContaining('@font-face'));
                expect(result.css.toString()).toEqual(expect.stringContaining("font-family: 'IBM Plex Mono'"));
                expect(result.css.toString()).toEqual(expect.stringContaining("font-family: 'IBM Plex Sans'"));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      })));
    });
  });
});