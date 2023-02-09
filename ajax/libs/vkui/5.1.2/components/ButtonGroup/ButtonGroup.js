import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "gap", "stretched", "align", "getRootRef", "className", "children"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
/**
 * @see https://vkcom.github.io/VKUI/#/ButtonGroup
 */
export var ButtonGroup = function ButtonGroup(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'horizontal' : _ref$mode,
    _ref$gap = _ref.gap,
    gap = _ref$gap === void 0 ? 'm' : _ref$gap,
    _ref$stretched = _ref.stretched,
    stretched = _ref$stretched === void 0 ? false : _ref$stretched,
    _ref$align = _ref.align,
    align = _ref$align === void 0 ? 'left' : _ref$align,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classNames(className, "vkuiButtonGroup", styles["ButtonGroup--mode-".concat(mode)], gap !== 'none' && styles["ButtonGroup--gap-".concat(gap)], stretched && "vkuiButtonGroup--stretched", align && styles["ButtonGroup--align-".concat(align)]),
    role: "group",
    ref: getRootRef
  }, restProps), children);
};
var styles = {
  "ButtonGroup--mode-vertical": "vkuiButtonGroup--mode-vertical",
  "ButtonGroup--mode-horizontal": "vkuiButtonGroup--mode-horizontal",
  "ButtonGroup--gap-space": "vkuiButtonGroup--gap-space",
  "ButtonGroup--gap-s": "vkuiButtonGroup--gap-s",
  "ButtonGroup--gap-m": "vkuiButtonGroup--gap-m",
  "ButtonGroup--align-left": "vkuiButtonGroup--align-left",
  "ButtonGroup--align-center": "vkuiButtonGroup--align-center",
  "ButtonGroup--align-right": "vkuiButtonGroup--align-right"
};
//# sourceMappingURL=ButtonGroup.js.map