'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon24Cancel } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { getTextFromChildren } from "../../lib/children.js";
import { IconButton } from "../IconButton/IconButton.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { RemovableIos } from "./RemovableIos.js";
/* eslint-enable jsdoc/require-jsdoc */ const RemovableCommon = ({ noPadding, children, removePlaceholderString, onRemoveClick, removeButtonTestId, disabled, indent })=>{
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames("vkuiRemovable__content", !noPadding && "vkuiRemovable__withPadding", 'vkuiInternalRemovable__content'),
        children: [
            typeof children === 'function' ? children({
                isRemoving: false
            }) : children,
            indent ? /*#__PURE__*/ _jsx("div", {
                className: classNames("vkuiRemovable__action", "vkuiRemovable__indentation")
            }) : /*#__PURE__*/ _jsx(IconButton, {
                activeMode: "opacity",
                hoverMode: "opacity",
                className: classNames("vkuiRemovable__action", 'vkuiInternalRemovable__action'),
                onClick: onRemoveClick,
                label: removePlaceholderString,
                "data-testid": removeButtonTestId,
                disabled: disabled,
                children: /*#__PURE__*/ _jsx(Icon24Cancel, {
                    role: "presentation"
                })
            }),
            /*#__PURE__*/ _jsx("span", {
                className: "vkuiRemovable__offset",
                "aria-hidden": true
            })
        ]
    });
};
export const Removable = (_param)=>{
    var { children, onRemove, removePlaceholder = 'Удалить', align = 'center', indent = false, toggleButtonTestId, removeButtonTestId, disabled, noPadding } = _param, restProps = _object_without_properties(_param, [
        "children",
        "onRemove",
        "removePlaceholder",
        "align",
        "indent",
        "toggleButtonTestId",
        "removeButtonTestId",
        "disabled",
        "noPadding"
    ]);
    const platform = usePlatform();
    const onRemoveClick = (e)=>{
        e.preventDefault();
        onRemove === null || onRemove === void 0 ? void 0 : onRemove(e);
    };
    const removePlaceholderString = getTextFromChildren(removePlaceholder);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames(platform === 'ios' && "vkuiRemovable__ios", align === 'start' && "vkuiRemovable__alignStart", indent && "vkuiRemovable__indent"),
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
    }));
};

//# sourceMappingURL=Removable.js.map