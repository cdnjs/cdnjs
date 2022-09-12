import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["popout", "modal", "children", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { blurActiveElement, useDOM } from "../../lib/dom";
import { useAdaptivityWithMediaQueries } from "../../hooks/useAdaptivityWithMediaQueries";
import "./PopoutRoot.css";
export var PopoutRoot = function PopoutRoot(_ref) {
  var popout = _ref.popout,
      modal = _ref.modal,
      children = _ref.children,
      getRootRef = _ref.getRootRef,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _useDOM = useDOM(),
      document = _useDOM.document;

  var _useAdaptivityWithMed = useAdaptivityWithMediaQueries(),
      isDesktop = _useAdaptivityWithMed.isDesktop;

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
//# sourceMappingURL=PopoutRoot.js.map