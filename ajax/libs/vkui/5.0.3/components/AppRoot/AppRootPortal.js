import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from "react";
import { createPortal } from "react-dom";
import { AppRootContext } from "./AppRootContext";
import { AppearanceProvider } from "../AppearanceProvider/AppearanceProvider";
import { useAppearance } from "../../hooks/useAppearance";
export var AppRootPortal = function AppRootPortal(_ref) {
  var children = _ref.children,
    className = _ref.className,
    forcePortalProp = _ref.forcePortal;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    mounted = _React$useState2[0],
    setMounted = _React$useState2[1];
  var _React$useContext = React.useContext(AppRootContext),
    portalRoot = _React$useContext.portalRoot,
    mode = _React$useContext.mode,
    disablePortal = _React$useContext.disablePortal;
  var appearance = useAppearance();
  React.useEffect(function () {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  var forcePortal = forcePortalProp !== null && forcePortalProp !== void 0 ? forcePortalProp : mode !== "full";
  return !disablePortal && portalRoot && forcePortal ? /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement(AppearanceProvider, {
    appearance: appearance
  }, /*#__PURE__*/React.createElement("div", {
    className: className
  }, children)), portalRoot) : /*#__PURE__*/React.createElement(React.Fragment, null, children);
};
//# sourceMappingURL=AppRootPortal.js.map