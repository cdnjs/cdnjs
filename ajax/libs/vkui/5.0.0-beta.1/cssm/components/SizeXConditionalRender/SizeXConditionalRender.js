import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getSizeXClassName } from "../../helpers/getSizeXClassName";
import { hasReactNode } from "../../lib/utils";
import { SizeType } from "../../lib/adaptivity";
import "./SizeXConditionalRender.css";
export var SizeXConditionalRender = function SizeXConditionalRender(_ref) {
  var compact = _ref.compact,
      regular = _ref.regular;

  var _useAdaptivity = useAdaptivity(),
      sizeX = _useAdaptivity.sizeX;

  return createScopedElement(React.Fragment, null, hasReactNode(compact) && (sizeX === undefined || sizeX === SizeType.COMPACT) && createScopedElement("div", {
    vkuiClass: classNames(getSizeXClassName("SizeXCompact", sizeX))
  }, compact), hasReactNode(regular) && (sizeX === undefined || sizeX === SizeType.REGULAR) && createScopedElement("div", {
    vkuiClass: classNames(getSizeXClassName("SizeXRegular", sizeX))
  }, regular));
};
//# sourceMappingURL=SizeXConditionalRender.js.map