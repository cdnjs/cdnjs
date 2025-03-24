import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
/**
 * @see https://vkcom.github.io/VKUI/#/Card
 */ export const Card = (_param)=>{
    var { mode = 'tint', Component = 'li' } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "Component"
    ]);
    const withBorder = mode === 'outline' || mode === 'outline-tint';
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        Component: Component,
        baseClassName: classNames("Card__host--hNXAg", mode === 'outline' && "Card__modeOutline--RmBa9", mode === 'shadow' && "Card__modeShadow--humGY", withBorder && "Card__withBorder--TRBwc")
    }));
};

//# sourceMappingURL=Card.js.map