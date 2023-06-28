import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
export var RichCellIcon = function(_param) {
    var children = _param.children, className = _param.className, restProps = _object_without_properties(_param, [
        "children",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiRichCellIcon", className)
    }), children);
};

//# sourceMappingURL=RichCellIcon.js.map