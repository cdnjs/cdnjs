import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
const stylesMode = {
    vertical: "vkuiButtonGroup--mode-vertical",
    horizontal: "vkuiButtonGroup--mode-horizontal"
};
const stylesGap = {
    space: "vkuiButtonGroup--gap-space",
    s: "vkuiButtonGroup--gap-s",
    m: "vkuiButtonGroup--gap-m"
};
const stylesAlign = {
    left: "vkuiButtonGroup--align-left",
    center: "vkuiButtonGroup--align-center",
    right: "vkuiButtonGroup--align-right"
};
/**
 * @see https://vkcom.github.io/VKUI/#/ButtonGroup
 */ export const ButtonGroup = (_param)=>{
    var { mode = 'horizontal', gap = 'm', stretched = false, align = 'left' /* NOTE: Чтобы блоки по-умолчанию не растягивались на всю ширину контейнера */  } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "gap",
        "stretched",
        "align"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: classNames("vkuiButtonGroup", stylesMode[mode], gap !== 'none' && stylesGap[gap], stretched && "vkuiButtonGroup--stretched", stylesAlign[align]),
        role: "group"
    }, restProps));
};

//# sourceMappingURL=ButtonGroup.js.map