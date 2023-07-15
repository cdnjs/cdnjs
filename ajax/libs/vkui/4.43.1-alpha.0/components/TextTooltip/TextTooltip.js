import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "text", "header", "appearance"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { HoverPopper } from "../HoverPopper/HoverPopper";
import { hasReactNode } from "../../lib/utils";
import { Subhead } from "../Typography/Subhead/Subhead";
import { prefixClass } from "../../lib/prefixClass";
import { classNames } from "../../lib/classNames";
/**
 * @see https://vkcom.github.io/VKUI/#/TextTooltip
 */
export var TextTooltip = function TextTooltip(_ref) {
  var children = _ref.children,
    text = _ref.text,
    header = _ref.header,
    _ref$appearance = _ref.appearance,
    appearance = _ref$appearance === void 0 ? "black" : _ref$appearance,
    popperProps = _objectWithoutProperties(_ref, _excluded);
  return createScopedElement(HoverPopper, _extends({
    vkuiClass: classNames("TextTooltip", "TextTooltip--".concat(appearance)),
    arrow: true,
    arrowClassName: prefixClass("TextTooltip__arrow"),
    content: createScopedElement(React.Fragment, null, hasReactNode(header) && createScopedElement(Subhead, {
      weight: "2",
      vkuiClass: "TextTooltip__header"
    }, header), hasReactNode(text) && createScopedElement(Subhead, {
      vkuiClass: "TextTooltip__text"
    }, text))
  }, popperProps), children);
};
//# sourceMappingURL=TextTooltip.js.map