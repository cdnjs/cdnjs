import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Spinner } from '../Spinner/Spinner';
export const ScreenSpinnerLoader = (_param)=>{
    var { size = 'large', children = 'Пожалуйста, подождите...' } = _param, restProps = _object_without_properties(_param, [
        "size",
        "children"
    ]);
    return /*#__PURE__*/ _jsx(Spinner, _object_spread_props(_object_spread({
        className: "vkuiScreenSpinner__spinner",
        size: size,
        noColor: true
    }, restProps), {
        children: children
    }));
};
ScreenSpinnerLoader.displayName = 'ScreenSpinnerLoader';

//# sourceMappingURL=ScreenSpinnerLoader.js.map