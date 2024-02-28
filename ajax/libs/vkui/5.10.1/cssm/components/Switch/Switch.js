import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useFocusVisible } from '../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../hooks/useFocusVisibleClassName';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { callMultiple } from '../../lib/callMultiple';
import { Platform } from '../../lib/platform';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './Switch.module.css';
const sizeYClassNames = {
    none: styles['Switch--sizeY-none'],
    [SizeType.COMPACT]: styles['Switch--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Switch
 */ export const Switch = ({ style, className, getRootRef, getRef, checked: checkedProp, ...restProps })=>{
    const platform = usePlatform();
    const { sizeY = 'none' } = useAdaptivity();
    const { focusVisible, onBlur, onFocus } = useFocusVisible();
    const focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible,
        mode: 'outside'
    });
    const [localUncontrolledChecked, setLocalUncontrolledChecked] = React.useState(Boolean(restProps.defaultChecked));
    const isControlled = checkedProp !== undefined;
    const syncUncontrolledCheckedStateOnClick = React.useCallback((e)=>{
        if (isControlled) {
            return;
        }
        const switchTarget = e.target;
        setLocalUncontrolledChecked(switchTarget.checked);
    }, [
        isControlled
    ]);
    const ariaCheckedState = isControlled ? checkedProp : localUncontrolledChecked;
    return /*#__PURE__*/ React.createElement("label", {
        className: classNames(styles['Switch'], platform === Platform.IOS && styles['Switch--ios'], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], restProps.disabled && styles['Switch--disabled'], focusVisibleClassNames, className),
        style: style,
        ref: getRootRef,
        onBlur: callMultiple(onBlur, restProps.onBlur),
        onFocus: callMultiple(onFocus, restProps.onFocus)
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, {
        ...restProps,
        ...isControlled && {
            checked: checkedProp
        },
        Component: "input",
        getRootRef: getRef,
        onClick: callMultiple(syncUncontrolledCheckedStateOnClick, restProps.onClick),
        type: "checkbox",
        role: "switch",
        "aria-checked": ariaCheckedState ? 'true' : 'false',
        className: styles['Switch__self']
    }), /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: styles['Switch__pseudo']
    }));
};

//# sourceMappingURL=Switch.js.map