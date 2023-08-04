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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _reactdom = require("react-dom");
var _useAppearance = require("../../hooks/useAppearance");
var _useIsClient = require("../../hooks/useIsClient");
var _isRefObject = require("../../lib/isRefObject");
var _AppearanceProvider = require("../AppearanceProvider/AppearanceProvider");
var _AppRootContext = require("./AppRootContext");
var AppRootPortal = function(param) {
    var children = param.children, className = param.className, forcePortalProp = param.forcePortal, tmp = param.portalRoot, portalRootProp = tmp === void 0 ? null : tmp;
    var _React_useContext = _react.useContext(_AppRootContext.AppRootContext), portalRoot = _React_useContext.portalRoot, mode = _React_useContext.mode, disablePortal = _React_useContext.disablePortal;
    var appearance = (0, _useAppearance.useAppearance)();
    var isClient = (0, _useIsClient.useIsClient)();
    if (!isClient) {
        return null;
    }
    var forcePortal = forcePortalProp !== null && forcePortalProp !== void 0 ? forcePortalProp : mode !== "full";
    var portalContainer = getPortalContainer(portalRootProp, portalRoot);
    var ignoreDisablePortalFlagFromContext = portalRootProp && forcePortal;
    var shouldUsePortal = ignoreDisablePortalFlagFromContext ? true : !disablePortal && portalContainer && forcePortal;
    return shouldUsePortal && portalContainer ? /*#__PURE__*/ (0, _reactdom.createPortal)(/*#__PURE__*/ _react.createElement(_AppearanceProvider.AppearanceProvider, {
        appearance: appearance
    }, /*#__PURE__*/ _react.createElement("div", {
        className: className
    }, children)), portalContainer) : /*#__PURE__*/ _react.createElement(_react.Fragment, null, children);
};
/**
 * Получает из кастомного пропа `partialRootProp` и `partialRoot` контекста
 * контейнер-элемент для портала.
 * `partialRootProp` может быть ref элементом.
 *
 */ function getPortalContainer(portalRootProp, portalRoot) {
    if (!portalRootProp) {
        return portalRoot;
    }
    return (0, _isRefObject.isRefObject)(portalRootProp) ? portalRootProp.current : portalRootProp;
}

//# sourceMappingURL=AppRootPortal.js.map