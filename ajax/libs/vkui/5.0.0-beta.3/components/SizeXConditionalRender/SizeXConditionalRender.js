import * as React from "react";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getSizeXClassName } from "../../helpers/getSizeXClassName";
import { hasReactNode } from "../../lib/utils";
import { SizeType } from "../../lib/adaptivity";
export var SizeXConditionalRender = function SizeXConditionalRender(_ref) {
  var compact = _ref.compact,
    regular = _ref.regular;
  var _useAdaptivity = useAdaptivity(),
    sizeX = _useAdaptivity.sizeX;
  return /*#__PURE__*/React.createElement(React.Fragment, null, hasReactNode(compact) && (sizeX === undefined || sizeX === SizeType.COMPACT) && /*#__PURE__*/React.createElement("div", {
    className: getSizeXClassName("vkuiSizeXCompact", sizeX)
  }, compact), hasReactNode(regular) && (sizeX === undefined || sizeX === SizeType.REGULAR) && /*#__PURE__*/React.createElement("div", {
    className: getSizeXClassName("vkuiSizeXRegular", sizeX)
  }, regular));
};
//# sourceMappingURL=SizeXConditionalRender.js.map