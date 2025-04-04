'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, isPrimitiveReactNode } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform.js";
import { hasAccessibleName } from "../../lib/accessibility.js";
import { COMMON_WARNINGS, warnOnce } from "../../lib/warnOnce.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Text } from "../Typography/Text/Text.js";
import { Title } from "../Typography/Title/Title.js";
const platformClassNames = {
    ios: "vkuiPanelHeaderButton__ios",
    android: "vkuiPanelHeaderButton__android",
    vkcom: "vkuiPanelHeaderButton__vkcom"
};
const ButtonTypography = ({ primary, children })=>{
    const platform = usePlatform();
    if (platform === 'ios') {
        return /*#__PURE__*/ _jsx(Title, {
            Component: "span",
            level: "3",
            weight: primary ? '1' : '3',
            children: children
        });
    }
    return /*#__PURE__*/ _jsx(Text, {
        weight: platform === 'vkcom' ? undefined : '2',
        children: children
    });
};
const warn = warnOnce('PanelHeaderButton');
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export const PanelHeaderButton = (_param)=>{
    var { children, primary = false, label } = _param, restProps = _object_without_properties(_param, [
        "children",
        "primary",
        "label"
    ]);
    const isPrimitive = isPrimitiveReactNode(children);
    const isPrimitiveLabel = isPrimitiveReactNode(label);
    const platform = usePlatform();
    let hoverMode;
    let activeMode;
    switch(platform){
        case 'ios':
            hoverMode = 'background';
            activeMode = 'opacity';
            break;
        case 'vkcom':
            hoverMode = "vkuiPanelHeaderButton__hover";
            activeMode = "vkuiPanelHeaderButton__active";
            break;
        default:
            hoverMode = 'background';
            activeMode = 'background';
    }
    if (process.env.NODE_ENV === 'development') {
        /* istanbul ignore next: проверка в dev mode, тест на hasAccessibleName() есть в lib/accessibility.test.tsx */ const isAccessible = hasAccessibleName(_object_spread({
            children: [
                children,
                label
            ]
        }, restProps));
        if (!isAccessible) {
            warn(COMMON_WARNINGS.a11y[restProps.href ? 'link-name' : 'button-name'], 'error');
        }
    }
    const elements = [
        label,
        children
    ].filter((item)=>!!item);
    const onlyPrimitive = elements.length === 1 && isPrimitiveReactNode(elements[0]);
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
        Component: restProps.href ? 'a' : 'button'
    }, restProps), {
        hoverMode: hoverMode,
        activeEffectDelay: 200,
        activeMode: activeMode,
        baseClassName: classNames("vkuiPanelHeaderButton__host", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, onlyPrimitive && "vkuiPanelHeaderButton__primitive", !isPrimitive && !isPrimitiveLabel && "vkuiPanelHeaderButton__notPrimitive"),
        children: [
            isPrimitive ? /*#__PURE__*/ _jsx(ButtonTypography, {
                primary: primary,
                children: children
            }) : children,
            isPrimitiveLabel ? /*#__PURE__*/ _jsx(ButtonTypography, {
                primary: primary,
                className: "vkuiPanelHeaderButton__label",
                children: label
            }) : label
        ]
    }));
};

//# sourceMappingURL=PanelHeaderButton.js.map