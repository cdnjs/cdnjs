import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
/**
 * @see https://vkui.io/components/card
 */ export const Card = (_param)=>{
    var { mode = 'tint', Component = 'li' } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "Component"
    ]);
    const withBorder = mode === 'outline' || mode === 'outline-tint';
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        Component: Component,
        baseClassName: classNames("vkuiCard__host", mode === 'outline' && "vkuiCard__modeOutline", mode === 'shadow' && "vkuiCard__modeShadow", mode === 'plain' && "vkuiCard__modePlain", withBorder && "vkuiCard__withBorder")
    }));
};

//# sourceMappingURL=Card.js.map