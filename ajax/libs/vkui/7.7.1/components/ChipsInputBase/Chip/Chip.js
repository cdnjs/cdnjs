'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
const sizeYClassNames = {
    none: "vkuiChip__sizeYNone",
    compact: "vkuiChip__sizeYCompact"
};
const modeClassNames = {
    primary: "vkuiChip__modePrimary",
    secondary: "vkuiChip__modeSecondary"
};
/**
 * @see https://vkui.io/components/chip
 */ export const Chip = (_param)=>{
    var { mode = 'primary', Component = 'span', value = '', removable = true, onRemove, removeLabel = 'Удалить', before, after, disabled, readOnly, children, className, onFocus: onFocusProp, onBlur: onBlurProp } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "Component",
        "value",
        "removable",
        "onRemove",
        "removeLabel",
        "before",
        "after",
        "disabled",
        "readOnly",
        "children",
        "className",
        "onFocus",
        "onBlur"
    ]);
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
        onRemove === null || onRemove === void 0 ? void 0 : onRemove(event, value);
    }, [
        onRemove,
        value
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        Component: Component,
        className: classNames("vkuiChip__host", sizeY !== 'regular' && sizeYClassNames[sizeY], modeClassNames[mode], focusVisibleClassName, className),
        "aria-readonly": readOnly,
        "aria-disabled": disabled,
        onFocus: disabled ? undefined : handleFocus,
        onBlur: disabled ? undefined : handleBlur,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: "vkuiChip__in",
                children: [
                    hasReactNode(before) && /*#__PURE__*/ _jsx("div", {
                        className: "vkuiChip__before",
                        children: before
                    }),
                    /*#__PURE__*/ _jsx(Footnote, {
                        className: "vkuiChip__content",
                        children: children
                    }),
                    hasReactNode(after) && /*#__PURE__*/ _jsx("div", {
                        className: "vkuiChip__after",
                        children: after
                    })
                ]
            }),
            !readOnly && removable && /*#__PURE__*/ _jsx("div", {
                className: "vkuiChip__removable",
                children: /*#__PURE__*/ _jsxs("button", {
                    type: "button",
                    tabIndex: -1,
                    disabled: disabled,
                    className: "vkuiChip__remove",
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
    }));
};

//# sourceMappingURL=Chip.js.map