import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
const stylesMode = {
    new: "vkuiBadge--mode-new",
    prominent: "vkuiBadge--mode-prominent"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Badge
 */ export const Badge = (_param)=>{
    var { mode = 'new', children } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "children"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        Component: "span",
        baseClassName: classNames("vkuiBadge", stylesMode[mode])
    }, restProps), children && /*#__PURE__*/ React.createElement(VisuallyHidden, null, children));
};

//# sourceMappingURL=Badge.js.map