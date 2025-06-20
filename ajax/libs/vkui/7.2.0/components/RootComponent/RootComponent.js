import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { mergeStyle } from "../../helpers/mergeStyle.js";
/**
 * Базовый корневой компонент.
 */ export const RootComponent = (_param)=>{
    var { Component = 'div', baseClassName, className, baseStyle, style, getRootRef } = _param, restProps = _object_without_properties(_param, [
        "Component",
        "baseClassName",
        "className",
        "baseStyle",
        "style",
        "getRootRef"
    ]);
    return /*#__PURE__*/ _jsx(Component, _object_spread({
        ref: getRootRef,
        className: classNames(className, baseClassName, "vkuiRootComponent__host", restProps.hidden === true && "vkuiRootComponent__hidden"),
        style: mergeStyle(baseStyle, style)
    }, restProps));
};

//# sourceMappingURL=RootComponent.js.map