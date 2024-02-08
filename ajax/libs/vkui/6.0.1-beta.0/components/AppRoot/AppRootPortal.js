import * as React from 'react';
import { useAppearance } from '../../hooks/useAppearance';
import { useIsClient } from '../../hooks/useIsClient';
import { createPortal } from '../../lib/createPortal';
import { isRefObject } from '../../lib/isRefObject';
import { AppearanceProvider } from '../AppearanceProvider/AppearanceProvider';
import { AppRootContext } from './AppRootContext';
export const AppRootPortal = ({ children, usePortal })=>{
    const { portalRoot, mode, disablePortal } = React.useContext(AppRootContext);
    const appearance = useAppearance();
    const isClient = useIsClient();
    if (!isClient) {
        return null;
    }
    const portalContainer = resolvePortalContainer(usePortal, portalRoot.current);
    if (!portalContainer || shouldDisablePortal(usePortal, mode, Boolean(disablePortal))) {
        return /*#__PURE__*/ React.createElement(React.Fragment, null, children);
    }
    return createPortal(/*#__PURE__*/ React.createElement(AppearanceProvider, {
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
    return isRefObject(usePortal) ? usePortal.current : usePortal;
}

//# sourceMappingURL=AppRootPortal.js.map