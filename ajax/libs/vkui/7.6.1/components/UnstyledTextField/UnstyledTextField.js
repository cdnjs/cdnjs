import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Text } from "../Typography/Text/Text.js";
/**
 * Компонент сбрасывает [User-agent stylesheets](https://www.geeksforgeeks.org/what-is-a-user-agent-stylesheet/)
 * полей ввода.
 *
 * Используется в <a href="?path=/story/forms-input--playground" data-prod-href="https://vkui.io/playground/?path=/story/forms-input--playground">Input</a> и <a href="?path=/story/forms-textarea--playground" data-prod-href="https://vkui.io/playground/?path=/story/forms-textarea--playground">Textarea</a>.
 *
 * @since 6.1.0
 *
 * @see https://vkui.io/components/unstyled-text-field
 *
 */ export const UnstyledTextField = (_param)=>{
    var { as, noPadding = false, className } = _param, restProps = _object_without_properties(_param, [
        "as",
        "noPadding",
        "className"
    ]);
    return /*#__PURE__*/ _jsx(Text, _object_spread({
        Component: as,
        normalize: false,
        className: classNames("vkuiUnstyledTextField__host", noPadding && "vkuiUnstyledTextField__noPadding", className)
    }, restProps));
};

//# sourceMappingURL=UnstyledTextField.js.map