"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PullToRefreshSpinner", {
    enumerable: true,
    get: function() {
        return PullToRefreshSpinner;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
function calcStrokeDashOffset(value, radius) {
    var progress = value / 100;
    return 2 * Math.PI * radius * (1 - progress);
}
var PullToRefreshSpinner = function(param) {
    var _param_on = param.on, on = _param_on === void 0 ? true : _param_on, _param_size = param.size, size = _param_size === void 0 ? 24 : _param_size, _param_strokeWidth = param.strokeWidth, strokeWidth = _param_strokeWidth === void 0 ? 2.5 : _param_strokeWidth, style = param.style, _param_progress = param.progress, progress = _param_progress === void 0 ? 0 : _param_progress, tmp = param["aria-label"], ariaLabel = tmp === void 0 ? "Пожалуйста, подождите..." : tmp;
    var radius = 0.5 * size - 0.5 * strokeWidth;
    var dasharray = 2 * Math.PI * radius;
    var circleCenter = 0.5 * size;
    var dashoffset = calcStrokeDashOffset(on ? 80 : progress, radius);
    return /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiPullToRefresh__spinner", on && "vkuiPullToRefresh__spinner--on"),
        style: style,
        "aria-label": on ? ariaLabel : undefined
    }, /*#__PURE__*/ _react.createElement("svg", {
        role: "presentation",
        className: "vkuiPullToRefresh__spinner-self",
        style: {
            width: size,
            height: size
        },
        viewBox: "0 0 ".concat(size, " ").concat(size),
        xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/ _react.createElement("g", {
        style: {
            width: size,
            height: size,
            transformOrigin: "".concat(circleCenter, "px ").concat(circleCenter, "px")
        }
    }, /*#__PURE__*/ _react.createElement("circle", {
        className: "vkuiPullToRefresh__spinner-path",
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

//# sourceMappingURL=PullToRefreshSpinner.js.map