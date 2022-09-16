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
    global.typeTest = mod.exports;
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

  describe('@carbon/styles/scss/type', function () {
    test('Public API', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _yield$render, get, _get, api;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return render("\n      @use 'sass:map';\n      @use 'sass:meta';\n      @use '../type';\n\n      $_: get('api', (\n        variables: map.keys(meta.module-variables('type')),\n        mixins: (\n          reset: meta.mixin-exists('reset', 'type'),\n          type-style: meta.mixin-exists('type-style', 'type'),\n          font-family: meta.mixin-exists('font-family', 'type'),\n          default-type: meta.mixin-exists('default-type', 'type'),\n        ),\n      ));\n    ");

            case 2:
              _yield$render = _context.sent;
              get = _yield$render.get;
              _get = get('api'), api = _get.value;
              expect(api.mixins).toEqual({
                reset: true,
                'type-style': true,
                'font-family': true,
                'default-type': true
              });
              expect(api.variables).toMatchInlineSnapshot("\n      Array [\n        \"caption-01\",\n        \"label-01\",\n        \"helper-text-01\",\n        \"body-short-01\",\n        \"body-short-02\",\n        \"body-long-01\",\n        \"body-long-02\",\n        \"code-01\",\n        \"code-02\",\n        \"heading-01\",\n        \"heading-02\",\n        \"productive-heading-01\",\n        \"productive-heading-02\",\n        \"productive-heading-03\",\n        \"productive-heading-04\",\n        \"productive-heading-05\",\n        \"productive-heading-06\",\n        \"productive-heading-07\",\n        \"expressive-paragraph-01\",\n        \"expressive-heading-01\",\n        \"expressive-heading-02\",\n        \"expressive-heading-03\",\n        \"expressive-heading-04\",\n        \"expressive-heading-05\",\n        \"expressive-heading-06\",\n        \"quotation-01\",\n        \"quotation-02\",\n        \"display-01\",\n        \"display-02\",\n        \"display-03\",\n        \"display-04\",\n        \"tokens\",\n      ]\n    ");

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
});