import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
function calcStrokeDashOffset(value, radius) {
    const progress = value / 100;
    return 2 * Math.PI * radius * (1 - progress);
}
export const PullToRefreshSpinner = (_param)=>{
    var { on = true, size = 24, strokeWidth = 2.5, progress = 0, children = 'Пожалуйста, подождите...' } = _param, restProps = _object_without_properties(_param, [
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
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: classNames("vkuiPullToRefresh__spinner", on && "vkuiPullToRefresh__spinner--on")
    }, restProps), on && /*#__PURE__*/ React.createElement(VisuallyHidden, null, children), /*#__PURE__*/ React.createElement("svg", {
        role: "presentation",
        className: "vkuiPullToRefresh__spinner-self",
        style: {
            width: size,
            height: size
        },
        viewBox: `0 0 ${size} ${size}`,
        xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/ React.createElement("g", {
        style: {
            width: size,
            height: size,
            transformOrigin: `${circleCenter}px ${circleCenter}px`
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