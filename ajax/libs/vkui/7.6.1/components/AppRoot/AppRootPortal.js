'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useColorScheme } from "../../hooks/useColorScheme.js";
import { createPortal } from "../../lib/createPortal.js";
import { useDOM } from "../../lib/dom.js";
import { isRefObject } from "../../lib/isRefObject.js";
import { ColorSchemeProvider } from "../ColorSchemeProvider/ColorSchemeProvider.js";
import { AppRootContext } from "./AppRootContext.js";
import { AppRootStyleContainer } from "./AppRootStyleContainer/AppRootStyleContainer.js";
export const AppRootPortal = ({ children, usePortal, className })=>{
    const { mode, disablePortal: disableCreatePortalInGlobalPortalRoot } = React.useContext(AppRootContext);
    const colorScheme = useColorScheme();
    const canUsePortal = shouldUsePortal(usePortal, mode, Boolean(disableCreatePortalInGlobalPortalRoot));
    const portalContainer = usePortalContainer(usePortal);
    if (canUsePortal && portalContainer) {
        return createPortal(/*#__PURE__*/ _jsx(ColorSchemeProvider, {
            value: colorScheme,
            children: /*#__PURE__*/ _jsx(AppRootStyleContainer, {
                className: className,
                children: children
            })
        }), portalContainer);
    }
    return children;
};
function shouldUsePortal(usePortal, mode, disableCreatePortalInGlobalPortalRoot) {
    if (usePortal === undefined) {
        return disableCreatePortalInGlobalPortalRoot === false && mode !== 'full';
    }
    if (typeof usePortal !== 'boolean') {
        return true;
    }
    return disableCreatePortalInGlobalPortalRoot === false && usePortal === true;
}
function usePortalContainer(usePortal) {
    const { portalRoot: portalRootFromContext } = React.useContext(AppRootContext);
    const { document } = useDOM();
    if (usePortal && typeof usePortal !== 'boolean') {
        return isRefObject(usePortal) ? usePortal.current : usePortal;
    }
    const resolvedPortalFromContext = isRefObject(portalRootFromContext) ? portalRootFromContext.current : portalRootFromContext;
    // если portalRoot не передали через AppRoot, то мы используем body
    // мы можем использовать body как портал,
    // так как все стили передаются вместе с AppRootStyleContainer
    const portalRoot = resolvedPortalFromContext || (document === null || document === void 0 ? void 0 : document.body) || null;
    return portalRoot;
}

//# sourceMappingURL=AppRootPortal.js.map