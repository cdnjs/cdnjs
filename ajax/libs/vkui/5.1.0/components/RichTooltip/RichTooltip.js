import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "arrow", "appearance", "className"];
import * as React from 'react';
import { HoverPopper } from '../HoverPopper/HoverPopper';
import { classNames } from '@vkontakte/vkjs';
/**
 * @see https://vkcom.github.io/VKUI/#/RichTooltip
 */
export var RichTooltip = function RichTooltip(_ref) {
  var children = _ref.children,
    _ref$arrow = _ref.arrow,
    arrow = _ref$arrow === void 0 ? true : _ref$arrow,
    _ref$appearance = _ref.appearance,
    appearance = _ref$appearance === void 0 ? 'neutral' : _ref$appearance,
    className = _ref.className,
    popperProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(HoverPopper, _extends({
    className: classNames("vkuiRichTooltip", styles["RichTooltip--appearance-".concat(appearance)], className),
    arrow: arrow,
    arrowClassName: "vkuiRichTooltip__arrow"
  }, popperProps), children);
};
var styles = {
  "RichTooltip--appearance-accent": "vkuiRichTooltip--appearance-accent",
  "RichTooltip--appearance-white": "vkuiRichTooltip--appearance-white",
  "RichTooltip--appearance-black": "vkuiRichTooltip--appearance-black",
  "RichTooltip--appearance-inversion": "vkuiRichTooltip--appearance-inversion",
  "RichTooltip--appearance-neutral": "vkuiRichTooltip--appearance-neutral"
};
//# sourceMappingURL=RichTooltip.js.map