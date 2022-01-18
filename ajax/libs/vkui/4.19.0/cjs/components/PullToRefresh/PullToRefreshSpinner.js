"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames = require("../../lib/classNames");

var _excluded = ["on", "progress", "size", "strokeWidth", "style"];

function calcStrokeDashOffset(value, radius) {
  var progress = value / 100;
  return 2 * Math.PI * radius * (1 - progress);
}

var PullToRefreshSpinner = function PullToRefreshSpinner(_ref) {
  var on = _ref.on,
      progress = _ref.progress,
      size = _ref.size,
      strokeWidth = _ref.strokeWidth,
      style = _ref.style,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var radius = 0.5 * size - 0.5 * strokeWidth;
  var dasharray = 2 * Math.PI * radius;
  var circleCenter = 0.5 * size;
  var dashoffset = calcStrokeDashOffset(on ? 80 : progress, radius);
  return (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)('PullToRefresh__spinner', {
      'PullToRefresh__spinner--on': on
    }),
    style: style,
    "aria-label": on ? restProps['aria-label'] : undefined
  }, (0, _jsxRuntime.createScopedElement)("svg", {
    role: "presentation",
    vkuiClass: "PullToRefresh__spinner-self",
    style: {
      width: size,
      height: size
    },
    viewBox: "0 0 ".concat(size, " ").concat(size),
    xmlns: "http://www.w3.org/2000/svg"
  }, (0, _jsxRuntime.createScopedElement)("g", {
    style: {
      width: size,
      height: size,
      transformOrigin: "".concat(circleCenter, "px ").concat(circleCenter, "px")
    }
  }, (0, _jsxRuntime.createScopedElement)("circle", {
    vkuiClass: "PullToRefresh__spinner-path",
    fill: "none",
    strokeDasharray: dasharray,
    strokeDashoffset: dashoffset,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    cx: circleCenter,
    cy: circleCenter,
    r: radius
  }))));
};

PullToRefreshSpinner.defaultProps = {
  'size': 24,
  'strokeWidth': 2.5,
  'on': true,
  'progress': null,
  'aria-label': 'Пожалуйста, подождите...'
};

var _default = /*#__PURE__*/React.memo(PullToRefreshSpinner);

exports.default = _default;
//# sourceMappingURL=PullToRefreshSpinner.js.map