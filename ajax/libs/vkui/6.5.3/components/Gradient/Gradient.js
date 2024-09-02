import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
const modeStyles = {
    overlay: "vkuiGradient--mode-overlay",
    tint: "vkuiGradient--mode-tint"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Gradient
 */ export const Gradient = (_param)=>{
    var { mode = 'default', to = 'top' } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "to"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        role: "presentation"
    }, restProps), {
        baseClassName: classNames("vkuiGradient", mode !== 'default' && modeStyles[mode], to === 'bottom' && "vkuiGradient--to-bottom")
    }));
};

//# sourceMappingURL=Gradient.js.map