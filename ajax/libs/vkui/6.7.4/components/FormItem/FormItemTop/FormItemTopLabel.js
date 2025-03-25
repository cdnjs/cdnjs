import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Subhead } from '../../Typography/Subhead/Subhead';
import { FormItemContext } from '../context';
/**
 * Отвечает за отрисовку заголовка поля. По умолчанию компонент представлен тегом `label`, если передано свойство `htmlFor`.
 * Можно переопределить через свойство `Component`.
 *
 * @since 6.1.0
 *
 */ export const FormItemTopLabel = (_param)=>{
    var { children, Component: componentProp, htmlFor, multiline } = _param, restProps = _object_without_properties(_param, [
        "children",
        "Component",
        "htmlFor",
        "multiline"
    ]);
    const component = componentProp || htmlFor && 'label' || 'span';
    const { required, topMultiline: multilineContext } = React.useContext(FormItemContext);
    return /*#__PURE__*/ _jsxs(Subhead, _object_spread_props(_object_spread({
        className: classNames("vkuiFormItemTop__label", (multiline !== null && multiline !== void 0 ? multiline : multilineContext) && "vkuiFormItemTop__label--multiline"),
        Component: component,
        htmlFor: htmlFor
    }, restProps), {
        children: [
            children,
            required && /*#__PURE__*/ _jsx("span", {
                className: "vkuiFormItemTop__label--required",
                "aria-hidden": true,
                children: "*"
            })
        ]
    }));
};
FormItemTopLabel.displayName = 'FormItemTopLabel';

//# sourceMappingURL=FormItemTopLabel.js.map