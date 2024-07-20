(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Inferno = global.Inferno || {}));
})(this, (function (exports) { 'use strict';

    var NO_OP = '$NO_OP';
    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    var isBrowser = !!(typeof window !== 'undefined' && window.document);
    var isArray = Array.isArray;
    function isStringOrNumber(o) {
      var type = typeof o;
      return type === 'string' || type === 'number';
    }
    function isNullOrUndef(o) {
      return isUndefined(o) || isNull(o);
    }
    function isInvalid(o) {
      return isNull(o) || o === false || isTrue(o) || isUndefined(o);
    }
    function isFunction(o) {
      return typeof o === 'function';
    }
    function isString(o) {
      return typeof o === 'string';
    }
    function isNumber(o) {
      return typeof o === 'number';
    }
    function isNull(o) {
      return o === null;
    }
    function isTrue(o) {
      return o === true;
    }
    function isUndefined(o) {
      return o === void 0;
    }
    function isObject(o) {
      return typeof o === 'object';
    }
    function throwError(message) {
      if (!message) {
        message = ERROR_MSG;
      }
      throw new Error("Inferno Error: " + message);
    }
    function warning(message) {
      // tslint:disable-next-line:no-console
      console.error(message);
    }
    function combineFrom(first, second) {
      var out = {};
      if (first) {
        for (var key in first) {
          out[key] = first[key];
        }
      }
      if (second) {
        for (var _key in second) {
          out[_key] = second[_key];
        }
      }
      return out;
    }

    exports.ERROR_MSG = ERROR_MSG;
    exports.NO_OP = NO_OP;
    exports.combineFrom = combineFrom;
    exports.isArray = isArray;
    exports.isBrowser = isBrowser;
    exports.isFunction = isFunction;
    exports.isInvalid = isInvalid;
    exports.isNull = isNull;
    exports.isNullOrUndef = isNullOrUndef;
    exports.isNumber = isNumber;
    exports.isObject = isObject;
    exports.isString = isString;
    exports.isStringOrNumber = isStringOrNumber;
    exports.isTrue = isTrue;
    exports.isUndefined = isUndefined;
    exports.throwError = throwError;
    exports.warning = warning;

}));
