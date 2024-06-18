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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useAppearance = require("../../hooks/useAppearance");
const _useIsClient = require("../../hooks/useIsClient");
const _createPortal = require("../../lib/createPortal");
const _isRefObject = require("../../lib/isRefObject");
const _AppearanceProvider = require("../AppearanceProvider/AppearanceProvider");
const _AppRootContext = require("./AppRootContext");
const AppRootPortal = ({ children, usePortal })=>{
    const { portalRoot, mode, disablePortal } = _react.useContext(_AppRootContext.AppRootContext);
    const appearance = (0, _useAppearance.useAppearance)();
    const isClient = (0, _useIsClient.useIsClient)();
    if (!isClient) {
        return null;
    }
    const portalContainer = resolvePortalContainer(usePortal, portalRoot.current);
    if (!portalContainer || shouldDisablePortal(usePortal, mode, Boolean(disablePortal))) {
        return /*#__PURE__*/ _react.createElement(_react.Fragment, null, children);
    }
    return (0, _createPortal.createPortal)(/*#__PURE__*/ _react.createElement(_AppearanceProvider.AppearanceProvider, {
        value: appearance
    }, children), portalContainer);
};
function shouldDisablePortal(usePortal, mode, disablePortal) {
    if (usePortal !== undefined) {
        if (typeof usePortal !== 'boolean') {
            return false;
        }
        return disablePortal || usePortal !== true;
    }
    // fallback
    return disablePortal || mode === 'full';
}
function resolvePortalContainer(usePortal, portalRootFromContext) {
    if (usePortal === true || !usePortal) {
        return portalRootFromContext ? portalRootFromContext : null;
    }
    return (0, _isRefObject.isRefObject)(usePortal) ? usePortal.current : usePortal;
}

//# sourceMappingURL=AppRootPortal.js.map