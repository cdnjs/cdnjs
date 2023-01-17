import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "text", "header", "appearance", "className"];
import * as React from 'react';
import { HoverPopper } from '../HoverPopper/HoverPopper';
import { Subhead } from '../Typography/Subhead/Subhead';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import "./TextTooltip.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/TextTooltip
 */
export var TextTooltip = function TextTooltip(_ref) {
  var children = _ref.children,
    text = _ref.text,
    header = _ref.header,
    _ref$appearance = _ref.appearance,
    appearance = _ref$appearance === void 0 ? 'neutral' : _ref$appearance,
    className = _ref.className,
    popperProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(HoverPopper, _extends({
    className: classNames("vkuiTextTooltip", styles["TextTooltip--appearance-".concat(appearance)], className),
    arrow: true,
    arrowClassName: "vkuiTextTooltip__arrow",
    content: /*#__PURE__*/React.createElement(React.Fragment, null, hasReactNode(header) && /*#__PURE__*/React.createElement(Subhead, {
      weight: "2",
      className: "vkuiTextTooltip__header"
    }, header), hasReactNode(text) && /*#__PURE__*/React.createElement(Subhead, {
      className: "vkuiTextTooltip__text"
    }, text))
  }, popperProps), children);
};
var styles = {
  "TextTooltip--appearance-accent": "vkuiTextTooltip--appearance-accent",
  "TextTooltip--appearance-white": "vkuiTextTooltip--appearance-white",
  "TextTooltip--appearance-black": "vkuiTextTooltip--appearance-black",
  "TextTooltip--appearance-inversion": "vkuiTextTooltip--appearance-inversion",
  "TextTooltip--appearance-neutral": "vkuiTextTooltip--appearance-neutral"
};
//# sourceMappingURL=TextTooltip.js.map