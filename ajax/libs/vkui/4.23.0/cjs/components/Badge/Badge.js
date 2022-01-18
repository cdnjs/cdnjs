"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Badge = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["mode"];

var Badge = function Badge(_ref) {
  var mode = _ref.mode,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)("span", (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('Badge', platform), "Badge--".concat(mode))
  }, restProps));
};

exports.Badge = Badge;
Badge.defaultProps = {
  mode: 'new'
};
//# sourceMappingURL=Badge.js.map