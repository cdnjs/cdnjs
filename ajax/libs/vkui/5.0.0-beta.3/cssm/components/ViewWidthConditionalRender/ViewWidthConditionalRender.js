import * as React from "react";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getViewWidthClassName } from "../../helpers/getViewWidthClassName";
import { hasReactNode } from "../../lib/utils";
import { ViewWidth } from "../../lib/adaptivity";
import "./ViewWidthConditionalRender.module.css";
export var ViewWidthConditionalRender = function ViewWidthConditionalRender(_ref) {
  var mobile = _ref.mobile,
    desktop = _ref.desktop;
  var _useAdaptivity = useAdaptivity(),
    viewWidth = _useAdaptivity.viewWidth;
  return /*#__PURE__*/React.createElement(React.Fragment, null, hasReactNode(mobile) && (viewWidth === undefined || viewWidth < ViewWidth.TABLET) && /*#__PURE__*/React.createElement("div", {
    className: getViewWidthClassName("vkuiViewWidthConditionalRender__mobile", viewWidth)
  }, mobile), hasReactNode(desktop) && (viewWidth === undefined || viewWidth >= ViewWidth.TABLET) && /*#__PURE__*/React.createElement("div", {
    className: getViewWidthClassName("vkuiViewWidthConditionalRender__desktop", viewWidth)
  }, desktop));
};
//# sourceMappingURL=ViewWidthConditionalRender.js.map