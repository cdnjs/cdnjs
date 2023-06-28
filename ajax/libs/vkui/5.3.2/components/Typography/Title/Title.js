import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * @see https://vkcom.github.io/VKUI/#/Title
 */ export var Title = function(_param) {
    var className = _param.className, children = _param.children, weight = _param.weight, _param_level = _param.level, level = _param_level === void 0 ? "1" : _param_level, Component = _param.Component, restProps = _object_without_properties(_param, [
        "className",
        "children",
        "weight",
        "level",
        "Component"
    ]);
    if (!Component) {
        Component = "h" + level;
    }
    return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, restProps), {
        className: classNames(className, "vkuiTitle", {
            "1": "vkuiTitle--level-1",
            "2": "vkuiTitle--level-2",
            "3": "vkuiTitle--level-3"
        }[level], weight && ({
            "1": "vkuiTitle--weight-1",
            "2": "vkuiTitle--weight-2",
            "3": "vkuiTitle--weight-3"
        })[weight])
    }), children);
};

//# sourceMappingURL=Title.js.map