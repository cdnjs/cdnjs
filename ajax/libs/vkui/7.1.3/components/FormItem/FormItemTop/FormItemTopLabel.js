'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Subhead } from "../../Typography/Subhead/Subhead.js";
import { FormItemContext } from "../context.js";
/**
 * Отвечает за отрисовку заголовка поля. По умолчанию компонент представлен тегом `label`, если передано свойство `htmlFor`.
 * Можно переопределить через свойство `Component`.
 *
 * @since 6.1.0
 *
 */ export const FormItemTopLabel = (_param)=>{
    var { children, Component: componentProp, htmlFor } = _param, restProps = _object_without_properties(_param, [
        "children",
        "Component",
        "htmlFor"
    ]);
    const component = componentProp || htmlFor && 'label' || 'span';
    const { required, topMultiline } = React.useContext(FormItemContext);
    return /*#__PURE__*/ _jsxs(Subhead, _object_spread_props(_object_spread({
        className: classNames("vkuiFormItem__label", topMultiline && "vkuiFormItem__labelMultiline"),
        Component: component,
        htmlFor: htmlFor
    }, restProps), {
        children: [
            children,
            required && /*#__PURE__*/ _jsx("span", {
                className: "vkuiFormItem__labelRequired",
                "aria-hidden": true,
                children: "*"
            })
        ]
    }));
};
FormItemTopLabel.displayName = 'FormItemTopLabel';

//# sourceMappingURL=FormItemTopLabel.js.map