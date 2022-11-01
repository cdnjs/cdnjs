import * as React from "react";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";
import { hasReactNode } from "../../lib/utils";
import { SizeType } from "../../lib/adaptivity";
export var SizeYConditionalRender = function SizeYConditionalRender(_ref) {
  var compact = _ref.compact,
    regular = _ref.regular;
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement(React.Fragment, null, hasReactNode(compact) && (sizeY === undefined || sizeY === SizeType.COMPACT) && /*#__PURE__*/React.createElement("div", {
    className: getSizeYClassName("vkuiSizeYCompact", sizeY)
  }, compact), hasReactNode(regular) && (sizeY === undefined || sizeY === SizeType.REGULAR) && /*#__PURE__*/React.createElement("div", {
    className: getSizeYClassName("vkuiSizeYRegular", sizeY)
  }, regular));
};
//# sourceMappingURL=SizeYConditionalRender.js.map