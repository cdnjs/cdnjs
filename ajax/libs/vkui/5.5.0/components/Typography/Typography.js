import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
export var Typography = function(_param) /*#__PURE__*/ {
    var className = _param.className, weight = _param.weight, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, normalize = _param.normalize, getRootRef = _param.getRootRef, restProps = _object_without_properties(_param, [
        "className",
        "weight",
        "Component",
        "normalize",
        "getRootRef"
    ]);
    return React.createElement(Component, _object_spread_props(_object_spread({}, restProps), {
        ref: getRootRef,
        className: classNames(className, normalize && "vkuiTypography--normalize", weight && ({
            "1": "vkuiTypography--weight-1",
            "2": "vkuiTypography--weight-2",
            "3": "vkuiTypography--weight-3"
        })[weight])
    }));
};

//# sourceMappingURL=Typography.js.map