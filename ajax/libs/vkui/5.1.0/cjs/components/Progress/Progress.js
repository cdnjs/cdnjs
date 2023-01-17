"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Progress = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _math = require("../../helpers/math");
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["value", "getRootRef", "className"];
var PROGRESS_MIN_VALUE = 0;
var PROGRESS_MAX_VALUE = 100;

/**
 * @see https://vkcom.github.io/VKUI/#/Progress
 */
var Progress = function Progress(_ref) {
  var _ref$value = _ref.value,
    value = _ref$value === void 0 ? 0 : _ref$value,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var progress = (0, _math.clamp)(value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    "aria-valuenow": value
  }, restProps, {
    role: "progressbar",
    "aria-valuemin": PROGRESS_MIN_VALUE,
    "aria-valuemax": PROGRESS_MAX_VALUE,
    ref: getRootRef,
    className: (0, _vkjs.classNames)("vkuiProgress", className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiProgress__in",
    style: {
      width: "".concat(progress, "%")
    }
  }));
};
exports.Progress = Progress;
//# sourceMappingURL=Progress.js.map