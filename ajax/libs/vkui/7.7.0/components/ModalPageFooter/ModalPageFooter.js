'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Separator } from "../Separator/Separator.js";
export const ModalPageFooter = (_param)=>{
    var { noSeparator = false, noPadding = false, children } = _param, restProps = _object_without_properties(_param, [
        "noSeparator",
        "noPadding",
        "children"
    ]);
    const { sizeX, isDesktop } = useAdaptivityWithJSMediaQueries();
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        baseClassName: classNames("vkuiModalPageFooter__host", !noPadding && "vkuiModalPageFooter__padded", isDesktop ? "vkuiModalPageFooter__hostDesktop" : "vkuiModalPageFooter__hostMobile")
    }, restProps), {
        children: [
            !noSeparator && /*#__PURE__*/ _jsx(Separator, {
                className: "vkuiModalPageFooter__Separator",
                padding: sizeX !== 'regular'
            }),
            children
        ]
    }));
};

//# sourceMappingURL=ModalPageFooter.js.map