import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
const stylesMode = {
    vertical: "vkuiButtonGroup__modeVertical",
    horizontal: "vkuiButtonGroup__modeHorizontal"
};
const stylesGap = {
    space: "vkuiButtonGroup__gapSpace",
    s: "vkuiButtonGroup__gapS",
    m: "vkuiButtonGroup__gapM"
};
const stylesAlign = {
    left: "vkuiButtonGroup__alignLeft",
    center: "vkuiButtonGroup__alignCenter",
    right: "vkuiButtonGroup__alignRight"
};
/**
 * @see https://vkui.io/components/button-group
 */ export const ButtonGroup = (_param)=>{
    var { mode = 'horizontal', gap = 'm', stretched = false, align = 'left' /* NOTE: Чтобы блоки по-умолчанию не растягивались на всю ширину контейнера */  } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "gap",
        "stretched",
        "align"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({
        baseClassName: classNames("vkuiButtonGroup__host", stylesMode[mode], gap !== 'none' && stylesGap[gap], stretched && "vkuiButtonGroup__stretched", stylesAlign[align]),
        role: "group"
    }, restProps));
};

//# sourceMappingURL=ButtonGroup.js.map