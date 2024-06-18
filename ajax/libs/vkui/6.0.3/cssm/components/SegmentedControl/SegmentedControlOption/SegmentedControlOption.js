import * as React from 'react';
import { hasReactNode } from '@vkontakte/vkjs';
import { Clickable } from '../../Clickable/Clickable';
import { Headline } from '../../Typography/Headline/Headline';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import styles from './SegmentedControlOption.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export const SegmentedControlOption = ({ getRef, className, style, children, getRootRef, before, ...restProps })=>/*#__PURE__*/ React.createElement(Clickable, {
        Component: "label",
        baseClassName: styles['SegmentedControlOption'],
        hoverClassName: styles['SegmentedControlOption--hover'],
        activeClassName: styles['SegmentedControlOption--hover'],
        className: className,
        getRootRef: getRootRef,
        style: style
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, {
        ...restProps,
        Component: "input",
        getRootRef: getRef,
        type: "radio"
    }), hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: styles['SegmentedControlOption__before']
    }, before), /*#__PURE__*/ React.createElement(Headline, {
        level: "2",
        weight: "2"
    }, children));

//# sourceMappingURL=SegmentedControlOption.js.map