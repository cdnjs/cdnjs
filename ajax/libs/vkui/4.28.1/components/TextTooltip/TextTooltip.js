import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "text", "header"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { HoverPopper } from "../HoverPopper/HoverPopper";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import Subhead from "../Typography/Subhead/Subhead";
import { prefixClass } from "../../lib/prefixClass";
export var TextTooltip = function TextTooltip(_ref) {
  var children = _ref.children,
      text = _ref.text,
      header = _ref.header,
      popperProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(HoverPopper, _extends({
    vkuiClass: getClassName("TextTooltip", platform),
    arrow: true,
    arrowClassName: prefixClass("TextTooltip__arrow"),
    content: createScopedElement(React.Fragment, null, hasReactNode(header) && createScopedElement(Subhead, {
      Component: "span",
      weight: "2",
      vkuiClass: "TextTooltip__header"
    }, header), hasReactNode(text) && createScopedElement(Subhead, {
      Component: "span",
      vkuiClass: "TextTooltip__text"
    }, text))
  }, popperProps), children);
};
//# sourceMappingURL=TextTooltip.js.map