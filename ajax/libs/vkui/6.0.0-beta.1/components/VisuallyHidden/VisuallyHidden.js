import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { RootComponent } from '../RootComponent/RootComponent';
/**
 * Компонент-обертка. Позволяет скрыть контент визуально, но оставить его
 * доступным для ассистивных технологий. По умолчанию — `span`.
 *
 * @since v5.4.0
 * @see https://vkcom.github.io/VKUI/#/VisuallyHidden
 */ export const VisuallyHidden = (_param)=>/*#__PURE__*/ {
    var { Component = 'span' } = _param, restProps = _object_without_properties(_param, [
        "Component"
    ]);
    return React.createElement(RootComponent, _object_spread_props(_object_spread({
        Component: Component
    }, restProps), {
        baseClassName: "vkuiVisuallyHidden"
    }));
};

//# sourceMappingURL=VisuallyHidden.js.map