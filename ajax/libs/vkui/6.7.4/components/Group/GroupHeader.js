import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
export const GroupHeader = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return /*#__PURE__*/ _jsx("div", _object_spread({
        className: classNames(className, "vkuiGroup__header")
    }, restProps));
};
GroupHeader.displayName = 'GroupHeader';

//# sourceMappingURL=GroupHeader.js.map