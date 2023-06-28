import * as React from "react";
import { createPortal } from "react-dom";
import { useAppearance } from "../../hooks/useAppearance";
import { useIsClient } from "../../hooks/useIsClient";
import { AppearanceProvider } from "../AppearanceProvider/AppearanceProvider";
import { AppRootContext } from "./AppRootContext";
export var AppRootPortal = function(param) {
    var children = param.children, className = param.className, forcePortalProp = param.forcePortal;
    var _React_useContext = React.useContext(AppRootContext), portalRoot = _React_useContext.portalRoot, mode = _React_useContext.mode, disablePortal = _React_useContext.disablePortal;
    var appearance = useAppearance();
    var isClient = useIsClient();
    if (!isClient) {
        return null;
    }
    var forcePortal = forcePortalProp !== null && forcePortalProp !== void 0 ? forcePortalProp : mode !== "full";
    return !disablePortal && portalRoot && forcePortal ? /*#__PURE__*/ createPortal(/*#__PURE__*/ React.createElement(AppearanceProvider, {
        appearance: appearance
    }, /*#__PURE__*/ React.createElement("div", {
        className: className
    }, children)), portalRoot) : /*#__PURE__*/ React.createElement(React.Fragment, null, children);
};

//# sourceMappingURL=AppRootPortal.js.map