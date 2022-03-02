import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { createPortal } from "react-dom";
import { AppRootContext } from "./AppRootContext";
import { AppearanceProvider } from "../AppearanceProvider/AppearanceProvider";
import { useAppearance } from "../../hooks/useAppearance";
export var AppRootPortal = function AppRootPortal(_ref) {
  var _forcePortal;

  var children = _ref.children,
      className = _ref.className,
      forcePortal = _ref.forcePortal;

  var _React$useContext = React.useContext(AppRootContext),
      portalRoot = _React$useContext.portalRoot,
      mode = _React$useContext.mode;

  var appearance = useAppearance();
  forcePortal = (_forcePortal = forcePortal) !== null && _forcePortal !== void 0 ? _forcePortal : mode !== "full";
  return portalRoot && forcePortal ? /*#__PURE__*/createPortal(createScopedElement(AppearanceProvider, {
    appearance: appearance
  }, createScopedElement("div", {
    className: className
  }, children)), portalRoot) : createScopedElement(React.Fragment, null, children);
};
//# sourceMappingURL=AppRootPortal.js.map