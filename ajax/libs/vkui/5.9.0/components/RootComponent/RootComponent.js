import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * Базовый корневой компонент.
 */ export var RootComponent = function(_param) /*#__PURE__*/ {
    var _param_Component = _param.Component, Component = _param_Component === void 0 ? "div" : _param_Component, baseClassName = _param.baseClassName, className = _param.className, getRootRef = _param.getRootRef, restProps = _object_without_properties(_param, [
        "Component",
        "baseClassName",
        "className",
        "getRootRef"
    ]);
    return React.createElement(Component, _object_spread({
        ref: getRootRef,
        className: classNames(baseClassName, className)
    }, restProps));
};

//# sourceMappingURL=RootComponent.js.map