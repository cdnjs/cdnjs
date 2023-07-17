import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { useFocusVisible } from '../../../hooks/useFocusVisible';
import { SizeType } from '../../../lib/adaptivity';
import { callMultiple } from '../../../lib/callMultiple';
import { FocusVisible } from '../../FocusVisible/FocusVisible';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import styles from './SegmentedControlOption.module.css';
const sizeYClassNames = {
    none: styles['SegmentedControlOption__content--sizeY-none'],
    [SizeType.COMPACT]: styles['SegmentedControlOption__content--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */ export const SegmentedControlOption = ({ getRef, className, style, children, ...restProps })=>{
    const { focusVisible, onBlur, onFocus } = useFocusVisible();
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement("label", {
        className: classNames(styles['SegmentedControlOption'], restProps.checked && styles['SegmentedControlOption--checked'], className),
        style: style
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, {
        ...restProps,
        Component: "input",
        getRootRef: getRef,
        type: "radio",
        onBlur: callMultiple(onBlur, restProps.onBlur),
        onFocus: callMultiple(onFocus, restProps.onFocus)
    }), /*#__PURE__*/ React.createElement("span", {
        className: classNames(styles['SegmentedControlOption__content'], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY])
    }, children), /*#__PURE__*/ React.createElement(FocusVisible, {
        visible: focusVisible,
        mode: "inside"
    }));
};

//# sourceMappingURL=SegmentedControlOption.js.map