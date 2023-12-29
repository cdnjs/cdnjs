import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Footnote } from '../Typography/Footnote/Footnote';
/**
 * @see https://vkcom.github.io/VKUI/#/Footer
 */ export const Footer = (_param)=>{
    var { children, className } = _param, restProps = _object_without_properties(_param, [
        "children",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(Footnote, _object_spread_props(_object_spread({
        Component: "footer"
    }, restProps), {
        className: classNames("vkuiFooter", className)
    }), children);
};

//# sourceMappingURL=Footer.js.map