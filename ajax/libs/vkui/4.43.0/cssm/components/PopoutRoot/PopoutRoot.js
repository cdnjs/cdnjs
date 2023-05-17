import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["popout", "modal", "viewWidth", "viewHeight", "hasMouse", "children", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { blurActiveElement, useDOM } from "../../lib/dom";
import { useAdaptivityIsDesktop } from "../../hooks/useAdaptivity";
import "./PopoutRoot.css";
export var PopoutRootComponent = function PopoutRootComponent(_ref) {
  var popout = _ref.popout,
    modal = _ref.modal,
    viewWidth = _ref.viewWidth,
    viewHeight = _ref.viewHeight,
    hasMouse = _ref.hasMouse,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useDOM = useDOM(),
    document = _useDOM.document;
  var isDesktop = useAdaptivityIsDesktop();
  React.useEffect(function () {
    popout && blurActiveElement(document);
  }, [document, popout]);
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: "PopoutRoot",
    ref: getRootRef
  }), children, createScopedElement(AppRootPortal, null, !!popout && createScopedElement("div", {
    vkuiClass: isDesktop ? "PopoutRoot--absolute" : "PopoutRoot__popout"
  }, popout), !!modal && createScopedElement("div", {
    vkuiClass: "PopoutRoot__modal"
  }, modal)));
};
PopoutRootComponent.displayName = "PopoutRoot";
export var PopoutRoot = withAdaptivity(PopoutRootComponent, {
  viewWidth: true,
  viewHeight: true,
  hasMouse: true
});
//# sourceMappingURL=PopoutRoot.js.map