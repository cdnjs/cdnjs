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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
function calcStrokeDashOffset(value, radius) {
    const progress = value / 100;
    return 2 * Math.PI * radius * (1 - progress);
}
const PullToRefreshSpinner = (_param)=>{
    var { on = true, size = 24, strokeWidth = 2.5, progress = 0, children = 'Пожалуйста, подождите...' } = _param, restProps = _object_without_properties._(_param, [
        "on",
        "size",
        "strokeWidth",
        "progress",
        "children"
    ]);
    const radius = 0.5 * size - 0.5 * strokeWidth;
    const dasharray = 2 * Math.PI * radius;
    const circleCenter = 0.5 * size;
    const dashoffset = calcStrokeDashOffset(on ? 80 : progress, radius);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiPullToRefresh__spinner", on && "vkuiPullToRefresh__spinner--on")
    }, restProps), on && /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, children), /*#__PURE__*/ _react.createElement("svg", {
        role: "presentation",
        className: "vkuiPullToRefresh__spinner-self",
        style: {
            width: size,
            height: size
        },
        viewBox: `0 0 ${size} ${size}`,
        xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/ _react.createElement("g", {
        style: {
            width: size,
            height: size,
            transformOrigin: `${circleCenter}px ${circleCenter}px`
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