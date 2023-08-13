"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImgixProvider = ImgixProvider;
exports.useImgixContext = useImgixContext;
var _react = _interopRequireWildcard(require("react"));
var _excluded = ["children"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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