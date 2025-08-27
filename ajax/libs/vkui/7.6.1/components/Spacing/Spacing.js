import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { resolveSpacingSize } from "../../lib/spacings/sizes.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
export const CUSTOM_CSS_TOKEN_FOR_USER_GAP = '--vkui_internal--spacing_size';
/**
 * @see https://vkui.io/components/spacing
 */ export const Spacing = (_param)=>{
    var { size = 'm' } = _param, restProps = _object_without_properties(_param, [
        "size"
    ]);
    const [spacingSizeClassName, spacingSizeStyle] = resolveSpacingSize(CUSTOM_CSS_TOKEN_FOR_USER_GAP, size);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseStyle: spacingSizeStyle,
        baseClassName: classNames("vkuiSpacing__host", spacingSizeClassName)
    }));
};

//# sourceMappingURL=Spacing.js.map