import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["popout", "modal", "viewWidth", "viewHeight", "hasMouse", "children", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { withAdaptivity, ViewWidth, ViewHeight } from "../../hoc/withAdaptivity";
import { AppRootPortal } from "../AppRoot/AppRootPortal";
import { blurActiveElement, useDOM } from "../../lib/dom";
export var PopoutRootComponent = function PopoutRootComponent(props) {
  var popout = props.popout,
      modal = props.modal,
      viewWidth = props.viewWidth,
      viewHeight = props.viewHeight,
      hasMouse = props.hasMouse,
      children = props.children,
      getRootRef = props.getRootRef,
      restProps = _objectWithoutProperties(props, _excluded);

  var _useDOM = useDOM(),
      document = _useDOM.document;

  var isDesktop = viewWidth >= ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= ViewHeight.MEDIUM);
  React.useEffect(function () {
    popout && blurActiveElement(document);
  }, [!!popout]);
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: "PopoutRoot",
    ref: getRootRef
  }), children, createScopedElement(AppRootPortal, null, !!popout && createScopedElement("div", {
    vkuiClass: isDesktop ? 'PopoutRoot--absolute' : 'PopoutRoot__popout'
  }, popout), !!modal && createScopedElement("div", {
    vkuiClass: "PopoutRoot__modal"
  }, modal)));
};
PopoutRootComponent.displayName = 'PopoutRoot';
export var PopoutRoot = withAdaptivity(PopoutRootComponent, {
  viewWidth: true,
  viewHeight: true,
  hasMouse: true
});
//# sourceMappingURL=PopoutRoot.js.map