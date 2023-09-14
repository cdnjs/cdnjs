import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { ImageBase, ImageBaseContext } from "../../ImageBase/ImageBase";
export var GridAvatarBadge = function(_param) {
    var className = _param.className, restProps = _object_without_properties(_param, [
        "className"
    ]);
    var size = React.useContext(ImageBaseContext).size;
    return /*#__PURE__*/ React.createElement(ImageBase.Badge, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiGridAvatarBadge", size < 96 && "vkuiGridAvatarBadge--shifted", className)
    }));
};

//# sourceMappingURL=GridAvatarBadge.js.map