"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImgixProvider = ImgixProvider;
exports.useImgixContext = useImgixContext;
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["children"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var ImgixContext = /*#__PURE__*/(0, _react.createContext)();

/**
 * `useImgixContext()` tries to invoke `React.useContext()`. If no context
 * is available, this function returns `undefined`.
 * @returns The context defined by the closest parent `ImgixProvider`.
 */
function useImgixContext() {
  return (0, _react.useContext)(ImgixContext);
}

/**
 * Creates a Provider component that passes `reactImgixProps` as the Context
 * for child components who use the `useImgixContext()` custom hook or
 * `React.useContext()` API.
 * @param {React.Element <typeof Component>} children
 * @param {Object} reactImgixProps
 * @returns React.Element
 */
function ImgixProvider(_ref) {
  var children = _ref.children,
    reactImgixProps = _objectWithoutProperties(_ref, _excluded);
  var value = reactImgixProps;
  if (children == null || children.length < 1) {
    console.error("ImgixProvider must have at least one Imgix child component");
  }
  return /*#__PURE__*/_react.default.createElement(ImgixContext.Provider, {
    value: value
  }, children);
}
//# sourceMappingURL=imgixProvider.js.map