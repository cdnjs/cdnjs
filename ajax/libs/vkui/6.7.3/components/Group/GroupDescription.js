import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Footnote } from '../Typography/Footnote/Footnote';
export const GroupDescription = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    return /*#__PURE__*/ _jsx(Footnote, _object_spread({
        className: classNames(className, "vkuiGroup__description")
    }, restProps));
};
GroupDescription.displayName = 'GroupDescription';

//# sourceMappingURL=GroupDescription.js.map