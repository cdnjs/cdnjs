"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["value", "getRootRef"];
var PROGRESS_MIN_VALUE = 0;
var PROGRESS_MAX_VALUE = 100;

var Progress = function Progress(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? 0 : _ref$value,
      getRootRef = _ref.getRootRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var progress = Math.max(PROGRESS_MIN_VALUE, Math.min(value, PROGRESS_MAX_VALUE));
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    "aria-valuenow": value
  }, restProps, {
    role: "progressbar",
    "aria-valuemin": PROGRESS_MIN_VALUE,
    "aria-valuemax": PROGRESS_MAX_VALUE,
    ref: getRootRef,
    vkuiClass: (0, _getClassName.getClassName)("Progress", platform)
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Progress__bg",
    "aria-hidden": "true"
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Progress__in",
    style: {
      width: "".concat(progress, "%")
    },
    "aria-hidden": "true"
  }));
}; // eslint-disable-next-line import/no-default-export


var _default = Progress;
exports.default = _default;
//# sourceMappingURL=Progress.js.map