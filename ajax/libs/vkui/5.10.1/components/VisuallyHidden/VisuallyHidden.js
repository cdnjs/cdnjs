import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent";
/**
 * Компонент-обертка. Позволяет скрыть контент визуально, но оставить его
 * доступным для ассистивных технологий. По умолчанию — `span`.
 *
 * @since v5.4.0
 * @see https://vkcom.github.io/VKUI/#/VisuallyHidden
 */ export var VisuallyHidden = function(_param) /*#__PURE__*/ {
    var _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, restProps = _object_without_properties(_param, [
        "Component"
    ]);
    return React.createElement(RootComponent, _object_spread_props(_object_spread({
        Component: Component
    }, restProps), {
        baseClassName: classNames("vkuiVisuallyHidden", Component === "input" && "vkuiVisuallyHidden--focusable-input")
    }));
};

//# sourceMappingURL=VisuallyHidden.js.map