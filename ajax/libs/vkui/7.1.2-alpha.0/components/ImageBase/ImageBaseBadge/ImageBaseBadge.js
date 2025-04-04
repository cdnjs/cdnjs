'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../../RootComponent/RootComponent.js";
import { ImageBaseContext } from "../context.js";
import { validateBadgeIcon } from "../validators.js";
function DevelopmentCheck({ children }) {
    const { size } = React.useContext(ImageBaseContext);
    if (children) {
        validateBadgeIcon(size, {
            name: 'children',
            value: children
        });
    }
    return null;
}
const backgroundStyles = {
    stroke: "vkuiImageBaseBadge__backgroundStroke",
    shadow: "vkuiImageBaseBadge__backgroundShadow"
};
/**
 * Бейдж в правом нижнем углу компонента.
 *
 * > Не используйте при `size < 24`
 */ export const ImageBaseBadge = (_param)=>{
    var { background = 'shadow' } = _param, restProps = _object_without_properties(_param, [
        "background"
    ]);
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
                baseClassName: classNames("vkuiImageBaseBadge__host", backgroundStyles[background])
            })),
            process.env.NODE_ENV === 'development' && /*#__PURE__*/ _jsx(DevelopmentCheck, {
                children: restProps.children
            })
        ]
    });
};
ImageBaseBadge.displayName = 'ImageBaseBadge';

//# sourceMappingURL=ImageBaseBadge.js.map