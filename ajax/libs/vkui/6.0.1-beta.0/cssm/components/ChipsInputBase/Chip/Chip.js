import * as React from 'react';
import { Icon16Cancel } from '@vkontakte/icons';
import { classNames, hasReactNode, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { useFocusVisible } from '../../../hooks/useFocusVisible';
import { useFocusVisibleClassName } from '../../../hooks/useFocusVisibleClassName';
import { RootComponent } from '../../RootComponent/RootComponent';
import { Footnote } from '../../Typography/Footnote/Footnote';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import styles from './Chip.module.css';
const sizeYClassNames = {
    none: styles['Chip--sizeY-none'],
    compact: styles['Chip--sizeY-compact']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Chip
 */ export const Chip = ({ Component = 'span', value = '', removable = true, onRemove = noop, removeLabel = 'Удалить', before, after, disabled, readOnly, children, className, onFocus: onFocusProp, onBlur: onBlurProp, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const { focusVisible, onFocus, onBlur } = useFocusVisible();
    const focusVisibleClassName = useFocusVisibleClassName({
        focusVisible
    });
    const handleFocus = (event)=>{
        if (onFocusProp) {
            onFocusProp(event);
        }
        onFocus(event);
    };
    const handleBlur = (event)=>{
        if (onBlurProp) {
            onBlurProp(event);
        }
        onBlur(event);
    };
    const onRemoveWrapper = React.useCallback((event)=>{
        onRemove(event, value);
    }, [
        onRemove,
        value
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        Component: Component,
        className: classNames(styles['Chip'], sizeY !== 'regular' && sizeYClassNames[sizeY], focusVisibleClassName, className),
        "aria-readonly": readOnly,
        "aria-disabled": disabled,
        onFocus: disabled ? undefined : handleFocus,
        onBlur: disabled ? undefined : handleBlur
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['Chip__in']
    }, hasReactNode(before) && /*#__PURE__*/ React.createElement("div", {
        className: styles['Chip__before']
    }, before), /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['Chip__content']
    }, children), hasReactNode(after) && /*#__PURE__*/ React.createElement("div", {
        className: styles['Chip__after']
    }, after)), !readOnly && removable && /*#__PURE__*/ React.createElement("div", {
        className: styles['Chip__removable']
    }, /*#__PURE__*/ React.createElement("button", {
        tabIndex: -1,
        disabled: disabled,
        className: styles['Chip__remove'],
        onClick: disabled ? undefined : onRemoveWrapper
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, null, "  ", removeLabel, " ", children), /*#__PURE__*/ React.createElement(Icon16Cancel, null))));
};

//# sourceMappingURL=Chip.js.map