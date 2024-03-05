import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Headline } from '../Typography/Headline/Headline';
import { Subhead } from '../Typography/Subhead/Subhead';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
/**
 * @see https://vkcom.github.io/VKUI/#/InfoRow
 */ export const InfoRow = (_param)=>{
    var { header, children, className } = _param, restProps = _object_without_properties(_param, [
        "header",
        "children",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(Headline, _object_spread_props(_object_spread({}, restProps), {
        Component: "span",
        className: classNames("vkuiInfoRow", className),
        weight: "3"
    }), hasReactNode(header) && /*#__PURE__*/ React.createElement(Subhead, {
        Component: "strong",
        className: "vkuiInfoRow__header"
    }, header, /*#__PURE__*/ React.createElement(VisuallyHidden, null, " ")), children);
};

//# sourceMappingURL=InfoRow.js.map