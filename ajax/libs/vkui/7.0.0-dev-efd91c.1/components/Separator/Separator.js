import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { spacingSizeClassNames } from "../../lib/spacings/sizes.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
export const CUSTOM_CSS_TOKEN_FOR_USER_SIZE = '--vkui_internal--spacing_size';
const appearanceClassNames = {
    'primary': "vkuiSeparator__appearancePrimary",
    'secondary': "vkuiSeparator__appearanceSecondary",
    'primary-alpha': "vkuiSeparator__appearancePrimaryAlpha"
};
const directionClassNames = {
    horizontal: "vkuiSeparator__directionHorizontal",
    vertical: "vkuiSeparator__directionVertical"
};
const alignClassNames = {
    start: "vkuiSeparator__alignStart",
    end: "vkuiSeparator__alignEnd"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */ export const Separator = (_param)=>{
    var { padding = false, appearance = 'primary', direction = 'horizontal', align = 'center', style, size } = _param, restProps = _object_without_properties(_param, [
        "padding",
        "appearance",
        "direction",
        "align",
        "style",
        "size"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames(padding && "vkuiSeparator__padded", appearanceClassNames[appearance], typeof size === 'string' && spacingSizeClassNames[size], directionClassNames[direction], size !== undefined && "vkuiSeparator__sized", align !== 'center' && alignClassNames[align]),
        style: _object_spread({}, typeof size === 'number' && {
            [CUSTOM_CSS_TOKEN_FOR_USER_SIZE]: `${size}px`
        }, style),
        children: /*#__PURE__*/ _jsx("hr", {
            className: "vkuiSeparator__in"
        })
    }));
};

//# sourceMappingURL=Separator.js.map