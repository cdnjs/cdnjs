import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * @see https://vkcom.github.io/VKUI/#/Caption
 */ export var Caption = function(_param) {
    var className = _param.className, children = _param.children, weight = _param.weight, _param_level = _param.level, level = _param_level === void 0 ? "1" : _param_level, caps = _param.caps, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, restProps = _object_without_properties(_param, [
        "className",
        "children",
        "weight",
        "level",
        "caps",
        "Component"
    ]);
    return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, restProps), {
        className: classNames(className, "vkuiCaption", caps && "vkuiCaption--caps", {
            "1": "vkuiCaption--level-1",
            "2": "vkuiCaption--level-2",
            "3": "vkuiCaption--level-3"
        }[level], weight && ({
            "1": "vkuiCaption--weight-1",
            "2": "vkuiCaption--weight-2",
            "3": "vkuiCaption--weight-3"
        })[weight])
    }), children);
};

//# sourceMappingURL=Caption.js.map