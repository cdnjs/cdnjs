import * as React from "react";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getViewWidthClassName } from "../../helpers/getViewWidthClassName";
import { hasReactNode } from "../../lib/utils";
export var DeviceConditionalRender = function DeviceConditionalRender(_ref) {
  var mobile = _ref.mobile,
    desktop = _ref.desktop;
  var _useAdaptivity = useAdaptivity(),
    viewWidth = _useAdaptivity.viewWidth;
  return /*#__PURE__*/React.createElement(React.Fragment, null, hasReactNode(mobile) && /*#__PURE__*/React.createElement("div", {
    className: getViewWidthClassName("vkuiDeviceConditionalRender__mobile", viewWidth)
  }, mobile), hasReactNode(desktop) && /*#__PURE__*/React.createElement("div", {
    className: getViewWidthClassName("vkuiDeviceConditionalRender__desktop", viewWidth)
  }, desktop));
};
//# sourceMappingURL=DeviceConditionalRender.js.map