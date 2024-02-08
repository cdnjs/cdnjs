import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './PullToRefresh.module.css';
function calcStrokeDashOffset(value, radius) {
    const progress = value / 100;
    return 2 * Math.PI * radius * (1 - progress);
}
export const PullToRefreshSpinner = ({ on = true, size = 24, strokeWidth = 2.5, progress = 0, children = 'Пожалуйста, подождите...', ...restProps })=>{
    const radius = 0.5 * size - 0.5 * strokeWidth;
    const dasharray = 2 * Math.PI * radius;
    const circleCenter = 0.5 * size;
    const dashoffset = calcStrokeDashOffset(on ? 80 : progress, radius);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: classNames(styles['PullToRefresh__spinner'], on && styles['PullToRefresh__spinner--on']),
        ...restProps
    }, on && /*#__PURE__*/ React.createElement(VisuallyHidden, null, children), /*#__PURE__*/ React.createElement("svg", {
        role: "presentation",
        className: styles['PullToRefresh__spinner-self'],
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
        className: styles['PullToRefresh__spinner-path'],
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