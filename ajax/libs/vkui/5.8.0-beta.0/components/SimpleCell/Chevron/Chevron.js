import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon16Chevron, Icon24ChevronCompactRight } from "@vkontakte/icons";
var iconSize = {
    s: Icon16Chevron,
    m: Icon24ChevronCompactRight
};
export var Chevron = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "m" : _param_size, restProps = _object_without_properties(_param, [
        "size"
    ]);
    var Icon = iconSize[size];
    return /*#__PURE__*/ React.createElement(Icon, restProps);
};

//# sourceMappingURL=Chevron.js.map