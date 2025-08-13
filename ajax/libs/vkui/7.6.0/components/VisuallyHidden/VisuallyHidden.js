import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
/**
 * Компонент-обертка. Позволяет скрыть контент визуально, но оставить его
 * доступным для ассистивных технологий. По умолчанию — `span`.
 *
 * @since 5.4.0
 * @see https://vkui.io/components/visually-hidden
 */ export const VisuallyHidden = (_param)=>{
    var { Component = 'span', baseClassName } = _param, restProps = _object_without_properties(_param, [
        "Component",
        "baseClassName"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        Component: Component
    }, restProps), {
        baseClassName: classNames(baseClassName, "vkuiVisuallyHidden__host", Component === 'input' && "vkuiVisuallyHidden__focusableInput")
    }));
};

//# sourceMappingURL=VisuallyHidden.js.map