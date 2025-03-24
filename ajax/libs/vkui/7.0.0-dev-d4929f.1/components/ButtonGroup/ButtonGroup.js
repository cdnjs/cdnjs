import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
const stylesMode = {
    vertical: "ButtonGroup__modeVertical--8OviB",
    horizontal: "ButtonGroup__modeHorizontal--jVUwM"
};
const stylesGap = {
    space: "ButtonGroup__gapSpace--Am0d9",
    s: "ButtonGroup__gapS--daKeJ",
    m: "ButtonGroup__gapM--kBhht"
};
const stylesAlign = {
    left: "ButtonGroup__alignLeft--jcUjA",
    center: "ButtonGroup__alignCenter--dTT4K",
    right: "ButtonGroup__alignRight--MzxMG"
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
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({
        baseClassName: classNames("ButtonGroup__host--pb5jH", stylesMode[mode], gap !== 'none' && stylesGap[gap], stretched && "ButtonGroup__stretched--10CK2", stylesAlign[align]),
        role: "group"
    }, restProps));
};

//# sourceMappingURL=ButtonGroup.js.map