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
    global.layerTest = mod.exports;
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

  var css = require('css');

  var _SassRenderer$create = SassRenderer.create(__dirname),
      render = _SassRenderer$create.render;

  describe('scss/layer', function () {
    it('should map layer set values to scoped $prefix--layer selectors', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$render, result, _css$parse, stylesheet, findSelector, findDeclaration, root, layer1, layer2, layer3;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              findDeclaration = function _findDeclaration(rule, property) {
                return rule.declarations.find(function (declaration) {
                  return declaration.property.includes(property);
                });
              };

              findSelector = function _findSelector(stylesheet, matcher) {
                return stylesheet.rules.find(function (rule) {
                  return rule.selectors.some(function (selector) {
                    return selector.includes(matcher);
                  });
                });
              };

              _context.next = 4;
              return render("\n      @use '../config' with (\n        $prefix: 'cds',\n      );\n      @use '../layer' with (\n        $layer-sets: (\n          field: (\n            rgba(0, 0, 0, 0.3),\n            rgba(0, 0, 0, 0.2),\n            rgba(0, 0, 0, 0.1),\n          ),\n          background: (\n            rgba(0, 0, 0, 0.8),\n            rgba(0, 0, 0, 0.7),\n            rgba(0, 0, 0, 0.6),\n          ),\n        )\n      );\n    ");

            case 4:
              _yield$render = _context.sent;
              result = _yield$render.result;
              _css$parse = css.parse(result.css.toString()), stylesheet = _css$parse.stylesheet;
              root = findSelector(stylesheet, ':root');
              layer1 = findSelector(stylesheet, '.cds--layer-one');
              layer2 = findSelector(stylesheet, '.cds--layer-two');
              layer3 = findSelector(stylesheet, '.cds--layer-three');
              expect(findDeclaration(root, '--cds-field').value).toBe('rgba(0, 0, 0, 0.3)');
              expect(findDeclaration(layer1, '--cds-field').value).toBe('rgba(0, 0, 0, 0.3)');
              expect(findDeclaration(layer2, '--cds-field').value).toBe('rgba(0, 0, 0, 0.2)');
              expect(findDeclaration(layer3, '--cds-field').value).toBe('rgba(0, 0, 0, 0.1)');
              expect(findDeclaration(layer1, '--cds-background').value).toBe('rgba(0, 0, 0, 0.8)');
              expect(findDeclaration(layer2, '--cds-background').value).toBe('rgba(0, 0, 0, 0.7)');
              expect(findDeclaration(layer3, '--cds-background').value).toBe('rgba(0, 0, 0, 0.6)');

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
});