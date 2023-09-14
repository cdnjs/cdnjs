import * as React from 'react';
import { createPortal } from 'react-dom';
import { useAppearance } from '../../hooks/useAppearance';
import { useIsClient } from '../../hooks/useIsClient';
import { isRefObject } from '../../lib/isRefObject';
import { AppearanceProvider } from '../AppearanceProvider/AppearanceProvider';
import { AppRootContext } from './AppRootContext';
export const AppRootPortal = ({ children, className, forcePortal: forcePortalProp, portalRoot: portalRootProp = null })=>{
    const { portalRoot, mode, disablePortal } = React.useContext(AppRootContext);
    const appearance = useAppearance();
    const isClient = useIsClient();
    if (!isClient) {
        return null;
    }
    const forcePortal = forcePortalProp ?? mode !== 'full';
    const portalContainer = getPortalContainer(portalRootProp, portalRoot);
    const ignoreDisablePortalFlagFromContext = portalRootProp && forcePortal;
    const shouldUsePortal = ignoreDisablePortalFlagFromContext ? true : !disablePortal && portalContainer && forcePortal;
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