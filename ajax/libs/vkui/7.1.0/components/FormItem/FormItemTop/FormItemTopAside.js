import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Subhead } from "../../Typography/Subhead/Subhead.js";
/**
 * Отвечает за отрисовку дополнительного контента справа от заголовка поля.
 *
 * @since 6.1.0
 *
 */ export const FormItemTopAside = (_param)=>{
    var { children } = _param, restProps = _object_without_properties(_param, [
        "children"
    ]);
    return /*#__PURE__*/ _jsx(Subhead, _object_spread_props(_object_spread({
        className: "vkuiFormItem__aside"
    }, restProps), {
        children: children
    }));
};
FormItemTopAside.displayName = 'FormItemTopAside';

//# sourceMappingURL=FormItemTopAside.js.map