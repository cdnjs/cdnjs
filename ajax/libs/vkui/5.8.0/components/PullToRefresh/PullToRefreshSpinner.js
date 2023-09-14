import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent";
function calcStrokeDashOffset(value, radius) {
    var progress = value / 100;
    return 2 * Math.PI * radius * (1 - progress);
}
export var PullToRefreshSpinner = function(_param) {
    var _param_on = _param.on, on = _param_on === void 0 ? true : _param_on, _param_size = _param.size, size = _param_size === void 0 ? 24 : _param_size, _param_strokeWidth = _param.strokeWidth, strokeWidth = _param_strokeWidth === void 0 ? 2.5 : _param_strokeWidth, _param_progress = _param.progress, progress = _param_progress === void 0 ? 0 : _param_progress, tmp = _param["aria-label"], ariaLabel = tmp === void 0 ? "Пожалуйста, подождите..." : tmp, restProps = _object_without_properties(_param, [
        "on",
        "size",
        "strokeWidth",
        "progress",
        "aria-label"
    ]);
    var radius = 0.5 * size - 0.5 * strokeWidth;
    var dasharray = 2 * Math.PI * radius;
    var circleCenter = 0.5 * size;
    var dashoffset = calcStrokeDashOffset(on ? 80 : progress, radius);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: classNames("vkuiPullToRefresh__spinner", on && "vkuiPullToRefresh__spinner--on"),
        "aria-label": on ? ariaLabel : undefined
    }, restProps), /*#__PURE__*/ React.createElement("svg", {
        role: "presentation",
        className: "vkuiPullToRefresh__spinner-self",
        style: {
            width: size,
            height: size
        },
        viewBox: "0 0 ".concat(size, " ").concat(size),
        xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/ React.createElement("g", {
        style: {
            width: size,
            height: size,
            transformOrigin: "".concat(circleCenter, "px ").concat(circleCenter, "px")
        }
    }, /*#__PURE__*/ React.createElement("circle", {
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