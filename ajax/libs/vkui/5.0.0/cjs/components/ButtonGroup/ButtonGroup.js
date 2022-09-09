"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonGroup = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _excluded = ["mode", "gap", "stretched", "align", "getRootRef", "className", "children"];
var styles = {
  "ButtonGroup": "vkuiButtonGroup",
  "ButtonGroup--stretched": "vkuiButtonGroup--stretched",
  "ButtonGroup--mode-vertical": "vkuiButtonGroup--mode-vertical",
  "ButtonGroup--mode-horizontal": "vkuiButtonGroup--mode-horizontal",
  "ButtonGroup--gap-space": "vkuiButtonGroup--gap-space",
  "ButtonGroup--gap-s": "vkuiButtonGroup--gap-s",
  "ButtonGroup--gap-m": "vkuiButtonGroup--gap-m",
  "ButtonGroup--align-left": "vkuiButtonGroup--align-left",
  "ButtonGroup--align-center": "vkuiButtonGroup--align-center",
  "ButtonGroup--align-right": "vkuiButtonGroup--align-right"
};

/**
 * @see https://vkcom.github.io/VKUI/#/ButtonGroup
 */
var ButtonGroup = function ButtonGroup(_ref) {
  var _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "horizontal" : _ref$mode,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? "m" : _ref$gap,
      _ref$stretched = _ref.stretched,
      stretched = _ref$stretched === void 0 ? false : _ref$stretched,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? "left" : _ref$align,
      getRootRef = _ref.getRootRef,
      className = _ref.className,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    className: (0, _classNames.classNamesString)(className, styles.ButtonGroup, styles["ButtonGroup--mode-".concat(mode)], gap !== "none" && styles["ButtonGroup--gap-".concat(gap)], stretched && styles["ButtonGroup--stretched"], align && styles["ButtonGroup--align-".concat(align)]),
    role: "group",
    ref: getRootRef
  }, restProps), children);
};

exports.ButtonGroup = ButtonGroup;
//# sourceMappingURL=ButtonGroup.js.map