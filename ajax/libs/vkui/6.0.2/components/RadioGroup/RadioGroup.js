import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
/**
 * @see https://vkcom.github.io/VKUI/#/RadioGroup
 */ export const RadioGroup = (_param)=>{
    var { mode = 'vertical' } = _param, restProps = _object_without_properties(_param, [
        "mode"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: classNames("vkuiRadioGroup", 'vkuiInternalRadioGroup', mode === 'horizontal' && "vkuiRadioGroup--mode-horizontal")
    }, restProps));
};

//# sourceMappingURL=RadioGroup.js.map