import * as React from 'react';
import { createPortal } from 'react-dom';
import { useAppearance } from '../../hooks/useAppearance';
import { useIsClient } from '../../hooks/useIsClient';
import { AppearanceProvider } from '../AppearanceProvider/AppearanceProvider';
import { AppRootContext } from './AppRootContext';
export const AppRootPortal = ({ children , className , forcePortal: forcePortalProp  })=>{
    const { portalRoot , mode , disablePortal  } = React.useContext(AppRootContext);
    const appearance = useAppearance();
    const isClient = useIsClient();
    if (!isClient) {
        return null;
    }
    const forcePortal = forcePortalProp ?? mode !== 'full';
    return !disablePortal && portalRoot && forcePortal ? /*#__PURE__*/ createPortal(/*#__PURE__*/ React.createElement(AppearanceProvider, {
        appearance: appearance
    }, /*#__PURE__*/ React.createElement("div", {
        className: className
    }, children)), portalRoot) : /*#__PURE__*/ React.createElement(React.Fragment, null, children);
};

//# sourceMappingURL=AppRootPortal.js.map