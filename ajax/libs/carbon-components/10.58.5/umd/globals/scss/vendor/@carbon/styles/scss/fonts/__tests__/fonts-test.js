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
    global.fontsTest = mod.exports;
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

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function F() {};

        return {
          s: F,
          n: function n() {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function e(_e) {
            throw _e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function s() {
        it = it.call(o);
      },
      n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function e(_e2) {
        didErr = true;
        err = _e2;
      },
      f: function f() {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

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

  var css = require('css');

  var _SassRenderer$create = SassRenderer.create(__dirname),
      render = _SassRenderer$create.render;

  var fonts = ['mono', 'sans-arabic', 'sans-devanagari', 'sans-hebrew', 'sans-thai-looped', 'sans-thai', 'sans', 'serif'];
  var weights = ['thin', 'extralight', 'light', 'regular', 'text', 'medium', 'semibold', 'bold'];
  describe('@carbon/styles/scss/fonts', function () {
    it('should emit default fonts, weights, and styles', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$render, result, _css$parse, stylesheet, atRules, emitted, _iterator, _step, rule, fontFamily, entry, _iterator2, _step2, declaration, mono;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return render("@use '../' as fonts;");

            case 2:
              _yield$render = _context.sent;
              result = _yield$render.result;
              _css$parse = css.parse(result.css.toString()), stylesheet = _css$parse.stylesheet;
              atRules = stylesheet.rules.filter(function (rule) {
                return rule.type === 'font-face';
              });
              emitted = new Map();
              _iterator = _createForOfIteratorHelper(atRules);

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  rule = _step.value;
                  fontFamily = rule.declarations.find(function (declaration) {
                    return declaration.property === 'font-family';
                  }).value.replace(/['"]/g, '');

                  if (!emitted.has(fontFamily)) {
                    emitted.set(fontFamily, {
                      weights: new Set(),
                      styles: new Set()
                    });
                  }

                  entry = emitted.get(fontFamily);
                  _iterator2 = _createForOfIteratorHelper(rule.declarations);

                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      declaration = _step2.value;

                      if (declaration.property === 'font-weight') {
                        entry.weights.add(declaration.value);
                      }

                      if (declaration.property === 'font-style') {
                        entry.styles.add(declaration.value);
                      }
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              expect(emitted.has('IBM Plex Mono')).toBe(true);
              mono = emitted.get('IBM Plex Mono');
              expect(mono.weights).toEqual(new Set(['300', '400', '600']));
              expect(mono.styles).toEqual(new Set(['normal', 'italic']));
              expect(emitted.has('IBM Plex Sans')).toBe(true);
              expect(emitted.get('IBM Plex Sans').weights).toEqual(new Set(['300', '400', '600']));
              expect(emitted.get('IBM Plex Sans').styles).toEqual(new Set(['normal', 'italic']));
              expect(emitted.has('IBM Plex Serif')).toBe(true);
              expect(emitted.get('IBM Plex Serif').weights).toEqual(new Set(['300', '400', '600']));
              expect(emitted.get('IBM Plex Serif').styles).toEqual(new Set(['normal', 'italic']));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should emit no @font-face blocks if $css--font-face is false', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _yield$render2, result;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return render("\n      @use '../../config' with (\n        $css--font-face: false,\n      );\n      @use '../' as fonts;\n    ");

            case 2:
              _yield$render2 = _context2.sent;
              result = _yield$render2.result;
              expect(result.css.toString()).toBe('');

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should not emit fonts set to false', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _yield$render3, result;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return render("\n      @use '../' as fonts with (\n        $fonts: (\n          IBM-Plex-Mono: false,\n          IBM-Plex-Sans: false,\n          IBM-Plex-Serif: false,\n        ),\n      );\n    ");

            case 2:
              _yield$render3 = _context3.sent;
              result = _yield$render3.result;
              expect(result.css.toString()).toBe('');

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    describe.each(fonts)('scss/fonts/_%s.scss', function (font) {
      it('should export all font weights as mixins', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var weightMixins, _yield$render4, unwrap, _iterator3, _step3, weight;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                weightMixins = weights.map(function (weight) {
                  return "$_: get('".concat(weight, "', meta.mixin-exists('").concat(weight, "', '").concat(font, "'));");
                });
                _context4.next = 3;
                return render("\n        @use 'sass:meta';\n        @use '../".concat(font, "';\n\n        ").concat(weightMixins.join('\n'), "\n        $_: get('all', meta.mixin-exists('all', '").concat(font, "'));\n        $_: get('default', meta.mixin-exists('default', '").concat(font, "'));\n      "));

              case 3:
                _yield$render4 = _context4.sent;
                unwrap = _yield$render4.unwrap;
                _iterator3 = _createForOfIteratorHelper(weights);

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    weight = _step3.value;
                    expect(unwrap(weight)).toBe(true);
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }

                expect(unwrap('all')).toBe(true);
                expect(unwrap('default')).toBe(true);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
    });
  });
});