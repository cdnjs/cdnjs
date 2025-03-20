import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Spinner } from '../Spinner/Spinner';
import { ScreenSpinnerContext } from './context';
export const ScreenSpinnerLoader = (_param)=>{
    var { size = 'large', children } = _param, restProps = _object_without_properties(_param, [
        "size",
        "children"
    ]);
    const { caption } = React.useContext(ScreenSpinnerContext);
    // TODO [>=7]: см. https://github.com/VKCOM/VKUI/pull/7505#discussion_r1754153438
    const a11yText = children ? children : caption !== null && caption !== void 0 ? caption : 'Пожалуйста, подождите...';
    return /*#__PURE__*/ _jsx(Spinner, _object_spread_props(_object_spread({
        className: classNames("vkuiScreenSpinner__spinner", !caption && "vkuiScreenSpinner__spinner--transition"),
        size: size,
        noColor: true
    }, restProps), {
        children: a11yText
    }));
};
ScreenSpinnerLoader.displayName = 'ScreenSpinnerLoader';

//# sourceMappingURL=ScreenSpinnerLoader.js.map