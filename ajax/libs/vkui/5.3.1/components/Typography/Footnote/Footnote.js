import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * @see https://vkcom.github.io/VKUI/#/Footnote
 */ export var Footnote = function(_param) {
    var className = _param.className, children = _param.children, weight = _param.weight, caps = _param.caps, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, restProps = _object_without_properties(_param, [
        "className",
        "children",
        "weight",
        "caps",
        "Component"
    ]);
    return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, restProps), {
        className: classNames(className, "vkuiFootnote", caps && "vkuiFootnote--caps", weight && ({
            "1": "vkuiFootnote--weight-1",
            "2": "vkuiFootnote--weight-2",
            "3": "vkuiFootnote--weight-3"
        })[weight])
    }), children);
};

//# sourceMappingURL=Footnote.js.map