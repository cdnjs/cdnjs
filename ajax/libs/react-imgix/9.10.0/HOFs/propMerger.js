"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeProps = exports.mergeComponentPropsHOF = void 0;
var _react = _interopRequireDefault(require("react"));
var _HOCs = require("../HOCs");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectEntries(obj) {
  var entries = [];
  var keys = Object.keys(obj);
  for (var k = 0; k < keys.length; k++) entries.push([keys[k], obj[keys[k]]]);
  return entries;
}
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Merges the `src` object into the `destination` object. Destination values are
 * not overwritten by source values. Destination properties that resolve to
 * `undefined` or `null` are not overwritten if a destination value exists
 * unless destination key does not exist . It recursively merges the
 * `imgixParams` and `htmlAttributes` values.
 *
 * @param {Object} src - The Provider component's props object
 * @param {Object} destination - The child component's props object
 * @returns Object with the combined values from `src` & `destination` Objects
 *
 * @example
 *  const src = {
 *    width: 100,
 *    height: 200,
 *    imgixParams: { ar: "1:2", dpr: 2},
 *    htmlAttributes: { styles: "width: 50" }
 *  }
 *  const destination = {
 *    width: 101,
 *    height: 201,
 *    imgixParams: { dpr: 1 },
 *    htmlAttributes: { styles: "width: 100" }
 *  }
 *  const result = mergeProps(src, destination);
 *
 *  {
 *    width: 101,
 *    height: 201,
 *    imgixParams: { ar: "1:2", dpr: 1 },
 *    htmlAttributes: { styles: "width: 100" }
 *  }
 *
 */
var _mergeProps = exports.mergeProps = function mergeProps(src, destination) {
  if (src == null && destination !== null) {
    return destination;
  }
  if (src !== null && destination == null) {
    return src;
  }
  if (src == null && destination == null) {
    return {};
  }
  var newProps = _objectSpread({}, destination);
  var newPropKeys = Object.keys(newProps);
  for (var _i = 0, _Object$entries = _objectEntries(src); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      k = _Object$entries$_i[0],
      v = _Object$entries$_i[1];
    if (newPropKeys.indexOf(k) == -1 && v !== null) {
      newProps[k] = v;
    }
    // recursively merge imgixParams and htmlAttributes
    if (k === "imgixParams" || k === "htmlAttributes") {
      if (v !== null) {
        newProps[k] = _mergeProps(src[k], newProps[k]);
      }
    }
  }
  return newProps;
};

/**
 * `mergeComponentPropsHOF` tries to invoke `React.useContext()`. If context is
 * `undefined`, context is being accessed outside of an `ImgixContext` provider
 * and the Component is returned as is.
 *
 * Otherwise, it merges a Component's props with the `ImgixContext` props and
 * return a Component with the merged `props`.
 * @param {React.Element <typeof Component} Component -  with defined `props`.
 * @returns Component with merged `props`.
 */
var mergeComponentPropsHOF = exports.mergeComponentPropsHOF = function mergeComponentPropsHOF(Component) {
  return function mergeComponentPropsHOFInner(props) {
    var contextProps = (0, _HOCs.useImgixContext)();
    if (contextProps == null) {
      return /*#__PURE__*/_react.default.createElement(Component, props);
    }
    var childProps = _mergeProps(contextProps, props);
    return /*#__PURE__*/_react.default.createElement(Component, childProps);
  };
};
//# sourceMappingURL=propMerger.js.map