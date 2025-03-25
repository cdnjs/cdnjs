import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { spacingSizeClassNames } from "../../lib/spacings/sizes.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
export const CUSTOM_CSS_TOKEN_FOR_USER_GAP = '--vkui_internal--spacing_size';
/**
 * @see https://vkcom.github.io/VKUI/#/Spacing
 */ export const Spacing = (_param)=>{
    var { size = 'm', style } = _param, restProps = _object_without_properties(_param, [
        "size",
        "style"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        style: _object_spread({}, typeof size === 'number' && {
            [CUSTOM_CSS_TOKEN_FOR_USER_GAP]: `${size}px`
        }, style),
        baseClassName: classNames("vkuiSpacing__host", typeof size === 'string' && spacingSizeClassNames[size])
    }));
};

//# sourceMappingURL=Spacing.js.map