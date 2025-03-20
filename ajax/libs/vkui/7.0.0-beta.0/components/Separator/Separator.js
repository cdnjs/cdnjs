import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
const appearanceClassNames = {
    'primary': "vkuiSeparator__appearancePrimary",
    'secondary': "vkuiSeparator__appearanceSecondary",
    'primary-alpha': "vkuiSeparator__appearancePrimaryAlpha"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */ export const Separator = (_param)=>{
    var { wide, appearance = 'primary' } = _param, restProps = _object_without_properties(_param, [
        "wide",
        "appearance"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames(!wide && "vkuiSeparator__padded", appearanceClassNames[appearance]),
        children: /*#__PURE__*/ _jsx("hr", {
            className: "vkuiSeparator__in"
        })
    }));
};

//# sourceMappingURL=Separator.js.map