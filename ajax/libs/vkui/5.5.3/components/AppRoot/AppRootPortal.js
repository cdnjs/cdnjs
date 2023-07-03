import * as React from "react";
import { createPortal } from "react-dom";
import { useAppearance } from "../../hooks/useAppearance";
import { useIsClient } from "../../hooks/useIsClient";
import { isRefObject } from "../../lib/isRefObject";
import { AppearanceProvider } from "../AppearanceProvider/AppearanceProvider";
import { AppRootContext } from "./AppRootContext";
export var AppRootPortal = function(param) {
    var children = param.children, className = param.className, forcePortalProp = param.forcePortal, tmp = param.portalRoot, portalRootProp = tmp === void 0 ? null : tmp;
    var _React_useContext = React.useContext(AppRootContext), portalRoot = _React_useContext.portalRoot, mode = _React_useContext.mode, disablePortal = _React_useContext.disablePortal;
    var appearance = useAppearance();
    var isClient = useIsClient();
    if (!isClient) {
        return null;
    }
    var forcePortal = forcePortalProp !== null && forcePortalProp !== void 0 ? forcePortalProp : mode !== "full";
    var portalContainer = getPortalContainer(portalRootProp, portalRoot);
    var ignoreDisablePortalFlagFromContext = portalRootProp && forcePortal;
    var shouldUsePortal = ignoreDisablePortalFlagFromContext ? true : !disablePortal && portalContainer && forcePortal;
    return shouldUsePortal && portalContainer ? /*#__PURE__*/ createPortal(/*#__PURE__*/ React.createElement(AppearanceProvider, {
        appearance: appearance
    }, /*#__PURE__*/ React.createElement("div", {
        className: className
    }, children)), portalContainer) : /*#__PURE__*/ React.createElement(React.Fragment, null, children);
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
    return isRefObject(portalRootProp) ? portalRootProp.current : portalRootProp;
}

//# sourceMappingURL=AppRootPortal.js.map