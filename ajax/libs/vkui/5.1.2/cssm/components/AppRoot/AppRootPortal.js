import * as React from 'react';
import { createPortal } from 'react-dom';
import { AppRootContext } from './AppRootContext';
import { AppearanceProvider } from '../AppearanceProvider/AppearanceProvider';
import { useAppearance } from '../../hooks/useAppearance';
import { useIsClient } from '../../hooks/useIsClient';
export var AppRootPortal = function AppRootPortal(_ref) {
  var children = _ref.children,
    className = _ref.className,
    forcePortalProp = _ref.forcePortal;
  var _React$useContext = React.useContext(AppRootContext),
    portalRoot = _React$useContext.portalRoot,
    mode = _React$useContext.mode,
    disablePortal = _React$useContext.disablePortal;
  var appearance = useAppearance();
  var isClient = useIsClient();
  if (!isClient) {
    return null;
  }
  var forcePortal = forcePortalProp !== null && forcePortalProp !== void 0 ? forcePortalProp : mode !== 'full';
  return !disablePortal && portalRoot && forcePortal ? /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement(AppearanceProvider, {
    appearance: appearance
  }, /*#__PURE__*/React.createElement("div", {
    className: className
  }, children)), portalRoot) : /*#__PURE__*/React.createElement(React.Fragment, null, children);
};
//# sourceMappingURL=AppRootPortal.js.map