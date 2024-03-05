import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
export const InputLikeDivider = (_param)=>{
    var { children, className } = _param, props = _object_without_properties(_param, [
        "children",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement("span", _object_spread({
        className: classNames("vkuiInputLike__divider", className)
    }, props), children);
};

//# sourceMappingURL=InputLikeDivider.js.map