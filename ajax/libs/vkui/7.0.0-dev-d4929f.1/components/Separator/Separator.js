import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { spacingSizeClassNames } from "../../lib/spacings/sizes.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
export const CUSTOM_CSS_TOKEN_FOR_USER_SIZE = '--vkui_internal--spacing_size';
const appearanceClassNames = {
    'primary': "Separator__appearancePrimary--uRhKU",
    'secondary': "Separator__appearanceSecondary--w4bZF",
    'primary-alpha': "Separator__appearancePrimaryAlpha---l6xr"
};
const directionClassNames = {
    horizontal: "Separator__directionHorizontal--aCqz2",
    vertical: "Separator__directionVertical--BzBSJ"
};
const alignClassNames = {
    start: "Separator__alignStart--XdFYp",
    end: "Separator__alignEnd--IdyQw"
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
        baseClassName: classNames(padding && "Separator__padded--IIkyA", appearanceClassNames[appearance], typeof size === 'string' && spacingSizeClassNames[size], directionClassNames[direction], size !== undefined && "Separator__sized--gmluN", align !== 'center' && alignClassNames[align]),
        style: _object_spread({}, typeof size === 'number' && {
            [CUSTOM_CSS_TOKEN_FOR_USER_SIZE]: `${size}px`
        }, style),
        children: /*#__PURE__*/ _jsx("hr", {
            className: "Separator__in--zzr3v"
        })
    }));
};

//# sourceMappingURL=Separator.js.map