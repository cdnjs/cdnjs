var passthrough = (function (exports) {
  'use strict';

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }

  function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  /**
   * @todo: Add dynamic params support;
   *
   * Exp;
   * usePassThrough(pt1, pt2, { mergeSections: true });
   * usePassThrough(pt1, { mergeSections: true });
   */
  var usePassThrough = function usePassThrough() {
    var pt1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var pt2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$mergeSections = _ref.mergeSections,
      mergeSections = _ref$mergeSections === void 0 ? true : _ref$mergeSections,
      _ref$mergeProps = _ref.mergeProps,
      mergeProps = _ref$mergeProps === void 0 ? false : _ref$mergeProps,
      classNameMergeFunction = _ref.classNameMergeFunction;
    return {
      _usept: {
        mergeSections: mergeSections,
        mergeProps: mergeProps,
        classNameMergeFunction: classNameMergeFunction
      },
      originalValue: pt1,
      value: _objectSpread(_objectSpread({}, pt1), pt2)
    };
  };

  exports.usePassThrough = usePassThrough;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
