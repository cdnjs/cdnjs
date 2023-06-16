import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { warnOnce } from "../../../lib/warnOnce";
var warn = warnOnce("Paragraph");
/**
 * @see https://vkcom.github.io/VKUI/#/Paragraph
 */ export var Paragraph = function(_param) {
    var className = _param.className, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, getRootRef = _param.getRootRef, weight = _param.weight, children = _param.children, restProps = _object_without_properties(_param, [
        "className",
        "Component",
        "getRootRef",
        "weight",
        "children"
    ]);
    if (process.env.NODE_ENV === "development" && typeof Component !== "string" && getRootRef) {
        warn("getRootRef может использоваться только с элементами DOM", "error");
    }
    return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, restProps), {
        ref: getRootRef,
        className: classNames(className, "vkuiParagraph", weight && ({
            "1": "vkuiParagraph--weight-1",
            "2": "vkuiParagraph--weight-2",
            "3": "vkuiParagraph--weight-3"
        })[weight])
    }), children);
};

//# sourceMappingURL=Paragraph.js.map