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
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
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
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiPullToRefresh__spinner", on && "vkuiPullToRefresh__spinner--on")
    }, restProps), {
        children: [
            on && /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, {
                children: children
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsx)("svg", {
                role: "presentation",
                className: "vkuiPullToRefresh__spinner-self",
                style: {
                    width: size,
                    height: size
                },
                viewBox: `0 0 ${size} ${size}`,
                xmlns: "http://www.w3.org/2000/svg",
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)("g", {
                    style: {
                        width: size,
                        height: size,
                        transformOrigin: `${circleCenter}px ${circleCenter}px`
                    },
                    children: /*#__PURE__*/ (0, _jsxruntime.jsx)("circle", {
                        className: "vkuiPullToRefresh__spinner-path",
                        fill: "none",
                        strokeDasharray: dasharray,
                        strokeDashoffset: dashoffset,
                        strokeWidth: strokeWidth,
                        strokeLinecap: "round",
                        cx: circleCenter,
                        cy: circleCenter,
                        r: radius
                    })
                })
            })
        ]
    }));
};

//# sourceMappingURL=PullToRefreshSpinner.js.map