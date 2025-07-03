'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { ImageBase, ImageBaseContext } from "../../ImageBase/ImageBase.js";
export const ImageBadge = (_param)=>{
    var { className } = _param, restProps = _object_without_properties(_param, [
        "className"
    ]);
    const { size } = React.useContext(ImageBaseContext);
    return /*#__PURE__*/ _jsx(ImageBase.Badge, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiImageBadge__host", size < 96 && "vkuiImageBadge__shifted", className)
    }));
};

//# sourceMappingURL=ImageBadge.js.map