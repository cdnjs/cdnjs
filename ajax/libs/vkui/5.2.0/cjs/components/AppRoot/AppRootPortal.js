"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppRootPortal = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _AppRootContext = require("./AppRootContext");
var _AppearanceProvider = require("../AppearanceProvider/AppearanceProvider");
var _useAppearance = require("../../hooks/useAppearance");
var _useIsClient = require("../../hooks/useIsClient");
var AppRootPortal = function AppRootPortal(_ref) {
  var children = _ref.children,
    className = _ref.className,
    forcePortalProp = _ref.forcePortal;
  var _React$useContext = React.useContext(_AppRootContext.AppRootContext),
    portalRoot = _React$useContext.portalRoot,
    mode = _React$useContext.mode,
    disablePortal = _React$useContext.disablePortal;
  var appearance = (0, _useAppearance.useAppearance)();
  var isClient = (0, _useIsClient.useIsClient)();
  if (!isClient) {
    return null;
  }
  var forcePortal = forcePortalProp !== null && forcePortalProp !== void 0 ? forcePortalProp : mode !== 'full';
  return !disablePortal && portalRoot && forcePortal ? /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/React.createElement(_AppearanceProvider.AppearanceProvider, {
    appearance: appearance
  }, /*#__PURE__*/React.createElement("div", {
    className: className
  }, children)), portalRoot) : /*#__PURE__*/React.createElement(React.Fragment, null, children);
};
exports.AppRootPortal = AppRootPortal;
//# sourceMappingURL=AppRootPortal.js.map