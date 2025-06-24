'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Cancel } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import { useFocusVisible } from "../../../hooks/useFocusVisible.js";
import { useFocusVisibleClassName } from "../../../hooks/useFocusVisibleClassName.js";
import { RootComponent } from "../../RootComponent/RootComponent.js";
import { Footnote } from "../../Typography/Footnote/Footnote.js";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden.js";
import styles from "./Chip.module.css";
const sizeYClassNames = {
    none: styles.sizeYNone,
    compact: styles.sizeYCompact
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
        className: classNames(styles.host, sizeY !== 'regular' && sizeYClassNames[sizeY], focusVisibleClassName, className),
        "aria-readonly": readOnly,
        "aria-disabled": disabled,
        onFocus: disabled ? undefined : handleFocus,
        onBlur: disabled ? undefined : handleBlur,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: styles.in,
                children: [
                    hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                        className: styles.before,
                        children: before
                    }),
                    /*#__PURE__*/ _jsx(Footnote, {
                        className: styles.content,
                        children: children
                    }),
                    hasReactNode(after) && /*#__PURE__*/ _jsx("div", {
                        className: styles.after,
                        children: after
                    })
                ]
            }),
            !readOnly && removable && /*#__PURE__*/ _jsx("div", {
                className: styles.removable,
                children: /*#__PURE__*/ _jsxs("button", {
                    tabIndex: -1,
                    disabled: disabled,
                    className: styles.remove,
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