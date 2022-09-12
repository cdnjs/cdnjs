import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getViewWidthClassName } from "../../helpers/getViewWidthClassName";
import { hasReactNode } from "../../lib/utils";
import "./DeviceConditionalRender.css";
export var DeviceConditionalRender = function DeviceConditionalRender(_ref) {
  var mobile = _ref.mobile,
      desktop = _ref.desktop;

  var _useAdaptivity = useAdaptivity(),
      viewWidth = _useAdaptivity.viewWidth;

  return createScopedElement(React.Fragment, null, hasReactNode(mobile) && createScopedElement("div", {
    vkuiClass: getViewWidthClassName("DeviceConditionalRender__mobile", viewWidth)
  }, mobile), hasReactNode(desktop) && createScopedElement("div", {
    vkuiClass: getViewWidthClassName("DeviceConditionalRender__desktop", viewWidth)
  }, desktop));
};
//# sourceMappingURL=DeviceConditionalRender.js.map