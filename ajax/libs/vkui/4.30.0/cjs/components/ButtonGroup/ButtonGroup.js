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

var _excluded = ["mode", "gap", "stretched", "getRootRef", "children"];

var ButtonGroup = function ButtonGroup(_ref) {
  var _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "horizontal" : _ref$mode,
      _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? "m" : _ref$gap,
      _ref$stretched = _ref.stretched,
      stretched = _ref$stretched === void 0 ? false : _ref$stretched,
      getRootRef = _ref.getRootRef,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)("ButtonGroup", "ButtonGroup--mode-".concat(mode), gap !== "none" && "ButtonGroup--gap-".concat(gap), stretched && "ButtonGroup--stretched"),
    role: "group",
    ref: getRootRef
  }, restProps), children);
};

exports.ButtonGroup = ButtonGroup;
//# sourceMappingURL=ButtonGroup.js.map