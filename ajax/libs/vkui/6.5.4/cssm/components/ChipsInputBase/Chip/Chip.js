import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon16Cancel } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
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
 */ export const Chip = ({ Component = 'span', value = '', removable = true, onRemove, removeLabel = 'Удалить', before, after, disabled, readOnly, children, className, onFocus: onFocusProp, onBlur: onBlurProp, ...restProps })=>{
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
        onRemove?.(event, value);
    }, [
        onRemove,
        value
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...restProps,
        Component: Component,
        className: classNames(styles['Chip'], sizeY !== 'regular' && sizeYClassNames[sizeY], focusVisibleClassName, className),
        "aria-readonly": readOnly,
        "aria-disabled": disabled,
        onFocus: disabled ? undefined : handleFocus,
        onBlur: disabled ? undefined : handleBlur,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: styles['Chip__in'],
                children: [
                    hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                        className: styles['Chip__before'],
                        children: before
                    }),
                    /*#__PURE__*/ _jsx(Footnote, {
                        className: styles['Chip__content'],
                        children: children
                    }),
                    hasReactNode(after) && /*#__PURE__*/ _jsx("div", {
                        className: styles['Chip__after'],
                        children: after
                    })
                ]
            }),
            !readOnly && removable && /*#__PURE__*/ _jsx("div", {
                className: styles['Chip__removable'],
                children: /*#__PURE__*/ _jsxs("button", {
                    tabIndex: -1,
                    disabled: disabled,
                    className: styles['Chip__remove'],
                    onClick: disabled ? undefined : onRemoveWrapper,
                    children: [
                        /*#__PURE__*/ _jsxs(VisuallyHidden, {
                            children: [
                                "  ",
                                removeLabel,
                                " ",
                                children
                            ]
                        }),
                        /*#__PURE__*/ _jsx(Icon16Cancel, {})
                    ]
                })
            })
        ]
    });
};

//# sourceMappingURL=Chip.js.map