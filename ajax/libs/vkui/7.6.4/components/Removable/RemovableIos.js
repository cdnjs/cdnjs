'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useConfigDirection } from "../../hooks/useConfigDirection.js";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener.js";
import { useDOM } from "../../lib/dom.js";
import { IconButton } from "../IconButton/IconButton.js";
import { Tappable } from "../Tappable/Tappable.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
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
            var _removeButtonRef_current;
            removeButtonRef === null || removeButtonRef === void 0 ? void 0 : (_removeButtonRef_current = removeButtonRef.current) === null || _removeButtonRef_current === void 0 ? void 0 : _removeButtonRef_current.focus();
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
        '--vkui_internal_Removable_remove_offset': String(removeOffset !== null && removeOffset !== void 0 ? removeOffset : 0)
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames("vkuiRemovable__content", isRtl && "vkuiRemovable__rtl", 'vkuiInternalRemovable__content'),
        style: style,
        onTransitionEnd: onRemoveTransitionEnd,
        children: [
            /*#__PURE__*/ _jsxs(IconButton, {
                hasActive: false,
                hasHover: false,
                className: classNames("vkuiRemovable__action", "vkuiRemovable__toggle", 'vkuiInternalRemovable__action'),
                onClick: onRemoveActivateClick,
                disabled: removeOffset > 0 || disabled,
                "data-testid": toggleButtonTestId,
                children: [
                    /*#__PURE__*/ _jsx(VisuallyHidden, {
                        children: removePlaceholderString
                    }),
                    /*#__PURE__*/ _jsx("i", {
                        className: "vkuiRemovable__toggleIn",
                        role: "presentation"
                    })
                ]
            }),
            typeof childrenProp === 'function' ? childrenProp({
                isRemoving: removeOffset > 0
            }) : childrenProp,
            /*#__PURE__*/ _jsx("span", {
                className: "vkuiRemovable__offset",
                "aria-hidden": true
            }),
            /*#__PURE__*/ _jsx(Tappable, {
                Component: "button",
                hasActive: false,
                hasHover: false,
                disabled: disabledRef.current,
                getRootRef: removeButtonRef,
                className: "vkuiRemovable__remove",
                onClick: onRemove,
                "data-testid": removeButtonTestId,
                children: /*#__PURE__*/ _jsx("span", {
                    className: "vkuiRemovable__removeIn",
                    children: removePlaceholder
                })
            })
        ]
    });
};
const RemovableIosWithIndent = ({ children: childrenProp })=>{
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames("vkuiRemovable__content", 'vkuiInternalRemovable__content'),
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: classNames("vkuiRemovable__action", "vkuiRemovable__indentation", 'vkuiInternalRemovable__action')
            }),
            typeof childrenProp === 'function' ? childrenProp({
                isRemoving: false
            }) : childrenProp,
            /*#__PURE__*/ _jsx("span", {
                className: "vkuiRemovable__offset",
                "aria-hidden": true
            })
        ]
    });
};
const RemovableIos = (_param)=>{
    var { indent, children } = _param, restProps = _object_without_properties(_param, [
        "indent",
        "children"
    ]);
    return indent ? /*#__PURE__*/ _jsx(RemovableIosWithIndent, {
        children: children
    }) : /*#__PURE__*/ _jsx(RemovableIosWithRemove, _object_spread_props(_object_spread({}, restProps), {
        children: children
    }));
};
export { RemovableIos };

//# sourceMappingURL=RemovableIos.js.map