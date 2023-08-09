import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * Компонент-обертка. Позволяет скрыть контент визуально, но оставить его
 * доступным для ассистивных технологий. По умолчанию — `span`.
 *
 * @since v5.4.0
 * @see https://vkcom.github.io/VKUI/#/VisuallyHidden
 */ export var VisuallyHidden = function(_param) {
    var _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, getRootRef = _param.getRootRef, className = _param.className, restProps = _object_without_properties(_param, [
        "Component",
        "getRootRef",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiVisuallyHidden", className),
        ref: getRootRef
    }));
};

//# sourceMappingURL=VisuallyHidden.js.map