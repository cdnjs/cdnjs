import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, isPrimitiveReactNode } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { getTitleFromChildren } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";
import { Tappable } from "../Tappable/Tappable";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";
var platformClassNames = {
    ios: "vkuiPanelHeaderButton--ios",
    android: "vkuiPanelHeaderButton--android",
    vkcom: "vkuiPanelHeaderButton--vkcom"
};
var ButtonTypography = function(param) {
    var primary = param.primary, children = param.children;
    var platform = usePlatform();
    if (platform === Platform.IOS) {
        return /*#__PURE__*/ React.createElement(Title, {
            Component: "span",
            level: "3",
            weight: primary ? "1" : "3"
        }, children);
    }
    return /*#__PURE__*/ React.createElement(Text, {
        weight: platform === Platform.VKCOM ? undefined : "2"
    }, children);
};
var warn = warnOnce("PanelHeaderButton");
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export var PanelHeaderButton = function(_param) {
    var children = _param.children, _param_primary = _param.primary, primary = _param_primary === void 0 ? false : _param_primary, label = _param.label, className = _param.className, restProps = _object_without_properties(_param, [
        "children",
        "primary",
        "label",
        "className"
    ]);
    var isPrimitive = isPrimitiveReactNode(children);
    var isPrimitiveLabel = isPrimitiveReactNode(label);
    var platform = usePlatform();
    var hoverMode;
    var activeMode;
    switch(platform){
        case Platform.IOS:
            hoverMode = "opacity";
            activeMode = "opacity";
            break;
        case Platform.VKCOM:
            hoverMode = "vkuiPanelHeaderButton--hover";
            activeMode = "vkuiPanelHeaderButton--active";
            break;
        default:
            hoverMode = "background";
            activeMode = "background";
    }
    if (process.env.NODE_ENV === "development") {
        var hasAccessibleName = Boolean(getTitleFromChildren(children) || getTitleFromChildren(label) || restProps["aria-label"] || restProps["aria-labelledby"]);
        if (!hasAccessibleName) {
            warn("a11y: У кнопки нет названия, которое может прочитать скринридер, и она недоступна для части пользователей. Замените содержимое на текст или добавьте описание действия с помощью пропа aria-label.", "error");
        }
    }
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({
        Component: restProps.href ? "a" : "button"
    }, restProps), {
        hoverMode: hoverMode,
        activeEffectDelay: 200,
        activeMode: activeMode,
        className: classNames("vkuiInternalPanelHeaderButton", "vkuiPanelHeaderButton", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, isPrimitive && "vkuiPanelHeaderButton--primitive", !isPrimitive && !isPrimitiveLabel && "vkuiPanelHeaderButton--notPrimitive", className)
    }), isPrimitive ? /*#__PURE__*/ React.createElement(ButtonTypography, {
        primary: primary
    }, children) : children, isPrimitiveLabel ? /*#__PURE__*/ React.createElement(ButtonTypography, {
        primary: primary,
        className: "vkuiPanelHeaderButton__label"
    }, label) : label);
};

//# sourceMappingURL=PanelHeaderButton.js.map