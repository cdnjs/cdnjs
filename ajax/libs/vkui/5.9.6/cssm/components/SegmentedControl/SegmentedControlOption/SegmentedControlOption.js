import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useFocusVisible } from '../../../hooks/useFocusVisible';
import { callMultiple } from '../../../lib/callMultiple';
import { FocusVisible } from '../../FocusVisible/FocusVisible';
import { Headline } from '../../Typography/Headline/Headline';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import styles from './SegmentedControlOption.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export const SegmentedControlOption = ({ getRef, className, style, children, getRootRef, ...restProps })=>{
    const { focusVisible, onBlur, onFocus } = useFocusVisible();
    return /*#__PURE__*/ React.createElement("label", {
        className: classNames(styles['SegmentedControlOption'], restProps.checked && styles['SegmentedControlOption--checked'], className),
        ref: getRootRef,
        style: style
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, {
        ...restProps,
        Component: "input",
        getRootRef: getRef,
        type: "radio",
        onBlur: callMultiple(onBlur, restProps.onBlur),
        onFocus: callMultiple(onFocus, restProps.onFocus)
    }), /*#__PURE__*/ React.createElement(Headline, {
        className: styles['SegmentedControlOption__content'],
        level: "2",
        weight: "2"
    }, children), /*#__PURE__*/ React.createElement(FocusVisible, {
        visible: focusVisible,
        mode: "inside"
    }));
};

//# sourceMappingURL=SegmentedControlOption.js.map