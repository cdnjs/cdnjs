import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
/**
 * @see https://vkcom.github.io/VKUI/#/RadioGroup
 */ export const RadioGroup = (_param)=>{
    var { mode = 'vertical' } = _param, restProps = _object_without_properties(_param, [
        "mode"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({
        baseClassName: classNames("vkuiRadioGroup__host", 'vkuiInternalRadioGroup', mode === 'horizontal' && "vkuiRadioGroup__modeHorizontal"),
        role: "radiogroup"
    }, restProps));
};

//# sourceMappingURL=RadioGroup.js.map