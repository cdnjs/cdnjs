import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useFocusVisible } from '../../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../../hooks/useFocusVisibleClassName';
import { callMultiple } from '../../../lib/callMultiple';
import { Headline } from '../../Typography/Headline/Headline';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import styles from './SegmentedControlOption.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export const SegmentedControlOption = ({ getRef, className, style, children, getRootRef, before, ...restProps })=>{
    const { focusVisible, onBlur, onFocus } = useFocusVisible();
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible
    });
    return /*#__PURE__*/ React.createElement("label", {
        className: classNames(styles['SegmentedControlOption'], restProps.checked && styles['SegmentedControlOption--checked'], focusVisibleClassNames, className),
        ref: getRootRef,
        style: style
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, {
        ...restProps,
        Component: "input",
        getRootRef: getRef,
        type: "radio",
        onBlur: callMultiple(onBlur, restProps.onBlur),
        onFocus: callMultiple(onFocus, restProps.onFocus)
    }), hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: styles['SegmentedControlOption__before']
    }, before), /*#__PURE__*/ React.createElement(Headline, {
        level: "2",
        weight: "2"
    }, children));
};

//# sourceMappingURL=SegmentedControlOption.js.map