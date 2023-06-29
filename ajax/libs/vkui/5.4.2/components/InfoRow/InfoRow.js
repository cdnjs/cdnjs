import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { Headline } from "../Typography/Headline/Headline";
import { Subhead } from "../Typography/Subhead/Subhead";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden";
/**
 * @see https://vkcom.github.io/VKUI/#/InfoRow
 */ export var InfoRow = function(_param) /*#__PURE__*/ {
    var header = _param.header, children = _param.children, className = _param.className, restProps = _object_without_properties(_param, [
        "header",
        "children",
        "className"
    ]);
    return React.createElement(Headline, _object_spread_props(_object_spread({}, restProps), {
        Component: "span",
        className: classNames("vkuiInfoRow", className),
        weight: "3"
    }), hasReactNode(header) && /*#__PURE__*/ React.createElement(Subhead, {
        Component: "strong",
        className: "vkuiInfoRow__header"
    }, header, /*#__PURE__*/ React.createElement(VisuallyHidden, null, "\xa0")), children);
};

//# sourceMappingURL=InfoRow.js.map