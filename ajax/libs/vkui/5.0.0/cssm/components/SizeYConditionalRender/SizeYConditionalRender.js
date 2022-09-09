import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";
import { hasReactNode } from "../../lib/utils";
import { SizeType } from "../../lib/adaptivity";
import "./SizeYConditionalRender.css";
export var SizeYConditionalRender = function SizeYConditionalRender(_ref) {
  var compact = _ref.compact,
      regular = _ref.regular;

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  return createScopedElement(React.Fragment, null, hasReactNode(compact) && (sizeY === undefined || sizeY === SizeType.COMPACT) && createScopedElement("div", {
    vkuiClass: classNames(getSizeYClassName("SizeYCompact", sizeY))
  }, compact), hasReactNode(regular) && (sizeY === undefined || sizeY === SizeType.REGULAR) && createScopedElement("div", {
    vkuiClass: classNames(getSizeYClassName("SizeYRegular", sizeY))
  }, regular));
};
//# sourceMappingURL=SizeYConditionalRender.js.map