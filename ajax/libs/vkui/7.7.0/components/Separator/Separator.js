import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { resolveSpacingSize } from "../../lib/spacings/sizes.js";
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
 * @see https://vkui.io/components/separator
 */ export const Separator = (_param)=>{
    var { padding = false, appearance = 'primary', direction = 'horizontal', align = 'center', size } = _param, restProps = _object_without_properties(_param, [
        "padding",
        "appearance",
        "direction",
        "align",
        "size"
    ]);
    const [spacingSizeClassName, spacingSizeStyle] = resolveSpacingSize(CUSTOM_CSS_TOKEN_FOR_USER_SIZE, size);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames(padding && "vkuiSeparator__padded", appearanceClassNames[appearance], directionClassNames[direction], size !== undefined && "vkuiSeparator__sized", align !== 'center' && alignClassNames[align], spacingSizeClassName),
        baseStyle: spacingSizeStyle,
        children: /*#__PURE__*/ _jsx("hr", {
            className: "vkuiSeparator__in"
        })
    }));
};

//# sourceMappingURL=Separator.js.map