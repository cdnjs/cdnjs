import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * @since v5.4.0
 * @see https://vkcom.github.io/VKUI/#/VisuallyHidden
 * @description
 *
 * Компонент-обертка. Позволяет скрыть контент визуально, но оставить его
 * доступным для ассистивных технологий. По умолчанию — `span`.
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