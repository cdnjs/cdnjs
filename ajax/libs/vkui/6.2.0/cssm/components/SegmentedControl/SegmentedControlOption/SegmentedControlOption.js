import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { hasReactNode } from '@vkontakte/vkjs';
import { Clickable } from '../../Clickable/Clickable';
import { Headline } from '../../Typography/Headline/Headline';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import styles from './SegmentedControlOption.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export const SegmentedControlOption = ({ getRef, className, style, children, getRootRef, before, ...restProps })=>/*#__PURE__*/ _jsxs(Clickable, {
        Component: "label",
        baseClassName: styles['SegmentedControlOption'],
        hoverClassName: styles['SegmentedControlOption--hover'],
        activeClassName: styles['SegmentedControlOption--hover'],
        className: className,
        getRootRef: getRootRef,
        style: style,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                ...restProps,
                Component: "input",
                getRootRef: getRef,
                type: "radio"
            }),
            hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                className: styles['SegmentedControlOption__before'],
                children: before
            }),
            /*#__PURE__*/ _jsx(Headline, {
                level: "2",
                weight: "2",
                children: children
            })
        ]
    });

//# sourceMappingURL=SegmentedControlOption.js.map