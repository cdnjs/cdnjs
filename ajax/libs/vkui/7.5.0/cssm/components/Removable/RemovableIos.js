'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener.js";
import { useDOM } from "../../lib/dom.js";
import { IconButton } from "../IconButton/IconButton.js";
import { Tappable } from "../Tappable/Tappable.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
import styles from "./Removable.module.css";
/* eslint-enable jsdoc/require-jsdoc */ const RemovableIosWithRemove = ({ onRemove, removePlaceholder, removePlaceholderString, children: childrenProp, toggleButtonTestId, removeButtonTestId, disabled })=>{
    const direction = useConfigDirection();
    const isRtl = direction === 'rtl';
    const { window } = useDOM();
    const removeButtonRef = React.useRef(null);
    const disabledRef = React.useRef(true);
    const [removeOffset, updateRemoveOffset] = React.useState(0);
    useGlobalEventListener(window, 'click', ()=>{
        if (removeOffset > 0) {
            updateRemoveOffset(0);
        }
    }, {
        capture: true
    });
    const onRemoveTransitionEnd = ()=>{
        if (removeOffset > 0) {
            removeButtonRef?.current?.focus();
        } else {
            disabledRef.current = true;
        }
    };
    const onRemoveActivateClick = (e)=>{
        e.stopPropagation();
        if (!removeButtonRef.current) {
            return;
        }
        const { offsetWidth } = removeButtonRef.current;
        disabledRef.current = false;
        updateRemoveOffset(offsetWidth);
    };
    const style = {
        '--vkui_internal_Removable_remove_offset': String(removeOffset ?? 0)
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames(styles.content, isRtl && styles.rtl, 'vkuiInternalRemovable__content'),
        style: style,
        onTransitionEnd: onRemoveTransitionEnd,
        children: [
            /*#__PURE__*/ _jsxs(IconButton, {
                hasActive: false,
                hasHover: false,
                className: classNames(styles.action, styles.toggle, 'vkuiInternalRemovable__action'),
                onClick: onRemoveActivateClick,
                disabled: removeOffset > 0 || disabled,
                "data-testid": toggleButtonTestId,
                children: [
                    /*#__PURE__*/ _jsx(VisuallyHidden, {
                        children: removePlaceholderString
                    }),
                    /*#__PURE__*/ _jsx("i", {
                        className: styles.toggleIn,
                        role: "presentation"
                    })
                ]
            }),
            typeof childrenProp === 'function' ? childrenProp({
                isRemoving: removeOffset > 0
            }) : childrenProp,
            /*#__PURE__*/ _jsx("span", {
                className: styles.offset,
                "aria-hidden": true
            }),
            /*#__PURE__*/ _jsx(Tappable, {
                Component: "button",
                hasActive: false,
                hasHover: false,
                disabled: disabledRef.current,
                getRootRef: removeButtonRef,
                className: styles.remove,
                onClick: onRemove,
                "data-testid": removeButtonTestId,
                children: /*#__PURE__*/ _jsx("span", {
                    className: styles.removeIn,
                    children: removePlaceholder
                })
            })
        ]
    });
};
const RemovableIosWithIndent = ({ children: childrenProp })=>{
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames(styles.content, 'vkuiInternalRemovable__content'),
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles.action, styles.indentation, 'vkuiInternalRemovable__action')
            }),
            typeof childrenProp === 'function' ? childrenProp({
                isRemoving: false
            }) : childrenProp,
            /*#__PURE__*/ _jsx("span", {
                className: styles.offset,
                "aria-hidden": true
            })
        ]
    });
};
const RemovableIos = ({ indent, children, ...restProps })=>{
    return indent ? /*#__PURE__*/ _jsx(RemovableIosWithIndent, {
        children: children
    }) : /*#__PURE__*/ _jsx(RemovableIosWithRemove, {
        ...restProps,
        children: children
    });
};
export { RemovableIos };

//# sourceMappingURL=RemovableIos.js.map