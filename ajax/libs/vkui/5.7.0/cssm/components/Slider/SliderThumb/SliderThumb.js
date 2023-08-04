import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useFocusVisible } from '../../../hooks/useFocusVisible';
import { FocusVisible } from '../../FocusVisible/FocusVisible';
import styles from './SliderThumb.module.css';
export const SliderThumb = ({ className, getRootRef, inputProps, ...restProps })=>{
    const { focusVisible, onBlur, onFocus } = useFocusVisible(false);
    return /*#__PURE__*/ React.createElement("span", {
        ref: getRootRef,
        className: classNames(styles['SliderThumb'], focusVisible && styles['SliderThumb--focused'], className),
        ...restProps
    }, /*#__PURE__*/ React.createElement("input", {
        ...inputProps,
        type: "range",
        className: styles['SliderThumb__nativeInput'],
        "aria-orientation": "horizontal",
        onBlur: onBlur,
        onFocus: onFocus
    }), /*#__PURE__*/ React.createElement(FocusVisible, {
        visible: focusVisible,
        mode: "outside"
    }));
};

//# sourceMappingURL=SliderThumb.js.map