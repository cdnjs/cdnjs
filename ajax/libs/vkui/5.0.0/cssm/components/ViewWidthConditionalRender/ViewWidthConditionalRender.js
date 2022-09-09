import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getViewWidthClassName } from "../../helpers/getViewWidthClassName";
import { hasReactNode } from "../../lib/utils";
import { ViewWidth } from "../../lib/adaptivity";
import "./ViewWidthConditionalRender.css";
export var ViewWidthConditionalRender = function ViewWidthConditionalRender(_ref) {
  var mobile = _ref.mobile,
      desktop = _ref.desktop;

  var _useAdaptivity = useAdaptivity(),
      viewWidth = _useAdaptivity.viewWidth;

  return createScopedElement(React.Fragment, null, hasReactNode(mobile) && (viewWidth === undefined || viewWidth < ViewWidth.TABLET) && createScopedElement("div", {
    vkuiClass: getViewWidthClassName("ViewWidthConditionalRender__mobile", viewWidth)
  }, mobile), hasReactNode(desktop) && (viewWidth === undefined || viewWidth >= ViewWidth.TABLET) && createScopedElement("div", {
    vkuiClass: getViewWidthClassName("ViewWidthConditionalRender__desktop", viewWidth)
  }, desktop));
};
//# sourceMappingURL=ViewWidthConditionalRender.js.map