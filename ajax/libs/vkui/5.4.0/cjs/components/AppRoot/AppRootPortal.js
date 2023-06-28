"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppRootPortal", {
    enumerable: true,
    get: function() {
        return AppRootPortal;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _useAppearance = require("../../hooks/useAppearance");
var _useIsClient = require("../../hooks/useIsClient");
var _appearanceProvider = require("../AppearanceProvider/AppearanceProvider");
var _appRootContext = require("./AppRootContext");
var AppRootPortal = function(param) {
    var children = param.children, className = param.className, forcePortalProp = param.forcePortal;
    var _React_useContext = _react.useContext(_appRootContext.AppRootContext), portalRoot = _React_useContext.portalRoot, mode = _React_useContext.mode, disablePortal = _React_useContext.disablePortal;
    var appearance = (0, _useAppearance.useAppearance)();
    var isClient = (0, _useIsClient.useIsClient)();
    if (!isClient) {
        return null;
    }
    var forcePortal = forcePortalProp !== null && forcePortalProp !== void 0 ? forcePortalProp : mode !== "full";
    return !disablePortal && portalRoot && forcePortal ? /*#__PURE__*/ (0, _reactDom.createPortal)(/*#__PURE__*/ _react.createElement(_appearanceProvider.AppearanceProvider, {
        appearance: appearance
    }, /*#__PURE__*/ _react.createElement("div", {
        className: className
    }, children)), portalRoot) : /*#__PURE__*/ _react.createElement(_react.Fragment, null, children);
};

//# sourceMappingURL=AppRootPortal.js.map