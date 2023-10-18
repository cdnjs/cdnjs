import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { useFocusWithin } from '../../hooks/useFocusWithin';
import { SizeType } from '../../lib/adaptivity';
import { FocusVisible } from '../FocusVisible/FocusVisible';
import styles from './FormField.module.css';
const sizeYClassNames = {
    none: styles['FormField--sizeY-none'],
    [SizeType.COMPACT]: styles['FormField--sizeY-compact']
};
const stylesStatus = {
    error: styles['FormField--status-error'],
    valid: styles['FormField--status-valid']
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormField
 */ export const FormField = ({ Component = 'span', status = 'default', children, getRootRef, before, after, disabled, mode = 'default', className, ...restProps })=>{
    const elRef = useExternRef(getRootRef);
    const focusWithin = useFocusWithin(elRef);
    const { sizeY = 'none' } = useAdaptivity();
    const [hover, setHover] = React.useState(false);
    const handleMouseEnter = (e)=>{
        e.stopPropagation();
        setHover(true);
    };
    const handleMouseLeave = (e)=>{
        e.stopPropagation();
        setHover(false);
    };
    return /*#__PURE__*/ React.createElement(Component, {
        ...restProps,
        ref: elRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        className: classNames(styles['FormField'], mode === 'default' && styles['FormField--mode-default'], status !== 'default' && stylesStatus[status], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], disabled && styles['FormField--disabled'], !disabled && hover && styles['FormField--hover'], className)
    }, before && /*#__PURE__*/ React.createElement("span", {
        className: styles['FormField__before']
    }, before), children, after && /*#__PURE__*/ React.createElement("span", {
        className: classNames(styles['FormField__after'], 'vkuiInternalFormField__after')
    }, after), /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: styles['FormField__border']
    }), /*#__PURE__*/ React.createElement(FocusVisible, {
        thin: true,
        visible: focusWithin,
        mode: "outline"
    }));
};

//# sourceMappingURL=FormField.js.map