import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { createPortal } from 'react-dom';
import { AppRootContext } from "./AppRootContext";
export var AppRootPortal = function AppRootPortal(_ref) {
  var children = _ref.children,
      className = _ref.className;

  var _React$useContext = React.useContext(AppRootContext),
      portalRoot = _React$useContext.portalRoot,
      embedded = _React$useContext.embedded;

  return embedded && portalRoot ? /*#__PURE__*/createPortal(createScopedElement("div", {
    className: className
  }, children), portalRoot) : createScopedElement(React.Fragment, null, children);
};
//# sourceMappingURL=AppRootPortal.js.map