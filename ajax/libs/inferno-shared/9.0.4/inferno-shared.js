(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Inferno = global.Inferno || {}));
})(this, (function (exports) { 'use strict';

    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    var isArray = Array.isArray;
    function isStringOrNumber(o) {
      var type = typeof o;
      return type === 'string' || type === 'number';
    }
    function isNullOrUndef(o) {
      return o === void 0 || o === null;
    }
    function isInvalid(o) {
      return o === null || o === false || o === true || o === void 0;
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
    function isUndefined(o) {
      return o === void 0;
    }
    function throwError(message) {
      if (!message) {
        message = ERROR_MSG;
      }
      throw new Error("Inferno Error: " + message);
    }
    function warning(message) {
      console.error(message);
    }
    var KNOWN_STATICS = {
      childContextTypes: true,
      contextType: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromError: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true,
      // KNOWN STATICS
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
    };
    function hoistStaticProperties(targetComponent, sourceComponent) {
      // don't hoist over string (html) components
      var keys = Object.getOwnPropertyNames(sourceComponent);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (!KNOWN_STATICS[key]) {
          targetComponent[key] = sourceComponent[key];
        }
      }
    }
    function isValidElement(obj) {
      var isValidObject = typeof obj === 'object' && !isNull(obj);
      if (!isValidObject) {
        return false;
      }
      return (obj.flags & (14 /* VNodeFlags.Component */ | 481 /* VNodeFlags.Element */)) > 0;
    }

    exports.ERROR_MSG = ERROR_MSG;
    exports.hoistStaticProperties = hoistStaticProperties;
    exports.isArray = isArray;
    exports.isFunction = isFunction;
    exports.isInvalid = isInvalid;
    exports.isNull = isNull;
    exports.isNullOrUndef = isNullOrUndef;
    exports.isNumber = isNumber;
    exports.isString = isString;
    exports.isStringOrNumber = isStringOrNumber;
    exports.isUndefined = isUndefined;
    exports.isValidElement = isValidElement;
    exports.throwError = throwError;
    exports.warning = warning;

}));
