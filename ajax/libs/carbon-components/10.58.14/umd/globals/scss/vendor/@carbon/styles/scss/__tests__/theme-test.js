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
    global.themeTest = mod.exports;
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

  describe('@carbon/styles/scss/theme', function () {
    test('Public API', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$render, get, _get, api;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return render("\n      @use 'sass:map';\n      @use 'sass:meta';\n      @use '../theme';\n\n      $_: get('api', (\n        variables: map.keys(meta.module-variables('theme')),\n        mixins: (\n          theme: meta.mixin-exists('theme', 'theme'),\n        ),\n      ));\n    ");

            case 2:
              _yield$render = _context.sent;
              get = _yield$render.get;
              _get = get('api'), api = _get.value;
              expect(api.mixins).toEqual({
                theme: true
              });
              expect(api.variables).toMatchInlineSnapshot("\n      Array [\n        \"fallback\",\n        \"theme\",\n        \"background\",\n        \"background-active\",\n        \"background-selected\",\n        \"background-selected-hover\",\n        \"background-hover\",\n        \"background-brand\",\n        \"background-inverse\",\n        \"background-inverse-hover\",\n        \"layer-01\",\n        \"layer-active-01\",\n        \"layer-hover-01\",\n        \"layer-selected-01\",\n        \"layer-selected-hover-01\",\n        \"layer-02\",\n        \"layer-active-02\",\n        \"layer-hover-02\",\n        \"layer-selected-02\",\n        \"layer-selected-hover-02\",\n        \"layer-03\",\n        \"layer-active-03\",\n        \"layer-hover-03\",\n        \"layer-selected-03\",\n        \"layer-selected-hover-03\",\n        \"layer-selected-inverse\",\n        \"layer-selected-disabled\",\n        \"layer-accent-01\",\n        \"layer-accent-active-01\",\n        \"layer-accent-hover-01\",\n        \"layer-accent-02\",\n        \"layer-accent-active-02\",\n        \"layer-accent-hover-02\",\n        \"layer-accent-03\",\n        \"layer-accent-active-03\",\n        \"layer-accent-hover-03\",\n        \"field-01\",\n        \"field-hover-01\",\n        \"field-02\",\n        \"field-hover-02\",\n        \"field-03\",\n        \"field-hover-03\",\n        \"interactive\",\n        \"border-subtle-00\",\n        \"border-subtle-01\",\n        \"border-subtle-selected-01\",\n        \"border-subtle-02\",\n        \"border-subtle-selected-02\",\n        \"border-subtle-03\",\n        \"border-subtle-selected-03\",\n        \"border-strong-01\",\n        \"border-strong-02\",\n        \"border-strong-03\",\n        \"border-inverse\",\n        \"border-interactive\",\n        \"border-disabled\",\n        \"text-primary\",\n        \"text-secondary\",\n        \"text-placeholder\",\n        \"text-helper\",\n        \"text-error\",\n        \"text-inverse\",\n        \"text-on-color\",\n        \"text-on-color-disabled\",\n        \"text-disabled\",\n        \"link-primary\",\n        \"link-primary-hover\",\n        \"link-secondary\",\n        \"link-visited\",\n        \"link-inverse\",\n        \"link-inverse-active\",\n        \"link-inverse-hover\",\n        \"icon-primary\",\n        \"icon-secondary\",\n        \"icon-inverse\",\n        \"icon-on-color\",\n        \"icon-on-color-disabled\",\n        \"icon-disabled\",\n        \"support-error\",\n        \"support-success\",\n        \"support-warning\",\n        \"support-info\",\n        \"support-error-inverse\",\n        \"support-success-inverse\",\n        \"support-warning-inverse\",\n        \"support-info-inverse\",\n        \"support-caution-major\",\n        \"support-caution-minor\",\n        \"support-caution-undefined\",\n        \"highlight\",\n        \"overlay\",\n        \"toggle-off\",\n        \"shadow\",\n        \"focus\",\n        \"focus-inset\",\n        \"focus-inverse\",\n        \"skeleton-background\",\n        \"skeleton-element\",\n        \"layer\",\n        \"layer-active\",\n        \"layer-hover\",\n        \"layer-selected\",\n        \"layer-selected-hover\",\n        \"layer-accent\",\n        \"layer-accent-hover\",\n        \"layer-accent-active\",\n        \"field\",\n        \"field-hover\",\n        \"border-subtle\",\n        \"border-subtle-selected\",\n        \"border-strong\",\n      ]\n    ");

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
});