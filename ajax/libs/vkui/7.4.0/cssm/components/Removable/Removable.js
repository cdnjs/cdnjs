'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon24Cancel } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { getTextFromChildren } from "../../lib/children.js";
import { IconButton } from "../IconButton/IconButton.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { RemovableIos } from "./RemovableIos.js";
import styles from "./Removable.module.css";
/* eslint-enable jsdoc/require-jsdoc */ const RemovableCommon = ({ noPadding, children, removePlaceholderString, onRemoveClick, removeButtonTestId, disabled, indent })=>{
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames(styles.content, !noPadding && styles.withPadding, 'vkuiInternalRemovable__content'),
        children: [
            typeof children === 'function' ? children({
                isRemoving: false
            }) : children,
            indent ? /*#__PURE__*/ _jsx("div", {
                className: classNames(styles.action, styles.indentation)
            }) : /*#__PURE__*/ _jsx(IconButton, {
                activeMode: "opacity",
                hoverMode: "opacity",
                className: classNames(styles.action, 'vkuiInternalRemovable__action'),
                onClick: onRemoveClick,
                label: removePlaceholderString,
                "data-testid": removeButtonTestId,
                disabled: disabled,
                children: /*#__PURE__*/ _jsx(Icon24Cancel, {
                    role: "presentation"
                })
            }),
            /*#__PURE__*/ _jsx("span", {
                className: styles.offset,
                "aria-hidden": true
            })
        ]
    });
};
export const Removable = ({ children, onRemove, removePlaceholder = 'Удалить', align = 'center', indent = false, toggleButtonTestId, removeButtonTestId, disabled, noPadding, ...restProps })=>{
    const platform = usePlatform();
    const onRemoveClick = (e)=>{
        e.preventDefault();
        onRemove?.(e);
    };
    const removePlaceholderString = getTextFromChildren(removePlaceholder);
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: classNames(platform === 'ios' && styles.ios, align === 'start' && styles.alignStart, indent && styles.indent),
        children: platform === 'ios' ? /*#__PURE__*/ _jsx(RemovableIos, {
            onRemove: onRemoveClick,
            removePlaceholder: removePlaceholder,
            removePlaceholderString: removePlaceholderString,
            toggleButtonTestId: toggleButtonTestId,
            removeButtonTestId: removeButtonTestId,
            disabled: disabled,
            indent: indent,
            children: children
        }) : /*#__PURE__*/ _jsx(RemovableCommon, {
            onRemoveClick: onRemoveClick,
            noPadding: noPadding,
            removeButtonTestId: removeButtonTestId,
            removePlaceholderString: removePlaceholderString,
            disabled: disabled,
            indent: indent,
            children: children
        })
    });
};

//# sourceMappingURL=Removable.js.map