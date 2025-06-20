import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./PullToRefresh.module.css";
function calcStrokeDashOffset(value, radius) {
    const progress = value / 100;
    return 2 * Math.PI * radius * (1 - progress);
}
export const PullToRefreshSpinner = ({ on = true, size = 24, strokeWidth = 2.5, progress = 0, children = 'Пожалуйста, подождите...', ...restProps })=>{
    const radius = 0.5 * size - 0.5 * strokeWidth;
    const dasharray = 2 * Math.PI * radius;
    const circleCenter = 0.5 * size;
    const dashoffset = calcStrokeDashOffset(on ? 80 : progress, radius);
    return /*#__PURE__*/ _jsxs(RootComponent, {
        baseClassName: classNames(styles.spinner, on && styles.spinnerOn),
        ...restProps,
        children: [
            on && /*#__PURE__*/ _jsx(VisuallyHidden, {
                children: children
            }),
            /*#__PURE__*/ _jsx("svg", {
                role: "presentation",
                className: styles.spinnerSelf,
                style: {
                    width: size,
                    height: size
                },
                viewBox: `0 0 ${size} ${size}`,
                xmlns: "http://www.w3.org/2000/svg",
                children: /*#__PURE__*/ _jsx("g", {
                    style: {
                        width: size,
                        height: size,
                        transformOrigin: `${circleCenter}px ${circleCenter}px`
                    },
                    children: /*#__PURE__*/ _jsx("circle", {
                        className: styles.spinnerPath,
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
    });
};

//# sourceMappingURL=PullToRefreshSpinner.js.map