import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Footnote } from "../Typography/Footnote/Footnote";
/**
 * @see https://vkcom.github.io/VKUI/#/Footer
 */ export var Footer = function(_param) {
    var children = _param.children, className = _param.className, restProps = _object_without_properties(_param, [
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