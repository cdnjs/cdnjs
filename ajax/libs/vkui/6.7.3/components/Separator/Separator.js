import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
const modeClassNames = {
    'primary': "vkuiSeparator--mode-primary",
    'secondary': "vkuiSeparator--mode-secondary",
    'primary-alpha': "vkuiSeparator--mode-primaryAlpha"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */ export const Separator = (_param)=>{
    var { wide, mode = 'primary' } = _param, restProps = _object_without_properties(_param, [
        "wide",
        "mode"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames(!wide && "vkuiSeparator--padded", modeClassNames[mode]),
        children: /*#__PURE__*/ _jsx("hr", {
            className: "vkuiSeparator__in"
        })
    }));
};

//# sourceMappingURL=Separator.js.map