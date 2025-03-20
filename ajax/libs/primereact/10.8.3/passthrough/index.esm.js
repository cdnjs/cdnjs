'use client';
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
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

export { usePassThrough };
