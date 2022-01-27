"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioGroup = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _classNames = require("../../lib/classNames");

var _excluded = ["mode", "children"];

var RadioGroup = function RadioGroup(_ref) {
  var _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "vertical" : _ref$mode,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("RadioGroup", platform), "RadioGroup--".concat(mode))
  }, restProps), children);
};

exports.RadioGroup = RadioGroup;
//# sourceMappingURL=RadioGroup.js.map