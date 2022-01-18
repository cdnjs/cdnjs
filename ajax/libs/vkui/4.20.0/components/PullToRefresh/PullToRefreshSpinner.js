import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["on", "progress", "size", "strokeWidth", "style"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { classNames } from "../../lib/classNames";

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
      restProps = _objectWithoutProperties(_ref, _excluded);

  var radius = 0.5 * size - 0.5 * strokeWidth;
  var dasharray = 2 * Math.PI * radius;
  var circleCenter = 0.5 * size;
  var dashoffset = calcStrokeDashOffset(on ? 80 : progress, radius);
  return createScopedElement("div", {
    vkuiClass: classNames('PullToRefresh__spinner', {
      'PullToRefresh__spinner--on': on
    }),
    style: style,
    "aria-label": on ? restProps['aria-label'] : undefined
  }, createScopedElement("svg", {
    role: "presentation",
    vkuiClass: "PullToRefresh__spinner-self",
    style: {
      width: size,
      height: size
    },
    viewBox: "0 0 ".concat(size, " ").concat(size),
    xmlns: "http://www.w3.org/2000/svg"
  }, createScopedElement("g", {
    style: {
      width: size,
      height: size,
      transformOrigin: "".concat(circleCenter, "px ").concat(circleCenter, "px")
    }
  }, createScopedElement("circle", {
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
export default /*#__PURE__*/React.memo(PullToRefreshSpinner);
//# sourceMappingURL=PullToRefreshSpinner.js.map